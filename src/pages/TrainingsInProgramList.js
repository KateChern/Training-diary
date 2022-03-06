import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SecondNavigationBar from "../components/Layout/SecondsNavigation/SecondNavigationBar";
import ProgramsContext from "../store/programsStore/programs-context";
import ProgramDetails from "../components/Programs/program-details/ProgramsDetails";

const TrainingsInProgramList = () => {
  const programsCtx = useContext(ProgramsContext);
  let params = useParams();

  const program = programsCtx.allPrograms.filter(
    (pr) => pr.programName === params.programName
  );
  return (
    <React.Fragment>
      <SecondNavigationBar />
      {program.map((pr) => (
        <ProgramDetails program={pr} key={pr.id} />
      ))}
    </React.Fragment>
  );
};

export default TrainingsInProgramList;
