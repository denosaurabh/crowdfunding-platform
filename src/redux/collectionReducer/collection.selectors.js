import { createSelector } from 'reselect';

const collectionSelect = (state) => state.collection;

export const selectCollectionData = createSelector(
  [collectionSelect],
  (collection) => collection.collectionData
);

export const selectCollectionNextPage = createSelector(
  [collectionSelect],
  (collection) => collection.page + 1
);
export const selectSearchInputValue = createSelector(
  [collectionSelect],
  (collection) => collection.searchField
);

export const selectCollectionCategory = createSelector(
  [collectionSelect],
  (collection) => collection.category
);

export const selectSearchIdeaOrUniversity = createSelector(
  [collectionSelect],
  (collection) => collection.searchUniversityOrIdeas
);
