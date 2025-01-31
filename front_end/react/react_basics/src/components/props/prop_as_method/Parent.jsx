import React, { useState } from "react";
import Child from "./Child";

function Parent() {
  const [sum, setSum] = useState(0);

  const add = (a, b) => {
    setSum(a + b);
  };
  return (
    <>
      <div className="container">
        <h1>Parent Component</h1>
        <h2>Sum: {sum}</h2>
        <Child addition={add} />
      </div>
    </>
  );
}

export default Parent;
