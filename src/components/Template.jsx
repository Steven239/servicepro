import React from "react";
import Placeholder from "../Placeholder-template.jpeg";

function Template(props) {
  const aBook = props.bookData;

  if (aBook.year === null) {
    aBook.year = "";
  }

  if (aBook.isbn === null) {
    aBook.isbn = "Not available";
  }

  return (
    <div className="row row-cols-1 row-cols-md-1 g-4">
      <div className="col">
        <div className="card h-100">
          <img src={Placeholder} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{aBook.title}</h5>
            <p className="card-text">{`${aBook.author}, ${aBook.year}`}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">{`ISBN: ${aBook.isbn}`}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
