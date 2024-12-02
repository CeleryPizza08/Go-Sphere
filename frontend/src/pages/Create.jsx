import React from 'react'
import { SideBar, Planner, GeoLoc } from '../Components';
import styles from '../style';

const Create = () => (
    <div className={`${styles.paddingX} w-full min-h-[800px] overflow-hidden flex flex-row`}>
        <div className={`${styles.paddingX} w-full flex justify-center items-center`}>
            <Planner />
        </div>
        <div className={`${styles.paddingX} w-full flex justify-center items-center mb-[15vh]`}>
            <GeoLoc />
        </div>
    </div>

)

export default Create