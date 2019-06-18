import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  COMPLETE_PROGRESS,
  EXCEPTION_OCCURRED,
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

export const authenticateUser = credentials => ({
  type: AUTHENTICATE_USER,
  payload: credentials,
});

export const authorizeUser = credentials => ({
  type: AUTHORIZE_USER,
  payload: credentials,
});

export const showGlobalError = message => ({
  type: SHOW_GLOBAL_ERROR,
  payload: message,
});

export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR,
});

export const doLogin = domain => ({
  type: LOGIN,
  payload: domain,
});

export const doLogout = () => ({
  type: LOGOUT,
  payload: null,
});

export const statusPending = () => ({
  type: LOAD_DATA_PENDING,
});

export const statusSuccess = () => ({
  type: LOAD_DATA_SUCCESS,
});

export const statusFailed = () => ({
  type: LOAD_DATA_FAILED,
});

export const statusUnableToFetch = () => ({
  type: UNABLE_TO_FETCH,
});

export const statusUnauthorized = () => ({
  type: UNAUTHORIZED,
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

export const exceptionOccurred = eventId => ({
  type: EXCEPTION_OCCURRED,
  payload: eventId,
});
