import classes from './Slider.module.css'
import { useState } from "react";

const Slider = () => {
    
    const [value, setValue ] = useState(0);
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    console.log(value)
    return (
    <input type='range'
        className={classes["horizontal-slider"]}
        value={value}
        onChange={handleChange}
        min ={0}
        max ={10}
    />
  );
};
export default Slider;