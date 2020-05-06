import APIRequest from '../../utils/apirequest';

import universityActionTypes from './university.types';

export const getUniversityStart = () => ({
  type: universityActionTypes.GET_USER_UNIVERSITY_START,
});

export const getUniversitySuccess = (university) => ({
  type: universityActionTypes.GET_USER_UNIVERSITY_SUCCESS,
  payload: university,
});

export const getUniversityFailed = (error) => ({
  type: universityActionTypes.GET_USER_UNIVERSITY_FAILED,
  payload: error,
});

export const getUniversityStartAsync = () => {
  return (dispatch) => {
    dispatch(getUniversityStart());

    new APIRequest('get', 'university/myUniversity', null)
      .request()
      .then((res) => dispatch(getUniversitySuccess(res.data.data.university)))
      .catch((err) => dispatch(getUniversityFailed(err)));
  };
};
