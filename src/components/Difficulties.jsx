import React, { useState, useContext } from "react";
import SelectDifficulty from "./SelectDifficulty";

function Difficulties(props) {
  const [isHidden, setHidden] = useState(true);

  const closeButton = () =>{
    setHidden(true)
  }

  return (
    <div className="difficulties">
      <button
        className="difficulties_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Difficulties
        <span className="material-symbols-outlined button_arrow">
          chevron_right
        </span>
      </button>
      {isHidden ? "" : <SelectDifficulty setHidden={closeButton} />}
    </div>
  );
}

export default Difficulties;
