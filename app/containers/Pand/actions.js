import {
  LOAD_DATA_FAILED,
  LOAD_DATA_NO_RESULTS,
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  LOAD_LIST_DATA_FAILED,
  LOAD_LIST_DATA_NO_RESULTS,
  LOAD_LIST_DATA_SUCCESS,
  LOAD_LIST_DATA,
} from './constants';

export const loadData = pandId => ({
  type: LOAD_DATA,
  payload: { pandId },
});

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const loadDataNoResults = payload => ({
  type: LOAD_DATA_NO_RESULTS,
  payload,
});

export const loadListData = adresseerbaarObjectId => ({
  type: LOAD_LIST_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadListDataSuccess = payload => ({
  type: LOAD_LIST_DATA_SUCCESS,
  payload,
});

export const loadListDataFailed = payload => ({
  type: LOAD_LIST_DATA_FAILED,
  payload,
});

export const loadListDataNoResults = payload => ({
  type: LOAD_LIST_DATA_NO_RESULTS,
  payload,
});
