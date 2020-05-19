import React from 'react';

import './verifybanner.styles.scss';

const VerifyBanner = ({ currentUser }) => {
  console.log(currentUser);

  if (currentUser && !currentUser.userVerified) {
    return (
      <p className="verify-banner --maintext">
        Please Check your Email to verify your Account!
      </p>
    );
  } else return null;
};

export default VerifyBanner;
