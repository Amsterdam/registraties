import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isValidSubjectNNP } from 'utils';

const selectKadastraalSubjectNNP = state => state.kadastraalSubjectNNP;

/**
 * Niet-natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNNPData = () =>
  createSelector(
    selectKadastraalSubjectNNP,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data } = state;

      if (!isArray(data) || !data.length) {
        return data;
      }

      const keys = ['kvknummer', 'rechtsvorm', 'rsin', 'statutaire_naam'];

      const results = data.filter(isValidSubjectNNP).map(subject => formatData({ data: subject, keys, locale }));

      if (!results.length) {
        return null;
      }

      return results;
    },
  );
