import React, { useEffect, useState } from 'react'
import styles from '../style'
import { Cards, CheckBtn } from '../Components'
import { MarketSearch } from '../Components';
import { Pagination } from 'antd';


//Displaying both traveler and Driver side of marketplace for users and travelers with swap button.

function MarketPlace() {

    const [postData, setPostData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('driver');


    useEffect(() => {
        fetchData();
    }, [role, pagination.current])

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getAllPost/?page=${pagination.current}&pageSize=${pagination.pageSize}&role=${role}`);
            const { dataFromDB, totalCount } = await response.json();
            setPostData(dataFromDB);
            console.log(totalCount);
            setPagination(prevPagination => ({ ...prevPagination, total: totalCount }));
            setTimeout(() => {
                setLoading(true);
            }, 3000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePaginationChange = (page, pageSize) => {
        setPagination({ current: page, pageSize });
    };

    const handleCheckBtn = (value) => {
        setRole(value ? 'traveller' : 'driver');
    };

    return (
        <div className={`${styles.paddingX} w-full min-h-[1000px] flex flex-col items-center justify-start`}>
            <span className='text-[32px] text-blueblack align-center justify-center flex flex-row font-trip font-semibold mt-12'>{'Drivers in RoamRiders'}</span>
            <CheckBtn onChange={handleCheckBtn} />
            <div className={`mt-10 flex flex-col`}>
                {loading ? (
                    <div className='w-full flex flex-col items-center justify-center'>
                        {
                            postData.map((post, idx) => (
                                <Cards key={post.postID} post={post} role={role} />
                            ))
                        }
                    </div>
                ) : (<p className='min-h-[500px] font-inter text-[26px] flex items-center justify-center mb-[100px]'>Loading...</p>)}
                < Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    onChange={handlePaginationChange}
                    total={pagination.total}
                    className='flex items-center justify-center my-10'
                />
            </div>
        </div>
    )
}


export default MarketPlace