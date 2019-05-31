import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import { makeSelectWoonplaatsId } from 'containers/Nummeraanduiding/selectors';
import { incrementProgress } from 'containers/App/actions';

import { loadDataSuccess, loadDataFailed, loadDataNoResults } from './actions';
import { LOAD_DATA } from './constants';

const { API_ROOT } = configuration;
const WOONPLAATS_API = `${API_ROOT}bag/woonplaats/`;

export function* fetchWoonplaatsData() {
  const woonplaatsId = yield select(makeSelectWoonplaatsId());

  if (!woonplaatsId) {
    yield put(loadDataNoResults());
    return;
  }

  try {
    const data = yield call(request, `${WOONPLAATS_API}${woonplaatsId}/`);

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

export default function* watchWoonplaatsSaga() {
  yield takeLatest(LOAD_DATA, fetchWoonplaatsData);
}
