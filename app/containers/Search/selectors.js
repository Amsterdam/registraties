import { createSelector } from 'reselect';

const selectSearch = state => state.search;

export const makeSelectResults = () =>
  createSelector(
    selectSearch,
    state => {
      const { results } = state;

      if (!results) {
        return undefined;
      }

      const reId = uri => /\d+/.exec(uri)[0];

      return results.map(({ _display, uri }) => {
        const isVBO = /verblijfsobject/.test(uri);
        const isLIG = /ligplaats/.test(uri);

        return {
          name: _display,
          vboId: isVBO ? reId(uri) : null,
          ligId: isLIG ? reId(uri) : null,
        };
      });
    },
  );
