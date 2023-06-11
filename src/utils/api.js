export const apiConfig = {
  baseUrl: 'https://reqres.in/api',
  users: '/users?page=2',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, users, defaultHeaders }) {
    this._baseUrl = baseUrl;
    this._usersEndpoint = users;
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
}

export const apiUsers = new Api(apiConfig);
