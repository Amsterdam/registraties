import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isApartment } from 'utils';
import { initialState } from './reducer';

export const selectKadastraalObject = state => (state && state.kadastraalObject) || initialState;
export const allowedDataKeys = ['id', 'in_onderzoek', 'koopjaar', 'koopsom', 'objectnummer', 'aanduiding'];

export const makeSelectKadastraalObjectData = createSelector(
  selectKadastraalObject,
  makeSelectLocale,
  (state, locale) => {
    if (!state.data) {
      return state.data;
    }

    const {
      data: { results },
    } = state;

    const keys = allowedDataKeys;

    if (results) {
      return results.map(object => formatData({ data: object, keys, locale }));
    }

    const { data } = state;

    if (data.id) {
      return formatData({ data, keys });
    }

    return null;
  },
);

export const makeSelectFromObjectAppartment = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state.data) {
        return state.data;
      }

      const {
        data: { results },
      } = state;

      if (!results || !isArray(results) || !results.length) {
        return null;
      }

      return results
        .filter(isApartment)
        .map(item => item[key])
        .filter(Boolean);
    },
  );

export const makeSelectFromObject = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state.data) {
        return state.data;
      }

      const {
        data: { results },
      } = state;

      if (!results || !isArray(results) || !results.length) {
        return null;
      }

      return results.map(item => item[key]).filter(Boolean);
    },
  );

export const makeSelectKadastraalSubjectLinks = (isNatuurlijkPersoon = true) =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state.data) {
        return state.data;
      }

      const {
        data: { results },
      } = state;

      if (!results || !isArray(results) || !results.length) {
        return null;
      }

      const foundSubjects = results
        // property 'rechten' only present when a session is authorized
        .filter(({ rechten }) => !!rechten)
        .find(kadastraalObject =>
          kadastraalObject.rechten.some(({ kadastraal_subject: subject }) =>
            isNatuurlijkPersoon ? subject.naam : !subject.naam,
          ),
        );

      if (!foundSubjects) {
        return null;
      }

      // eslint-disable-next-line no-underscore-dangle
      return foundSubjects.rechten.map(data => data.kadastraal_subject._links.self.href);
    },
  );
