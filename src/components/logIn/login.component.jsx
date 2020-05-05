import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./login.styles.scss";

import Button from "../../components/button/button.component";
import FieldInput from "../../components/fieldInput/fieldinput.component";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onSubmitClickHandler = this.onSubmitClickHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmitClickHandler(e) {
    e.preventDefault();

    console.log(this.state);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/v1/api/user/login`,
      data: this.state,
    }).then((res) => {
      const { token } = res.data;
      console.log(res.data);

      localStorage.clear();
      localStorage.setItem("USER_TOKEN", token);
      localStorage.setItem("USER_ID", res.data.data.user._id);
      localStorage.setItem(
        "USER_UNIVERSITY",
        res.data.data.user.university ? "true" : "false"
      );
      localStorage.setItem(
        "ACCOUNT_VERIFIED",
        res.data.data.user.accountVerified
      );

      this.props.history.push("/home");

      console.log(res);
    });
  }

  onInputChange(e) {
    console.log("Something Changed !");

    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form action="">
        <div className="login-page-box">
          <h3 className="login-page-box__heading --maintext">
            Login on ( Idea App )
          </h3>
          <FieldInput
            type="email"
            name="email"
            value={this.state.email}
            anotherClass="login-page-box__email"
            placeHolder="email"
            onChangeHandler={this.onInputChange}
          />
          <FieldInput
            type="password"
            name="password"
            value={this.state.password}
            anotherClass="login-page-box__password"
            placeHolder="password"
            onChangeHandler={this.onInputChange}
          />
          <Button
            addClass="login-page-box__button"
            colorStyle="blue"
            size="small"
            type="submit"
            content="Login"
            onClickHandler={this.onSubmitClickHandler}
          />
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
