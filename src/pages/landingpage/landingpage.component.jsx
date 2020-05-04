import React from "react";

import "./landingpage.styles.scss";

import Button from "../../components/button/button.component";

import { ReactComponent as AppLogoSvg } from "../../assets/svg/logo.svg";
import { ReactComponent as RocketIllustratorSvg } from "../../assets/svg/rocket.svg";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="landing-page">
        <div className="landing-page-header">
          <span className="landing-page-logo">
            <AppLogoSvg />
          </span>
          <ul className="landing-page-ul">
            <li
              className="landing-page-ul__li --light"
              onClick={() => this.props.history.push("/home")}
            >
              Browse ideas
            </li>
            <li
              className="landing-page-ul__li --light"
              onClick={() => this.props.history.push("/publish")}
            >
              have a project ?
            </li>
            <li
              className="landing-page-ul__li --light"
              onClick={() => this.props.history.push("/auth")}
            >
              Sign up
            </li>
          </ul>
        </div>
        <div className="landing-page-content">
          <div className="landing-page-content-left">
            <div className="landing-page-content-left-box">
              <h1 className="landing-page-content-left-box__heading --maintext">
                Fund Great Ideas
              </h1>
              <p className="landing-page-content-left-box__description --subpara">
                An effort to fund and support people's great Ideas and Projects
              </p>
              <Button
                colorStyle="blue"
                size="wide"
                content="See all Ideas"
                onClickHandler={() => this.props.history.push("/home")}
              />
              <span
                className="landing-page-content-left-box__span --subpara --light"
                onClick={() => this.props.history.push("/publish")}
              >
                have a Idea ?
              </span>
            </div>
          </div>
          <div className="landing-page-content-right">
            <RocketIllustratorSvg />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
