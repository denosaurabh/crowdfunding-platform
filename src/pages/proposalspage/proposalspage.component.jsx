import React from "react";
import { connect } from "react-redux";

import APIRequest from "../../utils/apirequest";

import "./proposalspage.styles.scss";

import { ReactComponent as LoadingSvg } from "../../assets/svg/loading.svg";

import Navbar from "../../components/navbar/navbar.component";
import ProposalBox from "../../components/proposalbox/proposalbox.component";
import Sidebar from "../../components/sidebar/sidebar.component";

import { setCurrentError } from "../../redux/errorReducer/error.actions";

class ProposalsPage extends React.Component {
  constructor() {
    super();

    this.state = { message: "Hello World! YES :D" };
  }

  async componentDidMount() {
    const res = await new APIRequest(
      "get",
      "university/myUniversity",
      null,
      localStorage.getItem("USER_TOKEN")
    ).request(this);

    console.log(res);

    if (!res.data.message) {
      this.setState({ university: res.data.data.university });
    }

    this.setState({ message: res.data.message });
  }

  componentDidCatch() {
    console.log("Error Catched!");
  }

  render() {
    return (
      <div className="proposals-page --grid-box-3-wide">
        <Navbar />
        {this.state.university ? (
          <div className="proposals-page-content --center-content">
            <h2 className="proposals-page-content__heading --maintext">
              Proposals
            </h2>
            <div className="proposals-page-content-menu">
              <span className="proposals-page-content-menu__text --subpara">
                latest
              </span>
              <span className="proposals-page-content-menu__text --subpara">
                intrested
              </span>
            </div>
            <div className="proposal-page-content-box">
              {this.state.university.proposals.map((el, i) => (
                <ProposalBox
                  key={i}
                  universityId={this.state.university._id}
                  {...el}
                />
              ))}
            </div>
          </div>
        ) : (
          <LoadingSvg />
        )}
        {this.state.university ? (
          <Sidebar
            adminId={this.state.university.admin}
            members={this.state.university.members}
            universityId={this.state.university._id}
          />
        ) : (
          <LoadingSvg />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentError: (error) => dispatch(setCurrentError(error)),
});

export default connect(null, mapDispatchToProps)(ProposalsPage);
