import React from "react";

const TrainingsContext = React.createContext({
  allTrainings: [],
  loading: false,
  error: null,
  userTrainings: [],
  fetchUserTrainings: () => {},
  fetchTrainings: () => {},
});

export default TrainingsContext;
