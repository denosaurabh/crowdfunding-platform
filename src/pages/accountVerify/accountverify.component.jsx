import React from "react";

import APIRequest from "../../utils/apirequest";

import { ReactComponent as LoadingSvg } from "../../assets/svg/loading.svg";

import "./accountverify.styles.scss";

class AccountVerify extends React.Component {
  state = {};

  async componentDidMount() {
    const authCode = this.props.location.query.code;

    const res = await new APIRequest("patch", "user/verify/account", {
      code: authCode,
    }).request()

    if (res.data.status === "success") {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="account-verify">
        <h3 className="--maintext">Please, Hold on for a moment....</h3>
        <LoadingSvg />
      </div>
    );
  }
}

export default AccountVerify;