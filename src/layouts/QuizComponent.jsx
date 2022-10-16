import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Header from "./Header";

const Categories = lazy(() => import("../components/Categories"));
const Difficulties = lazy(() => import("../components/Difficulties"));
const Limit = lazy(() => import("../components/Limit"));
const Tags = lazy(() => import("../components/Tags"));
const Quiz = lazy(() => import("../components/Quiz"));

export const CategoriesContext = React.createContext();
export const DifficultiesContext = React.createContext();
export const LimitContext = React.createContext();
export const TagsContext = React.createContext();
export const ScoreContext = React.createContext();

function QuizComponent() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([
    "arts_and_literature",
  ]);
  const [difficulty, setDifficulty] = useState("easy");
  const [limit, setLimit] = useState(5);
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [displayIcon, setDisplayIcon] = useState(false);
  const [start, setStart] = useState(false);
  const [error, setError] = useState("");
  const [previousScore, setPreviousScore] = useState(null);
  const [firstTry, setFirstTry] = useState(true);

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

  const startQuiz = () => {
    setPreviousScore(null);
    setFirstTry(true);
    setStart(true);
  };

  return (
    <>
      {!start ? (
        <div>
          <Header />
          <Suspense>
            <div className="options">
              <CategoriesContext.Provider
                value={{
                  loading,
                  categories,
                  selectedCategory,
                  setSelectedCategory,
                }}
              >
                <Categories />
              </CategoriesContext.Provider>

              <DifficultiesContext.Provider
                value={{ difficulty, setDifficulty }}
              >
                <Difficulties />
              </DifficultiesContext.Provider>

              <LimitContext.Provider value={{ limit, setLimit }}>
                <Limit />
              </LimitContext.Provider>

              <TagsContext.Provider
                value={{
                  loading,
                  tagsFromAPI,
                  selectedTags,
                  setSelectedTags,
                }}
              >
                <Tags />
              </TagsContext.Provider>

              {error !== "" ? <p className="error_message">{error}</p> : null}
              <button className=" start_button" onClick={startQuiz}>
                Start
              </button>
            </div>
          </Suspense>
        </div>
      ) : (
        <Suspense>
          <ScoreContext.Provider
            value={{ previousScore, setPreviousScore, firstTry, setFirstTry }}
          >
            {" "}
            <Quiz
              selectedCategory={selectedCategory}
              difficulty={difficulty}
              limit={limit}
              selectedTags={selectedTags}
              setStart={setStart}
            />
          </ScoreContext.Provider>
        </Suspense>
      )}
    </>
  );
}

export default QuizComponent;
