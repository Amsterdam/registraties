import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';
import { isObject } from 'utils';

import { LOAD_LIST_DATA } from './constants';
import {
  loadListDataSuccess,
  loadListDataNoResults,
  loadListDataFailed,
  loadDataSuccess,
  loadDataFailed,
  loadDataNoResults,
} from './actions';

const { API_ROOT } = configuration;

export const PAND_API = `${API_ROOT}bag/pand/`;
export const PAND_BY_VBO_ID_API = `${PAND_API}?verblijfsobjecten__id=`;

export function* fetchPandlistData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${PAND_BY_VBO_ID_API}${adresseerbaarObjectId}`);

    if (isObject(data) && data.count) {
      yield put(loadListDataSuccess());

      const { landelijk_id: landelijkId } = data.results[0];
      yield call(fetchPandData, landelijkId);
    } else {
      yield put(loadListDataNoResults());
    }
  } catch (error) {
    yield put(loadListDataFailed(error));
    throw error;
  }
}

export function* fetchPandData(landelijkId) {
  try {
    const data = yield call(request, `${PAND_API}${landelijkId}/`);

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

export default function* watchPandSaga() {
  yield takeLatest(LOAD_LIST_DATA, fetchPandlistData);
}
