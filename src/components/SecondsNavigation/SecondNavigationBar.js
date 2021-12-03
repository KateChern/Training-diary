import React, { Fragment, useState } from "react";
import classes from './SecondNavigationBar.module.css';
import calendar from '../../icons/calendar.svg';
import maleIcon from '../../icons/maleIcon.svg';
import girlIcon from '../../icons/girlcon.svg';
import programs from '../../icons/programs.svg'
import CalendarButton from "../Helpers/Calendar";
import Modal from "../Helpers/Modal/Modal";

const SecondNavigationBar = () => {
  
    const [showCalendar, setshowCalendar] = useState(false);


    const toggleCalendar = () => {
        setshowCalendar(!showCalendar)
    }
    console.log(showCalendar)

    return (<Fragment>
                <div className={classes.container}>
                    <img src={programs} alt='girlIcon'/>
                    <img src={calendar}
                        alt='Calendar'
                        onClick={toggleCalendar}
                        />
                    <img src={girlIcon} alt='girlIcon'/>
                </div>
                <div className={showCalendar ? classes.calendar : classes.calendarHidden }>
                    {showCalendar && <Modal onClose={toggleCalendar}>
                                        <CalendarButton />
                                    </Modal> 
                    } 
                   
                </div>
            </Fragment>
    )
}

export default SecondNavigationBar;