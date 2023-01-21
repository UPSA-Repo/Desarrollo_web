import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {gql, useMutation} from "@apollo/client";
import Router from "next/router";

const UPDATE_CLIENT = gql`
    mutation UpdateClient($updateClientId: ID!, $input: ClientUpdateInputs) {
        UpdateClient(id: $updateClientId, input: $input) {
            id
            typeClient
        }
    }
`

const DELETE_CLIENT = gql`
    mutation DeleteClient($deleteClientId: ID!) {
        DeleteClient(id: $deleteClientId)
    }
`

const GET_CLIENTS_USER = gql`
    query GetClientsUser {
        getClientsUser {
            id
            name
            lastname
            address
            telephone
            current_balance
            typeClient
            userId
        }
    }
`

const Client = ({client}) => {
    const {id, name, lastname, address, telephone, typeClient} = client

    const [ UpdateClient ] = useMutation(UPDATE_CLIENT)

    const [ DeleteClient ] = useMutation(DELETE_CLIENT,{
        update(cache) {
            const { getClientsUser } = cache.readQuery({query: GET_CLIENTS_USER})
            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsUser: getClientsUser.filter(actClient => actClient.id !== id)
                }
            })
        }
    })

    const ClientUpdate = async () => {
         await Router.push({
            pathname: '/updateclient/[id]',
            query: {id}
        })
    }

    const ViewAccounts = async () => {
        await Router.push({
            pathname: '/viewaccounts/[id]',
            query: {id, name, lastname}
        })
    }

    const [category, setCategory] = useState(typeClient)
    const [cls, setClass] = useState('')

    useEffect(() => {
        setCategory(category)
        ChangeBorderColor()
    },[category])

    const ChangeBorderColor = () => {
        if(category === 'CATEGORY_A'){
            setClass('border-green-500')
        } else if (category === 'CATEGORY_B') {
            setClass('border-yellow-500')
        } else if (category === 'CATEGORY_C') {
            setClass('border-red-500')
        }
    }

    const changeTypeClient = async (newCategory) => {
        try {
            const { data } = await UpdateClient({
                variables: {
                    updateClientId: id,
                    input: {
                        typeClient: newCategory
                    }
                }
            })
            setCategory(data.UpdateClient.typeClient)
        } catch (e) {
            console.log(e)
        }
    }

    const verifyDeleteClient = async () => {
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
                    const {data} = await DeleteClient({
                        variables: {
                            deleteClientId: id
                        }
                    })
                    await Swal.fire(
                        'Deleted',
                        data.DeleteClient,
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
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>{name} {lastname}</td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>{address} </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>{telephone} </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <select
                    className="appearance-none w-full my-2 bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={category}
                    onChange={e => changeTypeClient(e.target.value)}
                >
                    <option value="CATEGORY_A">CATEGORY_A</option>
                    <option value="CATEGORY_B">CATEGORY_B</option>
                    <option value="CATEGORY_C">CATEGORY_C</option>
                </select>
            </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <button type="button"
                        className="flex justify-center items-center bg-green-700 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => ViewAccounts()}
                >
                    View Account
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16">
                        </path>
                    </svg>
                </button>
            </td>
            <td className={`border-t-4 px-4 py-2 text-center ${cls}`}>
                <button type="button"
                        className="flex justify-center items-center bg-yellow-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                        onClick={() => ClientUpdate()}
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
                        onClick={() => verifyDeleteClient()}
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

export default Client