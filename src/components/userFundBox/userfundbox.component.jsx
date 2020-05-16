import React from 'react';

import './userfundbox.styles.scss';

import Button from '../button/button.component';

/*
    This is a Component for the Box of the Fund in the User Published Idea ( Recent Funds )
*/

const UserFundBox = () => (
  <div className="user-fund-box">
    <img
      src="/assets/img/person.png"
      alt="user"
      className="user-fund-box__img"
    />
    <h5 className="user-fund-box__name --maintext">Charles</h5>
    <span className="user-fund-box__work --subpara">Engineer</span>
    <p className="user-fund-box__fundamount --subpara">$30</p>

    <Button
      content="Send Thanks"
      display="simple-blue"
      addClass="user-fund-box__thanksButton"
      size="wide"
    />
  </div>
);

export default UserFundBox;
