import { testActionCreator } from '../../../../internals/testing/test-utils';

import { PUSH_SEARCH_HISTORY } from '../constants';
import { pushSearchHistory } from '../actions';

describe('containers/SearchHistory/actions', () => {
  it('should dispatch inputChanged action', () => {
    const payload = {
      text: 'Foo History Label',
      vboId: 'Foo ID',
    };
    testActionCreator(pushSearchHistory, PUSH_SEARCH_HISTORY, payload);
  });
});
