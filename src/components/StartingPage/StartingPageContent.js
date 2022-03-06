import classes from "./StartingPageContent.module.css";
import { Link } from "react-router-dom";
import UpdateButton from "../Helpers/ActionButton/ActionButton";
const StartingPageContent = () => {
  return (
    <>
      <section className={classes.starting}>
        <h3>Welcome on Board!</h3>
        <p>
          Shoose a training program that you want to follow in the program menu
          and start recording your progress!
        </p>
        <p>Before you begin update your profile info</p>
      </section>
      <Link to={"/profile/createAccount"}>
        <UpdateButton text={"Create account"} />
      </Link>
    </>
  );
};

export default StartingPageContent;
