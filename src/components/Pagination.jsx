import React, { useEffect, useState } from "react";

function Pagination(props) {
  const [buttonLabel, setButtonLabel] = useState("NEXT");
  const {
    questions,
    setLastQuestion,
    questionNumber,
    setQuestionNumber,
    setSubmit,
  } = props;

  useEffect(() => {
    if (questionNumber + 1 === questions.length) {
      setButtonLabel("SUBMIT");
    }
    console.log(buttonLabel);
  }, [questionNumber]);
  const nextQuestion = () => {
    if (questionNumber + 1 === questions.length) {
      setLastQuestion(true);
      setSubmit(true);
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination_button-next submit_button"
        onClick={nextQuestion}
      >
        <span> {buttonLabel}</span>
      </button>
    </div>
  );
}

export default Pagination;
