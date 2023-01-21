import React from "react";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Client from "../components/Client";

const GET_CLIENTS_USER = gql`
    query GetClientsUser {
        getClientsUser {
            id
            name
            lastname
            dni
            address
            telephone
            current_balance
            typeClient
            userId
        }
    }
`

const Index = () => {

    const router = useRouter()

    const {data, loading, error} = useQuery(GET_CLIENTS_USER)

    if(loading)
        return null

    if(!data)
        return setTimeout(() => {router.push('loginuser')})

    const { getClientsUser } = data


    return(
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-bold">CLIENTS</h1>
                <Link href="/newclient">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">New Client</a>
                </Link>
                <Link href="/newaccount">
                    <a className="bg-green-800 py-2 px-5 mt-3 ml-2 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">New Account</a>
                </Link>
                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full w-lg">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/7 py-2">Name</th>
                                <th className="w-1/7 py-2">Address</th>
                                <th className="w-1/7 py-2">Telephone</th>
                                <th className="w-1/7 py-2">Category</th>
                                <th className="w-1/7 py-2">Accounts</th>
                                <th className="w-1/7 py-2">Update</th>
                                <th className="w-1/7 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                        {getClientsUser.map( client => (
                            <Client
                                key={client.id}
                                client={client}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    )
}

export default Index