import { LOAD_DATA_PENDING } from 'containers/App/constants';
import reducer, { initialState } from '../reducer';
import {
  LOAD_IDS_FAILED,
  LOAD_DATA_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_IDS_NO_RESULTS,
  LOAD_DATA_NO_RESULTS,
} from '../constants';
import vestiging from './vestiging.json';

describe('containers/Vestiging/reducer', () => {
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

  it('should handle LOAD_DATA_SUCCESS', () => {
    const payload = vestiging;
    const actionLoadData = {
      type: LOAD_DATA_SUCCESS,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, data: payload });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, data: payload });
  });

  it('should handle LOAD_DATA_FAILED', () => {
    const payload = 'Nope. Just nope.';
    const actionLoadData = {
      type: LOAD_DATA_FAILED,
      payload,
    };

    expect(reducer(initialState, actionLoadData)).toEqual({
      ...initialState,
      data: null,
      error: true,
      errorMessage: payload,
    });
  });

  it('should handle LOAD_IDS_FAILED', () => {
    const payload = 'Nope. Just nope.';
    const actionLoadData = {
      type: LOAD_IDS_FAILED,
      payload,
    };

    expect(reducer(initialState, actionLoadData)).toEqual({
      ...initialState,
      data: null,
      error: true,
      errorMessage: payload,
    });
  });

  it('should handle LOAD_DATA_NO_RESULTS', () => {
    const actionLoadData = {
      type: LOAD_DATA_NO_RESULTS,
    };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, data: null });
  });

  it('should handle LOAD_IDS_NO_RESULTS', () => {
    const actionLoadData = {
      type: LOAD_IDS_NO_RESULTS,
    };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, data: null });
  });
});
