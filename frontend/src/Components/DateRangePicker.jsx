import React, { useState, useRef } from 'react';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { calendar } from '../assets';
import styles from '../style';

const DateRangePickerComponent = () => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleDateChange = (item) => {
        setDateRange([item.selection]);
    };

    const handleButtonClick = () => {
        setIsPickerOpen(!isPickerOpen);
    };

    const handlePickerClick = (e) => {
        e.stopPropagation();
    };


    return (
        <>
            <button>
                <img src={calendar} className={`${styles.icon}`} onClick={handleButtonClick} />
            </button>
            {isPickerOpen && (
                <div className='z-10 mt-[7vh] -ml-[1vw]'>
                    <DateRangePicker
                        className=''
                        onChange={handleDateChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={dateRange}
                        direction="vertical"
                    />
                </div>
            )
            }
        </>
    );
};

export default DateRangePickerComponent;
