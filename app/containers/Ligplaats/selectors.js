import { createSelector } from 'reselect';

const selectLigplaats = state => state.ligplaats;

export const makeSelectLIGNummeraanduidingId = () =>
  createSelector(
    selectLigplaats,
    state => {
      if (!state) {
        return undefined;
      }

      const { data } = state;

      if (!data) {
        return undefined;
      }

      return data.hoofdadres.landelijk_id;
    },
  );
