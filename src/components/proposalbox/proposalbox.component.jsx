import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import APIRequest from "../../utils/apirequest";

import "./proposalbox.styles.scss";

import { ReactComponent as UpvoteBorderBlueSvg } from "../../assets/svg/upvote-border-blue.svg";
import { ReactComponent as TickSvg } from "../../assets/svg/tick.svg";
import { ReactComponent as CutSvg } from "../../assets/svg/cut.svg";

import { setCurrentError } from "../../redux/errorReducer/error.actions";

class ProposalBox extends React.Component {
  onProposalAcceptClick = async () => {
    console.log(this.props.universityId);

    const res = await new APIRequest(
      "post",
      `proposal/${this.props._id}/accept`,
      {
        universityId: this.props.universityId,
      }
    ).request();

    console.log(res);
  };

  onProposalDeclineClick = async () => {
    const res = await new APIRequest(
      "post",
      `proposal/${this.props._id}/decline`,
      {
        universityId: this.props.universityId,
      }
    ).request();

    console.log(res);
  };

  render() {
    if (this.props.accepted) {
      return (
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
                  "Jan",
                  "Feb",
                  "Mar",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
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
      );
    } else {
      return (
        <div className="overlay-box">
          <div
            className="proposal-box"
            onClick={() =>
              this.props.history.push(
                `/myuniversity/proposal/${this.props._id}`
              )
            }
          >
            <h4 className="proposal-box__title --maintext">
              {this.props.title}
            </h4>
            <p className="proposal-box__description --subpara">
              {this.props.description.length > 300
                ? `${this.props.description.slice(0, 300)} ....`
                : this.props.description}
            </p>
            <div className="proposal-box-info">
              <span className="proposal-box-info__date --light --subpara">
                {`${new Date(this.props.uploadedOn).getDate()} ${
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
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
          <div className="overlay-box-buttons">
            <p
              className="overlay-box-buttons__accept --maintext --smallfont"
              onClick={this.onProposalAcceptClick}
            >
              <TickSvg />
              Accept
            </p>
            <p
              className="overlay-box-buttons__decline --maintext --smallfont"
              onClick={this.onProposalDeclineClick}
            >
              <CutSvg />
              Decline
            </p>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentError: (error) => dispatch(setCurrentError(error)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProposalBox));
