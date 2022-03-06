import React from "react";
import classes from "../TrainingsList/TrainingDetails.module.css";
import Slider from "../Helpers/Slider/Slider";
import UpdateButton from "../Helpers/ActionButton/ActionButton";

const TrainingDetailsCard = ({
  level,
  onChangeValue,
  onSubmitAction,
  training,
  difficultyLevel,
}) => {
  const context =
    !training || training.length === 0 ? (
      <p className={classes.msg}>something went wrong, try again</p>
    ) : (
      <>
        <div className={classes.container}>
          <h2 className={classes.title}>{training.type}</h2>
          <h3>Exercises</h3>
          <ol className={classes.list}>
            {training.exercises.map((x, key) => (
              <li key={key}>
                <p className={classes["exercise-name"]}>
                  {key + 1}. {x.exercisesValue}{" "}
                </p>
                <p className={classes["exercise-repeats"]}>{x.numberValue}</p>
              </li>
            ))}
          </ol>
          <div>
            <h3 className={classes.title}>Description</h3>
            <p className={classes.description}> {training.description}</p>
          </div>
          <Slider
            difficultyLevel={difficultyLevel}
            level={level}
            onChangeValue={onChangeValue}
          />
        </div>

        <UpdateButton onclick={onSubmitAction} text={"Completed"} />
      </>
    );
  return <React.Fragment>{context}</React.Fragment>;
};

export default TrainingDetailsCard;
