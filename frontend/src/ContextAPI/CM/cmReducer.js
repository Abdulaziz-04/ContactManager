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
//State is immutable always so we always create a copy using the spread operator and then implement the required changes

const cmReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };
        case CREATE_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload
                ),
                loading: false
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload._id
                        ? action.payload
                        : contact
                ),
                loading: false
            };
        case CONTACT_ERROR:
            return {
                ...state,
                prb: action.payload
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filter: null
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                current: null,
                filter: null,
                prb: null
            };
        case SET_FILTER:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        contact.name.match(regex) || contact.email.match(regex)
                    );
                })
            };
    }
};

export default cmReducer;
