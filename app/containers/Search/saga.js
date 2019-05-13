import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import configuration from 'shared/services/configuration/configuration';
import { getAuthHeaders } from 'shared/services/auth/auth';

import { typeAheadFailed, typeAheadSuccess } from './actions';
import { INPUT_CHANGE, SEARCH_SELECT } from './constants';

const { API_ROOT } = configuration;
const TYPEAHEAD_API = 'typeahead?q=';

const requestOptions = {
  headers: getAuthHeaders(),
};

export function* inputChange(action) {
  const input = action.payload;
  // const labels = ['Adressen', 'Kadastrale objecten', 'Monumenten'];
  const labels = ['Adressen'];

  try {
    const data = yield call(request, `${API_ROOT}${TYPEAHEAD_API}${input}`, requestOptions);
    const results = data.filter(({ label }) => labels.includes(label));

    if (results) {
      yield put(typeAheadSuccess(results));
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
  yield takeLatest(INPUT_CHANGE, inputChange);
  yield takeLatest(SEARCH_SELECT, searchSelect);
}
