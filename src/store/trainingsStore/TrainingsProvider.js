import { useReducer, useCallback } from "react";
import TrainingsContext from "./trainings-context";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
// import { collection, getDocs } from "firebase/firestore/lite";
import db from "../../firebase";

const defaultProgramState = {
  allTrainings: [],
  error: null,
  loading: false,
  userTrainings: [],
  filtered: [],
};

const trainingReducer = (state, action) => {
  if (action.type === "FETCH_START_ALL") {
    return {
      loading: true,
      error: null,
      allTrainings: [],
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "FETCH_SUCCESS_ALL") {
    return {
      loading: false,
      error: null,
      allTrainings: action.payload,
      exercises: [],
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "FETCH_ERROR_ALL") {
    return {
      loading: false,
      error: action.payload,
      allTrainings: [],
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "FETCH_ENDED_ALL") {
    return {
      loading: false,
      error: null,
      allTrainings: action.payload,
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "START_USER") {
    return {
      loading: true,
      error: null,
      allTrainings: [],
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "SUCCESS_USER") {
    return {
      loading: false,
      error: null,
      allTrainings: [],
      userTrainings: action.payload,
      filtered: [],
    };
  }
  if (action.type === "START_FILTERED_ALL") {
    return {
      loading: true,
      error: null,
      allTrainings: [],
      userTrainings: [],
      filtered: [],
    };
  }
  if (action.type === "SUCCESS_FILTERED_ALL") {
    return {
      loading: false,
      error: null,
      allTrainings: [],
      userTrainings: [],
      filtered: action.payload,
    };
  }

  return defaultProgramState;
};

const TrainingFetchingProvider = (props) => {
  const [trainingsState, dispatchTrainingsAction] = useReducer(
    trainingReducer,
    defaultProgramState
  );

  const fetchTrainingsHandler = useCallback(async () => {
    dispatchTrainingsAction({ type: "FETCH_START_ALL" });

    const trainingsCol = collection(db, "trainings");
    const trainingsSnapshot = await getDocs(trainingsCol);
    const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());
    dispatchTrainingsAction({
      type: "FETCH_SUCCESS_ALL",
      payload: trainingsList,
    });
    return trainingsList;
  }, []);

  const fetchUserTrainings = async (userState, params) => {
    dispatchTrainingsAction({ type: "START_USER" });

    const q = query(collection(db, `users`), where("id", "==", userState));
    const trainingsSnapshot = await getDocs(q);
    const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());
    const filteredTraining = trainingsList[0].userTrainings.filter(
      (training) => training.id === params.trainingId
    );
    dispatchTrainingsAction({
      type: "SUCCESS_USER",
      payload: filteredTraining,
    });

    console.log(filteredTraining);
    return filteredTraining[0];
  };
  const fetchSelectedTraining = async (params) => {
    dispatchTrainingsAction({ type: "START_FILTERED_ALL" });

    const q = query(
      collection(db, `trainings`),
      where("id", "==", params.trainingId)
    );
    const trainingsSnapshot = await getDocs(q);
    const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());
    console.log(trainingsList);
    // const filteredTraining = trainingsList[0].userTrainings.filter(
    //   (training) => training.id === params.trainingId
    // );
    dispatchTrainingsAction({
      type: "SUCCESS_FILTERED_ALL",
      payload: trainingsList,
    });

    // console.log(filteredTraining);
    // return filteredTraining[0];
  };

  const trainingsContext = {
    error: trainingsState.error,
    loading: trainingsState.loading,
    fetchTrainings: fetchTrainingsHandler,
    allTrainings: trainingsState.allTrainings,
    userTrainings: trainingsState.userTrainings,
    fetchUserTrainings: fetchUserTrainings,
    fetchSelectedTraining: fetchSelectedTraining,
    filtered: trainingsState.filtered,
  };

  return (
    <TrainingsContext.Provider value={trainingsContext}>
      {props.children}
    </TrainingsContext.Provider>
  );
};

export default TrainingFetchingProvider;

//   const q = query(
//   collection(db, "trainings"),
//   where("id", "==", params.trainingId)
// );
// const fetchTrainingsHandler = useCallback(async () => {
//   const trainingsSnapshot = await getDocs(q);
//   const trainingsList = trainingsSnapshot.docs.map((doc) => doc.data());

//   setTraining(trainingsList[0]);
// }, []);
