import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  LOAD_DATA_NO_RESULTS,
  LOAD_IDS,
  LOAD_IDS_SUCCESS,
  LOAD_IDS_FAILED,
  LOAD_IDS_NO_RESULTS,
} from './constants';

export const loadData = () => ({
  type: LOAD_DATA,
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

export const loadIds = () => ({
  type: LOAD_IDS,
});

export const loadIdsSuccess = payload => ({
  type: LOAD_IDS_SUCCESS,
  payload,
});

export const loadIdsFailed = payload => ({
  type: LOAD_IDS_FAILED,
  payload,
});

export const loadIdsNoResults = payload => ({
  type: LOAD_IDS_NO_RESULTS,
  payload,
});
