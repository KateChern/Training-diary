import { Fragment, useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import classes from "./AllUserTrainings.module.css";
import TrainingCard from "../../TrainingsList/TrainingCard";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "../../../firebase-functions/firebase";
const UserTrainings = () => {
  const auth = getAuth();

  const [userState, setUserState] = useState(auth.currentUser.uid);
  const [userTrainings, setUserTrainings] = useState([
    {
      type: "Loading...",
      date: {
        seconds: 1645295640,
        nanoseconds: 155000000,
      },
    },
  ]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserState(user.uid);
    } else {
      setUserState(null);
    }
  });

  const q = query(collection(db, "users"), where("id", "==", userState));

  const fetchUserTrainingsHandler = useCallback(async () => {
    const trainingsSnapshot = await getDocs(q);
    const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());
    setUserTrainings(trainingsList[0].userTrainings);
    return trainingsList;
  }, [userState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchUserTrainingsHandler();
  }, [fetchUserTrainingsHandler]);
  const context =
    !userTrainings || userTrainings.length === 0 ? (
      <p className={classes.message}>No trainings added yet</p>
    ) : (
      <div className={classes.listContainer}>
        {userTrainings.map((training, index) => (
          <TrainingCard training={training} key={index} />
        ))}
      </div>
    );
  return (
    <Fragment>
      <h3 className={classes.header}>All your completed training are here: </h3>
      {context}
    </Fragment>
  );
};
export default UserTrainings;
