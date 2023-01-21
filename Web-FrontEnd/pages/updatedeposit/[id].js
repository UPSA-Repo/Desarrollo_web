import React, {useState, useEffect} from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_DEPOSITS = gql`
    query GetDeposit($getDepositId: ID!) {
        getDeposit(id: $getDepositId) {
            id
            amount
            clientId
            branchId
        }
    }
`

const UPDATE_DEPOSIT = gql`
    mutation UpdateDeposit($updateDepositId: ID!, $input: DepositsInputs) {
        UpdateDeposit(id: $updateDepositId, input: $input) {
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

const UpdateDeposit = () => {
    const router = useRouter()

    const {query: {id, depositTerm, coin}} = router

    const [depositT, setDepositTerm] = useState(depositTerm)
    const [Coin, setCoin] = useState(coin)

    useEffect(() => {
        setDepositTerm(depositT)
    }, [depositT])

    useEffect(() => {
        setCoin(Coin)
    },[Coin])

    const SelectDepositTerm = (depositTerm) => {
        setDepositTerm(depositTerm)
    }

    const SelectCoin = (coin) => {
        setCoin(coin)
    }

    const schemaValidation = Yup.object({
        amount: Yup.number().required('The amount is required')
    })

    const [ UpdateDeposit ] = useMutation(UPDATE_DEPOSIT)

    const {data, loading, error} = useQuery(GET_DEPOSITS,{
        variables: {
            getDepositId: id
        }
    })
    if(loading)
        return null

    const {getDeposit} = data

    const UpdateInfoDeposit = async (values) => {
        const {amount} = values
        if(amount === 0){
            return (
                <div>
                    <p>Do not Update</p>
                </div>
            )
        }
        try {
            const {data} = await UpdateDeposit({
                //getDeposit.clientId.__ref.replace('Client:','')
                //getDeposit.branchId.__ref.replace('BranchOffice:','')
                variables: {
                    updateDepositId: id,
                    input: {
                        clientId: getDeposit.clientId,
                        branchId: getDeposit.branchId,
                        coin: Coin,
                        depositTerm: depositT,
                        amount
                    }
                }
            })
            await Swal.fire(
                'Update!',
                'Update Successful Deposit',
                'success'
            )
            await router.push('/deposit')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <h1 className="text-center text-2xl text-black font-bold uppercase">Update Deposit</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getDeposit}
                        onSubmit={ (values) => {
                            UpdateInfoDeposit(values)
                        }}
                    >
                        {props => {
                            return (
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
                                    <div className="mb-4">
                                        <p className="mt-4 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-1 text-sm font-bold">Select fixed deposit</p>
                                        <select className="w-full mt-2 bg-white border border-gray-400 text-black p-2 text-center rounded leading-tight uppercase text-xs font-bold"
                                                value={depositT}
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
                                                value={Coin}
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
                                               placeholder="Please enter your Amount"
                                               onChange={props.handleChange}
                                               onBlur={props.handleBlur}
                                               value={props.values.amount}
                                        />
                                        { props.touched.amount && props.errors.amount ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.amount}</p>
                                            </div>
                                        ): null}
                                    </div>
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

export default UpdateDeposit