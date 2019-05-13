import { createSelector } from 'reselect';

const selectSearch = state => state.search;

export const makeSelectResults = () =>
  createSelector(
    selectSearch,
    state => {
      const { results } = state;

      if (!results || !results.length) {
        return undefined;
      }

      const reId = uri => /([^/]+)\W$/.exec(uri)[1];
      const isVBO = uri => /verblijfsobject/.test(uri);
      const isLIG = uri => /ligplaats/.test(uri);
      const isBRK = uri => /object/.test(uri);
      const mappedResults = {};

      results.forEach(({ content, label }) => {
        mappedResults[label] = content.map(({ uri, _display }) => ({
          name: _display,
          vboId: isVBO(uri) ? reId(uri) : null,
          ligId: isLIG(uri) ? reId(uri) : null,
          brkId: isBRK(uri) ? reId(uri) : null,
        }));
      });

      return mappedResults;
    },
  );
