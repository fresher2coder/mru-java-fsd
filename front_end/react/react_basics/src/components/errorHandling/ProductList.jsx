import React from "react";
import Product from "./Product";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ErrorFallBack";

function ProductList() {
  const handleErrorReset = () => {
    console.log("Error boundary reset!");
  };

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallBack}
        onReset={handleErrorReset}
      >
        <Product name="Product A" />
        <Product name="Product B" />
        <Product />
      </ErrorBoundary>
    </>
  );
}

export default ProductList;
