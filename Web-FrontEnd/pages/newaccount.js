import React, {useState, useContext, useEffect} from "react";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import AskingClient from "../components/list/AskingClient";
import AskingBranchOffice from "../components/list/AskingBranchOffice";
import ListContext from "../context/list/ListContext";

const NEW_ACCOUNT = gql`
    mutation NewAccount($input: AccountInputs) {
        NewAccount(input: $input) {
            id
            clientId
            bankId
            branchId
            numberAccount
            accountBalance
            typeAccount
        }
    }
`

const NewAccount = () => {
    const router = useRouter()

    const [category, setCategory] = useState('SAVINGS_BANK')

    useEffect(()=> {
        setCategory(category)
    },[category])

    const selectCategory = (category) => {
        setCategory(category)
    }

    const [message, saveMessage] = useState(null)

    const listContext = useContext(ListContext)
    const {client, branch} = listContext


    const [ NewAccount ] = useMutation(NEW_ACCOUNT)

    const formik = useFormik({
        initialValues: {
            numberAccount: '',
            accountBalance: 0
        },
        validationSchema: Yup.object({
            numberAccount: Yup.string().required('The number account is required').max(10,'Max ten numbers required').min(10,'Min ten numbers required').matches(/^[0-9]*$/,'Only numbers'),
            accountBalance: Yup.number().required('The balance is required')
        }),
        onSubmit: async (values) => {
            const {numberAccount, accountBalance} = values
            try {
                const { data } = await NewAccount({
                    variables: {
                        input: {
                            clientId: client.id,
                            branchId: branch.id,
                            numberAccount,
                            accountBalance,
                            typeAccount: category
                        }
                    }
                })
                await Swal.fire(
                    'Successful',
                    'the account has been successfully registered',
                    'success'
                )

                await router.push('/')

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
        return client.length === 0 || branch.length === 0 ||
                formik.touched.numberAccount && formik.errors.numberAccount || formik.values.numberAccount.length === 0 ||
                formik.touched.accountBalance && formik.errors.accountBalance || formik.values.accountBalance.length === 0 ?
                'opacity-50 cursor-not-allowed' : ''
    }

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-black font-bold uppercase">Create new Account</h1>
                {message && viewMessage()}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <AskingClient/>
                            <AskingBranchOffice/>
                            <div className="mb-4 mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberAccount">Number Account</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="numberAccount"
                                       type="text"
                                       placeholder="Please enter your number account"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.numberAccount}
                                />
                            </div>
                            { formik.touched.numberAccount && formik.errors.numberAccount ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.numberAccount}</p>
                                </div>
                            ): null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountBalance">Account Balance</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="accountBalance"
                                       type="number"
                                       placeholder="Please enter your Account Balance"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.accountBalance}
                                />
                            </div>
                            { formik.touched.accountBalance && formik.errors.accountBalance ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.accountBalance}</p>
                                </div>
                            ): null}
                            <div className="mb-4">
                                <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a type Account</p>
                                <select
                                    className="appearance-none w-full mt-2 bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                                    value={category}
                                    onChange={e => selectCategory(e.target.value)}
                                >
                                    <option value="SAVINGS_BANK">SAVINGS_BANK</option>
                                    <option value="CURRENT_ACCOUNT">CURRENT_ACCOUNT</option>
                                </select>
                            </div>

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

export default NewAccount