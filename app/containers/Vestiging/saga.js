import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { makeSelectFromObjectAppartment } from 'containers/withSelector/selectors';
import { incrementProgress } from 'containers/withSelector/saga';

import { LOAD_VESTIGING_DATA } from './constants';
import * as actions from './actions';

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
        yield put(actions.loadVestigingDataNoResults());
      } else {
        yield put(actions.loadVestigingDataSuccess(data));
        yield call(incrementProgress);
      }
    }
  } catch (error) {
    yield put(actions.loadVestigingDataFailed());
    throw error;
  }
}

export default function* watchVestigingSaga() {
  yield takeLatest(LOAD_VESTIGING_DATA, fetchVestigingData);
}
