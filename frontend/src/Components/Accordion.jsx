import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../index.css'
import moment from 'moment';


function Accordion() {

    const { postID } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [document, setDocument] = useState([]);
    const [selectedDay, setSelectedDay] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editable = queryParams.get('editable');
    const isEditable = editable === 'true';

    const handleEditClick = (day) => {
        navigate('./Edit/' + day, { state: { day } });
    }

    const tabSelected = (day) => {
        setSelectedDay(day);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/getPost/' + postID);
                const data = await response.json();
                setDocument(data);
                setTimeout(() => {
                    setLoading(true);
                }, 3500);
            }
            catch (err) {
                throw err;
            }
        };
        fetchData();
    }, []);

    const renderPlanData = (data) => {
        const parsedData = data ? JSON.parse(data) : null;
        if (parsedData) {
            return (
                <div className='content'>
                    {parsedData.map((data, idx) => (
                        <div className='flex flex-row gap-3 mx-5 pb-5 text-[16px] text-blueblack font-trip' key={idx}>
                            <p className='font-bold'>{idx + 1 + '.'}</p>
                            {Object.entries(data).map(([key, value]) => (
                                <p className='flex text-[18px] text-blueblack font-trip' key={key}>
                                    {key === 'Time' ? ` ${key}: ${moment(value).format('dddd, h:mmA')}` : `${key}: ${value}`}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <p></p>
            )
        }
    };


    return (
        <div className='w-[full] h-[50vh] flex align-center items-center content-between justify-center '>
            {loading ? (
                <ul className="accordion">
                    {document.duration.map((doc, idx) => (
                        <li key={idx}>
                            {isEditable ? (
                                <button type='button' onClick={() => handleEditClick(doc)} className="flex w-full justify-end align-end text-[14px] hover:text-secondary text-highblack transition duration-200">Edit</button>
                            ) : ('')}
                            <input type='radio' name='accordion' id={doc} onClick={() => tabSelected(doc)} checked={selectedDay === doc} />
                            <label className="dateL" htmlFor={doc}>{'Day' + ' ' + doc}</label>
                            {renderPlanData(document.plan[idx])}
                        </li>
                    ))
                    }
                </ul>
            ) : (<p>Loading...</p>)}
        </div >
    )
}

export default Accordion;