import { call, put, select, spawn, takeLatest } from 'redux-saga/effects';

import appSaga from 'containers/App/saga';
import {
  maxProgressCount,
  resetProgress,
  showGlobalError,
  statusFailed,
  statusPending,
  statusSuccess,
  statusUnableToFetch,
  statusUnauthorized,
} from 'containers/App/actions';
import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import { makeSelectOpenbareRuimteId } from 'containers/Nummeraanduiding/selectors';
import { LOAD_BAG_DATA } from 'containers/App/constants';

import { loadDataNoResults as loadKadastraalObjectDataNoResults } from 'containers/KadastraalObject/actions';
import { loadDataNoResults as loadKadastraalSubjectNPDataNoResults } from 'containers/KadastraalSubjectNP/actions';
import { loadDataNoResults as loadKadastraalSubjectNNPDataNoResults } from 'containers/KadastraalSubjectNNP/actions';

import { fetchKadastraalObjectData } from 'containers/KadastraalObject/saga';
import { fetchKadastraalSubjectNNPData } from 'containers/KadastraalSubjectNNP/saga';
import { fetchKadastraalSubjectNPData } from 'containers/KadastraalSubjectNP/saga';
import { fetchLigplaatsData } from 'containers/Ligplaats/saga';
import { fetchNummeraanduidingData } from 'containers/Nummeraanduiding/saga';
import { fetchOpenbareRuimteData } from 'containers/OpenbareRuimte/saga';
import { fetchPandlistData } from 'containers/Pand/saga';
import { fetchVerblijfsobjectData, fetchVerblijfsobjectId } from 'containers/Verblijfsobject/saga';
import { fetchVestigingData } from 'containers/Vestiging/saga';
import { fetchWoonplaatsData } from 'containers/Woonplaats/saga';

import { makeSelectVBONummeraanduidingId } from 'containers/Verblijfsobject/selectors';
import { makeSelectLIGNummeraanduidingId } from 'containers/Ligplaats/selectors';

export function* fetchData(action) {
  yield put(resetProgress());
  yield put(statusPending());

  const { vboId, ligId, brkId } = action.payload;

  try {
    let nummeraanduidingId;
    let landelijkVboId;

    if (brkId) {
      yield put(maxProgressCount(10));

      // fetch vboId from VERBLIJFSOBJECT_API with brkId param
      landelijkVboId = yield* fetchVerblijfsobjectId(brkId);
    } else {
      yield put(maxProgressCount(9));
    }

    const vboIdentifier = vboId || landelijkVboId;

    if (vboIdentifier) {
      yield call(fetchKadastraalObjectData, vboIdentifier);
      yield call(fetchVerblijfsobjectData, vboIdentifier);
      yield call(fetchKadastraalSubjectNNPData);
      yield call(fetchKadastraalSubjectNPData);
      yield call(fetchVestigingData);
      yield call(fetchPandlistData, vboIdentifier);

      nummeraanduidingId = yield select(makeSelectVBONummeraanduidingId());
    } else if (ligId) {
      yield put(maxProgressCount(4));

      yield call(fetchLigplaatsData, ligId);

      yield put(loadKadastraalObjectDataNoResults());
      yield put(loadKadastraalSubjectNPDataNoResults());
      yield put(loadKadastraalSubjectNNPDataNoResults());

      nummeraanduidingId = yield select(makeSelectLIGNummeraanduidingId());
    }

    yield call(fetchNummeraanduidingData, nummeraanduidingId);
    yield call(fetchWoonplaatsData);

    const oprId = yield select(makeSelectOpenbareRuimteId());
    yield call(fetchOpenbareRuimteData, oprId);

    yield put(statusSuccess());
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      // unable to fetch
      yield put(showGlobalError('unable_to_fetch'));
      yield put(statusUnableToFetch());
    } else if (error.response && error.response.status === 401) {
      // unauthorized
      const isAuthenticated = yield select(makeSelectIsAuthenticated());

      if (isAuthenticated) {
        yield put(showGlobalError('session_expired'));
      } else {
        yield put(showGlobalError('unauthorized'));
      }

      yield put(statusUnauthorized());
    } else if (error.response && error.response.status === 404) {
      yield put(showGlobalError('resource_not_found'));
    } else if (error.response && error.response.status === 500) {
      yield put(showGlobalError('server_error'));
    } else if (error.response && error.response.status === 503) {
      yield put(showGlobalError('service_unavailable'));
    } else {
      yield put(showGlobalError('unknown_error'));
    }

    yield put(statusFailed(error));
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield spawn(appSaga);
  yield takeLatest(LOAD_BAG_DATA, fetchData);
}
