import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';

import openbareRuimte from './openbareRuimte.json';
import watchOpenbareRuimteSaga, { fetchOpenbareRuimteData, OPENBARE_RUIMTE_API } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

const openbareRuimteId = '0363300000003480';

describe('containers/OpenbareRuimte/saga', () => {
  it('should watch watchOpenbareRuimteSaga', () => {
    testSaga(watchOpenbareRuimteSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchOpenbareRuimteData)
      .next()
      .isDone();
  });

  describe('fetchOpenbareRuimteData', () => {
    it('should call endpoint with openbare ruimte id', () => {
      expectSaga(fetchOpenbareRuimteData, openbareRuimteId)
        .provide([[matchers.call.fn(request), openbareRuimte]])
        .call(request, `${OPENBARE_RUIMTE_API}${openbareRuimteId}/`)
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchOpenbareRuimteData, openbareRuimteId)
        .provide([[matchers.call.fn(request), openbareRuimte]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: openbareRuimte,
        })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchOpenbareRuimteData, openbareRuimteId)
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

      expectSaga(fetchOpenbareRuimteData, openbareRuimteId)
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
      testSaga(fetchOpenbareRuimteData, openbareRuimteId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
