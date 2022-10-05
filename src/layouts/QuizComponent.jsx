import React, { useReducer, useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Header from "./Header";
import Questions from "../components/Questions";

const Categories = lazy(() => import("../components/Categories"));
const Difficulties = lazy(() => import("../components/Difficulties"));
const Limit = lazy(() => import("../components/Limit"));
const Tags = lazy(() => import("../components/Tags"));

export const CategoriesContext = React.createContext();
export const DifficultiesContext = React.createContext();
export const LimitContext = React.createContext();
export const TagsContext = React.createContext();

function QuizComponent() {
  const [categories, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [tagsOfCategory, setTagsOfCategory] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [limit, setLimit] = useState(5);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [start, setStart] = useState(false);
  const [error, setError] = useState("");

  const CATEGORIES_URL =
    process.env.REACT_APP_CATEGORIES_URL ??
    "https://the-trivia-api.com/api/categories";

  useEffect(() => {
    axios
      .get(`${CATEGORIES_URL}`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong. Check your connection");
        console.log(error);
      });
  }, [CATEGORIES_URL]);

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setTagsOfCategory([...tagsOfCategory, e.target.dataset.tags]);
    } else {
      unCheck(e);
    }
  };

  const unCheck = (e) => {
    setTagsOfCategory([
      ...tagsOfCategory.filter((tag) => {
        return tag !== e.target.dataset.tags;
      }),
    ]);
  };

  const setDifficultyHandler = (e) => {
    setDifficulty(e.target.value);
  };

  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  const TAGS_URL =
    process.env.REACT_APP_TAGS_URL ?? "https://the-trivia-api.com/api/tags";

  useEffect(() => {
    axios(`${TAGS_URL}`)
      .then((response) => {
        setTagsFromAPI(response.data);
      })
      .catch((error) => {
        setError("Something went wrong. Check your connection");
        console.log(error);
      });
  }, [TAGS_URL]);

  const selectTagsHandler = (e) => {
    if (selectedTags.includes(e.target.value)) {
      unselectTagsHandler(e);
    } else {
      setSelectedTags([...selectedTags, e.target.value]);
    }
  };

  const unselectTagsHandler = (e) => {
    setSelectedTags([
      ...selectedTags.filter((tag) => {
        return tag !== e.target.value;
      }),
    ]);
  };
  console.log(selectedTags);

  const startQuiz = () => {
    setStart(true);
  };
  return (
    <div>
      <Header />
      {!start ? (
        <Suspense>
          <div className="options">
            <CategoriesContext.Provider
              value={{
                loading,
                categories,
                tagsOfCategory,
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

            <TagsContext.Provider
              value={{ loading, tagsFromAPI, selectTagsHandler, selectedTags }}
            >
              <Tags />
            </TagsContext.Provider>

            {error !== "" ? <p className="error_message">{error}</p> : null}
            <button className=" start_button" onClick={startQuiz}>
              Start
            </button>
          </div>
        </Suspense>
      ) : (
        <Questions />
      )}
    </div>
  );
}

export default QuizComponent;
