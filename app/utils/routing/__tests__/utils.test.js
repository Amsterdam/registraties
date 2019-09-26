/**
 * Test routing utility functions
 */
import { getURL } from '../utils';

describe('routing utils', () => {
  it('Should return a vbo url given a vboID', () => {
    const id = 'fooVboID';
    const object = {
      vboId: id,
    };

    const url = getURL(object);
    expect(url).toEqual(`/vbo/${id}/`);
  });

  it('Should return a lig url given a ligID', () => {
    const id = 'fooLigID';
    const object = {
      ligId: id,
    };

    const url = getURL(object);
    expect(url).toEqual(`/lig/${id}/`);
  });

  it('Should return a brk url given a brkID', () => {
    const id = 'fooBrkID';
    const object = {
      brkId: id,
    };

    const url = getURL(object);
    expect(url).toEqual(`/brk/${id}/`);
  });

  it('should throw an error if no known id field is given', () => {
    const id = 'fooRandomID';
    const object = {
      fooRandomId: id,
    };

    expect(() => getURL(object)).toThrow();
  });
});
