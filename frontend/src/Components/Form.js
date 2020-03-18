import React, { useState, useContext, useEffect } from 'react';
import cmContext from '../ContextAPI/CM/cmContext';
//UseEffect hook is similar to the concept of ComponentDidMount
const Form = () => {
    const context = useContext(cmContext);
    const { addContact, updateContact, current } = context;
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'Personal'
            });
        }
    }, [context, current]);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'Personal'
    });
    const { name, email, phone, type } = contact;
    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        context.remCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-blue'>
                {context.current ? 'EDIT CONTACT' : 'ADD CONTACT'}
            </h2>
            <input
                type='text'
                value={name}
                placeholder='Name'
                name='name'
                onChange={onChange}
                required
            />
            <input
                type='email'
                value={email}
                placeholder='Email'
                name='email'
                onChange={onChange}
                required
            />
            <input
                type='text'
                value={phone}
                placeholder='Phone'
                name='phone'
                onChange={onChange}
                required
            />
            <h5>
                <div>Contact Type:</div>
                <input
                    type='radio'
                    checked={type === 'Personal'}
                    value='Personal'
                    name='type'
                    onChange={onChange}
                />
                Personal
                <input
                    type='radio'
                    value='Professional'
                    name='type'
                    checked={type === 'Professional'}
                    onChange={onChange}
                    style={{ marginLeft: '8px' }}
                />
                Professional
            </h5>
            <input
                type='submit'
                value={context.current ? 'Update Contact' : 'Add Contact'}
                className='btn btn-primary btn-block'
            />
            {current && (
                <button
                    className='btn btn-light btn-block'
                    onClick={() => {
                        context.remCurrent();
                    }}
                >
                    Clear
                </button>
            )}
        </form>
    );
};

export default Form;
