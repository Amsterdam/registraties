import produce from 'immer';

import {
  AUTHORIZE_USER,
  SHOW_GLOBAL_ERROR,
  RESET_GLOBAL_ERROR,
  AUTHENTICATE_USER,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
  LOAD_DATA_PENDING,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  userName: undefined,
  userScopes: [],
  accessToken: undefined,
  status: undefined,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATE_USER:
      case AUTHORIZE_USER:
        draft.userName = action.payload.userName;
        draft.userScopes = action.payload.userScopes;
        draft.accessToken = action.payload.accessToken;
        break;

      case SHOW_GLOBAL_ERROR:
        draft.error = !!action.payload;
        draft.errorMessage = action.payload;
        draft.loading = false;
        break;

      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        break;

      case LOAD_DATA_PENDING:
        draft.status = 'pending';
        break;

      case LOAD_DATA_SUCCESS:
        draft.status = 'success';
        break;

      case LOAD_DATA_FAILED:
        draft.status = 'failed';
        break;
    }
  });
