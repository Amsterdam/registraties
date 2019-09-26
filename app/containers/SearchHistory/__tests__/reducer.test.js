import reducer, { initialState } from '../reducer';
import { PUSH_SEARCH_HISTORY } from '../constants';

describe('containers/SearchHistory/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle PUSH_SEARCH_HISTORY', () => {
    const action = {
      type: PUSH_SEARCH_HISTORY,
      payload: {
        vboId: 'fooVboId',
        text: 'fooLabel',
      },
    };

    const expectedState = { searchHistory: [{ ...action.payload }, ...initialState.searchHistory] };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('no duplicate search entries are allowed', () => {
    const action = {
      type: PUSH_SEARCH_HISTORY,
      payload: {
        vboId: 'fooVboId',
        text: 'fooLabel',
      },
    };

    const expectedState = {
      searchHistory: [{ ...action.payload }, ...initialState.searchHistory],
    };

    let state = reducer(initialState, action);
    state = reducer(state, action);
    state = reducer(state, action);

    expect(state).toEqual(expectedState);
  });

  it('newest search should appear as first in the list', () => {
    const actionA = {
      type: PUSH_SEARCH_HISTORY,
      payload: {
        vboId: 'fooVboIdA',
        text: 'fooLabelA',
      },
    };

    const actionB = {
      type: PUSH_SEARCH_HISTORY,
      payload: {
        vboId: 'fooVboIdB',
        text: 'fooLabelB',
      },
    };

    const expectedState = {
      searchHistory: [{ ...actionB.payload }, { ...actionA.payload }, ...initialState.searchHistory],
    };

    let newState = reducer(initialState, actionA);
    newState = reducer(newState, actionB);
    expect(newState).toEqual(expectedState);
  });

  it('should only allow 10 items in search history', () => {
    let state = { ...initialState };
    for (let i = 0; i < 30; i += 1) {
      const action = {
        type: PUSH_SEARCH_HISTORY,
        payload: {
          vboId: 'fooVboId',
          text: `fooLabel-${i}`,
        },
      };
      state = reducer(state, action);
    }

    expect(state.searchHistory.length).toEqual(10);
  });
});
