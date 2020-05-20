import UserActionTypes from './userProposals.actiontypes';

import APIRequest from '../../utils/apirequest';

export const fetchUserProposalsStart = () => ({
  type: UserActionTypes.FETCH_USER_PROPOSALS_START,
});

export const fetchUserProposalsSuccess = (proposals) => ({
  type: UserActionTypes.FETCH_USER_PROPOSALS_SUCCESS,
  payload: proposals,
});

export const fetchUserProposalsFailed = (error) => ({
  type: UserActionTypes.FETCH_USER_PROPOSALS_FAILED,
  payload: error,
});

// Fetch User Ideas Start Async
export const fetchUserProposalsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchUserProposalsStart());

    new APIRequest('get', 'user/myProposals')
      .request()
      .then((res) => {
        dispatch(fetchUserProposalsSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(fetchUserProposalsFailed(error));
      });
  };
};
