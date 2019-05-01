import produce from 'immer';
import { SEARCH_SELECT } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_SELECT:
        draft.latlng = action.payload.latlng;
        draft.location = action.payload.location;
        draft.resultObject = action.payload.resultObject;
        break;
    }
  });
