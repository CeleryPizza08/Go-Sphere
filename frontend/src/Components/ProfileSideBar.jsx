import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import { Menu } from 'antd';
import { MessageFilled, SettingFilled } from '@ant-design/icons';
import { VanIcon, ProfileIcon, Logout } from '../assets';


const ProfileSideBar = () => {

    const getItem = (title, key, icon, route) => {
        return {
            title,
            key,
            icon,
            route,
        };
    }

    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(() => {
        const storedKey = localStorage.getItem('selectedKey');
        return storedKey ? [storedKey] : ['profile']; // Default selected key
    });

    const items = [
        getItem('Profile', 'profile', <ProfileIcon />, '/Profile'),
        getItem('Message', 'message', <MessageFilled style={{ fontSize: '22px', padding: '0px 10px 0px 0px' }} />, '/Profile/Message'),
        getItem('Posts List', 'postlist', <VanIcon />, '/Profile/PostList'),
        getItem('Settings', 'settings', <SettingFilled style={{ fontSize: '20px', padding: '0px 10px 0px 0px' }} />, '/Profile/Settings'),
        getItem('Logout', 'logout', <Logout />, ''),
    ]

    const sideBarHandler = ({ key }) => {
        const selectedKey = items.find(item => item.key === key);
        if (key == 'logout') {
            logoutHandler();
        }
        else {
            localStorage.setItem('selectedKey', key);
            setSelectedKey([key]);
            navigate(selectedKey.route);
        }
    }


    const logoutHandler = () => {
        localStorage.removeItem('selectedKey');
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userID');
        navigate('/');
    }

    return (
        <div className=' pl-5 mt-16 flex justify-start items-start'>
            <Menu mode="inline"
                onClick={sideBarHandler}
                defaultSelectedKeys={selectedKey}
                style={{
                    width: 256,
                    borderWidth: '2px',
                    borderRadius: '8px',
                    background: 'transparent'
                }}>
                {items.map(item => (
                    <Menu.Item key={item.key} icon={item.icon} style={{ padding: '25px 20px', fontSize: '18px', borderRadius: '8px' }}>
                        <div className='flex flex-row items-center justify-start'>
                            {item.title}
                        </div>
                    </Menu.Item>
                ))}
            </Menu >
        </div >
    )
}

export default ProfileSideBar