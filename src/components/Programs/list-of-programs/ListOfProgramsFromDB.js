import classes from "./ListOfProgramsNames.module.css";
import { Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import ProgramsContext from "../../../store/programsStore/programs-context";

const ListOfProgramsNames = () => {
  const programsCtx = useContext(ProgramsContext);
  const programs = programsCtx.allPrograms;
  const isLoading = programsCtx.loading;
  const error = programsCtx.error;

  const programList = programs.map((program) => (
    <Link key={program.programName} to={`/ProgramsList/${program.programName}`}>
      <p className={classes.trainingName}>{program.programName}</p>
    </Link>
  ));

  let content = <p className={classes.msg}>Found no programs.</p>;

  if (programs.length > 0) {
    content = programList;
  }
  if (error) {
    content = <p className={classes.msg}>{error}</p>;
  }
  if (isLoading) {
    content = <p className={classes.msg}>Loading...</p>;
  }
  return (
    <Fragment>
      <h3 className={classes.header}>All available programs </h3>
      {content}
    </Fragment>
  );
};

export default ListOfProgramsNames;
