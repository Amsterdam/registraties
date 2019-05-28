import { createSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

const selectVestiging = state => state.vestiging;
const selectMaatschappelijkeActiviteit = state => state.maatschappelijkeActiviteit;

export const makeSelectVestigingData = () =>
  createSelector(
    selectVestiging,
    selectMaatschappelijkeActiviteit,
    makeSelectLocale(),
    (vestiging, maatschappelijkeActiviteit, locale) => {
      if (!vestiging || !maatschappelijkeActiviteit) {
        return undefined;
      }

      if (!vestiging.data || !maatschappelijkeActiviteit.data) {
        return undefined;
      }

      const keys = [
        'activiteiten',
        'vestigingsnummer',
        'naam',
        'datum_aanvang',
        'kvk_nummer',
        'postadres',
        'bezoekadres',
        'activiteitsomschrijving',
        'sbi_code',
        'sbi_omschrijving',
      ];

      const data = vestiging.data.map((obj, index) => {
        const vestigingObj = { ...obj };
        const maatschappelijkeActiviteitObj = maatschappelijkeActiviteit.data[index];

        vestigingObj.kvk_nummer = maatschappelijkeActiviteitObj.kvk_nummer;
        vestigingObj.postadres = vestigingObj.postadres.volledig_adres;
        vestigingObj.bezoekadres = vestigingObj.bezoekadres.volledig_adres;

        return vestigingObj;
      });

      return data.map(dataObj => formatData({ data: dataObj, keys, locale }));
    },
  );

export const makeSelectMaatschappelijkeActiviteitIds = () =>
  createSelector(
    selectVestiging,
    state => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return undefined;
      }

      return data.map(({ maatschappelijke_activiteit: ma }) => ma.replace(/(?:[^\d]+)(\d+)(?:[^\d]*)/, '$1'));
    },
  );
