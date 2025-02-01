import React, { useEffect } from "react";

function MouseTracker(props) {
  const { setCoordinates } = props;
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
    console.log("Coordinated Changed");
  }, [setCoordinates]);
  return (
    <>
      <section>
        <h3>Mouse Tracker Active</h3>
        <p>Move your mouse to track the coordinates</p>
      </section>
    </>
  );
}

export default MouseTracker;
