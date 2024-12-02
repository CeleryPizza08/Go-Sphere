import React from 'react'
import { ProfileSideBar } from '../Components';
import styles from '../style';

const Settings = () => (
    <div className={`${styles.marginX} min-h-[800px] w-full flex flex-row`}>
        <ProfileSideBar />
        <div className='w-full text-[14px] flex flex-col'>
            <div className='w-full mx-[10vw] mt-[6vh]'>
                <p className='font-inter text-[22px] font-semibold'>Settings</p>
                <p className='my-10 font-inter text-[16px] font-semibold'>Password</p>
                <p className='my-4 font-inter text-[16px] font-semibold'>Delete account</p>
            </div>
        </div>
    </div>
)


export default Settings;