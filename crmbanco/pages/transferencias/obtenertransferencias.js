import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutTransferencia from "../../componentes/transferencia/LayoutTransferencia";

const Obtener_Transferencias = gql `
    query ObtenerTransferencias {
      obtenerTransferencias {
        id
        cuentaOrigenId
        cuentaDestinoId
        monto
      }
    }
`

const ObtenerTransferencias = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const {data,loading,error} = useQuery(Obtener_Transferencias)

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
            <LayoutTransferencia>

                <h1 className="text-2xl text-gray-200 font-light">Listar Transferencias</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-4xl ">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-200 leading-tight">Cuenta de Origen</td>
                                <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-200 leading-tight">Cuenta de Destino</td>
                                <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-200 leading-tight">Monto</td>
                            </tr>

                            {data.obtenerTransferencias.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.cuentaOrigenId}</td>
                                    <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.cuentaDestinoId}</td>
                                    <td className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.monto}</td>
                                </tr>
                            ))}

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutTransferencia>
        </>
    )
}

export default ObtenerTransferencias;