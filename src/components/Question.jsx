import React, { useEffect, useState } from "react";

function Question(props) {
  const { questionNumber, question, answer, setAnswer } = props;
  const [answerPerQuestion, setAnswerPerQuestion] = useState("");

  console.log(question);
  useEffect(() => {
    shuffleChoices(multipleChoice);
  }, [question]);

  useEffect(() => {
    if (answerPerQuestion !== "") {
      setAnswer({ ...answer, ...answerPerQuestion });
    }
  }, [answerPerQuestion]);

  console.log(answer, answerPerQuestion);

  useEffect(() => {
    let answerChoice = document.querySelectorAll(".answer_choice");
    let id = question.id;
    answerChoice.forEach((choice) => {
      if (answer[id] === undefined) {
        return;
      }
      if (answer[id]["chosenAnswer"] === choice.value) {
        choice.classList.add("selected_answer");
      } else {
        choice.classList.remove("selected_answer");
      }
    });
  }, [question.id]);

  useEffect(() => {
    let answerChoice = document.querySelectorAll(".answer_choice");
    answerChoice.forEach((choice) => {
      let valueLength = choice.value.length;
      if (valueLength >= 20) {
        choice.classList.add("answer_choice-wrapped");
      }

      console.log(choice, questionNumber);
    });
  }, [questionNumber, question]);

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
