import { uniqBy } from 'lodash';

export const SEARCH_HISTORY_STORAGE_KEY = 'searchHistory';
const MAX_SEARCH_ITEMS = 10;

export const getCleanSearchHistory = (newSearch, searchHistory) =>
  uniqBy([newSearch, ...searchHistory], 'text').slice(0, MAX_SEARCH_ITEMS);

export const pushSearchHistoryLocalStorage = newSearch => {
  const searchHistory = getSearchHistoryLocalStorage();

  const newSearchHistory = getCleanSearchHistory(newSearch, searchHistory);
  const newSearchHistoryString = JSON.stringify(newSearchHistory);

  localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, newSearchHistoryString);
};

export const getSearchHistoryLocalStorage = () => {
  const searchHistoryString = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
  try {
    const searchHistory = JSON.parse(searchHistoryString) || [];
    return searchHistory;
  } catch (error) {
    console.error('Invalid searchHistory in localstorage'); // eslint-disable-line no-console
    localStorage.removeItem(SEARCH_HISTORY_STORAGE_KEY);
  }
  return [];
};
