import { getData } from '..';

describe('CSVDownload', () => {
  it('should format data into a parseable structure', () => {
    const obj1 = {
      key: 'foo',
      formattedValue: 'Lorem ipsum',
    };

    const obj2 = {
      key: 'bar',
      formattedValue: 'Dolor sit amet',
    };

    const obj3 = {
      key: 'baz',
      formattedValue: 345,
    };

    const plain = [obj1, obj2, obj3];
    const expectedPlain = {
      foo: 'Lorem ipsum',
      bar: 'Dolor sit amet',
      baz: 345,
    };
    expect(getData(plain)).toEqual(expectedPlain);

    const nested = [
      {
        key: 'arc_170',
        formattedValue: [obj1, obj2, obj3],
      },
      {
        key: 'y_wing',
        formattedValue: [obj1, obj2],
      },
    ];
    const expectedNested = {
      arc_170: { foo: 'Lorem ipsum', bar: 'Dolor sit amet', baz: 345 },
      y_wing: { foo: 'Lorem ipsum', bar: 'Dolor sit amet' },
    };
    expect(getData(nested)).toEqual(expectedNested);

    const deeplyNested = [
      {
        key: 'arc_170',
        formattedValue: [[obj1, obj2, obj3], [obj3, obj3], [obj1, obj2]],
      },
    ];
    const expectedDeeplyNested = {
      arc_170_1: { foo: 'Lorem ipsum', bar: 'Dolor sit amet', baz: 345 },
      arc_170_2: { baz: 345 },
      arc_170_3: { foo: 'Lorem ipsum', bar: 'Dolor sit amet' },
    };

    expect(getData(deeplyNested)).toEqual(expectedDeeplyNested);
  });
});
