import React from 'react'
import styles from '../style'
import { person } from '../assets'
import { CalendarFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { DatePicker, Input, InputNumber } from 'antd';
import CheckBtn from './CheckBtn';

function SearchBar() {

    const { RangePicker } = DatePicker;

    return (
        <section className={`${styles.flexCenter} w-[80%] h-16 bg-glassblue rounded-[8px] flex flex-row content-evenly`}>
            <div className={`w-[15%] items-center justify-center flex pb-4`}>
                <CheckBtn />
            </div>
            <div className={`${styles.searchBox} w-[25%]`}>
                <Input type='text' size={'large'} prefix={<HomeFilled />}
                    className={`${styles.searchText} text-start flex w-full border-2 rounded-[8px] gap-2`}
                    placeholder='Search your destination ...'>
                </Input>
            </div>
            <div className={`${styles.searchBox} w-[20%] text-center`}>
                <RangePicker suffixIcon={<CalendarFilled />} className='flex relative text-center font-semibold border-2' />
            </div>
            <div className={`${styles.searchBox} w-[15%] h-fit `}>
                <InputNumber min={"1"} max={"8"} size='large' addonBefore={<UserOutlined />} suffix='People'
                    className={`w-full flex text-center items-center justify-center `}
                    placeholder='People'>
                </InputNumber>
            </div>
            <div className={` ${styles.searchBtn} w-[25%] object-contain justify-center`}>
                <p className={`items-center relative flex text-lg font-inter font-medium text-primary`}
                    onClick={''}>
                    Search
                </p>
            </div>

        </section>
    )
}

export default SearchBar