const initialState = {
  token: null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        token: action.payload
      }
    }
    default: {
      return state;
    }
  };
};

export default loginReducer;
