import React from 'react'
import styles from '../style'
import { my, viet, thai, sg, ind } from '../assets';
import { Carousel, Image } from 'antd';

const SliderHorizontal = () => {

    const imageData = [
        my, viet, thai, sg, ind,
    ]


    return (
        <Carousel autoplay className='mx-[30vw] my-10'>
            {imageData.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Image ${index + 1}`} style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                    }} />
                </div>
            ))}
        </Carousel>
    )
}


export default SliderHorizontal