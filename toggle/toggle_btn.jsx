import { useState } from 'react';
import { IoMdSwitch } from "react-icons/io";
import "./index.css";

export const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  }

  const checkIsOn = isOn ? 'on' : 'off';

  const toggleBGColor = {backgroundColor: isOn ? '#4caf50' : '#f44336'}
  return(
    <>
        <h1 style={{color:"#000", textAlign: "center"}}>
          Toggle Switch{" "}
          <IoMdSwitch style={{color:"purple", textAlign: "center"}}/>
        </h1>
        <div className="toggle-switch" style={toggleBGColor} onClick = {handleToggleSwitch}>
          <div className={`switch ${checkIsOn}`}>
            <span className="switch-state">{checkIsOn}</span>
          </div>
        </div>
    </>    
  );
};