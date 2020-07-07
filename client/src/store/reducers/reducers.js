import { combineReducers } from 'redux';
import Auth from './authReducer';
import Error from './errorReducer';

export default combineReducers({
    auth: Auth,
    error: Error
});
