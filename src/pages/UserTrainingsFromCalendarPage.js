import React, { useState, useEffect, useCallback } from "react";
import TrainingsFromCalendar from "../components/UserTrainings/TrainingsListFromCalendar/TrainingsFromCalendar";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchingTrainings } from "../firebase-functions/getTrainingsFromCalendar";

const UserTrainingsFromCalendarPage = () => {
  const auth = getAuth();
  let currentUser = auth.currentUser;
  const [uid, setUid] = useState(currentUser.uid);
  const [error, setError] = useState(null);
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
      setUid(user.uid);
      return currentUser;
    } else {
      setUid(null);
    }
  });

  const fetchUserTrainingsHandler = useCallback(() => {
    return fetchingTrainings(uid)
      .then((response) => {
        setUserTrainings(response);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [uid]);

  useEffect(() => {
    fetchUserTrainingsHandler();
  }, [fetchUserTrainingsHandler]);

  return (
    <React.Fragment>
      <SecondNavigationBar fetchingTrainings={fetchUserTrainingsHandler} />
      <TrainingsFromCalendar userTrainings={userTrainings} error={error} />
    </React.Fragment>
  );
};

export default UserTrainingsFromCalendarPage;

export { fetchingTrainings };
