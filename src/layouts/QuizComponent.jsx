import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Options from "../components/Options";
import owl from "../assets/images/owl.jpg";

const initialState = {
  categories: [],
  difficulty: "",
  limit: "",
  tags: [],
  regions: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_FETCH":
      return {
        categories: [action.categories],
        difficulty: action.difficulty,
        limit: action.limit,
        tags: [action.tags],
        regions: [action.regions],
        error: "",
      };
    case "FAILURE_FETCH":
      return {
        categories: [],
        difficulty: "",
        limit: "",
        tags: [],
        regions: [],
        error: "something went wrong",
      };
    default:
      return state;
  }
};

function QuizComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <header>
        <div className="image_container">
          <img className="image_logo" src={owl} alt="owl" />
        </div>
        <h1 className="logo">QUIZ APP</h1>
      </header>
      <Options />
    </div>
  );
}

export default QuizComponent;
