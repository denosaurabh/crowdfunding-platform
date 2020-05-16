import UserActionTypes from './userIdeas.actiontypes';

import APIRequest from '../../utils/apirequest';

export const fetchUserIdeasStart = () => ({
  type: UserActionTypes.FETCH_USERIDEAS_START,
});

export const fetchUserIdeasSuccess = (ideas) => ({
  type: UserActionTypes.FETCH_USERIDEAS_SUCCESS,
  payload: ideas,
});

export const fetchUserIdeasFailed = (error) => ({
  type: UserActionTypes.FETCH_USERIDEAS_FAILED,
  payload: error,
});

// Fetch User Ideas Start Async
export const fetchUserIdeasStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchUserIdeasStart());

    new APIRequest('get', 'user/myIdeas')
      .request()
      .then((res) => {
        dispatch(fetchUserIdeasSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(fetchUserIdeasFailed(error));
      });
  };
};
