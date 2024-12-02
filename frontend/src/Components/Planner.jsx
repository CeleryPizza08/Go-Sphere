import { calendar } from '../assets'
import styles from '../style'
import { Accordion } from '../Components'


//Dynamic Date Calendar when user use "Icon" to fill in checkin-out date.
//Slide button Traveler || Driver. Need to swap role.
//Geoloc >> GoogleMap API with multiple pinpoints.  

const Planner = () => {
    return (
        <div className='w-[40vw] min-h-[700px] pl-6 mt-10' >
            <div className={`font-trip font-semibold text-[26px] text-blueblack ml-10 my-6 flex flex-row`}>
                Itinerary Planner
            </div>
            <div className={`mx-10 w-[100%] max-h-[400px] bg-primary overflow-auto border-2 rounded-[10px] flex flex-col ${styles.boxShadow} px-5 border-boxlightblue rounded-[10px] hover:border-secondary transition duration-300`}>
                <Accordion />
            </div>
        </div>
    )
}

export default Planner

