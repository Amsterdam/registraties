import { select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { makeSelectWoonplaatsId } from 'containers/Nummeraanduiding/selectors';

import watchWoonplaatsSaga, { fetchWoonplaatsData, WOONPLAATS_API } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

import woonplaats from './woonplaats.json';
const woonplaatsId = woonplaats.woonplaatsidentificatie;

describe('containers/Woonplaats/saga', () => {
  it('should watch watchWoonplaatsSaga', () => {
    testSaga(watchWoonplaatsSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchWoonplaatsData)
      .next()
      .isDone();
  });

  describe('fetchWoonplaatsData', () => {
    it('should call endpoint with woonplaats id', () => {
      testSaga(fetchWoonplaatsData)
        .next()
        .select(makeSelectWoonplaatsId)
        .next(woonplaatsId)
        .call(request, `${WOONPLAATS_API}${woonplaatsId}/`)
        .finish();
    });

    it('should dispatch success', () => {
      expectSaga(fetchWoonplaatsData)
        .provide([[select(makeSelectWoonplaatsId), woonplaatsId], [matchers.call.fn(request), woonplaats]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: woonplaats,
        })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchWoonplaatsData)
        .provide([[select(makeSelectWoonplaatsId), undefined]])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();

      expectSaga(fetchWoonplaatsData)
        .provide([[select(makeSelectWoonplaatsId), woonplaatsId], [matchers.call.fn(request), undefined]])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchWoonplaatsData)
        .provide([[select(makeSelectWoonplaatsId), woonplaatsId], [matchers.call.fn(request), throwError(error)]])
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
      expectSaga(fetchWoonplaatsData)
        .provide([[select(makeSelectWoonplaatsId), woonplaatsId], [matchers.call.fn(request), woonplaats]])
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });
  });
});
