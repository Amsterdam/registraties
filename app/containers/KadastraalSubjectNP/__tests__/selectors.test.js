import { isArrayOfArrays } from 'utils';

import { allowedDataKeys, makeSelectKadastraalSubjectNPData } from '../selectors';
import { initialState } from '../reducer';
import subjectNP from './subjectNP.json';

describe('containers/KadastraalSubjectNNP/selectors', () => {
  describe('makeSelectKadastraalSubjectNNPData', () => {
    it.skip('should return undefined for an empty state', () => {
      expect(makeSelectKadastraalSubjectNPData({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(makeSelectKadastraalSubjectNPData(null)).toEqual(undefined);
      expect(makeSelectKadastraalSubjectNPData(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      expect(makeSelectKadastraalSubjectNPData({ kadastraalSubjectNP: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectKadastraalSubjectNPData({ kadastraalSubjectNP: { ...initialState, data: [] } })).toEqual([]);
      expect(makeSelectKadastraalSubjectNPData({ kadastraalSubjectNP: { ...initialState, data: '' } })).toEqual('');
      expect(
        makeSelectKadastraalSubjectNPData({ kadastraalSubjectNP: { ...initialState, data: { foo: 'bar' } } }),
      ).toEqual({ foo: 'bar' });
    });

    it('should return null', () => {
      const data = [{ ...subjectNP[0] }, { ...subjectNP[1] }];
      delete data[0].geboortedatum;
      delete data[0].naam;
      delete data[1].geboortedatum;
      delete data[1].naam;

      const state = {
        kadastraalSubjectNP: {
          ...initialState,
          data,
        },
      };

      expect(makeSelectKadastraalSubjectNPData(state)).toEqual(null);

      state.data = [];
      expect(makeSelectKadastraalSubjectNPData(state)).toEqual(null);

      state.data = undefined;
      expect(makeSelectKadastraalSubjectNPData(state)).toEqual(null);
    });

    it('should return formatted list of results', () => {
      const data = subjectNP;
      const state = { kadastraalSubjectNP: { ...initialState, data } };
      const formattedStateValues = makeSelectKadastraalSubjectNPData(state);

      expect(isArrayOfArrays(formattedStateValues)).toBe(true);

      const keyIntersect0 = Object.keys(data[0]).filter(key => data[0][key] && allowedDataKeys.includes(key));
      const keyIntersect1 = Object.keys(data[1]).filter(key => data[1][key] && allowedDataKeys.includes(key));

      expect(formattedStateValues[0]).toHaveLength(keyIntersect0.length);
      expect(formattedStateValues[1]).toHaveLength(keyIntersect1.length);

      formattedStateValues.forEach(value => {
        value.forEach(item =>
          expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']),
        );
      });
    });
  });
});
