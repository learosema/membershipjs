import { Ajax } from './ajax';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class MemberApi {
  constructor() {
    this.path = '/api';
  }

  /**
   * Login
   * @param {string} name user name
   * @param {string} password password
   */
  login(name, password) {
    return new Ajax(this.path + '/login', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({ name, password }),
    });
  }

  whoAmI() {
    return new Ajax(this.path + '/whoami', {
      method: 'GET',
      credentials: 'include',
    });
  }

  /**
   * Logout
   */
  logout() {
    return new Ajax(this.path + '/logout', {
      method: 'POST',
      credentials: 'include',
      headers,
    });
  }

  /**
   * Registration
   * @param {string} name username
   * @param {string} password password
   * @param {string} email email address
   */
  register(name, password, email) {
    return new Ajax(this.path + '/register', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({ name, password, email }),
    });
  }
}

export const memberApi = new MemberApi();
