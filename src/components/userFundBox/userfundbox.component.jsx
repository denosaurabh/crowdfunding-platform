import React from 'react';

import './userfundbox.styles.scss';

import Button from '../button/button.component';

/*
    This is a Component for the Box of the Fund in the User Published Idea ( Recent Funds )
*/

const UserFundBox = ({ name, email, job, img, amount }) => (
  <div className="user-fund-box">
    <img
      src={`${process.env.REACT_APP_API_URL}/images/users/${img}`}
      alt="user"
      className="user-fund-box__img"
    />
    <h5 className="user-fund-box__name --maintext">{name}</h5>
    <span className="user-fund-box__work --subpara">{job}</span>
    <p className="user-fund-box__fundamount --subpara">${amount}</p>

    <Button
      content="Send Thanks"
      display="simple-blue"
      addClass="user-fund-box__thanksButton"
      size="wide"
    />
  </div>
);

export default UserFundBox;
