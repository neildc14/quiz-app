import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import Pagination from "./Pagination";

function Quiz(props) {
  const { selectedCategory, difficulty, limit, selectedTags, setStart } = props;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstQuestion, setFirstQuestion] = useState(true);
  const [isLastQuestion, setLastQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
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

  console.log(questionNumber);

  console.log("accumulated answers", answer);

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
              <Question
                question={question}
                answer={answer}
                setAnswer={setAnswer}
              />
              <Pagination
                questions={questions}
                isFirstQuestion={isFirstQuestion}
                isLastQuestion={isLastQuestion}
                setFirstQuestion={setFirstQuestion}
                setLastQuestion={setLastQuestion}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
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
