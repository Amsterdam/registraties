import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

import { initialState } from './reducer';

const selectOpenbareRuimte = state => (state && state.openbareRuimte) || initialState;

export const allowedDataKeys = ['naam', 'type', 'openbare_ruimte_identificatie'];

export const makeSelectOpenbareRuimteData = createSelector(
  selectOpenbareRuimte,
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
