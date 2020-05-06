import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUserStartAsync } from '../../redux/userReducer/user.actions';

import './login.styles.scss';

import Button from '../../components/button/button.component';
import FieldInput from '../../components/fieldInput/fieldinput.component';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onSubmitClickHandler = this.onSubmitClickHandler.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmitClickHandler(e) {
    e.preventDefault();

    const { setCurrentUserStartAsync } = this.props;
    setCurrentUserStartAsync(this.state);
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitClickHandler}>
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserStartAsync: (data) => dispatch(setCurrentUserStartAsync(data, 'login')),
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
