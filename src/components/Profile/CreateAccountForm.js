import classes from "./CreateAccountForm.module.css";
import { useState, useCallback, useEffect } from "react";
import useInput from "../Auth/use-inputs-hook";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../../firebase-functions/firebase";
import UpdateButton from "../Helpers/ActionButton/ActionButton";
import { fetchUser } from "../../firebase-functions/getUserProfileData";

const isNotEmpty = (value) => value.trim() !== "";
const sexOptions = ["F", "M"];

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
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [uid, setUid] = useState(currentUser.uid);
  const [userData, setUserData] = useState(profileData);

  let {
    value: firstNameValue,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  let {
    value: lastNameValue,
    isValid: lastIsValid,
    valueChangeHandler: lastNameChangeHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

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
  const formTitle =
    user && user.firstName ? "Update Profile" : "Create Profile";

  return (
    <div className={classes.mainContainer}>
      <h2>{formTitle}</h2>
      <div className={classes.form}></div>
      <form onSubmit={submitFormHandler}>
        <div className={classes.action}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={
              firstNameValue === "" || firstNameValue !== "  "
                ? firstNameValue
                : user.firstName
            }
            type="text"
            id="firstName"
            onChange={firstNameChangeHandler}
            placeholder={"Enter your first name here"}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={
              lastNameValue === "" || lastNameValue !== "  "
                ? lastNameValue
                : user.lastName
            }
            type="text"
            id="lastName"
            onChange={lastNameChangeHandler}
            placeholder={"Enter your last name here"}
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
            placeholder={user && user.currentWeight}
          />
        </div>
        <div className={classes.action}>
          <label htmlFor="goalWeight">Desired Weight</label>
          <input
            value={goalWeight}
            type="number"
            id="goalWeight"
            onChange={(e) => setGoalWeight(e.target.value)}
            placeholder={user && user.goalWeight}
          />
        </div>
        <UpdateButton text={"Submit"} />
      </form>
    </div>
  );
};

export default CreateAccountForm;
