import UserActionTypes from './userIdeas.actiontypes';

const INITIAL_STATE = {
  ideas: null,
  isFetching: false,
  errorMessage: undefined,
};

const UserIdeasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERIDEAS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.FETCH_USERIDEAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ideas: action.payload,
        errorMessage: undefined,
      };
    case UserActionTypes.FETCH_USERIDEAS_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default UserIdeasReducer;
