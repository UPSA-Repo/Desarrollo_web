import * as Yup from 'yup';
import Layout from "../../componentes/Layout";
import {gql, useMutation, useQuery} from "@apollo/client";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, {useState, useContext} from "react";
import {router} from "next/client";
import Link from "next/link";

const ENCRIPTAR_TOKEN = gql`
    mutation EncriptarTokenOficial($input: AutenticarOficialInput) {
        encriptarTokenOficial(input: $input) {
            token
        }
    }
`;

const Login = () => {
    const [ encriptarTokenOficial ] = useMutation(ENCRIPTAR_TOKEN);

    const formikValidator = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es correcto.').required('Campo obligatorio'),
            password: Yup.string().required('Campo obligatorio')
        }),
        onSubmit: async ( values ) => {
            const { email, password } = values;
            try{
                const { data } = await encriptarTokenOficial({
                    variables: {
                        input: {
                            email: email,
                            password: password
                        }
                    }
                });

                setTimeout(() => {
                    const { token } = data.encriptarTokenOficial;
                    console.log(`TOKEN: ${ token }`);
                    localStorage.setItem('token', token);
                    router.push('/');
                }, 2000);
            } catch (e) {
                console.log('ERROR: ' + e.message);
            }
        }
    });

    const LoginValidation = () => {
        return formikValidator.touched.email && formikValidator.errors.email  ||
        formikValidator.touched.password && formikValidator.errors.password  ?
            'opacity-50 cursor-not-allowed' : ''
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-bold">Login</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shdow-md px-8 pt-6 pb-8 mb-4" onSubmit={ formikValidator.handleSubmit }>
                            <div className="mb-4">
                                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="emailInput">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="emailInput" type="email" placeholder="Ingresa tu email"
                                       onChange={ formikValidator.handleChange('email') }
                                       onBlur={ formikValidator.handleBlur('email') }
                                       value={ formikValidator.values.email }
                                />
                            </div>

                            {
                                formikValidator.touched.email && formikValidator.errors.email ? (
                                    <div>
                                        <p className="font-bold">Error</p>
                                        <p>{ formikValidator.errors.email }</p>
                                    </div>
                                    )
                                    : null
                            }

                            <div className="mb-4">
                                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="passInput">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="passInput" type="password" placeholder="Ingresa tu contraseña"
                                       onChange={ formikValidator.handleChange('password') }
                                       onBlur={ formikValidator.handleBlur('password') }
                                       value={ formikValidator.values.password }
                                />
                            </div>

                            {
                                formikValidator.touched.password && formikValidator.errors.password ? (
                                        <div>
                                            <p className="font-bold">Error</p>
                                            <p>{ formikValidator.errors.password }</p>
                                        </div>
                                    )
                                    : null
                            }

                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded"
                                    type="submit" onClick={ LoginValidation }
                            >Iniciar sesion</button>

                            <Link href='/Sesion/signin'>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-4 rounded"
                                        type="button"
                                >Registrarse</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Login;