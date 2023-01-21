import React, {useState, useContext} from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";


const NEW_CLIENT = gql`
    mutation NewClient($input: ClientInputs) {
        NewClient(input: $input) {
            id
            name
            lastname
            dni
            address
            telephone
            current_balance
            typeClient
            userId
        }
    }
`

const GET_CLIENTS_USER = gql`
    query GetClientsUser {
        getClientsUser {
            id
            name
            lastname
            dni
            address
            telephone
            current_balance
            typeClient
            userId
        }
    }
`

const NewClient = () => {
    const router = useRouter()

    const [message, saveMessage] = useState(null)

    const [ NewClient ] = useMutation(NEW_CLIENT,{
        update(cache,{data: {NewClient}}) {
            const { getClientsUser } = cache.readQuery({query: GET_CLIENTS_USER})
            cache.writeQuery({
                query: GET_CLIENTS_USER,
                data: {
                    getClientsUser: [...getClientsUser, NewClient]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            dni: '',
            address: '',
            telephone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required').matches(/^[A-Za-z ]+$/,'Only letters'),
            lastname: Yup.string().required('The lastname is required').matches(/^[A-Za-z ]+$/,'Only letters'),
            dni: Yup.string().required('The dni is required').max(7,'Min seven characters required').matches(/^[0-9]*$/,'Only numbers'),
            address: Yup.string().required('The address is required').matches(/^[A-Za-z0-9 ]+$/,'Only letters and numbers'),
            telephone: Yup.string().required('The telephone number is required').max(8,'Min eight characters').matches(/^[0-9]*$/,'Only numbers')
        }),
        onSubmit: async (values) => {
            const {name, lastname, dni, address, telephone} = values
            try {
                const { data } = await NewClient({
                    variables: {
                        input: {
                            name,
                            lastname,
                            dni,
                            address,
                            telephone
                        }
                    }
                })
                await Swal.fire(
                    'Successful',
                    'the client has been successfully registered',
                    'success'
                )

                await router.push('/')

            } catch (e) {
                saveMessage(e.message.replace('GraphQL error: ',''))
                setTimeout(()=> {
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
        return formik.touched.name && formik.errors.name || formik.values.name.length === 0 ||
                formik.touched.lastname && formik.errors.lastname || formik.values.lastname.length === 0 ||
                formik.touched.dni && formik.errors.dni || formik.values.dni.length === 0 ||
                formik.touched.address && formik.errors.address || formik.values.address.length === 0 ||
                formik.touched.telephone && formik.errors.telephone || formik.values.telephone.length === 0 ?
                'opacity-50 cursor-not-allowed' : ''
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-black font-bold uppercase">Create new Client</h1>
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
                                       placeholder="Please enter your name"
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
                                       placeholder="Please enter your name"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="address"
                                       type="text"
                                       placeholder="Please enter your address"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.address}
                                />
                            </div>
                            { formik.touched.address && formik.errors.address ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.address}</p>
                                </div>
                            ) : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">Telephone</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="telephone"
                                       type="tel"
                                       placeholder="Please enter your telephone number"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.telephone}
                                />
                            </div>
                            { formik.touched.telephone && formik.errors.telephone ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.telephone}</p>
                                </div>
                            ) : null}

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

export default NewClient