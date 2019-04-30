import { createSelector } from 'reselect';
import { isValidDate, isObject, isArray, isValidKey, isValidValue, isCount } from 'utils';
import messages from './messages';

export const selectBAG = state => state.get('bag');
const selectHandelsregister = state => state.get('handelsregister');
const selectKadastraalObject = state => state.get('kadastraalObject');
const selectKadastraalSubject = state => state.get('kadastraalSubject');
const selectNummeraanduiding = state => state.get('nummeraanduiding');
const selectPand = state => state.get('pand');
const selectSearch = state => state.get('search');
const selectVerblijfsobject = state => state.get('verblijfsobject');
const selectVestiging = state => state.get('vestiging');

// replace underscores and capitalise the key
const formattedKey = key =>
  key
    .split('_')
    .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(' ')
    .trim();

const getFormattedData = ({ data, keys }) =>
  Object.keys(data)
    .filter(isValidKey(keys))
    .filter(isValidValue(data))
    .map(key => {
      const value = data[key];
      let formattedValue;
      let type = typeof value;
      let readableKey = key;

      if (value === '') {
        return null;
      }

      if (typeof value === 'boolean') {
        formattedValue = value ? messages.yes : messages.no;
      } else if (isValidDate(key, value)) {
        type = 'date';
        formattedValue = new Date(value);
      } else if (typeof value === 'string' || typeof value === 'number') {
        formattedValue = value;
      } else if (value === null) {
        type = 'boolean';
        formattedValue = messages.unknown;
      } else if (isCount(value)) {
        type = 'number';
        readableKey = `Aantal ${key}`;
        formattedValue = value.count;
      } else {
        try {
          if (isObject(value) && value.omschrijving) {
            formattedValue = value.omschrijving;
          }

          if (isArray(value)) {
            const valueList = value
              .filter(obj => !!obj.omschrijving)
              .map(obj => obj.omschrijving)
              .filter(Boolean);
            if (valueList.length) {
              formattedValue = valueList.length === 1 ? valueList[0] : valueList;
            }
          }
        } catch (e) {
          return null;
        }
      }

      return {
        type,
        key,
        formattedKey: formattedKey(readableKey),
        value,
        formattedValue,
      };
    })
    .filter(Boolean);

export const makeSelectVerblijfsobjectData = () =>
  createSelector(selectVerblijfsobject, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'aanduiding_in_onderzoek',
      'aantal_kamers',
      'bouwlagen',
      'eigendomsverhouding',
      'gebruik',
      'gebruiksdoelen',
      'indicatie_geconstateerd',
      'oppervlakte',
      'status',
      'verhuurbare-eenheden',
      'verblijfsobjectidentificatie',
    ];

    return getFormattedData({ data, keys });
  });

export const makeSelectNummeraanduidingData = () =>
  createSelector(selectNummeraanduiding, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'adres',
      'hoofdadres',
      'huisletter',
      'huisnummer',
      'huisnummer_toevoeging',
      'nummeraanduidingidentificatie',
      'postcode',
      'woonplaats',
    ];

    return getFormattedData({ data, keys });
  });

export const makeSelectAdres = () =>
  createSelector(makeSelectNummeraanduidingData(), state => {
    if (!state || !isArray(state) || !state.length) {
      return undefined;
    }

    return state.filter(({ key }) => key === 'adres' || key === 'postcode');
  });

export const makeSelectPandData = () =>
  createSelector(selectPand, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'hoogste_bouwlaag',
      'laagste_bouwlaag',
      'oorspronkelijk_bouwjaar',
      'pandidentificatie',
      'status',
      'verblijfsobjecten',
    ];

    return getFormattedData({ data, keys });
  });

export const makeSelectKadastraalObjectData = () =>
  createSelector(selectKadastraalObject, state => {
    const { results } = state.get('data') || {};

    if (!results || !isArray(results)) {
      return undefined;
    }

    const data = results.length > 1 ? results.find(({ koopsom, koopjaar }) => koopsom && koopjaar) : results[0];

    const keys = ['id', 'in_onderzoek', 'koopjaar', 'koopsom', 'objectnummer'];

    return getFormattedData({ data, keys });
  });

