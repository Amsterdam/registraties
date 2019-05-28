import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { makeSelectFromObjectAppartment } from 'containers/KadastraalObject/selectors';
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
  const brkObjectIds = yield select(makeSelectFromObjectAppartment('id'));

  try {
    if (brkObjectIds && brkObjectIds.length) {
      // getting data to extract vestiging id from
      const data = yield all([
        ...brkObjectIds.map(brkObjectId =>
          call(request, `${VESTIGING_API}?kadastraal_object=${brkObjectId}`, getRequestOptions()),
        ),
      ]);

      if (!data.length || data[0].count === 0) {
        yield put(loadIdsNoResults());
      } else {
        yield put(loadIdsSuccess());

        yield all([...data.map(({ results }) => call(fetchVestigingData, results))]);
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
    yield put(incrementProgress());
  }
}

export default function* watchVestigingSaga() {
  yield takeLatest(LOAD_DATA, fetchVestigingData);
  yield takeLatest(LOAD_IDS, fetchVestigingIdData);
}
