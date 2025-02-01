import React, { useEffect } from "react";

export function MouseTracker({ setCoordinates }) {
  useEffect(() => {
    console.log("UseEffect: Always");
  });

  useEffect(() => {
    // Mouse move event handler
    const handleMouseMove = (event) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
    };

    // Mounting: Attach event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function for unmounting
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Dependency array includes setCoordinates

  return (
    <div className="tracker-card">
      <h3>Mouse Tracker Active</h3>
      <p>Move your mouse to track coordinates!</p>
    </div>
  );
}
