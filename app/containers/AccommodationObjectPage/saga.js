import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import {
  loadBRKDataSuccess,
  loadBRKDataFailed,
  loadNummeraanduidingData,
  loadNummeraanduidingSuccess,
  loadNummeraanduidingFailed,
  loadPandlistDataSuccess,
  loadPandlistDataFailed,
  loadPandData,
  loadPandDataFailed,
  loadPandDataSuccess,
  loadOpenbareRuimteData,
  loadOpenbareRuimteDataSuccess,
  loadOpenbareRuimteDataFailed,
  loadBRKData,
  loadLigplaatsData,
  loadLigplaatsDataFailed,
  loadLigplaatsDataSuccess,
  loadVerblijfsobjectData,
  loadVerblijfsobjectDataSuccess,
  loadVerblijfsobjectDataFailed,
  loadPandlistData,
  loadDataSuccess,
  loadDataFailed,
} from './actions';
import { selectBAG } from './selectors';
import {
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_PAND_DATA,
  LOAD_OPENBARE_RUIMTE_DATA,
  LOAD_PANDLIST_DATA,
  LOAD_LIGPLAATS_DATA,
  LOAD_VERBLIJFSOBJECT_DATA,
  LOAD_BAG_DATA,
} from './constants';

const { API_ROOT } = configuration;
const VERBLIJFSOBJECT_API = 'bag/verblijfsobject/';
// const HR_API = 'handelsregister/typeahead/';
const BRK_API = 'brk/object-expand/?verblijfsobjecten__id=';
const NUMMERAANDUIDING_API = 'bag/nummeraanduiding/';
const OPENBARE_RUIMTE_API = 'bag/openbareruimte/';
const PAND_API = 'bag/pand/';
const LIGPLAATS_API = 'bag/ligplaats/';

export function* fetchData(action) {
  const { adresseerbaarobjectId, nummeraanduidingId, openbareruimteId } = action.payload;

  try {
    yield all([
      put(loadBRKData(adresseerbaarobjectId)),
      put(loadNummeraanduidingData(nummeraanduidingId)),
      put(loadOpenbareRuimteData(openbareruimteId)),
      put(loadDataSuccess()),
    ]);
  } catch (error) {
    yield put(loadDataFailed(error));
  }
}

export function* fetchBRKData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${BRK_API}${id}`);

    yield put(loadBRKDataSuccess(data));
  } catch (error) {
    yield put(loadBRKDataFailed(error));
  }
}

export function* fetchNummeraanduidingData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${NUMMERAANDUIDING_API}${id}/`);
    const state = yield select(selectBAG);
    const { adresseerbaarobject_id: adresseerbaarobjectId } = state.get('data');

    if (data.verblijfsobject) {
      yield put(loadVerblijfsobjectData(adresseerbaarobjectId));
      yield put(loadPandlistData(adresseerbaarobjectId));
    }

    if (data.ligplaats) {
      yield put(loadLigplaatsData(adresseerbaarobjectId));
    }

    yield put(loadNummeraanduidingSuccess(data));
  } catch (error) {
    yield put(loadNummeraanduidingFailed(error));
  }
}

export function* fetchLigplaatsData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${LIGPLAATS_API}${id}/`);

    yield put(loadLigplaatsDataSuccess(data));
  } catch (error) {
    yield put(loadLigplaatsDataFailed(error));
  }
}

export function* fetchVerblijfsobjectData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${VERBLIJFSOBJECT_API}${id}/`);

    yield put(loadVerblijfsobjectDataSuccess(data));
  } catch (error) {
    yield put(loadVerblijfsobjectDataFailed(error));
  }
}

export function* fetchPandlistData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${PAND_API}?verblijfsobjecten__id=${id}`);

    if (data.count) {
      const { landelijk_id: landelijkId } = data.results[0];
      yield put(loadPandData(landelijkId));
    }

    yield put(loadPandlistDataSuccess());
  } catch (error) {
    yield put(loadPandlistDataFailed(error));
  }
}

export function* fetchPandData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${PAND_API}${id}`);

    yield put(loadPandDataSuccess(data));
  } catch (error) {
    yield put(loadPandDataFailed(error));
  }
}

export function* fetchOpenbareRuimteData(action) {
  const { id } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${OPENBARE_RUIMTE_API}${id}/`);

    yield put(loadOpenbareRuimteDataSuccess(data));
  } catch (error) {
    yield put(loadOpenbareRuimteDataFailed(error));
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield all([
    takeLatest(LOAD_BAG_DATA, fetchData),
    takeLatest(LOAD_KADASTER_OBJECT_DATA, fetchBRKData),
    takeLatest(LOAD_NUMMERAANDUIDING_DATA, fetchNummeraanduidingData),
    takeLatest(LOAD_PANDLIST_DATA, fetchPandlistData),
    takeLatest(LOAD_PAND_DATA, fetchPandData),
    takeLatest(LOAD_OPENBARE_RUIMTE_DATA, fetchOpenbareRuimteData),
    takeLatest(LOAD_LIGPLAATS_DATA, fetchLigplaatsData),
    takeLatest(LOAD_VERBLIJFSOBJECT_DATA, fetchVerblijfsobjectData),
  ]);
}
