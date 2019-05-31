import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { makeSelectFromObjectAppartment } from 'containers/KadastraalObject/selectors';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA } from './constants';
import { loadDataFailed, loadDataNoResults, loadDataSuccess } from './actions';

const { API_ROOT } = configuration;
const HR_API = `${API_ROOT}handelsregister/`;

export function* fetchVestigingData() {
  const brkObjectIds = yield select(makeSelectFromObjectAppartment('id'));

  try {
    if (brkObjectIds && brkObjectIds.length) {
      const data = yield all([
        ...brkObjectIds.map(brkObjectId =>
          call(request, `${HR_API}vestiging/?kadastraal_object=${brkObjectId}`, getRequestOptions()),
        ),
      ]);

      if (!data.length || data[0].count === 0) {
        yield put(loadDataNoResults());
      } else {
        yield put(loadDataSuccess(data));
      }
    } else {
      yield put(loadDataNoResults());
    }
  } catch (error) {
    yield put(loadDataFailed());
    throw error;
  } finally {
    yield put(incrementProgress());
  }
}

export default function* watchVestigingSaga() {
  yield takeLatest(LOAD_DATA, fetchVestigingData);
}
