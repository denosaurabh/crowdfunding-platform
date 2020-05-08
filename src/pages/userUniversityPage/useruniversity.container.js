import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserUniversityPage from './useruniversitypage.component';

import {
  selectUserUniversity,
  selectUserUniversityMembers,
  selectUserUniversityProposals,
  isUserUniversityFetching,
  isUserUniversityLoaded,
  selectUniversitySortCategory
} from '../../redux/UserUniversityReducer/university.selectors';

import {
  getUniversityStartAsync,
  setUniversitySortCategory
} from '../../redux/UserUniversityReducer/university.action';

const mapStateToProps = createStructuredSelector({
  university: selectUserUniversity,
  members: selectUserUniversityMembers,
  proposals: selectUserUniversityProposals,
  isLoading: isUserUniversityFetching,
  isDataLoaded: isUserUniversityLoaded,
  category: selectUniversitySortCategory
});

const mapDispatchToProps = dispatch => ({
  getUniversityStartAsync: () => dispatch(getUniversityStartAsync()),
  setUniversitySortCategory: category =>
    dispatch(setUniversitySortCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUniversityPage);
