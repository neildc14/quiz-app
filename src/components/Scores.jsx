import React, { useState, useEffect, useContext } from "react";
// import { database } from "../services/firebase";
import like_owl from "../assets/images/like_owl2.png";
import cheer_owl from "../assets/images/cheer_owl2.png";
import { ScoreContext } from "../layouts/QuizComponent";

function Scores(props) {
  const {
    limitation,
    answer,
    setAnswer,
    setStart,
    setSubmit,
    setQuestionNumber,
  } = props;

  const scoreContext = useContext(ScoreContext);
  const { firstTry, setFirstTry } = scoreContext;
  const previousScore = scoreContext.previousScore;
  const setPreviousScore = scoreContext.setPreviousScore;
  console.log(scoreContext.previousScore);

  let scores = [];
  for (let [key, value] of Object.entries(answer)) {
    const { chosenAnswer, theCorrectAnswer } = value;

    let compareAnswer = theCorrectAnswer.localeCompare(chosenAnswer);
    if (compareAnswer === 0) {
      scores.push([key, compareAnswer]);
    }
  }

  const score = scores.length;

  useEffect(() => {
    setPreviousScore(previousScore);
  }, [previousScore]);

  const retryQuiz = () => {
    setAnswer([]);
    setSubmit(false);
    setStart(true);
    setQuestionNumber(0);
    setPreviousScore(score);
    setFirstTry(false);
  };

  let passed = score >= limitation / 2;

  useEffect(() => {
    if (passed) {
      let scoreOwl = document.querySelector(".score_owl");
      scoreOwl.style.width = "9.5rem";
    }
  }, [passed]);

  useEffect(() => {
    let scoresButton = document.querySelector(".scores_button");
    if (firstTry) {
      scoresButton.style.margin = "1rem auto";
    }
  }, [firstTry]);

  let comment;
  passed
    ? (comment = <h3 className="scores_comment">Congrats!</h3>)
    : (comment = <h3 className="scores_comment">Nice try!</h3>);

  return (
    <>
      <div className="scores">
        <div className="scores_container">
          <p className="scores_description">Total Score</p>
          <h2 className="scores_total">{score}</h2>
          <hr />
          <h2 className="scores_total"> {limitation}</h2>{" "}
        </div>
        <div className="score_image">
          <img
            src={passed ? cheer_owl : like_owl}
            alt="like_owl"
            className="score_owl"
          />
        </div>
        {comment}
        {!firstTry && <h4>Previous Score: {previousScore}</h4>}
        <div className="button_container">
          <button className=" scores_button" onClick={retryQuiz}>
            Start again
          </button>
        </div>
      </div>
    </>
  );
}

export default Scores;
