import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';

import nummeraanduiding from './nummeraanduiding.json';
import watchNummeraanduidingSaga, { fetchNummeraanduidingData, NUMMERAANDUIDING_API } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

const nummeraanduidingId = 'bazquxbarbar';

describe('containers/Nummeraanduiding/saga', () => {
  it('should watch watchMaatschappelijkeActiviteitSaga', () => {
    testSaga(watchNummeraanduidingSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchNummeraanduidingData)
      .next()
      .isDone();
  });

  describe('fetchNummeraanduidingData', () => {
    it('should call endpoint with nummeraanduiding id', () => {
      expectSaga(fetchNummeraanduidingData, nummeraanduidingId)
        .provide([[matchers.call.fn(request), nummeraanduiding]])
        .call(request, `${NUMMERAANDUIDING_API}${nummeraanduidingId}/`)
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchNummeraanduidingData, nummeraanduidingId)
        .provide([[matchers.call.fn(request), nummeraanduiding]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: nummeraanduiding,
        })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchNummeraanduidingData, nummeraanduidingId)
        .provide([[matchers.call.fn(request), undefined]])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchNummeraanduidingData, nummeraanduidingId)
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
      testSaga(fetchNummeraanduidingData, nummeraanduidingId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
