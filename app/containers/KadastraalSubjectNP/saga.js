import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import { makeSelectKadastraalSubjectLinks } from 'containers/KadastraalObject/selectors';
import { isValidSubjectNP } from 'utils';
import { incrementProgress } from 'containers/App/actions';

import { LOAD_DATA } from './constants';
import { loadDataSuccess, loadDataNoResults, loadDataFailed } from './actions';

export function* fetchKadastraalSubjectNPData() {
  const isNatuurlijkPersoon = true;

  try {
    const rechten = yield select(makeSelectKadastraalSubjectLinks(isNatuurlijkPersoon));

    if (rechten) {
      const data = yield all([...rechten.map(link => call(request, link, getRequestOptions()))]);

      const validEntities = data.filter(isValidSubjectNP);

      if (validEntities && validEntities.length) {
        yield put(loadDataSuccess(data));
      } else {
        yield put(loadDataNoResults());
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

export default function* watchKadastraalSubjectNPSaga() {
  yield takeLatest(LOAD_DATA, fetchKadastraalSubjectNPData);
}
