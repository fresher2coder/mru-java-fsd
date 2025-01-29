import React from "react";

function Container(props) {
  const { children, title } = props;
  return (
    <>
      <section className="card">
        <h1>{title}</h1>
        {children}
      </section>
    </>
  );
}

export default Container;
