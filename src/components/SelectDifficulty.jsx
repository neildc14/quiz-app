import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { DifficultiesContext } from "../layouts/QuizComponent";

function SelectDifficulty(props) {
  const { setHidden } = props;

  const difficultyContext = useContext(DifficultiesContext);
  const { difficulty, setDifficultyHandler } = difficultyContext;

  useEffect(() => {
    let difficultySelect = document.querySelectorAll(".difficulty_button");
    console.log("diff");
    difficultySelect.forEach((difficultyMode) => {
      if (difficultyMode.value.includes(difficulty)) {
        console.log(difficulty, difficultyMode.value);
        difficultyMode.classList.add("selected_difficulty");
      } else {
        difficultyMode.classList.remove("selected_difficulty");
      }
    });
  }, [difficulty]);

  let portal = document.getElementById("difficulty-modal");

  return ReactDOM.createPortal(
    <>
      <div className="select_options">
        <span
          className="material-symbols-outlined close_btn"
          onClick={setHidden}
        >
          close
        </span>
        <div className="input_group">
          <input
            type="button"
            value="easy"
            className="difficulty_button"
            onClick={setDifficultyHandler}
          />
        </div>
        <div className="input_group">
          <input
            type="button"
            value="medium"
            className="difficulty_button"
            onClick={setDifficultyHandler}
          />
        </div>
        <div className="input_group">
          <input
            type="button"
            value="hard"
            className="difficulty_button"
            onClick={setDifficultyHandler}
          />
        </div>
      </div>
    </>,
    portal
  );
}

export default SelectDifficulty;
