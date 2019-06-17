import { makeSelectTOC } from '../selectors';

describe('containers/TOC/selectors', () => {
  describe('makeSelectTOC', () => {
    it('should return toc', () => {
      const toc = ['foo', 'bar', 'baz'];
      expect(makeSelectTOC({ toc: { toc } })).toEqual(toc);
    });
  });
});
