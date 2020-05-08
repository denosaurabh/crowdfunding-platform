import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ProjectsPage from './projectspage.cmponent';

import {
  fetchCollectionStartAsync,
  fetchCollectionNextPage,
  fetchCollectionNextPageStart,
  setSearchInputField,
  setSearchCategory,
} from '../../redux/collectionReducer/collection.actions';

import {
  selectCollectionData,
  selectCollectionNextPage,
  selectSearchInputValue,
  selectCollectionCategory,
} from '../../redux/collectionReducer/collection.selectors';

const mapStateToProps = createStructuredSelector({
  collectionData: selectCollectionData,
  nextPageNo: selectCollectionNextPage,
  searchInputFieldValue: selectSearchInputValue,
  category: selectCollectionCategory,
});

const mapDipatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: ({ dataToFetch, category, searchFieldValue }) =>
    dispatch(
      fetchCollectionStartAsync({ dataToFetch, category, searchFieldValue })
    ),
  fetchCollectionNextPage: () => dispatch(fetchCollectionNextPageStart()),
  setSearchInputFieldValue: (value) => dispatch(setSearchInputField(value)),
  setSearchCategory: (category) => dispatch(setSearchCategory(category)),
});

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsPage);
