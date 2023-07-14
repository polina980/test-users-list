const initialState = {
  users: [],
  selectedUser: null,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'CLEAR_SELECTED_USER':
      return {
        ...state,
        selectedUser: null,
      };
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  };
};

export default usersReducer;
