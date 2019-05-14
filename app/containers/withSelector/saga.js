import { all, call, put, select, spawn, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { getAuthHeaders } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';
import appSaga from 'containers/App/saga';

import * as appActions from 'containers/App/actions';
import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import { LOAD_BAG_DATA } from 'containers/App/constants';

import { storeItem, fetchItem } from 'utils/cache';

import * as actions from './actions';
import * as selectors from './selectors';

const { API_ROOT } = configuration;
const OPENBARE_RUIMTE_API = `${API_ROOT}bag/openbareruimte/`;
const VERBLIJFSOBJECT_API = `${API_ROOT}bag/verblijfsobject/`;
const LIGPLAATS_API = `${API_ROOT}bag/ligplaats/`;
const HR_API = `${API_ROOT}handelsregister/`;
const BRK_OBJECT_API = `${API_ROOT}brk/object-expand/?verblijfsobjecten__id=`;
const NUMMERAANDUIDING_API = `${API_ROOT}bag/nummeraanduiding/`;
const WOONPLAATS_API = `${API_ROOT}bag/woonplaats/`;
const PAND_API = `${API_ROOT}bag/pand/`;
const requestOptions = {
  headers: getAuthHeaders(),
};

const getBrkId = str => {
  const [brkId] = str.match(/NL\.KAD\.[a-z]+\.\d+/i);
  return brkId;
};

export function* fetchData(action) {
  yield put(appActions.statusPending());

  const { vboId, ligId } = action.payload;

  try {
    let nummeraanduidingId;
    if (vboId) {
      yield call(fetchVerblijfsobjectData, vboId);
      yield call(fetchKadastraalObjectData, vboId);
      yield call(fetchPandlistData, vboId);

      nummeraanduidingId = yield select(selectors.makeSelectVBONummeraanduidingId());
    } else if (ligId) {
      yield put(actions.loadKadastraalObjectDataNoResults());
      yield put(actions.loadKadastraalSubjectNPDataNoResults());
      yield put(actions.loadKadastraalSubjectNNPDataNoResults());
      yield call(fetchLigplaatsData, ligId);

      nummeraanduidingId = yield select(selectors.makeSelectLIGNummeraanduidingId());
    }

    yield call(fetchNummeraanduidingData, nummeraanduidingId);
    yield call(fetchWoonplaatsData);
    yield put(appActions.statusSuccess());
    yield put(appActions.progress(1));
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      // unable to fetch
      yield put(appActions.showGlobalError('unable_to_fetch'));
      yield put(appActions.statusUnableToFetch());
    } else if (error.response && error.response.status === 401) {
      // unauthorized
      const isAuthorized = yield select(makeSelectIsAuthenticated());

      if (isAuthorized) {
        yield put(appActions.showGlobalError('session_expired'));
      } else {
        yield put(appActions.showGlobalError('unauthorized'));
      }

      yield put(appActions.statusUnauthorized());
    }

    yield put(appActions.statusFailed(error));
    yield put(appActions.progress(1));
  }
}

export function* fetchOpenbareRuimteData(openbareRuimteId) {
  const cacheId = `opr_${openbareRuimteId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const openbareRuimteData = yield call(request, `${OPENBARE_RUIMTE_API}${openbareRuimteId}/`, requestOptions);
      data = yield call(storeItem, cacheId, openbareRuimteData);
    }

    yield put(actions.loadOpenbareRuimteDataSuccess(data));
  } catch (error) {
    yield put(actions.loadOpenbareRuimteDataFailed(error));
  }
}

export function* fetchKadastraalObjectData(adresseerbaarObjectId) {
  const cacheId = `brk_${adresseerbaarObjectId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const kadastraalObjectData = yield call(request, `${BRK_OBJECT_API}${adresseerbaarObjectId}`, requestOptions);
      data = yield call(storeItem, cacheId, kadastraalObjectData);
    }

    const { count } = data;

    if (count) {
      yield put(actions.loadKadastraalObjectDataSuccess(data));
      yield put(appActions.progress(2 / 9));

      yield call(fetchKadastraalSubjectData, true);
      yield put(appActions.progress(3 / 9));

      yield call(fetchKadastraalSubjectData, false);
      yield put(appActions.progress(4 / 9));

      yield call(fetchVestigingData);
      yield put(appActions.progress(5 / 9));
    } else {
      yield put(actions.loadKadastraalObjectDataNoResults());
    }
  } catch (error) {
    yield put(actions.loadKadastraalObjectDataFailed(error));
    throw error;
  }
}

export function* fetchKadastraalSubjectData(isNatuurlijkPersoon) {
  const cacheId = 'brk';

  try {
    const rechten = yield select(selectors.makeSelectKadastraalSubjectLinks(isNatuurlijkPersoon));

    if (rechten) {
      let data = yield all([...rechten.map(link => call(fetchItem, `${cacheId}_${getBrkId(link)}`))]);
      const rechtenNotInCache = data
        .map((entry, index) => {
          if (!entry) {
            return rechten[index];
          }
          return null;
        })
        .filter(Boolean);

      if (rechtenNotInCache.length) {
        data = yield all([...rechtenNotInCache.map(link => call(request, link, requestOptions))]);
        data = yield all([
          // eslint-disable-next-line no-underscore-dangle
          ...data.map(subjectData => call(storeItem, `${cacheId}_${subjectData.id}`, subjectData)),
        ]);
      }

      if (isNatuurlijkPersoon) {
        yield put(actions.loadKadastraalSubjectNPDataSuccess(data));
      } else {
        yield put(actions.loadKadastraalSubjectNNPDataSuccess(data));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isNatuurlijkPersoon) {
        yield put(actions.loadKadastraalSubjectNPDataNoResults());
      } else {
        yield put(actions.loadKadastraalSubjectNNPDataNoResults());
      }
    }
  } catch (error) {
    if (isNatuurlijkPersoon) {
      yield put(actions.loadKadastraalSubjectNPDataFailed());
    } else {
      yield put(actions.loadKadastraalSubjectNNPDataFailed());
    }
    throw error;
  }
}

