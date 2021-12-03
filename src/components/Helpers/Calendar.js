import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'
import classes from './Calendar.module.css'
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';

function CalendarButton() {
    const [dateState, setDateState] = useState(new Date());
    const changeDate = (e) => {
            setDateState(e.target.changedArgs)
          }
    // const dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 10);
    // const minDate= new Date(new Date().getFullYear(), new Date().getMonth(), 6);
    // const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 25);
    console.log(dateState)
    return (
    //To check calendar views paste start="Decade" and depth="Year" in below code. Also remove range restriction i.e. min and max properties
    <CalendarComponent value={dateState} onChange={changeDate}  
    isMultiSelection={true}>
        
    </CalendarComponent>
  );



//   

//   
//   return (
//     <div>
//       <Calendar
//         onChange={changeDate}
//         value={dateState}
       
//         />
//       <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
//     </div>
//   );
}

export default CalendarButton ;