import { apiUsers } from '../../utils/api';

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await apiUsers.getUsers();
      const { data } = response;
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: 'FETCH_USERS_FAILURE',
    payload: error,
  };
};

export const setSelectedUser = (user) => {
  return {
    type: 'SET_SELECTED_USER',
    payload: user,
  };
};

export const clearSelectedUser = () => {
  return {
    type: 'CLEAR_SELECTED_USER',
  };
};
