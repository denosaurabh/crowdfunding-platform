import React from 'react';

import APIRequest from '../../utils/apirequest';

import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import './accountverify.styles.scss';

class AccountVerify extends React.Component {
  state = {};

  async componentDidMount() {
    console.log(this.props.location.search);
    const query = this.props.location.search;

    APIRequest('patch', `user/verify/account${query}`)
      .request()
      .then((res) => {
        if (res.data.status === 'success') {
          this.props.history.push('/home');
        }
      })
      .catch((_) => {});
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
