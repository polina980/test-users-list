import { apiUsers } from '../../utils/api';

export const fetchDelayedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await apiUsers.getDelayedUsers();
      const { data } = response;
      dispatch(fetchDelayedUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchDelayedUsersFailure(error.message));
    }
  };
};

export const fetchDelayedUsersSuccess = (delayedUsers) => {
  return {
    type: 'FETCH_DELAYED_USERS_SUCCESS',
    payload: delayedUsers,
  };
};

export const fetchDelayedUsersFailure = (error) => {
  return {
    type: 'FETCH_DELAYED_USERS_FAILURE',
    payload: error,
  };
};

export const setDelayedSelectedUser = (delayedUser) => {
  return {
    type: 'SET_DELAYED_SELECTED_USER',
    payload: delayedUser,
  };
};

export const clearDelayedSelectedUser = () => {
  return {
    type: 'CLEAR_DELAYED_SELECTED_USER',
  };
};
