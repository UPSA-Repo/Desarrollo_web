import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutCuenta from "../../componentes/cuenta/LayoutCuenta";

const Obtener_Cuentas = gql `
    query ObtenerCuentas {
      obtenerCuentas {
        id
        clienteId
        bancoId
        sucursalId
        numeroCuenta
        saldoCuenta
        tipoCuenta
      }
    }
`

const ObtenerCuentas = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const {data,loading,error} = useQuery(Obtener_Cuentas)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{ mensaje }</p>
            </div>
        )
    }

    return (
        <>
            <LayoutCuenta>



                <h1 className="text-2xl text-gray-200 font-light">Listar Cuentas</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-6xl">

                        <form className="w-full  bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Cliente Id</td>
                                <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Banco Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Sucursal Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Número de Cuenta</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Saldo</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Tipo de Cuenta</td>
                            </tr>

                            {data.obtenerCuentas.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.clienteId}</td>
                                    <td hidden className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.bancoId}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.sucursalId}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.numeroCuenta}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.saldoCuenta}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.tipoCuenta}</td>
                                </tr>
                            ))}

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutCuenta>
        </>
    )
}

export default ObtenerCuentas;