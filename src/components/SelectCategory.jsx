import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function SelectCategory(props) {
  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    loading,
    setHidden,
  } = props;

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      if (selectedCategory.includes(checkbox.dataset.category)) {
        checkbox.checked = true;
      }
    });
  }, [selectedCategory]);

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setSelectedCategory([...selectedCategory, e.target.dataset.category]);
    } else {
      unCheck(e);
    }
  };

  const unCheck = (e) => {
    setSelectedCategory([
      ...selectedCategory.filter((category) => {
        return category !== e.target.dataset.category;
      }),
    ]);
  };

  let categoryList = [];
  for (const [key, topics] of Object.entries(categories)) {
    categoryList.push(
      <div className="input_group" key={key}>
        {" "}
        <input
          type="checkbox"
          name={key}
          id=""
          value={key}
          data-category={topics.at(-1)}
          data-key={key}
          onClick={handleCheck}
          className="checkbox"
        />
        <label htmlFor={key} className="input_group_label">
          {key}
        </label>
      </div>
    );
  }

  let portal = document.getElementById("portal");

  return ReactDOM.createPortal(
    <>
      {loading ? null : (
        <div className="select_options">
          <span
            className="material-symbols-outlined close_btn"
            onClick={setHidden}
          >
            close
          </span>
          {categoryList}
        </div>
      )}
    </>,
    portal
  );
}

export default SelectCategory;
