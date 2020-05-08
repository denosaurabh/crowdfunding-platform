import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import APIRequest from '../../utils/apirequest';

import './proposalbox.styles.scss';

import { ReactComponent as UpvoteBorderBlueSvg } from '../../assets/svg/upvote-border-blue.svg';
import { ReactComponent as TickSvg } from '../../assets/svg/tick.svg';
import { ReactComponent as CutSvg } from '../../assets/svg/cut.svg';

import { setCurrentError } from '../../redux/errorReducer/error.actions';

class ProposalBox extends React.Component {
  onProposalAcceptClick = async () => {
    console.log(this.props.universityId);

    const res = await new APIRequest(
      'post',
      `proposal/${this.props._id}/accept`,
      {
        universityId: this.props.universityId,
      }
    ).request();

    console.log(res);
  };

  onProposalDeclineClick = async () => {
    const res = await new APIRequest(
      'post',
      `proposal/${this.props._id}/decline`,
      {
        universityId: this.props.universityId,
      }
    ).request();

    console.log(res);
  };

  render() {
    return (
      <>
        <div
          className="proposal-box"
          onClick={() =>
            this.props.history.push(`/myuniversity/proposal/${this.props._id}`)
          }
        >
          <h4 className="proposal-box__title --maintext">{this.props.title}</h4>
          <p className="proposal-box__description --subpara">
            {this.props.description.length > 300
              ? `${this.props.description.slice(0, 300)} ....`
              : this.props.description}
          </p>
          <div className="proposal-box-info">
            <span className="proposal-box-info__date --light --subpara">
              {`${new Date(this.props.uploadedOn).getDate()} ${
                [
                  'Jan',
                  'Feb',
                  'Mar',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ][new Date(this.props.uploadedOn).getMonth()]
              } ${new Date(this.props.uploadedOn).getFullYear()}`}
            </span>
            <p className="proposal-box-info__upvotes --subpara">
              <UpvoteBorderBlueSvg /> {this.props.upvotes} upvotes
            </p>
            <p className="proposal-box-info__comments --subpara">
              {this.props.comments.length} comments
            </p>
          </div>
        </div>
        {!this.props.accepted ? (
          <div className="proposal-accepted">
            <p className="proposal-accepted-heading --maintext">
              This Proposal is not Accepted Yet!
            </p>
            <div className="proposal-accepted-buttons">
              <span className="proposal-accepted-buttons__accept --maintext --smallfont">Accept</span>
              <span className="proposal-accepted-buttons__decline --maintext --smallfont">Decline</span>

            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentError: (error) => dispatch(setCurrentError(error)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProposalBox));
