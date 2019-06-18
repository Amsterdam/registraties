import produce from 'immer';

import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  COMPLETE_PROGRESS,
  EXCEPTION_OCCURRED,
  INCREMENT_PROGRESS,
  LOAD_BAG_DATA,
  LOAD_DATA_FAILED,
  LOAD_DATA_PENDING,
  LOAD_DATA_SUCCESS,
  MAX_PROGRESS_COUNT,
  PROGRESS,
  RESET_GLOBAL_ERROR,
  RESET_PROGRESS,
  SHOW_GLOBAL_ERROR,
  UNABLE_TO_FETCH,
  UNAUTHORIZED,
} from './constants';

// The initial state of the App
export const initialState = {
  accessToken: undefined,
  error: false,
  errorEventId: undefined,
  errorMessage: '',
  loading: false,
  progress: {
    current: 0,
    max: 1,
  },
  status: undefined,
  userName: undefined,
  userScopes: [],
};

export const initialRouteState = { location: '/' };

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
        draft.error = true;
        draft.errorMessage = payload;
        draft.loading = false;
        draft.errorEventId = undefined;
        break;

      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        draft.errorEventId = undefined;
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
        draft.progress.current = payload;
        break;

      case RESET_PROGRESS:
        draft.progress.current = 0;
        break;

      case COMPLETE_PROGRESS:
        draft.progress.current = state.progress.max;
        break;

      case INCREMENT_PROGRESS:
        draft.progress.current += 1;
        break;

      case MAX_PROGRESS_COUNT:
        draft.progress.max = payload;
        break;

      case LOAD_BAG_DATA:
        draft.vboId = payload.vboId;
        draft.ligId = payload.ligId;
        draft.brkId = payload.brkId;
        break;

      case EXCEPTION_OCCURRED:
        draft.errorEventId = payload;
        break;
    }
  });
