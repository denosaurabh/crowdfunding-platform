import React from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';

import './settingspage.styles.scss';

import APIRequest from '../../utils/apirequest';

import { selectUser } from '../../redux/userReducer/user.selector';
import {
  setCurrentUserNull,
  setCurrentUserStartAsync,
} from '../../redux/userReducer/user.actions';

import { ReactComponent as EditSvg } from '../../assets/svg/edit.svg';
import { ReactComponent as LogoutSvg } from '../../assets/svg/exit.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import Navbar from '../../components/navbar/navbar.component';
import InputField from '../../components/fieldInput/fieldinput.component';
import Button from '../../components/button/button.component';

class SettingsPage extends React.Component {
  constructor() {
    super();

    this.state = { accountButtonTextValue: 'Check Account' };

    this.onEditClick = this.onEditClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);

    this.onAccountClick = this.onAccountClick.bind(this);
  }

  onFormSubmit() {
    const { currentUser, setCurrentUserStartAsync } = this.props;

    const form = new FormData();

    form.append('avatar', this.state.avatar);
    form.append('name', this.state.name || currentUser.name);
    form.append('job', this.state.job || currentUser.job);
    form.append('country', this.state.country || currentUser.country);
    form.append('email', this.state.email || currentUser.email);

    setCurrentUserStartAsync(form);
  }

  onDrop(picture) {
    this.setState({
      avatar: picture[0],
    });
  }

  onEditClick() {
    this.setState({ updateProfile: !this.state.updateProfile });
  }

  onLogoutClick() {
    localStorage.clear();
    this.props.setCurrentUserToNull();

    this.props.history.push('/home');
  }

  onInputChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  // Get Account Info
  async onAccountClick() {
    const res = await new APIRequest('get', 'user/account').request();

    this.setState({
      accountLink: res.data.data.link,
      accountButtonTextValue: 'Go to link to see account',
    });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="settings-page --grid-box-2">
        <Navbar />
        <div className="settings-page-content --rightside-grid-box">
          <div className="settings-page-content-header">
            <EditSvg onClick={this.onEditClick} />
            <LogoutSvg onClick={this.onLogoutClick} />
          </div>
          {this.state.updateProfile ? (
            <>
              <h2 className="settings-page-content__heading --maintext">
                Update Profile
                <Button
                  size="small"
                  colorStyle="blue"
                  content="update"
                  onClickHandler={this.onFormSubmit}
                />
              </h2>
              <div className="settings-page-content-bottom --padding">
                <form className="--displaycolumn" onSubmit={this.onFormSubmit}>
                  <ImageUploader
                    className="settings-page-content-bottom__img-input"
                    withIcon={true}
                    buttonText="Choose image"
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                  />
                  <InputField
                    type="text"
                    placeHolder="Your name"
                    name="name"
                    value={this.state.name}
                    onChangeHandler={this.onInputChangeHandler}
                    withPreview={true}
                    singleImage={true}
                  />
                  <InputField
                    type="email"
                    placeHolder="email"
                    name="email"
                    value={this.state.email}
                    onChangeHandler={this.onInputChangeHandler}
                  />
                  <InputField
                    type="text"
                    placeHolder="Job"
                    name="job"
                    value={this.state.job}
                    onChangeHandler={this.onInputChangeHandler}
                  />
                  <InputField
                    type="country"
                    placeHolder="country"
                    name="country"
                    value={this.state.country}
                    onChangeHandler={this.onInputChangeHandler}
                  />
                </form>
              </div>
            </>
          ) : (
            <div className="settings-page-content-bottom">
              <div className="settings-page-content-bottom-box">
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/users/${currentUser.imageCover}`}
                  alt="user"
                  className="settings-page-content-bottom-box__img"
                />
                <h4 className="settings-page-content-bottom-box__name --maintext --mainfont">
                  {currentUser.name}
                </h4>
                <span className="--subpara --smallfont">
                  {currentUser.email}
                </span>
                <p className="settings-page-content-bottom-box__work --subpara --smallfont">
                  {currentUser.job} in {currentUser.country}
                </p>
                <span className="settings-page-content-bottom-box__joinedon --subpara --smallfont --light">
                  Joined On: {currentUser.joinedOn}
                </span>
                {currentUser.accountVerified ? (
                  <a
                    className="settings-page-content-bottom-box__account_button --maintext"
                    onClick={this.onAccountClick}
                    href={this.state.accountLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {this.state.accountButtonTextValue}
                  </a>
                ) : null}
                {this.state.accountLink ? (
                  <span className="settings-page-content-bottom-box__account_span --subpara">
                    This is for Security purpose*
                  </span>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserToNull: () => dispatch(setCurrentUserNull()),
  setCurrentUserStartAsync: (data) =>
    dispatch(setCurrentUserStartAsync(data, 'updateMe', 'patch')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
