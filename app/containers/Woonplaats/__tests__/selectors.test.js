import { isArrayOfArrays } from 'utils';

import { allowedDataKeys, makeSelectWoonplaatsData } from '../selectors';
import { initialState } from '../reducer';
import woonplaats from './woonplaats.json';

describe('containers/Woonplaats/selectors', () => {
  describe('makeSelectWoonplaatsData', () => {
    it('should return the value of data', () => {
      const data = null;

      expect(makeSelectWoonplaatsData({ woonplaats: { ...initialState, data } })).toEqual(data);
    });

    it('should return formatted values', () => {
      const data = woonplaats;
      const state = { woonplaats: { ...initialState, data } };
      const formattedStateValues = makeSelectWoonplaatsData(state);

      expect(isArrayOfArrays(formattedStateValues)).toBe(false);

      const keyUnion = Object.keys(data).filter(key => allowedDataKeys.includes(key));

      expect(formattedStateValues).toHaveLength(keyUnion.length);

      formattedStateValues.forEach(item =>
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']),
      );
    });
  });
});
