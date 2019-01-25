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
    console.log(response);

    return response.data.payload.token;
  }
}
