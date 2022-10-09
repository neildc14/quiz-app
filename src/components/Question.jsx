import React, { useEffect, useState } from "react";

function Question(props) {
  const { question, correctAnswer, setCorrectAnswer, answer, setAnswer } =
    props;
  const [answerPerQuestion, setAnswerPerQuestion] = useState("");

  useEffect(() => {
    if (question !== undefined) {
      setCorrectAnswer([...correctAnswer, question.correctAnswer]);
    } else {
      return;
    }
  }, [question]);

  useEffect(() => {
    shuffleChoices(multipleChoice);
  }, [correctAnswer]);

  useEffect(() => {
    if (answerPerQuestion !== "") {
      setAnswer({ ...answer, ...answerPerQuestion });
    }
  }, [answerPerQuestion]);

  console.log(answer, answerPerQuestion);

  if (question === undefined) {
    return;
  }

  const answers = question.incorrectAnswers;
  answers.push(question.correctAnswer);
  const multipleChoice = [...new Set(answers)];

  const shuffleChoices = (multipleChoice) => {
    for (let i = multipleChoice.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [multipleChoice[i], multipleChoice[j]] = [
        multipleChoice[j],
        multipleChoice[i],
      ];
    }
  };

  const settingAnswerPerQuestion = (id, value) => {
    setAnswerPerQuestion({ [id]: value });
  };

  const clickAnswerHandler = (e) => {
    settingAnswerPerQuestion(question.id, e.target.value);
    unclickAnswerHandler(e);
  };

  const unclickAnswerHandler = (e) => {
    if (answerPerQuestion === e.target.value) {
      e.target.classList.add("selected_answer");
    } else {
      e.target.classList.remove("selected_answer");
    }
  };

  for (let [key, value] of Object.entries(answerPerQuestion)) {
    console.log(key, value);
  }
  return (
    <div className="questionnaire">
      <h4 className="questionnaire_question">{question.question}</h4>
      <section className="answer">
        {multipleChoice.map((choice) => (
          <input
            key={choice}
            type="button"
            value={choice}
            className="answer_choice"
            onClick={clickAnswerHandler}
          />
        ))}
      </section>
    </div>
  );
}

export default Question;
