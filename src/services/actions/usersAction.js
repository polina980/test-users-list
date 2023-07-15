import { apiUsers } from '../../utils/api';

const getUsersSuccess = (users) => {
  return {
    type: 'GET_USERS_SUCCESS',
    payload: users,
  };
};

export const fetchSelectedUser = (selectedUser) => {
  return {
    type: 'GET_SELECTED_USER',
    payload: selectedUser,
  };
};

const getUsersFailure = (error) => {
  return {
    type: 'GET_USERS_FAILURE',
    payload: error,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await apiUsers.getUsers();
      const { data } = response;
      dispatch(getUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getUsersFailure(error.message));
    }
  };
};
