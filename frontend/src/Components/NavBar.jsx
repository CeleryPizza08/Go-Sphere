import { React, useState } from 'react';
import { logo, cart, avatar } from '../assets/index';
import styles from '../style';
import { navlink } from '../constants';
import { NavLink, useNavigate } from 'react-router-dom';


function NavBar() {

    const [isActive, setIsActive] = useState('false');


    const navigate = new useNavigate();

    function navigateHandler() {
        navigate('');
    }

    const handler = () => {
        localStorage.setItem('selectedKey', 'profile');
    }

    return (
        <nav className={`${styles.paddingX} ${styles.flexCenter} bg-primary box-shadow-down`}>
            <div className="w-full flex my-1 h-[60px] items-center navbar">
                <img src={logo} alt="roamriders" className="w-[40px] h-[40px] object-contain cursor-pointer ml-8" onClick={navigateHandler} />
                <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
                    {navlink.map((nav) => (
                        <li key={nav.link}
                            className={`font-inter font-regular text-[16px] items-center cursor-pointer text-highblack mx-[40px] px-0`} >
                            <NavLink to={nav.link}>{nav.title}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className='w-8 h-8 rounded-full bg-primary object-contain ml-5'>
                    <NavLink to={'Profile'} onClick={handler}>
                        <img src={avatar} alt='user' className='w-[60%] h-[60%] relative cursor-pointer top-[18%] left-[20%]' />
                    </NavLink >
                </div>
            </div>
        </nav >
    )
}

export default NavBar;