/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import searchHistoryReducer from 'containers/SearchHistory/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    searchHistory: searchHistoryReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['searchHistory'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return persistedReducer;
}
