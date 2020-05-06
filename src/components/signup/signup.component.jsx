import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUserStartAsync } from '../../redux/userReducer/user.actions';

import './signup.styles.scss';

import Button from '../../components/button/button.component';
import FieldInput from '../../components/fieldInput/fieldinput.component';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  async onSignUpSubmit(e) {
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
      <div className="signup-box">
        <h3 className="signup-box__heading --maintext">SignUp into (App)</h3>
        <form onSubmit={this.onSignUpSubmit}>
          <FieldInput
            type="text"
            name="name"
            value={this.state.name}
            placeHolder="name"
            onChangeHandler={this.onInputChange}
            required
          />
          <FieldInput
            type="number"
            name="age"
            value={this.state.age}
            placeHolder="Your age"
            onChangeHandler={this.onInputChange}
            required
          />
          <FieldInput
            type="country"
            name="country"
            value={this.state.country}
            placeHolder="country"
            onChangeHandler={this.onInputChange}
            required
          />

          <FieldInput
            type="text"
            name="gender"
            value={this.state.gender}
            placeHolder="gender"
            onChangeHandler={this.onInputChange}
            required
          />
          <FieldInput
            type="text"
            name="job"
            value={this.state.job}
            placeHolder="Your Hobby or Job"
            onChangeHandler={this.onInputChange}
            required
          />

          <FieldInput
            type="email"
            name="email"
            value={this.state.email}
            placeHolder="email"
            onChangeHandler={this.onInputChange}
            required
          />
          <FieldInput
            type="password"
            name="password"
            value={this.state.password}
            placeHolder="password"
            onChangeHandler={this.onInputChange}
            required
          />
          <FieldInput
            type="password"
            name="passwordConfirm"
            placeHolder="confirm password"
            value={this.state.passwordConfirm}
            onChangeHandler={this.onInputChange}
            required
          />

          <Button
            addClass="signup-box__button"
            colorStyle="pink"
            size="small"
            type="submit"
            content="SignUp"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserStartAsync: (data) => dispatch(setCurrentUserStartAsync(data, 'signup')),
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
