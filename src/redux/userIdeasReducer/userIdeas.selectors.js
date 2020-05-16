import { createSelector } from 'reselect';

const userIdeasSelect = (state) => state.userIdeas;

export const selectUserIdeas = createSelector(
  [userIdeasSelect],
  (userIdeas) => userIdeas.ideas
);

export const selectisLoading = createSelector(
  [userIdeasSelect],
  (userIdeas) => !userIdeas.ideas || userIdeas.isLoading
);
