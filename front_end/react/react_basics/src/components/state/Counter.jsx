import React, { useState } from "react";

function Counter() {
  let [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1);
    console.log(count);
  }

  const decrement = () => {
    setCount(count - 1);
  };

  const incrementFive = () => {
    for (let i = 0; i < 5; i++) {
      increment();
    }
  };
  return (
    <>
      <section className="counter">
        <h1>Count: {count}</h1>
        <sections className="btns">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={incrementFive}>Increment 5x</button>
        </sections>
      </section>
    </>
  );
}

export default Counter;
