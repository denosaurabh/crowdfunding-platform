import React from 'react';

import './sidebar.styles.scss';

import APIRequest from '../../utils/apirequest';

import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import MemberBox from '../memberbox/memberbox.component';
import InputField from '../fieldInput/fieldinput.component';
import withSpinner from '../withSpinner/withSpinner.component';
import UniversityMenu from '../university-menu/university-menu.component';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    if (this.props.members) {
      this.setState({ members: this.props.members });
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="sidebar --sidebar">
        <h4 className="sidebar__heading --maintext">
          {this.state.members ? this.state.members.length : '-'} Members
          <UniversityMenu />
        </h4>
        <form
          style={{
            display: this.state.showEmailBox ? 'block' : 'none',
            width: '100%',
          }}
          onSubmit={this.onEmailSubmit}
        ></form>

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

export default withSpinner(Sidebar);

/*

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

*/
