import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectLigplaats = state => (state && state.ligplaats) || initialState;

export const makeSelectLIGNummeraanduidingId = createSelector(
  selectLigplaats,
  state => {
    if (!state.data) {
      return state.data;
    }

    const { data } = state;

    if (!data.hoofdadres) {
      return null;
    }

    return data.hoofdadres.landelijk_id;
  },
);
