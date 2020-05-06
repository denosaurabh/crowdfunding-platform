import React from "react";

import APIRequest from "../../utils/apirequest";

import "./projectspage.styles.scss";

import { ReactComponent as SearchSvg } from "../../assets/svg/search.svg";
import { ReactComponent as LoadingSvg } from "../../assets/svg/loading.svg";

import NavBar from "../../components/navbar/navbar.component";

import InputField from "../../components/fieldInput/fieldinput.component";
import FieldInput from "../../components/fieldInput/fieldinput.component";

import IdeaCard from "../../components/ideabox/ideabox.component";
import UniversityCard from "../../components/universityBox/universitybox.component";

class ProjectsPage extends React.Component {
  constructor() {
    super();

    this.state = { filter: "", filterField: [], searchtype: "idea", page: 1 };

    this.onIdeaFieldClickHandler = this.onIdeaFieldClickHandler.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    this.onIdeasScroll = this.onIdeasScroll.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.searchtype);
  }

  // get Data
  async getData(type) {
    this.setState({ data: null, filtredData: null });

    const {
      data: {
        data: { data },
      },
    } = await new APIRequest("get", `${type}?page=1&limit=20`, null).request();

    if (type === "idea") {
      const userId = localStorage.getItem("USER_ID");

      if (userId) {
        data.forEach((el) => {
          const isUpvoted = el.upvotesBy.includes(userId) ? true : false;

          el.alreadyUpvoted = isUpvoted;
        });
      }
    }

    this.setState({ data, filtredData: data });
  }

  // Browse Search Field Handler
  filterChangeHandler(e) {
    const { value } = e.target;

    this.setState({ filter: value });

    if (value.length === 0) {
      this.setState({ filtredData: null });
    }

    const title = this.state.searchtype === "idea" ? "title" : "name";

    // Filtering Data in Fields
    let filtredData = this.state.data.filter((el) => {
      return this.state.filterField.includes(el.field);
    });

    filtredData = filtredData.filter((el) => {
      return el[title].toLowerCase().includes(value.trim().toLowerCase());
    });

    this.setState({ filtredData });
  }

  // Ideas Field Handler
  onIdeaFieldClickHandler(e) {
    let fields = this.state.filterField;

    const { name } = e.target.dataset;

    e.target.classList.toggle("--active");

    // Updating State for Fields
    if (this.state.filterField.includes(name)) {
      let filterField = this.state.filterField;

      filterField = filterField.filter((el) => el !== name);
      fields = filterField;

      this.setState({ filterField });
    } else {
      fields.push(name);

      this.setState({ filterField: fields });
    }

    // Filtering Data in Fields
    let filtredData = this.state.data.filter((el) => {
      return fields.includes(el.field);
    });

    this.setState({ filtredData });

    if (fields.length === 0) {
      // displaying All Data
      const { data } = this.state;
      this.setState({ filtredData: data });
      console.log(this.state);
    }
  }

  // On Input Change Handler
  onInputChangeHandler(e) {
    const { name, value } = e.target;
    console.log(value, "SEARCH TYPE");

    this.setState({ [name]: value });

    if (value === "idea") {
      this.getData("idea");
    } else if (value === "university") {
      this.getData("university");
    }
  }

  // Implementing Pagination
  async onIdeasScroll(e) {
    console.log(
      e.target.scrollHeight,
      e.target.scrollTop,
      e.target.clientHeight,
      e.target.scrollHeight - e.target.scrollTop
    );

    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;

    if (bottom) {
      console.log("At Bottom!");

      const nextStatePage = this.state.page + 1;

      const {
        data: {
          data: { data },
        },
      } = await new APIRequest(
        "get",
        `idea?page=${nextStatePage}&limit=20`,
        null
      ).request();

      if (data || data !== []) {
        let stateData = this.state.data;
        stateData.push(...data);

        console.log(stateData);

        this.setState({
          data: stateData,
          filteredData: stateData,
          page: nextStatePage,
        });
      }
    }
  }

  render() {
    return (
      <div className="projects-page --grid-box-2">
        <NavBar />
        <div
          className="projects-page-content --rightside-grid-box"
          onScroll={this.onIdeasScroll}
        >
          <div className="projects-page-content-header">
            <SearchSvg />
            <InputField
              type="text"
              placeHolder={`browse ${
                this.state.searchtype === "idea" ? "ideas" : "universities"
              }`}
              value={this.state.filter}
              onChangeHandler={this.filterChangeHandler}
            />
          </div>
          <div className="projects-page-content-subheader">
            <h4 className="projects-page-content-subheader__heading --maintext">
              Categories
            </h4>
            <div className="projects-page-content-subheader-content">
              <ul className="projects-page-content-subheader-content-ul">
                {[
                  "medical",
                  "Physics",
                  "technology",
                  "dance",
                  "art",
                  "music",
                  "fashion",
                ].map((el, i) => (
                  <li
                    className="projects-page-content-subheader-content-ul__li --subpara"
                    key={i}
                    onClick={this.onIdeaFieldClickHandler}
                    data-name={el}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <div className="projects-page-content-subheader-dropdown">
              <span className="--maintext --smallfont">Filter</span>
              <div className="projects-page-content-subheader-dropdown-content">
                <div className="--maintext">
                  <form action="">
                    <label className="container --smallfont">
                      Ideas
                      <FieldInput
                        type="radio"
                        name="searchtype"
                        value="idea"
                        onChangeHandler={this.onInputChangeHandler}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="container --smallfont">
                      University
                      <FieldInput
                        type="radio"
                        name="searchtype"
                        value="university"
                        onChangeHandler={this.onInputChangeHandler}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="projects-page-content-box">
            {this.state.filtredData ? (
              this.state.filtredData.map((el, i) => {
                if (this.state.searchtype === "idea") {
                  return <IdeaCard key={i} {...el} />;
                } else if (this.state.searchtype === "university") {
                  return <UniversityCard key={i} {...el} />;
                } else {
                  return null
                }
              })
            ) : (
              <LoadingSvg />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectsPage;
