import React from 'react';

const About = () => {
    return (
        <div>
            <h1>About this Page</h1>
            <p className='my-1'>
                <strong>
                    This Application is used to manage all of your contacts
                    online!
                </strong>
            </p>
            <p className='text-center dark bg-dark p'>
                <strong>Version 1.0.0</strong>
            </p>
            <footer>
                <h2
                    style={{
                        backgroundColor: '#F8F8F8',
                        borderTop: '1px solid #E7E7E7',
                        textAlign: 'center',
                        padding: '20px',
                        position: 'fixed',
                        left: '0',
                        bottom: '0',
                        height: '60px',
                        width: '100%'
                    }}
                >
                    <i className='fab fa-autoprefixer' /> Created By : Abdulaziz
                    Suria <i className='fab fa-autoprefixer' />
                </h2>
            </footer>
        </div>
    );
};
export default About;
