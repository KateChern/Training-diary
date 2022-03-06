import classes from "./SubmittedForm.module.css";

const SubmittedFormMessage = ({ message }) => {
  return (
    <div className={classes.container}>
      <p>{message}</p>
    </div>
  );
};

export default SubmittedFormMessage;
