import { useState } from "react";
import classes from "./Slider.module.css";

const Slider = ({ difficultyLevel, level, onChangeValue }) => {
  const [newLevel, setnewLevel] = useState(difficultyLevel);

  const handleChange = (e) => {
    onChangeValue(e.target.value);
    setnewLevel(level);
  };

  return (
    <input
      type="range"
      className={classes["horizontal-slider"]}
      value={newLevel}
      onChange={handleChange}
      min={0}
      max={10}
    />
  );
};
export default Slider;
