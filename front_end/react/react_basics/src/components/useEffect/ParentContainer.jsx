import React, { useState } from "react";
import { MouseTracker } from "./MouseTracker";

function ParentContainer() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showTracker, setShowTracker] = useState(true);

  return (
    <div className="container">
      <h2>Mouse Coordinates Tracker (From Parent)</h2>
      <p>
        X: {coordinates.x}, Y: {coordinates.y}
      </p>
      {showTracker && <MouseTracker setCoordinates={setCoordinates} />}
      <button className="button" onClick={() => setShowTracker(!showTracker)}>
        {showTracker ? "Remove Tracker" : "Show Tracker"}
      </button>
    </div>
  );
}

export default ParentContainer;
