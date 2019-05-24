import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

const selectPand = state => state.pand;

export const makeSelectPandData = () =>
  createSelector(
    selectPand,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return undefined;
      }

      const keys = [
        'hoogste_bouwlaag',
        'laagste_bouwlaag',
        'oorspronkelijk_bouwjaar',
        'pandidentificatie',
        'status',
        'verblijfsobjecten',
      ];

      return formatData({ data, keys, locale });
    },
  );
