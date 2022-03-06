import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import SelectedUserTraining from "../components/UserTrainings/SelectedUserTraining/SelectedUserTraining";
const SelectedUserTrainingPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <SelectedUserTraining />
    </React.Fragment>
  );
};

export default SelectedUserTrainingPage;
