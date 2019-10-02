import { isArray } from 'utils';

import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectSearch = state => (state && state.search) || initialState;

export const allowedDataKeys = ['Adressen', 'Kadastrale objecten'];

export const makeSelectResults = createSelector(
  selectSearch,
  state => {
    if (!isArray(state.results) || !state.results.length) {
      return undefined;
    }

    const reId = uri => /([^/]+)\W$/.exec(uri)[1];
    const mappedResults = {};

    state.results
      .filter(({ label }) => allowedDataKeys.includes(label))
      .forEach(({ content, label }) => {
        mappedResults[label] = content.map(({ uri, _display }) => ({
          name: _display,
          vboId: /bag\/verblijfsobject/.test(uri) ? reId(uri) : null,
          ligId: /bag\/ligplaats/.test(uri) ? reId(uri) : null,
          brkId: /brk\/object/.test(uri) ? reId(uri) : null,
        }));
      });

    return mappedResults;
  },
);

export const allowedSuggestionDataKeys = ['Straatnamen'];
export const makeSelectSuggestionResults = createSelector(
  selectSearch,
  state => {
    if (!isArray(state.results) || !state.results.length) {
      return undefined;
    }

    const mappedResults = {};
    state.results
      .filter(({ label }) => allowedSuggestionDataKeys.includes(label))
      .forEach(({ content, label }) => {
        mappedResults[label] = content.map(({ _display }) => ({
          name: _display,
        }));
      });

    return mappedResults;
  },
);

export const makeIsLoading = createSelector(
  selectSearch,
  state => state.loading,
);
