import classes from "./UserProfileLinks.module.css";
import { Link } from "react-router-dom";

const UserProfileLinks = () => {
  return (
    <div className={classes.profile}>
      <Link to={`/profile/accounts-info`}>
        <p className={classes.link}>My profile</p>
      </Link>
      <Link to={`/userTrainings`}>
        <p className={classes.link}>My trainings</p>
      </Link>
      <Link to={`/profile/accounts-settings`}>
        <p className={classes.link}>Account settings</p>
      </Link>
    </div>
  );
};

export default UserProfileLinks;
