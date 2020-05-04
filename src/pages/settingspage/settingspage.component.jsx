import React from "react";
import ImageUploader from "react-images-upload";

import "./settingspage.styles.scss";

import APIRequest from "../../utils/apirequest";

import { ReactComponent as EditSvg } from "../../assets/svg/edit.svg";
import { ReactComponent as LogoutSvg } from "../../assets/svg/exit.svg";
import { ReactComponent as LoadingSvg } from "../../assets/svg/loading.svg";

import Navbar from "../../components/navbar/navbar.component";
import InputField from "../../components/fieldInput/fieldinput.component";
import Button from "../../components/button/button.component";

class SettingsPage extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onEditClick = this.onEditClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  }

  async componentDidMount() {
    const {
      data: {
        data: { me: user },
      },
    } = await new APIRequest("get", "user/me").request();

    this.setState({ user });
  }

  async onFormSubmit() {
    const form = new FormData();

    form.append("avatar", this.state.avatar);
    form.append("name", this.state.name || this.state.user.name);
    form.append("job", this.state.job || this.state.user.job);
    form.append("country", this.state.country || this.state.user.country);
    form.append("email", this.state.email || this.state.user.email);

    console.log(this.state);

    await new APIRequest("patch", "user/updateMe", form).request();

    this.setState({ updateProfile: false });

    const {
      data: {
        data: { me: user },
      },
    } = await new APIRequest("get", "user/me").request();

    this.setState({ user });
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

    this.props.history.push("/auth");
  }

  onInputChangeHandler(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
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
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
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
                {this.state.user ? (
                  <>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/users/${this.state.user.imageCover}`}
                      alt="user"
                      className="settings-page-content-bottom-box__img"
                    />
                    <h4 className="settings-page-content-bottom-box__name --maintext --mainfont">
                      {this.state.user.name}
                    </h4>
                    <span className="--subpara --smallfont">
                      {this.state.user.email}
                    </span>
                    <p className="settings-page-content-bottom-box__work --subpara --smallfont">
                      {this.state.user.job} in {this.state.user.country}
                    </p>
                    <span className="settings-page-content-bottom-box__joinedon --subpara --smallfont --light">
                      Joined On: {this.state.user.joinedOn || "April 2020"}
                    </span>
                  </>
                ) : (
                  <LoadingSvg />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsPage;
