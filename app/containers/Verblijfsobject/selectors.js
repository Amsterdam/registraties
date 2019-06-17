import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { initialState as ligplaatsInitialState } from 'containers/Ligplaats/reducer';
import { formatData, isArray, isObject } from 'utils';

import { initialState } from './reducer';

const selectVerblijfsobject = state => (state && state.verblijfsobject) || initialState;
const selectLigplaats = state => (state && state.ligplaats) || ligplaatsInitialState;

export const allowedDataKeys = [
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
  'verhuurbare_eenheden',
];

export const makeSelectVerblijfsobjectData = createSelector(
  selectVerblijfsobject,
  makeSelectLocale,
  (state, locale) => {
    const { data } = state;

    if (!data) {
      return data;
    }

    const keys = allowedDataKeys;

    return formatData({ data, keys, locale });
  },
);

export const makeSelectVerblijfsobjectId = createSelector(
  selectVerblijfsobject,
  state => {
    const { data } = state;

    if (!data) {
      return data;
    }

    return data.verblijfsobjectidentificatie;
  },
);

export const makeSelectVBONummeraanduidingId = createSelector(
  selectVerblijfsobject,
  state => {
    const { data } = state;

    if (!data) {
      return data;
    }

    if (!isObject(data.hoofdadres)) {
      return null;
    }

    return data.hoofdadres.landelijk_id;
  },
);

export const bboxCenter = bbox => ({
  x: Math.floor((bbox[2] + bbox[0]) / 2),
  y: Math.floor((bbox[3] + bbox[1]) / 2),
});

export const makeSelectCoordinates = createSelector(
  selectVerblijfsobject,
  selectLigplaats,
  (vbo, lig) => {
    const hasVboData = !!vbo && !!vbo.data;
    const hasLigData = !!lig && !!lig.data;

    if (!hasVboData && !hasLigData) {
      return undefined;
    }

    const data = vbo.data || lig.data;

    if (!data.bbox && !data.geometrie) {
      return undefined;
    }

    let x;
    let y;

    if (data.geometrie.type === 'Point') {
      [x, y] = data.geometrie.coordinates;
    } else if (isArray(data.bbox) && data.bbox.length === 4) {
      return bboxCenter(data.bbox);
    } else {
      return undefined;
    }

    return { x, y };
  },
);
