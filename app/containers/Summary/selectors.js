import { createSelector } from 'reselect';
import messages from 'containers/App/messages';
import { isArray, isObject } from 'utils';

import { makeSelectAdres, makeSelectNummeraanduidingData } from 'containers/Nummeraanduiding/selectors';
import { makeSelectVerblijfsobjectData } from 'containers/Verblijfsobject/selectors';
import { makeSelectPandData } from 'containers/Pand/selectors';
import { makeSelectKadastraalObjectData } from 'containers/KadastraalObject/selectors';
import { makeSelectKadastraalSubjectNNPData } from 'containers/KadastraalSubjectNNP/selectors';
import { makeSelectOpenbareRuimteData } from 'containers/OpenbareRuimte/selectors';

export const makeSelectSummary = createSelector(
  [
    makeSelectAdres,
    makeSelectVerblijfsobjectData,
    makeSelectNummeraanduidingData,
    makeSelectPandData,
    makeSelectKadastraalObjectData,
    makeSelectKadastraalSubjectNNPData,
    makeSelectOpenbareRuimteData,
  ],
  (adr, vbo, num, pnd, brko, nnp, opr) => {
    const summary = {};

    const getValue = (dataset, id, valueSeparator = ', ') => {
      const values = new Set();

      dataset.forEach(item => {
        if (isObject(item) && !!item.key && item.key === id) {
          values.add(item.value);
        } else if (isArray(item)) {
          const matchingItem = item.find(({ key }) => key === id);
          values.add(matchingItem.value);
        }
      });

      const valuesArray = Array.from(values);

      return valueSeparator ? valuesArray.join(valueSeparator) : valuesArray;
    };

    if (isArray(adr)) {
      const adres = getValue(adr, 'adres');
      const postcode = getValue(adr, 'postcode');

      summary.address = {
        label: messages.address,
        value: [adres, postcode].join(' '),
      };
    }

    if (isArray(opr)) {
      const oprId = getValue(opr, 'openbare_ruimte_identificatie');

      summary.public_space_id = {
        label: messages.public_space_id,
        value: oprId,
      };
    }

    if (isArray(num)) {
      const numId = getValue(num, 'nummeraanduidingidentificatie');

      summary.number_identification_id = {
        label: messages.number_identification_id,
        value: numId,
      };
    }

    if (isArray(vbo)) {
      const vboId = getValue(vbo, 'verblijfsobjectidentificatie');

      summary.accommodation_object_id = {
        label: messages.accommodation_object_id,
        value: vboId,
      };
    }

    if (isArray(pnd)) {
      const pndId = getValue(pnd, 'pandidentificatie');

      summary.house_id = {
        label: messages.house_id,
        value: pndId,
      };
    }

    if (isArray(brko)) {
      const objectNrs = getValue(brko, 'aanduiding', null);

      const label = objectNrs.length > 1 ? messages.cadastral_object_indications : messages.cadastral_object_indication;

      summary.cadastral_object_nr = {
        label,
        value: objectNrs.join(', '),
      };
    }

    if (isArray(nnp)) {
      const kvkNrs = getValue(nnp, 'kvknummer', null);

      const kvkNrsLabel = kvkNrs.length > 1 ? messages.chamber_of_commerce_nrs : messages.chamber_of_commerce_nr;

      summary.chamber_of_commerce_nr = {
        label: kvkNrsLabel,
        value: kvkNrs.join(', '),
      };

      const rsinNrs = getValue(nnp, 'rsin', null);

      const rsinNrsLabel = rsinNrs.length > 1 ? messages.rsins : messages.rsin;

      summary.RSIN = {
        label: rsinNrsLabel,
        value: rsinNrs.join(', '),
      };
    }

    return summary;
  },
);
