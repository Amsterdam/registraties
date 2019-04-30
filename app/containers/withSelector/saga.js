import { all, call, put, select, takeLatest, spawn } from 'redux-saga/effects';
import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import appSaga from 'containers/App/saga';
import {
  fetchingKadasterObjectData,
  loadDataFailed,
  loadHandelsregisterData,
  loadHandelsregisterDataFailed,
  loadHandelsregisterDataSuccess,
  loadKadasterObjectData,
  loadKadasterObjectDataFailed,
  loadKadasterObjectDataNoResults,
  loadKadasterObjectDataSuccess,
  loadKadasterSubjectData,
  loadKadasterSubjectDataFailed,
  loadKadasterSubjectDataSuccess,
  loadLigplaatsData,
  loadLigplaatsDataFailed,
  loadLigplaatsDataSuccess,
  loadNummeraanduidingData,
  loadNummeraanduidingFailed,
  loadNummeraanduidingSuccess,
  loadPandData,
  loadPandDataFailed,
  loadPandDataSuccess,
  loadPandlistData,
  loadPandlistDataFailed,
  loadPandlistDataNoResults,
  loadPandlistDataSuccess,
  loadVerblijfsobjectData,
  loadVerblijfsobjectDataFailed,
  loadVerblijfsobjectDataSuccess,
} from './actions';
import { selectBAG, makeSelectKadasterSubjectLinks, makeSelectFromSubject } from './selectors';
import {
  LOAD_BAG_DATA,
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_LIGPLAATS_DATA,
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_PAND_DATA,
  LOAD_PANDLIST_DATA,
  LOAD_VERBLIJFSOBJECT_DATA,
  LOAD_KADASTER_SUBJECT_DATA,
  // LOAD_HR_DATA,
} from './constants';

const { API_ROOT } = configuration;
const VERBLIJFSOBJECT_API = 'bag/verblijfsobject/';
const HR_API = 'handelsregister/persoon/';
const BRK_OBJECT_API = 'brk/object-expand/?verblijfsobjecten__id=';
// const BRK_SUBJECT_API = 'brk/subject/';
const NUMMERAANDUIDING_API = 'bag/nummeraanduiding/';
const PAND_API = 'bag/pand/';
const LIGPLAATS_API = 'bag/ligplaats/';
const requestOptions = {
  headers: getAuthHeaders(),
  mode: 'cors',
  credentials: 'include',
};

export function* fetchData(action) {
  const { adresseerbaarObjectId, nummeraanduidingId } = action.payload;

  try {
    yield put(loadKadasterObjectData(adresseerbaarObjectId));
    yield put(loadNummeraanduidingData(nummeraanduidingId));
  } catch (error) {
    yield put(loadDataFailed(error));
  }
}

export function* fetchKadastraalObjectData(action) {
  const { adresseerbaarObjectId } = action.payload;

  yield put(fetchingKadasterObjectData());

  try {
    const data = yield call(request, `${API_ROOT}${BRK_OBJECT_API}${adresseerbaarObjectId}`, requestOptions);
    const { count } = data;

    if (count) {
      yield put(loadKadasterObjectDataSuccess(data));
      yield put(loadKadasterSubjectData());
    } else {
      yield put(loadKadasterObjectDataNoResults());
    }
  } catch (error) {
    yield put(loadKadasterObjectDataFailed(error));
  }
}

export function* fetchKadastraalSubjectData() {
  try {
    const rechten = yield select(makeSelectKadasterSubjectLinks());
    const data = yield all([...rechten.map(link => call(request, link, requestOptions))]);

    yield put(loadKadasterSubjectDataSuccess(data));

    const kvkNummers = yield select(makeSelectFromSubject('kvknummer'));

    if (kvkNummers.length) {
      yield put(loadHandelsregisterData());
    }
  } catch (error) {
    yield put(loadKadasterSubjectDataFailed());
  }
}

export function* fetchHandelsregisterData() {
  const rsins = yield select(makeSelectFromSubject('rsin'));

  try {
    const data = yield all([...rsins.map(rsin => call(request, `${API_ROOT}${HR_API}${rsin}/`, requestOptions))]);
    yield put(loadHandelsregisterDataSuccess(data));
  } catch (error) {
    yield put(loadHandelsregisterDataFailed());
  }
}

export function* fetchNummeraanduidingData(action) {
  const { nummeraanduidingId } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${NUMMERAANDUIDING_API}${nummeraanduidingId}/`);

    yield put(loadNummeraanduidingSuccess(data));

    const state = yield select(selectBAG);
    const adresseerbaarObjectId = state.get('adresseerbaarObjectId');

    if (data.verblijfsobject) {
      yield put(loadVerblijfsobjectData(adresseerbaarObjectId));
      yield put(loadPandlistData(adresseerbaarObjectId));
    }

    if (data.ligplaats) {
      yield put(loadLigplaatsData(adresseerbaarObjectId));
    }
  } catch (error) {
    yield put(loadNummeraanduidingFailed(error));
  }
}

export function* fetchLigplaatsData(action) {
  const { adresseerbaarObjectId } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${LIGPLAATS_API}${adresseerbaarObjectId}/`);

    yield put(loadLigplaatsDataSuccess(data));
  } catch (error) {
    yield put(loadLigplaatsDataFailed(error));
  }
}

export function* fetchVerblijfsobjectData(action) {
  const { adresseerbaarObjectId } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, requestOptions);

    yield put(loadVerblijfsobjectDataSuccess(data));
  } catch (error) {
    yield put(loadVerblijfsobjectDataFailed(error));
  }
}

export function* fetchPandlistData(action) {
  const { adresseerbaarObjectId } = action.payload;

  try {
    const data = yield call(
      request,
      `${API_ROOT}${PAND_API}?verblijfsobjecten__id=${adresseerbaarObjectId}`,
      requestOptions,
    );

    if (data.count) {
      const { landelijk_id: landelijkId } = data.results[0];
      yield put(loadPandData(landelijkId));
    } else {
      yield put(loadPandlistDataNoResults());
    }

    yield put(loadPandlistDataSuccess());
  } catch (error) {
    yield put(loadPandlistDataFailed(error));
  }
}

export function* fetchPandData(action) {
  const { landelijkId } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${PAND_API}${landelijkId}/`);

    yield put(loadPandDataSuccess(data));
  } catch (error) {
    yield put(loadPandDataFailed(error));
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield spawn(appSaga);

  yield all([
    takeLatest(LOAD_BAG_DATA, fetchData),
    // takeLatest(LOAD_HR_DATA, fetchHandelsregisterData),
    takeLatest(LOAD_KADASTER_OBJECT_DATA, fetchKadastraalObjectData),
    takeLatest(LOAD_KADASTER_SUBJECT_DATA, fetchKadastraalSubjectData),
    takeLatest(LOAD_LIGPLAATS_DATA, fetchLigplaatsData),
    takeLatest(LOAD_NUMMERAANDUIDING_DATA, fetchNummeraanduidingData),
    takeLatest(LOAD_PAND_DATA, fetchPandData),
    takeLatest(LOAD_PANDLIST_DATA, fetchPandlistData),
    takeLatest(LOAD_VERBLIJFSOBJECT_DATA, fetchVerblijfsobjectData),
  ]);
}
