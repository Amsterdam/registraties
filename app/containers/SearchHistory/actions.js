import { PUSH_SEARCH_HISTORY } from './constants';

export const pushSearchHistory = payload => ({
  type: PUSH_SEARCH_HISTORY,
  payload,
});
