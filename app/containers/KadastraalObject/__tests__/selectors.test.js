import { isArrayOfArrays } from 'utils';

import {
  allowedDataKeys,
  makeSelectKadastraalObjectData,
  makeSelectFromObjectAppartment,
  makeSelectFromObject,
  makeSelectKadastraalSubjectLinks,
} from '../selectors';
import { initialState } from '../reducer';
import subjectLinks from './subjectLinks.json';

describe('containers/KadastraalObject/selectors', () => {
  describe('makeSelectKadastraalObjectData', () => {
    it('should return undefined for an empty state', () => {
      expect(makeSelectKadastraalObjectData({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(makeSelectKadastraalObjectData(null)).toEqual(undefined);
      expect(makeSelectKadastraalObjectData(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      const data = null;

      expect(makeSelectKadastraalObjectData({ kadastraalObject: { ...initialState, data } })).toEqual(data);
    });

    it('should return null', () => {
      const data = {
        notResults: [],
        notId: '972876283942',
      };
      const state = { kadastraalObject: { ...initialState, data } };

      expect(makeSelectKadastraalObjectData(state)).toEqual(null);
    });

    it('should return formatted list of results', () => {
      const data = {
        count: 1,
        results: [
          {
            id: 'NL.KAD.OnroerendeZaak.11487294710107',
            aanduiding: 'ASD07 K 01739 A 0915',
            objectnummer: '1739',
            indexletter: 'A',
            indexnummer: 107,
            cultuurcode_bebouwd: {
              code: '12',
              omschrijving: 'Wonen (appartement)',
            },
            status_code: 'B',
            toestandsdatum: '2019-04-12',
            voorlopige_kadastrale_grens: false,
            verblijfsobjecten: {
              count: 1,
              href:
                'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11487294710107',
            },
            _adressen: {
              href:
                'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/?kadastraalobject=NL.KAD.OnroerendeZaak.11487294710107',
            },
            rechten: [],
            dataset: 'brk',
          },
        ],
      };
      const state = { kadastraalObject: { ...initialState, data } };
      const formattedStateValues = makeSelectKadastraalObjectData(state);

      expect(isArrayOfArrays(formattedStateValues)).toBe(true);

      const formatted = formattedStateValues[0];
      const keyUnion = Object.keys(data.results[0]).filter(key => allowedDataKeys.includes(key));

      expect(formatted).toHaveLength(keyUnion.length);
      formatted.forEach(item =>
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']),
      );
    });

    it('should return formatted values', () => {
      const data = {
        id: 'NL.KAD.OnroerendeZaak.11487294710107',
        aanduiding: 'ASD07 K 01739 A 0915',
        objectnummer: '1739',
        indexletter: 'A',
        indexnummer: 107,
        cultuurcode_bebouwd: {
          code: '12',
          omschrijving: 'Wonen (appartement)',
        },
        status_code: 'B',
        toestandsdatum: '2019-04-12',
        voorlopige_kadastrale_grens: false,
        verblijfsobjecten: {
          count: 1,
          href:
            'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11487294710107',
        },
        _adressen: {
          href:
            'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/?kadastraalobject=NL.KAD.OnroerendeZaak.11487294710107',
        },
        rechten: [],
        dataset: 'brk',
      };

      const state = { kadastraalObject: { ...initialState, data } };
      const formattedStateValues = makeSelectKadastraalObjectData(state);

      expect(isArrayOfArrays(formattedStateValues)).toBe(false);

      const keyUnion = Object.keys(data).filter(key => allowedDataKeys.includes(key));

      expect(formattedStateValues).toHaveLength(keyUnion.length);

      formattedStateValues.forEach(item =>
        expect(Object.keys(item)).toEqual(['type', 'key', 'formattedKey', 'value', 'formattedValue']),
      );
    });
  });

  describe('makeSelectFromObjectAppartment', () => {
    it('should return undefined for an empty state', () => {
      const appartmentDataSelector = makeSelectFromObjectAppartment('foobarbaz');

      expect(appartmentDataSelector({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(appartmentDataSelector(null)).toEqual(undefined);
      expect(appartmentDataSelector(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      const appartmentDataSelector = makeSelectFromObjectAppartment('foobarbaz');
      const data = null;

      expect(appartmentDataSelector({ kadastraalObject: { ...initialState, data } })).toEqual(data);
    });

    it('should return null', () => {
      const appartmentDataSelector = makeSelectFromObjectAppartment('foobarbaz');
      const state1 = { kadastraalObject: { ...initialState, data: { notResults: [] } } };
      const state2 = { kadastraalObject: { ...initialState, data: { results: {} } } };
      const state3 = { kadastraalObject: { ...initialState, data: { results: [] } } };

      expect(appartmentDataSelector(state1)).toEqual(null);
      expect(appartmentDataSelector(state2)).toEqual(null);
      expect(appartmentDataSelector(state3)).toEqual(null);
    });

    it('should return only values with key from appartment objects', () => {
      const data = {
        count: 3,
        results: [
          {
            objectnummer: '1739',
            indexletter: 'A',
          },
          {
            objectnummer: '3459',
            indexletter: 'A',
          },
          {
            objectnummer: '3210',
            indexletter: 'G',
          },
        ],
      };
      const expectedData = ['1739', '3459'];
      const state = { kadastraalObject: { ...initialState, data } };

      const appartmentObjectnummerSelector = makeSelectFromObjectAppartment('objectnummer');
      expect(appartmentObjectnummerSelector(state)).toEqual(expectedData);
    });
  });

  describe('makeSelectFromObject', () => {
    it('should return undefined for an empty state', () => {
      const objectDataSelector = makeSelectFromObject('foobarbaz');

      expect(objectDataSelector({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(objectDataSelector(null)).toEqual(undefined);
      expect(objectDataSelector(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      const objectDataSelector = makeSelectFromObject('foobarbaz');
      const data = null;

      expect(objectDataSelector({ kadastraalObject: { ...initialState, data } })).toEqual(data);
    });

    it('should return null', () => {
      const objectDataSelector = makeSelectFromObject('foobarbaz');
      const state1 = { kadastraalObject: { ...initialState, data: { notResults: [] } } };
      const state2 = { kadastraalObject: { ...initialState, data: { results: {} } } };
      const state3 = { kadastraalObject: { ...initialState, data: { results: [] } } };

      expect(objectDataSelector(state1)).toEqual(null);
      expect(objectDataSelector(state2)).toEqual(null);
      expect(objectDataSelector(state3)).toEqual(null);
    });

    it('should return only values with key from appartment objects', () => {
      const data = {
        count: 3,
        results: [
          {
            id: 'NL.KAD.OnroerendeZaak.11487999999999',
            aanduiding: 'ASD07 K 01739 A 0915',
            objectnummer: '1739',
          },
          {
            id: 'NL.KAD.OnroerendeZaak.99999999910107',
            aanduiding: 'ASD07 K 06665 A 0915',
            objectnummer: '6665',
          },
          {
            id: 'NL.KAD.OnroerendeZaak.11888888880107',
            aanduiding: 'ASD07 K 02134 A 0915',
            objectnummer: '2134',
          },
        ],
      };
      const expectedData = ['ASD07 K 01739 A 0915', 'ASD07 K 06665 A 0915', 'ASD07 K 02134 A 0915'];
      const state = { kadastraalObject: { ...initialState, data } };

      const objectDataSelector = makeSelectFromObject('aanduiding');
      expect(objectDataSelector(state)).toEqual(expectedData);
    });
  });

  describe('makeSelectKadastraalSubjectLinks', () => {
    it('should return undefined for an empty state', () => {
      const subjectDataSelector = makeSelectKadastraalSubjectLinks();

      expect(subjectDataSelector({ data: { foo: 'bar' } })).toEqual(undefined);
      expect(subjectDataSelector(null)).toEqual(undefined);
      expect(subjectDataSelector(undefined)).toEqual(undefined);
    });

    it('should return the value of data', () => {
      const subjectDataSelector = makeSelectKadastraalSubjectLinks();
      const data = null;

      expect(subjectDataSelector({ kadastraalObject: { ...initialState, data } })).toEqual(data);
    });

    it('should return null', () => {
      const subjectDataSelector = makeSelectKadastraalSubjectLinks();
      const state1 = { kadastraalObject: { ...initialState, data: { notResults: [] } } };
      const state2 = { kadastraalObject: { ...initialState, data: { results: {} } } };
      const state3 = { kadastraalObject: { ...initialState, data: { results: [] } } };

      expect(subjectDataSelector(state1)).toEqual(null);
      expect(subjectDataSelector(state2)).toEqual(null);
      expect(subjectDataSelector(state3)).toEqual(null);
    });

    it('should return NP values when authorized', () => {
      const data = subjectLinks.np;

      // authorized
      const state = { kadastraalObject: { ...initialState, data } };
      const subjectLinksSelector = makeSelectKadastraalSubjectLinks(true);
      const subjectLinksData = subjectLinksSelector(state);

      data.results[0].rechten.forEach(({ kadastraal_subject: { _links: { self: { href } } } }) => {
        expect(subjectLinksData.includes(href)).toBe(true);
      });

      // unauthorized
      delete data.results[0].rechten;
      expect(subjectLinksSelector({ kadastraalObject: { ...initialState, data } })).toBe(null);
    });

    it('should return NNP values', () => {
      const data = subjectLinks.nnp;

      // authorized
      const state = { kadastraalObject: { ...initialState, data } };
      const subjectLinksSelector = makeSelectKadastraalSubjectLinks(false);
      const subjectLinksData = subjectLinksSelector(state);

      data.results[0].rechten.forEach(({ kadastraal_subject: { _links: { self: { href } } } }) => {
        expect(subjectLinksData.includes(href)).toBe(true);
      });

      // unauthorized
      delete data.results[0].rechten;
      expect(subjectLinksSelector({ kadastraalObject: { ...initialState, data } })).toBe(null);
    });

    it('should return null when no subjects are found', () => {});
  });
});
