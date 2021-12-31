import React, {useEffect, useContext} from 'react';
import {useParams } from 'react-router-dom';
import SecondNavigationBar from '../components/SecondsNavigation/SecondNavigationBar';
import ProgramsContext from '../store/programsStore/programs-context';
import ProgramDetails from '../components/TrainingPrograms/ProgramsTrainingsInDetails/ProgramsDetails';


const ProgramsDetailPage = () => {
  const programsCtx = useContext(ProgramsContext);
  let params = useParams();

  const program = programsCtx.allPrograms.filter(pr => pr.programName ===  params.programName)


  useEffect(() => {
    console.log(params.programName)
  }, []);

  // console.log(match)
  return (  <React.Fragment>
              <SecondNavigationBar />
              {program.map(pr => <ProgramDetails program={pr} key = {pr.id}/> )}
                           
            </React.Fragment>
  )
};

export default ProgramsDetailPage;

