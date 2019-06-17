import { LOAD_DATA_PENDING } from 'containers/App/constants';
import reducer, { initialState } from '../reducer';

import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS } from '../constants';
import subjectNNP from './subjectNNP.json';

describe('containers/KadastraalSubjectNNP/reducer', () => {
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
    const adresseerbaarObjectId = 'foobarbazqux';
    const payload = { adresseerbaarObjectId };
    const actionLoadData = {
      type: LOAD_DATA,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
  });

  it('should handle LOAD_DATA_SUCCESS', () => {
    const data = {
      count: 1,
      results: [subjectNNP['https://api/brk/subject/NL.KAD.Persoon.000000000/']],
    };
    const payload = data;
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
