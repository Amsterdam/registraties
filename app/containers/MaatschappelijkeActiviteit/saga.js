import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import { incrementProgress } from 'containers/App/actions';
import { makeSelectMaatschappelijkeActiviteitIds } from 'containers/Vestiging/selectors';
import { isValidMaatschappelijkeActiviteit } from 'utils';

import { LOAD_DATA } from './constants';
import { loadDataFailed, loadDataNoResults, loadDataSuccess } from './actions';

const { API_ROOT } = configuration;
export const MA_API = `${API_ROOT}handelsregister/maatschappelijkeactiviteit/`;

export function* fetchMaatschappelijkeActiviteitData() {
  const maIds = yield select(makeSelectMaatschappelijkeActiviteitIds);

  try {
    if (maIds) {
      const data = yield all([...maIds.map(maId => call(request, `${MA_API}${maId}/`, getRequestOptions()))]);
      const validEntities = data.filter(isValidMaatschappelijkeActiviteit);

      if (validEntities && validEntities.length) {
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

export default function* watchMaatschappelijkeActiviteitSaga() {
  yield takeLatest(LOAD_DATA, fetchMaatschappelijkeActiviteitData);
}
