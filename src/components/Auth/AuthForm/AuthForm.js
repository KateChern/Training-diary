import useInput from "../use-inputs-hook";
import classes from "./AuthForm.module.css";
import cx from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../../../firebase-functions/firebase";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import db from "../../../firebase-functions/firebase";

const isEmail = (value) => value.includes("@");
const isPassword = (value) =>
  value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

const AuthForm = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let formIsValid = false;

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submit = () => {
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    isLogin
      ? logInWithEmailAndPassword(auth, emailValue, passwordValue)
          .then(() => {
            navigate("/ProgramsList");
          })
          .catch((err) => {
            navigate("/auth");
            if (err.message === "Firebase: Error (auth/user-not-found).") {
              setError(
                "Email is not registered, Create an account or enter an existing Email"
              );
            } else {
              setError(err.message);
            }
          })
      : registerWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((response) => {
            const userUid = response.user.uid;
            if (response && !isLogin) {
              const addUser = async () => {
                try {
                  const collectionRef = collection(db, "users");
                  const docRef = await setDoc(doc(collectionRef, userUid), {
                    profileData: [],
                    email: emailValue,
                    id: userUid,
                    userTrainings: [],
                  });
                  return docRef;
                } catch (e) {
                  setError(e);
                }
              };
              addUser();
              resetEmail();
              resetPassword();
              navigate("/");
            }
          })
          .catch((err) => {
            setError(err);
          });

    setIsLoading(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    submit();
  };
  const passwordClasses = passwordHasError
    ? cx(classes["form-control"], classes["invalid"])
    : classes["form-control"];

  const emailClasses = emailHasError
    ? cx(classes["form-control"], classes["invalid"])
    : classes["form-control"];

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="email"
            id="email"
            required
          />
          {emailHasError && (
            <p className="error-text">Please enter a valid email address.</p>
          )}
        </div>
        <div className={passwordClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <p className="error-text">Please enter a valid password.</p>
          )}
        </div>
        <div className={classes.actions}>
          {error && <p>{error}</p>}
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {!isLogin && (
            <ul className={classes.passwordDetailsList}>
              <p>Your password should contain at least:</p>
              <li>One digit </li> <li>One lower case </li>
              <li>One upper case </li>
              <li>8 from the mentioned characters </li>
            </ul>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
