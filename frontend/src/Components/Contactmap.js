import React, { useContext, Fragment, useEffect } from 'react';
import cmContext from '../ContextAPI/CM/cmContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spin from '../Components/Spinner/Spin';
import CL from './CL';

const Contactmap = () => {
    const context = useContext(cmContext);
    const { contacts, filter, getContacts, loading } = context;
    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);
    if (contacts !== null && contacts.length === 0) {
        return <h3>Please add Contacts...</h3>;
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filter !== null
                        ? filter.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={{ appear: 0, enter: 0, exit: 300 }}
                                  classNames='roll'
                              >
                                  <CL contact={contact} />
                              </CSSTransition>
                          ))
                        : contacts.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={{
                                      appear: 0,
                                      enter: 0,
                                      exit: 300
                                  }}
                                  classNames='roll'
                              >
                                  <CL contact={contact} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            ) : (
                <Spin />
            )}
        </Fragment>
    );
};
export default Contactmap;
