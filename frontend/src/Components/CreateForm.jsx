import React, { useEffect, useState } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, Button, Input } from 'antd';
import { v4 as uuid } from 'uuid';
import styles from '../style';
import CheckBtn from './CheckBtn';

const CreateForm = () => {

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const navigate = useNavigate();
    const dateFormat = ('DD-MM-YYYY');
    const token = localStorage.getItem('token');
    const postID = uuid();
    const location = useLocation();

    const [dest, setDest] = useState("");
    const [duration, setDuration] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [guest, setGuest] = useState("");
    const [lang, setLang] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [role, setRole] = useState('driver');

    useEffect(() => {
        const isAuth = async () => {
            await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then(async res => {
                if (res.status === 401) {
                    return res.json().then(data => {
                        window.location.href = data.redirectTo; // Redirect the browser to the specified URL
                    });
                }
            }).catch(err => {
                console.log(err);
            })

        }
        isAuth();
    }, []);

    const createPostHandler = () => {
        fetch('http://localhost:3000/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                postID: postID,
                location: dest,
                date: dateRange,
                duration: duration,
                guest: guest,
                language: lang,
                price: price,
                descriptions: desc,
                role: role,
            })
        })
    };

    const dateChange = (dates) => {
        setDateRange(dates);
    }

    const calculateDuration = (dates) => {
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[1]);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        for (let i = 1; i <= daysDiff + 1; i++) {
            duration.push(i);
        }
    }

    const handleCheckBtn = (value) => {
        setRole(value ? 'traveller' : 'driver');
    };

    const buttonClickHandler = () => {
        calculateDuration(dateRange);
        formValidation();
    }

    const formValidation = () => {
        const formValidate = document.getElementById('form');
        if (formValidate.checkValidity()) {
            const queryParams = new URLSearchParams(location.search);
            const editable = true;
            queryParams.set('editable', editable.toString());
            createPostHandler();
            navigate(`/Create/Plan/${postID}?${queryParams.toString()}`);
        }
    }


    return (
        <div className='w-[100%] min-h-[130vh] gap-5 my-10 -ml-36 flex flex-row flex items-start justify-center'>
            <div className={`${styles.boxShadow} flex flex-col p-4 mt-10 items-center justify-start gap-5 bg-boxlightblue border rounded-[10px]`}>
                <p className={`font-trip text-[20px] font-semibold`}>Create as</p>
                <CheckBtn onChange={handleCheckBtn} />
            </div>
            <div className={`shadow-xl w-fit flex flex-col items-center bg-boxlightblue border rounded-[20px] mt-10`}>
                <p className={`flex items-center justify-center pt-10 font-trip font-bold text-blueblack text-[28px]`}>General Info</p>
                <div className='h-full flex items-center '>
                    <Form id="form" required className='w-[50vw] h-full grid grid-col-1 place-items-center gap-3 bg-boxlightblue'>
                        <div className='grid w-[25vw] mt-4 mb-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='destination'>Destination</label>
                            <Input
                                required
                                id='destination'
                                type='text'
                                value={dest}
                                name='destination'
                                onChange={(e) => setDest(e.target.value)}
                                className={`${styles.inputArea}`}
                            />
                        </div>
                        <div className='grid w-[25vw] my-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='days'>Duration of Days</label>
                            <RangePicker
                                id='days'
                                className={`${styles.inputArea}`}
                                value={dateRange}
                                format={dateFormat}
                                required
                                onChange={dateChange} />
                        </div>
                        <div className='grid w-[25vw] my-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='guests'>Number of Guests</label>
                            <Input
                                id='guests'
                                type='number'
                                value={guest}
                                name='guests'
                                required
                                onChange={(e) => setGuest(e.target.value)}
                                className={`${styles.inputArea}`}
                            />
                        </div>
                        <div className='grid w-[25vw] my-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='language'>Preferred Language</label>
                            <Input
                                id='language'
                                type='text'
                                value={lang}
                                name='language'
                                required
                                onChange={(e) => setLang(e.target.value)}
                                className={`${styles.inputArea}`}
                            />
                        </div>
                        <div className='grid w-[25vw] my-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='price'>Price</label>
                            <Input
                                id='price'
                                type='number'
                                value={price}
                                name='price'
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                className={`${styles.inputArea}`}
                            />
                        </div>
                        <div className='grid w-[25vw] my-2'>
                            <label className={`${styles.labelStyle}`} htmlFor='descriptions'>Travel Descriptions</label>
                            <TextArea
                                id='descriptions'
                                autoSize={false}
                                rows={10}
                                value={desc}
                                name='descriptions'
                                required
                                onChange={(e) => setDesc(e.target.value)}
                                className={`${styles.inputArea}`}
                            />
                        </div>
                        <Button id='create' onClick={buttonClickHandler} className='px-10 py-2 my-4 flex items-center justify-center bg-secondary rounded-[6px] text-primary'>Next</Button>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default CreateForm;