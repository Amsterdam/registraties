import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/Verblijfsobject/actions', () => {
  it('should dispatch loadData action', () => {
    const adresseerbaarObjectId = '0363010000864314';
    const payload = adresseerbaarObjectId;

    expect(actions.loadData(payload)).toEqual({ type: constants.LOAD_DATA, payload: { adresseerbaarObjectId } });
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

  it('should dispatch loadId action', () => {
    const adresseerbaarObjectId = '0363010000864314';
    const payload = adresseerbaarObjectId;

    expect(actions.loadId(payload)).toEqual({ type: constants.LOAD_ID, payload: { adresseerbaarObjectId } });
  });

  it('should dispatch loadIdSuccess action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdSuccess, constants.LOAD_ID_SUCCESS, payload);
  });

  it('should dispatch loadIdFailed action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdFailed, constants.LOAD_ID_FAILED, payload);
  });

  it('should dispatch loadIdNoResults action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadIdNoResults, constants.LOAD_ID_NO_RESULTS, payload);
  });
});
