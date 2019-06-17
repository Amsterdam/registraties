import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isValidSubjectNNP } from 'utils';
import { initialState } from './reducer';

export const selectKadastraalSubjectNNP = state => (state && state.kadastraalSubjectNNP) || initialState;
export const allowedDataKeys = ['kvknummer', 'rechtsvorm', 'rsin', 'statutaire_naam'];
/**
 * Niet-natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNNPData = createSelector(
  selectKadastraalSubjectNNP,
  makeSelectLocale,
  (state, locale) => {
    if (!state.data) {
      return state.data;
    }

    const { data } = state;

    if (!isArray(data) || !data.length) {
      return data;
    }

    const keys = allowedDataKeys;
    const results = data.filter(isValidSubjectNNP).map(subject => formatData({ data: subject, keys, locale }));

    if (!results.length) {
      return null;
    }

    return results;
  },
);
