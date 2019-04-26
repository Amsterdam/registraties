import { fromJS } from 'immutable';

import { SEARCH_SELECT } from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
});

export default function mapReducer(state = initialState, action) {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case SEARCH_SELECT:
      return state
        .set('latlng', action.payload.latlng)
        .set('location', action.payload.location)
        .set('resultObject', action.payload.resultObject);

    default:
      return state;
  }
}
