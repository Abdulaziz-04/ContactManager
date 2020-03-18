import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../ContextAPI/Auth/authContext';
import cmContext from '../ContextAPI/CM/cmContext';
import alertContext from '../ContextAPI/Alert/alertContext';

const Navbar = ({ title }) => {
    const Alc = useContext(alertContext);
    const Auc = useContext(authContext);
    const context = useContext(cmContext);
    const { clearContacts } = context;
    const { isAuth, user, logout } = Auc;
    const onLogout = () => {
        logout();
        Alc.setAlert('Logged out Succesfully', 'special');
        clearContacts();
    };
    const authList = (
        <Fragment>
            <ul>
                <li style={{ marginRight: '750px' }}>
                    <h1>Hello {user && user.name} !</h1>
                </li>
                <a href='#!' onClick={onLogout}>
                    <li>
                        <i className='fas fa-sign-out-alt'>Logout</i>
                    </li>
                </a>
            </ul>
        </Fragment>
    );
    const guestList = (
        <Fragment>
            <ul>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                <Link to='/about'>About</Link>
            </ul>
        </Fragment>
    );

    return (
        <nav
            className='navbar'
            style={{
                background: '#000080',
                color: 'white'
            }}
        >
            <h1>
                <i
                    className='fas fa-address-card '
                    style={{ marginRight: '0.5em', paddingLeft: '1em' }}
                ></i>

                {title}
            </h1>
            {isAuth === true ? authList : guestList}
        </nav>
    );
};

export default Navbar;
