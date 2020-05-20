import { createSelector } from 'reselect';

const userProposalsSelect = (state) => state.userProposals;

export const selectUserProposals = createSelector(
  [userProposalsSelect],
  (userProposals) => userProposals.proposals
);

export const selectisLoading = createSelector(
  [userProposalsSelect],
  (userProposals) => !userProposals.proposals || userProposals.isLoading
);
