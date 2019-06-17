import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

import { initialState } from './reducer';

const selectWoonplaatsData = state => (state && state.woonplaats) || initialState;

export const allowedDataKeys = ['naam', 'woonplaatsidentificatie'];

export const makeSelectWoonplaatsData = createSelector(
  selectWoonplaatsData,
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
