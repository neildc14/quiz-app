import React, { useState, useEffect, useContext } from "react";
import { LimitContext } from "../layouts/QuizComponent";

function Limit() {
  const limitContext = useContext(LimitContext);
  const { limit, setLimit, changeLimit } = limitContext;

  useEffect(() => {
    if (limit < 5) {
      setLimit(5);
    }
    console.log(limit);
  }, [limit]);

  return (
    <div className="limit">
      <input
        type="range"
        name=""
        id=""
        value={limit}
        onChange={changeLimit}
        max="20"
        mix="5"
        className="limit_input"
      />
      <label htmlFor="" className="limit_label">
        Limit questions: <strong>{limit}</strong>
      </label>
    </div>
  );
}

export default Limit;
