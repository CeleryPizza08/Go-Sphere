import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import styles from '../style'
import { Image, Button } from 'antd';
import { Accordion, GeoLoc } from '../Components';

const PostDetails = () => {

    const location = useLocation();
    const post = location.state && location.state.post;
    const queryParams = new URLSearchParams(window.location.search);
    const role = queryParams.get('role');
    console.log(role);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const StartDate = formatDate(post.date[0]);
    const EndDate = formatDate(post.date[1]);

    return (
        <div className={`${styles.paddingX} min-h-[1200px] mt-10 flex flex-col items-start justify-start`}>
            <p className={`${styles.paddingX} w-full font-trip font-semibold text-[26px] text-blueblack pt-5`}>Itinerary Planner</p>
            <div className={`${styles.paddingX} w-full mt-5 flex flex-row gap-20 justify-start items-center`}>
                <div className={`${styles.boxShadow} w-[40vw] px-5 flex items-center justify-center bg-boxlightblue overflow-auto border rounded-[10px]`}>
                    <Accordion />
                </div>
                <GeoLoc />
            </div>
            <p className={`${styles.paddingX} font-trip text-[28px] mt-10 font-semibold`}>Driver Information</p>
            <div className='w-[80vw] flex flex-row items-start justify-start'>
                <div className={`${styles.paddingX} ${styles.boxShadow} w-full mx-10 p-5 mt-5 bg-boxlightblue border rounded-[10px] h-fit gap-10 grid grid-cols-3 items-center`}>
                    <div className='grid items-center justify-center col-span-1'>
                        <Image src={post.creator.imageURL} width={150} preview={false} className='rounded-[10px]'></Image>
                    </div>
                    <div className='w-[30vw] grid gap-3 items-start justify-start'>
                        <p className='w-fit h-full font-trip text-[20px] grid font-semibold '>{`Name: ` + post.creator.name}</p>
                        <p className='w-fit h-full font-trip text-[20px] grid font-semibold '>{`Nationality: ` + post.creator.country}</p>
                        <p className='w-fit h-full font-trip text-[20px] grid font-semibold '>{`Phone: ` + post.creator.phone}</p>
                    </div>
                    <div className='w-fit grid items-end justify-end'>
                        <Button className='w-fit border-secondary justify-center items-center bg-secondary text-primary text-[14px]'>Chat with Driver</Button>
                    </div>
                </div>
                <div className='mr-11 mt-5 w-[25vw] h-[25vh] bg-boxlightblue border-2 rounded-[10px] flex flex-col justify-center items-center'>
                    <p className='w-full flex justify-center items-center font-trip text-blueblack text-[20px] font-semibold'>{`RM ` + post.price}</p>
                    <Button className='w-[12vw] py-5 mt-4 border-secondary flex justify-center items-center bg-secondary text-primary text-[18px]'>{role === 'driver' ? 'Vote Interested' : 'Book Now !'}</Button>
                </div>
            </div>
            <p className={`${styles.paddingX} mt-5 w-full font-trip font-semibold text-[26px] text-blueblack py-4`}>Travel Details</p>
            <div className={`${styles.paddingX} w-full h-full mt-5 flex flex-row gap-20 justify-start items-center`}>
                <div className={`${styles.boxShadow} w-[83%] h-fit p-3 px-5 gap-2 flex flex-col items-center justify-start bg-boxlightblue overflow-auto border rounded-[10px]`}>
                    <p className='w-full font-trip text-[20px] flex item-start justify-start '>{`Destination: ` + post.destination}</p>
                    <p className='w-full font-trip text-[20px] flex item-start justify-start '>{`Date: ` + StartDate + ` - ` + EndDate}</p>
                    <p className='w-full font-trip text-[20px] flex item-start justify-start '>{`Number of Travellers: ` + post.guests}</p>
                    <p className='w-full font-trip text-[20px] flex item-start justify-start '>{`Language: ` + post.language}</p>
                    <p className='w-full font-trip text-[20px] flex item-start justify-start '>{`Descriptions: ` + post.descriptions}</p>
                </div>
            </div>
        </div >
    )
}

export default PostDetails