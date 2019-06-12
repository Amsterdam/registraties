import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { push } from 'connected-react-router';

import CONFIGURATION from 'shared/services/configuration/configuration';
import { login, logout } from 'shared/services/auth/auth';

import { LOGOUT, LOGIN } from './constants';
import { showGlobalError, exceptionOccurred } from './actions';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callLogin(action) {
  try {
    yield call(login, action.payload);
  } catch (error) {
    yield put(showGlobalError('login_failed'));
    const eventId = Sentry.captureException(error);
    yield put(exceptionOccurred(eventId));
  }
}

export function* callLogout() {
  try {
    yield call(logout);
    yield put(push('/'));
  } catch (error) {
    yield put(showGlobalError('logout_failed'));
    const eventId = Sentry.captureException(error);
    yield put(exceptionOccurred(eventId));
  }
}

export default function* watchAppSaga() {
  yield all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)]);
}
