import { takeLatest } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { getRequestOptions } from 'shared/services/auth/auth';

import verblijfsobject from './verblijfsobject.json';
import verblijfsobjectByBrkId from './verblijfsobjectByBrkId.json';
import watchVerblijfsobjectSaga, {
  fetchVerblijfsobjectData,
  fetchVerblijfsobjectId,
  VERBLIJFSOBJECT_API,
  API_BY_BRK_OBJECT_ID,
} from '../saga';
import {
  LOAD_DATA,
  LOAD_ID,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  LOAD_ID_FAILED,
  LOAD_ID_NO_RESULTS,
  LOAD_ID_SUCCESS,
} from '../constants';

const adresseerbaarObjectId = '0363010000864314';

describe('containers/Verblijfsobject/saga', () => {
  it('should watch watchOpenbareRuimteSaga', () => {
    testSaga(watchVerblijfsobjectSaga)
      .next()
      .all([takeLatest(LOAD_DATA, fetchVerblijfsobjectData), takeLatest(LOAD_ID, fetchVerblijfsobjectId)])
      .next()
      .isDone();
  });

  describe('fetchVerblijfsobjectData', () => {
    it('should call endpoint with adresseerbaar object id', () => {
      expectSaga(fetchVerblijfsobjectData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), verblijfsobject]])
        .call(request, `${VERBLIJFSOBJECT_API}${adresseerbaarObjectId}/`, getRequestOptions())
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchVerblijfsobjectData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), verblijfsobject]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: verblijfsobject,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchVerblijfsobjectData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), throwError(error)]])
        .put({
          type: LOAD_DATA_FAILED,
          payload: error,
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
      testSaga(fetchVerblijfsobjectData, adresseerbaarObjectId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });

  describe('fetchVerblijfsobjectId', () => {
    it('should call endpoint with adresseerbaar object id', () => {
      expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), verblijfsobjectByBrkId]])
        .call(request, `${API_BY_BRK_OBJECT_ID}${adresseerbaarObjectId}`, getRequestOptions())
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), verblijfsobjectByBrkId]])
        .put({
          type: LOAD_ID_SUCCESS,
          payload: verblijfsobjectByBrkId,
        })
        .run();
    });

    it('should yield landelijk id', done => {
      const response = expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), verblijfsobjectByBrkId]])
        .put({
          type: LOAD_ID_SUCCESS,
          payload: verblijfsobjectByBrkId,
        })
        .run();

      const landelijkId = verblijfsobjectByBrkId.results[0].landelijk_id;

      response.then(({ returnValue }) => {
        expect(returnValue).toEqual(landelijkId);
        done();
      });
    });

    it('should dispatch no results', () => {
      expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), { ...verblijfsobjectByBrkId, count: 0 }]])
        .put({
          type: LOAD_ID_NO_RESULTS,
          payload: undefined,
        })
        .run();

      const malformedResponse = { ...verblijfsobjectByBrkId };
      delete malformedResponse.count;

      expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), malformedResponse]])
        .put({
          type: LOAD_ID_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), throwError(error)]])
        .put({
          type: LOAD_ID_FAILED,
          payload: error,
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
      testSaga(fetchVerblijfsobjectId, adresseerbaarObjectId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