export function* fetchVestigingData() {
  const cacheId = 'ves_';
  const brkObjectIds = yield select(selectors.makeSelectFromObject('id'));

  try {
    if (brkObjectIds && brkObjectIds.length) {
      let data = yield all([...brkObjectIds.map(brkObjectId => call(fetchItem, `${cacheId}_${brkObjectId}`))]);
      const brkObjectIdsNotInCache = data
        .map((entry, index) => {
          if (!entry) {
            return brkObjectIds[index];
          }
          return null;
        })
        .filter(Boolean);

      if (brkObjectIdsNotInCache.length) {
        data = yield all([
          ...brkObjectIds.map(brkObjectId =>
            call(request, `${HR_API}vestiging/?kadastraal_object=${brkObjectId}`, requestOptions),
          ),
        ]);
        data = yield all([
          ...data.map(brkObjectData =>
            // eslint-disable-next-line no-underscore-dangle
            call(storeItem, `${cacheId}_${getBrkId(brkObjectData._links.self.href)}`, brkObjectData),
          ),
        ]);
      }

      if (!data.length) {
        yield put(actions.loadVestigingDataNoResults());
      }

      yield put(actions.loadVestigingDataSuccess(data));
    }
  } catch (error) {
    yield put(actions.loadVestigingDataFailed());
    throw error;
  }
}

export function* fetchNummeraanduidingData(nummeraanduidingId) {
  const cacheId = `num_${nummeraanduidingId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const nummeraanduidingData = yield call(request, `${NUMMERAANDUIDING_API}${nummeraanduidingId}/`);
      data = yield call(storeItem, cacheId, nummeraanduidingData);
    }

    yield put(actions.loadNummeraanduidingSuccess(data));

    const oprId = yield select(selectors.makeSelectOpenbareRuimteId());
    yield call(fetchOpenbareRuimteData, oprId);
  } catch (error) {
    yield put(actions.loadNummeraanduidingFailed(error));
    throw error;
  }
}

export function* fetchWoonplaatsData() {
  const woonplaatsId = yield select(selectors.makeSelectWoonplaatsId());
  const cacheId = `wpl_${woonplaatsId}`;

  if (!woonplaatsId) {
    yield put(actions.loadWoonplaatsDataNoResults());
    return;
  }

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const woonplaatsData = yield call(request, `${WOONPLAATS_API}${woonplaatsId}/`);
      data = yield call(storeItem, cacheId, woonplaatsData);
    }

    yield put(actions.loadWoonplaatsDataSuccess(data));
  } catch (error) {
    yield put(actions.loadWoonplaatsDataFailed(error));
    throw error;
  }
}

export function* fetchVerblijfsobjectData(adresseerbaarObjectId) {
  const cacheId = `vbo_${adresseerbaarObjectId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const vboData = yield call(request, `${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, requestOptions);
      data = yield call(storeItem, cacheId, vboData);
    }

    yield put(actions.loadVerblijfsobjectDataSuccess(data));
    yield put(appActions.progress(1 / 9));
  } catch (error) {
    yield put(actions.loadVerblijfsobjectDataFailed(error));
    throw error;
  }
}

export function* fetchLigplaatsData(ligplaatsId) {
  const cacheId = `lig_${ligplaatsId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const ligData = yield call(request, `${LIGPLAATS_API}${ligplaatsId}/`, requestOptions);
      data = yield call(storeItem, cacheId, ligData);
    }

    yield put(actions.loadLigplaatsDataSuccess(data));
    yield put(appActions.progress(1 / 3));
  } catch (error) {
    yield put(actions.loadLigplaatsDataFailed(error));
    throw error;
  }
}

export function* fetchPandlistData(adresseerbaarObjectId) {
  const cacheId = `pandlist_${adresseerbaarObjectId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const pandlistData = yield call(
        request,
        `${PAND_API}?verblijfsobjecten__id=${adresseerbaarObjectId}`,
        requestOptions,
      );
      data = yield call(storeItem, cacheId, pandlistData);
    }

    if (data.count) {
      yield put(actions.loadPandlistDataSuccess());
      yield put(appActions.progress(6 / 9));

      const { landelijk_id: landelijkId } = data.results[0];
      yield call(fetchPandData, landelijkId);
    } else {
      yield put(actions.loadPandlistDataNoResults());
    }
  } catch (error) {
    yield put(actions.loadPandlistDataFailed(error));
    throw error;
  }
}

export function* fetchPandData(landelijkId) {
  const cacheId = `pand_${landelijkId}`;

  try {
    let data = yield call(fetchItem, cacheId);

    if (!data) {
      const pandData = yield call(request, `${PAND_API}${landelijkId}/`);
      data = yield call(storeItem, cacheId, pandData);
    }

    yield put(actions.loadPandDataSuccess(data));
    yield put(appActions.progress(7 / 9));
  } catch (error) {
    yield put(actions.loadPandDataFailed(error));
    throw error;
  }
}

export default function* watchAccommodationObjectPageSaga() {
  yield spawn(appSaga);
  yield takeLatest(LOAD_BAG_DATA, fetchData);
}
