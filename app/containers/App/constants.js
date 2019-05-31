import { scope } from '../../i18n';

const containerScope = `${scope}/App`;

export const PROGRESS = `${containerScope}/PROGRESS`;
export const COMPLETE_PROGRESS = `${containerScope}/COMPLETE_PROGRESS`;
export const RESET_PROGRESS = `${containerScope}/RESET_PROGRESS`;
export const INCREMENT_PROGRESS = `${containerScope}/INCREMENT_PROGRESS`;
export const MAX_PROGRESS_COUNT = `${containerScope}/MAX_PROGRESS_COUNT`;

export const UNABLE_TO_FETCH = `${containerScope}/UNABLE_TO_FETCH`;
export const UNAUTHORIZED = `${containerScope}/UNAUTHORIZED`;

export const AUTHENTICATE_USER = `${containerScope}/AUTHENTICATE_USER`;
export const AUTHORIZE_USER = `${containerScope}/AUTHORIZE_USER`;

export const SHOW_GLOBAL_ERROR = `${containerScope}/SHOW_GLOBAL_ERROR`;
export const RESET_GLOBAL_ERROR = `${containerScope}/App/RESET_GLOBAL_ERROR`;

export const LOGIN = `${containerScope}/LOGIN`;
export const LOGOUT = `${containerScope}/LOGOUT`;

export const LOAD_DATA_PENDING = `${containerScope}/LOAD_DATA_PENDING`;
export const LOAD_DATA_SUCCESS = `${containerScope}/LOAD_DATA_SUCCESS`;
export const LOAD_DATA_FAILED = `${containerScope}/LOAD_DATA_FAILED`;

export const LOAD_BAG_DATA = `${containerScope}/LOAD_BAG_DATA`;

export const OBJECTS = {
  OPENBARE_RUIMTE: {
    ABBR: 'opr',
    NAME: { id: 'registraties.public_space' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-3/',
  },
  WOONPLAATS: {
    ABBR: 'wpl',
    NAME: { id: 'registraties.residence' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse/',
  },
  NUMMERAANDUIDING: {
    ABBR: 'num',
    NAME: { id: 'registraties.number_identification' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-2/',
  },
  VERBLIJFSOBJECT: {
    ABBR: 'vbo',
    NAME: { id: 'registraties.accommodation_object' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-0/',
  },
  PAND: {
    ABBR: 'pnd',
    NAME: { id: 'registraties.house' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-pand/',
  },
  KADASTRAAL_OBJECT: {
    ABBR: 'brko',
    NAME: { id: 'registraties.cadastral_object' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/brk-index/catalog-brk-levering/objectklasse-4/',
  },
  KADASTRAAL_SUBJECT_NP: {
    ABBR: 'brks_np',
    NAME: { id: 'registraties.natural_person' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/natuurlijk-persoon/',
  },
  KADASTRAAL_SUBJECT_NNP: {
    ABBR: 'brks_nnp',
    NAME: { id: 'registraties.non_natural_person' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/niet-natuurlijk-pers/',
  },
  VESTIGING: {
    ABBR: 'ves',
    NAME: { id: 'registraties.establishment' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/vestiging/',
  },
  GEBIED: {
    ABBR: 'geb',
    NAME: { id: 'registraties.area' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/gebieden-index/catalogus/',
  },
};
