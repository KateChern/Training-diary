import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./MainNavigation.module.css";
import { logout } from "../../../firebase-functions/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import weightClock from "../../../icons/weightClock.svg";

const MainNavigation = () => {
  const navigate = useNavigate();

  const auth = getAuth();
  let currentUser = auth.currentUser;
  const [userState, setUserState] = useState(currentUser);

  const logoutHandler = () => {
    logout(auth);
    navigate("/auth");
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserState(user);
      return currentUser;
    } else {
      setUserState(null);
    }
  });

  return (
    <header className={classes.header}>
      <Link to="/ProgramsList">
        <div className={classes.navigationContainer}>
          <div className={classes.logo}>Training Diary</div>
          <img src={weightClock} alt="logo img" />
        </div>
      </Link>
      <nav>
        {userState && (
          <div onClick={logoutHandler} className={classes.loginLogout}>
            Logout
          </div>
        )}
        {!userState && (
          <Link to="/auth">
            <div className={classes.loginLogout}>Login</div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
