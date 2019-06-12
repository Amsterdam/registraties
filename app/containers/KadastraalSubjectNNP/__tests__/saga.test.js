import { select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic, throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';
import { makeSelectKadastraalSubjectLinks } from 'containers/KadastraalObject/selectors';
import subjectLinks from 'containers/KadastraalObject/__tests__/subjectLinks.json';

import kadastraalSubjectNNPSaga, { fetchKadastraalSubjectNNPData } from '../saga';
import { LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS, LOAD_DATA_FAILED } from '../constants';
import subjectNNP from './subjectNNP.json';

describe('containers/KadastraalSubjectNNP/saga', () => {
  it('should watch kadastraalSubjectNNPSaga', () => {
    testSaga(kadastraalSubjectNNPSaga)
      .next()
      .takeLatest(LOAD_DATA, fetchKadastraalSubjectNNPData)
      .next()
      .isDone();
  });

  describe('fetchKadastraalSubjectNNPData', () => {
    it('handles unauthorized fetch requests', () => {
      expectSaga(fetchKadastraalSubjectNNPData)
        .provide([[select(makeSelectKadastraalSubjectLinks), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .run();
    });

    it('handles authorized fetch requests', () => {
      const data = subjectLinks.nnp;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), dynamic(({ args }) => subjectNNP[args[0]])]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: [subjectNNP['https://acc.api.data.amsterdam.nl/brk/subject/NL.KAD.Persoon.000000000/'], undefined],
        })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should dispatch no results on unauthorized request', () => {
      const data = subjectLinks.nnp;
      delete data.rechten;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should display no results when there are no valid entities', () => {
      const data = subjectLinks.nnp;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNNPData)
        .withState(state)
        .provide([[matchers.call.fn(request), undefined]])
        .put({ type: LOAD_DATA_NO_RESULTS, payload: undefined })
        .put({ type: INCREMENT_PROGRESS })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');
      const data = subjectLinks.nnp;
      const state = {
        kadastraalObject: {
          data,
        },
      };

      expectSaga(fetchKadastraalSubjectNNPData)
        .withState(state)
        .provide([[select(makeSelectKadastraalSubjectLinks), undefined]])
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
      testSaga(fetchKadastraalSubjectNNPData)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });

      testSaga(fetchKadastraalSubjectNNPData)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });
});
