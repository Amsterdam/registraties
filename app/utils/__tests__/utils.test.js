import {
  findArrayDepth,
  formatKey,
  getIdFromURL,
  isApartment,
  isArray,
  isArrayOfArrays,
  isCount,
  isCurrency,
  isDate,
  isObject,
  isPostCode,
  isValidKey,
  isValidMaatschappelijkeActiviteit,
  isValidSubjectNNP,
  isValidSubjectNP,
  isValidValue,
} from '..';

const nr = Date.now();
const date = new Date();
const str = 'foo bar';
const bool = false;
const undef = undefined;
const nill = null;
const array = ['a', 0, null];
const obj = { a: 'a', 0: 0, nill: null };
const array2 = new Array(2);
const array3 = [['a'], ['b']];

describe('isArray', () => {
  it('should return a boolean', () => {
    expect(isArray(nr)).toEqual(false);
    expect(isArray(date)).toEqual(false);
    expect(isArray(str)).toEqual(false);
    expect(isArray(bool)).toEqual(false);
    expect(isArray(undef)).toEqual(false);
    expect(isArray(nill)).toEqual(false);
    expect(isArray(obj)).toEqual(false);

    expect(isArray(array2)).toEqual(true);
    expect(isArray(array)).toEqual(true);
  });
});

describe('isObject', () => {
  it('should return a boolean', () => {
    expect(isObject(nr)).toEqual(false);
    expect(isObject(date)).toEqual(false);
    expect(isObject(str)).toEqual(false);
    expect(isObject(bool)).toEqual(false);
    expect(isObject(undef)).toEqual(false);
    expect(isObject(nill)).toEqual(false);
    expect(isObject(array2)).toEqual(false);
    expect(isObject(array)).toEqual(false);

    expect(isObject(obj)).toEqual(true);
  });
});

describe('isArrayOfArrays', () => {
  it('should return a boolean', () => {
    expect(isArrayOfArrays(nr)).toEqual(false);
    expect(isArrayOfArrays(date)).toEqual(false);
    expect(isArrayOfArrays(str)).toEqual(false);
    expect(isArrayOfArrays(bool)).toEqual(false);
    expect(isArrayOfArrays(undef)).toEqual(false);
    expect(isArrayOfArrays(nill)).toEqual(false);
    expect(isArrayOfArrays(array2)).toEqual(false);
    expect(isArrayOfArrays(array)).toEqual(false);
    expect(isArrayOfArrays(obj)).toEqual(false);

    expect(isArrayOfArrays(array3)).toEqual(true);
  });
});

describe('isDate', () => {
  it('should compare date field keys', () => {
    expect(isDate('begin_geldigheid', date)).toEqual(true);
    expect(isDate('not_a_valid_field_name', date)).toEqual(false);
  });

  it('should return a boolean', () => {
    expect(isDate('begin_geldigheid', nr)).toEqual(false);
    expect(isDate('begin_geldigheid', str)).toEqual(false);
    expect(isDate('begin_geldigheid', bool)).toEqual(false);
    expect(isDate('begin_geldigheid', undef)).toEqual(false);
    expect(isDate('begin_geldigheid', nill)).toEqual(false);
    expect(isDate('begin_geldigheid', array2)).toEqual(false);
    expect(isDate('begin_geldigheid', array)).toEqual(false);
    expect(isDate('begin_geldigheid', obj)).toEqual(false);
    expect(isDate('begin_geldigheid', array3)).toEqual(false);
  });
});

describe('isValidKey', () => {
  it('should return a boolean', () => {
    const keys = ['foo', 'bar', 'baz', 'qux'];
    const filterFunc = isValidKey(keys);

    expect(filterFunc(null)).toEqual(false);
    expect(filterFunc(undefined)).toEqual(false);
    expect(filterFunc('')).toEqual(false);
    expect(filterFunc('zork')).toEqual(false);
    expect(filterFunc('baz')).toEqual(true);
  });
});

