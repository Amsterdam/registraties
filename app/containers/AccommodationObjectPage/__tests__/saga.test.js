import { testSaga } from 'redux-saga-test-plan';

import appSaga from 'containers/App/saga';
import * as appActions from 'containers/App/actions';
import * as appConstants from 'containers/App/constants';
import * as appSelectors from 'containers/App/selectors';

import * as kadastraalObjectSaga from 'containers/KadastraalObject/saga';
import { fetchKadastraalSubjectNNPData } from 'containers/KadastraalSubjectNNP/saga';
import { fetchKadastraalSubjectNPData } from 'containers/KadastraalSubjectNP/saga';
import { fetchLigplaatsData } from 'containers/Ligplaats/saga';
import { fetchNummeraanduidingData } from 'containers/Nummeraanduiding/saga';
import { fetchOpenbareRuimteData } from 'containers/OpenbareRuimte/saga';
import { fetchPandlistData } from 'containers/Pand/saga';
import { fetchVerblijfsobjectData, fetchVerblijfsobjectId } from 'containers/Verblijfsobject/saga';
import { fetchVestigingIdData } from 'containers/Vestiging/saga';
import { fetchWoonplaatsData } from 'containers/Woonplaats/saga';
import { fetchMaatschappelijkeActiviteitData } from 'containers/MaatschappelijkeActiviteit/saga';

import * as verblijfsobjectSelectors from 'containers/Verblijfsobject/selectors';
import { makeSelectOpenbareRuimteId } from 'containers/Nummeraanduiding/selectors';

import { loadDataNoResults as loadKadastraalObjectDataNoResults } from 'containers/KadastraalObject/actions';
import { loadDataNoResults as loadKadastraalSubjectNPDataNoResults } from 'containers/KadastraalSubjectNP/actions';
import { loadDataNoResults as loadKadastraalSubjectNNPDataNoResults } from 'containers/KadastraalSubjectNNP/actions';
import { loadDataNoResults as loadNummeraanduidingDataNoResults } from 'containers/Nummeraanduiding/actions';
import { loadDataNoResults as loadWoonplaatsDataNoResults } from 'containers/Woonplaats/actions';
import { loadDataNoResults as loadOpenbareRuimteDataNoResults } from 'containers/OpenbareRuimte/actions';
import { makeSelectLIGNummeraanduidingId } from 'containers/Ligplaats/selectors';

import watchAccommodationObjectPageSaga, { fetchData } from '../saga';

jest.mock('@sentry/browser', () => {
  const actual = jest.requireActual('@sentry/browser');

  return {
    __esModule: true,
    ...actual,
    captureException: jest.fn(() => 'some random string 456'),
  };
});

