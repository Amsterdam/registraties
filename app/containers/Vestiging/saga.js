import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { makeSelectVerblijfsobjectId } from 'containers/Verblijfsobject/selectors';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA, LOAD_IDS } from './constants';
import {
  loadDataFailed,
  loadDataNoResults,
  loadDataSuccess,
  loadIdsFailed,
  loadIdsNoResults,
  loadIdsSuccess,
} from './actions';

const { API_ROOT } = configuration;
const VESTIGING_API = `${API_ROOT}handelsregister/vestiging/`;

export function* fetchVestigingIdData() {
  const vboId = yield select(makeSelectVerblijfsobjectId);

  try {
    if (vboId) {
      // getting data to extract vestiging id from
      const data = yield call(request, `${VESTIGING_API}?verblijfsobject=${vboId}`, getRequestOptions());

      if (!data.count || !data.results.length) {
        yield put(loadIdsNoResults());
      } else {
        yield put(loadIdsSuccess());

        yield call(fetchVestigingData, data.results);
      }
    } else {
      yield put(loadIdsNoResults());
    }
  } catch (error) {
    yield put(loadIdsFailed(error));
    throw error;
  } finally {
    yield put(incrementProgress());
  }
}

export function* fetchVestigingData(vestigingIdData) {
  try {
    const vestigingIds = vestigingIdData.map(({ _links: { self: { href } } }) =>
      href.replace(/(?:[^\d]+)(\d+)(?:[^\d]*)/, '$1'),
    );

    const data = yield all([
      ...vestigingIds.map(vestigingId => call(request, `${VESTIGING_API}${vestigingId}/`, getRequestOptions())),
    ]);

    if (!data || !data.length) {
      yield put(loadDataNoResults());
    } else {
      yield put(loadDataSuccess(data));
    }
  } catch (error) {
    yield put(loadDataFailed(error));
    throw error;
  } finally {
    // this saga shouldn't report progress, because it is called on the condition that the fetchVestigingIdData saga
    // yields data
  }
}

export default function* watchVestigingSaga() {
  yield takeLatest(LOAD_DATA, fetchVestigingData);
  yield takeLatest(LOAD_IDS, fetchVestigingIdData);
}
