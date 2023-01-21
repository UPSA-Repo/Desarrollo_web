import React, {useEffect, useState} from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import Router from "next/router";

const UPDATE_ACCOUNT = gql`
    mutation UpdateAccount($updateAccountId: ID!, $input: AccountInputs) {
        UpdateAccount(id: $updateAccountId, input: $input) {
            id
            clientId
            bankId
            branchId
            numberAccount
            accountBalance
            typeAccount
        }
    }
`

const DELETE_ACCOUNT = gql`
    mutation DeleteAccount($deleteAccountId: ID!, $clientId: ID!, $branchId: ID!) {
        DeleteAccount(id: $deleteAccountId, clientId: $clientId, branchId: $branchId)
    }
`

const GET_ACCOUNTS = gql`
    query GetAccountsClient($clientId: ID!) {
        getAccountsClient(clientId: $clientId) {
            id
            clientId
            branchId {
                id
                name
                bankId
            }
            numberAccount
            accountBalance
            typeAccount
        }
    }
`

const Account = ({account}) => {
    const {id, clientId, branchId, numberAccount, accountBalance, typeAccount} = account

    const [ UpdateAccount ] = useMutation(UPDATE_ACCOUNT)
    const [ DeleteAccount ] = useMutation(DELETE_ACCOUNT,{
        update(cache){
            const {getAccountsClient} = cache.readQuery({query: GET_ACCOUNTS})
            cache.writeQuery({
                query: GET_ACCOUNTS,
                data: {
                    getAccountsClient: getAccountsClient.filter(actAccount => actAccount.id !== id)
                }
            })
        }
    })

    const [category, setCategory] = useState(typeAccount)
    const [cls, setClass] = useState('')

    useEffect(() => {
        setCategory(category)
        ChangeColor()
    },[category])

    const ChangeColor = () => {
        if(category === 'SAVINGS_BANK'){
            setClass('border-green-500')
        } else if (category === 'CURRENT_ACCOUNT'){
            setClass('border-blue-500')
        }
    }

    const changeTypeAccount = async (newCategory) => {
        try {
            const {data} = await UpdateAccount({
                variables: {
                    updateAccountId: id,
                    input: {
                        clientId,
                        branchId: branchId.id,
                        typeAccount: newCategory
                    }
                }
            })
            setCategory(data.UpdateAccount.typeAccount)
        } catch (e) {
            console.log(e)
        }

    }

    const AccountUpdate = async () => {
        await Router.push({
            pathname: '/updateaccount/[id]',
            query: {id}
        })
    }

    const AccountDelete = async () => {
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
                    const {data} = await DeleteAccount({
                        variables: {
                            deleteAccountId: id,
                            clientId: clientId,
                            branchId: branchId.id
                        }
                    })
                    await Swal.fire(
                        'Deleted',
                        data.DeleteAccount,
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
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>{numberAccount}</td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>{branchId.name}</td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <select
                    className="appearance-none w-full my-2 bg-blue-500 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={category}
                    onChange={e => changeTypeAccount(e.target.value)}
                >
                    <option value="SAVINGS_BANK">SAVINGS_BANK</option>
                    <option value="CURRENT_ACCOUNT">CURRENT_ACCOUNT</option>
                </select>
            </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>Bs.- {accountBalance} </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <button type="button"
                        className="flex justify-center items-center bg-yellow-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => AccountUpdate()}
                >
                    Update
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                    </svg>
                </button>
            </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <button type="button"
                        className="flex justify-center items-center bg-red-700 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => AccountDelete()}
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
export default Account