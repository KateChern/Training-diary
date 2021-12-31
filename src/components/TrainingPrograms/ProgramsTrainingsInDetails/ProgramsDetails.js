import Slider from "../../Helpers/Slider";
import classes from './ProgramsDetails.module.css';
import cx from 'classnames'
import { Link } from "react-router-dom";
// import ProgramsContext from "../../../store/programsStore/programs-context";
// import { useContext, useEffect, useState } from "react";

const ProgramDetails = ({program}) => {
  
   
    console.log(program)

    return (
      
        <div className={classes.ListContainer} >
            <p className={classes.trainingName}>{program.programName}</p>
            {program.trainings.map(training =>
                <Link  to={`/training/${program.id}`} >
                    <div className={training.type === 'Leg Day'
                    ? cx(classes.container, classes['greenLight']) 
                    : training.type === 'Top day' 
                    ?  cx(classes.container, classes['greenDark'])
                    :  training.type === 'Cardio'
                    ?  cx(classes.container, classes['blueLight'])
                    :  training.type === 'Full body'
                    ? cx(classes.container, classes['blueDark'])
                    : cx(classes.container, classes['red'])}>

                        <p>Day </p>
                        <h3 className={classes.title}>{training.type}</h3>
                        <Slider/>
                    </div>
                </Link> )}
        </div>
    )
}

export default ProgramDetails;