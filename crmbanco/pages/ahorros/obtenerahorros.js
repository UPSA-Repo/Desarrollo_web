import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutAhorro from "../../componentes/ahorro/LayoutAhorro";

const Obtener_Ahorros = gql `
    query ObtenerAhorros {
      obtenerAhorros {
        id
        usuarioId
        clienteId
        sucursalId
        fecha
        plazo
        moneda
        monto
      }
    }
`

const ObtenerAhorros = () => {


    const {data,loading,error} = useQuery(Obtener_Ahorros)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
            <LayoutAhorro>

                <h1 className="text-2xl text-gray-200 font-light">Listar Ahorros</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Usuario Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Cliente Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Sucursal Id</td>
                                <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Fecha</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Plazo</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Moneda</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Monto</td>
                            </tr>

                            {data.obtenerAhorros.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.usuarioId}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.clienteId}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.sucursalId}</td>
                                    <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.fecha}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.plazo}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.moneda}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.monto}</td>
                                </tr>
                            ))}

                        </form>
                    </div>
                </div>

            </LayoutAhorro>
        </>
    )
}

export default ObtenerAhorros;