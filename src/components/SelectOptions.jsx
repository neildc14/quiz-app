import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function SelectOptions(props) {
  const { tags, categories, handleCheck, loading } = props;

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      console.log(checkbox.dataset.tags);
      if (tags.includes(checkbox.dataset.tags)) {
        checkbox.checked = true;
      }
    });
  }, []);

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
          data-tags={topics}
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
      {loading ? null : <div className="select_options"> {categoryList}</div>}
    </>,
    portal
  );
}

export default SelectOptions;
