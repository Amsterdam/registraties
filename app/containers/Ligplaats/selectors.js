import { createSelector } from 'reselect';

const selectLigplaats = state => state.ligplaats;

export const makeSelectLIGNummeraanduidingId = () =>
  createSelector(
    selectLigplaats,
    state => {
      if (!state) {
        return undefined;
      }

      if (!state.data) {
        return state.data;
      }

      const { data } = state;

      return data.hoofdadres.landelijk_id;
    },
  );
