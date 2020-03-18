import React, { useContext } from 'react';
import cmContext from '../ContextAPI/CM/cmContext';

const CL = ({ contact }) => {
    const context = useContext(cmContext);

    const { _id, name, phone, email, type } = contact;

    return (
        <div className='card bg-light'>
            <h3 className=' text-left'>{name}</h3>
            <div
                className={
                    type === 'Professional' ? 'text-blue ' : 'text-success '
                }
            >
                <h4>[{type.charAt(0).toUpperCase() + type.slice(1)}]</h4>
            </div>
            <ul>
                {email && (
                    <li>
                        <h3>
                            <i className='fas fa-envelope'></i> : {email}
                        </h3>
                    </li>
                )}
                <li>
                    <h3>
                        <i className='fas fa-phone-alt'> : {phone}</i>
                    </h3>
                </li>
            </ul>
            <p>
                <button
                    className='btn btn-dark btn-sm'
                    onClick={() => {
                        context.setCurrent(contact);
                    }}
                >
                    Edit
                </button>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={() => {
                        context.deleteContact(_id);
                        context.remCurrent();
                    }}
                >
                    Delete
                </button>
            </p>
        </div>
    );
};

export default CL;
