import UniversityActionTypes from './university.types';

import {
  sortUniversityProposals,
  updateUniversityProposalAccept,
  removeUniversityMemberUtil,
} from './university.utils';

const INITIAL_STATE = {
  university: null,
  isFetching: false,
  errorMessage: undefined,
  category: undefined,
  settings: true,
};

const universityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UniversityActionTypes.GET_USER_UNIVERSITY_START:
      return { ...state, isFetching: true };

    case UniversityActionTypes.GET_USER_UNIVERSITY_SUCCESS:
      return { ...state, isFetching: false, university: action.payload };

    case UniversityActionTypes.GET_USER_UNIVERSITY_FAILED:
      return { ...state, isFetching: false, errorMessage: action.payload };

    case UniversityActionTypes.SET_UNIVERSITY_SORT_CATEGORY:
      return {
        ...state,
        category: action.payload,
        university: sortUniversityProposals(state.university, action.payload),
      };

    case UniversityActionTypes.SET_PROPOSAL_ACCEPTANCE:
      return {
        ...state,
        university: updateUniversityProposalAccept(
          state.university,
          action.payload.proposalId,
          action.payload.func
        ),
      };

    case UniversityActionTypes.TOGGLE_UNIVERSITY_SETTINGS:
      return {
        ...state,
        settings: !state.settings,
      };

    case UniversityActionTypes.REMOVE_UNIVERSITY_MEMBER:
      return {
        ...state,
        university: removeUniversityMemberUtil(
          state.university,
          action.payload
        ),
      };

    default:
      return state;
  }
};

export default universityReducer;
