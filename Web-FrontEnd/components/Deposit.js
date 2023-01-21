import React from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import Router from "next/router";
import Swal from "sweetalert2";

const GET_DEPOSITS = gql`
    query GetDeposits {
        getDeposits {
            id
            userId
            clientId {
                name
                lastname
            }
            branchId {
                name
            }
            dateDeposit
            depositTerm
            coin
            amount
        }
    }
`

const DELETE_DEPOSIT = gql`
    mutation DeleteDeposit($deleteDepositId: ID!) {
        DeleteDeposit(id: $deleteDepositId)
    }
`

const UPDATE_DEPOSIT = gql`
    mutation UpdateDeposit($updateDepositId: ID!, $input: DepositsInputs) {
        UpdateDeposit(id: $updateDepositId, input: $input) {
            id
            userId
            clientId
            branchId
            dateDeposit
            depositTerm
            coin
            amount
        }
    }
`

const Deposit = ({deposit}) => {
    const {id, branchId, clientId, depositTerm, dateDeposit, coin, amount} = deposit


    const [ DeleteDeposit ] = useMutation(DELETE_DEPOSIT,{
        update(cache) {
            const { getDeposits } = cache.readQuery({query: GET_DEPOSITS})
            cache.writeQuery({
                query: GET_DEPOSITS,
                data: {
                    getDeposits: getDeposits.filter(actDeposit => actDeposit.id !== id)
                }
            })
        }
    })

    const DepositUpdate = async () => {
        await Router.push({
            pathname: '/updatedeposit/[id]',
            query: {id, branchId, clientId, depositTerm, coin, amount}
        })
    }

    const DepositDelete = async () => {
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
                    const {data} = await DeleteDeposit({
                        variables: {
                            deleteDepositId: id
                        }
                    })
                    await Swal.fire(
                        'Deleted',
                        data.DeleteDeposit,
                        'success'
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }

    return (
        <tr>
            <td className={`border-t-4 px-4 py-2 text-center`}>{clientId.name} {clientId.lastname}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>{branchId.name}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>{depositTerm}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>{dateDeposit}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>{coin}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>{amount}</td>
            <td className={`border-t-4 px-4 py-2 text-center`}>
                <button type="button"
                        className="flex justify-center items-center bg-yellow-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => DepositUpdate()}
                >
                    Update
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                    </svg>
                </button>
            </td>
            <td className={`border-t-4 px-4 py-2 text-center`}>
                <button type="button"
                        className="flex justify-center items-center bg-red-700 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => DepositDelete()}
                >
                    Delete
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default Deposit