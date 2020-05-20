import React from 'react';
import { withRouter } from 'react-router-dom';

import './userIdeaBox.styles.scss';

const UserIdeaBox = ({
  title,
  description,
  uploadedOn,
  history,
  _id,
  type,
}) => (
  <div
    className="user-idea-box"
    onClick={() =>
      type !== 'proposal'
        ? history.push(`/yourIdeas/${_id}`)
        : history.push(`/yourProposals/${_id}`)
    }
  >
    <div className="user-idea-box__title --maintext">{title}</div>
    <div className="user-idea-box__description --subpara --smallfont">
      {description.length > 200
        ? `${description.slice(0, 200)}....`
        : description}
    </div>
    <span className="user-idea-box__date --subpara --light">
      {new Date(uploadedOn).toLocaleString()}
    </span>
  </div>
);

export default withRouter(UserIdeaBox);
