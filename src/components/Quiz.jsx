import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import Pagination from "./Pagination";

import Scores from "./Scores";

function Quiz(props) {
  const { selectedCategory, difficulty, limit, selectedTags, setStart } = props;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstQuestion, setFirstQuestion] = useState(true);
  const [isLastQuestion, setLastQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [isSubmitted, setSubmit] = useState(false);
  const [preventShuffle, setPreventShuffle] = useState(false);

  let category;
  selectedCategory.forEach((selected_cat) => {
    category = `categories=${selected_cat}`;
  });

  let tags;
  if (selectedTags.length > 0) {
    selectedTags.forEach((selected_tag) => {
      tags = `&tags=${selected_tag}`;
    });
  } else {
    tags = "";
  }

  const QUESTIONS_URL = "https://the-trivia-api.com/api/questions?";
  useEffect(() => {
    axios
      .get(
        `${QUESTIONS_URL}${category}&limit=${limit}&difficulty=${difficulty}${tags}`
      )
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => console.log(error));
  }, [category, tags, difficulty, limit, selectedCategory, selectedTags]);

  let question;
  const displayQuestion = (questionNumber) => {
    question = questions[questionNumber];
  };
  displayQuestion(questionNumber);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  });

  const backToMenu = () => {
    setStart(false);
  };

  return (
    <div className="quiz">
      {!loading && (
        <div>
          {questions.length === 0 ? (
            <div>No quiz found. Try new category</div>
          ) : (
            <div>
              {!isSubmitted && (
                <div>
                  <Question
                    question={question}
                    answer={answer}
                    setAnswer={setAnswer}
                    questionNumber={questionNumber}
                    preventShuffle={preventShuffle}
                    setPreventShuffle={setPreventShuffle}
                  />
                  <Pagination
                    questions={questions}
                    isLastQuestion={isLastQuestion}
                    setFirstQuestion={setFirstQuestion}
                    setLastQuestion={setLastQuestion}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    preventShuffle={preventShuffle}
                    setPreventShuffle={setPreventShuffle}
                    setSubmit={setSubmit}
                  />
                </div>
              )}
              {isSubmitted && (
                <Scores
                  answer={answer}
                  limitation={limit}
                  setStart={setStart}
                  setSubmit={setSubmit}
                  setQuestionNumber={setQuestionNumber}
                  setAnswer={setAnswer}
                />
              )}
            </div>
          )}
          <div className="button_container">
            <button className=" back_button" onClick={backToMenu}>
              <span className="material-symbols-outlined">home</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
