import { apiUsers } from '../../utils/api';

const getDelayedUsersSuccess = (delayedUsers) => {
  return {
    type: 'GET_DELAYED_USERS_SUCCESS',
    payload: delayedUsers,
  };
};

// const getDelayedSelectedUser = (delayedSelectedUser) => {
//   return {
//     type: 'GET_DELAYED_SELECTED_USER',
//     payload: delayedSelectedUser,
//   };
// };

const getDelayedUsersFailure = (error) => {
  return {
    type: 'GET_DELAYED_USERS_FAILURE',
    payload: error,
  };
};

export const fetchDelayedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await apiUsers.getDelayedUsers();
      const { data } = response;
      dispatch(getDelayedUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getDelayedUsersFailure(error.message));
    }
  };
};
