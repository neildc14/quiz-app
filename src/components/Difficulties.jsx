import React, { useState, useEffect } from "react";
import SelectDifficulty from "./SelectDifficulty";

function Difficulties(props) {
  const { displayIcon } = props;
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    let buttonArrow = document.querySelector(".button_arrow-difficulty");
    window.addEventListener("load", displayIcon(buttonArrow));
  }, [displayIcon]);

  const closeButton = () => {
    setHidden(true);
  };

  return (
    <div className="difficulties">
      <button
        className="difficulties_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Difficulty
        <span className="material-symbols-outlined button_arrow button_arrow-difficulty">
          chevron_right
        </span>
      </button>
      {isHidden ? "" : <SelectDifficulty setHidden={closeButton} />}
    </div>
  );
}

export default Difficulties;
