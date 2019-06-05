import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectTOC = state => (state && state.toc) || initialState;

export const makeSelectTOC = createSelector(
  selectTOC,
  state => {
    if (!state) {
      return undefined;
    }

    return state.toc;
  },
);
