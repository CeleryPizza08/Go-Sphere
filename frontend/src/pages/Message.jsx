import React, { useEffect } from 'react'
import { ProfileSideBar } from '../Components'
import styles from '../style'

function Message() {

    const token = localStorage.getItem('token');

    useEffect(() => {
        const isAuth = async () => {
            await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then(async res => {
                if (res.status === 401) {
                    return res.json().then(data => {
                        window.location.href = data.redirectTo; // Redirect the browser to the specified URL
                    });
                }
            }).catch(err => {
                console.log(err);
            })

        }
        isAuth();
    }, []);

    return (
        <div className={`${styles.marginX} w-full min-h-[800px] flex flex-row `}>
            <ProfileSideBar />
            Message
        </div>
    )
}


export default Message