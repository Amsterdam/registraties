import { makeSelectSearchHistory } from '../selectors';
describe('containers/SearchHistory/selectors', () => {
  it('should return an empty object', () => {
    expect(makeSelectSearchHistory({})).toEqual([]);
  });

  it('should return the search history with urls', () => {
    const results = makeSelectSearchHistory({
      searchHistory: [
        { vboId: 'vboId', text: 'fooA' },
        { ligId: 'lidId', text: 'fooB' },
        { brkId: 'brkId', text: 'fooC' },
      ],
    });

    const expectedResults = [
      { vboId: 'fooA', text: 'fooA', url: 'vbo/vboId' },
      { ligId: 'fooB', text: 'fooB', url: 'lig/ligId' },
      { brkId: 'fooC', text: 'fooC', url: 'brk/brkId' },
    ];

    expect(results).toEqual(expectedResults);
  });
});
