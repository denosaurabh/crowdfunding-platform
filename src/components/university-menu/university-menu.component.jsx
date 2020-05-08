import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import APIRequest from '../../utils/apirequest';

import './university-menu.styles.scss';

import {
  toggleUniversitySettings,
  removeUniversityMember,
} from '../../redux/UserUniversityReducer/university.action';
import { selectUserUniversity } from '../../redux/UserUniversityReducer/university.selectors';
import { selectUserId } from '../../redux/userReducer/user.selector';

import { ReactComponent as UniversitySettingsSvg } from '../../assets/svg/settings.svg';
import { ReactComponent as SendSvg } from '../../assets/svg/send.svg';
import { ReactComponent as CutLightSvg } from '../../assets/svg/cut-light.svg';

import PopupMenu from '../popupMenu/popup-menu.component';
import InputField from '../fieldInput/fieldinput.component';

class UniversityMenu extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.onMemberRemoveClick = this.onMemberRemoveClick.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  async onEmailSubmit() {
    const res = await new APIRequest(
      'post',
      `university/${this.props.universityId}/invite`,
      { userEmail: this.state.userEmail }
    ).request();

    this.setState({ userEmail: '' });
  }

  async onMemberRemoveClick(memberId) {
    const {
      university: { _id },
      removeUniversityMember,
    } = this.props;

    new APIRequest('post', `university/${_id}/member/${memberId}/remove`)
      .request()
      .then(() => {
        removeUniversityMember(memberId);
      });
  }

  onEmailChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { toggleUniversitySettings, university } = this.props;

    return (
      <div className="university-menu">
        <UniversitySettingsSvg onClick={() => toggleUniversitySettings()} />
        <PopupMenu width="40%" height="85%">
          General Settings
          <div className="university-menu-invite-member">
            <h5 className="--maintext">Invite Member</h5>
            <InputField
              type="email"
              name="userEmail"
              value={this.state.userEmail}
              style={{ width: '80%' }}
              onChange={this.onEmailChange}
              placeHolder="Enter friend Email"
              required
            />
            <SendSvg onClick={this.onEmailSubmit} />
          </div>
          <div className="university-menu-all-members">
            <h5 className="--maintext">All Members</h5>
            {university.members.map((member) => (
              <div className="university-menu-all-members-box">
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/users/${member.imageCover}`}
                  alt="user"
                  className="university-menu-all-members-box__img"
                />
                <p className="university-menu-all-members-box__name">
                  {member.name}
                </p>
                <CutLightSvg
                  onClick={() => this.onMemberRemoveClick(member._id)}
                />
              </div>
            ))}
          </div>
        </PopupMenu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleUniversitySettings: () => dispatch(toggleUniversitySettings()),
  removeUniversityMember: (memberId) =>
    dispatch(removeUniversityMember(memberId)),
});

const mapStateToProps = createStructuredSelector({
  university: selectUserUniversity,
  currentUserId: selectUserId,
});

export default connect(mapStateToProps, mapDispatchToProps)(UniversityMenu);
