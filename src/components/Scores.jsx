import React, { useState } from "react";

function Scores(props) {
  const { limit, answer } = props;

  let scores = [];
  for (let [key, value] of Object.entries(answer)) {
    const { chosenAnswer, theCorrectAnswer } = value;

    let compareAnswer = theCorrectAnswer.localeCompare(chosenAnswer);
    if (compareAnswer === 0) {
      scores.push([key, compareAnswer]);
    }
  }

  let comment;
  if (scores.length >= limit / 2) {
    comment = <h3 className="scores_comment">Congratulations!</h3>;
  } else {
    comment = <h3 className="scores_comment">HAHA Bobo!</h3>;
  }

  return (
    <div className="scores">
      <p className="scores_description">Total</p>
      <h2 className="scores_total">{scores.length}</h2>
      <hr />
      <h2 className="scores_total"> {limit}</h2>
      {comment}
    </div>
  );
}

export default Scores;
