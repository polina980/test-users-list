const initialState = {
  delayedUsers: [],
  // delayedSelectedUser: null,
  error: null,
};

const delayedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DELAYED_USERS_SUCCESS':
      return {
        ...state,
        delayedUsers: action.payload,
        error: null,
      };
    // case 'GET_DELAYED_SELECTED_USER':
    //   return {
    //     ...state,
    //     delayedSelectedUser: action.payload,
    //     error: null,
    //   };
    case 'GET_DELAYED_USERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  };
};

export default delayedUsersReducer;
