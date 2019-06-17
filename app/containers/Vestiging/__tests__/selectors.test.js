import maatschappelijkeActiviteit from 'containers/MaatschappelijkeActiviteit/__tests__/maatschappelijkeActiviteit.json';

import vestiging from './vestiging.json';
import { allowedDataKeys, makeSelectVestigingData, makeSelectMaatschappelijkeActiviteitIds } from '../selectors';
import { initialState } from '../reducer';

describe('containers/Vestiging/selectors', () => {
  describe('makeSelectVestigingData', () => {
    it('should return undefined', () => {
      expect(makeSelectVestigingData({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(makeSelectVestigingData(null)).toEqual(undefined);
      expect(makeSelectVestigingData(undefined)).toEqual(undefined);

      expect(
        makeSelectVestigingData({
          vestiging: {
            data: vestiging,
          },
          maatschappelijkeActiviteit: {
            data: [maatschappelijkeActiviteit],
          },
        }),
      ).toEqual(undefined);

      expect(
        makeSelectVestigingData({
          vestiging: {
            data: [vestiging],
          },
          maatschappelijkeActiviteit: {
            data: maatschappelijkeActiviteit,
          },
        }),
      ).toEqual(undefined);
    });

    it('should return formatted list of results', () => {
      const state = {
        vestiging: {
          data: [vestiging],
        },
        maatschappelijkeActiviteit: {
          data: [maatschappelijkeActiviteit],
        },
      };
      const formattedStateValues = makeSelectVestigingData(state);
      const keyIntersect = Object.keys(vestiging).filter(key => allowedDataKeys.includes(key));

      formattedStateValues.forEach(item => {
        expect(item).toHaveLength(keyIntersect.length + 1); // one item is added to each response object

        item.forEach(value => {
          expect(Object.keys(value)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']);
        });
      });
    });
  });

  describe('makeSelectMaatschappelijkeActiviteitIds', () => {
    it('should return the value of data', () => {
      expect(makeSelectMaatschappelijkeActiviteitIds({ vestiging: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectMaatschappelijkeActiviteitIds({ vestiging: { ...initialState, data: [] } })).toEqual([]);
    });

    it('should return maatschappelijke activiteit ids', () => {
      const state = {
        vestiging: {
          data: [vestiging],
        },
      };

      const ids = ['67959849'];

      expect(makeSelectMaatschappelijkeActiviteitIds(state)).toEqual(ids);
    });
  });
});
