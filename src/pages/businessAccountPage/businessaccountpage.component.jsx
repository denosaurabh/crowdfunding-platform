import React from "react";

import "./businessaccountpage.styles.scss";

import { ReactComponent as BusinessAccountPageSvg } from "../../assets/svg/business-account-page.svg";

class BusinessAccountPage extends React.Component {
  state = {
    url: `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://mariorossi-frontend.herokuapp.com/account/verify&client_id=ca_HCgEWVT2xtb5RB8xhL84GjlF26HKHAAU&suggested_capabilities[]=card_payments`,
  };

  render() {
    return (
      <div className="business-account">
        <BusinessAccountPageSvg />
        <div className="business-account-content">
          <h2 className="business-account-content__heading --maintext">
            Make Business Account
          </h2>
          <p className="business-account-content__description --subpara --smallfont">
            Account make you to unleash your dream ideas come to true. Make a
            make account to show your dream in world start to get funds from
            your Idea
          </p>
          <a
            className="business-account-content__href --maintext"
            href={this.state.url}
          >
            Make Account
          </a>
        </div>
      </div>
    );
  }
}

export default BusinessAccountPage;
