import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../ContextAPI/Alert/alertContext';
import authContext from '../ContextAPI/Auth/authContext';

export const Register = props => {
    const Alc = useContext(alertContext);
    const Auc = useContext(authContext);
    const { setAlert } = Alc;
    const { register, error, clearError, isAuth } = Auc;
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });
    useEffect(() => {
        if (isAuth) {
            props.history.push('/'); //redirects to the home page
            setAlert('Registered Successfully', 'special');
        }
        if (error != null) {
            setAlert('Email already exists', 'danger');
            clearError();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);
    const { name, email, password, confirm } = user;
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please fill out all the details', 'danger');
        } else if (password !== confirm) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        }
    };
    return (
        <div className='container input-size'>
            <h1 className='text-center' style={{ marginBottom: '2rem' }}>
                Account
                <span className='text-blue'> Register </span>{' '}
            </h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>
                        <strong>Name :</strong>
                    </label>
                    <input
                        style={{ marginTop: '0px', marginBottom: '1.8rem' }}
                        type='text'
                        value={name}
                        name='name'
                        placeholder='Enter Name'
                        minLength='3'
                        onChange={onChange}
                    />
                </div>

                <div>
                    <label htmlFor='email'>
                        <strong>Email :</strong>
                    </label>
                    <input
                        className='form-group'
                        type='email'
                        value={email}
                        name='email'
                        placeholder='Enter Email'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>
                        <strong>Password :</strong>
                    </label>
                    <input
                        className='form-group'
                        type='password'
                        value={password}
                        name='password'
                        placeholder='Enter Password'
                        minLength='5'
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor='confirm'>
                        <strong>Confirm Password :</strong>{' '}
                    </label>
                    <input
                        className='form-group'
                        type='password'
                        value={confirm}
                        name='confirm'
                        placeholder='Re-enter Password'
                        minLength='5'
                        onChange={onChange}
                    />
                </div>
                <input
                    className='btn btn-blue'
                    type='submit'
                    value='Register'
                />
            </form>
        </div>
    );
};

export default Register;
