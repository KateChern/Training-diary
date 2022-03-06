import classes from "./PasswordUpdatingForm.module.css";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import useInput from "../use-inputs-hook";
import cx from "classnames";
const isPassword = (value) =>
  value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

const PasswordUpdatingForm = () => {
  const auth = getAuth();

  const currentUser = auth.currentUser;
  const [user, setUser] = useState(currentUser);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
    }
  });
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const updatePasswordHandler = () => {
    updatePassword(user, passwordValue)
      .then(() => {
        console.log("success updated password");
      })
      .catch((err) => {
        setError(err);
      });
  };
  const formIsValid = passwordIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    updatePasswordHandler();
    resetPassword();
  };

  const passwordClasses = passwordHasError
    ? cx(classes["form-control"], classes["invalid"])
    : classes["form-control"];

  // const errorMessage = error;
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={passwordClasses}>
        <label htmlFor="new-password">New Password</label>
        <input
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          type="password"
          id="new-password"
        />
        {error && <p>{error.message}</p>}
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>

      <ul className={classes.passwordDetailsList}>
        <p>Your password should contain at least:</p>
        <li>One digit </li> <li>One lower case </li>
        <li>One upper case </li>
        <li>8 from the mentioned characters </li>
      </ul>
    </form>
  );
};

export default PasswordUpdatingForm;
