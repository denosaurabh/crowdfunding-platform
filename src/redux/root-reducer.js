import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UserUniversityReducer from './UserUniversityReducer/university.reducer';
import UserReducer from './userReducer/user.reducer';
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
});

export default persistReducer(persistConfig, rootReducer);
