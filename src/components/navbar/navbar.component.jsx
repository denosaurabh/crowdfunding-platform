import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectUser } from '../../redux/userReducer/user.selector';

import './navbar.styles.scss';

import { ReactComponent as AppLogo } from './../../assets/svg/logo.svg';
import { ReactComponent as HomeSvg } from './../../assets/svg/home.svg';
import { ReactComponent as ProposalsSvg } from './../../assets/svg/proposals.svg';
import { ReactComponent as UniversitySvg } from './../../assets/svg/university.svg';
import { ReactComponent as SettingsSvg } from './../../assets/svg/settings.svg';
import { ReactComponent as LoginSvg } from './../../assets/svg/login.svg';

class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="navbar --leftside-grid-box">
        <Link to="/">
          <AppLogo />
        </Link>

        <ul className="navbar-ul">
          <Link to="/home">
            <li className="navbar-ul-li">
              <HomeSvg />
            </li>
          </Link>
          <li className="navbar-ul-li">
            <Link to="/yourIdeas">
              <ProposalsSvg />
            </Link>
          </li>
          {currentUser?.university ? (
            <Link to="/myuniversity">
              <li className="navbar-ul-li">
                <UniversitySvg />
              </li>
            </Link>
          ) : null}

          {currentUser ? (
            <Link to="/settings">
              <li className="navbar-ul-li --most-bottom">
                <SettingsSvg />
              </li>
            </Link>
          ) : (
            <Link to="/auth">
              <li className="navbar-ul-li --most-bottom">
                <LoginSvg />
              </li>
            </Link>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectUser(state),
});

export default connect(mapStateToProps)(NavBar);

/*

  JUNK

  
                <span className="navbar-ul-li-span">Home</span>

            <span className="navbar-ul-li-span">Proposals</span>

                <span className="navbar-ul-li-span">Your Party</span>

              <span className="navbar-ul-li-span">Settings</span>


*/
