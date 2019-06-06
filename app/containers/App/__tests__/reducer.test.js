import reducer, { initialState } from '../reducer';

import {
  AUTHENTICATE_USER,
  AUTHORIZE_USER,
  COMPLETE_PROGRESS,
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
} from '../constants';

describe('containers/App/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('it should handle AUTHENTICATE_USER/AUTHORIZE_USER', () => {
    const payload = {
      userName: 'Yoda',
      userScopes: ['Naboo'],
      accessToken: 'nosdufysifhbi4ferv23534fdsg',
    };

    const payloadEmpty = {
      userName: '',
      userScopes: [],
      accessToken: null,
    };

    const actionAuthenticate = {
      type: AUTHENTICATE_USER,
      payload,
    };

    const actionAuthorize = {
      type: AUTHORIZE_USER,
      payload,
    };

    expect(reducer(initialState, actionAuthenticate)).toEqual({ ...initialState, ...payload });
    expect(reducer(initialState, { type: AUTHENTICATE_USER })).toEqual({ ...initialState, ...payloadEmpty });

    expect(reducer(initialState, actionAuthorize)).toEqual({ ...initialState, ...payload });
    expect(reducer(initialState, { type: AUTHORIZE_USER })).toEqual({ ...initialState, ...payloadEmpty });
  });

  it('it should handle COMPLETE_PROGRESS', () => {
    const action = {
      type: COMPLETE_PROGRESS,
    };

    const result = {
      progress: {
        current: initialState.progress.max,
        max: initialState.progress.max,
      },
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, ...result });
  });

  it('it should handle INCREMENT_PROGRESS', () => {
    const action = {
      type: INCREMENT_PROGRESS,
    };

    const result = {
      progress: {
        current: initialState.progress.current + 3,
        max: initialState.progress.max,
      },
    };

    let newState = reducer(initialState, action);
    newState = reducer(newState, action);
    newState = reducer(newState, action);
    expect(newState).toEqual({ ...initialState, ...result });
  });

  it('it should handle RESET_PROGRESS', () => {
    const action = {
      type: RESET_PROGRESS,
    };

    let newState = reducer(initialState, { type: INCREMENT_PROGRESS });
    newState = reducer(newState, { type: INCREMENT_PROGRESS });
    newState = reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('it should handle LOAD_BAG_DATA', () => {
    const payloadVboId = {
      vboId: '0363010012086329',
    };
    const payloadLigId = {
      ligId: '0363020001024636',
    };
    const payloadBrkId = {
      vboId: 'ASD12 P 03512 A 0002',
    };

    const action = {
      type: LOAD_BAG_DATA,
    };

    expect(reducer(initialState, { ...action, payload: payloadVboId })).toEqual({ ...initialState, ...payloadVboId });
    expect(reducer(initialState, { ...action, payload: payloadLigId })).toEqual({ ...initialState, ...payloadLigId });
    expect(reducer(initialState, { ...action, payload: payloadBrkId })).toEqual({ ...initialState, ...payloadBrkId });
  });

  it('it should handle LOAD_DATA_FAILED', () => {
    const action = {
      type: LOAD_DATA_FAILED,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, status: LOAD_DATA_FAILED });
  });

  it('it should handle LOAD_DATA_PENDING', () => {
    const action = {
      type: LOAD_DATA_PENDING,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, status: LOAD_DATA_PENDING });
  });

  it('it should handle LOAD_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_DATA_SUCCESS,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, status: LOAD_DATA_SUCCESS });
  });

  it('it should handle MAX_PROGRESS_COUNT', () => {
    const payload = 9999;

    const action = {
      type: MAX_PROGRESS_COUNT,
      payload,
    };

    const result = {
      progress: {
        current: initialState.progress.current,
        max: payload,
      },
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, ...result });
  });

  it('it should handle PROGRESS', () => {
    const payload = 13;

    const action = {
      type: PROGRESS,
      payload,
    };

    const result = {
      progress: {
        current: payload,
        max: initialState.progress.max,
      },
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, ...result });
  });

  it('it should handle SHOW_GLOBAL_ERROR', () => {
    const payload = 'Here be dragons';

    const action = {
      type: SHOW_GLOBAL_ERROR,
      payload,
    };

    const result = {
      error: true,
      errorMessage: payload,
      loading: false,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, ...result });
  });

  it('it should handle RESET_GLOBAL_ERROR', () => {
    const action = {
      type: RESET_GLOBAL_ERROR,
    };

    reducer(initialState, { type: SHOW_GLOBAL_ERROR, payload: 'Oh noes!' });
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('it should handle UNABLE_TO_FETCH', () => {
    const action = {
      type: UNABLE_TO_FETCH,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, status: UNABLE_TO_FETCH });
  });

  it('it should handle UNAUTHORIZED', () => {
    const action = {
      type: UNAUTHORIZED,
    };

    expect(reducer(initialState, action)).toEqual({ ...initialState, status: UNAUTHORIZED });
  });
});
