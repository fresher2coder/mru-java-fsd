import React from "react";

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div>
      <h4>Error: {error.message}</h4>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default ErrorFallBack;
