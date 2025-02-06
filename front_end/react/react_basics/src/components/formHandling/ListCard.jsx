// ListCard Component
import React from "react";

function ListCard(props) {
  const { fullname, age, occupation, id } = props.data;
  const { onDelete } = props;
  return (
    <>
      <section className="card">
        <h3>List Card</h3>
        <p>Name: {fullname}</p>
        <p>Age: {age}</p>
        <p>Occupation: {occupation}</p>
        <section className="btns">
          <button
            className="btn"
            onClick={() => {
              onDelete(id);
            }}
          >
            Delete
          </button>
          <button className="btn">Edit</button>
        </section>
      </section>
    </>
  );
}

export default ListCard;
