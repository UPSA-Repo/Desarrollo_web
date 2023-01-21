import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import ListContext from "../../context/list/ListContext";


const GET_ACCOUNTS = gql`
    query GetAccountsClient($clientId: ID!) {
        getAccountsClient(clientId: $clientId) {
            id
            numberAccount
            accountBalance
        }
    }
`

const AskingAccountDestination = () => {
    const [account, setAccount] = useState([])

    const listContext = useContext(ListContext)
    const {clientDestination,AddAccountDestination} = listContext

    const [loadAccount, {called, loading, data}] = useLazyQuery(GET_ACCOUNTS,{
        variables: {
            clientId: clientDestination.id
        }
    })

    useEffect(() => {
        AddAccountDestination(account)
    },[account])

    const selectAccountDestination = (account) => {
        setAccount(account)
    }

    if(loading && called)
        return null

    if(!called)
        return <button className="mt-4 font-bold text-center w-full" onClick={() => loadAccount()}>Load Accounts</button>

    return (
        <>
            <p className="mt-4 pl-4 my-2 bg-white border-l-8 border-red-500 text-gray-700 p-1 text-sm font-bold uppercase">Select a Account Destination</p>
            <Select
                className="mt-3 font-bold text-center"
                options={data.getAccountsClient}
                onChange={ (option) => selectAccountDestination(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => `Account: ${option.numberAccount} Bs.- ${option.accountBalance}` }
                placeholder="Select an account"
                noOptionsMessage={ ()=> "Not found" }

            />
        </>
    )
}

export default AskingAccountDestination