import React from "react";
import { withRouter } from "react-router-dom";

import "./ideabox.styles.scss";

import { ReactComponent as SupportSvg } from "../../assets/svg/support.svg";

import { ReactComponent as UpvoteBorderSvg } from "../../assets/svg/upvote.svg";
import { ReactComponent as UpvoteFillSvg } from "../../assets/svg/upvote-fill.svg";

import { ReactComponent as RightarrowSvg } from "../../assets/svg/rightarrow.svg";

const IdeaBox = ({
  title,
  description,
  _id,
  uploadedBy,
  upvotes,
  fundPercent,
  history,
  alreadyUpvoted,
}) => (
  <div className="idea-box" onClick={(_) => history.push(`/idea/${_id}`)}>
    <div className="idea-box-content">
      <h4 className="idea-box-content__heading --maintext">
        {title.length > 17 ? `${title.slice(0, 17)} ...` : title}
      </h4>
      <p className="idea-box-content__paragraph --subpara">
        {description.length > 50
          ? `${description.slice(0, 50)} ...`
          : description}
      </p>
      <span className="idea-box-content__by --subpara">by {uploadedBy}</span>
      <span className="idea-box-content__data --subpara">
        {upvotes ? upvotes : 0} upvotes
      </span>
      <span className="idea-box-content__data --subpara">
        {fundPercent ? fundPercent : "0%"} fund accomlished
      </span>

      <div className="idea-box-content-icons-box">
        <SupportSvg />
        {alreadyUpvoted ? <UpvoteFillSvg /> : <UpvoteBorderSvg />}
      </div>
    </div>
  </div>
);

export default withRouter(IdeaBox);
