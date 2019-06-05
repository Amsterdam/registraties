import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectLigplaats = state => (state && state.ligplaats) || initialState;

export const makeSelectLIGNummeraanduidingId = createSelector(
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
