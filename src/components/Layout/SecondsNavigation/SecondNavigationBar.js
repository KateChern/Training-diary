import React, { Fragment, useState, useContext, useEffect } from "react";
import classes from "./SecondNavigationBar.module.css";
import calendar from "../../../icons/calendar.svg";
import maleIcon from "../../../icons/maleIcon.svg";
import girlIcon from "../../../icons/girlcon.svg";
import programs from "../../../icons/programs.svg";
import CalendarButton from "../../Helpers/Calendar/Calendar";
import Modal from "../../Helpers/Modal/Modal";
import { Link } from "react-router-dom";
import ProgramsContext from "../../../store/programsStore/programs-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "../../../firebase-functions/getUserProfileData";

const SecondNavigationBar = ({ fetchingTrainings }) => {
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
  const programsCtx = useContext(ProgramsContext);
  const [showCalendar, setshowCalendar] = useState(false);
  const [userData, setUserData] = useState(profileData);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const [uid, setUid] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });

  const fetchUserHandler = () => {
    return fetchUser(uid)
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => {
        setError(err);
      });
  };
  useEffect(() => {
    fetchUserHandler();
  }, [userData.length]);

  const user =
    userData && userData.length >= 1 && userData[userData.length - 1];

  const toggleCalendar = () => {
    setshowCalendar(!showCalendar);
  };
  let context =
    error || !user || !user.sex ? (
      <img src={girlIcon} alt="girlIcon" />
    ) : user.sex === "F" ? (
      <img src={girlIcon} alt="girlIcon" />
    ) : (
      <img src={maleIcon} alt="maleIcon" />
    );
  return (
    <Fragment>
      <div className={classes.container}>
        <Link to={`/ProgramsList`} onClick={programsCtx.fetchPrograms}>
          <img src={programs} alt="ProgramsIcon" />
        </Link>
        <img src={calendar} alt="Calendar" onClick={toggleCalendar} />
        <Link to={"/profile"}>{context}</Link>
      </div>
      <div className={showCalendar ? classes.calendar : classes.calendarHidden}>
        {showCalendar && (
          <Link to={"/usertrainings-calendar"}>
            <Modal onClose={toggleCalendar}>
              <CalendarButton fetchingTrainings={fetchingTrainings} />
            </Modal>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default SecondNavigationBar;
