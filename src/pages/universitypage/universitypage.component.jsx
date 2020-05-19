import React from 'react';

import APIRequest from '../../utils/apirequest';

import './universitypage.styles.scss';

import { ReactComponent as LeftLightArrowSvg } from '../../assets/svg/leftlightarrow.svg';
import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import NavBar from '../../components/navbar/navbar.component';
import Button from '../../components/button/button.component';

class UniversityPage extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  async componentDidMount() {
    const universityId = this.props.match.params.id;

    new APIRequest('get', `university/${universityId}`)
      .request()
      .then((res) => {
        this.setState({ data: res.data.data.data });
      })
      .catch((_) => {});
  }

  render() {
    return (
      <div className="uiversity-page --grid-box-2">
        <NavBar />
        {this.state.data ? (
          <div className="university-page-content --rightside-grid-box">
            <LeftLightArrowSvg onClick={() => this.props.history.goBack()} />
            <img
              src={`${process.env.REACT_APP_API_URL}/images/university/${this.state.data.image}`}
              alt="university"
              className="university-page-content__img"
            />
            <h2 className="university-page-content__heading --maintext">
              {this.state.data.name}
            </h2>
            <h2 className="university-page-content__span --subpara --light --smallfont">
              {`Joined On: ${new Date(this.state.data.formedOn).getDate()} ${
                [
                  'Jan',
                  'Feb',
                  'Mar',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ][new Date(this.state.data.formedOn).getMonth()]
              } ${new Date(this.state.data.formedOn).getFullYear()}`}
            </h2>
            <p className="university-page-content__description --subpara --smallfont">
              {this.state.data.description}
            </p>
            <Button
              colorStyle="blue"
              content="Submit your Proposal"
              onClickHandler={() =>
                this.props.history.push(
                  `/submit/proposal/${this.state.data._id}`
                )
              }
              addClass="university-page-content__button"
            />
          </div>
        ) : (
          <LoadingSvg />
        )}
      </div>
    );
  }
}

export default UniversityPage;
