import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  COMPLETE_PROGRESS,
  INCREMENT_PROGRESS,
  LOAD_BAG_DATA,
  LOAD_DATA_FAILED,
  LOAD_DATA_PENDING,
  LOAD_DATA_SUCCESS,
  LOGIN,
  LOGOUT,
  MAX_PROGRESS_COUNT,
  PROGRESS,
  RESET_GLOBAL_ERROR,
  RESET_PROGRESS,
  SHOW_GLOBAL_ERROR,
  UNABLE_TO_FETCH,
  UNAUTHORIZED,
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

export const progress = payload => ({
  type: PROGRESS,
  payload,
});

export const resetProgress = () => ({
  type: RESET_PROGRESS,
});

export const completeProgress = () => ({
  type: COMPLETE_PROGRESS,
});

export const incrementProgress = () => ({
  type: INCREMENT_PROGRESS,
});

export const maxProgressCount = payload => ({
  type: MAX_PROGRESS_COUNT,
  payload,
});

export const loadBAGData = payload => ({
  type: LOAD_BAG_DATA,
  payload,
});
