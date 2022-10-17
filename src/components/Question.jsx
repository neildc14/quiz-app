import React, { useEffect, useState } from "react";

function Question(props) {
  const { questionNumber, question, answer, setAnswer } = props;
  const [answerPerQuestion, setAnswerPerQuestion] = useState("");
  const [isShuffled, setShuffle] = useState(false);
  const [multipleChoices, setMultipleChoice] = useState([]);

  useEffect(() => {
    shuffleChoices([...new Set(answers)]);
    setShuffle(true);
  }, [question]);

  useEffect(() => {
    if (answerPerQuestion !== "") {
      setAnswer({ ...answer, ...answerPerQuestion });
    }
  }, [answerPerQuestion]);

  useEffect(() => {
    let answerChoice = document.querySelectorAll(".answer_choice");
    answerChoice.forEach((choice) => {
      let valueLength = choice.value.length;
      if (valueLength >= 20) {
        choice.classList.add("answer_choice-wrapped");
      } else if (valueLength >= 30) {
        choice.scroll.cssText = "font-size: .5rem";
      }
    });
  }, [multipleChoices]);

  if (question === undefined) {
    return;
  }

  const answers = [...question.incorrectAnswers, question.correctAnswer];
  const shuffleChoices = (multipleChoice) => {
    for (let i = multipleChoice.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [multipleChoice[i], multipleChoice[j]] = [
        multipleChoice[j],
        multipleChoice[i],
      ];
    }
    setMultipleChoice(multipleChoice);
  };

  const settingAnswerPerQuestion = (id, value, correctAnswer) => {
    setAnswerPerQuestion({
      [id]: { chosenAnswer: value, theCorrectAnswer: correctAnswer },
    });
  };

  const clickAnswerHandler = (e) => {
    settingAnswerPerQuestion(
      question.id,
      e.target.value,
      question.correctAnswer
    );
  };

  return (
    <div className="questionnaire">
      <div className="questionnaire_container">
        <h4 className="questionnaire_number">
          Question No: {questionNumber + 1}
        </h4>
        <h4 className="questionnaire_question">{question.question}</h4>
      </div>
      <section className="answer">
        {isShuffled &&
          multipleChoices.map((choice) => (
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
