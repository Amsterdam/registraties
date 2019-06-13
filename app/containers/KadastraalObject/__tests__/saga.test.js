import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import { INCREMENT_PROGRESS } from 'containers/App/constants';

import kadastraalObjectSaga, {
  fetchKadastraalObjectData,
  isKadastraalNummer,
  BRK_OBJECT_API,
  BRK_VBO_OBJECT_API,
} from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

const brkId = 'NL.KAD.OnroerendeZaak.11487294710107';
const vboId = '0363010012114417';

describe('containers/KadastraalObject/saga', () => {
  it('should return a boolean from isKadastraalNummer', () => {
    expect(isKadastraalNummer()).toEqual(false);
    expect(isKadastraalNummer('')).toEqual(false);
    expect(isKadastraalNummer(null)).toEqual(false);
    expect(isKadastraalNummer(undefined)).toEqual(false);
    expect(isKadastraalNummer([])).toEqual(false);
    expect(isKadastraalNummer(brkId)).toEqual(true);
  });

  it('should watch kadastraalObjectSaga', () => {
    testSaga(kadastraalObjectSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchKadastraalObjectData)
      .next()
      .isDone();
  });

  describe('fetchKadastraalObjectData', () => {
    it('should call endpoint with BRK id', () => {
      testSaga(fetchKadastraalObjectData, brkId)
        .next()
        .call(request, `${BRK_OBJECT_API}${brkId}/`, getRequestOptions())
        .finish();
    });

    it('should call endpoint with VBO id', () => {
      testSaga(fetchKadastraalObjectData, vboId)
        .next()
        .call(request, `${BRK_VBO_OBJECT_API}${vboId}`, getRequestOptions())
        .finish();
    });

    it('should dispatch success', () => {
      const dataOneResult = {
        count: 1,
        results: [
          {
            id: 'NL.KAD.OnroerendeZaak.11487294710107',
            aanduiding: 'ASD07 K 01739 A 0915',
            objectnummer: '1739',
            indexletter: 'A',
            indexnummer: 107,
            cultuurcode_bebouwd: {
              code: '12',
              omschrijving: 'Wonen (appartement)',
            },
            status_code: 'B',
            toestandsdatum: '2019-04-12',
            voorlopige_kadastrale_grens: false,
            verblijfsobjecten: {
              count: 1,
              href:
                'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11487294710107',
            },
            _adressen: {
              href:
                'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/?kadastraalobject=NL.KAD.OnroerendeZaak.11487294710107',
            },
            rechten: [],
            dataset: 'brk',
          },
        ],
      };

      const dataNoResultsWithId = {
        count: 0,
        id: 'NL.KAD.OnroerendeZaak.11487294710107',
      };

      expectSaga(fetchKadastraalObjectData, brkId)
        .provide([[matchers.call.fn(request), dataOneResult]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: dataOneResult,
        })
        .run();

      expectSaga(fetchKadastraalObjectData, brkId)
        .provide([[matchers.call.fn(request), dataNoResultsWithId]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: dataNoResultsWithId,
        })
        .run();
    });

    it('should dispatch no results', () => {
      const data = {
        count: 0,
        results: [],
      };

      const dataNoCount = {
        results: [],
      };

      testSaga(fetchKadastraalObjectData, brkId)
        .next()
        .call(request, `${BRK_OBJECT_API}${brkId}/`, getRequestOptions())
        .next()
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .finish();

      expectSaga(fetchKadastraalObjectData, brkId)
        .provide([[matchers.call.fn(request), data]])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();

      testSaga(fetchKadastraalObjectData, vboId)
        .next()
        .call(request, `${BRK_VBO_OBJECT_API}${vboId}`, getRequestOptions())
        .next()
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .finish();

      expectSaga(fetchKadastraalObjectData, vboId)
        .provide([[matchers.call.fn(request), dataNoCount]])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchKadastraalObjectData, brkId)
        .provide([[matchers.call.fn(request), throwError(error)]])
        .put({
          type: LOAD_DATA_FAILED,
        })
        .run()
        .catch(e => {
          expect(e).toBe(error);
          done();
        });

      expect(global.console.error).toHaveBeenCalled();
      global.console.error.mockReset();
    });

    it('should increment progress', () => {
      testSaga(fetchKadastraalObjectData, brkId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
