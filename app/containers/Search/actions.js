import { SEARCH_SELECT, INPUT_CHANGE, TYPE_AHEAD_SUCCESS, TYPE_AHEAD_FAILED } from './constants';

export const searchSelect = payload => ({
  type: SEARCH_SELECT,
  payload,
});

export const inputChanged = payload => ({
  type: INPUT_CHANGE,
  payload,
});

export const typeAheadSuccess = payload => ({
  type: TYPE_AHEAD_SUCCESS,
  payload,
});

export const typeAheadFailed = payload => ({
  type: TYPE_AHEAD_FAILED,
  payload,
});
