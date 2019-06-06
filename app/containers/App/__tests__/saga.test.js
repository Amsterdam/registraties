import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { login, logout } from 'shared/services/auth/auth';
import watchAppSaga, { callLogin, callLogout } from '../saga';
import { LOGIN, LOGOUT, SHOW_GLOBAL_ERROR } from '../constants';

describe('containers/App/saga', () => {
  it('should watch appSaga', () => {
    testSaga(watchAppSaga)
      .next()
      .all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)])
      .next()
      .isDone();
  });

  describe('login', () => {
    const payload = 'datapunt';
    const action = {
      payload,
    };

    it('should success', () => {
      testSaga(callLogin, action)
        .next()
        .call(login, payload)
        .next()
        .isDone();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!1!');

      expectSaga(callLogin, action)
        .provide([[matchers.call.fn(login), throwError(error)]])
        .put({
          type: SHOW_GLOBAL_ERROR,
          payload: 'LOGIN_FAILED',
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

  describe('logout', () => {
    it('should success', () => {
      testSaga(callLogout)
        .next()
        .call(logout)
        .next()
        .put(push('/'))
        .next()
        .isDone();
    });

    it('should catch exceptions', done => {
      global.console.error = jest.fn();
      const error = new Error('panic!!2!');

      expectSaga(callLogout)
        .provide([[matchers.call.fn(logout), throwError(error)]])
        .put({
          type: SHOW_GLOBAL_ERROR,
          payload: 'LOGOUT_FAILED',
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
