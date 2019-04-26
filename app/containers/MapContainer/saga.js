import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SEARCH_SELECT } from './constants';

export function* searchSelect(action) {
  const { resultObject, latlng } = action.payload;

  const {
    id: natRegId,
    adresseerbaarobject_id: adresseerbaarObjectId,
    nummeraanduiding_id: nummeraanduidingId,
    openbareruimte_id: openbareruimteId,
  } = resultObject;

  const [longitude, latitude] = latlng.coordinates;
  yield put(
    push(`/${natRegId},${adresseerbaarObjectId},${nummeraanduidingId},${openbareruimteId},${latitude},${longitude}/`),
  );
}

export default function* watchMapSaga() {
  yield takeLatest(SEARCH_SELECT, searchSelect);
}
