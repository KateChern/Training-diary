import React, { Fragment, useState, useContext } from "react";
import classes from './SecondNavigationBar.module.css';
import calendar from '../../icons/calendar.svg';
// import maleIcon from '../../icons/maleIcon.svg';
import girlIcon from '../../icons/girlcon.svg';
import programs from '../../icons/programs.svg'
import CalendarButton from "../Helpers/Calendar";
import Modal from "../Helpers/Modal/Modal";
import { Link } from "react-router-dom";
import ProgramsContext from "../../store/programsStore/programs-context";
// import db from "../../firebase";

const SecondNavigationBar = () => {
    const programsCtx = useContext(ProgramsContext);
    const [showCalendar, setshowCalendar] = useState(false);


    const toggleCalendar = () => {
        setshowCalendar(!showCalendar)
    }
    console.log(showCalendar)

    return (<Fragment>
                <div className={classes.container}>
                <Link  to={`/ProgramsList`} onClick={programsCtx.fetchPrograms} >
                    <img src={programs} 
                        alt='ProgramsIcon'/>
                </Link>
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