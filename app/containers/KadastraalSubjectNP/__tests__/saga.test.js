import { select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { makeSelectKadastraalSubjectLinks } from 'containers/KadastraalObject/selectors';
import subjectLinks from 'containers/KadastraalObject/__tests__/subjectLinks.json';

import watchKadastraalSubjectNPSaga, { fetchKadastraalSubjectNPData } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';

describe('containers/KadastraalSubjectNP/saga', () => {
  it('should watch kadastraalSubjectNPSaga', () => {
    testSaga(watchKadastraalSubjectNPSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchKadastraalSubjectNPData)
      .next()
      .isDone();
  });

  describe('fetchKadastraalSubjectNPData', () => {
    it('handles unauthorized fetch requests', () => {
      expectSaga(fetchKadastraalSubjectNPData)
        .provide([[select(makeSelectKadastraalSubjectLinks), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .run();
    });

    it('handles authorized fetch requests', () => {
      const data = subjectLinks.np;
      data.results[0].naam = 'Foo bar Baz';
      data.results[0].geboortedatum = '1970-01-01';

      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), data.results[0]]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: [data.results[0], data.results[0]],
        })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should dispatch no results on unauthorized request', () => {
      const data = subjectLinks.np;
      delete data.rechten;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should display no results when there are no valid entities', () => {
      const data = subjectLinks.np;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');
      const data = subjectLinks.np;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNPData)
        .withState(state)
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
      testSaga(fetchKadastraalSubjectNPData)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
