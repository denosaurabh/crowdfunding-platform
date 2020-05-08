import CollectionActionTypes from './collection.types';
import { addCategoryToArray } from './collection.utils';

const INITIAL_STATE = {
  collectionTempBackup: null,
  collectionData: null,
  isFetching: false,
  errorMessage: undefined,
  page: 1,
  searchField: '',
  category: 'Popular',
};

const CollectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CollectionActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
        collectionData: null,
        page: 1,
        category: 'Popular',
        searchField: '',
      };

    case CollectionActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return { ...state, isFetching: false, collectionData: action.payload };

    case CollectionActionTypes.FETCH_COLLECTIONS_START:
      return { ...state, isFetching: false, errorMessage: action.payload };

    // Pages Action Handlers
    case CollectionActionTypes.COLLECTION_NEXT_PAGE:
      return { ...state, page: action.payload };
      
    case CollectionActionTypes.FETCH_COLLECTION_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        collectionData: [...state.collectionData, ...action.payload],
      };

    // Input Field Action Handlers
    case CollectionActionTypes.SET_SEARCH_INPUT_FIELD:
      return { ...state, searchField: action.payload };

    // Input Search Category Handlers
    case CollectionActionTypes.SET_SEARCH_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    // Making Temprary Collection Backup
    case CollectionActionTypes.MAKE_COLLECTION_BACKUP:
      return {
        ...state,
        collectionTempBackup: state.collectionData,
      };

    default:
      return state;
  }
};

export default CollectionReducer;
