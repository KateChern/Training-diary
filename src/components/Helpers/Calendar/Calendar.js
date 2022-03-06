import React, { useState } from "react";
import classes from "./Calendar.module.css";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { useNavigate } from "react-router-dom";
import UpdateButton from "../ActionButton/ActionButton";

function CalendarButton({ fetchingTrainings }) {
  const [dateState, setDateState] = useState(new Date());

  const navigate = useNavigate();
  const changeDate = (e) => {
    setDateState(e.target.changedArgs);
  };
  localStorage.setItem("dates", JSON.stringify(dateState.values));

  const fetchFilteredTrainingsHandler = (e) => {
    navigate("/usertrainings-calendar");
    e.preventDefault();
    fetchingTrainings();
  };

  return (
    <div className={classes["calendar-form"]}>
      <CalendarComponent
        value={dateState}
        onChange={changeDate}
        isMultiSelection={true}
      ></CalendarComponent>
      <UpdateButton text={"Apply"} onclick={fetchFilteredTrainingsHandler} />
    </div>
  );
}

export default CalendarButton;
