import { createSelector } from 'reselect';

const userSelect = (state) => state.user;

export const selectUser = createSelector(
  [userSelect],
  (user) => user.currentUser
);

export const selectUserId = createSelector(
  [userSelect],
  (user) => user.currentUser._id
);

