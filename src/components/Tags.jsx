import React, { useState, useContext, useEffect } from "react";
import SelectTags from "./SelectTags";
import { TagsContext } from "../layouts/QuizComponent";

function Tags(props) {
  const { displayIcon } = props;
  const [isHidden, setHidden] = useState(true);
  const tagsContext = useContext(TagsContext);
  const {
    loading,
    tagsFromAPI,
    selectTagsHandler,
    selectedTags,
    setSelectedTags,
  } = tagsContext;

  useEffect(() => {
    let buttonArrow = document.querySelector(".button_arrow-tags");
    window.addEventListener("load", displayIcon(buttonArrow));
  }, [displayIcon]);

  const closeButton = () => {
    setHidden(true);
  };

  return (
    <div className="tags">
      <button
        className="category_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Tags
        <span className="material-symbols-outlined button_arrow button_arrow-tags">
          chevron_right
        </span>
      </button>
      {isHidden ? (
        ""
      ) : (
        <SelectTags
          loading={loading}
          tags={tagsFromAPI}
          setHidden={closeButton}
          selectTagsHandler={selectTagsHandler}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      )}
    </div>
  );
}

export default Tags;
