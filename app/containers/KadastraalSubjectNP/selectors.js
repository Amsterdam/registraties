import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isValidSubjectNP } from 'utils';
import { initialState } from './reducer';

const selectKadastraalSubjectNP = state => (state && state.kadastraalSubjectNP) || initialState;
export const allowedDataKeys = [
  'geboortedatum',
  'geboorteland',
  'geboorteplaats',
  'geslacht',
  'naam',
  'overlijdensdatum',
  'voornamen',
  'voorvoegsels',
];

/**
 * Natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNPData = createSelector(
  selectKadastraalSubjectNP,
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

    const results = data.filter(isValidSubjectNP).map(subject => formatData({ data: subject, keys, locale }));

    if (!results.length) {
      return null;
    }

    return results;
  },
);
