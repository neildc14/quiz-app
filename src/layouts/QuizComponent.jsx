import React, { useReducer, useEffect, useState } from "react";
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

export const CategoriesContext = React.createContext();
export const DifficultiesContext = React.crateContext() 

function QuizComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [categories, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-trivia-api.com/api/categories")
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.dataset.tags]);
    } else {
      unCheck(e);
    }
  };

  const unCheck = (e) => {
    setTags([...tags.filter((tag) => tag !== e.target.dataset.tags)]);
  };

  console.log(tags)
  return (
    <div>
      <header>
        <div className="image_container">
          <img className="image_logo" src={owl} alt="owl" />
        </div>
        <h1 className="logo">QUIZ APP</h1>
      </header>
      <CategoriesContext.Provider
        value={{ loading, categories, tags, handleCheck }}
      >
        <Options />
      </CategoriesContext.Provider>
    </div>
  );
}

export default QuizComponent;
