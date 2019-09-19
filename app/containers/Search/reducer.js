import produce from 'immer';
import { SEARCH_SELECT, INPUT_CHANGE, TYPE_AHEAD_SUCCESS, TYPE_AHEAD_FAILED } from './constants';

// The initial state of the App
export const initialState = {
  brkId: undefined,
  error: false,
  errorMessage: '',
  input: '',
  ligId: undefined,
  loading: false,
  results: [],
  vboId: undefined,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_SELECT:
        draft.ligId = action.payload.ligId;
        draft.vboId = action.payload.vboId;
        draft.brkId = action.payload.brkId;
        draft.results = [];
        break;

      case INPUT_CHANGE:
        draft.input = action.payload;
        break;

      case TYPE_AHEAD_SUCCESS:
        draft.results = action.payload;
        draft.error = false;
        draft.errorMessage = '';
        break;

      case TYPE_AHEAD_FAILED:
        draft.error = true;
        draft.errorMessage = action.payload;
        draft.input = '';
        draft.results = [];
        break;
    }
  });
