// ListCard Component
import React from "react";

function ListCard(props) {
  const { fullname, age, occupation } = props.data;
  const { onDelete, onEdit } = props;
  return (
    <>
      <section className="card">
        <h3>List Card</h3>
        <p>Name: {fullname}</p>
        <p>Age: {age}</p>
        <p>Occupation: {occupation}</p>
        <section className="btns">
          <button className="btn" onClick={onDelete}>
            Delete
          </button>
          <button className="btn" onClick={onEdit}>
            Edit
          </button>
        </section>
      </section>
    </>
  );
}

export default ListCard;
