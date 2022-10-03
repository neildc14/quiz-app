import React, { Suspense, lazy } from "react";

const Categories = lazy(() => import("./Categories"));
const Difficulties = lazy(() => import("./Difficulties"));
const Limit = lazy(() => import("./Limit"));

function Options() {
  return (
    <Suspense>
      <div className="options">
        <Categories />
        <Difficulties />
        <Limit />
      </div>
    </Suspense>
  );
}

export default Options;
