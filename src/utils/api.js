export const apiConfig = {
  baseUrl: 'https://reqres.in',
  users: '/api/users?delay=3',
  delayedUsers: '/api/users?page=2',
  login: '/api/login',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, users, delayedUsers, login, defaultHeaders }) {
    this._baseUrl = baseUrl;
    this._usersEndpoint = users;
    this._delayedUsersEndpoint = delayedUsers;
    this._loginEndpoint = login;
    this._defaultHeaders = defaultHeaders;
  }

  _makeUrl(endpoint) {
    return `${this._baseUrl}${endpoint}`;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUsers() {
    const options = {
      method: 'GET',
      headers: this._defaultHeaders
    };
    return fetch(this._makeUrl(this._usersEndpoint), options)
      .then(this._handleResponse);
  }

  getDelayedUsers() {
    const options = {
      method: 'GET',
      headers: this._defaultHeaders
    };
    return fetch(this._makeUrl(this._delayedUsersEndpoint), options)
      .then(this._handleResponse);
  }

  loginUser(email, password) {
    const options = {
      method: 'POST',
      headers: this._defaultHeaders,
      body: JSON.stringify({
        email,
        password
      })
    };
    return fetch(this._makeUrl(this._loginEndpoint), options)
      .then(this._handleResponse);
  }
}

export const apiUsers = new Api(apiConfig);
