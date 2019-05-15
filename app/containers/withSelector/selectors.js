import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData, isArray, isObject, isValidSubjectNP, isValidSubjectNNP, isAppartment } from 'utils';
import messages from 'containers/App/messages';

export const selectBAG = state => state.bag;
const selectKadastraalObject = state => state.kadastraalObject;
const selectKadastraalSubjectNP = state => state.kadastraalSubjectNP;
const selectKadastraalSubjectNNP = state => state.kadastraalSubjectNNP;
const selectLigplaats = state => state.ligplaats;
const selectNummeraanduiding = state => state.nummeraanduiding;
const selectPand = state => state.pand;
const selectVerblijfsobject = state => state.verblijfsobject;
const selectVestiging = state => state.vestiging;
const selectOpenbareRuimte = state => state.openbareRuimte;
const selectWoonplaatsData = state => state.woonplaats;
const selectTOC = state => state.toc;

export const makeSelectVerblijfsobjectData = () =>
  createSelector(
    selectVerblijfsobject,
    makeSelectLocale(),
    (state, locale) => {
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
        'toegang',
        'verblijfsobjectidentificatie',
        'verhuurbare-eenheden',
      ];

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectNummeraanduidingData = () =>
  createSelector(
    selectNummeraanduiding,
    makeSelectLocale(),
    (state, locale) => {
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
        'type',
        'begin_geldigheid',
        'einde_geldigheid',
      ];

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectVBONummeraanduidingId = () =>
  createSelector(
    selectVerblijfsobject,
    state => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      return data.hoofdadres.landelijk_id;
    },
  );

export const makeSelectLIGNummeraanduidingId = () =>
  createSelector(
    selectLigplaats,
    state => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      return data.hoofdadres.landelijk_id;
    },
  );

