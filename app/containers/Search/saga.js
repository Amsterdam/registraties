import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';

import { typeAheadFailed, typeAheadSuccess } from './actions';
import { INPUT_CHANGE, SEARCH_SELECT } from './constants';
import { getURL } from '../../utils/routing/utils';

const { API_ROOT } = configuration;

export const TYPEAHEAD_API = `${API_ROOT}typeahead?q=`;

export function* inputChange(action) {
  const input = action.payload;

  try {
    const data = yield call(request, `${TYPEAHEAD_API}${input}`, getRequestOptions());

    if (data) {
      yield put(typeAheadSuccess(data));
    }
  } catch (error) {
    yield put(typeAheadFailed(error));
  }
}

export function* searchSelect(action) {
  const url = getURL(action.payload);
  yield put(push(url));
}

export default function* watchSearchSaga() {
  yield all([takeLatest(INPUT_CHANGE, inputChange), takeLatest(SEARCH_SELECT, searchSelect)]);
}
