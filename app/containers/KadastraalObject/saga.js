import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';

const { API_ROOT } = configuration;
const BRK_OBJECT_API = `${API_ROOT}brk/object-expand/`;

export const isKadastraalNummer = id => id.startsWith('NL.KAD');

export function* fetchKadastraalObjectData(adresseerbaarObjectId) {
  const endpoint = isKadastraalNummer(adresseerbaarObjectId)
    ? `${BRK_OBJECT_API}${adresseerbaarObjectId}/`
    : `${BRK_OBJECT_API}?verblijfsobjecten__id=${adresseerbaarObjectId}`;

  try {
    const data = yield call(request, endpoint, getRequestOptions());

    if (data) {
      const { count, id } = data;

      if ((count && count > 0) || id) {
        yield put(loadDataSuccess(data));
      } else {
        yield put(loadDataNoResults());
      }
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

export default function* watchKadastraalObjectSaga() {
  yield takeLatest(LOAD_DATA, fetchKadastraalObjectData);
}
