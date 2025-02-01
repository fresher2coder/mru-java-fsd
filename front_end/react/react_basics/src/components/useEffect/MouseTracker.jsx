import React, { useEffect, useState } from "react";

function MouseTracker(props) {
  const { setCoordinates } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("UseEffect: Always");
  });

  useEffect(() => {
    console.log("UseEffect: Mounted");

    const handleMouseMove = (event) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      console.log("UseEffect: UnMounted");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log("UseEffect: Count is Updated");
  }, [count]);

  return (
    <>
      <h3>Mouse Tracker is Active</h3>
      <button onClick={() => setCount(count + 1)}>Click: {count}</button>
    </>
  );
}

export default MouseTracker;