describe('containers/AccommodationObjectPage/saga', () => {
  const action = { type: appConstants.LOAD_BAG_DATA };

  it('should watch "LOAD_BAG_DATA" and call fetchData', () => {
    testSaga(watchAccommodationObjectPageSaga)
      .next()
      .spawn(appSaga)
      .next()
      .takeLatest(appConstants.LOAD_BAG_DATA, fetchData)
      .next(action)
      .isDone();
  });

  it('should retrieve data with vboId as source ID', () => {
    const vboId = '0363010001008599';
    const nummeraanduidingId = '0363200000201429';
    const oprId = '0363300000004297';

    // when nummeraanduidingId can be resolved
    testSaga(fetchData, { ...action, payload: { vboId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(10))
      .next()
      .call(kadastraalObjectSaga.fetchKadastraalObjectData, vboId)
      .next()
      .call(fetchVerblijfsobjectData, vboId)
      .next()
      .call(fetchKadastraalSubjectNNPData)
      .next()
      .call(fetchKadastraalSubjectNPData)
      .next()
      .call(fetchVestigingIdData)
      .next()
      .call(fetchMaatschappelijkeActiviteitData)
      .next()
      .call(fetchPandlistData, vboId)
      .next()
      .select(verblijfsobjectSelectors.makeSelectVBONummeraanduidingId)
      .next(nummeraanduidingId)
      .call(fetchNummeraanduidingData, nummeraanduidingId)
      .next()
      .call(fetchWoonplaatsData)
      .next()
      .select(makeSelectOpenbareRuimteId)
      .next(oprId)
      .call(fetchOpenbareRuimteData, oprId)
      .next()
      .put(appActions.statusSuccess())
      .next()
      .isDone();

    // when nummeraanduidingId can NOT be resolved
    testSaga(fetchData, { ...action, payload: { vboId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(10))
      .next()
      .call(kadastraalObjectSaga.fetchKadastraalObjectData, vboId)
      .next()
      .call(fetchVerblijfsobjectData, vboId)
      .next()
      .call(fetchKadastraalSubjectNNPData)
      .next()
      .call(fetchKadastraalSubjectNPData)
      .next()
      .call(fetchVestigingIdData)
      .next()
      .call(fetchMaatschappelijkeActiviteitData)
      .next()
      .call(fetchPandlistData, vboId)
      .next()
      .select(verblijfsobjectSelectors.makeSelectVBONummeraanduidingId)
      .next()
      .put(loadNummeraanduidingDataNoResults())
      .next()
      .put(loadWoonplaatsDataNoResults())
      .next()
      .put(loadOpenbareRuimteDataNoResults())
      .next()
      .put(appActions.showGlobalError('no_vbo_data_available'))
      .next()
      .isDone();
  });

  it('should retrieve data with brkId as source ID', () => {
    const vboId = '0363010000980007';
    const brkId = 'NL.KAD.OnroerendeZaak.11530351210002';
    const nummeraanduidingId = '0363200000459435';
    const oprId = '0363300000003480';

    // when nummeraanduidingId can be resolved
    testSaga(fetchData, { ...action, payload: { brkId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(11))
      .next()
      .call(fetchVerblijfsobjectId, brkId)
      .next(vboId)
      .call(kadastraalObjectSaga.fetchKadastraalObjectData, vboId)
      .next()
      .call(fetchVerblijfsobjectData, vboId)
      .next()
      .call(fetchKadastraalSubjectNNPData)
      .next()
      .call(fetchKadastraalSubjectNPData)
      .next()
      .call(fetchVestigingIdData)
      .next()
      .call(fetchMaatschappelijkeActiviteitData)
      .next()
      .call(fetchPandlistData, vboId)
      .next()
      .select(verblijfsobjectSelectors.makeSelectVBONummeraanduidingId)
      .next(nummeraanduidingId)
      .call(fetchNummeraanduidingData, nummeraanduidingId)
      .next()
      .call(fetchWoonplaatsData)
      .next()
      .select(makeSelectOpenbareRuimteId)
      .next(oprId)
      .call(fetchOpenbareRuimteData, oprId)
      .next()
      .put(appActions.statusSuccess())
      .next()
      .isDone();

    // when nummeraanduidingId can NOT be resolved
    testSaga(fetchData, { ...action, payload: { brkId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(11))
      .next()
      .call(fetchVerblijfsobjectId, brkId)
      .next()
      .put(appActions.maxProgressCount(4))
      .next()
      .call(kadastraalObjectSaga.fetchKadastraalObjectData, brkId)
      .next()
      .call(fetchKadastraalSubjectNNPData)
      .next()
      .call(fetchKadastraalSubjectNPData)
      .next()
      .put(loadNummeraanduidingDataNoResults())
      .next()
      .put(loadWoonplaatsDataNoResults())
      .next()
      .put(loadOpenbareRuimteDataNoResults())
      .next()
      .put(appActions.showGlobalError('no_vbo_data_available'))
      .next()
      .isDone();
  });

  it('should retrieve data with ligId as source ID', () => {
    const ligId = '0363020001024636';
    const nummeraanduidingId = '0363200000510414';
    const oprId = '0363300000004526';

    // when nummeraanduidingId can be resolved
    testSaga(fetchData, { ...action, payload: { ligId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(4))
      .next()
      .call(fetchLigplaatsData, ligId)
      .next()
      .put(loadKadastraalObjectDataNoResults())
      .next()
      .put(loadKadastraalSubjectNPDataNoResults())
      .next()
      .put(loadKadastraalSubjectNNPDataNoResults())
      .next()
      .select(makeSelectLIGNummeraanduidingId)
      .next(nummeraanduidingId)
      .call(fetchNummeraanduidingData, nummeraanduidingId)
      .next()
      .call(fetchWoonplaatsData)
      .next()
      .select(makeSelectOpenbareRuimteId)
      .next(oprId)
      .call(fetchOpenbareRuimteData, oprId)
      .next()
      .put(appActions.statusSuccess())
      .next()
      .isDone();

    // when nummeraanduidingId can NOT be resolved
    testSaga(fetchData, { ...action, payload: { ligId } })
      .next()
      .put(appActions.resetProgress())
      .next()
      .put(appActions.statusPending())
      .next()
      .put(appActions.maxProgressCount(4))
      .next()
      .call(fetchLigplaatsData, ligId)
      .next()
      .put(loadKadastraalObjectDataNoResults())
      .next()
      .put(loadKadastraalSubjectNPDataNoResults())
      .next()
      .put(loadKadastraalSubjectNNPDataNoResults())
      .next()
      .select(makeSelectLIGNummeraanduidingId)
      .next(undefined)
      .put(loadNummeraanduidingDataNoResults())
      .next()
      .put(loadWoonplaatsDataNoResults())
      .next()
      .put(loadOpenbareRuimteDataNoResults())
      .next()
      .put(appActions.showGlobalError('no_vbo_data_available'))
      .next()
      .isDone();
  });

  describe('exceptions', () => {
    const vboId = '0363010001008599';

    it('catches failed-to-fetch', () => {
      const error = new Error('Something bad happened');
      error.message = 'Failed to fetch';

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .put(appActions.showGlobalError('unable_to_fetch'))
        .next()
        .put(appActions.statusUnableToFetch())
        .next()
        .put(appActions.exceptionOccurred('some random string 456'))
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches 401 authenticated', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 401,
      };

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .select(appSelectors.makeSelectIsAuthenticated)
        .next(true)
        .put(appActions.showGlobalError('session_expired'))
        .next()
        .put(appActions.statusUnauthorized())
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches 401 NOT authenticated', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 401,
      };

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .select(appSelectors.makeSelectIsAuthenticated)
        .next(false)
        .put(appActions.showGlobalError('unauthorized'))
        .next()
        .put(appActions.statusUnauthorized())
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches 404', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 404,
      };

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .put(appActions.showGlobalError('resource_not_found'))
        .next()
        .put(appActions.exceptionOccurred('some random string 456'))
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches 500', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 500,
      };

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .put(appActions.showGlobalError('server_error'))
        .next()
        .put(appActions.exceptionOccurred('some random string 456'))
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches 503', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 503,
      };

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .put(appActions.showGlobalError('service_unavailable'))
        .next()
        .put(appActions.exceptionOccurred('some random string 456'))
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });

    it('catches unknown error', () => {
      const error = new Error('Something bad happened');
      error.response = null;

      testSaga(fetchData, { ...action, payload: { vboId } })
        .next()
        .put(appActions.resetProgress())
        .next()
        .put(appActions.statusPending())
        .next()
        .put(appActions.maxProgressCount(10))
        .throw(error)
        .put(appActions.showGlobalError('unknown_error'))
        .next()
        .put(appActions.exceptionOccurred('some random string 456'))
        .next()
        .put(appActions.statusFailed(error))
        .next()
        .isDone();
    });
  });
});
