import React, { useState, useEffect } from "react";
import { app, database } from "../services/firebase";
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
  const { limitation, answer } = props;
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

  useEffect(() => {
    try {
      addDoc(collection(database, "score"), {
        highest_score: scores.length,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  }, []);

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
  }, [onSnapshot]);

  useEffect(() => {
    setInterval(() => {
      setDoneQuery(true);
    }, 500);
  }, []);

  if (isDoneQuery) {
    console.log(highestScore["highest_score"]);
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
      <h2 className="scores_total"> {limitation}</h2>
      {comment}
      {isDoneQuery && <h4>Top Score: {highestScore["highest_score"]}</h4>}
    </div>
  );
}

export default Scores;
