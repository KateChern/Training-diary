import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import TrainingDetailsFunc from "../components/TrainingsList/TrainingDetailsFunc";

const SingleTrainingCardFromDBPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <TrainingDetailsFunc />
    </React.Fragment>
  );
};

export default SingleTrainingCardFromDBPage;
