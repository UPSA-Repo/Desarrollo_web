import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutCuenta from "../../componentes/cuenta/LayoutCuenta";

const Eliminar_Cuenta = gql `
    mutation EliminarCuenta($id: ID) {
      eliminarCuenta(id: $id)
    }
`

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

const EliminarCuenta = () => {

    let cid = ''

    const [mensaje, guardarMensaje] = useState(null)

    const [ eliminarCuenta ] = useMutation(Eliminar_Cuenta,{
        update(cache) {
            const { obtenerCuentas } = cache.readQuery({query: Obtener_Cuentas})
            cache.writeQuery({query: Obtener_Cuentas,
                data: {obtenerCuentas: obtenerCuentas.filter(cuenta => cuenta.id !== cid)}
            })
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            id: ''
        },

        validationSchema: Yup.object ({
            id: Yup.string()
                .required('El id es requerido.')
        }),

        onSubmit: async valores => {

            const { id } = valores

            cid = id

            try {

                const { data } = await eliminarCuenta ({
                    variables: {
                        id
                    }
                })

                guardarMensaje(`La Cuenta se eliminó.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/cuentas/obtenercuentas')
                }, 1000)

            } catch (error) {

                guardarMensaje(error.message)

                setTimeout( () => {
                    guardarMensaje(null)
                },4000)

            }
        }
    })

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

                <h1 className="text-2xl text-gray-200 font-light">Eliminar Cuenta</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                                    Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="id" type="text" placeholder="Id de la Cuenta"
                                       value={formik.values.id}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.id && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.id}</p>
                                </div>
                            ) : null }

                            <input
                                type="submit"
                                className="bg-red-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Eliminar Cuenta"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutCuenta>
        </>
    )
}

export default EliminarCuenta;