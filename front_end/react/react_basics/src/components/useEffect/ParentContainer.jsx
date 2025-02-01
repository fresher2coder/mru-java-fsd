import React, { useState } from "react";
import MouseTracker from "./MouseTracker";

function ParentContainer() {
  const [showTracker, setShowTracker] = useState(true);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const handleTracker = () => {
    setShowTracker((prev) => !prev);
  };
  return (
    <>
      <section className="container">
        <h2>Mouse Tracker App(Parent Component)</h2>
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
