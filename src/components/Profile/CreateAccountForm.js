import classes from "./CreateAccountForm.module.css";
import { useState, useCallback, useEffect } from "react";
import useInput from "../Auth/use-inputs-hook";
import useWeightInput from "../Auth/use-weight-hook";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../../firebase-functions/firebase";
import UpdateButton from "../Helpers/ActionButton/ActionButton";
import { fetchUser } from "../../firebase-functions/getUserProfileData";
import cx from "classnames";

const isNotEmpty = (value) => value.trim() !== "";
const sexOptions = ["F", "M"];
const weightIsValid = (value) => typeof value === "number" && value > 0;
const profileData = [
  {
    firstName: "",
    lastName: "",
    email: "",
    goalWeight: 0,
    currentWeight: 0,
    sex: "",
  },
];

const CreateAccountForm = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let currentUser = auth.currentUser;
  const [sex, setSex] = useState(sexOptions[0]);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(currentUser.uid);
  const [userData, setUserData] = useState(profileData);

  let {
    value: firstNameValue,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    reset: resetFirstName,
    hasError: firstNameValueHasError,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty);
  let {
    value: lastNameValue,
    isValid: lastIsValid,
    valueChangeHandler: lastNameChangeHandler,
    reset: resetLastName,
    hasError: lastNameValueHasError,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty);
  let {
    valueChangeHandler: setCurrentWeight,
    value: currentWeight,
    isValid: currentWeightIsValid,
    hasError: currentWeightHasError,
    inputBlurHandler: currentWeightBlurHandler,
  } = useWeightInput(weightIsValid);
  let {
    isValid: goalWeightIsValid,
    valueChangeHandler: setGoalWeight,
    value: goalWeight,
    hasError: goalWeightHasError,
    inputBlurHandler: goalWeightBlurHandler,
  } = useWeightInput(weightIsValid);
  let email;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      email = user.email;
    } else {
    }
  });

  const fetchUserHandler = useCallback(() => {
    return fetchUser(uid)
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => {});
  }, [uid]);

  useEffect(() => {
    fetchUserHandler();
  }, [userData.length, fetchUserHandler]);

  const user =
    userData && userData.length >= 1 && userData[userData.length - 1];

  const addProfileDate = async () => {
    try {
      const userProfileCollectionRef = doc(db, `users`, `${uid}`);
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
    } catch (e) {}
  };
  const formIsValid =
    firstNameIsValid & lastIsValid & currentWeightIsValid & goalWeightIsValid;

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setError("Enter valid details");
      return;
    }
    setError(null);
    addProfileDate();
    resetFirstName();
    resetLastName();
    navigate("/profile/accounts-info");
  };
  const firstNameClasses = firstNameValueHasError
    ? cx(classes["action"], classes["invalid"])
    : classes["action"];

  const lastNameClasses = lastNameValueHasError
    ? cx(classes["action"], classes["invalid"])
    : classes["action"];

  const currentWeightClasses = currentWeightHasError
    ? cx(classes["action"], classes["invalid"])
    : classes["action"];
  const goalWeightClasses = goalWeightHasError
    ? cx(classes["action"], classes["invalid"])
    : classes["action"];

  const formTitle =
    user && user.firstName ? "Update Profile" : "Create Profile";

  return (
    <div className={classes.mainContainer}>
      <h2 onClick={() => navigate(-1)}>{formTitle}</h2>
      <div className={classes.form}></div>
      <form onSubmit={submitFormHandler}>
        <div className={firstNameClasses}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={firstNameValue}
            type="text"
            id="firstName"
            onChange={firstNameChangeHandler}
            placeholder={"Enter your first name here"}
            onBlur={firstNameBlurHandler}
          />
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastNameValue}
            type="text"
            id="lastName"
            onChange={lastNameChangeHandler}
            placeholder={"Enter your last name here"}
            onBlur={lastNameBlurHandler}
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
        <div className={currentWeightClasses}>
          <label htmlFor="currentWeight">Current Weight</label>
          <input
            value={currentWeight === 0 ? "" : currentWeight}
            type="number"
            id="currentWeight"
            onChange={setCurrentWeight}
            placeholder={user && user.currentWeight}
            onBlur={currentWeightBlurHandler}
          />
        </div>
        <div className={goalWeightClasses}>
          <label htmlFor="goalWeight">Desired Weight</label>
          <input
            value={goalWeight === 0 ? "" : goalWeight}
            type="number"
            id="goalWeight"
            onChange={setGoalWeight}
            placeholder={user && user.goalWeight}
            onBlur={goalWeightBlurHandler}
          />
        </div>
        {error && <p className={classes.msg}>{error}</p>}
        <UpdateButton text={"Submit"} />
      </form>
    </div>
  );
};

export default CreateAccountForm;
