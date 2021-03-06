import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { loadDataFailed, loadDataSuccess, loadIdNoResults, loadIdSuccess, loadIdFailed } from './actions';

import { LOAD_DATA, LOAD_ID } from './constants';

const { API_ROOT } = configuration;
export const VERBLIJFSOBJECT_API = `${API_ROOT}bag/verblijfsobject/`;
export const API_BY_BRK_OBJECT_ID = `${VERBLIJFSOBJECT_API}?kadastrale_objecten__id=`;

// eslint-disable-next-line consistent-return
export function* fetchVerblijfsobjectId(adresseerbaarObjectId) {
  try {
    const data = yield call(
      request,
      `${API_BY_BRK_OBJECT_ID}${encodeURIComponent(adresseerbaarObjectId)}`,
      getRequestOptions(),
    );

    if (!data.count) {
      yield put(loadIdNoResults());
    } else {
      const { results } = data;
      yield put(loadIdSuccess(data));
      return results[0].landelijk_id;
    }
  } catch (error) {
    yield put(loadIdFailed(error));
    throw error;
  } finally {
    yield put(incrementProgress());
  }
}

export function* fetchVerblijfsobjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, getRequestOptions());

    yield put(loadDataSuccess(data));
  } catch (error) {
    yield put(loadDataFailed(error));
    throw error;
  } finally {
    yield put(incrementProgress());
  }
}

export default function* watchVerblijfsobjectSaga() {
  yield all([takeLatest(LOAD_DATA, fetchVerblijfsobjectData), takeLatest(LOAD_ID, fetchVerblijfsobjectId)]);
}
