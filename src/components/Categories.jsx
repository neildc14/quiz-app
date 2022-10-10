import React, { useState, useContext, useEffect } from "react";
import SelectCategory from "./SelectCategory";
import { CategoriesContext } from "../layouts/QuizComponent";

function Categories() {
  const [isHidden, setHidden] = useState(true);
  const categoriesContext = useContext(CategoriesContext);
  const {
    loading,
    categories,
    handleCheck,
    selectedCategory,
    setSelectedCategory,
  } = categoriesContext;

  const closeButton = () => {
    setHidden(true);
  };

  return (
    <div className="category">
      <button
        className="category_button option_button"
        onClick={() => setHidden(!isHidden)}
      >
        Select Categories
        <span className="material-symbols-outlined button_arrow">
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
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setHidden={closeButton}
        />
      )}
    </div>
  );
}

export default Categories;
