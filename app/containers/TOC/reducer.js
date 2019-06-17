import produce from 'immer';
import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS } from 'containers/KadastraalObject/constants';
import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS } from 'containers/KadastraalSubjectNNP/constants';
import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS } from 'containers/KadastraalSubjectNP/constants';
import { LOAD_DATA_SUCCESS as LOAD_NUMMERAANDUIDING_DATA_SUCCESS } from 'containers/Nummeraanduiding/constants';
import { LOAD_DATA_SUCCESS as LOAD_OPENBARE_RUIMTE_DATA_SUCCESS } from 'containers/OpenbareRuimte/constants';
import { LOAD_DATA_SUCCESS as LOAD_PAND_DATA_SUCCESS } from 'containers/Pand/constants';
import { LOAD_DATA_SUCCESS as LOAD_VERBLIJFSOBJECT_DATA_SUCCESS } from 'containers/Verblijfsobject/constants';
import { LOAD_DATA_SUCCESS as LOAD_VESTIGING_DATA_SUCCESS } from 'containers/Vestiging/constants';
import { LOAD_DATA_SUCCESS as LOAD_WOONPLAATS_DATA_SUCCESS } from 'containers/Woonplaats/constants';
import { OBJECTS, LOAD_BAG_DATA } from 'containers/App/constants';

// The initial state of the App
export const initialState = {
  toc: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BAG_DATA:
        draft.toc = [];
        break;

      case LOAD_PAND_DATA_SUCCESS:
        draft.toc[5] = OBJECTS.PAND.NAME;
        break;

      case LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
        draft.toc[1] = OBJECTS.NUMMERAANDUIDING.NAME;
        draft.toc[3] = OBJECTS.GEBIED.NAME;
        break;

      case LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS:
        draft.toc[6] = OBJECTS.KADASTRAAL_OBJECT.NAME;
        break;

      case LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS:
        draft.toc[7] = OBJECTS.KADASTRAAL_SUBJECT_NP.NAME;
        break;

      case LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS:
        draft.toc[8] = OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME;
        break;

      case LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
        draft.toc[4] = OBJECTS.VERBLIJFSOBJECT.NAME;
        break;

      case LOAD_VESTIGING_DATA_SUCCESS:
        draft.toc[9] = OBJECTS.VESTIGING.NAME;
        break;

      case LOAD_OPENBARE_RUIMTE_DATA_SUCCESS:
        draft.toc[2] = OBJECTS.OPENBARE_RUIMTE.NAME;
        break;

      case LOAD_WOONPLAATS_DATA_SUCCESS:
        draft.toc[0] = OBJECTS.WOONPLAATS.NAME;
        break;
    }
  });
