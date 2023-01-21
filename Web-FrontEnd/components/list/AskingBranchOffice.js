import React, {useContext, useState, useEffect} from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import ListContext from "../../context/list/ListContext";

const GET_BRANCH_OFFICES = gql`
    query GetBranchOffices {
        getBranchOffices {
            id
            name
            bankId
        }
    }
`

const AskingBranchOffice = () => {

    const [branch, setBranch] = useState([])

    const listContext = useContext(ListContext)
    const {AddBranch} = listContext

    const {data, loading, error} = useQuery(GET_BRANCH_OFFICES)

    useEffect( () => {
        AddBranch(branch)
    },[branch])

    const SelectBranch = (branch) => {
        setBranch(branch)
    }

    if(loading)
        return null

    const {getBranchOffices} = data

    return (
        <>
            <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a Branch Office</p>
            <Select
                className="mt-3"
                options={getBranchOffices}
                onChange={ (option) => SelectBranch(option)}
                getOptionValue={ (option) => option.id }
                getOptionLabel={ (option) => `${option.name}` }
                placeholder="Select a branch"
                noOptionsMessage={ ()=> "Not found" }

            />
        </>
    )



}

export default AskingBranchOffice