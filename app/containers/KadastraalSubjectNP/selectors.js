import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isValidSubjectNP } from 'utils';

const selectKadastraalSubjectNP = state => state.kadastraalSubjectNP;

/**
 * Natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNPData = () =>
  createSelector(
    selectKadastraalSubjectNP,
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

      const keys = [
        'geboortedatum',
        'geboorteland',
        'geboorteplaats',
        'geslacht',
        'naam',
        'overlijdensdatum',
        'voornamen',
        'voorvoegsels',
      ];

      const results = data.filter(isValidSubjectNP).map(subject => formatData({ data: subject, keys, locale }));

      if (!results.length) {
        return null;
      }

      return results;
    },
  );
