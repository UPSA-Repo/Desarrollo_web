import React, {useEffect, useState, useContext} from "react";
import Select from "react-select";
import {gql, useQuery} from "@apollo/client";
import ListContext from "../../context/list/ListContext";

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

const AskingTransaction = () => {
    const [transaction, setTransaction] = useState([])

    const listContext = useContext(ListContext)
    const {AddTransaction} = listContext


    const {error, loading, data} = useQuery(GET_TRANSACTIONS)

    useEffect(() => {
        AddTransaction(transaction)
    },[transaction])

    const selectTransaction = (account) => {
        setTransaction(account)
    }

    if(loading)
        return null

    return (
        <>
            <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a Transaction</p>
            <Select
                className="mt-3"
                options={data.getTransactions}
                onChange={ (option) => selectTransaction(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => `Origin: ${option.accountOrigin} Destination: ${option.accountDestination}` }
                placeholder="Select a transaction"
                noOptionsMessage={ ()=> "Not found" }
            />
        </>
    )
}

export default AskingTransaction