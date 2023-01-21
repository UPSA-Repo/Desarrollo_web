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


export default ( state, action ) => {
    switch (action.type) {
        case SELECT_BANK:
            return {
                ...state,
                bank: action.payload
            }
        case SELECT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case SELECT_BRANCH:
            return {
                ...state,
                branch: action.payload
            }
        case SELECT_ACCOUNT:
            return {
                ...state,
                account: action.payload
            }
        case SELECT_TRANSACTION:
            return {
                ...state,
                transactionClient: action.payload
            }
        case SELECT_CLIENT_ORIGIN:
            return {
                ...state,
                clientOrigin: action.payload
            }
        case SELECT_CLIENT_DESTINATION:
            return {
                ...state,
                clientDestination: action.payload
            }
        case SELECT_ACCOUNT_ORIGIN:
            return {
                ...state,
                accountOrigin: action.payload
            }
        case SELECT_ACCOUNT_DESTINATION:
            return {
                ...state,
                accountDestination: action.payload
            }
        default:
            return state
    }
}