import Slider from "../../Helpers/Slider/Slider";
import classes from "./ProgramsDetails.module.css";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";
import TrainingsContext from "../../../store/trainingsStore/trainings-context";
import { useContext } from "react";
import { useEffect } from "react";

const ProgramDetails = ({ program }) => {
  const ctx = useContext(TrainingsContext);
  const navigate = useNavigate();

  useEffect(() => {
    ctx.fetchTrainings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.ListContainer}>
      <p className={classes.trainingName} onClick={() => navigate(-1)}>
        {program.programName}
      </p>
      {program.trainings.map((training, key) => (
        <Link key={key} to={`/trainings/${training.id}`}>
          <div
            className={
              training.type === "Leg Day"
                ? cx(classes.container, classes["greenLight"])
                : training.type === "Top day"
                ? cx(classes.container, classes["greenDark"])
                : training.type === "Cardio Day"
                ? cx(classes.container, classes["blueLight"])
                : training.type === "Mixed day"
                ? cx(classes.container, classes["blueDark"])
                : cx(classes.container, classes["red"])
            }
          >
            <p>Day {key + 1} </p>
            <h3 className={classes.title}>{training.type}</h3>
            <Slider difficultyLevel={training.difficultyLevel} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProgramDetails;
