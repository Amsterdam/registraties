import { all, call, put, select, takeLatest, spawn } from 'redux-saga/effects';

import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import appSaga from 'containers/App/saga';
import searchSaga from 'containers/Search/saga';
import {
  progress,
  statusSuccess,
  statusFailed,
  statusPending,
  statusUnableToFetch,
  statusUnauthorized,
  showGlobalError,
} from 'containers/App/actions';
import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import { LOAD_BAG_DATA } from 'containers/App/constants';

import {
  loadKadastraalObjectDataFailed,
  loadKadastraalObjectDataNoResults,
  loadKadastraalObjectDataSuccess,
  loadKadastraalSubjectNPDataFailed,
  loadKadastraalSubjectNPDataNoResults,
  loadKadastraalSubjectNPDataSuccess,
  loadKadastraalSubjectNNPDataFailed,
  loadKadastraalSubjectNNPDataNoResults,
  loadKadastraalSubjectNNPDataSuccess,
  loadNummeraanduidingFailed,
  loadNummeraanduidingSuccess,
  loadPandDataFailed,
  loadPandDataSuccess,
  loadPandlistDataFailed,
  loadPandlistDataNoResults,
  loadPandlistDataSuccess,
  loadVerblijfsobjectDataFailed,
  loadVerblijfsobjectDataSuccess,
  loadVestigingDataFailed,
  loadVestigingDataNoResults,
  loadVestigingDataSuccess,
  loadOpenbareRuimteDataSuccess,
  loadOpenbareRuimteDataFailed,
  loadLigplaatsDataSuccess,
  loadLigplaatsDataFailed,
} from './actions';
import {
  makeSelectKadastraalSubjectLinks,
  makeSelectFromObject,
  makeSelectVBONummeraanduidingId,
  makeSelectLIGNummeraanduidingId,
  makeSelectOpenbareRuimteId,
} from './selectors';

const { API_ROOT } = configuration;
const OPENBARE_RUIMTE_API = 'bag/openbareruimte/';
const VERBLIJFSOBJECT_API = 'bag/verblijfsobject/';
const LIGPLAATS_API = 'bag/ligplaats/';
const HR_API = 'handelsregister/';
const BRK_OBJECT_API = 'brk/object-expand/?verblijfsobjecten__id=';
const NUMMERAANDUIDING_API = 'bag/nummeraanduiding/';
const PAND_API = 'bag/pand/';
const requestOptions = {
  headers: getAuthHeaders(),
};

export function* fetchData(action) {
  yield put(statusPending());

  const { vboId, ligId } = action.payload;

  try {
    let nummeraanduidingId;
    if (vboId) {
      yield call(fetchVerblijfsobjectData, vboId);
      yield call(fetchKadastraalObjectData, vboId);
      yield call(fetchPandlistData, vboId);

      nummeraanduidingId = yield select(makeSelectVBONummeraanduidingId());
    } else {
      yield call(fetchLigplaatsData, ligId);

      nummeraanduidingId = yield select(makeSelectLIGNummeraanduidingId());
    }

    yield call(fetchNummeraanduidingData, nummeraanduidingId);
    yield put(statusSuccess());
    yield put(progress(1));
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      // unable to fetch
      yield put(showGlobalError('unable_to_fetch'));
      yield put(statusUnableToFetch());
    } else if (error.response && error.response.status === 401) {
      // unauthorized
      const isAuthorized = yield select(makeSelectIsAuthenticated());

      if (isAuthorized) {
        yield put(showGlobalError('session_expired'));
      } else {
        yield put(showGlobalError('unauthorized'));
      }

      yield put(statusUnauthorized());
    }

    yield put(statusFailed(error));
    yield put(progress(1));
  }
}

export function* fetchOpenbareRuimteData(openbareRuimteId) {
  try {
    const data = yield call(request, `${API_ROOT}${OPENBARE_RUIMTE_API}${openbareRuimteId}/`, requestOptions);

    yield put(loadOpenbareRuimteDataSuccess(data));
  } catch (error) {
    yield put(loadOpenbareRuimteDataFailed(error));
  }
}

