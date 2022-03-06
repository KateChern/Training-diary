import React from "react";
import Slider from "../Helpers/Slider/Slider";
import cx from "classnames";
import { Link } from "react-router-dom";
import classes from "../Programs/program-details/ProgramsDetails.module.css";

const TrainingCard = ({ training }) => {
  const fireBaseTime = new Date(
    training.date.seconds * 1000 + training.date.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();

  const colorClasses =
    training.type === "Leg Day"
      ? cx(classes.container, classes["greenLight"])
      : training.type === "Top Day"
      ? cx(classes.container, classes["greenDark"])
      : training.type === "Cardio"
      ? cx(classes.container, classes["blueLight"])
      : training.type === "Full Dody"
      ? cx(classes.container, classes["red"])
      : training.type === "Mixed day"
      ? cx(classes.container, classes["blueDark"])
      : cx(classes.container, classes["red"]);

  return (
    <div className={colorClasses}>
      <Link to={`/usertrainings/${training.id}`}>
        <p className={classes.date}>{date}</p>
        <p className={classes.type}>{training.type}</p>
        <Slider difficultyLevel={training.difficultyLevel} />
      </Link>
    </div>
  );
};

export default TrainingCard;
