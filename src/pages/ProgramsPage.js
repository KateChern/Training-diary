import React from 'react';

import SecondNavigationBar from '../components/SecondsNavigation/SecondNavigationBar';

import ListOfProgramsNames from '../components/TrainingPrograms/ListOfProgramsNames/ListOfProgramsNames';


const ProgramsPage = () => {
  return (  <React.Fragment>
              <SecondNavigationBar />
              <ListOfProgramsNames />
            </React.Fragment>
  )
};

export default ProgramsPage;