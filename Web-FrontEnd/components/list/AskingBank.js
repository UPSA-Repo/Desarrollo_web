import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import ListContext from "../../context/list/ListContext";

const GET_BANKS = gql`
    query GetBanks {
        getBanks {
            id
            name
        }
    }
`

const AskingBank = () => {

    const [bank, setBank] = useState([])

    const listContext = useContext(ListContext)
    const {AddBank} = listContext


    const {data, loading, error} = useQuery(GET_BANKS)

    useEffect(()=> {
        AddBank(bank)
    },[bank])

    const selectBank = (bank) => {
        setBank(bank)
    }

    if(loading)
        return null

    const { getBanks } = data

    return (
        <>
            <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a Bank</p>
            <Select
                className="mt-3"
                options={getBanks}
                onChange={ (option) => selectBank(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => option.name }
                placeholder="Select a bank"
                noOptionsMessage={ ()=> "Not found" }

            />
        </>
    )
}

export default AskingBank