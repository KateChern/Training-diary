import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import TrainingCard from "./TrainingCard";
import classes from "./TrainingList.module.css";
import ProgramsContext from "../../store/programsStore/programs-context";

const TrainingList = () => {
  const programsCtx = useContext(ProgramsContext);
  let params = useParams();

  const trainings = programsCtx.allPrograms.filter(
    (pr) => pr.programName === params.programName
  );
  console.log(params);
  return (
    <div className={classes.container}>
      {trainings.map((training) => (
        <TrainingCard training={training} key={training.id} />
      ))}
    </div>
  );
};

export default TrainingList;
