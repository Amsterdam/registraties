import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray } from 'utils';

const selectNummeraanduiding = state => state.nummeraanduiding;

export const makeSelectNummeraanduidingData = () =>
  createSelector(
    selectNummeraanduiding,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return null;
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
        'type',
        'begin_geldigheid',
        'einde_geldigheid',
      ];

      return formatData({ data, keys, locale });
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

export const makeSelectWoonplaatsId = () =>
  createSelector(
    selectNummeraanduiding,
    state => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data || !data.woonplaats || !data.woonplaats.landelijk_id) {
        return null;
      }

      return data.woonplaats.landelijk_id;
    },
  );

export const makeSelectOpenbareRuimteId = () =>
  createSelector(
    selectNummeraanduiding,
    state => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return null;
      }

      return data.openbare_ruimte.landelijk_id;
    },
  );

export const makeSelectGebiedData = () =>
  createSelector(
    selectNummeraanduiding,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return null;
      }

      data.wijk = data.buurtcombinatie;

      const keys = ['buurt', 'wijk', 'stadsdeel'];

      return formatData({ data, keys, locale });
    },
  );
