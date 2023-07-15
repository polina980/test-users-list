import { apiUsers } from '../../utils/api';

const getRegisterSuccess = (payload) => ({
  type: 'GET_REGISTER_SUCCESS',
  payload
});

const getRegisterFailure = (error) => {
  return {
    type: 'GET_REGISTER_FAILURE',
    payload: error,
  };
};

export function getUserRegister(email, password) {
  return (dispatch) =>
    apiUsers.registerUser(email, password)
      .then(({ token, id }) => {
        dispatch(getRegisterSuccess(token, id));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('id', JSON.stringify(id));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getRegisterFailure(error.message));
      })
};
