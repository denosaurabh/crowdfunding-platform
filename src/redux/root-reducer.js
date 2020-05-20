import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UserUniversityReducer from './UserUniversityReducer/university.reducer';
import UserReducer from './userReducer/user.reducer';
import CollectionReducer from './collectionReducer/collection.reducer';
import UserIdeasReducer from './userIdeasReducer/userIdeas.reducer';
import UserProposalsReducer from './userProposalsReducer/userProposals.reducer';
import errorReducer from './errorReducer/error.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  error: errorReducer,
  university: UserUniversityReducer,
  user: UserReducer,
  collection: CollectionReducer,
  userIdeas: UserIdeasReducer,
  userProposals: UserProposalsReducer,
});

export default persistReducer(persistConfig, rootReducer);
