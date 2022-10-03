import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { DifficultiesContext } from "../layouts/QuizComponent";

function SelectDifficulty(props) {
  const { setHidden } = props;

  const difficultyContext = useContext(DifficultiesContext);
  const { setDifficultyHandler } = difficultyContext;

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
