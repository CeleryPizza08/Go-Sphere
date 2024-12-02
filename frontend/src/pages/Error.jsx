import React from 'react'
import styles from '../style'
import { useNavigate } from 'react-router-dom';



function Error() {

    const navigate = new useNavigate();

    function navigateHandler() {
        navigate('');
    }

    return (
        <div className='items-center'>
            <h2 className={`${styles.flexCenter} ${styles.heading2}`}>
                Error has occured!
            </h2>
            <div className='flex items-center justify-center'>
                <button
                    className={`font-inter font-medium text-[22px] mt-15% border border-secondary px-4 border-2 rounded-[5px] hover:bg-secondary transition ease-in-out`}
                    onClick={navigateHandler}>
                    Click here to navigate back to Home!</button>
            </div>
        </div>
    )
}


export default Error