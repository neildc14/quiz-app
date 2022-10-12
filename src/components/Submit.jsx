import React from "react";

function Submit(props) {
  const { setSubmit } = props;

  const submitAnswers = () => {
    setSubmit(true);
  };

  return (
    <button className="submit_button" onClick={submitAnswers}>
      Submit Answers
    </button>
  );
}

export default Submit;
