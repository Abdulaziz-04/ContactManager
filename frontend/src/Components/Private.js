import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../ContextAPI/Auth/authContext';

const Private = ({ component: Component, ...rest }) => {
    const Auc = useContext(authContext);
    const { isAuth, loading } = Auc;
    return (
        <Route
            {...rest}
            render={props =>
                !isAuth && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};
export default Private;
