//try catch finally throw (throws, multiple catch)

import React, { useState } from "react";

function CalculateTotal() {
  const [sum, setSum] = useState(null);
  const handleCalculate = () => {
    try {
      const input = "10";
      const number = parseInt(input);

      if (isNaN(number)) throw new ReferenceError("Not a Number");

      const numberArray = Array.from(
        { length: number },
        (_, index) => index + 1
      );
      console.log(numberArray);
      // const numberArray = [...Array(number).keys()].map((i) => i + 1);
      const total = numberArray.reduce((acc, num) => acc + num, 0);
      console.log(total);
      setSum(total);
    } catch (error) {
      if (error instanceof TypeError) console.error("Type Error Occured");
      else if (error instanceof ReferenceError)
        console.error("Reference Error Occured");
      else console.error("Error Occured");
    } finally {
      console.log("Error handling is completed");
    }
  };
  return (
    <>
      <h1>Calculator</h1>
      <button onClick={handleCalculate}>Calculate</button>
      <h2>Sum: {sum}</h2>
    </>
  );
}

export default CalculateTotal;
