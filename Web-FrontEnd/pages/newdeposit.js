import React, {useState, useEffect, useContext} from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import AskingClient from "../components/list/AskingClient";
import AskingBranchOffice from "../components/list/AskingBranchOffice";
import ListContext from "../context/list/ListContext";


const NEW_DEPOSIT = gql`
    mutation NewDeposit($input: DepositsInputs) {
        NewDeposit(input: $input) {
            id
            userId
            clientId
            branchId
            dateDeposit
            depositTerm
            coin
            amount
        }
    }
`

const NewDeposit = () => {
    const router = useRouter()

    const [depositTerm, setDepositTerm] = useState('SIX_MONTHS')
    const [coin, setCoin] = useState('BOL')

    const listContext = useContext(ListContext)
    const {client, branch} = listContext


    useEffect(() => {
        setDepositTerm(depositTerm)
    }, [depositTerm])

    useEffect(() => {
        setCoin(coin)
    },[coin])

    const SelectDepositTerm = (depositTerm) => {
        setDepositTerm(depositTerm)
    }

    const SelectCoin = (coin) => {
        setCoin(coin)
    }

    const [ NewDeposit ] = useMutation(NEW_DEPOSIT)

    const formik = useFormik({
        initialValues: {
            amount: 0
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('The amount is required')
        }),
        onSubmit: async (values) => {
            const {amount} = values
            if(amount === 0){
                return (
                    <div>
                        <p>Do not Create</p>
                    </div>
                )
            }
            try {
                const {data} = await NewDeposit({
                    variables: {
                        input: {
                            clientId: client.id,
                            branchId: branch.id,
                            depositTerm,
                            coin,
                            amount
                        }
                    }
                })
                await Swal.fire(
                    'Successful',
                    'The deposit has been successfully registered',
                    'success'
                )
                await router.push('/deposit')
            } catch (e) {
                console.log(e)
            }
        }
    })

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-black font-bold uppercase">Create new Deposit</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <AskingClient/>
                            <AskingBranchOffice/>
                            <div className="mb-4">
                                <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select fixed deposit</p>
                                <select className="w-full mt-2 bg-white border border-gray-400 text-black p-2 text-center rounded leading-tight uppercase text-xs font-bold"
                                        value={depositTerm}
                                        onChange={e => SelectDepositTerm(e.target.value)}
                                >
                                    <option value="SIX_MONTHS">SIX_MONTHS</option>
                                    <option value="TWELVE_MONTHS">TWELVE_MONTHS</option>
                                    <option value="TWENTY_FOUR_MONTHS">TWENTY_FOUR_MONTHS</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select a coin</p>
                                <select className="w-full mt-2 bg-white border border-gray-400 text-black p-2 text-center rounded leading-tight  uppercase text-xs font-bold"
                                        value={coin}
                                        onChange={e => SelectCoin(e.target.value)}
                                >
                                    <option value="BOL">BOL</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold" htmlFor="amount">Amount</label>
                                <input className="shadow mt-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                       id="amount"
                                       type="number"
                                       placeholder="Please enter your Account Balance"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.amount}
                                />
                                { formik.touched.amount && formik.errors.amount ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.amount}</p>
                                    </div>
                                ): null}
                            </div>
                            <input className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900}`}
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

export default NewDeposit