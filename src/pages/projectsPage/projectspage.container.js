import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ProjectsPage from './projectspage.cmponent';

import {
  fetchCollectionStartAsync,
  fetchCollectionNextPageStart,
  setSearchInputField,
  setSearchCategory,
  searchIdeaOrCollection,
} from '../../redux/collectionReducer/collection.actions';

import {
  selectCollectionData,
  selectCollectionNextPage,
  selectSearchInputValue,
  selectCollectionCategory,
  selectSearchIdeaOrUniversity,
} from '../../redux/collectionReducer/collection.selectors';

const mapStateToProps = createStructuredSelector({
  collectionData: selectCollectionData,
  nextPageNo: selectCollectionNextPage,
  searchInputFieldValue: selectSearchInputValue,
  category: selectCollectionCategory,
  searchIdeaOrCollection: selectSearchIdeaOrUniversity,
});

const mapDipatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: ({ dataToFetch, category, searchFieldValue }) =>
    dispatch(
      fetchCollectionStartAsync({ dataToFetch, category, searchFieldValue })
    ),
  fetchCollectionNextPage: () => dispatch(fetchCollectionNextPageStart()),
  setSearchInputFieldValue: (value) => dispatch(setSearchInputField(value)),
  setSearchCategory: (category) => dispatch(setSearchCategory(category)),
  setSearchIdeaOrUniversity: (search) =>
    dispatch(searchIdeaOrCollection(search)),
});

export default connect(mapStateToProps, mapDipatchToProps)(ProjectsPage);
