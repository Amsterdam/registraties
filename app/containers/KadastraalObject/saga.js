import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';

const { API_ROOT } = configuration;
const BRK_OBJECT_API = `${API_ROOT}brk/object-expand/?verblijfsobjecten__id=`;

export function* fetchKadastraalObjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${BRK_OBJECT_API}${adresseerbaarObjectId}`, getRequestOptions());
    const { count } = data;

    if (count) {
      yield put(loadDataSuccess(data));
    } else {
      yield put(loadDataNoResults());
    }

    yield put(incrementProgress());
  } catch (error) {
    yield put(loadDataFailed(error));
    throw error;
  }
}

export default function* watchKadastraalObjectSaga() {
  yield takeLatest(LOAD_DATA, fetchKadastraalObjectData);
}
