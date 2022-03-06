import React from "react";

const ProgramsContext = React.createContext({
  allPrograms: [],
  allTrainings: [],
  fetchTrainings: () => {},
  loading: true,
  error: null,
  fetchPrograms: () => {},
  fetchProgramsWhenRefreshing: () => {},
  exercises: [],
  addExerciseToDB: (exercise) => {},
  removeExercise: (id) => {},

  // userTrainings:[],
  // addTraining: (training) => {},
  // removeTraining: (id) => {},
  // editTraining: (training) => {}
});

export default ProgramsContext;
