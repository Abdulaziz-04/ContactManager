import React, { useContext, useEffect } from 'react';
import Contactmap from './Contactmap';
import Form from './Form';
import Filter from './Filter';
import authContext from '../ContextAPI/Auth/authContext';
const Home = () => {
    const Auc = useContext(authContext);
    useEffect(() => {
        Auc.loadUser();
        //eslint-disable-next-line
    }, []);
    return (
        <div className='grid-2'>
            <div>
                <Form />
            </div>
            <div>
                <Filter />
                <Contactmap />
            </div>
        </div>
    );
};

export default Home;
