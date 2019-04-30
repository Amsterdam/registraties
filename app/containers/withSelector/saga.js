import { all, call, put, select, takeLatest, spawn } from 'redux-saga/effects';
import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import appSaga from 'containers/App/saga';
import {
  loadDataFailed,
  loadHandelsregisterData,
  // loadHandelsregisterDataFailed,
  // loadHandelsregisterDataSuccess,
  loadKadastraalObjectData,
  loadKadastraalObjectDataFailed,
  loadKadastraalObjectDataNoResults,
  loadKadastraalObjectDataSuccess,
  loadKadastraalSubjectData,
  loadKadastraalSubjectDataFailed,
  loadKadastraalSubjectDataSuccess,
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
  loadVestigingData,
  loadVestigingDataSuccess,
  loadVestigingDataFailed,
} from './actions';
import { selectBAG, makeSelectKadastraalSubjectLinks, makeSelectFromSubject, makeSelectFromObject } from './selectors';
import {
  LOAD_BAG_DATA,
  LOAD_KADASTRAAL_OBJECT_DATA,
  LOAD_KADASTRAAL_SUBJECT_DATA,
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_PAND_DATA,
  LOAD_PANDLIST_DATA,
  LOAD_VERBLIJFSOBJECT_DATA,
  // LOAD_HR_DATA,
  LOAD_VESTIGING_DATA,
} from './constants';

const { API_ROOT } = configuration;
const VERBLIJFSOBJECT_API = 'bag/verblijfsobject/';
const HR_API = 'handelsregister/';
const BRK_OBJECT_API = 'brk/object-expand/?verblijfsobjecten__id=';
// const BRK_SUBJECT_API = 'brk/subject/';
const NUMMERAANDUIDING_API = 'bag/nummeraanduiding/';
const PAND_API = 'bag/pand/';
const requestOptions = {
  headers: getAuthHeaders(),
  mode: 'cors',
  credentials: 'include',
};

export function* fetchData(action) {
  const { adresseerbaarObjectId, nummeraanduidingId } = action.payload;

  try {
    yield put(loadKadastraalObjectData(adresseerbaarObjectId));
    yield put(loadNummeraanduidingData(nummeraanduidingId));
  } catch (error) {
    yield put(loadDataFailed(error));
  }
}

export function* fetchKadastraalObjectData(action) {
  const { adresseerbaarObjectId } = action.payload;

  try {
    const data = yield call(request, `${API_ROOT}${BRK_OBJECT_API}${adresseerbaarObjectId}`, requestOptions);
    const { count } = data;

    if (count) {
      yield put(loadKadastraalObjectDataSuccess(data));
      yield put(loadKadastraalSubjectData());
      yield put(loadVestigingData());
    } else {
      yield put(loadKadastraalObjectDataNoResults());
    }
  } catch (error) {
    yield put(loadKadastraalObjectDataFailed(error));
  }
}

export function* fetchKadastraalSubjectData() {
  try {
    const rechten = yield select(makeSelectKadastraalSubjectLinks());
    const data = yield all([...rechten.map(link => call(request, link, requestOptions))]);

    yield put(loadKadastraalSubjectDataSuccess(data));

    const kvkNummers = yield select(makeSelectFromSubject('kvknummer'));

    if (kvkNummers.length) {
      yield put(loadHandelsregisterData(kvkNummers));
    }
  } catch (error) {
    yield put(loadKadastraalSubjectDataFailed());
  }
}

export function* fetchVestigingData() {
  const brkObjectIds = yield select(makeSelectFromObject('id'));

  try {
    const data = yield all([
      ...brkObjectIds.map(brkObjectId =>
        call(request, `${API_ROOT}${HR_API}vestiging/?kadastraal_object=${brkObjectId}/`, requestOptions),
      ),
    ]);

    yield put(loadVestigingDataSuccess(data));
  } catch (error) {
    yield put(loadVestigingDataFailed());
  }
}

// export function* fetchHandelsregisterData() {
//   const rsins = yield select(makeSelectFromSubject('rsin'));

//   try {
//     const data = yield all([...rsins.map(rsin => call(request, `${API_ROOT}${HR_API}${rsin}/`, requestOptions))]);
//     yield put(loadHandelsregisterDataSuccess(data));
//   } catch (error) {
//     yield put(loadHandelsregisterDataFailed());
//   }
// }

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
  } catch (error) {
    yield put(loadNummeraanduidingFailed(error));
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
    takeLatest(LOAD_KADASTRAAL_OBJECT_DATA, fetchKadastraalObjectData),
    takeLatest(LOAD_KADASTRAAL_SUBJECT_DATA, fetchKadastraalSubjectData),
    takeLatest(LOAD_NUMMERAANDUIDING_DATA, fetchNummeraanduidingData),
    takeLatest(LOAD_PAND_DATA, fetchPandData),
    takeLatest(LOAD_PANDLIST_DATA, fetchPandlistData),
    takeLatest(LOAD_VERBLIJFSOBJECT_DATA, fetchVerblijfsobjectData),
    takeLatest(LOAD_VESTIGING_DATA, fetchVestigingData),
  ]);
}
