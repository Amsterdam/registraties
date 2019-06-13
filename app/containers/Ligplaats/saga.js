import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';

const { API_ROOT } = configuration;
export const LIGPLAATS_API = `${API_ROOT}bag/ligplaats/`;

export function* fetchLigplaatsData(ligplaatsId) {
  try {
    const data = yield call(request, `${LIGPLAATS_API}${ligplaatsId}/`, getRequestOptions());

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

export default function* watchLigplaatsSaga() {
  yield takeLatest(LOAD_DATA, fetchLigplaatsData);
}
