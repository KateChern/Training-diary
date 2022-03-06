import classes from "./AddingTrainingToDBForm.module.css";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useInput from "../../Auth/use-inputs-hook";
import ProgramsContext from "../../../store/programsStore/programs-context";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore/lite";
import db from "../../../firebase-functions/firebase";

const prList = [
  "beautiful ad stunning 2.0",
  "beautiful booty 1.0",
  "beautiful booty 3.0",
];
const typeList = ["Leg Day", "Top Day", "Interval", "Cardio Day", "Mixed day"];
const isNotEmpty = (value) => value.trim() !== "";

const AddingTrainingToDBForm = () => {
  const trainingCtx = useContext(ProgramsContext);
  const programs = trainingCtx.exercises;

  const [option, setOption] = useState(prList[0]);
  const [type, setType] = useState(typeList[0]);

  const {
    value: difficultyLevelValue,
    isValid: difficultyLevelIsValid,
    valueChangeHandler: difficultyLevelChangeHandler,
    reset: resetdifficultyLevel,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);
  const {
    value: exercisesValue,
    isValid: exercisesIsValid,
    valueChangeHandler: exercisesChangeHandler,
    reset: resetExercises,
  } = useInput(isNotEmpty);
  const {
    value: numberValue,
    isValid: numberIsValid,
    valueChangeHandler: numberChangeHandler,
    reset: resetNumber,
  } = useInput(isNotEmpty);

  let exerciseDescription = [
    {
      exercisesValue,
      numberValue,
    },
  ];
  const id = uuidv4();
  const exercisesAddHandler = (event) => {
    event.preventDefault();
    if (!exerciseFormIsValid) {
      return;
    }
    if (exercisesValue === "" && numberValue === "") {
      trainingCtx.addExerciseToDB(exerciseDescription);
    }
    trainingCtx.addExerciseToDB(exerciseDescription);
    resetNumber();
    resetExercises();
  };

  const formValid = difficultyLevelIsValid & descriptionIsValid;
  const exerciseFormIsValid = exercisesIsValid & numberIsValid;
  const programCollectionRef = doc(db, `programs`, `${option}`);
  const trainingCollectionRef = collection(db, `trainings`);

  const addToPrograms = async () => {
    const docRef = await updateDoc(programCollectionRef, {
      trainings: arrayUnion({
        type: type,
        difficultyLevel: difficultyLevelValue,
        description: descriptionValue,
        exercises: trainingCtx.exercises,
        id: id,
      }),
    });
    return docRef;
  };
  const addToTrainings = async () => {
    const docRef2 = await setDoc(doc(trainingCollectionRef), {
      type: type,
      difficultyLevel: difficultyLevelValue,
      description: descriptionValue,
      exercises: trainingCtx.exercises,
      id: id,
    });
    return docRef2;
  };
  const submitForm = () => {
    try {
      addToPrograms();
      addToTrainings();
    } catch (e) {}
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    submitForm();
    resetdifficultyLevel();
    resetDescription();
    resetNumber();
    resetExercises();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <h3>New Training</h3>
        <ul>
          {programs.map((pr) => (
            <p key={pr.exercisesValue}>
              {pr.exercisesValue} - {pr.numberValue}
            </p>
          ))}
        </ul>
        <div className={classes.action}>
          <label htmlFor="programName">Choose program</label>
          <select
            id="programName"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            {prList.map((pr) => (
              <option key={pr} value={pr}>
                {pr}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.action}>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {typeList.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.action}>
          <label htmlFor="difficultyLevel">Level of difficulty</label>
          <input
            value={difficultyLevelValue}
            type="number"
            id="difficultyLevel"
            onChange={difficultyLevelChangeHandler}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="description">Description</label>
          <input
            value={descriptionValue}
            type="text"
            id="description"
            onChange={descriptionChangeHandler}
          />
        </div>
        <h4>Enter your exercise</h4>
        <div className={classes.exercises}>
          <label htmlFor="exercises">Exercise</label>
          <input
            value={exercisesValue}
            type="text"
            id="exercises"
            onChange={exercisesChangeHandler}
          />
          <label htmlFor="exercises">Amount of repeats</label>
          <input
            value={numberValue}
            type="text"
            id="exercises"
            onChange={numberChangeHandler}
          />
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
};

export default AddingTrainingToDBForm;
