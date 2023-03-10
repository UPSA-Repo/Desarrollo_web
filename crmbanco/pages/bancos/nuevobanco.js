import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutBanco from "../../componentes/banco/LayoutBanco";

const Nuevo_Banco = gql `
    mutation NuevoBanco($input: BancoInput) {
      nuevoBanco(input: $input) {
        id
        nombre
      }
    }
`

const Obtener_Bancos = gql `
    query ObtenerBancos {
      obtenerBancos {
        id
        nombre
      }
    }
`

const NuevoBanco = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevoBanco ] = useMutation(Nuevo_Banco,{
        update(cache,{data:{nuevoBanco}}){
            const {obtenerBancos} = cache.readQuery({query:Obtener_Bancos})
            cache.writeQuery({query:Obtener_Bancos, data:{obtenerBancos:[... obtenerBancos, nuevoBanco]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            nombre: ''
        },

        validationSchema: Yup.object ({
            nombre: Yup.string()
                .required('El nombre es requerido.')
        }),

        onSubmit: async valores => {

            const { nombre } = valores

            try {

                const { data } = await nuevoBanco ({
                    variables: {
                        input: {
                            nombre
                        }
                    }
                })

                guardarMensaje(`El Banco fue creado correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/bancos/obtenerbancos')
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
            <LayoutBanco>

                <h1 className="text-2xl text-gray-200 font-light">Nuevo Banco</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre del Banco"
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

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Banco"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>


            </LayoutBanco>
        </>
    )
}

export default NuevoBanco