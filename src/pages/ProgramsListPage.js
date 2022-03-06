import React from "react";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import ListOfProgramsNames from "../components/Programs/list-of-programs/ListOfProgramsFromDB";

const ProgramsPage = () => {
  return (
    <React.Fragment>
      <SecondNavigationBar />
      <ListOfProgramsNames />
    </React.Fragment>
  );
};

export default ProgramsPage;
