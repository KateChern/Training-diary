import useInput from './use-inputs-hook';
import classes from './AuthForm.module.css';
import cx from 'classnames'
import { useState } from 'react';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const isPassword= (value) => value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
// /^
//   (?=.*\d)          // should contain at least one digit
//   (?=.*[a-z])       // should contain at least one lower case
//   (?=.*[A-Z])       // should contain at least one upper case
//   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
// $/


const AuthForm = () => {
    
    const {
        value: emailValue, 
        isValid: emailIsValid, 
        hasError: emailHasError, 
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput(isEmail);
    const {
        value: passwordValue, 
        isValid: passwordIsValid, 
        hasError: passwordHasError, 
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useInput(isPassword);

    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

    let formIsValid = false;

    if (passwordIsValid && emailIsValid) {
        formIsValid = true;
      }
  
const submitHandler = (event) => {
    event.preventDefault();

   
    if (!formIsValid) {
        return;
    }
    
    console.log('Submitted!');
    console.log(emailValue, passwordValue);
    
    resetEmail();
    resetPassword();
      };  

    // if (isLogin) {
    // } else {
    //   fetch(
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZhsabDexE9BhcJbGxnZ4DiRlrCN9xe24',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         email: enteredEmail,
    //         password: enteredPassword,
    //         returnSecureToken: true,
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   ).then((res) => {
    //     if (res.ok) {
    //       // ...
    //     } else {
    //       return res.json().then((data) => {
    //         // show an error modal
    //         console.log(data);
    //       });
    //     }
    //   });
    // }
  
  const passwordClasses = passwordHasError
    ? cx(classes['form-control'], classes['invalid']) 
    : classes['form-control' ];

  const emailClasses = emailHasError
    ? cx(classes['form-control'], classes['invalid']) 
    : classes['form-control' ];

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor='email'>Your Email</label>
          <input
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type='email' 
            id='email' 
            required  />
            {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
        </div>
        <div className={passwordClasses}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
