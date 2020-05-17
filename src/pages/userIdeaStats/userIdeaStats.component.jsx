import React from 'react';

import './userIdeaStats.styles.scss';

import APIRequest from '../../utils/apirequest';

import { ReactComponent as LeftLightArrowSvg } from '../../assets/svg/leftlightarrow.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import Navbar from '../../components/navbar/navbar.component';
import Button from '../../components/button/button.component';
import UserFundBox from '../../components/userFundBox/userfundbox.component';

class UserIdeaStats extends React.Component {
  state = {};

  componentDidMount() {
    const { ideaId } = this.props.match.params;

    new APIRequest('get', `user/myIdeas/${ideaId}`)
      .request()
      .then((res) => this.setState({ idea: res.data.data }));

    new APIRequest('get', `fund/${ideaId}`)
      .request()
      .then((res) => this.setState({ ideaFunds: res.data.data }));
  }

  render() {
    return (
      <div className="user-idea-stats --grid-box-2">
        <Navbar />
        <div className="user-idea-stats-content --rightside-grid-box">
          {this.state.idea ? (
            <>
              <div className="user-idea-stats-content-header">
                <LeftLightArrowSvg
                  onClick={() => this.props.history.goBack()}
                />
                <h2 className="user-idea-stats-content-header__heading --maintext">
                  {this.state.idea.title}
                </h2>
                <Button
                  content="See Idea"
                  addClass="user-idea-stats-content-header__button"
                  display="simple-blue"
                  onClickHandler={() =>
                    this.props.history.push(`/idea/${this.state.idea._id}`)
                  }
                />
              </div>
              <p className="user-idea-stats-content__description --subpara --smallfont">
                {this.state.idea.description}
              </p>
              <h4 className="user-idea-stats-content__upvotes --subpara">
                {this.state.idea.upvotes}
                <span className="user-idea-stats-content__upvotes__span">
                  total upvotes
                </span>
              </h4>
              <div className="user-idea-stats-content-fund">
                <h4 className="user-idea-stats-content-fund__heading --maintext">
                  Fund Mission
                </h4>
                <h4 className="user-idea-stats-content-fund__fund --subpara">
                  ${this.state.idea.fundLimit}
                  <span className="user-idea-stats-content-fund__fund__span">
                    to be fund
                  </span>
                </h4>
                <h4 className="user-idea-stats-content-fund__fund --subpara">
                  {this.state.idea.fundPercent}%
                  <span className="user-idea-stats-content-fund__fund__span">
                    already funded
                  </span>
                </h4>
              </div>
              <div className="user-idea-stats-content-recentfund">
                <h4 className="user-idea-stats-content-recentfund__heading --maintext">
                  Recent Funds
                </h4>
                {this.state.ideaFunds ? (
                  this.state.ideaFunds.map((el, i, map) => (
                    <UserFundBox key={i} {...el} />
                  ))
                ) : (
                  <LoadingSvg />
                )}
              </div>
            </>
          ) : (
            <LoadingSvg />
          )}
        </div>
      </div>
    );
  }
}

export default UserIdeaStats;
