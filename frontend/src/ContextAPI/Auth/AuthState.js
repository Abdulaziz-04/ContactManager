import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    CLEAR_ERRORS,
    USER_LOADED
} from '../types';
import Authtoken from '../../Components/Authtoken';

const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuth: null,
        error: null,
        loading: true
    };
    const register = async formData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    };
    const loadUser = async () => {
        if (localStorage.token) {
            Authtoken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/login');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
        }
    };
    const login = async formData => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/login', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }
    };
    const logout = () => {
        dispatch({ type: LOGOUT });
    };
    const clearError = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <authContext.Provider
            value={{
                user: state.user,
                error: state.error,
                isAuth: state.isAuth,
                token: state.token,
                loading: state.loading,
                register,
                clearError,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
