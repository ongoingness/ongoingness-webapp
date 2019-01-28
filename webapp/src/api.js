/* eslint-disable no-underscore-dangle */
/**
 Created:  2019-01-25
 Author:   Daniel Welsh
 Description:
 - Interact with the API.
 */
import axios from 'axios';
import mock from '../mock_api.json';

export default class API {
  static URL = 'https://ongoingness-api.openlab.ncl.ac.uk/api';

  /**
   * Register a user.
   * @param username string
   * @param password string
   */
  static async register(username, password) {
    if (!username || !password) throw new Error('Username or password cannot be empty.');

    const userData = {
      username,
      password,
    };

    let response;
    if (process.env.NODE_ENV === 'test') {
      response = mock.register;
    } else {
      response = await axios.post(`${this.URL}/auth/register`, userData);
    }

    return response.data.payload.token;
  }

  /**
   * Register a user.
   * @param username string
   * @param password string
   */
  static async authenticate(username, password) {
    if (!username || !password) throw new Error('Username or password cannot be empty.');

    const userData = {
      username,
      password,
    };

    let response;
    if (process.env.NODE_ENV === 'test') {
      response = mock.authenticate;
    } else {
      response = await axios.post(`${this.URL}/auth/authenticate`, userData);
    }

    return response.data.payload.token;
  }

  /**
   * Get a user's information
   * @param token
   * @returns {Promise<any>}
   */
  static async getUser(token) {
    if (!token) throw new Error('Access token is required');

    let response;
    if (process.env.NODE_ENV === 'test') {
      response = mock.get_user;
    } else {
      response = await axios.get(`${this.URL}/user/me`, { headers: { 'x-access-token': token } });
    }

    return response.data.payload.user;
  }

  /**
   * Remove a user's account
   * @param token
   * @returns {Promise<boolean>}
   */
  static async deleteAccount(token) {
    if (!token) throw new Error('Access token is required');

    const user = await this.getUser(token);

    let response;
    if (process.env.NODE_ENV === 'test') {
      response = mock.delete_user;
    } else {
      response = await axios.delete(`${this.URL}/user/${user._id}`, { headers: { 'x-access-token': token } });
    }

    return response.status === 200;
  }
}
