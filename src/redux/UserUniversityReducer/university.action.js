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

export const setUniversitySortCategory = (category) => ({
  type: universityActionTypes.SET_UNIVERSITY_SORT_CATEGORY,
  payload: category,
});

export const setProposalAcceptance = (payload) => ({
  type: universityActionTypes.SET_PROPOSAL_ACCEPTANCE,
  payload,
});

export const toggleUniversitySettings = () => ({
  type: universityActionTypes.TOGGLE_UNIVERSITY_SETTINGS,
});

export const removeUniversityMember = (memberId) => ({
  type: universityActionTypes.REMOVE_UNIVERSITY_MEMBER,
  payload: memberId,
});

// Getting Proposals & Members from University
export const getUniversityStartAsync = () => {
  return (dispatch) => {
    dispatch(getUniversityStart());

    new APIRequest('get', 'university/myUniversity', null)
      .request()
      .then((res) => dispatch(getUniversitySuccess(res.data.data.university)))
      .catch((err) => dispatch(getUniversityFailed(err)));
  };
};
