import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isObject } from 'utils';

import { initialState } from './reducer';

const selectNummeraanduiding = state => (state && state.nummeraanduiding) || initialState;

export const allowedDataKeys = [
  'adres',
  'hoofdadres',
  'huisletter',
  'huisnummer',
  'huisnummer_toevoeging',
  'nummeraanduidingidentificatie',
  'postcode',
  'woonplaats',
  'type',
  'begin_geldigheid',
  'einde_geldigheid',
];

export const allowedGebiedDataKeys = ['buurt', 'wijk', 'stadsdeel'];

export const makeSelectNummeraanduidingData = createSelector(
  selectNummeraanduiding,
  makeSelectLocale,
  (state, locale) => {
    if (!state.data) {
      return state.data;
    }

    const { data } = state;
    const keys = allowedDataKeys;

    return formatData({ data, keys, locale });
  },
);

export const makeSelectAdres = createSelector(
  makeSelectNummeraanduidingData,
  state => {
    if (!state || !isArray(state) || !state.length) {
      return undefined;
    }

    return state.filter(({ key }) => key === 'adres' || key === 'postcode');
  },
);

export const makeSelectWoonplaatsId = createSelector(
  selectNummeraanduiding,
  state => {
    const { data } = state;

    if (!data || !isObject(data.woonplaats) || !data.woonplaats.landelijk_id) {
      return null;
    }

    return data.woonplaats.landelijk_id;
  },
);

export const makeSelectOpenbareRuimteId = createSelector(
  selectNummeraanduiding,
  state => {
    const { data } = state;

    if (!data || !isObject(data.openbare_ruimte) || !data.openbare_ruimte.landelijk_id) {
      return null;
    }

    return data.openbare_ruimte.landelijk_id;
  },
);

export const makeSelectGebiedData = createSelector(
  selectNummeraanduiding,
  makeSelectLocale,
  (state, locale) => {
    const { data } = state;

    if (!data || !isObject(data.buurtcombinatie)) {
      return null;
    }

    data.wijk = data.buurtcombinatie;

    const keys = allowedGebiedDataKeys;

    return formatData({ data, keys, locale });
  },
);
