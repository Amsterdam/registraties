import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS } from './constants';

export const loadData = openbareRuimteId => ({
  type: LOAD_DATA,
  payload: { openbareRuimteId },
});

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});
