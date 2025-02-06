// ListCard Component
import React from "react";

function ListCard(props) {
<<<<<<< HEAD
  const { fullname, age, occupation, id } = props.data;
=======
  const { fullname, age, occupation } = props.data;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
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
<<<<<<< HEAD
          <button
            className="btn"
            onClick={() => {
              onEdit(props.data);
            }}
          >
=======
          <button className="btn" onClick={onEdit}>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
            Edit
          </button>
        </section>
      </section>
    </>
  );
}

export default ListCard;
