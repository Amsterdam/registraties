import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

const selectWoonplaatsData = state => state.woonplaats;

export const makeSelectWoonplaatsData = () =>
  createSelector(
    selectWoonplaatsData,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return undefined;
      }

      const keys = ['naam', 'woonplaatsidentificatie'];

      return formatData({ data, keys, locale });
    },
  );
