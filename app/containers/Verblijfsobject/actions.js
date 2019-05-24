import {
  LOAD_DATA_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA,
  LOAD_ID_FAILED,
  LOAD_ID_NO_RESULTS,
  LOAD_ID_SUCCESS,
  LOAD_ID,
} from './constants';

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

export const loadId = adresseerbaarObjectId => ({
  type: LOAD_ID,
  payload: { adresseerbaarObjectId },
});

export const loadIdSuccess = payload => ({
  type: LOAD_ID_SUCCESS,
  payload,
});

export const loadIdFailed = payload => ({
  type: LOAD_ID_FAILED,
  payload,
});

export const loadIdNoResults = payload => ({
  type: LOAD_ID_NO_RESULTS,
  payload,
});
