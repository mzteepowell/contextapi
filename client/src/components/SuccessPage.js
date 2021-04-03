import React from 'react';
import ConfettiPage from './Confetti';

const SuccessPage = () => {

    const onClick = () => {
        window.localStorage.removeItem('items');
        window.location.href = '/sellers';     
    }
    return (
        <div className='success-page'>
            <ConfettiPage />
            <div className='success'>
                <h1>Thanks for Renting</h1>
                    <button onClick={onClick}>Shop Again</button>
            </div>
        </div>
    )
}

export default SuccessPage;