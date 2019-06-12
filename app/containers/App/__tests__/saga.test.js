import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { login, logout } from 'shared/services/auth/auth';
import watchAppSaga, { callLogin, callLogout } from '../saga';
import { LOGIN, LOGOUT, SHOW_GLOBAL_ERROR, EXCEPTION_OCCURRED } from '../constants';

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

    it('should catch exceptions', async () => {
      const error = new Error('panic!!1!');

      return expectSaga(callLogin, action)
        .provide([[matchers.call.fn(login), throwError(error)]])
        .put({
          type: SHOW_GLOBAL_ERROR,
          payload: 'login_failed',
        })
        .put.like({ action: { type: EXCEPTION_OCCURRED } })
        .run()
        .catch(e => {
          expect(e).toBe(error);
        });
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

    it('should catch exceptions', async () => {
      const error = new Error('panic!!2!');

      return expectSaga(callLogout)
        .provide([[matchers.call.fn(logout), throwError(error)]])
        .put({
          type: SHOW_GLOBAL_ERROR,
          payload: 'logout_failed',
        })
        .put.like({ action: { type: EXCEPTION_OCCURRED } })
        .run()
        .catch(e => {
          expect(e).toBe(error);
        });
    });
  });
});
