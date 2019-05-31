import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isAppartment } from 'utils';

const selectKadastraalObject = state => state.kadastraalObject;

export const makeSelectKadastraalObjectData = () =>
  createSelector(
    selectKadastraalObject,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return null;
      }

      const keys = ['id', 'in_onderzoek', 'koopjaar', 'koopsom', 'objectnummer', 'aanduiding'];

      return results.map(object => formatData({ data: object, keys, locale }));
    },
  );

export const makeSelectFromObjectAppartment = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return null;
      }

      return results
        .filter(isAppartment)
        .map(item => item[key])
        .filter(Boolean);
    },
  );

export const makeSelectFromObject = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return undefined;
      }

      return results.map(item => item[key]).filter(Boolean);
    },
  );

export const makeSelectKadastraalSubjectLinks = (isNatuurlijkPersoon = true) =>
  createSelector(
    selectKadastraalObject,
    state => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return undefined;
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
