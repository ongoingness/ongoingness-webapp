/* eslint-disable no-underscore-dangle */
/**
 Created:  2019-01-25
 Author:   Daniel Welsh
 Description:
 - Interact with the API.
 */
import axios from 'axios';

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
    const response = await axios.post(`${this.URL}/auth/register`, userData);
    // console.log(response);

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
    const response = await axios.delete(`${this.URL}/user/${user._id}`, { headers: { 'x-access-token': token } });
    if (response.status !== 200) {
      return false;
    }

    return true;
  }
}
