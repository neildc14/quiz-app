import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectCategory from "./SelectCategory";

export const tagsFromCategories = [];

function Categories() {
  const [isHidden, setHidden] = useState(true);
  const [categories, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-trivia-api.com/api/categories")
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.dataset.tags]);
      tagsFromCategories.push(e.target.dataset.tags);
    } else {
      unCheck(e);
    }
  };

  const unCheck = (e) => {
    setTags([...tags.filter((tag) => tag !== e.target.dataset.tags)]);
    console.log(
      tagsFromCategories.filter((tag) => tag !== e.target.dataset.tags)
    );
  };

  console.log(tagsFromCategories);
  return (
    <div className="category">
      <button
        className="category_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Categories
        <span className="material-symbols-outlined category_button_arrow">
          chevron_right
        </span>
      </button>
      {isHidden ? (
        ""
      ) : (
        <SelectCategory
          loading={loading}
          categories={categories}
          handleCheck={handleCheck}
          tags={tags}
          setHidden={() => setHidden(true)}
        />
      )}
    </div>
  );
}

export default Categories;
