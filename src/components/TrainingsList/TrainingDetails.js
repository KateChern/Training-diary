import React, { Fragment } from "react";
import Slider from "../Helpers/Slider";
import classes from './TrainingDetails.module.css'
import SecondNavigationBar from "../SecondsNavigation/SecondNavigationBar";
import cx from 'classnames'

const list = [
    {date: new Date().toLocaleString().split(',')[0],
    weekday: 'Monday',
    type: 'Leg day', 
    exercise: [['Верхняя тяга к грузи узким хватом', 15], ['Отжимание с широкой постановкой рук с упором в колени',15],
    ['Жим гантелей сидя',20], ['Кувшинчики сидя в наклоне', 25], ['Разгибания рук в раме стоя', 15] ],
    description: 'Каждый супер-сет,то есть подряд два упражнения без отдыха, необходимо выполнить по 2-3 раза. Отдых между упражнениями в супер-сете отсутствует, отдых между супер-сетами до 2 минут.',
    totalTime: '1h30',
    id: 1 
    },
    {date: new Date().toLocaleString().split(',')[0],
    weekday: 'Tuesday',
    type: 'Top day', 
    difficultyLevel: [1,2,3,4,5],
    id: 2  
    },
    {date: new Date().toLocaleString().split(',')[0],
    weekday: 'Wednesday',
    type: 'Cardio', 
    difficultyLevel: [1,2,3,4,5],
    id: 3    
    },
    {date: new Date().toLocaleString().split(',')[0],
    weekday: 'Thursday',
    type: 'Full body', 
    difficultyLevel: [1,2,3,4,5],
    id: 4    
    },
    {date: new Date().toLocaleString().split(',')[0],
    weekday: 'Friday',
    type: 'Interval', 
    difficultyLevel: [1,2,3,4,5],
    id: 5    
    }
]

// const date = (training.date).split(',')[0]

const TrainingDetails = ({ match}) => {

    // const { trainingId } = match.params;
    // const training = useSelector((state) => selectPostById(state, postId))
    
    console.log(match)
    return (
        <Fragment>
            <SecondNavigationBar />
            <div className={classes.container}>
            
                    <h2 className={classes.title}>{list[0].date}, {list[0].weekday}</h2>
                    <h2 className={classes.title}>{list[0].type}</h2>
                    <h3>Exercises</h3>
                    <ol> {list[0].exercise.map( x => 
                        <li> 
                            <p>{x[0]} </p>
                            <p>{x[1]}</p>
                        </li> )}
                        
                    </ol>
                    <div>
                        <h3 className={classes.title}>Description</h3>
                        <p className={classes.description}> {list[0].description}</p>
                    </div>
                    <h3 className={classes.title}>Total time {list[0].totalTime}</h3>
                    <Slider/>
            </div>
        </Fragment>
    )
}

export default TrainingDetails;