import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserUniversityPage from './useruniversitypage.component';

import {
  selectUserUniversity,
  selectUserUniversityMembers,
  selectUserUniversityProposals,
  isUserUniversityFetching,
  isUserUniversityLoaded,
} from '../../redux/UserUniversityReducer/university.selectors';

import { getUniversityStartAsync } from '../../redux/UserUniversityReducer/university.action';

const mapStateToProps = createStructuredSelector({
  university: selectUserUniversity,
  members: selectUserUniversityMembers,
  proposals: selectUserUniversityProposals,
  isLoading: isUserUniversityFetching,
  isDataLoaded: isUserUniversityLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getUniversityStartAsync: () => dispatch(getUniversityStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUniversityPage);
