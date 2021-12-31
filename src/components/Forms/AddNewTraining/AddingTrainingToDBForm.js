import classes from './AddingTrainingToDBForm.module.css';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useInput from '../../Auth/use-inputs-hook';
import ProgramsContext from '../../../store/programsStore/programs-context';
import { collection, addDoc, doc, setDoc, updateDoc, arrayUnion  } from "firebase/firestore/lite"; 
import db from '../../../firebase';

const prList = ['Beautiful booty 1.0', "Beautiful booty 2.0", 'Beautiful booty 3.0'];
const typeList = ['Leg Day', 'Top Day', 'Interval', 'Cardio Day', 'Mixed day']
const isNotEmpty = (value) => value.trim() !== '';

const AddingTrainingToDBForm = () => {
  
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [didSubmit, setDidSubmit] = useState(false);
    const trainingCtx = useContext(ProgramsContext);
    const programs = trainingCtx.exercises;
    const programs1 = trainingCtx.allPrograms;
    const [option, setOption ] = useState(prList[0]);
    const [type, setType ] = useState(typeList[0]);
    // const [formInputsValidity, setFormInputsValidity] = useState({
    //     type: true,
    //     difficultyLevel: true,
    //     description: true,
    //     enteredExercise: true,
    //     enteredNumber: true
    //   });
    // const {
    //     value: programNameValue, 
    //     valueChangeHandler: programNameChangeHandler,
    // } = useInput(isNotEmpty);
    // const {
    //     value: typeValue, 
    //     isValid: typeIsValid, 
    //     hasError: typeHasError, 
    //     valueChangeHandler: typeChangeHandler,
    //     inputBlurHandler: typeBlurHandler,
    //     reset: recetType
    // } = useInput(isNotEmpty);
    const {
        value: difficultyLevelValue, 
        isValid: difficultyLevelIsValid, 
        hasError: difficultyLevelHasError, 
        valueChangeHandler: difficultyLevelChangeHandler,
        inputBlurHandler: difficultyLevelBlurHandler,
        reset: resetdifficultyLevel
    } = useInput(isNotEmpty);
    const {
        value: descriptionValue, 
        isValid: descriptionIsValid, 
        hasError: descriptionHasError, 
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescription
    } = useInput(isNotEmpty);
    const {
        value: exercisesValue, 
        isValid: exercisesIsValid, 
        hasError: exercisesHasError, 
        valueChangeHandler: exercisesChangeHandler,
        inputBlurHandler: exercisesBlurHandler,
        reset: resetExercises
    } = useInput(isNotEmpty);
    const {
        value: numberValue, 
        isValid: numberIsValid, 
        hasError: numberHasError, 
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
        reset: resetNumber
    } = useInput(isNotEmpty);


    let exerciseDescription = [{
      exercisesValue,
      numberValue
    }]
    ; 

    const exercisesAddHandler = (event) => {
      event.preventDefault();
      if (!exerciseFormIsValid) {
        return;
    } if(exercisesValue === '' && numberValue === '') {
      trainingCtx.addExerciseToDB(exerciseDescription)
    }
      trainingCtx.addExerciseToDB(exerciseDescription)
      resetNumber();
      resetExercises();
      
    }
     
    
    const formValid = difficultyLevelIsValid & descriptionIsValid
    const exerciseFormIsValid = exercisesIsValid & numberIsValid;

   
    const submitForm = async() => {
    
      
      try {
        const collectionRef = doc(db, `programs`, ` ${option}`)
       
        const docRef = await updateDoc(collectionRef, {
                  trainings : arrayUnion(
                    {type: type,
                    difficultyLevel: difficultyLevelValue,
                    description: descriptionValue,
                    exercises: trainingCtx.exercises,
                    id: uuidv4() })
        })
        console.error("Printing Pr value: ", option );
        console.log(type)
        return docRef;
      } catch (e) {
        console.log(type)
        console.error("Error adding document: ", e);
      }
        
    };

    const submitFormHandler = (event) => {
        event.preventDefault()
        if (!formValid) {
            return;
        }
        submitForm();
        console.log('Submitted!');
       
        // recetType();
        resetdifficultyLevel();
        resetDescription();
        resetNumber();
        resetExercises();
    }
  useEffect(() => {
    // trainingCtx.fetchPrograms()
    console.log('Training From' , option)
    console.log('Training From' , programs1)
  }, [])  
  

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <h3>New Training</h3> 
        <ul>
          {programs.map(pr => <p key={pr.exercisesValue}>{pr.exercisesValue} - {pr.numberValue}</p>)}
        </ul>
        <div className={classes.action}>
          <label htmlFor='programName'>Choose program</label>
          <select id='programName' value={option} onChange={(e) => setOption(e.target.value)} >
            {prList.map(pr => 
              <option 
                key ={pr} 
                value={pr} >
                {pr}
              </option> )}
          </select>
        </div>
        <div className={classes.action}>
        <select id='type' value={type} onChange={(e) => setType(e.target.value)} >
            {typeList.map(x => 
              <option 
                key ={x} 
                value={x} >
                {x}
              </option> )}
            
          </select>
        </div>
        <div className={classes.action}>
          <label htmlFor='difficultyLevel'>Level of difficulty</label>
          <input  value={difficultyLevelValue} type='number' id='difficultyLevel' onChange={difficultyLevelChangeHandler} />
        </div>
        <div className={classes.action}>
            <label htmlFor='description'>Description</label>
            <input  value={descriptionValue} type='text' id='description' onChange={descriptionChangeHandler} />
        </div>
        <h4>Enter your exercise</h4>
        <div className={classes.exercises}>
            
            <label htmlFor='exercises'>Exercise</label>
            <input  value={exercisesValue} type='text' id='exercises' onChange={exercisesChangeHandler} />
            <label htmlFor='exercises'>Amount of repeats</label>  
            <input  value={numberValue} type='text' id='exercises' onChange={numberChangeHandler}/> 
            <div className={classes.action}>
                <button onClick={exercisesAddHandler}>Add</button>
            </div>         
        </div>
    
      </div>
      <div className={classes.action}>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default AddingTrainingToDBForm;
