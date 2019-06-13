import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';
import { LOAD_DATA } from './constants';

const { API_ROOT } = configuration;
export const OPENBARE_RUIMTE_API = `${API_ROOT}bag/openbareruimte/`;

export function* fetchOpenbareRuimteData(openbareRuimteId) {
  try {
    const data = yield call(request, `${OPENBARE_RUIMTE_API}${openbareRuimteId}/`);

    if (data) {
      yield put(loadDataSuccess(data));
    } else {
      yield put(loadDataNoResults());
    }
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
