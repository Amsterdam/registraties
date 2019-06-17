import { LOAD_DATA_PENDING } from 'containers/App/constants';
import reducer, { initialState } from '../reducer';
import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS } from '../constants';
import verblijfsobject from './verblijfsobject.json';

describe('containers/Verblijfsobject/reducer', () => {
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
    const adresseerbaarObjectId = '0363010000864314';
    const payload = { adresseerbaarObjectId };
    const actionLoadData = {
      type: LOAD_DATA,
      payload,
    };

    const prevState = { ...initialState, adresseerbaarObjectId: '098q394234', data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
  });

  it('should handle LOAD_DATA_SUCCESS', () => {
    const adresseerbaarObjectId = '0363010000864314';
    const payload = verblijfsobject;
    const actionLoadData = {
      type: LOAD_DATA_SUCCESS,
      payload,
    };

    const prevState = { ...initialState, adresseerbaarObjectId, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, data: payload });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId, data: payload });
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
});
