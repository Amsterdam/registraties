import { testActionCreator } from '../../../../internals/testing/test-utils';

import * as constants from '../constants';
import * as actions from '../actions';

describe('containers/Search/actions', () => {
  it('should dispatch searchSelect action', () => {
    const payload = 'bazbazbarbar';

    expect(actions.searchSelect(payload)).toEqual({ type: constants.SEARCH_SELECT, payload });
  });

  it('should dispatch inputChanged action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.inputChanged, constants.INPUT_CHANGE, payload);
  });

  it('should dispatch typeAheadSuccess action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.typeAheadSuccess, constants.TYPE_AHEAD_SUCCESS, payload);
  });

  it('should dispatch typeAheadFailed action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.typeAheadFailed, constants.TYPE_AHEAD_FAILED, payload);
  });

  it('should dispatch typeAheadLoading action', () => {
    const payload = {
      someProp: 'zork',
      another: 'bazbar',
    };
    testActionCreator(actions.typeAheadLoading, constants.TYPE_AHEAD_LOADING, payload);
  });
});
