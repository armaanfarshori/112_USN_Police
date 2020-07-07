import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
}
    from '../actions/actions';

const initState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: false,
    user: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                user: action.payload
            }
        case USER_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                isLoading: false
            }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuth: false,
                user: null,
                isLoading: false,
                token: null
            }
        default:
            return state;
    }
}

export default reducer;