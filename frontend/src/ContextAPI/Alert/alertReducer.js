import { REMOVE_ALERT, SET_ALERT, CLOSE_ALERT } from '../types';

const alertReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            };
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(
                    alert => alert.id === action.payload
                )
            };
        case CLOSE_ALERT:
            return {
                alerts: []
            };
        default:
            return state;
    }
};

export default alertReducer;
