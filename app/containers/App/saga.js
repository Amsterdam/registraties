import { all, put, takeLatest } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { push } from 'connected-react-router';

import { authCall } from 'shared/services/api/api';
import CONFIGURATION from 'shared/services/configuration/configuration';
import { login, logout } from 'shared/services/auth/auth';

import { LOGOUT, LOGIN } from './constants';
import { showGlobalError, authorizeUser, errorOccurred } from './actions';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callLogin(action) {
  try {
    yield login(action.payload);
  } catch (error) {
    yield put(showGlobalError('login_failed'));
    const eventId = Sentry.captureException(error);
    yield put(errorOccurred(eventId));
  }
}

export function* callLogout() {
  try {
    yield logout();
    yield put(push('/'));
  } catch (error) {
    yield put(showGlobalError('logout_failed'));
    const eventId = Sentry.captureException(error);
    yield put(errorOccurred(eventId));
  }
}

export function* callAuthorize(action) {
  try {
    const accessToken = action.payload && action.payload.accessToken;
    if (accessToken) {
      const requestURL = `${baseUrl}`;

      const user = yield authCall(requestURL, null, accessToken);

      const credentials = { ...action.payload, userScopes: [...user.groups] };
      yield put(authorizeUser(credentials));
    }
  } catch (error) {
    yield put(showGlobalError('authorize_failed'));
    const eventId = Sentry.captureException(error);
    yield put(errorOccurred(eventId));
  }
}

export default function* watchAppSaga() {
  yield all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)]);
}
