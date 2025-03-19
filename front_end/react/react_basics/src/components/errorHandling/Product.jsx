import React from "react";

function Product({ name }) {
  if (!name) throw new Error("Product name is missing");
  return (
    <>
      <h1>{name}</h1>
    </>
  );
}

export default Product;
