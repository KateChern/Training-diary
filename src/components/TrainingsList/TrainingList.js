import { Fragment } from "react";
import Training from "./Training";
import classes from './TrainingList.module.css';


const list = [
    {date: new Date().toLocaleString(),
    weekday: 'Monday',
    type: 'Leg day', 
    difficultyLevel: [1,2,3,4,5],
    id: 1 
    },
    {date: new Date().toLocaleString(),
    weekday: 'Tuesday',
    type: 'Top day', 
    difficultyLevel: [1,2,3,4,5],
    id: 2  
    },
    {date: new Date().toLocaleString(),
    weekday: 'Wednesday',
    type: 'Cardio', 
    difficultyLevel: [1,2,3,4,5],
    id: 3    
    },
    {date: new Date().toLocaleString(),
    weekday: 'Thursday',
    type: 'Full body', 
    difficultyLevel: [1,2,3,4,5],
    id: 4    
    },
    {date: new Date().toLocaleString(),
    weekday: 'Friday',
    type: 'Interval', 
    difficultyLevel: [1,2,3,4,5],
    id: 5    
    }
]


const TrainingList = () => {
    console.log(list)
    return (
        <div className={classes.container}>
            {list.map( x =>  <Training training={x} key = {x.weekday}/> )}
           
        </div>
    )
}

export default TrainingList;