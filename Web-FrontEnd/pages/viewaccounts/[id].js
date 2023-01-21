import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Account from "../../components/Account";

const VIEW_ACCOUNTS = gql`
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

const ViewAccounts = () => {
    const router = useRouter()
    const {query: {id, name, lastname}} = router

    const {data, loading, error} = useQuery(VIEW_ACCOUNTS,{
        variables: {
            clientId: id
        }
    })
    if(loading)
        return null

    const {getAccountsClient} = data


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-bold uppercase">Client: {name} {lastname}</h1>
                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full w-lg">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/6 py-2">Number Account</th>
                                <th className="w-1/6 py-2">Name Branch</th>
                                <th className="w-1/6 py-2">Type Account</th>
                                <th className="w-1/6 py-2">Account Balance</th>
                                <th className="w-1/6 py-2">Update</th>
                                <th className="w-1/6 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                        {getAccountsClient.map( account => (
                            <Account
                                key={account.id}
                                account={account}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    )
}
export default ViewAccounts