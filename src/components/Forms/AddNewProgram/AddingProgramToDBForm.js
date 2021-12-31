import classes from './AddingProgramToDBForm.module.css';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../../Auth/use-inputs-hook';
import { collection, addDoc, doc, setDoc } from "firebase/firestore/lite"; 
import db from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';

const isNotEmpty = (value) => value.trim() !== '';

const AddingProgramToDBForm = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const {
    value: programNameValue, 
    isValid: programNameIsValid, 
    hasError: programNameHasError, 
    valueChangeHandler: programNameChangeHandler,
    inputBlurHandler: programNameBlurHandler,
    reset: recetProgramName
} = useInput(isNotEmpty);

  const submitForm = async() => {
    try {
      const collectionRef = collection(db, 'programs');
      const docRef = await setDoc(doc(collectionRef, programNameValue), {
        programName: programNameValue,
        id: uuidv4(),
        trainings: []
      })
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
};

const submitFormHandler = (event) => {
    event.preventDefault()
    if (!programNameIsValid) {
        return;
    }
    submitForm();
    console.log('Submitted!');
    recetProgramName()
    
    
}
  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <div className={classes.control}>
        <div className={classes.action}>
          <label htmlFor='new-program'>Program name</label>
          <input value={programNameValue} onChange={programNameChangeHandler} type='text' id='new-program' />
        </div>
      </div>
      
      <div className={classes.action}>
        {/* <Link to={`/AddingTrainingForm`}> */}
          <button >Add Program</button>
        {/* </Link> */}
      </div>
    </form>
  );
}

export default AddingProgramToDBForm;
