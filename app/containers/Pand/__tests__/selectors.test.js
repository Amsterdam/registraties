import pand from './pand.json';
import { allowedDataKeys, makeSelectPandData } from '../selectors';
import { initialState } from '../reducer';

describe('containers/Pand/selectors', () => {
  describe('makeSelectPandData', () => {
    it('should return the value of data', () => {
      expect(makeSelectPandData({ pand: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectPandData({ pand: { ...initialState, data: [] } })).toEqual([]);
    });

    it('should return formatted list of results', () => {
      const state = { pand: { ...initialState, data: pand } };
      const formattedStateValues = makeSelectPandData(state);
      const keyIntersect = Object.keys(pand).filter(key => allowedDataKeys.includes(key));

      expect(formattedStateValues).toHaveLength(keyIntersect.length);

      formattedStateValues.forEach(item => {
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']);
      });
    });
  });
});
