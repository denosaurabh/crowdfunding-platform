import React from "react";

import "./comment.styles.scss";

const Comment = ({
  byUser,
  byUserJob,
  description,
  uploadedOn,
  byUserImg,
}) => (
  <div className="comment">
    <img
      src={`${process.env.REACT_APP_API_URL}/images/users/${byUserImg}`}
      alt="user"
      className="comment__img"
    />
    <h6 className="comment__user --maintext">
      {byUser} <span className="comment__user__work">{byUserJob}</span>
    </h6>
    <span className="comment__date --subpara --light">
      {new Date(uploadedOn).toLocaleString()}
    </span>
    <p className="comment__description --subpara">{description}</p>
  </div>
);

export default Comment;
