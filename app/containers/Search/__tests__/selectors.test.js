import { allowedDataKeys, makeSelectResults, selectSearch } from '../selectors';
import { initialState } from '../reducer';
import results from './results.json';

describe('containers/Search/selectors', () => {
  describe('selectSearch', () => {
    it('should return the state', () => {
      const state = { search: {} };
      expect(selectSearch(state)).toEqual(state.search);
    });

    it('should return the initial state', () => {
      expect(selectSearch()).toEqual(initialState);
      expect(selectSearch({ search: null })).toEqual(initialState);
      expect(selectSearch({ search: undefined })).toEqual(initialState);
    });
  });

  describe('makeSelectResults', () => {
    it('should return undefined', () => {
      expect(makeSelectResults({ search: { ...initialState, results: 'results' } })).toEqual(undefined);
      expect(makeSelectResults({ search: { ...initialState, results: {} } })).toEqual(undefined);
      expect(makeSelectResults({ search: { ...initialState, results: null } })).toEqual(undefined);
      expect(makeSelectResults({ search: { ...initialState, data: [] } })).toEqual(undefined);
    });

    it('should filter unsupported values', () => {
      const mappedResults = makeSelectResults({ search: { ...initialState, results } });
      const keysIntersect = results.map(({ label }) => label).filter(key => allowedDataKeys.includes(key));

      expect(Object.keys(mappedResults)).toHaveLength(keysIntersect.length);

      Object.keys(mappedResults).forEach(key => {
        expect(allowedDataKeys.includes(key)).toEqual(true);
      });
    });

    it('should return mapped results', () => {
      const mappedResults = makeSelectResults({ search: { ...initialState, results } });
      const { Adressen } = mappedResults;

      // eslint-disable-next-line no-underscore-dangle
      expect(Adressen[0].name).toEqual(results[0].content[0]._display);
      expect(Adressen[0].vboId).toEqual(null);
      expect(Adressen[0].brkId).toEqual(null);
      expect(Adressen[0].ligId).not.toEqual(null);
    });
  });
});
