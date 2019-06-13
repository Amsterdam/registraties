import nummeraanduiding from './nummeraanduiding.json';
import {
  allowedDataKeys,
  makeSelectAdres,
  makeSelectGebiedData,
  makeSelectNummeraanduidingData,
  makeSelectOpenbareRuimteId,
  makeSelectWoonplaatsId,
} from '../selectors';
import { initialState } from '../reducer';

describe('containers/Nummeraanduiding/selectors', () => {
  describe('makeSelectNummeraanduidingData', () => {
    it('should return the value of data', () => {
      expect(makeSelectNummeraanduidingData({ nummeraanduiding: { ...initialState, data: null } })).toEqual(null);
      expect(makeSelectNummeraanduidingData({ nummeraanduiding: { ...initialState, data: [] } })).toEqual([]);
    });

    it('should return formatted list of results', () => {
      const state = { nummeraanduiding: { ...initialState, data: nummeraanduiding } };
      const formattedStateValues = makeSelectNummeraanduidingData(state);
      const keyIntersect = Object.keys(nummeraanduiding).filter(
        key => nummeraanduiding[key] && allowedDataKeys.includes(key),
      );

      expect(formattedStateValues).toHaveLength(keyIntersect.length);

      formattedStateValues.forEach(item => {
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']);
      });
    });
  });

  describe('makeSelectAdres', () => {
    it('should return undefined', () => {
      expect(makeSelectAdres({ nummeraanduiding: { ...initialState, data: null } })).toEqual(undefined);
      expect(makeSelectAdres({ nummeraanduiding: { ...initialState, data: [] } })).toEqual(undefined);
    });

    it('should return dres values', () => {
      const adres = makeSelectAdres({ nummeraanduiding: { ...initialState, data: nummeraanduiding } });

      expect(adres).toHaveLength(2);
      expect(adres[0].key).toEqual('adres');
      expect(adres[1].key).toEqual('postcode');

      const nummeraanduidingNoPostcode = { ...nummeraanduiding };
      delete nummeraanduidingNoPostcode.postcode;
      const adres2 = makeSelectAdres({ nummeraanduiding: { ...initialState, data: nummeraanduidingNoPostcode } });

      expect(adres2).toHaveLength(1);
      expect(adres2[0].key).toEqual('adres');

      const nummeraanduidingNoAdres = { ...nummeraanduiding };
      delete nummeraanduidingNoAdres.adres;
      const adres3 = makeSelectAdres({ nummeraanduiding: { ...initialState, data: nummeraanduidingNoAdres } });

      expect(adres3).toHaveLength(1);
      expect(adres3[0].key).toEqual('postcode');
    });
  });

  describe('makeSelectGebiedData', () => {
    it('should return null', () => {
      expect(
        makeSelectGebiedData({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, buurtcombinatie: undefined } },
        }),
      ).toEqual(null);

      expect(
        makeSelectGebiedData({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, buurtcombinatie: null } },
        }),
      ).toEqual(null);
    });

    it('should set the value of prop wijk', () => {
      expect(nummeraanduiding.wijk).toBeUndefined();

      const formattedStateValues = makeSelectGebiedData({
        nummeraanduiding: { ...initialState, data: nummeraanduiding },
      });

      expect(formattedStateValues.some(({ key }) => key === 'wijk')).toEqual(true);
    });

    it('should return formatted values', () => {});
  });

  describe('makeSelectOpenbareRuimteId', () => {
    it('should return null', () => {
      expect(
        makeSelectOpenbareRuimteId({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, openbare_ruimte: undefined } },
        }),
      ).toEqual(null);

      expect(
        makeSelectOpenbareRuimteId({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, openbare_ruimte: null } },
        }),
      ).toEqual(null);
    });

    it('should return id', () => {
      expect(
        makeSelectOpenbareRuimteId({
          nummeraanduiding: { ...initialState, data: nummeraanduiding },
        }),
      ).toEqual(nummeraanduiding.openbare_ruimte.landelijk_id);
    });
  });

  describe('makeSelectWoonplaatsId', () => {
    it('should return null', () => {
      expect(
        makeSelectWoonplaatsId({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, woonplaats: undefined } },
        }),
      ).toEqual(null);

      expect(
        makeSelectWoonplaatsId({
          nummeraanduiding: { ...initialState, data: { ...nummeraanduiding, woonplaats: null } },
        }),
      ).toEqual(null);
    });

    it('should return id', () => {
      expect(
        makeSelectWoonplaatsId({
          nummeraanduiding: { ...initialState, data: nummeraanduiding },
        }),
      ).toEqual(nummeraanduiding.woonplaats.landelijk_id);
    });
  });
});
