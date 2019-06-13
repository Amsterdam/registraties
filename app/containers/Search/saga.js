import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { getRequestOptions } from 'shared/services/auth/auth';
import configuration from 'shared/services/configuration/configuration';

import { typeAheadFailed, typeAheadSuccess } from './actions';
import { INPUT_CHANGE, SEARCH_SELECT } from './constants';

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
  const { vboId, ligId, brkId } = action.payload;

  if (vboId) {
    yield put(push(`/vbo/${vboId}/`));
  } else if (ligId) {
    yield put(push(`/lig/${ligId}/`));
  } else if (brkId) {
    yield put(push(`/brk/${brkId}/`));
  }
}

export default function* watchSearchSaga() {
  yield all([takeLatest(INPUT_CHANGE, inputChange), takeLatest(SEARCH_SELECT, searchSelect)]);
}
