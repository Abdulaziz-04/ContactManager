import React, { useContext } from 'react';
import alertContext from '../ContextAPI/Alert/alertContext';

const Alerts = () => {
    const context = useContext(alertContext);
    const { alerts, remAlert } = context;
    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <div className={`alert alert-${alert.type}`} key={alert.id}>
                <i className='fas fa-info-circle' /> {alert.msg}
                <button
                    onClick={remAlert}
                    className='btn btn-sm'
                    style={{
                        background:
                            alert.type === 'danger' ? '#dc3545' : '#28a745',
                        marginLeft: '751px'
                    }}
                >
                    <i
                        style={{ color: 'white' }}
                        className='fas fa-times-circle'
                    />
                </button>
            </div>
        ))
    );
};

export default Alerts;
