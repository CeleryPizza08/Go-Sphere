import React from 'react'
import styles from '../style'
import '../index.css'
import { Hero, SearchBar, Slider, Footer } from '../Components';

function Home() {


    return (
        <div className='w-full overflow-hidden'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <Hero />
            </div>

            <div className={`${styles.paddingX} flex justify-center items-start mt-[5%] h-[10vh]`}>
                <SearchBar />
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} ${styles.heading2} mt-[5%]`}>
                Trending Country
            </div>

            <div className={`${styles.paddingX} w-full   items-center justify-center`}>
                <Slider />
            </div>

            <div className={`${styles.flexEnd} flex left-0 right-0 bottom-[0]`}>
                <Footer />
            </div>

        </div>

    )
}
export default Home