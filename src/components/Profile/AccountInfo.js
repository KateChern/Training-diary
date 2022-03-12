import { Fragment, useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import classes from "./AccountInfo.module.css";
import { Link } from "react-router-dom";
import UpdateButton from "../Helpers/ActionButton/ActionButton";
import { fetchUser } from "../../firebase-functions/getUserProfileData";
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

const AccountInfo = () => {
  const auth = getAuth();
  let currentUser = auth.currentUser;
  const [uid, setUid] = useState(currentUser.uid);
  const [userData, setUserData] = useState(profileData);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });

  const fetchUserHandler = useCallback(() => {
    return fetchUser(uid)
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [uid]);
  const user =
    userData && userData.length >= 1 && userData[userData.length - 1];

  useEffect(() => {
    fetchUserHandler();
  }, [userData.length, fetchUserHandler]);

  let context = error ? (
    <p className={classes.message}>Something went wrong, try again</p>
  ) : !user.firstName || !user ? (
    <p className={classes.message}>
      Hi there! Update your profile info to see this page!
    </p>
  ) : (
    <div className={classes.container}>
      <h4>First name</h4>
      <h3>{user.firstName}</h3>
      <h4>Last name</h4>
      <h3>{user.lastName}</h3>
      <h4>Email</h4>
      <h3>{user.email}</h3>
      <h4>Current weight</h4>
      <h3>{user.currentWeight}</h3>
      <h4>Goal weight</h4>
      <h3>{user.goalWeight}</h3>
    </div>
  );
  return (
    <Fragment>
      {context}
      <Link to={"/profile/createAccount"}>
        <UpdateButton text={"Update Profile"} />
      </Link>
    </Fragment>
  );
};

export default AccountInfo;
