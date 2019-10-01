import produce from 'immer';
import { getSearchHistoryLocalStorage, getCleanSearchHistory } from 'utils/searchHistory';
import { PUSH_SEARCH_HISTORY } from './constants';

// The initial state of the App
export const initialState = {
  searchHistory: getSearchHistoryLocalStorage(),
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUSH_SEARCH_HISTORY:
        draft.searchHistory = getCleanSearchHistory(action.payload, state.searchHistory);
        break;
    }
  });
