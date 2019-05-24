import {
  LOAD_DATA,
  LOAD_DATA_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_LIST_DATA,
  LOAD_LIST_DATA_FAILED,
  LOAD_LIST_DATA_NO_RESULTS,
  LOAD_LIST_DATA_SUCCESS,
} from './constants';

export const loadData = landelijkId => ({
  type: LOAD_DATA,
  payload: { landelijkId },
});

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const loadlistData = adresseerbaarObjectId => ({
  type: LOAD_LIST_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadlistDataSuccess = payload => ({
  type: LOAD_LIST_DATA_SUCCESS,
  payload,
});

export const loadlistDataFailed = payload => ({
  type: LOAD_LIST_DATA_FAILED,
  payload,
});

export const loadlistDataNoResults = payload => ({
  type: LOAD_LIST_DATA_NO_RESULTS,
  payload,
});
