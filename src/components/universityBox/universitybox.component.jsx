import React from "react";
import { withRouter } from "react-router-dom";

import "./universitybox.style.scss";

const UniversityBox = ({ _id, name, description, image, history }) => (
  <div
    className="university-box"
    onClick={() => history.push(`/university/${_id}`)}
  >
    <img
      src={`http://localhost:8000/images/university/${image}`}
      alt="university"
      className="university-box__img"
    />
    <h3 className="university-box__title --mainfont --maintext">{name}</h3>
    <p className="university-box__para --subpara">
      {description.length > 140
        ? `${description.slice(0, 140)}...`
        : description}
    </p>
  </div>
);

export default withRouter(UniversityBox);
