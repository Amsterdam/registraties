import { createSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray } from 'utils';

const selectVestiging = state => state.vestiging;

export const makeSelectVestigingData = () =>
  createSelector(
    selectVestiging,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return undefined;
      }

      const filtered = data
        .map(({ count, results }) => count > 0 && results)
        .filter(Boolean)
        .reduce((acc, val) => {
          acc.push(...val);
          return acc;
        }, []);
      const keys = ['naam', 'locatie'];

      const formatted = filtered
        .map(vestiging => formatData({ data: vestiging, keys, locale }))
        .map(item =>
          item.reduce((acc, vestiging) => {
            if (isArray(vestiging)) {
              vestiging.forEach(prop => {
                acc.push(prop);
              });
            } else {
              acc.push(vestiging);
            }
            return acc;
          }, []),
        );

      if (!formatted.length) {
        return null;
      }

      return formatted.length === 1 ? formatted[0] : formatted;
    },
  );
