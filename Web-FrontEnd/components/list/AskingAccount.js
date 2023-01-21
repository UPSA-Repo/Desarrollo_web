import React, {useEffect, useState, useContext} from "react";
import Select from "react-select";
import {gql, useQuery} from "@apollo/client";
import ListContext from "../../context/list/ListContext";

const GET_ACCOUNTS = gql`
    query GetAccounts {
        getAccounts {
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

const AskingAccount = () => {
    const [account, setAccount] = useState([])

    const listContext = useContext(ListContext)
    const {AddAccount} = listContext


    const {error, loading, data} = useQuery(GET_ACCOUNTS)

    useEffect(() => {
        AddAccount(account)
    },[account])

    const selectAccount = (account) => {
        setAccount(account)
    }

    if(loading)
        return null

    return (
        <>
            <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a Account</p>
            <Select
                className="mt-3"
                options={data.getAccounts}
                onChange={ (option) => selectAccount(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => `${option.numberAccount}   $${option.accountBalance}` }
                placeholder="Select an account"
                noOptionsMessage={ ()=> "Not found" }
            />
        </>
    )
}

export default AskingAccount