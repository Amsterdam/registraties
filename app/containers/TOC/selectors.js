import { createSelector } from 'reselect';

const selectTOC = state => state.toc;

export const makeSelectTOC = () =>
  createSelector(
    selectTOC,
    state => {
      if (!state) {
        return undefined;
      }

      return state.toc;
    },
  );