export const makeSelectOpenbareRuimteId = () =>
  createSelector(
    selectNummeraanduiding,
    state => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      return data.openbare_ruimte.landelijk_id;
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
    makeSelectLocale(),
    (state, locale) => {
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

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectKadastraalObjectData = () =>
  createSelector(
    selectKadastraalObject,
    makeSelectLocale(),
    (state, locale) => {
      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return undefined;
      }

      const keys = ['id', 'in_onderzoek', 'koopjaar', 'koopsom', 'objectnummer', 'aanduiding'];

      return results.map(object => formatData({ data: object, keys, locale }));
    },
  );

/**
 * Natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNPData = () =>
  createSelector(
    selectKadastraalSubjectNP,
    makeSelectLocale(),
    (state, locale) => {
      const { data } = state;

      if (!data || !isArray(data) || !data.length) {
        return data;
      }

      const keys = [
        'geboortedatum',
        'geboorteland',
        'geboorteplaats',
        'geslacht',
        'naam',
        'overlijdensdatum',
        'voornamen',
        'voorvoegsels',
      ];

      const results = data.filter(isValidSubjectNP).map(subject => formatData({ data: subject, keys, locale }));

      if (!results.length) {
        return null;
      }

      return results;
    },
  );

/**
 * Niet-natuurlijk persoon
 */
export const makeSelectKadastraalSubjectNNPData = () =>
  createSelector(
    selectKadastraalSubjectNNP,
    makeSelectLocale(),
    (state, locale) => {
      const { data } = state;

      if (!data || !isArray(data) || !data.length) {
        return data;
      }

      const keys = ['kvknummer', 'rechtsvorm', 'rsin', 'statutaire_naam'];

      const results = data.filter(isValidSubjectNNP).map(subject => formatData({ data: subject, keys, locale }));

      if (!results.length) {
        return null;
      }

      return results;
    },
  );

export const makeSelectFromObjectAppartment = key =>
  createSelector(
    selectKadastraalObject,
    state => {
      const { data: { results } = {} } = state;

      if (!results || !isArray(results) || !results.length) {
        return undefined;
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

export const makeSelectVestigingData = () =>
  createSelector(
    selectVestiging,
    makeSelectLocale(),
    (state, locale) => {
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
        .map(vestiging => formatData({ data: vestiging, keys, locale }))
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
        return null;
      }

      return formatted.length === 1 ? formatted[0] : formatted;
    },
  );

export const makeSelectOpenbareRuimteData = () =>
  createSelector(
    selectOpenbareRuimte,
    makeSelectLocale(),
    (state, locale) => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      const keys = ['naam', 'type', 'openbare_ruimte_identificatie'];

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectGebiedData = () =>
  createSelector(
    selectNummeraanduiding,
    makeSelectLocale(),
    (state, locale) => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      data.wijk = data.buurtcombinatie;

      const keys = ['buurt', 'wijk', 'stadsdeel'];

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectCoordinates = () =>
  createSelector(
    selectVerblijfsobject,
    selectLigplaats,
    (vbo, lig) => {
      const data = vbo.data || lig.data;

      if (!data || (!data.bbox && !data.geometrie)) {
        return undefined;
      }

      let x;
      let y;

      if (data.geometrie.type === 'Point') {
        [x, y] = data.geometrie.coordinates;
      } else {
        x = Math.floor((data.bbox[2] + data.bbox[0]) / 2);
        y = Math.floor((data.bbox[3] + data.bbox[1]) / 2);
      }

      return { x, y };
    },
  );

export const makeSelectWoonplaatsId = () =>
  createSelector(
    selectNummeraanduiding,
    ({ data }) => {
      if (!data || !data.woonplaats || !data.woonplaats.landelijk_id) {
        return undefined;
      }

      return data.woonplaats.landelijk_id;
    },
  );

export const makeSelectWoonplaatsData = () =>
  createSelector(
    selectWoonplaatsData,
    makeSelectLocale(),
    (state, locale) => {
      const { data } = state;

      if (!data) {
        return undefined;
      }

      const keys = ['naam', 'woonplaatsidentificatie'];

      return formatData({ data, keys, locale });
    },
  );

export const makeSelectTOC = () =>
  createSelector(
    selectTOC,
    ({ toc }) => toc,
  );

export const makeSelectSummary = () =>
  createSelector(
    [
      makeSelectAdres(),
      makeSelectVerblijfsobjectData(),
      makeSelectNummeraanduidingData(),
      makeSelectPandData(),
      makeSelectKadastraalObjectData(),
      makeSelectKadastraalSubjectNNPData(),
      makeSelectOpenbareRuimteData(),
    ],
    (adr = [], vbo = [], num = [], pnd = [], brko = [], nnp = [], opr = []) => {
      const summary = {};

      const getValue = (dataset, id, valueSeparator = ', ') => {
        const values = new Set();

        dataset.forEach(item => {
          if (isObject(item) && !!item.key && item.key === id) {
            values.add(item.value);
          } else if (isArray(item)) {
            const matchingItem = item.find(({ key }) => key === id);

            if (matchingItem) {
              values.add(matchingItem.value);
            }
          }
        });

        const valuesArray = Array.from(values);

        return valueSeparator ? valuesArray.join(valueSeparator) : valuesArray;
      };

      if (adr && adr.length) {
        const adres = getValue(adr, 'adres');
        const postcode = getValue(adr, 'postcode');

        summary.address = {
          label: messages.address,
          value: [adres, ' ', postcode],
        };
      }

      if (opr && opr.length) {
        const oprId = getValue(opr, 'openbare_ruimte_identificatie');

        summary.public_space_id = {
          label: messages.public_space_id,
          value: oprId,
        };
      }

      if (num && num.length) {
        const numId = getValue(num, 'nummeraanduidingidentificatie');

        summary.number_identification_id = {
          label: messages.number_identification_id,
          value: numId,
        };
      }

      if (vbo && vbo.length) {
        const vboId = getValue(vbo, 'verblijfsobjectidentificatie');

        summary.accommodation_object_id = {
          label: messages.accommodation_object_id,
          value: vboId,
        };
      }

      if (pnd && pnd.length) {
        const pndId = getValue(pnd, 'pandidentificatie');

        summary.house_id = {
          label: messages.house_id,
          value: pndId,
        };
      }

      if (brko && brko.length) {
        const objectNrs = getValue(brko, 'aanduiding', null);

        if (objectNrs.length) {
          const label =
            objectNrs.length > 1 ? messages.cadastral_object_indications : messages.cadastral_object_indication;

          summary.cadastral_object_nr = {
            label,
            value: objectNrs.join(', '),
          };
        }
      }

      if (nnp && nnp.length) {
        const kvkNrs = getValue(nnp, 'kvknummer', null);

        if (kvkNrs.length) {
          const kvkNrsLabel = kvkNrs.length > 1 ? messages.chamber_of_commerce_nrs : messages.chamber_of_commerce_nr;

          summary.chamber_of_commerce_nr = {
            label: kvkNrsLabel,
            value: kvkNrs.join(', '),
          };
        }

        const rsinNrs = getValue(nnp, 'rsin', null);

        if (rsinNrs.length) {
          const rsinNrsLabel = rsinNrs.length > 1 ? messages.rsins : messages.rsin;

          summary.RSIN = {
            label: rsinNrsLabel,
            value: rsinNrs.join(', '),
          };
        }
      }

      return summary;
    },
  );
