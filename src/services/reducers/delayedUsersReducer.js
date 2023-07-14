const initialState = {
  delayedUsers: [],
  delayedSelectedUser: null,
  error: null,
};

const delayedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DELAYED_USERS_SUCCESS':
      return {
        ...state,
        delayedUsers: action.payload,
        error: null,
      };
    case 'SET_DELAYED_SELECTED_USER':
      return {
        ...state,
        delayedSelectedUser: action.payload,
      };
    case 'CLEAR_DELAYED_SELECTED_USER':
      return {
        ...state,
        delayedSelectedUser: null,
      };
    case 'FETCH_DELAYED_USERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  };
};

export default delayedUsersReducer;
