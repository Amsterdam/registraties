import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import { INCREMENT_PROGRESS } from 'containers/App/constants';

import ligplaats from './ligplaats.json';
import watchLigplaatsSaga, { fetchLigplaatsData, LIGPLAATS_API } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

const ligId = '0363010012114417';

describe('containers/Ligplaats/saga', () => {
  it('should watch watchLigplaatsSaga', () => {
    testSaga(watchLigplaatsSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchLigplaatsData)
      .next()
      .isDone();
  });

  describe('fetchLigplaatsData', () => {
    it('should call endpoint with LIG id', () => {
      testSaga(fetchLigplaatsData, ligId)
        .next()
        .call(request, `${LIGPLAATS_API}${ligId}/`, getRequestOptions())
        .finish();
    });

    it('should dispatch success', () => {
      expectSaga(fetchLigplaatsData, ligId)
        .provide([[matchers.call.fn(request), ligplaats]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: ligplaats,
        })
        .run();
    });

    it('should dispatch no results', () => {
      testSaga(fetchLigplaatsData, ligId)
        .next()
        .call(request, `${LIGPLAATS_API}${ligId}/`, getRequestOptions())
        .next()
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .finish();

      expectSaga(fetchLigplaatsData, ligId)
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

      expectSaga(fetchLigplaatsData, ligId)
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
      testSaga(fetchLigplaatsData, ligId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });

      testSaga(fetchLigplaatsData, ligId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
