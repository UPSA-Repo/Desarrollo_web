import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutCliente from "../../componentes/cliente/LayoutCliente";

const Obtener_Clientes = gql `
    query ObtenerClientes {
      obtenerClientes {
        id
        nombre
        direccion
        telefono
        saldoActual
        tipo
        usuarioId
      }
    }
`

const ObtenerClientes = () => {

    const {data,loading,error} = useQuery(Obtener_Clientes)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
            <LayoutCliente>

                <h1 className="text-2xl text-gray-200 font-light">Listar Clientes</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Nombre</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Dirección</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Teléfono</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Saldo Actual</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Tipo</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Oficial de Crédito</td>
                            </tr>

                            {data.obtenerClientes.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.nombre}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.direccion}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.telefono}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.saldoActual}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.tipo}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.usuarioId}</td>
                                </tr>
                            ))}

                        </form>
                    </div>
                </div>

            </LayoutCliente>
        </>
    )
}

export default ObtenerClientes;