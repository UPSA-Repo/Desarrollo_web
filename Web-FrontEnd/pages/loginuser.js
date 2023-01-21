import React, {useState, useContext} from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import {useRouter} from "next/router";
import AskingBank from "../components/list/AskingBank";
import ListContext from "../context/list/ListContext";


const AUTHENTICATED_USER = gql`
    mutation Mutation($input: AuthenticateUserInput) {
        AuthenticateUser(input: $input) {
            token
        }
    }
`

const LoginUser = () => {
    const router = useRouter()

    const [message, saveMessage] = useState(null)

    const listContext = useContext(ListContext)
    const {bank:{id}, bank} = listContext


    const [ AuthenticateUser ] = useMutation(AUTHENTICATED_USER)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('The email is not valid').required('The email is required'),
            password: Yup.string().required('The password is required').min(6,'Six characters min')
        }),
        onSubmit: async (values) => {
            const { email, password } = values
            try {
                const { data } = await AuthenticateUser({
                    variables: {
                        input: {
                            email,
                            password,
                            bankId: id
                        }
                    }
                })
                saveMessage('Authenticated...')

                setTimeout(() => {
                    const {token} = data.AuthenticateUser
                    localStorage.setItem('token',token)
                },1000)

                setTimeout(() => {
                    saveMessage(null)
                    router.push('/')
                },3000)

            } catch (e) {
                saveMessage(e.message.replace('GraphQL error: ',''))
                setTimeout(() => {
                    saveMessage(null)
                },3000)
            }
        }
    })

    const viewMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    const ValidationLogin = () => {
        return bank.length === 0 ||
                formik.touched.email && formik.errors.email  ||
                formik.touched.password && formik.errors.password  ?
                'opacity-50 cursor-not-allowed' : ''
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-bold">From Login User</h1>
                { message && viewMessage() }
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email"> Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="email"
                                       type="email"
                                       placeholder="Please enter your email"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}
                                />
                            </div>
                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password"> Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="password"
                                       type="password"
                                       placeholder="Please enter your password"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.password}
                                />
                            </div>
                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                            <AskingBank/>
                            <input type="submit"
                                   className={`bg-blue-800 w-full mt-5 p-2 text-white uppercase hover:bg-blue-700 ${ValidationLogin()}`}
                                   value="Log in"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default LoginUser
