import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";

const GET_CLIENTS_USER = gql`
    query GetClient($getClientId: ID!) {
        getClient(id: $getClientId) {
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

const UPDATE_CLIENT = gql`
    mutation UpdateClient($updateClientId: ID!, $input: ClientUpdateInputs) {
        UpdateClient(id: $updateClientId, input: $input) {
            id
        }
    }
`

const UpdateClient = () => {
    const router = useRouter()

    const {query: {id}} = router

    const {data, loading, error} = useQuery(GET_CLIENTS_USER,{
        variables: {
            getClientId: id
        }
    })

    const [ UpdateClient ] = useMutation(UPDATE_CLIENT)

    const schemaValidation = Yup.object({
        name: Yup.string().required('The name is required').matches(/^[A-Za-z ]+$/,'Only letters'),
        lastname: Yup.string().required('The lastname is required').matches(/^[A-Za-z ]+$/,'Only letters'),
        dni: Yup.string().required('The dni is required').max(7,'Min seven characters required').matches(/^[0-9]*$/,'Only numbers'),
        address: Yup.string().required('The address is required').matches(/^[A-Za-z0-9 ]+$/,'Only letters and numbers'),
        telephone: Yup.string().required('The telephone number is required').max(8,'Min eight characters').matches(/^[0-9]*$/,'Only numbers')
    })

    if(loading)
        return null

    const { getClient } = data



    const UpdateInfoClient = async (values) => {
        const {name, lastname, dni, address, telephone} = values
        try {
            const {data} = await UpdateClient({
                variables: {
                    updateClientId: id,
                    input: {
                        name,
                        lastname,
                        dni,
                        address,
                        telephone,
                    }
                }
            })
            await Swal.fire(
                'Update!',
                'Update Successful Client',
                'success'
            )
            await router.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <h1 className="text-center text-2xl text-black font-bold uppercase">Update Client</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getClient}
                        onSubmit={ (values) => {
                            UpdateInfoClient(values)
                        }}
                    >
                        {props => {
                            return (
                                <form className={`bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4`} onSubmit={props.handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="name"
                                               type="text"
                                               placeholder="Please enter your name"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.name}
                                        />
                                    </div>
                                    { props.touched.name && props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Lastname</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="lastname"
                                               type="text"
                                               placeholder="Please enter your lastname"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.lastname}
                                        />
                                    </div>
                                    { props.touched.lastname && props.errors.lastname ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.lastname}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">Dni</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="dni"
                                               type="text"
                                               placeholder="Please enter your dni"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.dni}
                                        />
                                    </div>
                                    { props.touched.dni && props.errors.dni ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.dni}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="address"
                                               type="text"
                                               placeholder="Please enter your address"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.address}
                                        />
                                    </div>
                                    { props.touched.address && props.errors.address ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.address}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">Telephone</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="telephone"
                                               type="tel"
                                               placeholder="Please enter your telephone number"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.telephone}
                                        />
                                    </div>
                                    { props.touched.telephone && props.errors.telephone ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.telephone}</p>
                                        </div>
                                    ) : null}

                                    <input className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900}`}
                                           type="submit"
                                           value="Update"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateClient