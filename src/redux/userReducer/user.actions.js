import UserActionTypes from './user.actionTypes';

import APIRequest from '../../utils/apirequest';

export const setCurrentUserStart = () => ({
  type: UserActionTypes.GET_USER_START,
});

export const setCurrentUserSuccess = (user) => ({
  type: UserActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const setCurrentUserFailed = (errorMessage) => ({
  type: UserActionTypes.GET_USER_FAILED,
  payload: errorMessage,
});

export const setCurrentUserNull = () => ({
  type: UserActionTypes.SET_USER_NULL,
});

export const setCurrentUserStartAsync = (userData, type, reqType = 'post') => {
  return (dispatch) => {
    dispatch(setCurrentUserStart());

    new APIRequest(reqType, `user/${type}`, userData)
      .request()
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('USER_TOKEN', res.data.token);
        }

        dispatch(setCurrentUserSuccess(res.data.data.user));
      })
      .catch((err) => {
        dispatch(setCurrentUserFailed(err));
      });
  };
};
