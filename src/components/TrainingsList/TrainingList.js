import React, {useContext} from 'react';
import {useParams } from 'react-router-dom';
import Training from "./Training";
import classes from './TrainingList.module.css';
import ProgramsContext from '../../store/programsStore/programs-context';

// const list = [
//     {date: new Date().toLocaleString(),
//     weekday: 'Monday',
//     type: 'Leg day', 
//     difficultyLevel: [1,2,3,4,5],
//     id: 1 
//     },
//     {date: new Date().toLocaleString(),
//     weekday: 'Tuesday',
//     type: 'Top day', 
//     difficultyLevel: [1,2,3,4,5],
//     id: 2  
//     },
//     {date: new Date().toLocaleString(),
//     weekday: 'Wednesday',
//     type: 'Cardio', 
//     difficultyLevel: [1,2,3,4,5],
//     id: 3    
//     },
//     {date: new Date().toLocaleString(),
//     weekday: 'Thursday',
//     type: 'Full body', 
//     difficultyLevel: [1,2,3,4,5],
//     id: 4    
//     },
//     {date: new Date().toLocaleString(),
//     weekday: 'Friday',
//     type: 'Interval', 
//     difficultyLevel: [1,2,3,4,5],
//     id: 5    
//     }
// ]


const TrainingList = () => {
    const programsCtx = useContext(ProgramsContext);
    let params = useParams();
  
    const trainings = programsCtx.allPrograms.filter(pr => pr.programName ===  params.programName);
    console.log(params)
    return (
        <div className={classes.container}>
            {trainings.map( training =>  <Training training={training} key = {training.id}/> )}
           
        </div>
    )
}

export default TrainingList;