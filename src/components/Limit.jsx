import React, { useContext } from "react";
import { LimitContext } from "../layouts/QuizComponent";

function Limit() {
  const limitContext = useContext(LimitContext);
  const { limit, setLimit } = limitContext;

  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div className="limit">
      <input
        type="range"
        name=""
        id=""
        value={limit}
        onChange={changeLimit}
        max="20"
        min="5"
        className="limit_input"
      />
      <label htmlFor="" className="limit_label">
        Limit questions: <strong>{limit}</strong>
      </label>
    </div>
  );
}

export default Limit;
