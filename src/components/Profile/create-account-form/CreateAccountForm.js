import classes from "./CreateAccountForm.module.css";
import { useState } from "react";
import useInput from "../../Auth/use-inputs-hook";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../../../firebase-functions/firebase";
import UpdateButton from "../../Helpers/ActionButton/ActionButton";

const isNotEmpty = (value) => value.trim() !== "";
const sexOptions = ["F", "M"];

const CreateAccountForm = () => {
  const [sex, setSex] = useState(sexOptions[0]);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [userState, setUserState] = useState("");
  const navigate = useNavigate();
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastIsValid,
    valueChangeHandler: lastNameChangeHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const auth = getAuth();

  let email;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserState(user.uid);
      email = user.email;
    } else {
    }
  });

  const addProfileDate = async () => {
    try {
      const userProfileCollectionRef = doc(db, `users`, `${userState}`);
      const docRef = await updateDoc(userProfileCollectionRef, {
        profileData: arrayUnion({
          email: email,
          firstName: firstNameValue,
          lastName: lastNameValue,
          sex: sex,
          currentWeight: currentWeight,
          goalWeight: goalWeight,
          date: new Date(),
        }),
      });
      return docRef;
    } catch (e) {
      console.log(e);
    }
  };
  const formIsValid = firstNameIsValid & lastIsValid;

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    addProfileDate();
    resetFirstName();
    resetLastName();
    setGoalWeight("");
    setCurrentWeight("");
    navigate("/profile/accounts-info");
  };
  return (
    <div className={classes.mainContainer}>
      <h2>Create Your Account</h2>
      <div className={classes.form}></div>
      <form onSubmit={submitFormHandler}>
        <div className={classes.action}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={firstNameValue}
            type="text"
            id="firstName"
            onChange={firstNameChangeHandler}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastNameValue}
            type="text"
            id="lastName"
            onChange={lastNameChangeHandler}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="sex">Sex</label>
          <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            {sexOptions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.action}>
          <label htmlFor="currentWeight">Current Weight</label>
          <input
            value={currentWeight}
            type="number"
            id="currentWeight"
            onChange={(e) => setCurrentWeight(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="goalWeight">Desired Weight</label>
          <input
            value={goalWeight}
            type="number"
            id="goalWeight"
            onChange={(e) => setGoalWeight(e.target.value)}
            placeholder="Enter your desired weight here"
          />
        </div>
        <UpdateButton text={"Submit"} />
      </form>
    </div>
  );
};

export default CreateAccountForm;
