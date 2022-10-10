import React, { useEffect } from "react";

function Pagination(props) {
  const {
    questions,
    isFirstQuestion,
    isLastQuestion,
    setFirstQuestion,
    setLastQuestion,
    questionNumber,
    setQuestionNumber,
  } = props;

  useEffect(() => {
    let previousButton = document.querySelector(".pagination_button-previous");
    if (isFirstQuestion) {
      previousButton.classList.add("hide_button");
      previousButton.disabled = true;
    } else {
      previousButton.classList.remove("hide_button");
      previousButton.disabled = false;
    }
  }, [isFirstQuestion]);

  useEffect(() => {
    let nextButton = document.querySelector(".pagination_button-next");
    if (isLastQuestion) {
      nextButton.classList.add("hide_button");
      nextButton.disabled = true;
    } else {
      nextButton.classList.remove("hide_button");
      nextButton.disabled = false;
    }
  }, [isLastQuestion]);

  const nextQuestion = () => {
    if (questionNumber + 1 === questions.length) {
      setLastQuestion(true);
    } else {
      setQuestionNumber(questionNumber + 1);
      setFirstQuestion(false);
    }
  };

  const previousQuestion = () => {
    if (questionNumber === 1) {
      setFirstQuestion(true);
    } else {
      setQuestionNumber(questionNumber - 1);
      setLastQuestion(false);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination_button pagination_button-previous"
        onClick={previousQuestion}
      >
        <span className="material-symbols-outlined pagination_button_icon">
          arrow_back_ios
        </span>
      </button>

      <button
        className="pagination_button pagination_button-next"
        onClick={nextQuestion}
      >
        <span className="material-symbols-outlined pagination_button_icon">
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
}

export default Pagination;
