import openbareRuimte from './openbareRuimte.json';
import { allowedDataKeys, makeSelectOpenbareRuimteData } from '../selectors';
import { initialState } from '../reducer';

describe('containers/OpenbareRuimte/selectors', () => {
  describe('makeSelectOpenbareRuimteData', () => {
    it('should return the value of data', () => {
      expect(makeSelectOpenbareRuimteData({ openbareRuimte: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectOpenbareRuimteData({ openbareRuimte: { ...initialState, data: [] } })).toEqual([]);
    });

    it('should return formatted list of results', () => {
      const state = { openbareRuimte: { ...initialState, data: openbareRuimte } };
      const formattedStateValues = makeSelectOpenbareRuimteData(state);
      const keyIntersect = Object.keys(openbareRuimte).filter(
        key => openbareRuimte[key] && allowedDataKeys.includes(key),
      );

      expect(formattedStateValues).toHaveLength(keyIntersect.length);

      formattedStateValues.forEach(item => {
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']);
      });
    });
  });
});