describe('isValidValue', () => {
  it('should return a boolean', () => {
    const data = {
      gebruik: {
        code: '3141',
        omschrijving: 'kantoor',
      },
      buurt: {
        code: '04f',
        naam: 'Uilenburg',
        dataset: 'gebieden',
      },
      verblijfsobjecten: {
        count: 7,
      },
      someKey: {
        value: 'Blah',
      },
      locatie: {
        kvk_adres: 'Here be an address',
      },
    };
    const filterFunc = isValidValue(data);

    expect(filterFunc('someKey')).toEqual(false);
    expect(filterFunc('zork')).toEqual(false);
    expect(filterFunc('')).toEqual(false);
    expect(filterFunc(undefined)).toEqual(false);
    expect(filterFunc(null)).toEqual(false);

    expect(filterFunc('gebruik')).toEqual(true);
    expect(filterFunc('buurt')).toEqual(true);
    expect(filterFunc('verblijfsobjecten')).toEqual(true);
    expect(filterFunc('locatie')).toEqual(true);
  });
});

describe('isCount', () => {
  it('should return a boolean', () => {
    expect(isCount({ count: 0 })).toEqual(true);
    expect(isCount({ count: Infinity })).toEqual(true);

    expect(isCount({ notCount: 0 })).toEqual(false);
    expect(isCount(null)).toEqual(false);
    expect(isCount(undefined)).toEqual(false);
    expect(isCount('')).toEqual(false);
  });
});

describe('isPostCode', () => {
  it('should return a boolean', () => {
    expect(isPostCode('1000AA')).toEqual(true);
    expect(isPostCode('1000 AA')).toEqual(true);

    expect(isPostCode('100 AA')).toEqual(false);
    expect(isPostCode('1000')).toEqual(false);
    expect(isPostCode(null)).toEqual(false);
    expect(isPostCode(undefined)).toEqual(false);
    expect(isPostCode('')).toEqual(false);
  });
});

describe('isCurrency', () => {
  it('should return a boolean', () => {
    expect(isCurrency('koopsom', 2537642)).toEqual(true);
    expect(isCurrency('koopsom', '2537642')).toEqual(true);

    expect(isCurrency('koopsommen', 2537642)).toEqual(false);
    expect(isCurrency('koopsommen', '2537642')).toEqual(false);

    expect(isCurrency(null)).toEqual(false);
    expect(isCurrency(undefined)).toEqual(false);
    expect(isCurrency('', 2537642)).toEqual(false);
    expect(isCurrency('koopsom', {})).toEqual(false);
  });
});

describe('formatKey', () => {
  it('returns a formatted key', () => {
    expect(formatKey('key')).toEqual('Key');
    expect(formatKey('a_key')).toEqual('A key');
    expect(formatKey('here_be-a_key')).toEqual('Here be-a key');
  });
});

describe('isValidSubjectNP', () => {
  it('should return a boolean', () => {
    expect(isValidSubjectNP(null)).toEqual(false);
    expect(isValidSubjectNP(undefined)).toEqual(false);
    expect(isValidSubjectNP([])).toEqual(false);
    expect(isValidSubjectNP({})).toEqual(false);
    expect(isValidSubjectNP('')).toEqual(false);
    expect(isValidSubjectNP({ geboortedatum: '1970-01-01' })).toEqual(false);
    expect(isValidSubjectNP({ naam: 'Zork' })).toEqual(false);
    expect(isValidSubjectNP({ geboortedatum: '1970-01-01', naam: '' })).toEqual(false);
    expect(isValidSubjectNP({ geboortedatum: '', naam: 'Zork' })).toEqual(false);
    expect(isValidSubjectNP({ geboortedatum: '1970-01-01', naam: 'Zork' })).toEqual(true);
  });
});

