import React, { useReducer } from 'react';
import cmContext from './cmContext';
import cmReducer from './cmReducer';
import {
    CREATE_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_FILTER,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';
import axios from 'axios';

const CmState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filter: null,
        prb: null
    };
    const [state, dispatch] = useReducer(cmReducer, initialState);
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: CREATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
        }
    };
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`,
                contact,
                config
            );
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
        }
    };
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
        }
    };
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    const remCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const setFilter = text => {
        dispatch({ type: SET_FILTER, payload: text });
    };
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
        }
    };
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };
    return (
        <cmContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                prb: state.prb,
                setCurrent,
                remCurrent,
                addContact,
                deleteContact,
                updateContact,
                setFilter,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </cmContext.Provider>
    );
};

export default CmState;
