import React, { useState } from 'react'

const CheckBtn = ({ onChange }) => {
    const [value, setValue] = useState(false);

    const handleToggle = (event) => {
        const { checked } = event.target;
        setValue(checked);
        onChange(checked);
    }

    return (
        <div className='flex items-center justify-center mt-4'>
            <input
                checked={value}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: value && '#06D6A0' }}
                className="react-switch-label pl-2 font-trip text-[15px]"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />Traveller
                <label className='pr-3 font-trip text-[15px]'>Driver</label>
            </label>
        </div>
    )
}



export default CheckBtn