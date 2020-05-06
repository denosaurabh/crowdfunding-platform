import UniversityActionTypes from './university.types';

const INITIAL_STATE = {
  university: null,
  isFetching: false,
  errorMessage: undefined,
};

const universityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UniversityActionTypes.GET_USER_UNIVERSITY_START:
      return { ...state, isFetching: true };

    case UniversityActionTypes.GET_USER_UNIVERSITY_SUCCESS:
      return { ...state, isFetching: false, university: action.payload };

    case UniversityActionTypes.GET_USER_UNIVERSITY_FAILED:
      return { ...state, isFetching: false, errorMessage: action.payload };

    default:
      return state;
  }
};

export default universityReducer;
