import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import AuthState from './ContextAPI/Auth/AuthState';
import CmState from './ContextAPI/CM/CmState';
import AlertState from './ContextAPI/Alert/AlertState';
import Register from './Components/Register';
import Login from './Components/Login';
import Alerts from './Components/Alerts';
import Authtoken from './Components/Authtoken';
import Private from './Components/Private';

//If user is already registered i.e.checking if he/she has the token
if (localStorage.token) {
    Authtoken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <CmState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar title='Contact Manager' />

                            <div className='container'>
                                <Alerts />
                                <Switch>
                                    <Private exact path='/' component={Home} />
                                    <Route
                                        exact
                                        path='/about'
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path='/register'
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path='/login'
                                        component={Login}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </CmState>
        </AuthState>
    );
};

export default App;
