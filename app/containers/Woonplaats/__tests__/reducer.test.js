import { LOAD_DATA_PENDING } from 'containers/App/constants';
import reducer, { initialState } from '../reducer';

import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS } from '../constants';
import woonplaats from './woonplaats.json';

describe('containers/Woonplaats/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_DATA_PENDING', () => {
    const actionLoadDataPending = {
      type: LOAD_DATA_PENDING,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(prevState, actionLoadDataPending)).toEqual(initialState);
  });

  it('should handle LOAD_DATA', () => {
    const woonplaatsId = 'foobarbazqux';
    const payload = { woonplaatsId };
    const actionLoadData = {
      type: LOAD_DATA,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, woonplaatsId });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, woonplaatsId });
  });

  it('should handle LOAD_DATA_SUCCESS', () => {
    const data = woonplaats;
    const payload = woonplaats;
    const actionLoadDataSuccess = {
      type: LOAD_DATA_SUCCESS,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadDataSuccess)).toEqual({ ...initialState, data });
    expect(reducer(prevState, actionLoadDataSuccess)).toEqual({ ...initialState, data });
  });

  it('should handle LOAD_DATA_FAILED', () => {
    const error = 'Something very bad happened';
    const payload = error;
    const actionLoadDataFailed = {
      type: LOAD_DATA_FAILED,
      payload,
    };
    const resultState = {
      data: null,
      error: true,
      errorMessage: payload,
    };

    expect(reducer(initialState, actionLoadDataFailed)).toEqual({ ...initialState, ...resultState });
  });

  it('should handle LOAD_DATA_NO_RESULTS', () => {
    const actionLoadDataNoResults = {
      type: LOAD_DATA_NO_RESULTS,
    };
    const resultState = {
      data: null,
      error: false,
      errorMessage: '',
    };
    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadDataNoResults)).toEqual({ ...initialState, ...resultState });
    expect(reducer(prevState, actionLoadDataNoResults)).toEqual({ ...initialState, ...resultState });
  });
});
