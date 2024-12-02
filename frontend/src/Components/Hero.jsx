import React from 'react'
import styles from '../style'

const Hero = () => (
    <div className={`${styles.flexCenter} flex flex-col `}>
        <h2 className={`${styles.hero} relative justify-center pt-[6%]`}>Find your next driver</h2>
        <p className='relative text-[22px] text-highblack sm:justify-start justify-center font-inter pt-2'>search low prices on
            drivers, services and more...</p>
    </div>
)


export default Hero