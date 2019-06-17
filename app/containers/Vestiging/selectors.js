import { createSelector } from 'reselect';
import clonedeep from 'lodash.clonedeep';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { initialState as maatschappelijkeActiviteitInitialState } from 'containers/MaatschappelijkeActiviteit/reducer';
import { formatData, isArray, getIdFromURL } from 'utils';

import { initialState } from './reducer';

const selectVestiging = state => (state && state.vestiging) || initialState;
const selectMaatschappelijkeActiviteit = state =>
  (state && state.maatschappelijkeActiviteit) || maatschappelijkeActiviteitInitialState;

export const allowedDataKeys = [
  'activiteiten.activiteitsomschrijving',
  'activiteiten.sbi_code',
  'activiteiten.sbi_omschrijving',
  'activiteiten',
  'bezoekadres',
  'datum_aanvang',
  'kvk_nummer',
  'naam',
  'postadres',
  'vestigingsnummer',
];

export const makeSelectVestigingData = createSelector(
  selectVestiging,
  selectMaatschappelijkeActiviteit,
  makeSelectLocale,
  (vestiging, maatschappelijkeActiviteit, locale) => {
    if (!isArray(vestiging.data) || !isArray(maatschappelijkeActiviteit.data)) {
      return undefined;
    }

    const data = vestiging.data.map((obj, index) => {
      const vestigingObj = clonedeep(obj);
      const additionalData = {
        kvk_nummer: maatschappelijkeActiviteit.data[index].kvk_nummer,
        postadres: vestigingObj.postadres.volledig_adres,
        bezoekadres: vestigingObj.bezoekadres.volledig_adres,
      };

      return Object.assign({}, vestigingObj, additionalData);
    });

    const keys = allowedDataKeys;

    return data.map(dataObj => formatData({ data: dataObj, keys, locale }));
  },
);

export const makeSelectMaatschappelijkeActiviteitIds = createSelector(
  selectVestiging,
  state => {
    const { data } = state;

    if (!data) {
      return data;
    }

    // eslint-disable-next-line camelcase
    return data.map(({ maatschappelijke_activiteit }) => getIdFromURL(maatschappelijke_activiteit));
  },
);
