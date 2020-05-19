import React from 'react';
import { connect } from 'react-redux';

import APIRequest from '../../utils/apirequest';

import { setCurrentUser } from '../../redux/userReducer/user.actions';

import './userverify.styles.scss';

class UserVerify extends React.Component {
  state = {
    status: 'Verifying....',
  };

  componentDidMount() {
    const { token } = this.props.match.params;

    new APIRequest('patch', `user/verify/user/${token}`)
      .request()
      .then((res) => {
        const { setCurrentUser } = this.props;
        // this.setState({ status: 'Successfully verified!' });

        setCurrentUser(res.data.data.user);
        if (res.data.data.token) {
          localStorage.setItem('USER_TOKEN', res.data.data.token);
        }

        this.props.history.push('/home');
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/home');
      });
  }

  render() {
    return (
      <div className="user-verify">
        <h1 className="user-verify__heading --maintext">{this.state.status}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(UserVerify);
