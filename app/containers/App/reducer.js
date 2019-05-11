import produce from 'immer';

import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  LOAD_DATA_FAILED,
  LOAD_DATA_PENDING,
  LOAD_DATA_SUCCESS,
  PROGRESS,
  RESET_GLOBAL_ERROR,
  SHOW_GLOBAL_ERROR,
  UNABLE_TO_FETCH,
  UNAUTHORIZED,
} from './constants';

// The initial state of the App
export const initialState = {
  accessToken: undefined,
  error: false,
  errorMessage: '',
  loading: false,
  progress: 0,
  status: undefined,
  userName: undefined,
  userScopes: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    const { payload } = action;

    switch (action.type) {
      case AUTHORIZE_USER:
      case AUTHENTICATE_USER:
        draft.userName = (payload && payload.userName) || '';
        draft.userScopes = (payload && payload.userScopes) || [];
        draft.accessToken = (payload && payload.accessToken) || null;
        break;

      case SHOW_GLOBAL_ERROR:
        draft.error = !!payload;
        draft.errorMessage = payload;
        draft.loading = false;
        break;

      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        break;

      case LOAD_DATA_PENDING:
        draft.status = LOAD_DATA_PENDING;
        break;

      case LOAD_DATA_SUCCESS:
        draft.status = LOAD_DATA_SUCCESS;
        break;

      case LOAD_DATA_FAILED:
        draft.status = LOAD_DATA_FAILED;
        break;

      case UNAUTHORIZED:
        draft.status = UNAUTHORIZED;
        break;

      case UNABLE_TO_FETCH:
        draft.status = UNABLE_TO_FETCH;
        break;

      case PROGRESS:
        draft.progress = action.payload;
    }
  });
