import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Router from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";


const UPDATE_ACCOUNT = gql`
    mutation UpdateAccount($updateAccountId: ID!, $input: AccountInputs) {
        UpdateAccount(id: $updateAccountId, input: $input) {
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

const GET_ACCOUNT = gql`
    query GetAccount($getAccountId: ID!) {
        getAccount(id: $getAccountId) {
            id
            clientId {
                id
                name
                lastname
            }
            bankId
            branchId
            numberAccount
            accountBalance
            typeAccount
        }
    }
`

const UpdateAccount = () => {
    const router = useRouter()

    const {query: {id}} = router


    const {data, loading, error} = useQuery(GET_ACCOUNT,{
        variables: {
            getAccountId: id
        }
    })

    const [ UpdateAccount ] = useMutation(UPDATE_ACCOUNT)

    const SchemaValidation = Yup.object({
        numberAccount: Yup.string().required('The number account is required').max(10,'Max ten numbers required').min(10,'Min ten numbers required').matches(/^[0-9]*$/,'Only numbers'),
        accountBalance: Yup.number().required('The balance is required')
    })

    if(loading)
        return null

    const { getAccount } = data

    const UpdateInfoAccount = async (values) => {
        const {numberAccount, accountBalance} = values
        try {
            const {data} = await UpdateAccount({
                variables: {
                    updateAccountId: id,
                    input: {
                        clientId: getAccount.clientId.id,
                        branchId: getAccount.branchId,
                        numberAccount,
                        accountBalance
                    }
                }
            })
            await Swal.fire(
                'Update!',
                'Update Successful Account',
                'success'
            )
            await router.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <h1 className="text-center text-2xl text-black font-bold uppercase">Update Account</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <Formik
                        validationSchema={SchemaValidation}
                        enableReinitialize
                        initialValues={getAccount}
                        onSubmit={ (values) => {
                            UpdateInfoAccount(values)
                        }}
                    >
                        {props => {
                            return (
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
                                    <div className="mb-4 mt-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberAccount">Number Account</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="numberAccount"
                                               type="text"
                                               placeholder="Please enter your number account"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.numberAccount}
                                        />
                                    </div>
                                    { props.touched.numberAccount && props.errors.numberAccount ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.numberAccount}</p>
                                        </div>
                                    ): null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountBalance">Account Balance</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                               id="accountBalance"
                                               type="number"
                                               placeholder="Please enter your Account Balance"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.accountBalance}
                                        />
                                    </div>
                                    { props.touched.accountBalance && props.errors.accountBalance ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.accountBalance}</p>
                                        </div>
                                    ): null}

                                    <input className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900`}
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

export default UpdateAccount