/**
 * Natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNPData = () =>
  createSelector(selectKadastraalSubject, state => {
    const data = state.get('data');

    if (!data || !isArray(data)) {
      return undefined;
    }

    // eslint-disable-next-line camelcase
    const natuurlijkPersoonData = data.find(({ is_natuurlijk_persoon }) => is_natuurlijk_persoon);

    if (!natuurlijkPersoonData) {
      return undefined;
    }

    const keys = [
      'id',
      'geslacht',
      'naam',
      'voornamen',
      'voorvoegsels',
      'geboortedatum',
      'geboorteplaats',
      'geboorteland',
      'overlijdensdatum',
    ];

    return data.map(subject => getFormattedData({ data: subject, keys }));
  });

/**
 * Niet-natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNNPData = () =>
  createSelector(selectKadastraalSubject, state => {
    const data = state.get('data');

    if (!data || !isArray(data)) {
      return undefined;
    }

    // eslint-disable-next-line camelcase
    const nietNatuurlijkPersoonData = data.find(({ is_natuurlijk_persoon }) => !is_natuurlijk_persoon);

    if (!nietNatuurlijkPersoonData) {
      return undefined;
    }

    const keys = ['kvknummer', 'rechtsvorm', 'rsin', 'statutaire_naam'];

    return data.map(subject => getFormattedData({ data: subject, keys }));
  });

export const makeSelectFromSubject = key =>
  createSelector(selectKadastraalSubject, state => {
    const data = state.get('data');

    if (!data || !isArray(data)) {
      return undefined;
    }

    return data.map(item => item[key]).filter(Boolean);
  });

export const makeSelectFromObject = key =>
  createSelector(selectKadastraalObject, state => {
    const { results } = state.get('data') || {};

    if (!results || !isArray(results)) {
      return undefined;
    }

    return results.map(item => item[key]).filter(Boolean);
  });

export const makeSelectKadastraalSubjectLinks = () =>
  createSelector(selectKadastraalObject, state => {
    const { results } = state.get('data') || {};

    if (!results || !isArray(results) || !results.length) {
      return undefined;
    }

    const { rechten } = results.length > 1 ? results.find(({ koopsom, koopjaar }) => koopsom && koopjaar) : results[0];

    // eslint-disable-next-line no-underscore-dangle
    return rechten.map(data => data.kadastraal_subject._links.self.href);
  });

export const makeSelectHandelsregisterData = () =>
  createSelector(
    selectHandelsregister,
    (
      state, // eslint-disable-line
    ) =>
      // debugger;
      undefined,
  );

export const makeSelectSearchData = () =>
  createSelector(selectSearch, state => {
    if (!state || !state.get('latlng')) {
      return undefined;
    }

    return {
      latlng: state.get('latlng'),
      location: state.get('location'),
      ...state.get('resultObject'),
    };
  });

export const makeSelectVestigingData = () =>
  createSelector(selectVestiging, state => {
    if (!state || !state.get('latlng')) {
      return undefined;
    }

    return {};
  });

export const makeSelectSummary = () =>
  createSelector(
    [
      makeSelectVerblijfsobjectData(),
      makeSelectNummeraanduidingData(),
      makeSelectPandData(),
      makeSelectKadastraalObjectData(),
      makeSelectKadastraalSubjectNNPData(),
      makeSelectKadastraalSubjectNPData(),
    ],
    // eslint-disable-next-line
    (vbo = [], num = [], pnd = [], brko = [], nnp = [], np = []) => {
      const summary = {};

      const find = (obj, id) => obj && obj.find(({ key }) => key === id);

      if (num.length) {
        summary['Nummeraanduiding-ID'] = find(num, 'nummeraanduidingidentificatie').value;
      }

      if (vbo.length) {
        summary['VBO-ID'] = find(vbo, 'verblijfsobjectidentificatie').value;
      }

      if (pnd.length) {
        summary['Pand-ID'] = find(pnd, 'pandidentificatie').value;
      }

      if (brko.length) {
        summary['Kadastraal objectnummer'] = find(brko, 'objectnummer').value;
      }

      if (nnp.length) {
        summary['KvK-nummer'] = nnp.map(nnpItem => find(nnpItem, 'kvknummer').value).join(', ');
        summary.RSIN = nnp.map(nnpItem => find(nnpItem, 'rsin').value).join(', ');
      }

      return summary;
    },
  );
