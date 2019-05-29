import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { loadDataSuccess, loadDataFailed } from './actions';
import { LOAD_DATA } from './constants';

const { API_ROOT } = configuration;
const OPENBARE_RUIMTE_API = `${API_ROOT}bag/openbareruimte/`;

export function* fetchOpenbareRuimteData(openbareRuimteId) {
  try {
    const data = yield call(request, `${OPENBARE_RUIMTE_API}${openbareRuimteId}/`, getAuthHeaders());

    yield put(loadDataSuccess(data));
  } catch (error) {
    yield put(loadDataFailed(error));
    throw error;
  } finally {
    yield put(incrementProgress());
  }
}

export default function* watchOpenbareRuimteSaga() {
  yield takeLatest(LOAD_DATA, fetchOpenbareRuimteData);
}
