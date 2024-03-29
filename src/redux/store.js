import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

import CollectionMiddleware from './collectionReducer/collection.middleware';

const middlewares = [CollectionMiddleware, thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;
