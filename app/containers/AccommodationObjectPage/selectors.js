import { createSelector } from 'reselect';
import messages from './messages';

export const selectBAG = state => state.get('bag');
const selectVerblijfsobject = state => state.get('verblijfsobject');
const selectLigplaats = state => state.get('ligplaats');
const selectOpenbareRuimte = state => state.get('openbareRuimte');
const selectPand = state => state.get('pand');
const selectNummeraanduiding = state => state.get('nummeraanduiding');
const selectKadaster = state => state.get('kadaster');

// replace underscores and capitalise a key
const formattedKey = key =>
  key
    .split('_')
    .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(' ');
// filter for keys by presence in a given list
const validKey = keys => key => keys.includes(key);
// filter for valid property value
const validValue = data => key =>
  !(data[key] && data[key].constructor && data[key].constructor.name === 'Object' && !data[key].omschrijving);

const dateFields = ['begin_geldigheid', 'document_mutatie', 'einde_geldigheid', 'toestandsdatum'];

const getFormattedData = ({ data, keys }) =>
  Object.keys(data)
    .filter(validKey(keys))
    .filter(validValue(data))
    .map(key => {
      const value = data[key];
      let formattedValue;
      let type = typeof value;

      if (typeof value === 'boolean') {
        formattedValue = value ? messages.yes : messages.no;
      } else if (dateFields.includes(key) && !Number.isNaN(Date.parse(value))) {
        type = 'date';
        formattedValue = new Date(value);
      } else if (typeof value === 'string' || typeof value === 'number') {
        formattedValue = value;
      } else if (value === null) {
        type = 'boolean';
        formattedValue = messages.does_not_apply;
      } else {
        try {
          if (value.constructor && value.constructor.name === 'Object' && value.omschrijving) {
            formattedValue = value.omschrijving;
          }

          if (value.constructor && value.constructor.name === 'Array') {
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
        formattedKey: formattedKey(key),
        value,
        formattedValue,
      };
    })
    .filter(Boolean);

export const selectBAGData = () =>
  createSelector(selectBAG, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    return data;
  });

export const selectOpenbareRuimteData = () =>
  createSelector(selectOpenbareRuimte, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = ['begin_geldigheid', 'einde_geldigheid', 'naam', 'type'];

    return getFormattedData({ data, keys });
  });

export const selectVerblijfsobjectData = () =>
  createSelector(selectVerblijfsobject, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'aanduiding_in_onderzoek',
      'aantal_kamers',
      'bouwlaag_toegang',
      'bouwlagen',
      'eigendomsverhouding',
      'gebruik',
      'gebruiksdoelen',
      'hoofdadres',
      'indicatie_geconstateerd',
      'oppervlakte',
      'status',
      'type_woonobject',
      'verhuurbare-eenheden',
    ];

    return getFormattedData({ data, keys });
  });

export const selectNummeraanduidingData = () =>
  createSelector(selectNummeraanduiding, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'begin_geldigheid',
      'einde_geldigheid',
      'hoofdadres',
      'huisletter',
      'huisnummer',
      'huisnummer_toevoeging',
      'ligplaats',
      'postcode',
      'status',
      'type',
    ];

    return getFormattedData({ data, keys });
  });

export const selectPandData = () =>
  createSelector(selectPand, state => {
    const { results } = state.get('data') || {};

    if (!results || !results.length) {
      return undefined;
    }

    const data = results[0];

    const keys = [
      'hoogste_bouwlaag',
      'laagste_bouwlaag',
      'oorspronkelijk_bouwjaar',
      'pandnaam',
      'pandnummer',
      'status',
    ];

    return getFormattedData({ data, keys });
  });

export const selectKadasterData = () =>
  createSelector(selectKadaster, state => {
    const { results } = state.get('data') || {};

    if (!results || !results.length) {
      return undefined;
    }

    const data = results[0];

    const keys = ['in_onderzoek', 'objectnummer', 'status_code', 'toestandsdatum', 'voorlopige_kadastrale_grens'];

    return getFormattedData({ data, keys });
  });

export const selectLigplaatsData = () =>
  createSelector(selectLigplaats, state => {
    const data = state.get('data');

    if (!data) {
      return undefined;
    }

    const keys = [
      'aanduiding_in_onderzoek',
      'begin_geldigheid',
      'einde_geldigheid',
      'hoofdadres',
      'indicatie_geconstateerd',
      'status',
    ];

    return getFormattedData({ data, keys });
  });
