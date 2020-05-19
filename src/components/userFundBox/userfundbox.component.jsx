import React, { useState, useEffect } from 'react';

import './userfundbox.styles.scss';

import APIRequest from '../../utils/apirequest';

import Button from '../button/button.component';

/*
    This is a Component for the Box of the Fund in the User Published Idea ( Recent Funds )
*/

const UserFundBox = ({ name, email, job, img, amount, thanked, _id }) => {
  const [fundThanks, setFundThanks] = useState(thanked);

  console.log(thanked);

  useEffect(() => {
    return () => {};
  }, [fundThanks]);

  const onThanksClickHandler = () => {
    console.log('Clicked');

    new APIRequest('post', `fund/${_id}/thanks`).request().then((res) => {
      setFundThanks(true);
    });
  };

  return (
    <div className="user-fund-box">
      <img
        src={`${process.env.REACT_APP_API_URL}/images/users/${img}`}
        alt="user"
        className="user-fund-box__img"
      />
      <h5 className="user-fund-box__name --maintext">{name}</h5>
      <span className="user-fund-box__work --subpara">{job}</span>
      <p className="user-fund-box__fundamount --subpara">${amount}</p>

      {!fundThanks ? (
        <Button
          content="Send Thanks"
          display="simple-blue"
          addClass="user-fund-box__thanksButton"
          onClickHandler={onThanksClickHandler}
          addClass={fundThanks ? '--thanked' : ''}
          size="wide"
        />
      ) : (
        <h4 className="user-fund-box__thanksPara --subpara --smallfont">
          Already Thanked
        </h4>
      )}
    </div>
  );
};

export default UserFundBox;
