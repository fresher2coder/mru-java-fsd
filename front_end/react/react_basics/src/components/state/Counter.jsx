import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1); // 6 7 8 9 10
    console.log(count);
  }

  const decrement = () => {
    setCount(count - 1);
  };

  const incrementFive = () => {
    for (let i = 0; i < 5; i++) {
      //i = 0 1
      increment();
    }
  };

  return (
    <>
      <section className="container">
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
