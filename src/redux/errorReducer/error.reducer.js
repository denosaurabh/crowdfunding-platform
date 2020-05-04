const INITIAL_STATE = {
  currentError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        currentError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
