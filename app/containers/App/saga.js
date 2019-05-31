import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { authCall } from 'shared/services/api/api';
import CONFIGURATION from 'shared/services/configuration/configuration';
import { login, logout } from 'shared/services/auth/auth';

import { LOGOUT, LOGIN } from './constants';
import { showGlobalError, authorizeUser } from './actions';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callLogin(action) {
  try {
    login(action.payload);
  } catch (error) {
    yield put(showGlobalError('LOGIN_FAILED'));
    throw error;
  }
}

export function* callLogout() {
  try {
    logout();
    yield put(push('/'));
  } catch (error) {
    yield put(showGlobalError('LOGOUT_FAILED'));
    throw error;
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
    yield put(showGlobalError('AUTHORIZE_FAILED'));
    throw error;
  }
}

export default function* watchAppSaga() {
  yield all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)]);
}
