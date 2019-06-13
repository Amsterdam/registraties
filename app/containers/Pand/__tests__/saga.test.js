import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { INCREMENT_PROGRESS } from 'containers/App/constants';

import pand from './pand.json';
import pandlist from './pandlist.json';
import watchPandSaga, { fetchPandlistData, fetchPandData, PAND_API, PAND_BY_VBO_ID_API } from '../saga';
import {
  LOAD_LIST_DATA,
  LOAD_LIST_DATA_FAILED,
  LOAD_LIST_DATA_NO_RESULTS,
  LOAD_LIST_DATA_SUCCESS,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_NO_RESULTS,
  LOAD_DATA_FAILED,
} from '../constants';

const adresseerbaarObjectId = 'foobarbazqux';
const pandId = '0363100012185418';

describe('containers/Pand/saga', () => {
  it('should watch watchPandSaga', () => {
    testSaga(watchPandSaga)
      .next()
      .takeLatest(LOAD_LIST_DATA, fetchPandlistData)
      .next()
      .isDone();
  });

  describe('fetchPandData', () => {
    it('should call endpoint with pand id', () => {
      expectSaga(fetchPandData, pandId)
        .provide([[matchers.call.fn(request), pand]])
        .call(request, `${PAND_API}${pandId}/`)
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchPandData, pandId)
        .provide([[matchers.call.fn(request), pand]])
        .put({
          type: LOAD_DATA_SUCCESS,
          payload: pand,
        })
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchPandData, pandId)
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

      expectSaga(fetchPandData, pandId)
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
      testSaga(fetchPandData, pandId)
        .next()
        .finish()
        .put({ type: INCREMENT_PROGRESS });
    });
  });

  describe('fetchPandlistData', () => {
    it('should call endpoint with adresseerbaarObject id', () => {
      expectSaga(fetchPandlistData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), pandlist]])
        .call(request, `${PAND_BY_VBO_ID_API}${adresseerbaarObjectId}`)
        .run();
    });

    it('should dispatch success', () => {
      expectSaga(fetchPandlistData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), pandlist]])
        .put({
          type: LOAD_LIST_DATA_SUCCESS,
          payload: undefined,
        })
        .call(fetchPandData, pandlist.results[0].landelijk_id)
        .run();
    });

    it('should dispatch no results', () => {
      expectSaga(fetchPandlistData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), undefined]])
        .put({
          type: LOAD_LIST_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();

      expectSaga(fetchPandlistData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), { ...pandlist, count: 0 }]])
        .put({
          type: LOAD_LIST_DATA_NO_RESULTS,
          payload: undefined,
        })
        .run();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(fetchPandlistData, adresseerbaarObjectId)
        .provide([[matchers.call.fn(request), throwError(error)]])
        .put({
          type: LOAD_LIST_DATA_FAILED,
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
  });
});
