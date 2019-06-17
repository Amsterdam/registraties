import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/Vestiging/actions', () => {
  it('should dispatch loadData action', () => {
    expect(actions.loadData()).toEqual({ type: constants.LOAD_DATA });
  });

  it('should dispatch loadDataSuccess action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadDataSuccess, constants.LOAD_DATA_SUCCESS, payload);
  });

  it('should dispatch loadDataFailed action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadDataFailed, constants.LOAD_DATA_FAILED, payload);
  });

  it('should dispatch loadDataNoResults action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadDataNoResults, constants.LOAD_DATA_NO_RESULTS, payload);
  });

  it('should dispatch loadIds action', () => {
    expect(actions.loadIds()).toEqual({ type: constants.LOAD_IDS });
  });

  it('should dispatch loadIdsSuccess action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdsSuccess, constants.LOAD_IDS_SUCCESS, payload);
  });

  it('should dispatch loadIdsFailed action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdsFailed, constants.LOAD_IDS_FAILED, payload);
  });

  it('should dispatch loadIdsNoResults action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdsNoResults, constants.LOAD_IDS_NO_RESULTS, payload);
  });
});
