import React, { useRef, useContext, useEffect } from 'react';
import cmContext from '../ContextAPI/CM/cmContext';

export const Filter = () => {
    const context = useContext(cmContext);
    const text = useRef(''); //The useRef hook has the current property which is quite advantageous in these cases
    const onChange = e => {
        if (text.current.value !== '') {
            context.setFilter(e.target.value);
        } else {
            context.clearFilter();
        }
    };
    useEffect(() => {
        if (context.filter === null) {
            text.current.value = '';
        }
    });
    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    );
};

export default Filter;
