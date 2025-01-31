import React, { useState } from "react";

function MultiCounter(props) {
  const { initialValue, incrementValue } = props;
  const [count, setCount] = useState({
    countA: initialValue,
    countB: initialValue,
  });

  const incrementA = () => {
    setCount((prevCount) => ({
      ...prevCount,
      countA: prevCount.countA + incrementValue,
    }));
  };
  const incrementB = () => {
    setCount((prevCount) => ({
      ...prevCount,
      countB: prevCount.countB + incrementValue,
    }));
  };
  return (
    <>
      <div className="container">
        <h1>CountA: {count.countA}</h1>
        <button onClick={incrementA}>Increment A</button>

        <h1>CountB: {count.countB}</h1>
        <button onClick={incrementB}>Increment B</button>
      </div>
    </>
  );
}

export default MultiCounter;
