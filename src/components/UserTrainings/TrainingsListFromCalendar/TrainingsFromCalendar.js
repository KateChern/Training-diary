import TrainingCard from "../../TrainingsList/TrainingCard";
import classes from "../AllUserTrainings/AllUserTrainings.module.css";
const TrainingsFromCalendar = ({ userTrainings, error }) => {
  const context = error ? (
    <p className={classes.msg}>
      Select a day or a range of days in the calendar
    </p>
  ) : !userTrainings || userTrainings.length === 0 ? (
    <p className={classes.msg}>No trainings for selected dates</p>
  ) : (
    <div className={classes.listContainer}>
      {userTrainings.map((training, index) => (
        <TrainingCard training={training} key={index} />
      ))}
    </div>
  );

  return (
    <div>
      {" "}
      <h3 className={classes.header}>
        All your completed training for selected dates:{" "}
      </h3>
      {context}
    </div>
  );
};

export default TrainingsFromCalendar;
