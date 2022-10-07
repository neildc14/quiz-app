import React, { useEffect } from "react";

function Pagination(props) {
  const {
    isFirstQuestion,
    isLastQuestion,
    displayPreviousButton,
    displayNextButton,
  } = props;

  useEffect(() => {
    let previousButton = document.querySelector(".pagination_button-previous");
    if (isFirstQuestion) {
      previousButton.classList.add("hide_button");
      previousButton.disabled = true;
    } else {
      previousButton.classList.remove("hide_button");
      previousButton.disabled = false;
    }
  }, [isFirstQuestion]);

  useEffect(() => {
    let nextButton = document.querySelector(".pagination_button-next");
    if (isLastQuestion) {
      nextButton.classList.add("hide_button");
      nextButton.disabled = true;
    } else {
      nextButton.classList.remove("hide_button");
      nextButton.disabled = false;
    }
  }, [isLastQuestion]);

  return (
    <div className="pagination">
      <button className="pagination_button pagination_button-previous">
        <span className="material-symbols-outlined pagination_button_icon">
          arrow_back_ios
        </span>
      </button>

      <button
        className="pagination_button pagination_button-next"
        onClick={displayPreviousButton}
      >
        <span className="material-symbols-outlined pagination_button_icon">
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
}

export default Pagination;
