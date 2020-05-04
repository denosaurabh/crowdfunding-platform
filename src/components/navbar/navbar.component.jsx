import React from "react";
import { Link } from "react-router-dom";

import "./navbar.styles.scss";

import { ReactComponent as AppLogo } from "./../../assets/svg/logo.svg";
import { ReactComponent as HomeSvg } from "./../../assets/svg/home.svg";
import { ReactComponent as ProposalsSvg } from "./../../assets/svg/proposals.svg";
import { ReactComponent as UniversitySvg } from "./../../assets/svg/university.svg";
import { ReactComponent as SettingsSvg } from "./../../assets/svg/settings.svg";

class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="navbar --leftside-grid-box">
        <Link to="/">
          <AppLogo />
        </Link>

        <ul className="navbar-ul">
          <Link to="/home">
            <li className="navbar-ul-li">
              <HomeSvg />
              <span className="navbar-ul-li-span">Home</span>
            </li>
          </Link>
          <li className="navbar-ul-li">
            <ProposalsSvg />
            <span className="navbar-ul-li-span">Proposals</span>
          </li>
          {localStorage.getItem("USER_UNIVERSITY") === "true" ? (
            <Link to="/myuniversity">
              <li className="navbar-ul-li">
                <UniversitySvg />
                <span className="navbar-ul-li-span">Your Party</span>
              </li>
            </Link>
          ) : null}

          <Link to="/settings">
            <li className="navbar-ul-li --most-bottom">
              <SettingsSvg />
              <span className="navbar-ul-li-span">Settings</span>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default NavBar;
