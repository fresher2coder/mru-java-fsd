import React, { useEffect, useState } from "react";
import MouseTracker from "./MouseTracker";

function ParentContainer() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showTracker, setShowTracker] = useState(true);
  useEffect(() => {
    console.log("X-Coordinate is tracked");
  }, [coordinates.x]);
  const handleTracker = () => {
    setShowTracker((prev) => !prev);
  };
  return (
    <>
      <section className="container">
        <h2>Mouse Coordinates Tracker(From Parent)</h2>
        <p>
          X: {coordinates.x}, Y: {coordinates.y}
        </p>

        {showTracker && <MouseTracker setCoordinates={setCoordinates} />}

        <button onClick={handleTracker}>
          {showTracker ? "Remove Tracker" : "Show Tracker"}
        </button>
      </section>
    </>
  );
}

export default ParentContainer;
