import produce from 'immer';
import { LOAD_DATA_PENDING } from 'containers/App/constants';
import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  adresseerbaarObjectId: null,
  loading: false,
  error: false,
  data: undefined,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case LOAD_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case LOAD_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case LOAD_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });
