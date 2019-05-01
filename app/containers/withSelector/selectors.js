import { createSelector } from 'reselect';

import { isValidDate, isObject, isArray, isValidKey, isValidValue, isCount } from 'utils';
import messages from 'containers/App/messages';

export const selectBAG = state => state.bag;
const selectKadastraalObject = state => state.kadastraalObject;
const selectKadastraalSubject = state => state.kadastraalSubject;
const selectNummeraanduiding = state => state.nummeraanduiding;
const selectPand = state => state.pand;
const selectSearch = state => state.search;
const selectVerblijfsobject = state => state.verblijfsobject;
const selectVestiging = state => state.vestiging;

// replace underscores and capitalise the key
const formattedKey = key =>
  key
    .split('_')
    .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(' ')
    .trim();

const getFormattedData = ({ data, keys }) => {
  const objKeys = Object.keys(data);
  const filteredKeys = keys ? objKeys.filter(isValidKey(keys)).filter(isValidValue(data)) : objKeys;

  return filteredKeys
    .map(key => {
      const value = data[key];
      let formattedValue;
      let type = typeof value;
      let readableKey = formattedKey(key);

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
        readableKey = messages.amount_of;
        formattedValue = value.count;
      } else {
        try {
          if (isObject(value)) {
            if (value.omschrijving) {
              formattedValue = value.omschrijving;
            } else {
              return getFormattedData({ data: value });
            }
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
        formattedKey: readableKey,
        value,
        formattedValue,
      };
    })
    .filter(Boolean);
};

export const makeSelectVerblijfsobjectData = () =>
  createSelector(
    selectVerblijfsobject,
    state => {
      const { data } = state;

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
    },
  );

export const makeSelectNummeraanduidingData = () =>
  createSelector(
    selectNummeraanduiding,
    state => {
      const { data } = state;

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
    },
  );

export const makeSelectAdres = () =>
  createSelector(
    makeSelectNummeraanduidingData(),
    state => {
      if (!state || !isArray(state) || !state.length) {
        return undefined;
      }

      return state.filter(({ key }) => key === 'adres' || key === 'postcode');
    },
  );

export const makeSelectPandData = () =>
  createSelector(
    selectPand,
    state => {
      const { data } = state;

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
    },
  );

export const makeSelectKadastraalObjectData = () =>
  createSelector(
    selectKadastraalObject,
    state => {
      const { data: { results } = {} } = state;

      if (!results || !isArray(results)) {
        return undefined;
      }

      const data = results.length > 1 ? results.find(({ koopsom, koopjaar }) => koopsom && koopjaar) : results[0];

      const keys = ['id', 'in_onderzoek', 'koopjaar', 'koopsom', 'objectnummer'];

      return getFormattedData({ data, keys });
    },
  );

/**
 * Natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNPData = () =>
  createSelector(
    selectKadastraalSubject,
    state => {
      const { data } = state;

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
    },
  );

/**
 * Niet-natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNNPData = () =>
  createSelector(
    selectKadastraalSubject,
    state => {
      const { data } = state;

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
    },
  );

export const makeSelectFromSubject = key =>
  createSelector(
    selectKadastraalSubject,
    state => {
      const { data } = state;

      if (!data || !isArray(data)) {
        return undefined;
      }

      return data.map(item => item[key]).filter(Boolean);
    },
  );

export const makeSelectFromObject = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      const { data: { results } = {} } = state;

      if (!results || !isArray(results)) {
        return undefined;
      }

      return results.map(item => item[key]).filter(Boolean);
    },
  );

export const makeSelectFromPand = key =>
  createSelector(
    selectPand,
    state => {
      const { data } = state;

      return data ? data[key] : undefined;
    },
  );

export const makeSelectKadastraalSubjectLinks = () =>
  createSelector(
    selectKadastraalObject,
    state => {
      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return undefined;
      }

      const { rechten } =
        results.length > 1 ? results.find(({ koopsom, koopjaar }) => koopsom && koopjaar) : results[0];

      // eslint-disable-next-line no-underscore-dangle
      return rechten.map(data => data.kadastraal_subject._links.self.href);
    },
  );

export const makeSelectSearchData = () =>
  createSelector(
    selectSearch,
    state => {
      if (!state || !state.latlng) {
        return undefined;
      }

      return {
        latlng: state.latlng,
        location: state.location,
        ...state.resultObject,
      };
    },
  );

export const makeSelectVestigingData = () =>
  createSelector(
    selectVestiging,
    state => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      const filtered = data
        .map(({ count, results }) => count > 0 && results)
        .filter(Boolean)
        .reduce((acc, val) => {
          acc.push(...val);
          return acc;
        }, []);
      const keys = ['naam', 'locatie'];

      const formatted = filtered
        .map(vestiging => getFormattedData({ data: vestiging, keys }))
        .map(item =>
          item.reduce((acc, vestiging) => {
            if (isArray(vestiging)) {
              vestiging.forEach(prop => {
                acc.push(prop);
              });
            } else {
              acc.push(vestiging);
            }
            return acc;
          }, []),
        );

      if (!formatted.length) {
        return undefined;
      }

      return formatted.length === 1 ? formatted[0] : formatted;
    },
  );

export const makeSelectSummary = () =>
  createSelector(
    [
      makeSelectVerblijfsobjectData(),
      makeSelectNummeraanduidingData(),
      makeSelectPandData(),
      makeSelectKadastraalObjectData(),
      makeSelectKadastraalSubjectNNPData(),
    ],
    (vbo = [], num = [], pnd = [], brko = [], nnp = []) => {
      const summary = {};

      const find = (obj, id) => obj && obj.find(({ key }) => key === id);

      if (num.length) {
        summary.number_indication_id = {
          label: messages.number_indication_id,
          value: find(num, 'nummeraanduidingidentificatie').value,
        };
      }

      if (vbo.length) {
        summary.accommodation_object_id = {
          label: messages.accommodation_object_id,
          value: find(vbo, 'verblijfsobjectidentificatie').value,
        };
      }

      if (pnd.length) {
        summary.house_id = {
          label: messages.house_id,
          value: find(pnd, 'pandidentificatie').value,
        };
      }

      if (brko.length) {
        summary.cadastral_object_nr = {
          label: messages.cadastral_object_nr,
          value: find(brko, 'objectnummer').value,
        };
      }

      if (nnp.length) {
        summary.chamber_of_commerce_nr = {
          label: messages.chamber_of_commerce_nr,
          value: nnp.map(nnpItem => find(nnpItem, 'kvknummer').value).join(', '),
        };

        summary.RSIN = {
          label: messages.rsin,
          value: nnp.map(nnpItem => find(nnpItem, 'rsin').value).join(', '),
        };
      }

      return summary;
    },
  );
