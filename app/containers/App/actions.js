import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  SHOW_GLOBAL_ERROR,
  RESET_GLOBAL_ERROR,
  LOGIN,
  LOGOUT,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  LOAD_DATA_PENDING,
  UNAUTHORIZED,
  UNABLE_TO_FETCH,
} from './constants';

export function authenticateUser(credentials) {
  return {
    type: AUTHENTICATE_USER,
    payload: credentials,
  };
}

export function authorizeUser(credentials) {
  return {
    type: AUTHORIZE_USER,
    payload: credentials,
  };
}

export function showGlobalError(message) {
  return {
    type: SHOW_GLOBAL_ERROR,
    payload: message,
  };
}

export function resetGlobalError() {
  return {
    type: RESET_GLOBAL_ERROR,
  };
}

export function doLogin(domain) {
  return {
    type: LOGIN,
    payload: domain,
  };
}

export function doLogout() {
  return {
    type: LOGOUT,
    payload: null,
  };
}

export const statusPending = payload => ({
  type: LOAD_DATA_PENDING,
  payload,
});

export const statusSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const statusFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const statusUnableToFetch = payload => ({
  type: UNABLE_TO_FETCH,
  payload,
});

export const statusUnauthorized = payload => ({
  type: UNAUTHORIZED,
  payload,
});
