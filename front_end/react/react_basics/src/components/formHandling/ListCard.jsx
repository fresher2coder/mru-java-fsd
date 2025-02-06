// ListCard Component
import React from "react";

function ListCard(props) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
  const { fullname, age, occupation, id } = props.data;
=======
  const { fullname, age, occupation } = props.data;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
<<<<<<< HEAD
=======
  const { fullname, age, occupation } = props.data;
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
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
<<<<<<< HEAD
=======
          </button>
          <button className="btn" onClick={onEdit}>
            Edit
          </button>
>>>>>>> parent of c00ad33 (react basics: form handling curd without updated)
=======
>>>>>>> b7782c5b6edcaf74f7148c90609eb5624a412008
        </section>
      </section>
    </>
  );
}

export default ListCard;
