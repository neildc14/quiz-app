import React, { useState, useEffect } from "react";
import { database } from "../services/firebase";
import like_owl from "../assets/images/like_owl2.png";
import cheer_owl from "../assets/images/cheer_owl2.png";

import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

function Scores(props) {
  const {
    limitation,
    answer,
    setAnswer,
    setStart,
    setSubmit,
    setQuestionNumber,
  } = props;
  const [highestScore, setHighestScore] = useState([]);
  const [isDoneQuery, setDoneQuery] = useState(false);

  let scores = [];
  for (let [key, value] of Object.entries(answer)) {
    const { chosenAnswer, theCorrectAnswer } = value;

    let compareAnswer = theCorrectAnswer.localeCompare(chosenAnswer);
    if (compareAnswer === 0) {
      scores.push([key, compareAnswer]);
    }
  }

  const score = scores.length;
  const DECIMAL = 10.5;
  useEffect(() => {
    try {
      addDoc(collection(database, "score"), {
        highest_score: score * DECIMAL,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  }, [score]);

  useEffect(() => {
    const q = query(
      collection(database, "score"),
      orderBy("highest_score", "desc"),
      limit(1)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setHighestScore({ id: doc.id, ...doc.data() });
      });
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setDoneQuery(true);
    }, 500);
  }, []);

  let comment;
  let passed = score >= limitation / 2;
  passed
    ? (comment = <h3 className="scores_comment">Nice shot!</h3>)
    : (comment = <h3 className="scores_comment">Nice try!</h3>);

  if (passed) {
    let scoreOwl = document.querySelector(".score_owl");
    scoreOwl.setAttrubute("width", "8rem");
  }

  const retryQuiz = () => {
    setAnswer([]);
    setSubmit(false);
    setStart(true);
    setQuestionNumber(0);
  };

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
        {isDoneQuery && <h4>Your Points: {highestScore["highest_score"]}</h4>}
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