describe('isValidSubjectNNP', () => {
  it('should return a boolean', () => {
    expect(isValidSubjectNNP(null)).toEqual(false);
    expect(isValidSubjectNNP(undefined)).toEqual(false);
    expect(isValidSubjectNNP([])).toEqual(false);
    expect(isValidSubjectNNP({})).toEqual(false);
    expect(isValidSubjectNNP('')).toEqual(false);
    expect(isValidSubjectNNP({ kvknummer: '12345678' })).toEqual(false);
    expect(isValidSubjectNNP({ rsin: '1234567' })).toEqual(false);
    expect(isValidSubjectNNP({ kvknummer: '12345678', rsin: '' })).toEqual(false);
    expect(isValidSubjectNNP({ kvknummer: '', rsin: '1234567' })).toEqual(false);
    expect(isValidSubjectNNP({ kvknummer: '12345678', rsin: '1234567' })).toEqual(true);
  });
});

describe('isApartment', () => {
  it('should return a boolean', () => {
    expect(isApartment(null)).toEqual(false);
    expect(isApartment(undefined)).toEqual(false);
    expect(isApartment([])).toEqual(false);
    expect(isApartment({})).toEqual(false);
    expect(isApartment('')).toEqual(false);
    expect(isApartment({ indexletter: 'G' })).toEqual(false);
    expect(isApartment({ indexletter: 'a' })).toEqual(true);
    expect(isApartment({ indexletter: 'A' })).toEqual(true);
  });
});

describe('isValidMaatschappelijkeActiviteit', () => {
  it('should return a boolean', () => {
    expect(isValidMaatschappelijkeActiviteit(null)).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit(undefined)).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit([])).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({})).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit('')).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({ kvk_nummer: '12345678' })).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({ naam: 'Acme corp.' })).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({ kvk_nummer: '12345678', naam: '' })).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({ kvk_nummer: '', naam: 'Acme corp.' })).toEqual(false);
    expect(isValidMaatschappelijkeActiviteit({ kvk_nummer: '12345678', naam: 'Acme corp.' })).toEqual(true);
  });
});

describe('getIdFromURL', () => {
  it('should return an empty string', () => {
    expect(getIdFromURL(null)).toEqual('');
    expect(getIdFromURL(undefined)).toEqual('');
    expect(getIdFromURL([])).toEqual('');
    expect(getIdFromURL({})).toEqual('');
    expect(getIdFromURL('')).toEqual('');
    expect(getIdFromURL()).toEqual('');
    expect(getIdFromURL('//api/bag/some-api-endpoint/aksghdyuags/')).toEqual('');
    expect(getIdFromURL('//api/bag/some-api-endpoint/aksghd0783798546yuags/')).toEqual('');
    expect(getIdFromURL('//api/bag/some-api-endpoint/652347654375a')).toEqual('');
  });

  it('should return an id', () => {
    expect(getIdFromURL('//api/bag/some-api-endpoint/652347654375/')).toEqual('652347654375');
    expect(getIdFromURL('//api/bag/some-api-endpoint/087698345000001')).toEqual('087698345000001');
  });
});

describe('findArrayDepth', () => {
  it('should return a number', () => {
    const flat = ['foo'];
    const shallow = ['foo', 'bar', ['foo', 'bar']];
    const deep = ['foo', 'bar', ['foo', 'bar', ['foo', 'bar']]];
    const veryDeep = ['foo', 'bar', ['foo', 'bar', ['foo', 'bar', ['foo', 'bar']]]];

    expect(findArrayDepth('foo')).toEqual(0);
    expect(findArrayDepth('')).toEqual(0);
    expect(findArrayDepth(null)).toEqual(0);
    expect(findArrayDepth(undefined)).toEqual(0);
    expect(findArrayDepth({})).toEqual(0);
    expect(findArrayDepth(flat)).toEqual(0);
    expect(findArrayDepth(shallow)).toEqual(1);
    expect(findArrayDepth(deep)).toEqual(2);
    expect(findArrayDepth(veryDeep)).toEqual(3);
  });
});
