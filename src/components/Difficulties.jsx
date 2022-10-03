import React, { useState, useEffect } from "react";
import SelectDifficulty from "./SelectDifficulty";

function Difficulties(props) {
  const [isHidden, setHidden] = useState(true);

  return (
    <div className="difficulties">
      <button
        className="difficulties_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Difficulties
        <span className="material-symbols-outlined category_button_arrow">
          chevron_right
        </span>
      </button>
      {isHidden ? "" : <SelectDifficulty setHidden={() => setHidden(true)} />}
    </div>
  );
}

export default Difficulties;
