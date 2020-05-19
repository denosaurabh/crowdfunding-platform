import CollectionActionTypes from './collection.types';

import {
  fetchCollectionWithQueryAsync,
  fetchCollectionNextPageAsync,
  fetchCollectionStartAsync
} from './collection.actions';

import CollectionActionsTypes from './collection.types';
import { act } from 'react-dom/test-utils';

const collectionMiddleware = (state) => (next) => (action) => {
  const { collection } = state.getState();
  const { category, searchField, page, searchUniversityOrIdeas } = collection;

  switch (action.type) {
    case CollectionActionTypes.FETCH_COLLECTION_NEXT_PAGE:
      console.log(action.type, action.payload);
      console.log(
        '%c I AM IN __COLLECTION_NEXT_PAGE__',
        'background-color: black; color: white'
      );

      // Adding data to Collection, in respect to SearchField and Categories
      state.dispatch(
        fetchCollectionNextPageAsync({
          dataToFetch: searchUniversityOrIdeas,
          category,
          searchFieldValue: searchField,
          page,
        })
      );

      return next(action);

    case CollectionActionsTypes.SET_SEARCH_INPUT_FIELD:
      console.log(action.type, action.payload);
      console.log(
        '%c I AM IN __SET_SEARCH_INPUT_FIELD__',
        'background-color: red; color: white'
      );

      state.dispatch(
        fetchCollectionWithQueryAsync({
          dataToFetch: searchUniversityOrIdeas,
          category,
          searchFieldValue: action.payload,
          page,
        })
      );

      return next(action);

    case CollectionActionTypes.SET_SEARCH_CATEGORY:
      console.log(
        '%c I AM IN __SET_SEARCH_CATEGORY__',
        'background-color: green; color: white',
        action.payload
      );

      state.dispatch(
        fetchCollectionWithQueryAsync({
          dataToFetch: searchUniversityOrIdeas,
          category: action.payload,
          searchFieldValue: searchField,
          page,
        })
      );

      return next(action);

    case CollectionActionTypes.SET_UNIVERSITY_OR_IDEAS_SEARCH:
      console.log(
        '%c I AM IN __SET_SEARCH_IDEA_OR_UNIVERSITY__',
        'background-color: pink; color: white',
        action.payload
      );

      state.dispatch(
        fetchCollectionStartAsync({
          dataToFetch: action.payload,
          category,
          searchFieldValue: searchField,
          page,
        })
      );

      return next(action);

    default:
      return next(action);
  }
};

export default collectionMiddleware;
