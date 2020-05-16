import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './userIdeaspage.styles.scss';

import { fetchUserIdeasStartAsync } from '../../redux/userIdeasReducer/userIdeas.actions';
import {
  selectUserIdeas,
  selectisLoading,
} from '../../redux/userIdeasReducer/userIdeas.selectors';

import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import Navbar from '../../components/navbar/navbar.component';
import UserIdeaBox from '../../components/userIdeaBox/userIdeaBox.component';
// import WithSpinner from '../../components/withSpinner/withSpinner.component';

class UserIdeasPage extends React.Component {
  componentDidMount() {
    const { fetchUserIdeasStartAsync } = this.props;
    fetchUserIdeasStartAsync();
  }

  render() {
    const { ideas, isLoading } = this.props;
    console.log(ideas);

    return (
      <div className="user-ideas-page --grid-box-2">
        <Navbar />
        <div className="user-ideas-page-content --rightside-grid-box">
          <h2 className="user-ideas-page-content__heading --maintext">
            Your Amazing Ideas
            {!isLoading ? (
              <div className="user-ideas-page-content-ideas">
                {ideas.map((el, i) => (
                  <UserIdeaBox key={i} {...el} />
                ))}
              </div>
            ) : (
              <LoadingSvg />
            )}
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ideas: selectUserIdeas,
  isLoading: selectisLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserIdeasStartAsync: () => dispatch(fetchUserIdeasStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIdeasPage);
