import React, {useState} from "react"
import { useRouter} from "next/router"
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutUsuario from "../../componentes/usuario/LayoutUsuario";

const Nuevo_Usuario = gql `
    mutation NuevoUsuario($input: UsuarioInput) {
      nuevoUsuario(input: $input) {
        id
        nombre
        apellido
        email
        creado
      }
    }
`

const Obtener_Usuarios = gql `
    query ObtenerUsuarios {
      obtenerUsuarios {
        id
        nombre
        apellido
        email
        creado
      }
    }
`

const NuevoUsuario = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevoUsuario ] = useMutation(Nuevo_Usuario,{
        update(cache,{data:{nuevoUsuario}}){
            const {obtenerUsuarios} = cache.readQuery({query:Obtener_Usuarios})
            cache.writeQuery({query:Obtener_Usuarios, data:{obtenerUsuarios:[... obtenerUsuarios, nuevoUsuario]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            nombre: '',
            apellido:'',
            email:'',
            password:''
        },

        validationSchema: Yup.object ({
            nombre: Yup.string()
                .required('El nombre es requerido.'),
            apellido: Yup.string()
                .required('El apellido es requerido.'),
            email: Yup.string()
                .email('El e-mail no es válido')
                .required('El e-mail es requerido.'),
            password:Yup.string()
                .required('El Password es requerido.')
                .min(6, 'El Password debe tener un mínimo de seis caracteres.')
        }),

        onSubmit: async valores => {

            const { nombre, apellido, email, password } = valores

            try {
                const { data } = await nuevoUsuario ({

                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })

                guardarMensaje(`El usuario fue creado correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/usuarios/obtenerusuarios')
                }, 1000)

            } catch (error){

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
            <LayoutUsuario>

                <h1 className="text-2xl text-gray-200 font-light">Nuevo Usuario</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre del Usuario"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="apellido" type="text" placeholder="Apellido del Usuario"
                                       value={formik.values.apellido}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.apellido && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email del Usuario"
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.email && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password del Usuario"
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.password && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null }

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Usuario"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutUsuario>
        </>
    )
}

export default NuevoUsuario;