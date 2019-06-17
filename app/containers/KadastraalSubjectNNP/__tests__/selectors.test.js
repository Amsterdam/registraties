import { isArrayOfArrays } from 'utils';

import { allowedDataKeys, makeSelectKadastraalSubjectNNPData } from '../selectors';
import { initialState } from '../reducer';
import subjectNNP from './subjectNNP.json';

describe('containers/KadastraalSubjectNNP/selectors', () => {
  describe('makeSelectKadastraalSubjectNNPData', () => {
    it('should return undefined for an empty state', () => {
      expect(makeSelectKadastraalSubjectNNPData({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(makeSelectKadastraalSubjectNNPData(null)).toEqual(undefined);
      expect(makeSelectKadastraalSubjectNNPData(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      expect(makeSelectKadastraalSubjectNNPData({ kadastraalSubjectNNP: { ...initialState, data: null } })).toEqual(
        null,
      );
      expect(makeSelectKadastraalSubjectNNPData({ kadastraalSubjectNNP: { ...initialState, data: [] } })).toEqual([]);
      expect(makeSelectKadastraalSubjectNNPData({ kadastraalSubjectNNP: { ...initialState, data: '' } })).toEqual('');
      expect(
        makeSelectKadastraalSubjectNNPData({ kadastraalSubjectNNP: { ...initialState, data: { foo: 'bar' } } }),
      ).toEqual({ foo: 'bar' });
    });

    it('should return null', () => {
      const state = {
        kadastraalSubjectNNP: {
          ...initialState,
          data: [subjectNNP['https://api/brk/subject/NL.KAD.Persoon.000000001/']],
        },
      };

      expect(makeSelectKadastraalSubjectNNPData(state)).toEqual(null);

      state.data = [];
      expect(makeSelectKadastraalSubjectNNPData(state)).toEqual(null);

      state.data = undefined;
      expect(makeSelectKadastraalSubjectNNPData(state)).toEqual(null);
    });

    it.only('should return formatted list of results', () => {
      const data = [
        subjectNNP['https://api/brk/subject/NL.KAD.Persoon.000000000/'],
        subjectNNP['https://api/brk/subject/NL.KAD.Persoon.000000001/'],
      ];
      const state = { kadastraalSubjectNNP: { ...initialState, data } };
      const formattedStateValues = makeSelectKadastraalSubjectNNPData(state);

      expect(isArrayOfArrays(formattedStateValues)).toBe(true);

      const formatted = formattedStateValues[0];
      const keyUnion = Object.keys(data[0]).filter(key => allowedDataKeys.includes(key));

      expect(formatted).toHaveLength(keyUnion.length);
      formatted.forEach(item =>
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']),
      );
    });
  });
});
