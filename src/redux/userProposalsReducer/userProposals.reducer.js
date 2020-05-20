import UserProposalsActionTypes from './userProposals.actiontypes';

const INITIAL_STATE = {
  proposals: null,
  isFetching: false,
  errorMessage: undefined,
};

const UserProposalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserProposalsActionTypes.FETCH_USER_PROPOSALS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserProposalsActionTypes.FETCH_USER_PROPOSALS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        proposals: action.payload,
        errorMessage: undefined,
      };
    case UserProposalsActionTypes.FETCH_USER_PROPOSALS_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default UserProposalsReducer;
