import React from "react";

import "./loginpage.styles.scss";

import Login from "../../components/logIn/login.component";
import SignUp from "../../components/signup/signup.component";

class AuthPage extends React.Component {
  constructor() {
    super();

    this.state = {
      conatiner: "login"
    };

    this.onSignupLoginClick = this.onSignupLoginClick.bind(this);
  }

  onSignupLoginClick() {
    this.setState({
      conatiner: this.state.conatiner === "login" ? "signup" : "login",
    });
  }

  render() {
    return (
      <div className="auth-page">
        <div className="auth-page-container">
          {this.state.conatiner === "login" ? <Login /> : <SignUp />}
          <span
            className="auth-page-container__span --subpara"
            onClick={this.onSignupLoginClick}
          >
            {this.state.conatiner === "login" ? "signup" : "login"} Instead !
          </span>
        </div>
      </div>
    );
  }
}

export default AuthPage;
