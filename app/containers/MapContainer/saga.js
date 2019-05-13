import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

export function* searchSelect(action) {
  const { resultObject, latlng } = action.payload;

  const {
    adresseerbaarobject_id: adresseerbaarObjectId,
    nummeraanduiding_id: nummeraanduidingId,
    openbareruimte_id: openbareruimteId,
  } = resultObject;

  const [longitude, latitude] = latlng.coordinates;

  yield put(push(`/${adresseerbaarObjectId},${nummeraanduidingId},${openbareruimteId},${latitude},${longitude}/`));
}

export default function* watchMapSaga() {
  // yield takeLatest(SEARCH_SELECT, searchSelect);
}
