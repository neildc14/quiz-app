import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function SelectTags(props) {
  const { loading, setHidden, tags, selectedTags, selectTagsHandler } = props;

  useEffect(() => {
    let tagsSelect = document.querySelectorAll(".tag_button");
    tagsSelect.forEach((tag) => {
      selectedTags.includes(tag.value)
        ? tag.classList.add("selected_tag")
        : tag.classList.remove("selected_tag");
    });
  }, [selectedTags]);

  let portal = document.getElementById("portal");
  return ReactDOM.createPortal(
    <>
      <div className="select_options select_tags">
        <span
          className="material-symbols-outlined close_btn-tags"
          onClick={setHidden}
        >
          close
        </span>
        <div className="select_tags_list">
          {loading
            ? null
            : tags.map((tag) => {
                return (
                  <div className="input_group" key={tag}>
                    <input
                      type="button"
                      value={tag}
                      className="select_button tag_button"
                      onClick={selectTagsHandler}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </>,
    portal
  );
}

export default SelectTags;
