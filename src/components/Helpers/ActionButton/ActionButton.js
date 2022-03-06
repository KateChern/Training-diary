import classes from "./ActionButton.module.css";
import cx from "classnames";

const UpdateButton = ({ text, onclick }) => {
  const buttonClasses = cx(classes.button, classes.customFeatures);

  return (
    <button onClick={onclick} className={buttonClasses}>
      {text}
    </button>
  );
};

export default UpdateButton;
