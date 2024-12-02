import React from 'react'
import styles from '../style'
import { Tag, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Cards({ post, role }) {
    const navigate = useNavigate();

    const navigating = (post, role) => {
        navigate(`/Marketplace/detail/${post.postID}/?role=${role}`, { state: { post } });
    }

    return (
        <div className='w-[60vw] min-h-[22vh] my-6 border-2 shadow-md rounded-[10px] bg-boxlightblue border-boxlightblue hover:border-secondary transition duration-300 flex items-start justify-start '>

            <div className='w-[10vw] min-h-[22vh] flex justify-center items-center border-2 border-secondary bg-secondary rounded-l-[8px]'>
                <img src={post.creator.imageURL} size={120} className='flex w-[7vw] items-center bg-bgblue justify-center rounded-full' />
            </div>
            <div className='h-fit pl-5 flex flex-col justify-between bg-boxlightblue rounded-[10px]'>
                <div className='w-full flex flex-row bg-boxlightblue rounded-[10px]'>
                    <div className='w-full gap-5 flex flex-row bg-boxlightblue rounded-[10px]'>
                        <p className='w-fit pt-3 flex items-start justify-center font-trip text-[22px] font-semibold text-secondary'>{post.creator.name}</p>
                        <Tag color='#2679F5' className='my-4 rounded-full text-[12px] flex justify-center items-center'>
                            {post.creator.country} </Tag>
                    </div>
                    <div className='w-full flex flex-col mr-3 rounded-[10px]'>
                        <p className='w-full mr-3 flex justify-end items-start pt-3 font-trip text-blueblack text-[20px] font-semibold'>{`RM` + post.price}</p>
                        <p className='w-full mr-3 flex justify-end font-semibold text-infoblack items-startfont-inter text-[11px]'>including charges and more</p>
                    </div>
                </div>
                <div className='w-full h-fit flex flex-row gap-[10vw] bg-boxlightblue rounded-[10px]'>
                    <p className='w-[35vw] h-fit mt-3 flex justify-start font-semibold text-blueblack items-start font-trip text-[13px]'>{post.descriptions}</p>
                    <Button onClick={() => navigating(post, role)} 
                        className='w-[4vw] h-full mt-[10.5vh] mr-2 flex border-secondary justify-center items-center bg-secondary text-primary text-[14px]'>
                        Details</Button>
                </div>
            </div>
        </ div >
    )
}

export default Cards