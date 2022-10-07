import React, { useEffect } from "react";

function Question(props) {
  const { question, correctAnswer, setCorrectAnswer, answer, setAnswer } =
    props;

  useEffect(() => {
    if (question !== undefined) {
      setCorrectAnswer([...correctAnswer, question.correctAnswer]);
    } else {
      return;
    }
  }, [question]);

  useEffect(() => {
    shuffleChoices(multipleChoice);
  }, []);

  useEffect(() => {
    let answerChoice = document.querySelectorAll(".answer_choice");
    answerChoice.forEach((choice) => {
      answer.includes(choice.value)
        ? choice.classList.add("selected_answer")
        : choice.classList.remove("selected_answer");
    });
  }, [answer]);

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
      console.log("shuffled");
    }
  };

  const clickAnswerHandler = (e) => {
    if (!answer.includes(e.target.value)) {
      setAnswer([...answer, e.target.value]);
    } else {
      unclickAnswerHandler(e);
    }
  };

  const unclickAnswerHandler = (e) => {
    setAnswer([...answer.filter((answer) => answer.value === e.target.value)]);
  };

  console.log(answer);
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
