import clonedeep from 'lodash.clonedeep';

import { initialState as numInitialState } from 'containers/Nummeraanduiding/reducer';
import { initialState as vboInitialState } from 'containers/Verblijfsobject/reducer';
import { initialState as pndInitialState } from 'containers/Pand/reducer';
import { initialState as brkoInitialState } from 'containers/KadastraalObject/reducer';
import { initialState as brksInitialState } from 'containers/KadastraalSubjectNNP/reducer';
import { initialState as oprInitialState } from 'containers/OpenbareRuimte/reducer';

import numData from 'containers/Nummeraanduiding/__tests__/nummeraanduiding.json';
import vboData from 'containers/Verblijfsobject/__tests__/verblijfsobject.json';
import pndData from 'containers/Pand/__tests__/pand.json';
import brkoData from 'containers/KadastraalObject/__tests__/kadastraalObject.json';
import brksData from 'containers/KadastraalSubjectNNP/__tests__/subjectNNP.json';
import oprData from 'containers/OpenbareRuimte/__tests__/openbareRuimte.json';

import { makeSelectSummary } from '../selectors';

describe('containers/Summary/selectors', () => {
  describe('selectSearch', () => {
    const state = {
      nummeraanduiding: { ...numInitialState, data: numData },
      verblijfsobject: { ...vboInitialState, data: vboData },
      pand: { ...pndInitialState, data: pndData },
      kadastraalObject: { ...brkoInitialState, data: brkoData },
      kadastraalSubjectNNP: {
        ...brksInitialState,
        data: [brksData['https://api/brk/subject/NL.KAD.Persoon.000000000/']],
      },
      openbareRuimte: { ...oprInitialState, data: oprData },
    };
    const summary = makeSelectSummary(state);

    it('should return an empty object', () => {
      expect(makeSelectSummary({})).toEqual({});
    });

    it('should return the state', () => {
      const result = {
        address: { label: { id: 'registraties.address' }, value: `${numData.adres} ${numData.postcode}` },
        public_space_id: {
          label: { id: 'registraties.public_space_id' },
          value: oprData.openbare_ruimte_identificatie,
        },
        number_identification_id: {
          label: { id: 'registraties.number_identification.id' },
          value: numData.nummeraanduidingidentificatie,
        },
        accommodation_object_id: {
          label: { id: 'registraties.accommodation_object.id' },
          value: vboData.verblijfsobjectidentificatie,
        },
        house_id: { label: { id: 'registraties.house.id' }, value: pndData.pandidentificatie },
        cadastral_object_nr: {
          label: { id: 'registraties.cadastral_object.indication' },
          value: brkoData.results[0].aanduiding,
        },
        RSIN: {
          label: {
            id: 'registraties.rsin',
          },
          value: '1234567',
        },
        chamber_of_commerce_nr: {
          label: {
            id: 'registraties.chamber_of_commerce.nr',
          },
          value: '12345678',
        },
      };

      expect(summary).toEqual(result);
    });

    it('should omit address category when there are no values', () => {
      const noAddressState = clonedeep(state);
      noAddressState.nummeraanduiding.data = null;

      const noAddressSummary = makeSelectSummary(noAddressState);

      expect(noAddressSummary.address).toBeUndefined();
    });

    it('should omit public space category when there are no values', () => {
      const noPublicSpaceState = clonedeep(state);
      noPublicSpaceState.openbareRuimte.data = null;

      const noPublicSpaceSummary = makeSelectSummary(noPublicSpaceState);

      expect(noPublicSpaceSummary.public_space_id).toBeUndefined();
    });

    it('should omit number identification category when there are no values', () => {
      const noNumberIdentificationState = clonedeep(state);
      noNumberIdentificationState.nummeraanduiding.data = null;

      const noNumberIdentificationSummary = makeSelectSummary(noNumberIdentificationState);

      expect(noNumberIdentificationSummary.number_identification_id).toBeUndefined();
    });

    it('should omit accommodation object identification category when there are no values', () => {
      const noAccommodationObjectIdentificationState = clonedeep(state);
      noAccommodationObjectIdentificationState.verblijfsobject.data = null;

      const noAccommodationObjectSummary = makeSelectSummary(noAccommodationObjectIdentificationState);

      expect(noAccommodationObjectSummary.accommodation_object_id).toBeUndefined();
    });

    it('should omit house identification category when there are no values', () => {
      const noHouseIdentificationState = clonedeep(state);
      noHouseIdentificationState.pand.data = null;

      const noHouseIdentificationSummary = makeSelectSummary(noHouseIdentificationState);

      expect(noHouseIdentificationSummary.house_id).toBeUndefined();
    });

    it('should omit brko category when there are no values', () => {
      const noBrkoState = clonedeep(state);
      noBrkoState.kadastraalObject.data = null;

      const noBrkoSummary = makeSelectSummary(noBrkoState);

      expect(noBrkoSummary.cadastral_object_nr).toBeUndefined();
    });

    it('should omit chamber of commers identification category and RSIN category when there are no values', () => {
      const noBrksState = clonedeep(state);
      noBrksState.kadastraalSubjectNNP.data = null;

      const noBrksSummary = makeSelectSummary(noBrksState);

      expect(noBrksSummary.chamber_of_commerce_nr).toBeUndefined();
      expect(noBrksSummary.RSIN).toBeUndefined();
    });

    it('should set plural translation strings for brko', () => {
      const pluralState = clonedeep(state);
      pluralState.kadastraalObject.data.results.push(clonedeep(pluralState.kadastraalObject.data.results[0]));
      pluralState.kadastraalObject.data.results[1].aanduiding += '9';

      const summaryMultiplEntries = makeSelectSummary(pluralState);

      expect(summary.cadastral_object_nr).not.toEqual(summaryMultiplEntries.cadastral_object_nr);
      expect(summaryMultiplEntries.cadastral_object_nr.value.split(',')).toHaveLength(2);
    });

    it('should set plural translation strings for brks', () => {
      const pluralState = clonedeep(state);
      pluralState.kadastraalSubjectNNP.data.push(clonedeep(pluralState.kadastraalSubjectNNP.data[0]));
      pluralState.kadastraalSubjectNNP.data[1].kvknummer += '9';
      pluralState.kadastraalSubjectNNP.data[1].rsin += '9';

      const summaryMultiplEntries = makeSelectSummary(pluralState);

      expect(summary.chamber_of_commerce_nr).not.toEqual(summaryMultiplEntries.chamber_of_commerce_nr);
      expect(summaryMultiplEntries.chamber_of_commerce_nr.value.split(',')).toHaveLength(2);

      expect(summary.RSIN).not.toEqual(summaryMultiplEntries.RSIN);
      expect(summaryMultiplEntries.RSIN.value.split(',')).toHaveLength(2);
    });
  });
});
