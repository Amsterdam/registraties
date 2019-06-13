import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

import { initialState } from './reducer';

const selectPand = state => (state && state.pand) || initialState;

export const allowedDataKeys = [
  'hoogste_bouwlaag',
  'laagste_bouwlaag',
  'oorspronkelijk_bouwjaar',
  'pandidentificatie',
  'status',
  'verblijfsobjecten',
];

export const makeSelectPandData = createSelector(
  selectPand,
  makeSelectLocale,
  (state, locale) => {
    const { data } = state;

    if (!data) {
      return data;
    }

    const keys = allowedDataKeys;

    return formatData({ data, keys, locale });
  },
);
