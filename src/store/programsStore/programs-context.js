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
});

export default ProgramsContext;
