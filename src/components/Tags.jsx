import React, { useState, useContext } from "react";
import SelectTags from "./SelectTags";
import { TagsContext } from "../layouts/QuizComponent";

function Tags() {
  const [isHidden, setHidden] = useState(true);
  const tagsContext = useContext(TagsContext);
  const { loading, tagsFromAPI, selectTagsHandler, selectedTags } = tagsContext;

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
        <span className="material-symbols-outlined button_arrow">
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
        />
      )}
    </div>
  );
}

export default Tags;
