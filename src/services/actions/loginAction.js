import { apiUsers } from '../../utils/api';

const getLoginSuccess = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload
})

export function getUserLogin(email, password) {
  return (dispatch) =>
    apiUsers.loginUser(email, password)
      .then(({ token }) => {
        dispatch(getLoginSuccess(token));
        localStorage.setItem('token', JSON.stringify(token));
      })
      .catch((error) => {
        console.log(error)
      })
}
