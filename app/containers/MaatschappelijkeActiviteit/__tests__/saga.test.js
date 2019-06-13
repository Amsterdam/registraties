import { select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { makeSelectMaatschappelijkeActiviteitIds } from 'containers/Vestiging/selectors';

import maatschappelijkeActiviteit from './maatschappelijkeActiviteit.json';
import watchMaatschappelijkeActiviteitSaga, { fetchMaatschappelijkeActiviteitData, MA_API } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

const maatschappelijkeActiviteitId = 'bazquxbarbar';

describe('containers/MaatschappelijkeActiviteit/saga', () => {
  it('should watch watchMaatschappelijkeActiviteitSaga', () => {
    testSaga(watchMaatschappelijkeActiviteitSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchMaatschappelijkeActiviteitData)
      .next()
      .isDone();
  });

  describe('fetchMaatschappelijkeActiviteitData', () => {
    it('should call endpoint with maatschappelijke activiteit id', () => {
      expectSaga(fetchMaatschappelijkeActiviteitData)
        .provide([
          [select(makeSelectMaatschappelijkeActiviteitIds), [maatschappelijkeActiviteitId]],
          [matchers.call.fn(request), maatschappelijkeActiviteit],
        ])
        .call(request, `${MA_API}${maatschappelijkeActiviteitId}/`, getRequestOptions())
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchMaatschappelijkeActiviteitData)
        .provide([
          [select(makeSelectMaatschappelijkeActiviteitIds), [maatschappelijkeActiviteitId]],
          [matchers.call.fn(request), maatschappelijkeActiviteit],
        ])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: [maatschappelijkeActiviteit],
        })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchMaatschappelijkeActiviteitData)
        .provide([
          [select(makeSelectMaatschappelijkeActiviteitIds), undefined],
          [matchers.call.fn(request), maatschappelijkeActiviteit],
        ])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();

      expectSaga(fetchMaatschappelijkeActiviteitData)
        .provide([
          [select(makeSelectMaatschappelijkeActiviteitIds), [maatschappelijkeActiviteit]],
          [matchers.call.fn(request), undefined],
        ])
        .put({
          type: LOAD_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchMaatschappelijkeActiviteitData)
        .provide([
          [select(makeSelectMaatschappelijkeActiviteitIds), [maatschappelijkeActiviteit]],
          [matchers.call.fn(request), throwError(error)],
        ])
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
      testSaga(fetchMaatschappelijkeActiviteitData)
        .next()
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
