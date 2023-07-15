const initialState = {
  users: [],
  selectedUser: null,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case 'GET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
        error: null,
      };
    case 'GET_USERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  };
};

export default usersReducer;
