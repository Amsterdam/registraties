import ligplaats from 'containers/Ligplaats/__tests__/ligplaats.json';
import verblijfsobject from './verblijfsobject.json';
import {
  allowedDataKeys,
  bboxCenter,
  makeSelectVerblijfsobjectData,
  makeSelectVerblijfsobjectId,
  makeSelectVBONummeraanduidingId,
  makeSelectCoordinates,
} from '../selectors';
import { initialState } from '../reducer';

describe('containers/Verblijfsobject/selectors', () => {
  describe('bboxCenter', () => {
    it('should return the average of two points', () => {
      const bbox = [0, 20, 10, 40];
      const avgX = 5; // (bbox[0] + bbox[2]) / 2
      const avgY = 30; // (bbox[1] + bbox[3]) / 2

      expect(bboxCenter(bbox)).toEqual({ x: avgX, y: avgY });
    });
  });

  describe('makeSelectVerblijfsobjectData', () => {
    it('should return the value of data', () => {
      expect(makeSelectVerblijfsobjectData({ verblijfsobject: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectVerblijfsobjectData({ verblijfsobject: { ...initialState, data: [] } })).toEqual([]);
    });

    it('should return a list of formatted results', () => {
      const state = { verblijfsobject: { ...initialState, data: verblijfsobject } };
      const formattedStateValues = makeSelectVerblijfsobjectData(state);
      const keyIntersect = Object.keys(verblijfsobject).filter(key => allowedDataKeys.includes(key));

      expect(formattedStateValues).toHaveLength(keyIntersect.length);

      formattedStateValues.forEach(item => {
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']);
      });
    });
  });

  describe('makeSelectVerblijfsobjectId', () => {
    it('should return the value of data', () => {
      expect(makeSelectVerblijfsobjectId({ verblijfsobject: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectVerblijfsobjectId({ verblijfsobject: { ...initialState, data: undefined } })).toEqual(undefined);
    });

    it('should return an id', () => {
      const id = verblijfsobject.verblijfsobjectidentificatie;
      expect(makeSelectVerblijfsobjectId({ verblijfsobject: { ...initialState, data: verblijfsobject } })).toEqual(id);
    });
  });

  describe('makeSelectVBONummeraanduidingId', () => {
    it('should return the value of data', () => {
      expect(makeSelectVBONummeraanduidingId({ verblijfsobject: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectVBONummeraanduidingId({ verblijfsobject: { ...initialState, data: undefined } })).toEqual(
        undefined,
      );
    });

    it('should return null', () => {
      const data = { ...verblijfsobject, hoofdadres: null };
      expect(makeSelectVBONummeraanduidingId({ verblijfsobject: { ...initialState, data } })).toEqual(null);
    });

    it('should return an id', () => {
      const id = verblijfsobject.hoofdadres.landelijk_id;
      expect(makeSelectVBONummeraanduidingId({ verblijfsobject: { ...initialState, data: verblijfsobject } })).toEqual(
        id,
      );
    });
  });

  describe('makeSelectCoordinates', () => {
    it('should return undefined', () => {
      expect(makeSelectCoordinates({ ...initialState, verblijfsobject: { data: { verblijfsobject } } })).toEqual(
        undefined,
      );

      expect(makeSelectCoordinates({ ...initialState, ligplaats: { data: { ligplaats } } })).toEqual(undefined);

      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: { ...verblijfsobject, bbox: [], geometrie: {} } },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual(undefined);

      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: { ...verblijfsobject, bbox: verblijfsobject.bbox.slice(0, 2), geometrie: {} } },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual(undefined);

      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: { ...verblijfsobject, bbox: verblijfsobject.bbox.slice(0, 3), geometrie: {} } },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual(undefined);

      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: { ...verblijfsobject, bbox: undefined, geometrie: {} } },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual(undefined);
    });

    it('should return an object', () => {
      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: verblijfsobject },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual({ x: verblijfsobject.geometrie.coordinates[0], y: verblijfsobject.geometrie.coordinates[1] });

      expect(
        makeSelectCoordinates({
          verblijfsobject: { data: { ...verblijfsobject, geometrie: {} } },
          ligplaats: { data: ligplaats },
        }),
      ).toEqual(bboxCenter(verblijfsobject.bbox));
    });
  });
});
