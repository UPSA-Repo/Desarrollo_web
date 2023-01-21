import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutUsuario from "../../componentes/usuario/LayoutUsuario";

const Obtener_Usuarios = gql `
    query ObtenerUsuarios {
      obtenerUsuarios {
        id
        nombre
        apellido
        email
        creado
      }
    }
`

const ObtenerUsuarios = () => {

    const {data,loading,error} = useQuery(Obtener_Usuarios)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
            <LayoutUsuario>

                <h1 className="text-2xl text-gray-200 font-light">Listar Usuarios</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-2xl ">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight">Nombre</td>
                                <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight">Apellido</td>
                                <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight">E-mail</td>
                            </tr>

                            {data.obtenerUsuarios.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{obtener.nombre}</td>
                                    <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{obtener.apellido}</td>
                                    <td className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{obtener.email}</td>
                                </tr>
                            ))}

                        </form>
                    </div>
                </div>

            </LayoutUsuario>
        </>
    )
}

export default ObtenerUsuarios;