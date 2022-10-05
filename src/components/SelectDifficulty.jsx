import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { DifficultiesContext } from "../layouts/QuizComponent";

function SelectDifficulty(props) {
  const { setHidden } = props;

  const difficultyContext = useContext(DifficultiesContext);
  const { difficulty, setDifficultyHandler } = difficultyContext;
  const values = ["easy", "medium", "hard"];

  useEffect(() => {
    let difficultySelect = document.querySelectorAll(".difficulty_button");

    for (let difficultyMode of difficultySelect) {
      difficultyMode.value.includes(difficulty)
        ? difficultyMode.classList.add("selected_difficulty")
        : difficultyMode.classList.remove("selected_difficulty");
    }
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
        {values.map((value) => {
          return (
            <div className="input_group" key={value}>
              <input
                type="button"
                value={value}
                className="difficulty_button select_button"
                onClick={setDifficultyHandler}
              />
            </div>
          );
        })}
      </div>
    </>,
    portal
  );
}

export default SelectDifficulty;
