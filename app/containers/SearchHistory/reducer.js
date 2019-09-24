import produce from 'immer';
import { uniqBy } from 'lodash';

import { PUSH_SEARCH_HISTORY } from './constants';

// The initial state of the App
export const initialState = {
  searchHistory: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUSH_SEARCH_HISTORY:
        draft.searchHistory = uniqBy([action.payload, ...state.searchHistory], 'text');
        break;
    }
  });
