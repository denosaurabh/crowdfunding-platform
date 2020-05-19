import CollectionActionTypes from './collection.types';
import { makingSortQueryFromCategory } from './collection.utils';

import APIRequest from '../../utils/apirequest';

export const fetchCollectionStart = () => ({
  type: CollectionActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionData) => ({
  type: CollectionActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionData,
});

export const fetchCollectionFailed = (errorMessage) => ({
  type: CollectionActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// Pages Work
export const collectionNextPage = (nextPageNo) => ({
  type: CollectionActionTypes.COLLECTION_NEXT_PAGE,
  payload: nextPageNo,
});

export const fetchCollectionNextPageStart = () => ({
  type: CollectionActionTypes.FETCH_COLLECTION_NEXT_PAGE,
});

export const collectionPreviousPage = () => ({
  type: CollectionActionTypes.COLLECTION_PRE_PAGE,
});

export const fetchCollectionNextPage = (nextPageCollectionData) => ({
  type: CollectionActionTypes.FETCH_COLLECTION_NEXT_PAGE_SUCCESS,
  payload: nextPageCollectionData,
});

// Input Search Field Action
export const setSearchInputField = (value) => ({
  type: CollectionActionTypes.SET_SEARCH_INPUT_FIELD,
  payload: value,
});

// Search Categories Action
export const setSearchCategory = (category) => ({
  type: CollectionActionTypes.SET_SEARCH_CATEGORY,
  payload: category,
});

// Make Collection Backup
export const makeCollectionBackup = () => ({
  type: CollectionActionTypes.MAKE_COLLECTION_BACKUP,
});

// Make University or Idea Search
export const searchIdeaOrCollection = (search) => ({
  type: CollectionActionTypes.SET_UNIVERSITY_OR_IDEAS_SEARCH,
  payload: search,
});

/* --------*---------*------- */
//  Fetching Data at Initial
export const fetchCollectionStartAsync = ({
  dataToFetch,
  category,
  searchFieldValue,
}) => {
  return (dispatch) => {
    dispatch(fetchCollectionStart());

    const sortQuery = makingSortQueryFromCategory(category);

    new APIRequest(
      'get',
      `${dataToFetch}?page=1${
        searchFieldValue ? `&title[regex]=%5Cb${searchFieldValue}%5Cb&` : ''
      }&limit=100${sortQuery}`
    )
      .request()
      .then((res) => {
        console.log(
          `$%c ${Math.ceil(res.data.results / 10) + 1}`,
          'background-color: blue; color: white'
        );
        dispatch(collectionNextPage(Math.ceil(res.data.results / 10) + 1));

        dispatch(fetchCollectionSuccess(res.data.data));
      })
      .catch((err) => dispatch(fetchCollectionFailed(err)));
  };
};

//  Fetching Data When Page Changes
export const fetchCollectionNextPageAsync = ({
  dataToFetch,
  category,
  searchFieldValue,
  page,
}) => {
  return (dispatch) => {
    // dispatch(fetchCollectionNextPage());

    const sortQuery = makingSortQueryFromCategory(category);

    new APIRequest(
      'get',
      `${dataToFetch}?page=${page}${
        searchFieldValue ? `&title[regex]=%5Cb${searchFieldValue}%5Cb&` : ''
      }&limit=100${sortQuery}`
    )
      .request()
      .then((res) => {
        console.log(
          `$%c ${Math.ceil(res.data.results / 10) + page}`,
          'background-color: blue; color: white'
        );

        dispatch(collectionNextPage(Math.ceil(res.data.results / 10) + page));

        dispatch(fetchCollectionNextPage(res.data.data));
      })
      .catch((err) => dispatch(fetchCollectionFailed(err)));
  };
};

// Fetching data when Query Changes
export const fetchCollectionWithQueryAsync = ({
  dataToFetch,
  searchFieldValue,
  category,
  page,
}) => {
  return (dispatch) => {
    const sortQuery = makingSortQueryFromCategory(category);

    new APIRequest(
      'get',
      `${dataToFetch}?page=1${
        searchFieldValue ? `&title[regex]=%5Cb${searchFieldValue}%5Cb&` : ''
      }limit=100${sortQuery}`
    )
      .request()
      .then((res) => {
        dispatch(collectionNextPage(2));

        dispatch(fetchCollectionSuccess(res.data.data));
      })
      .catch((err) => dispatch(fetchCollectionFailed(err)));
  };
};
