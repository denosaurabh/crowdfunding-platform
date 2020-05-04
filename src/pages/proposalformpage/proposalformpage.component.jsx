import React from "react";
import APIRequest from "../../utils/apirequest";

import "./proposalformpage.styles.scss";

import { ReactComponent as LeftLightArrowSvg } from "../../assets/svg/leftlightarrow.svg";

import InputField from "../../components/fieldInput/fieldinput.component";
import Button from "../../components/button/button.component";

class ProposalFormPage extends React.Component {
  constructor() {
    super();

    this.state = { field: "Physics" };

    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const { universityid: university } = this.props.match.params;
    this.setState({ university });
  }

  onInputChangeHandler(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  async onFormSubmit(e) {
    e.preventDefault();

    const data = await new APIRequest("post", "proposal", this.state).request();

    console.log(data);

    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="proposal-form">
        <header className="proposal-form-header">
          <LeftLightArrowSvg onClick={() => this.props.history.goBack()} />
          <h3 className="proposalform-header__heading --maintext">
            Publish a Proposal
          </h3>
        </header>
        <div className="proposal-form-content">
          <form
            className="proposal-form-content-form"
            onSubmit={this.onFormSubmit}
          >
            <label htmlFor="intrest">Choose a Field</label>
            <select
              className="--subpara"
              id="intrest"
              name="field"
              value={this.state.field}
              onChange={this.onInputChangeHandler}
              required
            >
              <option value="Physics">Physics</option>
              <option value="Medical">Medical</option>
              <option value="Engineering">Engineering</option>
              <option value="Automobile">Automobile</option>
            </select>
            <label htmlFor="title">Title of your proposal</label>
            <InputField
              id="title"
              style={{ backgroundColor: "#F6F6F6", padding: "2%" }}
              type="text"
              maginLeft="0"
              placeHolder="Title of your proposal"
              name="title"
              value={this.state.title}
              onChange={this.onInputChangeHandler}
              required
            />

            <label htmlFor="description">Description of your proposal</label>
            <textarea
              id="description"
              placeholder="Write a Complete description of your proposal"
              className="--subpara"
              name="description"
              value={this.state.description}
              onChange={this.onInputChangeHandler}
              required
            />
            <Button
              size="wide"
              addClass="proposal-form-content-form__button"
              colorStyle="blue"
              type="submit"
              content="Submit Proposal"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ProposalFormPage;
