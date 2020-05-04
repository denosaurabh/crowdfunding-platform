import React from "react";

import "./memberbox.styles.scss";

const MemberBox = ({ name, imageCover, job, isAdmin }) => (
  <div className="member-box">
    <img
      src={`http://localhost:8000/images/users/${imageCover}`}
      alt=""
      className="member-box__img"
    />
    <div className="member-box-data">
      <h6 className="member-box-data__name --maintext">
        {name}
        {isAdmin ? (
          <span className="member-box-data__name__admin --subpara --smallfont">
            Admin
          </span>
        ) : null}
      </h6>
      <p className="member-box-data__work --subpara --light">{job}</p>
    </div>
  </div>
);

export default MemberBox;
