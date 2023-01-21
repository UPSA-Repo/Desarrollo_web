import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const GET_USER_TOKEN = gql`
    query GetUserToken {
        getUserToken {
            id
            name
            lastname
            bankId {
                name
            }
        }
    }
`

const Header = () => {
    const router = useRouter()

    const {data, loading, error} = useQuery(GET_USER_TOKEN)

    if(loading)
        return null

    if(!data){
        router.push('/login')
        return
    }

    const {getUserToken} = data

    const {name, lastname, bankId} = getUserToken

    const CloseSession = () => {
        localStorage.removeItem('token')
        router.push('/loginuser')
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <h1 className="mr-2 mb-5 lg:mb-0 font-bold text-2xl bg-blue-600 text-white rounded uppercase py-1 px-4">{bankId.name}</h1>
            <h2 className="mr-20 mb-5 lg:mb-0 font-bold text-2xl uppercase">{name} {lastname}</h2>
            <button className="bg-red-800 w-full sm:w-auto font-bold uppercase rounded py-1 px-2 text-white shadow-md"
                    type="button"
                    onClick={() => CloseSession()}
            >
                Close Session
            </button>
        </div>
    )
}

export default Header