/**
 * Test search history utility functions
 */
import 'jest-localstorage-mock';
import {
  getCleanSearchHistory,
  pushSearchHistoryLocalStorage,
  getSearchHistoryLocalStorage,
  SEARCH_HISTORY_STORAGE_KEY,
} from '../searchHistory';

describe('searchHistory utils', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore(); // eslint-disable-line no-console
  });

  describe('getCleanSearchHistory', () => {
    it('Should return a clean search history of max 10 item', () => {
      const searchHistory = [];
      const newSearch = {
        vboId: 'newID',
        text: 'new',
      };

      for (let i = 0; i < 20; i += 1) {
        searchHistory.push({
          vboId: 'fooVboId',
          text: `fooLabel-${i}`,
        });
      }

      const cleanSearchHistory = getCleanSearchHistory(newSearch, searchHistory);
      expect(cleanSearchHistory.length).toBe(10);
    });

    it('Should return a clean search history with nu duplicate items', () => {
      const searchHistory = [];
      const newSearch = {
        vboId: 'newID',
        text: 'new',
      };

      for (let i = 0; i < 20; i += 1) {
        searchHistory.push(newSearch);
      }

      const cleanSearchHistory = getCleanSearchHistory(newSearch, searchHistory);
      expect(cleanSearchHistory.length).toBe(1);
      expect(cleanSearchHistory).toStrictEqual([newSearch]);
    });
  });
  describe('getSearchHistoryLocalStorage function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Should return an empty list if localstorage is empty', () => {
      const searchHistory = getSearchHistoryLocalStorage();
      expect(searchHistory).toStrictEqual([]);
    });

    it('Should return the search history list from localstorage', () => {
      const stringSearchHistory =
        '[{"vboId":"0363010000758829","text":"Oudezijds Achterburgwal 2"},{"vboId":"0363010001009652","text":"Oudezijds Achterburgwal 3A"},{"vboId":"0363010000819482","text":"Stadionweg 30"}]';
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, stringSearchHistory);

      const searchHistory = getSearchHistoryLocalStorage();
      expect(searchHistory).toStrictEqual(JSON.parse(stringSearchHistory));
    });

    it('Should return an empty list if the localstorage searchHistory is broken', () => {
      const stringSearchHistory = '[]{';
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, stringSearchHistory);

      expect(getSearchHistoryLocalStorage()).toStrictEqual([]);
    });

    it('Should reset localstorage searchHistory if it is broken', () => {
      const stringSearchHistory = '[]{';
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, stringSearchHistory);
      getSearchHistoryLocalStorage();
      expect(localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY)).toBeNull();
    });
  });

  describe('pushSearchHistoryLocalStorage function', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Should add a new search to localstorage', () => {
      pushSearchHistoryLocalStorage({ vboId: '0363010000758829', text: 'Oudezijds Achterburgwal 2' });
      const searchHistory = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);

      const stringSearchHistory = '[{"vboId":"0363010000758829","text":"Oudezijds Achterburgwal 2"}]';
      expect(searchHistory).toStrictEqual(stringSearchHistory);
    });
  });
});
