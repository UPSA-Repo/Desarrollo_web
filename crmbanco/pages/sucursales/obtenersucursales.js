import React, {useState} from "react"
import {useQuery, gql} from "@apollo/client"
import LayoutSucursal from "../../componentes/sucursal/LayoutSucursal";

const Obtener_Sucursales = gql `
    query ObtenerSucursales {
      obtenerSucursales {
        id
        nombre
        direccion
        bancoId
      }
    }
`

const Obtenersucursales = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const {data,loading,error} = useQuery(Obtener_Sucursales)

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
            <LayoutSucursal>

                <h1 className="text-2xl text-gray-200 font-light">Listar Sucursales</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-3xl">

                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" >

                            <tr className="bg-gray-800 rounded shadow-md px-8 pt-6 pb-8 mb-6">
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Id</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Nombre</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Dirección</td>
                                <td className="shadow appearance-none border rounded py-2 px-3 text-gray-200 leading-tight">Banco Id</td>
                            </tr>

                            {data.obtenerSucursales.map((obtener) => (
                                <tr key = "{obtener.id}" >
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.id}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.nombre}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.direccion}</td>
                                    <td className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight">{obtener.bancoId}</td>
                                </tr>
                            ))}

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutSucursal>
        </>
    )
}

export default Obtenersucursales;