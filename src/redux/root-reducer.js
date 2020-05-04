import { combineReducers } from "redux";

import errorReducer from "./errorReducer/error.reducer";

export default combineReducers({
  error: errorReducer,
});
