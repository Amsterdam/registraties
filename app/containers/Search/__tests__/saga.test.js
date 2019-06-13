import { takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';

import results from './results.json';
import watchSearchSaga, { TYPEAHEAD_API, inputChange, searchSelect } from '../saga';
import { INPUT_CHANGE, SEARCH_SELECT, TYPE_AHEAD_SUCCESS, TYPE_AHEAD_FAILED } from '../constants';

describe('containers/Search/saga', () => {
  it('should watch watchSearchSaga', () => {
    testSaga(watchSearchSaga)
      .next()
      .all([takeLatest(INPUT_CHANGE, inputChange), takeLatest(SEARCH_SELECT, searchSelect)])
      .next()
      .isDone();
  });

  describe('inputChange', () => {
    const input = 'Zork';
    const action = {
      payload: input,
    };

    it('should call endpoint with input value', () => {
      expectSaga(inputChange, action)
        .call(request, `${TYPEAHEAD_API}${input}`, getRequestOptions())
        .run();
    });

    it('should dispatch typeahead success', () => {
      expectSaga(inputChange, action)
        .provide([[matchers.call.fn(request), results]])
        .put({
          type: TYPE_AHEAD_SUCCESS,
          payload: results,
        })
        .run();

      expectSaga(inputChange, action)
        .provide([[matchers.call.fn(request), undefined]])
        .not.put({
          type: TYPE_AHEAD_SUCCESS,
        })
        .run();
    });

    it('should catch exceptions', () => {
      const error = new Error('panic!!2!');

      expectSaga(inputChange, action)
        .provide([[matchers.call.fn(request), throwError(error)]])
        .put({
          type: TYPE_AHEAD_FAILED,
          payload: error,
        })
        .run();
    });
  });

  describe('searchSelect', () => {
    it('should redirect the page to the correct URL', () => {
      const vboId = '0363010000940054';
      const brkId = 'NL.KAD.OnroerendeZaak.11530351210002';
      const ligId = '0363020001036307';

      expectSaga(searchSelect, { payload: { vboId } })
        .put(push(`/vbo/${vboId}/`))
        .run();

      expectSaga(searchSelect, { payload: { brkId } })
        .put(push(`/brk/${brkId}/`))
        .run();

      expectSaga(searchSelect, { payload: { ligId } })
        .put(push(`/lig/${ligId}/`))
        .run();

      expectSaga(searchSelect, { payload: { vboId, brkId, ligId } })
        .put(push(`/vbo/${vboId}/`))
        .run();

      expectSaga(searchSelect, { payload: { brkId, ligId } })
        .put(push(`/lig/${ligId}/`))
        .run();
    });
  });
});
