/* eslint-disable no-underscore-dangle */
/**
 Created:  2019-01-25
 Author:   Daniel Welsh
 Description:
 - Interact with the API.
 */
import axios from 'axios';
import mock from '../mock_api.json';
import { isTest } from './utils';

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

    // Use mock service if unit testing.
    if (isTest()) return mock.register;

    const response = await axios.post(`${this.URL}/auth/register`, userData);
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

    if (isTest()) return mock.authenticate;

    const response = await axios.post(`${this.URL}/auth/authenticate`, userData);
    return response.data.payload.token;
  }

  /**
   * Get a user's information
   * @param token
   * @returns {Promise<any>}
   */
  static async getUser(token) {
    if (!token) throw new Error('Access token is required');

    if (isTest()) return mock.get_user;

    const response = await axios.get(`${this.URL}/user/me`, { headers: { 'x-access-token': token } });
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

    if (isTest()) return mock.delete_user;

    const response = await axios.delete(`${this.URL}/user/${user._id}`, { headers: { 'x-access-token': token } });
    return response.status === 200;
  }

  /**
   * Get all of the user's media.
   * @param token
   * @returns {Promise<void>}
   */
  static async getAllMedia(token) {
    if (!token) throw new Error('Access token is required');

    // if (process.env.NODE_ENV === 'test') {
    //   response = null;
    // } else {
    const response = await axios.get(`${this.URL}/media`, { headers: { 'x-access-token': token } });
    // }

    return response.data.payload;
  }
}
