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
    from './actions';
import { returnErrors, clearErrors } from './errorActions';
import axios from 'axios';


export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({ type: USER_LOADED, payload: res.data })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        })
}

export const register = ({ name, regId, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ name, regId, password });
    axios.post('/api/register', body, config)
        .then(res => {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Register Fail'));
            dispatch({ type: REGISTER_FAIL });
        })
}

export const login = ({ regId, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ regId, password });
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'Login Fail'));
            dispatch({ type: LOGIN_FAIL });
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}