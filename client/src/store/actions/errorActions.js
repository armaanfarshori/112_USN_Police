import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actions';

export const returnErrors = (msg, status, id) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg,
            status,
            id
        }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}