import reducer, { initialState } from '../reducer';
import { INPUT_CHANGE, SEARCH_SELECT, TYPE_AHEAD_SUCCESS, TYPE_AHEAD_FAILED } from '../constants';

describe('containers/Search/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SEARCH_SELECT', () => {
    const actionWithVboId = {
      type: SEARCH_SELECT,
      payload: {
        vboId: 'foobarbaz',
      },
    };
    const actionWithBrkId = {
      type: SEARCH_SELECT,
      payload: {
        brkId: 'bazfoobar',
      },
    };
    const actionWithLigId = {
      type: SEARCH_SELECT,
      payload: {
        ligId: 'bazbarfoo',
      },
    };

    const prevState = { ...initialState, vboId: 'blehblehbleh' };

    expect(reducer(prevState, actionWithVboId)).toEqual({ ...initialState, ...actionWithVboId.payload });
    expect(reducer(initialState, actionWithVboId)).toEqual({ ...initialState, ...actionWithVboId.payload });
    expect(reducer(initialState, actionWithBrkId)).toEqual({ ...initialState, ...actionWithBrkId.payload });
    expect(reducer(initialState, actionWithLigId)).toEqual({ ...initialState, ...actionWithLigId.payload });
  });

  it('should handle INPUT_CHANGE', () => {
    const input = 'Here is some input';
    const actionInputChanged = {
      type: INPUT_CHANGE,
      payload: input,
    };

    const prevState = { ...initialState, results: ['a', 'b', 'c'] };

    expect(reducer(initialState, actionInputChanged)).toEqual({ ...initialState, input });
    expect(reducer(prevState, actionInputChanged)).toEqual({ ...prevState, input });
  });

  it('should handle TYPE_AHEAD_SUCCESS', () => {
    const results = ['a', 'b', 'c'];
    const actionTypeAheadSuccess = {
      type: TYPE_AHEAD_SUCCESS,
      payload: results,
    };

    const prevState = { ...initialState, results: ['d', 'e', 'f'] };

    expect(reducer(initialState, actionTypeAheadSuccess)).toEqual({ ...initialState, results });
    expect(reducer(prevState, actionTypeAheadSuccess)).toEqual({ ...initialState, results });
  });

  it('should handle TYPE_AHEAD_FAILED', () => {
    const error = 'Something very bad happened';
    const payload = error;
    const actionTypeAheadFailed = {
      type: TYPE_AHEAD_FAILED,
      payload,
    };
    const resultState = {
      error: true,
      errorMessage: payload,
    };

    expect(reducer(initialState, actionTypeAheadFailed)).toEqual({ ...initialState, ...resultState });
  });
});
