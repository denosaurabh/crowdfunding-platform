import React from "react";
import axios from "axios";

import "./Ideaformpage.styles.scss";

import { ReactComponent as LeftLightArrowSvg } from "../../assets/svg/leftlightarrow.svg";

import InputField from "../../components/fieldInput/fieldinput.component";
import Button from "../../components/button/button.component";

class IdeaFormPage extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onInputChange = this.onInputChange.bind(this);
    this.onIdeaFormSubmit = this.onIdeaFormSubmit.bind(this);
  }

  onInputChange(e) {
    console.log("Something Changed !");

    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  onIdeaFormSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("USER_TOKEN");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/v1/api/idea`,
      data: {
        ...this.state,
        fundTiers: [
          this.state.tierOne,
          this.state.tierTwo,
          this.state.tierThree,
          this.state.tierFour,
        ],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
    });

    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="idea-form">
        <header className="idea-form-header">
          <LeftLightArrowSvg onClick={() => this.props.history.goBack()} />
          <h3 className="ideaform-header__heading --maintext">
            Publish your Idea
          </h3>
        </header>
        <div className="idea-form-content">
          <form
            className="idea-form-content-form"
            onSubmit={this.onIdeaFormSubmit}
          >
            <label htmlFor="intrest">Choose a Field</label>
            <select
              className="--subpara"
              id="intrest"
              name="field"
              value={this.state.field}
              onChange={this.onInputChange}
            >
              <option value="Physics">Physics</option>
              <option value="Medical">Medical</option>
              <option value="Engineering">Engineering</option>
              <option value="Automobile">Automobile</option>
            </select>
            <label htmlFor="title">Title of your idea</label>
            <InputField
              id="title"
              type="text"
              placeHolder="Title of your idea"
              onChangeHandler={this.onInputChange}
              name="title"
              value={this.state.title}
            />

            <label htmlFor="description">Description of your idea</label>
            <textarea
              id="description"
              placeholder="Write a Complete description of your idea"
              className="--subpara"
              onChange={this.onInputChange}
              name="description"
              value={this.state.description}
            />
            <label htmlFor="fundlimit">Fund Limit of your idea (in $USD)</label>
            <InputField
              id="fundlimit"
              type="number"
              placeHolder="Fund Limit of your idea"
              onChangeHandler={this.onInputChange}
              name="fundLimit"
              value={this.state.fundLimit}
            />

            <label htmlFor="fundlimit">Fund Tiers of your Idea</label>
            <InputField
              id="fundlimit"
              type="number"
              anotherClass="--green-border"
              placeHolder="fund tier 1 i.e. $1"
              onChangeHandler={this.onInputChange}
              name="tierOne"
              value={this.state.tierOne}
            />
            <InputField
              id="fundlimit"
              type="number"
              anotherClass="--blue-border"
              placeHolder="fund tier 1 i.e. $10"
              onChangeHandler={this.onInputChange}
              name="tierTwo"
              value={this.state.tierTwo}
            />
            <InputField
              id="fundlimit"
              type="number"
              anotherClass="--violet-border"
              placeHolder="fund tier 1 i.e. $50"
              onChangeHandler={this.onInputChange}
              name="tierThree"
              value={this.state.tierThree}
            />
            <InputField
              id="fundlimit"
              type="number"
              anotherClass="--pink-border"
              placeHolder="fund tier 1 i.e. $100"
              onChangeHandler={this.onInputChange}
              name="tierFour"
              value={this.state.tierFour}
            />

            <Button
              size="wide"
              addClass="submit-button"
              colorStyle="blue"
              type="submit"
              content="Submit Idea"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default IdeaFormPage;
