import React, {useState} from "react"
import { useRouter} from "next/router"
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutUsuario from "../../componentes/usuario/LayoutUsuario"

const Autenticar_Usuario = gql `
    mutation AutenticarUsuario($input: AutenticarInput) {
      autenticarUsuario(input: $input) {
        token
      }
    }
`

const AuthUsuario = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ autenticarUsuario ] = useMutation(Autenticar_Usuario)

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            email: '',
            password:''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email('El e-mail no es válido.')
                .required('El e-mail es requerido.'),
            password: Yup.string()
                .required('El Password es requerido.')
        }),

        onSubmit: async valores => {

            const { email, password } = valores

            try {

                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                });

                guardarMensaje('Autenticando...')

                const { token } = data.autenticarUsuario
                localStorage.setItem('token', token )

                setTimeout ( () => {
                    guardarMensaje(null);
                    router.push('/')
                }, 2000)

            } catch (error){
                guardarMensaje(error.message)

                setTimeout( () => {
                    guardarMensaje(null)
                },4000);
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

                <h1 className="text-2xl text-gray-200 font-light">Login</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email del Usuario"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}
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
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.password}
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
                                value="Iniciar sesión"
                            />

                            { mensaje && mostrarMensaje()}

                        </form>
                    </div>
                </div>

            </LayoutUsuario>
        </>
    )
}

export default AuthUsuario;