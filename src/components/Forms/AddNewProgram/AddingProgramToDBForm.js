import classes from "./AddingProgramToDBForm.module.css";
import useInput from "../../Auth/use-inputs-hook";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import db from "../../../firebase-functions/firebase";
import { v4 as uuidv4 } from "uuid";

const isNotEmpty = (value) => value.trim() !== "";

const AddingProgramToDBForm = () => {
  const {
    value: programNameValue,
    isValid: programNameIsValid,
    valueChangeHandler: programNameChangeHandler,
    reset: recetProgramName,
  } = useInput(isNotEmpty);

  const submitForm = async () => {
    try {
      const collectionRef = collection(db, "programs");
      const docRef = await setDoc(doc(collectionRef, programNameValue), {
        programName: programNameValue,
        id: uuidv4(),
        trainings: [],
      });
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!programNameIsValid) {
      return;
    }
    submitForm();
    console.log("Submitted!");
    recetProgramName();
  };
  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <div className={classes.control}>
        <div className={classes.action}>
          <label htmlFor="new-program">Program name</label>
          <input
            value={programNameValue}
            onChange={programNameChangeHandler}
            type="text"
            id="new-program"
          />
        </div>
      </div>

      <div className={classes.action}>
        <button>Add Program</button>
      </div>
    </form>
  );
};

export default AddingProgramToDBForm;
