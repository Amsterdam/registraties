import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/App/actions', () => {
  it('should dispatch authenticate user action', () => {
    const userName = 'name';
    const userScopes = 'scopes';
    const accessToken = 'token';
    const payload = {
      userName,
      userScopes,
      accessToken,
    };
    testActionCreator(actions.authenticateUser, constants.AUTHENTICATE_USER, payload);
  });

  it('should dispatch authorize user, action', () => {
    const userName = 'name';
    const userScopes = 'scopes';
    const accessToken = 'token';
    const payload = {
      userName,
      userScopes,
      accessToken,
    };
    testActionCreator(actions.authorizeUser, constants.AUTHORIZE_USER, payload);
  });

  it('should dispatch show global error action', () => {
    const payload = 'global error';
    testActionCreator(actions.showGlobalError, constants.SHOW_GLOBAL_ERROR, payload);
  });

  it('should dispatch reset global error action', () => {
    testActionCreator(actions.resetGlobalError, constants.RESET_GLOBAL_ERROR);
  });

  it('should dispatch login action', () => {
    const payload = 'domain';
    testActionCreator(actions.doLogin, constants.LOGIN, payload);
  });

  it('should dispatch logout action', () => {
    const payload = null;
    testActionCreator(actions.doLogout, constants.LOGOUT, payload);
  });

  it('should dispatch statusPending action', () => {
    testActionCreator(actions.statusPending, constants.LOAD_DATA_PENDING);
  });

  it('should dispatch statusSuccess action', () => {
    testActionCreator(actions.statusSuccess, constants.LOAD_DATA_SUCCESS);
  });

  it('should dispatch statusFailed action', () => {
    testActionCreator(actions.statusFailed, constants.LOAD_DATA_FAILED);
  });

  it('should dispatch statusUnableToFetch action', () => {
    testActionCreator(actions.statusUnableToFetch, constants.UNABLE_TO_FETCH);
  });

  it('should dispatch statusUnauthorized action', () => {
    testActionCreator(actions.statusUnauthorized, constants.UNAUTHORIZED);
  });

  it('should dispatch progress action', () => {
    const payload = 2;
    testActionCreator(actions.progress, constants.PROGRESS, payload);
  });

  it('should dispatch resetProgress action', () => {
    testActionCreator(actions.resetProgress, constants.RESET_PROGRESS);
  });

  it('should dispatch completeProgress action', () => {
    testActionCreator(actions.completeProgress, constants.COMPLETE_PROGRESS);
  });

  it('should dispatch incrementProgress action', () => {
    testActionCreator(actions.incrementProgress, constants.INCREMENT_PROGRESS);
  });

  it('should dispatch maxProgressCount action', () => {
    const payload = 1000;
    testActionCreator(actions.maxProgressCount, constants.MAX_PROGRESS_COUNT, payload);
  });

  it('should dispatch loadBAGData action', () => {
    const payload = { vboId: 'foobarbaz' };
    testActionCreator(actions.loadBAGData, constants.LOAD_BAG_DATA, payload);
  });
});
