import classes from "./UserProfileLinks.module.css";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  return (
    <div className={classes.profile}>
      <Link to={`/profile/createAccount`}>
        <p className={classes.link}>Update your profile info</p>
      </Link>
      <Link to={`/profile/updatePassword`}>
        <p className={classes.link}>Update password</p>
      </Link>
    </div>
  );
};

export default AccountSettings;
