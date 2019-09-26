import { makeSelectSearchHistory } from '../selectors';
describe('containers/SearchHistory/selectors', () => {
  it('should return an empty object', () => {
    expect(makeSelectSearchHistory({})).toEqual([]);
  });

  it('should return the search history with urls', () => {
    const results = makeSelectSearchHistory({
      searchHistory: {
        searchHistory: [
          { vboId: 'vboId', text: 'fooA' },
          { ligId: 'ligId', text: 'fooB' },
          { brkId: 'brkId', text: 'fooC' },
        ],
      },
    });

    const expectedResults = [
      { vboId: 'vboId', text: 'fooA', url: '/vbo/vboId/', id: 'vboId' },
      { ligId: 'ligId', text: 'fooB', url: '/lig/ligId/', id: 'ligId' },
      { brkId: 'brkId', text: 'fooC', url: '/brk/brkId/', id: 'brkId' },
    ];

    expect(results).toEqual(expectedResults);
  });
});
