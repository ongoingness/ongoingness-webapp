/* eslint-disable no-underscore-dangle */
/**
 Created:  2019-01-25
 Author:   Daniel Welsh
 Description:
 - Interact with the API.
 */
import axios from 'axios';
import * as FormData from 'form-data';
import mock from '../mock_api.json';
import { isTest } from './utils';
import store from './store';

export default class API {
  // static URL = 'https://ongoingness-api.openlab.ncl.ac.uk/api';
  static URL = 'http://localhost:3000/api';
  //static URL = 'https://ongoingness-v2-api.openlab.ncl.ac.uk/api';

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
    if (isTest()) return mock.register.data.payload.token;

    const response = await axios.post(`${this.URL}/auth/register`, userData);
    store.commit('updateUser', response.data.payload.user);

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

    if (isTest()) return mock.authenticate.data.payload.token;

    const response = await axios.post(`${this.URL}/auth/authenticate`, userData);
    store.commit('updateUser', response.data.payload.user);

    return response.data.payload.token;
  }

  /**
   * Get a user's information
   * @param token
   * @returns {Promise<any>}
   */
  static async fetchUser(token) {
    if (!token) throw new Error('Access token is required');

    if (isTest()) return mock.get_user.data.payload.user;

    const response = await axios.get(`${this.URL}/auth/me`,
      { headers: { 'x-access-token': token } });
    return response.data.payload.user;
  }

  /**
   * Remove a user's account
   * @param token
   * @returns {Promise<boolean>}
   */
  static async deleteAccount(token) {
    if (!token) throw new Error('Access token is required');

    const user = await this.fetchUser(token);

    if (isTest()) return mock.delete_user.status;

    try {
      const response = await axios.delete(`${this.URL}/users/${user._id}`,
        { headers: { 'x-access-token': token } });
      return response.status === 200;
    } catch (e) {
      console.error(e.response);
      throw e;
    }
  }

  /**
   * Get all of the user's media.
   * @param token
   * @returns {Promise<void>}
   */
  static async getAllMedia(token) {
    if (!token) throw new Error('Access token is required');

    if (isTest()) {
      return mock.all_media.data.payload === undefined ? [] : mock.all_media.data.payload;
    }
    const response = await axios.get(`${this.URL}/media`,
      { headers: { 'x-access-token': token } });
    // If there is no media return an empty array, else, return the media
    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

  /**
   * Upload media to the api.
   *
   * @param file
   * @param data
   * @param token
   * @returns {Promise<void>}
   */
  static async uploadMedia(file, data, token) {
    if (!token) throw new Error('Access token required');

    const formData = new FormData();
    formData.append('file', file);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    };

    if (data) {
      Object.keys(data).forEach((key) => {
        console.log(key);
        headers[key] = data[key];
      });
    }
    const response = await axios.post(`${this.URL}/media`, formData, {
      headers,
    });

    console.log(response.data.payload);

    return response.data.payload;
  }

  /**
   * Delete an item of media
   * @param id
   * @param token
   * @returns {Promise<number|string>}
   */
  static async deleteMedia(id, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.delete(`${this.URL}/media/${id}`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.status;
  }

  static async addDevice(mac, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.post(`${this.URL}/devices/`, { mac }, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.payload;
  }

  static async getDevices(token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.get(`${this.URL}/devices/`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.payload;
  }

  static async deleteDevice(id, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.delete(`${this.URL}/devices/${id}`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response;
  }

  static async getTagSuggestion(token, term) {
    if (!token) throw new Error('Access token is required');

    const response = await axios.get(`${this.URL}/media/tags?term=${term}`, {
      headers: {
        'x-access-token': token,
      },
    });

    // If there is no media return an empty array, else, return the media
    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

  static async getAllTags(token) {
    if (!token) throw new Error('Access token is required');

    const response = await axios.get(`${this.URL}/media/tagsall`, {
      headers: {
        'x-access-token': token,
      },
    });

    // If there is no media return an empty array, else, return the media
    return response.data === undefined || null ? [] : response.data;
  }

  static async getUserLogsAmount(token) {
    if (!token) throw Error('Access token is required');

    const response = await axios.get(`${this.URL}/log/usernlogs`, {
      headers: {
        'x-access-token': token,
      }
    });
    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

  //http://localhost:3000/api/log/search/?codes=GET_MEDIA,LOGIN&user=5db6ed2a18eef30011ee2a9a&firstPage=1&pageAmount=10&pageSize=10
  static async searchLogs(token, codes, user, firstPage, pageAmount,pageSize) {
    if (!token) throw Error('Access token is required');

    const response = await axios.get(`${this.URL}/log/search/?codes=${codes}&user=${user}&firstPage=${firstPage}&pageAmount=${pageAmount}&pageSize=${pageSize}`, {
      headers: {
        'x-access-token': token,
      }
    });


    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

}
