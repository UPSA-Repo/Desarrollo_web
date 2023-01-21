import React, {useState} from "react"
import { useRouter } from "next/router"
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutAhorro from "../../componentes/ahorro/LayoutAhorro";

const Eliminar_Ahorro = gql `
    mutation EliminarAhorro($id: ID) {
      eliminarAhorro(id: $id)
    }
`

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

const EliminarAhorro = () => {

    let aid = ''

    const [mensaje, guardarMensaje] = useState(null)

    const [ eliminarAhorro ] = useMutation(Eliminar_Ahorro,{
        update(cache) {
            const { obtenerAhorros } = cache.readQuery({query: Obtener_Ahorros})
            cache.writeQuery({query: Obtener_Ahorros,
                data: {obtenerAhorros: obtenerAhorros.filter(ahorro => ahorro.id !== aid)}
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

            aid = id

            try {

                const { data } = await eliminarAhorro ({
                    variables: {
                        id
                    }
                })

                guardarMensaje(`El Ahorro se eliminó.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/ahorros/obtenerahorros')
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
            <LayoutAhorro>

                <h1 className="text-2xl text-gray-200 font-light">Eliminar Ahorro</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                                    Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="id" type="text" placeholder="Id del Ahorro"
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
                                value="Eliminar Ahorro"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutAhorro>
        </>
    )
}

export default EliminarAhorro;