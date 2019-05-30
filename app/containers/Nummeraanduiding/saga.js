import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';
import { LOAD_DATA } from './constants';

const { API_ROOT } = configuration;
const NUMMERAANDUIDING_API = `${API_ROOT}bag/nummeraanduiding/`;

export function* fetchNummeraanduidingData(nummeraanduidingId) {
  try {
    const data = yield call(request, `${NUMMERAANDUIDING_API}${nummeraanduidingId}/`);

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

export default function* watchNummeraanduidingSaga() {
  yield takeLatest(LOAD_DATA, fetchNummeraanduidingData);
}
