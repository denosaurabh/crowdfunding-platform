import UserActionTypes from './user.actionTypes';

const INTITIAL_STATE = {
  currentUser: null,
  isSignInOrLogging: false,
  errorMessage: undefined,
};

const UserReducer = (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_START:
      return { ...state, isSignInOrLogging: true };

    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isSignInOrLogging: false,
        currentUser: action.payload,
      };

    case UserActionTypes.GET_USER_FAILED:
      return {
        ...state,
        isSignInOrLogging: false,
        errorMessage: action.payload,
      };

    case UserActionTypes.SET_USER_NULL:
      return {
        ...state,
        isSignInOrLogging: false,
        currentUser: null,
        errorMessage: undefined,
      };

    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
