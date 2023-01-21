import * as Yup from 'yup';
import Layout from "../../componentes/Layout";
import { gql, useMutation } from "@apollo/client";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, {useState, useContext} from "react";

const SignIn = () => {
    return (
        <>
            <Layout>
                <Layout>
                    <h1 className="text-center text-2xl text-white font-bold">Sign up</h1>
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-sm">
                            <form className="bg-white rounded shdow-md px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center" >
                                <div className="mb-4">
                                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="nameInput">Nombre</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="nameInput" type="text" placeholder="Ingresa tu nombre"
                                        // onChange={ formikValidator.handleChange('email') }
                                        // onBlur={ formikValidator.handleBlur('email') }
                                        // value={ formikValidator.values.email }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="emailInput">Email</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="emailInput" type="email" placeholder="Ingresa tu email"
                                           // onChange={ formikValidator.handleChange('email') }
                                           // onBlur={ formikValidator.handleBlur('email') }
                                           // value={ formikValidator.values.email }
                                    />
                                </div>

                                {
                                    // formikValidator.touched.email && formikValidator.errors.email ? (
                                    //         <div>
                                    //             <p className="font-bold">Error</p>
                                    //             <p>{ formikValidator.errors.email }</p>
                                    //         </div>
                                    //     )
                                    //     : null
                                }

                                <div className="mb-4">
                                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="passInput">Password</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="passInput" type="password" placeholder="Ingresa tu contraseña"
                                           // onChange={ formikValidator.handleChange('password') }
                                           // onBlur={ formikValidator.handleBlur('password') }
                                           // value={ formikValidator.values.password }
                                    />
                                </div>

                                {
                                    // formikValidator.touched.password && formikValidator.errors.password ? (
                                    //         <div>
                                    //             <p className="font-bold">Error</p>
                                    //             <p>{ formikValidator.errors.password }</p>
                                    //         </div>
                                    //     )
                                    //     : null
                                }

                                <div className="mb-4">
                                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="bancoInput">Banco ID</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="bancoInput" type="text" placeholder="Ingresa tu banco"
                                        // onChange={ formikValidator.handleChange('email') }
                                        // onBlur={ formikValidator.handleBlur('email') }
                                        // value={ formikValidator.values.email }
                                    />
                                </div>

                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-4 rounded"
                                        type="submit"
                                >Registrarse</button>
                            </form>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </>
    );
};

export default SignIn;