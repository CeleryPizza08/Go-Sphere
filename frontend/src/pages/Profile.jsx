import { useEffect, useState } from 'react'
import { ProfileSideBar, PInfo } from '../Components'
import styles from '../style'

const Profile = () => {

    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem('userID');

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
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            setUserData(data);
            setTimeout(() => {
                setLoading(true);
            }, 3500);
        } catch (err) {
            throw err;
        }
    };


    return (
        <div className={`${styles.marginX} min-h-[600px] w-full flex flex-row`}>
            <ProfileSideBar />
            <PInfo userData={userData} />
        </div>
    )
}


export default Profile