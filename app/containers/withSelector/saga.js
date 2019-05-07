import { all, call, put, select, takeLatest, spawn } from 'redux-saga/effects';

import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import appSaga from 'containers/App/saga';
import {
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
} from './actions';
import {
  makeSelectKadastraalSubjectNPLinks,
  makeSelectKadastraalSubjectNNPLinks,
  makeSelectFromObject,
} from './selectors';

const { API_ROOT } = configuration;
const OPENBARE_RUIMTE_API = 'bag/openbareruimte/';
const VERBLIJFSOBJECT_API = 'bag/verblijfsobject/';
const HR_API = 'handelsregister/';
const BRK_OBJECT_API = 'brk/object-expand/?verblijfsobjecten__id=';
const NUMMERAANDUIDING_API = 'bag/nummeraanduiding/';
const PAND_API = 'bag/pand/';
const requestOptions = {
  headers: getAuthHeaders(),
};

export function* fetchData(action) {
  yield put(statusPending());

  const { adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId } = action.payload;

  try {
    yield call(fetchOpenbareRuimteData, openbareRuimteId);
    yield call(fetchKadastraalObjectData, adresseerbaarObjectId);
    yield call(fetchNummeraanduidingData, nummeraanduidingId, adresseerbaarObjectId);

    yield put(statusSuccess());
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
  }
}

export function* fetchOpenbareRuimteData(openbareRuimteId) {
  try {
    const data = yield call(request, `${API_ROOT}${OPENBARE_RUIMTE_API}${openbareRuimteId}/`, requestOptions);

    yield put(loadOpenbareRuimteDataSuccess(data));
  } catch (error) {
    yield put(loadOpenbareRuimteDataFailed(error));
    throw error;
  }
}

export function* fetchKadastraalObjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${API_ROOT}${BRK_OBJECT_API}${adresseerbaarObjectId}`, requestOptions);
    const { count } = data;

    if (count) {
      yield put(loadKadastraalObjectDataSuccess(data));

      yield call(fetchKadastraalSubjectNPData);
      yield call(fetchKadastraalSubjectNNPData);
      yield call(fetchVestigingData);
    } else {
      yield put(loadKadastraalObjectDataNoResults());
    }
  } catch (error) {
    yield put(loadKadastraalObjectDataFailed(error));
    throw error;
  }
}

export function* fetchKadastraalSubjectNPData() {
  try {
    const rechten = yield select(makeSelectKadastraalSubjectNPLinks());

    if (rechten) {
      const data = yield all([...rechten.map(link => call(request, link, requestOptions))]);

      yield put(loadKadastraalSubjectNPDataSuccess(data));
    } else {
      yield put(loadKadastraalSubjectNPDataNoResults());
    }
  } catch (error) {
    yield put(loadKadastraalSubjectNPDataFailed());
    throw error;
  }
}

export function* fetchKadastraalSubjectNNPData() {
  try {
    const rechten = yield select(makeSelectKadastraalSubjectNNPLinks());

    if (rechten) {
      const data = yield all([...rechten.map(link => call(request, link, requestOptions))]);

      yield put(loadKadastraalSubjectNNPDataSuccess(data));
    } else {
      yield put(loadKadastraalSubjectNNPDataNoResults());
    }
  } catch (error) {
    yield put(loadKadastraalSubjectNNPDataFailed());
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

export function* fetchNummeraanduidingData(nummeraanduidingId, adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${API_ROOT}${NUMMERAANDUIDING_API}${nummeraanduidingId}/`);

    yield put(loadNummeraanduidingSuccess(data));

    if (data.verblijfsobject) {
      yield call(fetchVerblijfsobjectData, adresseerbaarObjectId);
      yield call(fetchPandlistData, adresseerbaarObjectId);
    }
  } catch (error) {
    yield put(loadNummeraanduidingFailed(error));
    throw error;
  }
}

export function* fetchVerblijfsobjectData(adresseerbaarObjectId) {
  try {
    const data = yield call(request, `${API_ROOT}${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, requestOptions);

    yield put(loadVerblijfsobjectDataSuccess(data));
  } catch (error) {
    yield put(loadVerblijfsobjectDataFailed(error));
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
  } catch (error) {
    yield put(loadPandDataFailed(error));
    throw error;
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield spawn(appSaga);
  yield takeLatest(LOAD_BAG_DATA, fetchData);
}
