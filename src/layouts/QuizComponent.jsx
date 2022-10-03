import React, { useReducer, useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
// import Options from "../components/Options";
import Header from "./Header";

const Categories = lazy(() => import("../components/Categories"));
const Difficulties = lazy(() => import("../components/Difficulties"));
const Limit = lazy(() => import("../components/Limit"));

export const CategoriesContext = React.createContext();
export const DifficultiesContext = React.createContext();
export const LimitContext = React.createContext();

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

  const [categories, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [limit, setLimit] = useState(5);

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

  console.log(tags);

  //difficulty component
  const setDifficultyHandler = (e) => {
    setDifficulty(e.target.value);
  };

  console.log(difficulty);

  //limit component
  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  console.log(limit);

  return (
    <div>
      <Header />
      <Suspense>
        <div className="options">
          <CategoriesContext.Provider
            value={{
              loading,
              categories,
              tags,
              handleCheck,
            }}
          >
            <Categories />
          </CategoriesContext.Provider>
          <DifficultiesContext.Provider
            value={{ difficulty, setDifficultyHandler }}
          >
            <Difficulties />
          </DifficultiesContext.Provider>
          <LimitContext.Provider value={{ limit, setLimit, changeLimit }}>
            <Limit />
          </LimitContext.Provider>
        </div>
      </Suspense>
    </div>
  );
}

export default QuizComponent;
