const initialState = {
  token: null,
  id: null,
  error: null,
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REGISTER_SUCCESS': {
      return {
        ...state,
        token: action.payload,
        id: action.payload,
        error: null,
      }
    }
    case 'GET_REGISTER_FAILURE': {
      return {
        ...state,
        token: null,
        id: null,
        error: action.payload,
      }
    }
    default: {
      return state;
    }
  };
};

export default registerReducer;
