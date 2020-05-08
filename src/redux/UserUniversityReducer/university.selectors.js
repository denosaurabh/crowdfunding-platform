import { createSelector } from 'reselect';

export const universitySelect = (state) => state.university;

export const selectUserUniversity = createSelector(
  [universitySelect],
  (university) => university.university
);

export const selectUserUniversityMembers = createSelector(
  [selectUserUniversity],
  (university) => (university ? university.members : null)
);

export const selectUserUniversityProposals = createSelector(
  [selectUserUniversity],
  (university) => (university ? university.proposals : null)
);

export const isUserUniversityFetching = createSelector(
  [universitySelect],
  (university) => !university.university || university.isFetching
);

export const isUserUniversityLoaded = createSelector(
  [universitySelect],
  (university) => !!university
);

export const selectUniversitySortCategory = createSelector(
  [universitySelect],
  (university) => university.category
);

export const selectUniversitySettings = createSelector(
  [universitySelect],
  (university) => university.settings
);
