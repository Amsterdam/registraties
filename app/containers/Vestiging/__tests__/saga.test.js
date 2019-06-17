import { select, takeLatest } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { getRequestOptions } from 'shared/services/auth/auth';
import { makeSelectVerblijfsobjectId } from 'containers/Verblijfsobject/selectors';
import verblijfsobject from 'containers/Verblijfsobject/__tests__/verblijfsobject.json';
import { getIdFromURL } from 'utils';

import vestiging from './vestiging.json';
import vestigingByVboId from './vestigingByVboId.json';
import watchVestigingSaga, {
  fetchVestigingIdData,
  fetchVestigingData,
  VESTIGING_API,
  VESTIGING_BY_VBO_ID_API,
} from '../saga';
import {
  LOAD_DATA,
  LOAD_IDS,
  LOAD_IDS_SUCCESS,
  LOAD_IDS_NO_RESULTS,
  LOAD_IDS_FAILED,
  LOAD_DATA_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_NO_RESULTS,
} from '../constants';

const verblijfsObjectId = verblijfsobject.verblijfsobjectidentificatie;

describe('containers/Vestiging/saga', () => {
  it('should watch watchOpenbareRuimteSaga', () => {
    testSaga(watchVestigingSaga)
      .next()
      .all([takeLatest(LOAD_DATA, fetchVestigingData), takeLatest(LOAD_IDS, fetchVestigingIdData)])
      .next()
      .isDone();
  });

  describe('fetchVestigingIdData', () => {
    it('should call endpoint with vbo id', () => {
      testSaga(fetchVestigingIdData)
        .next()
        .select(makeSelectVerblijfsobjectId)
        .next(verblijfsObjectId)
        .call(request, `${VESTIGING_BY_VBO_ID_API}${verblijfsObjectId}`, getRequestOptions())
        .finish();
    });

    it('should dispatch success', () => {
      expectSaga(fetchVestigingIdData)
        .provide([
          [select(makeSelectVerblijfsobjectId), verblijfsObjectId],
          [matchers.call.fn(request), vestigingByVboId],
        ])
        .put({
          type: LOAD_IDS_SUCCESS,
          payload: undefined,
        })
        .call(fetchVestigingData, vestigingByVboId.results)
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchVestigingIdData)
        .provide([[select(makeSelectVerblijfsobjectId), undefined]])
        .put({
          type: LOAD_IDS_NO_RESULTS,
          payload: undefined,
        })
        .run();

      const valuesThatWillYieldNoResults = [
        undefined,
        {},
        { count: 0 },
        { count: null },
        { count: 1, results: undefined },
        { count: 1, results: [] },
      ];
      valuesThatWillYieldNoResults.forEach(value => {
        expectSaga(fetchVestigingIdData)
          .provide([[select(makeSelectVerblijfsobjectId), verblijfsObjectId], [matchers.call.fn(request), value]])
          .put({
            type: LOAD_IDS_NO_RESULTS,
            payload: undefined,
          })
          .run();
      });
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchVestigingIdData)
        .provide([
          [select(makeSelectVerblijfsobjectId), verblijfsObjectId],
          [matchers.call.fn(request), throwError(error)],
        ])
        .put({
          type: LOAD_IDS_FAILED,
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
      expectSaga(fetchVestigingIdData)
        .provide([[matchers.call.fn(request), vestiging]])
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });
  });

  describe('fetchVestigingData', () => {
    it('should call endpoint with vestiging id', () => {
      // eslint-disable-next-line no-underscore-dangle
      const vestigingId = getIdFromURL(vestigingByVboId.results[0]._links.self.href);

      expectSaga(fetchVestigingData, vestigingByVboId.results)
        .provide([[matchers.call.fn(request), vestiging]])
        .call(request, `${VESTIGING_API}${vestigingId}/`, getRequestOptions())
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchVestigingData, vestigingByVboId.results)
        .provide([[matchers.call.fn(request), vestiging]])
        .put({ type: LOAD_DATA_SUCCESS, payload: [vestiging] })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchVestigingData, vestigingByVboId.results)
        .provide([[matchers.call.fn(request), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchVestigingData, vestigingByVboId.results)
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
      expectSaga(fetchVestigingData, vestigingByVboId.results)
        .provide([[matchers.call.fn(request), vestiging]])
        .not.put({ type: INCREMENT_PROGRESS })
        .run();
    });
  });
});
