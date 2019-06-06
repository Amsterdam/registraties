import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import CONFIGURATION from 'shared/services/configuration/configuration';
import { login, logout } from 'shared/services/auth/auth';

import { LOGOUT, LOGIN } from './constants';
import { showGlobalError } from './actions';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callLogin(action) {
  try {
    yield call(login, action.payload);
  } catch (error) {
    yield put(showGlobalError('LOGIN_FAILED'));
    throw error;
  }
}

export function* callLogout() {
  try {
    yield call(logout);
    yield put(push('/'));
  } catch (error) {
    yield put(showGlobalError('LOGOUT_FAILED'));
    throw error;
  }
}

export default function* watchAppSaga() {
  yield all([takeLatest(LOGIN, callLogin), takeLatest(LOGOUT, callLogout)]);
}
