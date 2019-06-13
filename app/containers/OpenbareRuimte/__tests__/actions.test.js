import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/OpenbareRuimnte/actions', () => {
  it('should dispatch loadData action', () => {
    const openbareRuimteId = '0363300000003480';
    const payload = openbareRuimteId;

    expect(actions.loadData(payload)).toEqual({ type: constants.LOAD_DATA, payload: { openbareRuimteId } });
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
});
