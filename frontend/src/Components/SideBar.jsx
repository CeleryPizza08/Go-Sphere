import React from 'react'
import { wong } from '../assets'
import styles from '../style'
import { NavLink, useNavigate } from 'react-router-dom'
import CheckBtn from './CheckBtn'

function SideBar() {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/Marketplace');
    }

    return (
        <div className='w-[18vw] h-auto px-4 pt-16'>
            <div className={`${styles.sideTitle} text-highblack w-fit flex items-center cursor-pointer py-2`}>
                <img src={wong} className={`${styles.pIcon} rounded-full`} />
                <p className={'w-fit pl-2 text-left'}>Wong Zhan Choon</p>
            </div>
            <NavLink to={'/Create/Plan'} className={`${styles.sideTitle} w-fit flex items-center cursor-pointer py-2 hov text-highblack hover:text-secondary`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor"
                    className={`${styles.sideIcon} mx-2`}>
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule
            </NavLink>

            <NavLink to={'/Create/Info'} className={`${styles.sideTitle} w-fit flex items-center cursor-pointer py-2 hov text-highblack hover:text-secondary`}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class={`${styles.sideIcon} mx-2`}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                General Info
            </NavLink>

            <CheckBtn />
            <button
                className='w-[50%] flex justify-center items-center border border-secondary rounded-[20px] mx-10 my-4 py-1 font-inter text-[18px] text-primary bg-secondary'
                onClick={navigateHandler}>
                Create
            </button>
        </div >
    )
}


export default SideBar