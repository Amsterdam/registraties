/**
 * Test routing utility functions
 */
import { getURL, extractId } from '../utils';

describe('routing utils', () => {
  describe('getURL', () => {
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

  describe('extractId', () => {
    it('Should return a vbo id a vboID', () => {
      const object = {
        vboId: 'fooVboID',
      };
      const id = extractId(object);
      expect(id).toEqual({ type: 'vbo', id: 'fooVboID' });
    });

    it('Should return a lig url given a ligID', () => {
      const object = {
        ligId: 'fooLigID',
      };
      const id = extractId(object);
      expect(id).toEqual({ type: 'lig', id: 'fooLigID' });
    });

    it('Should return a brk url given a brkID', () => {
      const object = {
        brkId: 'fooBrkID',
      };
      const id = extractId(object);
      expect(id).toEqual({ type: 'brk', id: 'fooBrkID' });
    });

    it('should return undefined when no known id is given', () => {
      const object = {
        fooRandomId: 'fooRandomID',
      };
      const id = extractId(object);
      expect(id).toBeUndefined();
    });
  });
});
