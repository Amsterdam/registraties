import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_NO_RESULTS, LOAD_DATA_SUCCESS } from './constants';

export const loadData = adresseerbaarObjectId => ({
  type: LOAD_DATA,
  payload: { adresseerbaarObjectId },
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
