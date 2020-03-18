import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT, CLOSE_ALERT } from '../types';
const uuid = require('uuid');

const AlertState = props => {
    const initialState = {
        alerts: []
    };
    const [state, dispatch] = useReducer(alertReducer, initialState);
    const setAlert = (msg, type) => {
        const id = uuid.v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: { id } }),
            7000
        );
    };
    const remAlert = () => {
        dispatch({ type: CLOSE_ALERT });
    };
    return (
        <alertContext.Provider
            value={{
                alerts: state.alerts,
                setAlert,
                remAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    );
};

export default AlertState;
