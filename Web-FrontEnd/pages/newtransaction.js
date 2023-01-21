import React, {useContext, useState} from "react";
import Layout from "../components/Layout";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import AskingClientOrigin from "../components/list/AskingClientOrigin";
import AskingAccountOrigin from "../components/list/AskingAccountOrigin";
import AskingClientDestination from "../components/list/AskingClientDestination";
import AskingAccountDestination from "../components/list/AskingAccountDestination";
import ListContext from "../context/list/ListContext";
import * as Yup from "yup";
import Swal from "sweetalert2";

const NEW_TRANSACTION = gql`
    mutation NewTransaction($input: TransactionInputs) {
        NewTransaction(input: $input) {
            id
            accountOrigin
            accountDestination
            amount
        }
    }
`

const NewTransaction = () => {
    const router = useRouter()

    const [message, saveMessage] = useState()

    const [ NewTransaction ] = useMutation(NEW_TRANSACTION)

    const listContext = useContext(ListContext)
    const {accountOrigin,accountDestination} = listContext

    const formik = useFormik({
        initialValues: {
            amount: 0
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('The amount is required')
        }),
        onSubmit: async (values) => {
            const {amount} = values
            try {
                const {data} = await NewTransaction({
                    variables: {
                        input: {
                            accountOrigin: accountOrigin.id,
                            accountDestination: accountDestination.id,
                            amount
                        }
                    }
                })
                await Swal.fire(
                    'Create!',
                    'The transaction register complete',
                    'success'
                )
                await router.push('transactions')
            } catch (e) {
                console.log(e)
            }
        }
    })

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-black font-bold uppercase">Create new Transaction</h1>
                <div className="flex justify-center mt-5 px-40 mx-40">
                    <div className="w-full max-w-md">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <AskingClientOrigin/>
                            <AskingAccountOrigin/>
                            <AskingClientDestination/>
                            <AskingAccountDestination/>
                            <div className="mb-4 mt-4">
                                <label className="mt-4 pl-4 my-2 bg-white border-l-8 border-yellow-500 text-gray-700 p-1 text-sm font-bold uppercase" htmlFor="amount">Amount</label>
                                <input className="text-center font-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                                       id="amount"
                                       type="number"
                                       placeholder="Please enter your Account Balance"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.amount}
                                />
                            </div>
                            { formik.touched.amount && formik.errors.amount ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.amount}</p>
                                </div>
                            ): null}
                            <button className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900`}
                                   type="submit"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>

            </Layout>
        </>
    )
}
export default NewTransaction