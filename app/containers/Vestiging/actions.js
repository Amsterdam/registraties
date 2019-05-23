import * as constants from './constants';

export const loadVestigingData = () => ({
  type: constants.LOAD_VESTIGING_DATA,
});

export const loadVestigingDataSuccess = payload => ({
  type: constants.LOAD_VESTIGING_DATA_SUCCESS,
  payload,
});

export const loadVestigingDataFailed = payload => ({
  type: constants.LOAD_VESTIGING_DATA_FAILED,
  payload,
});

export const loadVestigingDataNoResults = payload => ({
  type: constants.LOAD_VESTIGING_DATA_NO_RESULTS,
  payload,
});
