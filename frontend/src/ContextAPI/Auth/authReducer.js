import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null,
                error: action.payload,
                loading: false
            };
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                user: null,
                error: null
            };
    }
};

export default authReducer;
