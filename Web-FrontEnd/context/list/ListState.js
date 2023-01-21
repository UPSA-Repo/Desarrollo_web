import React, {useReducer} from "react";
import ListContext from "./ListContext";
import ListReducer from "./ListReducer";

import {
    SELECT_BANK,
    SELECT_CLIENT,
    SELECT_BRANCH,
    SELECT_ACCOUNT,
    SELECT_CLIENT_ORIGIN,
    SELECT_CLIENT_DESTINATION,
    SELECT_ACCOUNT_ORIGIN,
    SELECT_ACCOUNT_DESTINATION,
    SELECT_TRANSACTION
} from "../../types";

const ListState = ({children}) => {
    const initialState = {
        bank: {},
        client: {},
        branch: {},
        account: {},
        transactionClient: {},
        clientOrigin: {},
        clientDestination: {},
        accountOrigin: {},
        accountDestination: {}
    }

    const [ state, dispatch ] = useReducer(ListReducer,initialState)

    const AddBank = (bank) => {
        dispatch({
            type: SELECT_BANK,
            payload: bank
        })
    }

    const AddClient = (client) => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })
    }

    const AddBranch = (branch) => {
        dispatch({
            type: SELECT_BRANCH,
            payload: branch
        })
    }

    const AddAccount = (account) => {
        dispatch({
            type: SELECT_ACCOUNT,
            payload: account
        })
    }

    const AddClientOrigin = (client) => {
        dispatch({
            type: SELECT_CLIENT_ORIGIN,
            payload: client
        })
    }

    const AddClientDestination = (client) => {
        dispatch({
            type: SELECT_CLIENT_DESTINATION,
            payload: client
        })
    }

    const AddAccountOrigin = (account) => {
        dispatch({
            type: SELECT_ACCOUNT_ORIGIN,
            payload: account
        })
    }

    const AddAccountDestination = (account) => {
        dispatch({
            type: SELECT_ACCOUNT_DESTINATION,
            payload: account
        })
    }

    const AddTransaction = (transactionClient) => {
        dispatch({
            type: SELECT_TRANSACTION,
            payload: transactionClient
        })
    }

    return (
        <ListContext.Provider
            value={{
                bank: state.bank,
                client: state.client,
                branch: state.branch,
                account: state.account,
                transactionClient: state.transactionClient,
                clientOrigin: state.clientOrigin,
                clientDestination: state.clientDestination,
                accountOrigin: state.accountOrigin,
                accountDestination: state.accountDestination,
                AddBank,
                AddClient,
                AddBranch,
                AddAccount,
                AddTransaction,
                AddClientOrigin,
                AddClientDestination,
                AddAccountOrigin,
                AddAccountDestination
            }}
        >{children}
        </ListContext.Provider>
    )

}

export default ListState