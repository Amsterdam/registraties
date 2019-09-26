import { createSelector } from 'reselect';

import { getURL } from 'utils/routing/utils';
import { initialState } from './reducer';

const selectSearchHistory = state => (state && state.searchHistory) || initialState;

export const getId = item => item.vboId || item.ligId || item.brkId;

export const makeSelectSearchHistory = createSelector(
  selectSearchHistory,
  ({ searchHistory }) => searchHistory.map(item => ({ ...item, url: getURL(item), id: getId(item) })),
);
