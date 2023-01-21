import React, {useContext} from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {gql, useMutation, useQuery} from "@apollo/client";
import ListContext from "../context/list/ListContext";
import AskingTransaction from "../components/list/AskingTransaction";
import Swal from "sweetalert2";
import Link from "next/link";


const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($deleteTransactionId: ID!) {
        DeleteTransaction(id: $deleteTransactionId)
    }
`

const GET_TRANSACTIONS = gql`
    query GetTransactions {
        getTransactions {
            id
            accountOrigin
            accountDestination
            amount
            userId
        }
    }
`

const Transactions = () => {
    const router = useRouter()

    const listContext = useContext(ListContext)
    const {transactionClient} = listContext


    const [ DeleteTransaction ] = useMutation(DELETE_TRANSACTION, {
        update(cache) {
            const { getTransactions } = cache.readQuery({query: GET_TRANSACTIONS})
            cache.writeQuery({
                query: GET_TRANSACTIONS,
                data: {
                    getTransactions: getTransactions.filter(actTransaction => actTransaction.id !== transactionClient.id)
                }
            })
        }
    })

    const TransactionDelete = async () => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    const {data} = await DeleteTransaction({
                        variables: {
                            deleteTransactionId: transactionClient.id,
                        }
                    })
                    await Swal.fire(
                        'Deleted',
                        data.DeleteTransaction,
                        'success'
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    const ValidateDelete = () => {
        return transactionClient.length === 0 ? "opacity-50 cursor-not-allowed" : ""
    }

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-bold">TRANSACTIONS</h1>
                <Link href="/newtransaction">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">New Transaction</a>
                </Link>
                <div className="flex justify-center mt-5 px-40 mx-40">
                    <div className="w-full max-w-md">
                        <AskingTransaction/>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm px-20">
                        <button className={`font-bold uppercase  mt-4 text-white bg-red-500 text-center w-full p-2 ${ValidateDelete()}`}
                                onClick={ () => TransactionDelete()}
                        >
                            Delete Transaction
                        </button>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default Transactions