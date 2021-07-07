import React from "react";

const MovieCard = (props) => {
  const { id, title } = props.detail;
  return (
    <div className="row py-3">
      <div className="col">
        <label className="form-label">Episode_Id:</label>
        {id}
        <br />
        <label className="form-label">Title:</label>
        {title}
      </div>
    </div>
  );
};

export default MovieCard;
