import {
  isArray,
  isArrayOfArrays,
  isObject,
  isDate,
  isApartment,
  isValidMaatschappelijkeActiviteit,
  isValidSubjectNNP,
  isValidSubjectNP,
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
