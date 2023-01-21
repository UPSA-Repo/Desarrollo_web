import React, {useState, useContext} from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import AskingBank from "../components/list/AskingBank";
import { gql, useMutation } from "@apollo/client";
import ListContext from "../context/list/ListContext";
import Swal from "sweetalert2";


const NEW_USER = gql`
    mutation NewUser($input: UserInputs) {
        NewUser(input: $input) {
            id
            name
            lastname
            dni
            email
            create
            bankId
        }
    }
`

const NewUser = () => {
    const router = useRouter()

    const [message, saveMessage] = useState(null)

    const listContext = useContext(ListContext)
    const {bank:{id}, bank} = listContext

    const [ NewUser ] = useMutation(NEW_USER)

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            dni: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required').matches(/^[A-Za-z ]+$/,'Only letters'),
            lastname: Yup.string().required('The lastname is required').matches(/^[A-Za-z ]+$/,'Only letters'),
            dni: Yup.string().required('The dni is required').max(7,'Min seven characters required').matches(/^[0-9]*$/,'Only numbers'),
            email: Yup.string().email('Format email invalid').required('The email is required'),
            password: Yup.string().required('The password is required')
        }),
        onSubmit: async (values) => {
            const {name, lastname, dni, email, password} = values
            try {
                const { data } = await NewUser({
                    variables: {
                        input: {
                            name,
                            lastname,
                            dni,
                            email,
                            password,
                            bankId: id
                        }
                    }
                })
                await Swal.fire(
                    'Successful',
                    'the account has been successfully registered',
                    'success'
                )

                await router.push('/loginuser')
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

    const ValidationCreate = () => {
        return bank.length === 0 ||
                formik.touched.name && formik.errors.name ||
                formik.touched.lastname && formik.errors.lastname ||
                formik.touched.email && formik.errors.email ||
                formik.touched.password && formik.errors.password ?
                'opacity-50 cursor-not-allowed' : ''
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-bold uppercase">Create new User</h1>
                {message && viewMessage()}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="name"
                                       type="text"
                                       placeholder="Please enter your name"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.name}
                                />
                            </div>
                            { formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Lastname</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="lastname"
                                       type="text"
                                       placeholder="Please enter your lastname"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.lastname}
                                />
                            </div>
                            { formik.touched.lastname && formik.errors.lastname ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">Dni</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="dni"
                                       type="text"
                                       placeholder="Please enter your dni"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.dni}
                                />
                            </div>
                            { formik.touched.dni && formik.errors.dni ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.dni}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
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
                            <input className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 ${ValidationCreate()}`}
                                   type="submit"
                                   value="Create"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default NewUser