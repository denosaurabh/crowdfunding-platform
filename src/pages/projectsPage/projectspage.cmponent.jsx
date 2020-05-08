import React from 'react';

import './projectspage.styles.scss';

import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import NavBar from '../../components/navbar/navbar.component';

import InputField from '../../components/fieldInput/fieldinput.component';
import FieldInput from '../../components/fieldInput/fieldinput.component';

import IdeaCard from '../../components/ideabox/ideabox.component';
import UniversityCard from '../../components/universityBox/universitybox.component';

class ProjectsPage extends React.Component {
  constructor() {
    super();

    this.state = { searchInputFieldValue: '' };

    this.onSearchCategoryClickHandler = this.onSearchCategoryClickHandler.bind(
      this
    );
    this.onInputFieldSearchClick = this.onInputFieldSearchClick.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.onIdeasScroll = this.onIdeasScroll.bind(this);
  }

  componentDidMount() {
    const {
      fetchCollectionStartAsync,
      category,
      searchFieldValue,
    } = this.props;

    fetchCollectionStartAsync({
      dataToFetch: 'idea',
      category,
      searchFieldValue,
    });
  }

  // Browse Search Field Handler
  filterChangeHandler(e) {
    const { value } = e.target;
    this.setState({ searchInputFieldValue: value });
  }

  onInputFieldSearchClick() {
    const { setSearchInputFieldValue } = this.props;

    setSearchInputFieldValue(this.state.searchInputFieldValue);
  }

  // Ideas Field Handler
  onSearchCategoryClickHandler(e) {
    const { name } = e.target.dataset;
    e.target.classList.add('--active');

    // Updating Redux State for Fields
    const { setSearchCategory } = this.props;
    setSearchCategory(name);
  }

  // Implementing Pagination
  onIdeasScroll(e) {
    const bottom =
      parseInt(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;

    if (bottom) {
      const { fetchCollectionNextPage } = this.props;

      // Calculating Next Page
      /*
      EX.
      60 results (total results here)
      20 results (fetched By Server every time)
      +1 (Next Page)
      =>
      3rd page
      
      */

      fetchCollectionNextPage();
    }
  }

  render() {
    const { collectionData, category } = this.props;

    return (
      <div className="projects-page --grid-box-2">
        <NavBar />
        <div
          className="projects-page-content --rightside-grid-box"
          onScroll={this.onIdeasScroll}
        >
          <div className="projects-page-content-header">
            <h2 className="projects-page-content-header__heading --maintext">
              Hello User! Today's All Ideas :D
            </h2>
            <SearchSvg onClick={this.onInputFieldSearchClick} />
            <InputField
              type="text"
              placeHolder={`browse ${
                this.state.searchtype === 'idea' ? 'ideas' : 'universities'
              }`}
              value={this.state.searchInputFieldValue}
              onChangeHandler={this.filterChangeHandler}
            />
          </div>
          <div className="projects-page-content-subheader">
            <h4 className="projects-page-content-subheader__heading --maintext">
              Categories
            </h4>
            <div className="projects-page-content-subheader-content">
              <ul className="projects-page-content-subheader-content-ul">
                {['Popular', 'Most Funded', 'Recent'].map((el, i) => (
                  <li
                    className={`projects-page-content-subheader-content-ul__li --subpara ${
                      category === el ? '--active' : ''
                    }`}
                    key={i}
                    onClick={this.onSearchCategoryClickHandler}
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
            {collectionData ? (
              collectionData.map((el, i) => {
                return <IdeaCard key={i} {...el} />;
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
