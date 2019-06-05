import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectGlobal = state => (state && state.global) || initialState;
const selectRoute = state => (state && state.route) || { location: '/' };

export const makeSelectStatus = createSelector(
  selectGlobal,
  ({ status }) => status,
);

export const makeSelectUserName = createSelector(
  selectGlobal,
  ({ userName }) => userName,
);

export const makeSelectAccessToken = createSelector(
  selectGlobal,
  ({ accessToken }) => accessToken,
);

export const makeSelectLoading = createSelector(
  selectGlobal,
  ({ loading }) => loading,
);

export const makeSelectError = createSelector(
  selectGlobal,
  ({ error }) => error,
);

export const makeSelectErrorMessage = createSelector(
  selectGlobal,
  ({ errorMessage }) => errorMessage,
);

export const makeSelectLocation = createSelector(
  selectRoute,
  ({ location }) => location,
);

export const makeSelectIsAuthenticated = createSelector(
  selectGlobal,
  ({ accessToken }) => !!accessToken,
);

export const makeSelectProgress = createSelector(
  selectGlobal,
  ({ progress }) => progress,
);
