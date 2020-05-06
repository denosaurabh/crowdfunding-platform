import { createSelector } from 'reselect';

const errorSelect = (state) => state.error;

export const selectError = createSelector(
  [errorSelect],
  (error) => error.currentError
);
