import React from "react";

function Child(props) {
  const { addition } = props;
  return (
    <>
      <h1>Child Component</h1>
      <div className="btn">
        <button
          onClick={() => {
            addition(10, 20);
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default Child;
