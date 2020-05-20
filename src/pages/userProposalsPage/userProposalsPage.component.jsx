import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './userProposalspage.styles.scss';

import { fetchUserProposalsStartAsync } from '../../redux/userProposalsReducer/userProposals.actions';
import {
  selectUserProposals,
  selectisLoading,
} from '../../redux/userProposalsReducer/userProposals.selectors';

import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import Navbar from '../../components/navbar/navbar.component';
import UserProposalBox from '../../components/userIdeaBox/userIdeaBox.component';

class UserProposalsPage extends React.Component {
  componentDidMount() {
    const { fetchUserProposalsStartAsync } = this.props;
    fetchUserProposalsStartAsync();
  }

  render() {
    const { proposals, isLoading } = this.props;

    return (
      <div className="user-proposals-page --grid-box-2">
        <Navbar />
        <div className="user-proposals-page-content --rightside-grid-box">
          <h2 className="user-proposals-page-content__heading --maintext">
            Your Proposals
            {!isLoading ? (
              <div className="user-proposals-page-content-ideas">
                {proposals.map((el, i) => (
                  <UserProposalBox key={i} {...el} type="proposal" />
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
  proposals: selectUserProposals,
  isLoading: selectisLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProposalsStartAsync: () => dispatch(fetchUserProposalsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProposalsPage);
