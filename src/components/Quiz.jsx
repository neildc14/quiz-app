import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import Pagination from "./Pagination";

function Quiz(props) {
  const { selectedCategory, difficulty, limit, selectedTags, backToMenu } =
    props;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstQuestion, setFirstQuestion] = useState(true);
  const [isLastQuestion, setLastQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);

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
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [category, tags, difficulty, limit, selectedCategory, selectedTags]);

  let question;
  const displayQuestion = (questionNumber) => {
    question = questions[questionNumber];
  };
  displayQuestion(questionNumber);

  const displayPreviousButton = () => {
    setFirstQuestion(false);
  };

  const displayNextButton = () => {
    setLastQuestion(true);
  };

  console.log("aaa", answer);

  return (
    <div className="quiz">
      {!loading && (
        <div>
          {questions.length === 0 ? (
            <div>No quiz found. Try new category</div>
          ) : (
            <div>
              <Question
                question={question}
                questionNumber={questionNumber}
                correctAnswer={correctAnswer}
                setCorrectAnswer={setCorrectAnswer}
                answer={answer}
                setAnswer={setAnswer}
              />
              <Pagination
                isFirstQuestion={isFirstQuestion}
                isLastQuestion={isLastQuestion}
                displayPreviousButton={displayPreviousButton}
                displayNextButton={displayNextButton}
              />
            </div>
          )}
        </div>
      )}
      <button className=" start_button" onClick={backToMenu}>
        Menu
      </button>
    </div>
  );
}

export default Quiz;
