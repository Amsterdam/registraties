import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_LIST_DATA } from './constants';
import {
  loadlistDataSuccess,
  loadlistDataNoResults,
  loadlistDataFailed,
  loadDataSuccess,
  loadDataFailed,
} from './actions';

const { API_ROOT } = configuration;
const PAND_API = `${API_ROOT}bag/pand/`;

export function* fetchPandlistData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${PAND_API}?verblijfsobjecten__id=${adresseerbaarObjectId}`, getRequestOptions());

    if (data.count) {
      yield put(loadlistDataSuccess());

      const { landelijk_id: landelijkId } = data.results[0];
      yield call(fetchPandData, landelijkId);
    } else {
      yield put(loadlistDataNoResults());
    }
  } catch (error) {
    yield put(loadlistDataFailed(error));
    throw error;
  }
}

export function* fetchPandData(landelijkId) {
  try {
    const data = yield call(request, `${PAND_API}${landelijkId}/`);

    yield put(loadDataSuccess(data));
    yield put(incrementProgress());
  } catch (error) {
    yield put(loadDataFailed(error));
    throw error;
  }
}

export default function* watchPandSaga() {
  yield takeLatest(LOAD_LIST_DATA, fetchPandlistData);
}
