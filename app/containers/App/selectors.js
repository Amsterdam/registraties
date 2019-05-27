import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRoute = state => state.route;

const makeSelectStatus = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.status,
  );

const makeSelectUserName = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userName,
  );

const makeSelectAccessToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.accessToken,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.errorMessage,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.location,
  );

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => !globalState.accessToken === false,
  );

const makeSelectProgress = () =>
  createSelector(
    selectGlobal,
    ({ progress, maxProgressCount }) => ({
      current: progress,
      max: maxProgressCount,
    }),
  );

export {
  makeSelectAccessToken,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectIsAuthenticated,
  makeSelectLoading,
  makeSelectLocation,
  makeSelectProgress,
  makeSelectStatus,
  makeSelectUserName,
  selectGlobal,
};