export function* fetchKadastraalObjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${API_ROOT}${BRK_OBJECT_API}${adresseerbaarObjectId}`, requestOptions);
    const { count } = data;

    if (count) {
      yield put(loadKadastraalObjectDataSuccess(data));
      yield put(progress(2 / 9));

      yield call(fetchKadastraalSubjectData, true);
      yield put(progress(3 / 9));

      yield call(fetchKadastraalSubjectData, false);
      yield put(progress(4 / 9));

      yield call(fetchVestigingData);
      yield put(progress(5 / 9));
    } else {
      yield put(loadKadastraalObjectDataNoResults());
    }
  } catch (error) {
    yield put(loadKadastraalObjectDataFailed(error));
    throw error;
  }
}

export function* fetchKadastraalSubjectData(isNatuurlijkPersoon) {
  try {
    const rechten = yield select(makeSelectKadastraalSubjectLinks(isNatuurlijkPersoon));

    if (rechten) {
      const data = yield all([...rechten.map(link => call(request, link, requestOptions))]);

      if (isNatuurlijkPersoon) {
        yield put(loadKadastraalSubjectNPDataSuccess(data));
      } else {
        yield put(loadKadastraalSubjectNNPDataSuccess(data));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isNatuurlijkPersoon) {
        yield put(loadKadastraalSubjectNPDataNoResults());
      } else {
        yield put(loadKadastraalSubjectNNPDataNoResults());
      }
    }
  } catch (error) {
    if (isNatuurlijkPersoon) {
      yield put(loadKadastraalSubjectNPDataFailed());
    } else {
      yield put(loadKadastraalSubjectNNPDataFailed());
    }
    throw error;
  }
}

export function* fetchVestigingData() {
  const brkObjectIds = yield select(makeSelectFromObject('id'));

  try {
    if (brkObjectIds && brkObjectIds.length) {
      const data = yield all([
        ...brkObjectIds.map(brkObjectId =>
          call(request, `${API_ROOT}${HR_API}vestiging/?kadastraal_object=${brkObjectId}`, requestOptions),
        ),
      ]);

      if (!data.length) {
        yield put(loadVestigingDataNoResults());
      }

      yield put(loadVestigingDataSuccess(data));
    }
  } catch (error) {
    yield put(loadVestigingDataFailed());
    throw error;
  }
}

export function* fetchNummeraanduidingData(nummeraanduidingId) {
  try {
    const data = yield call(request, `${API_ROOT}${NUMMERAANDUIDING_API}${nummeraanduidingId}/`);

    yield put(loadNummeraanduidingSuccess(data));

    const oprId = yield select(makeSelectOpenbareRuimteId());
    yield call(fetchOpenbareRuimteData, oprId);
  } catch (error) {
    yield put(loadNummeraanduidingFailed(error));
    throw error;
  }
}

export function* fetchVerblijfsobjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${API_ROOT}${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, requestOptions);

    yield put(loadVerblijfsobjectDataSuccess(data));
    yield put(progress(1 / 9));
  } catch (error) {
    yield put(loadVerblijfsobjectDataFailed(error));
    throw error;
  }
}

export function* fetchLigplaatsData(ligplaatsId) {
  try {
    const data = yield call(request, `${API_ROOT}${LIGPLAATS_API}${ligplaatsId}/`, requestOptions);

    yield put(loadLigplaatsDataSuccess(data));
    yield put(progress(1 / 3));
  } catch (error) {
    yield put(loadLigplaatsDataFailed(error));
    throw error;
  }
}

export function* fetchPandlistData(adresseerbaarObjectId) {
  try {
    const data = yield call(
      request,
      `${API_ROOT}${PAND_API}?verblijfsobjecten__id=${adresseerbaarObjectId}`,
      requestOptions,
    );

    if (data.count) {
      yield put(loadPandlistDataSuccess());
      yield put(progress(6 / 9));

      const { landelijk_id: landelijkId } = data.results[0];
      yield call(fetchPandData, landelijkId);
    } else {
      yield put(loadPandlistDataNoResults());
    }
  } catch (error) {
    yield put(loadPandlistDataFailed(error));
    throw error;
  }
}

export function* fetchPandData(landelijkId) {
  try {
    const data = yield call(request, `${API_ROOT}${PAND_API}${landelijkId}/`);

    yield put(loadPandDataSuccess(data));
    yield put(progress(7 / 9));
  } catch (error) {
    yield put(loadPandDataFailed(error));
    throw error;
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield spawn(appSaga);
  yield spawn(searchSaga);
  yield takeLatest(LOAD_BAG_DATA, fetchData);
}
