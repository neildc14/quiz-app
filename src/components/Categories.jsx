import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import { CategoriesContext } from "../layouts/QuizComponent";

function Categories() {
  const [isHidden, setHidden] = useState(true);

  const categoriesContext = useContext(CategoriesContext);

  const { loading, categories, handleCheck, tags } = categoriesContext;

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
