import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/Pand/actions', () => {
  it('should dispatch loadData action', () => {
    const pandId = '0363100012185418';
    const payload = pandId;

    expect(actions.loadData(payload)).toEqual({ type: constants.LOAD_DATA, payload: { pandId } });
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

  it('should dispatch loadListData action', () => {
    const adresseerbaarObjectId = '0363100012185418';
    const payload = adresseerbaarObjectId;

    expect(actions.loadListData(payload)).toEqual({
      type: constants.LOAD_LIST_DATA,
      payload: { adresseerbaarObjectId },
    });
  });

  it('should dispatch loadListDataSuccess action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadListDataSuccess, constants.LOAD_LIST_DATA_SUCCESS, payload);
  });

  it('should dispatch loadListDataFailed action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadListDataFailed, constants.LOAD_LIST_DATA_FAILED, payload);
  });

  it('should dispatch loadListDataNoResults action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.loadListDataNoResults, constants.LOAD_LIST_DATA_NO_RESULTS, payload);
  });
});
