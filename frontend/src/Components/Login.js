import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../ContextAPI/Alert/alertContext';
import authContext from '../ContextAPI/Auth/authContext';
export const Login = props => {
    const Alc = useContext(alertContext);
    const Auc = useContext(authContext);
    const { setAlert } = Alc;
    const { isAuth, login, error, clearError } = Auc;
    useEffect(() => {
        if (isAuth) {
            props.history.push('/');
        }
        if (error === 'Invalid Email or Password') {
            setAlert('Inavlid Credentials', 'danger');
            clearError();
        }
        //eslint-disable-next-line
    }, [error, props.history, isAuth]);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { email, password } = user;
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = e => {
        e.preventDefault();
        login({
            email,
            password
        });
    };
    return (
        <div className='container input-size'>
            <h1 className='text-center'>
                Account <span className='text-blue '>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
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
                        required
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
                        required
                        onChange={onChange}
                    />
                </div>
                <input className='btn btn-blue' type='submit' value='Login' />
            </form>
        </div>
    );
};

export default Login;
