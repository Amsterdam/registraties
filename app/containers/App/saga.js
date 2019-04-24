import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import CONFIGURATION from 'shared/services/configuration/configuration';

import { LOGOUT, LOGIN } from './constants';
import { showGlobalError } from './actions';
import { login, logout, getOauthDomain } from '../../shared/services/auth/auth';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callLogin(action) {
  try {
    login(action.payload);
  } catch (error) {
    yield put(showGlobalError('LOGIN_FAILED'));
  }
}

export function* callLogout() {
  try {
    // This forces the remove of the grip cookies.
    if (getOauthDomain() === 'grip') {
      window.open('https://auth.grip-on-it.com/v2/logout?tenantId=rjsfm52t', '_blank').close();
    }
    logout();
    yield put(push('/'));
  } catch (error) {
    yield put(showGlobalError('LOGOUT_FAILED'));
  }
}

export default function* watchAppSaga() {
  yield all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)]);
}
