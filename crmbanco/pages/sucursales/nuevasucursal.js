import React, {useState} from "react"
import { useRouter } from "next/router"
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutSucursal from "../../componentes/sucursal/LayoutSucursal";

const Nueva_Sucursal = gql `
    mutation NuevaSucursal($input: SucursalInput) {
      nuevaSucursal(input: $input) {
        id
        nombre
        direccion
        bancoId
      }
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

const NuevaSucursal = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevaSucursal ] = useMutation(Nueva_Sucursal,{
        update(cache,{data:{nuevaSucursal}}){
            const {obtenerSucursales} = cache.readQuery({query:Obtener_Sucursales})
            cache.writeQuery({query:Obtener_Sucursales, data:{obtenerSucursales:[... obtenerSucursales, nuevaSucursal]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            nombre: '',
            direccion: '',
            bancoId: ''
        },

        validationSchema: Yup.object ({
            nombre: Yup.string()
                .required('El nombre es requerido.'),
            direccion: Yup.string()
                .required('El nombre es requerido.'),
            bancoId: Yup.string()
                .required('El nombre es requerido.')
        }),

        onSubmit: async valores => {

            const { nombre, direccion, bancoId } = valores

            try {

                const { data } = await nuevaSucursal
                ({
                    variables: {
                        input: {
                            nombre,
                            direccion,
                            bancoId
                        }
                    }
                })

                guardarMensaje(`La Sucursal fue creada correctamente.`)

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

                <h1 className="text-2xl text-gray-200 font-light">Nueva Sucursal</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre de la Sucursal"
                                       value={formik.values.nombre}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.nombre && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                                    Dirección
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="direccion" type="text" placeholder="Dirección de la Sucursal"
                                       value={formik.values.direccion}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.direccion && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.direccion}</p>
                                </div>
                            ) : null }

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

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Sucursal"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutSucursal>
        </>
    )
}

export default NuevaSucursal;