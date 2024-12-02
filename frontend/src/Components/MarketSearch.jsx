import React from 'react'
import { CheckBtn } from './index'


const MarketSearch = () => (
    <div className='w-full mt-[8.5vh] font-inter flex flex-col items-center justify-center'>
        <div className='w-[70%] h-fit grid grid-col-5 justify-start items-center px-2 py-2 border-secondary border-2 rounded-[5px] text-[12px]'>
            <span className='col-span-5 font-semibold text-[14px]'> Kuala Lumpur, Malaysia</span>
            <span className='col-span-2'>19 Aug - 21 Aug 2023</span>
            <span className='col-span-2 ml-5'>2 Guests</span>
            <button className='col-span-1 ml-[5.5vw] text-bgblue font-medium text-[14px]'>Edit</button>
        </div>
        <div className='my-5 flex items-center justify-center'>
            <CheckBtn />
        </div>
        <div className='w-full grid grid-col-3 items-center justify-center font-medium text-[18px] text-highblack'>
            <button className='px-[5.5vw] py-3 hover:bg-secondary flex justify-center border border-secondary text-highblack rounded-t-[5px] border-t-2 border-x-2'>Our Top Drivers</button>
            <button className='px-[5.5vw] py-3 hover:bg-secondary flex justify-center border border-secondary border-y-2 border-x-2'>Lowest Price First</button>
            <button className='px-[5.5vw] py-3 hover:bg-secondary flex justify-center border border-secondary rounded-b-[5px] border-b-2 border-x-2'>Best Rating</button>
        </div>

    </div>

)


export default MarketSearch