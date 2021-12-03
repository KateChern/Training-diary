import React, { Fragment } from "react";
import Slider from "../Helpers/Slider";
import classes from './Training.module.css'
import cx from 'classnames'
import { Link } from 'react-router-dom';


const Training = ({training}) => {

    const date = (training.date).split(',')[0]

    const colorClasses = training.type === 'Leg day'
    ? cx(classes.container, classes['greenLight']) 
    :training.type === 'Top day' 
    ?  cx(classes.container, classes['greenDark'])
    : training.type === 'Cardio'
    ?  cx(classes.container, classes['blueLight'])
    : training.type === 'Full body'
    ? cx(classes.container, classes['blueDark'])
    : cx(classes.container, classes['red'])

    
    
    return (
        <Link  to={`/training/${training.id}`} >
            <div className={colorClasses} >
                <p className={classes.date}>{date}, {training.weekday}</p>
                <p className={classes.type}>{training.type}</p>
                <Slider />
            </div>
        </Link>
    )
}

export default Training;