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
      }&limit=10${sortQuery}`
    )
      .request()
      .then((res) => {
        console.log(
          `$%c ${Math.ceil(res.data.results / 10) + 1}`,
          'background-color: blue; color: white'
        );
        dispatch(collectionNextPage(Math.ceil(res.data.results / 10) + 1));

        dispatch(fetchCollectionSuccess(res.data.data.data));
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
      }&limit=10${sortQuery}`
    )
      .request()
      .then((res) => {
        console.log(
          `$%c ${Math.ceil(res.data.results / 10) + page}`,
          'background-color: blue; color: white'
        );

        dispatch(collectionNextPage(Math.ceil(res.data.results / 10) + page));

        dispatch(fetchCollectionNextPage(res.data.data.data));
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
      }limit=10${sortQuery}`
    )
      .request()
      .then((res) => {
        dispatch(collectionNextPage(2));

        dispatch(fetchCollectionSuccess(res.data.data.data));
      })
      .catch((err) => dispatch(fetchCollectionFailed(err)));
  };
};

// Clearing and Fetching Data with Categories
// export const clearAndFetchCollectionWithCategories = ({
//   dataToFetch,
//   categories,
//   searchInputFieldValue,
//   page,
// }) => {
//   return (dispatch) => {
//     dispatch(fetchCollectionStart());

//     const categoriesQueryStr = makeCategoriesQueryStr(categories);

//     //  title[regex]=\b${searchInputFieldValue}\b&page=1&limit=10&${categoriesQueryStr}
//     new APIRequest(
//       'get',
//       `${dataToFetch}?page=1&limit=10${
//         searchInputFieldValue
//           ? `&title[regex]=%5Cb${searchInputFieldValue}%5Cb&`
//           : '&'
//       }${categoriesQueryStr}`
//     )
//       .request()
//       .then((res) => {
//         dispatch(fetchCollectionSuccess(res.data.data.data));
//       })
//       .catch((err) => dispatch(fetchCollectionFailed(err)));
//   };
// };

// // Filtering the Current Collection respect to Categories
// export const fetchCollectionWithcategories = ({
//   dataToFetch,
//   searchInputFieldValue,
//   categories,
//   page,
// }) => {
//   return (dispatch) => {
//     const categoriesQueryStr = makeCategoriesQueryStr(categories);

//     new APIRequest(
//       'get',
//       `${dataToFetch}?page=1&limit=10${
//         searchInputFieldValue
//           ? `&title[regex]=%5Cb${searchInputFieldValue}%5Cb&`
//           : '&'
//       }${categoriesQueryStr}`
//     )
//       .request()
//       .then((res) => {
//         dispatch(fetchCollectionSuccess(res.data.data.data));
//       })
//       .catch((err) => dispatch(fetchCollectionFailed(err)));

//     // console.log(
//     //   collectionData,
//     //   categories,
//     //   'FILTER CURRENT COLLECTION WITH CATEGORIES'
//     // );

//     // return (dispatch) => {
//     //   const filteredCollectionData = collectionData.filter((el) =>
//     //     categories.includes(el.field)
//     //   );

//     //   dispatch(fetchCollectionSuccess(filteredCollectionData));
//     // };
//   };
// };
