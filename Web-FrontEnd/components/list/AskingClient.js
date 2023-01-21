import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import ListContext from "../../context/list/ListContext";

const GET_CLIENTS = gql`
    query GetClientsUser {
        getClientsUser {
            id
            name
            lastname
        }
    }
`

const AskingClient = () => {

    const [client, setClient] = useState([])

    const listContext = useContext(ListContext)
    const {AddClient} = listContext

    const {data, loading, error} = useQuery(GET_CLIENTS)

    useEffect( () => {
        AddClient(client)
    },[client])

    const SelectClient = (client) => {
        setClient(client)
    }

    if(loading)
        return null

    const {getClientsUser} = data

    return (
        <>
            <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a Client</p>
            <Select
                className="mt-3"
                options={getClientsUser}
                onChange={ (option) => SelectClient(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => `${option.name} ${option.lastname}` }
                placeholder="Select a client"
                noOptionsMessage={ ()=> "Not found" }

            />
        </>
    )



}

export default AskingClient