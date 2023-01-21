import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutSucursal from "../../componentes/sucursal/LayoutSucursal";

const Eliminar_Sucursal = gql `
    mutation EliminarSucursal($sucursalId: ID, $bancoId: ID) {
      eliminarSucursal(id: $sucursalId, bancoId: $bancoId)
    }
`

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

const EliminarSucursal = () => {

    let sid = ''

    const [mensaje, guardarMensaje] = useState(null)

    const [ eliminarSucursal ] = useMutation(Eliminar_Sucursal,{
        update(cache) {
            const { obtenerSucursales } = cache.readQuery({query: Obtener_Sucursales})
            cache.writeQuery({query: Obtener_Sucursales,
                data: {obtenerSucursales: obtenerSucursales.filter(sucursal => sucursal.id !== sid)}
            })
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            sucursalId: '',
            bancoId:''
        },

        validationSchema: Yup.object ({
            sucursalId: Yup.string()
                .required('La Sucursal Id es requerida.'),
            bancoId: Yup.string()
                .required('El Banco Id es requerido.')
        }),

        onSubmit: async valores => {

            const { sucursalId, bancoId } = valores

            sid = sucursalId

            try {

                const { data } = await eliminarSucursal ({
                    variables: {
                        sucursalId,
                        bancoId
                    }
                })

                guardarMensaje(`La Sucursal se eliminó.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/sucursales/obtenersucursales')
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
            <LayoutSucursal>

                <h1 className="text-2xl text-gray-200 font-light">Eliminar Sucursal</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bancoId">
                                    Banco Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="bancoId" type="text" placeholder="Id del Banco"
                                       value={formik.values.bancoId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.bancoId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.bancoId}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sucursalId">
                                    Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="sucursalId" type="text" placeholder="Id de la Sucursal"
                                       value={formik.values.sucursalId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.sucursalId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.sucursalId}</p>
                                </div>
                            ) : null }

                            <input
                                type="submit"
                                className="bg-red-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Eliminar Sucursal"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutSucursal>
        </>
    )
}

export default EliminarSucursal;