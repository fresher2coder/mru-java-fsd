import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
    console.log(count);
  }
  return (
    <>
      <h1>Count: {count}</h1>
      <sections className="btns">
        <button onClick={increment}>Increment</button>
      </sections>
    </>
  );
}

export default Counter;
