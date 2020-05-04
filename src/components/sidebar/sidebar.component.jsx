import React from "react";

import "./sidebar.styles.scss";

import APIRequest from "../../utils/apirequest";

import { ReactComponent as InviteUserSvg } from "../../assets/svg/invite-user.svg";
import { ReactComponent as SendSvg } from "../../assets/svg/send.svg";
import { ReactComponent as LoadingSvg } from "../../assets/svg/loading.svg";

import MemberBox from "../memberbox/memberbox.component";
import InputField from "../fieldInput/fieldinput.component";

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = { showEmailBox: false };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onEmailSubmit = this.onEmailSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.members) {
      this.setState({ members: this.props.members });
    }
  }

  componentWillUnmount() {}

  async onEmailSubmit() {
    console.log(this.props.universityId)
    
    const res = await new APIRequest(
      "post",
      `university/${this.props.universityId}/invite`,
      { userEmail: this.state.userEmail }
    ).request();

    console.log(res);

    this.setState({ userEmail: "" });
  }

  onEmailChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="sidebar --sidebar">
        <h4 className="sidebar__heading --maintext">
          {this.state.members ? this.state.members.length : "-"} Members
          <InviteUserSvg
            onClick={() =>
              this.setState({ showEmailBox: !this.state.showEmailBox })
            }
          />
        </h4>
        <form
          style={{
            display: this.state.showEmailBox ? "block" : "none",
            width: "100%",
          }}
          onSubmit={this.onEmailSubmit}
        >
          <InputField
            type="email"
            name="userEmail"
            value={this.state.userEmail}
            style={{ width: "80%" }}
            onChange={this.onEmailChange}
            placeHolder="Enter friend Email"
            required
          />
          <SendSvg onClick={this.onEmailSubmit} />
        </form>

        <div className="sidebar-content">
          {this.state.members ? (
            this.state.members.map((el, i) => {
              if (this.props.adminId === el._id) {
                return <MemberBox key={i} {...el} isAdmin={true} />;
              }

              return <MemberBox key={i} {...el} />;
            })
          ) : (
            <LoadingSvg />
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
