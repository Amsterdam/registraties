import produce from 'immer';
import { SEARCH_SELECT, INPUT_CHANGE, TYPE_AHEAD_SUCCESS, TYPE_AHEAD_FAILED } from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  input: '',
  loading: false,
  results: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_SELECT:
        draft.ligId = action.payload.ligId;
        draft.vboId = action.payload.vboId;
        draft.results = [];
        break;

      case INPUT_CHANGE:
        draft.input = action.payload;
        draft.results = [];
        break;

      case TYPE_AHEAD_SUCCESS:
        draft.results = action.payload;
        break;

      case TYPE_AHEAD_FAILED:
        draft.error = action.payload;
        break;
    }
  });
