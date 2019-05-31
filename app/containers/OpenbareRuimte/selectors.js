import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

const selectOpenbareRuimte = state => state.openbareRuimte;

export const makeSelectOpenbareRuimteData = () =>
  createSelector(
    selectOpenbareRuimte,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return data;
      }

      const keys = ['naam', 'type', 'openbare_ruimte_identificatie'];

      return formatData({ data, keys, locale });
    },
  );
