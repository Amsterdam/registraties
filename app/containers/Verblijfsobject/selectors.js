import { createSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { formatData } from 'utils';

const selectVerblijfsobject = state => state.verblijfsobject;
const selectLigplaats = state => state.ligplaats;

export const makeSelectVerblijfsobjectData = () =>
  createSelector(
    selectVerblijfsobject,
    makeSelectLocale(),
    (state, locale) => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return data;
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

export const makeSelectVBONummeraanduidingId = () =>
  createSelector(
    selectVerblijfsobject,
    state => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return data;
      }

      return data.hoofdadres.landelijk_id;
    },
  );

export const makeSelectCoordinates = () =>
  createSelector(
    selectVerblijfsobject,
    selectLigplaats,
    (vbo, lig) => {
      const hasVboData = !!vbo && !!vbo.data;
      const hasLigData = !!lig && !!lig.data;
      if (!hasVboData && !hasLigData) {
        return undefined;
      }

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
