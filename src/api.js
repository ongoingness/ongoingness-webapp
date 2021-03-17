/* eslint-disable no-underscore-dangle */
/**
 Created:  2019-01-25
 Author:   Daniel Welsh, Luis Carvalho
 Description:
 - Interact with the API.
 */
import axios from 'axios';
import * as FormData from 'form-data';
import mock from '../mock_api.json';
import { isTest } from './utils';
import store from './store';

export default class API {
  static URL = 'http://localhost:3000/api';
  // static URL = 'https://app.enablingongoingness.com/api';

  /**
   * Register a user.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<string>} User token.
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
   * Authenticate a user.
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<string>} User token.
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
   * Get user's information.
   * @param {string} token user authentication token.
   * @returns {Promise<object>} User information.
   * {
   *    "devices": [],
   *    "media": [],
   *    "role": "...",
   *    "_id": "...",
   *    "username": "...",
   *    "password": "",
   *    "iv": "...",
   *    "createdAt": "...",
   *    "updatedAt": "...",
   *    "__v": 0    
   * }
   */
  static async fetchUser(token) {
    if (!token) throw new Error('Access token is required');

    if (isTest()) return mock.get_user.data.payload.user;

    const response = await axios.get(`${this.URL}/auth/me`,
      { headers: { 'x-access-token': token } });
    return response.data.payload.user;
  }

  /**
   * Remove a user's account.
   * @param {string} token user authentication token.
   * @returns {Promise<boolean>} True if the user a delete successfully.
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
   * @param {string} token user authentication token.
   * @returns {Promise<[object]>} List of media item associated to the user.
   *  [
   *     {
   *         "links": {
   *             "tags": [
   *                 {
   *                     "name": "...",
   *                     "id": "..."
   *                 }
   *             ],
   *             "collections": [
   *                 {
   *                    "name": "...",
   *                     "id": "..."
   *                 }
   *            ],
   *             "people": [..],
   *             "places": [],
   *             "times": [],
   *             "related_media": []
   *         },
   *         "era": "era",
   *         "tags": [
   *             {
   *                 "name": "...",
   *                 "id": "..."
   *             }
   *         ],
   *         "collections": [
   *             {
   *                 "name": "....",
   *                 "id": "..."
   *             }
   *         ],
   *         "people": [...],
   *         "places": [...],
   *         "times": [...],
   *         "related_media": [...],
   *         "_id": "...",
   *         "path": "...",
   *         "mimetype": "....",
   *         "sizes": [],
   *         "user": "...",
   *         "createdAt": "...",
   *         "locket": "...",
   *         "emotions": ["..."]
   *    }, ...
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
   * Upload media and its metadata to the api.
   *
   * @param {string} file file content to be uploaded.
   * @param {object} data tags and other metadata associated with the file.
   * @param {string} token user authentication token.
   * @returns {Promise<object>} uploaded media item information.
   *  {
   *         "links": {
   *             "tags": [
   *                 {
   *                     "name": "...",
   *                     "id": "..."
   *                 }
   *             ],
   *             "collections": [
   *                 {
   *                    "name": "...",
   *                     "id": "..."
   *                 }
   *            ],
   *             "people": [..],
   *             "places": [],
   *             "times": [],
   *             "related_media": []
   *         },
   *         "era": "era",
   *         "tags": [
   *             {
   *                 "name": "...",
   *                 "id": "..."
   *             }
   *         ],
   *         "collections": [
   *             {
   *                 "name": "....",
   *                 "id": "..."
   *             }
   *         ],
   *         "people": [...],
   *         "places": [...],
   *         "times": [...],
   *         "related_media": [...],
   *         "_id": "...",
   *         "path": "...",
   *         "mimetype": "....",
   *         "sizes": [],
   *         "user": "...",
   *         "createdAt": "...",
   *         "locket": "...",
   *         "emotions": ["..."]
   * }
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
        headers[key] = data[key];
      });
    }
    
    console.log(headers);

    const response = await axios.post(`${this.URL}/media`, formData, {
      headers,
    });

    console.log(response.data.payload);

    return response.data.payload;
  }

  /**
   * Delete an item of media.
   * @param {string} id identifier of the item to be deleted.
   * @param {string} token user authentication token.
   * @returns {Promise<boolean>} true if the item was succefully deleted.
   */
  static async deleteMedia(id, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.delete(`${this.URL}/media/${id}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.status === 200;
  }

  /**
   * Add a new device to the user account.
   * 
   * @param {string} mac the mac address of the device
   * @param {string} token user authentication token
   * @returns {Promise<object>} Information about the added device.
   * {
   *    _id: "...",
   *    mac: "...",
   *    userId: "...",
   *    createdAt: "...",
   *    updatedAt: "..."
   *    __v: "..."
   * }
   */
  static async addDevice(mac, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.post(`${this.URL}/devices/`, { mac }, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.payload;
  }

  /**
   * Get devices associated to the user account.
   * @param {string} token user authentication token.
   * @returns {Promise<[object]>} List of devices associated to this user.
   * [
   *    {
   *      _id: "...",
   *      mac: "...",
   *      userId: "...",
   *      createdAt: "...",
   *      updatedAt: "..."
   *      __v: "..."
   *    },
   *    ...
   * ]
   */
  static async getDevices(token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.get(`${this.URL}/devices/`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.payload;
  }

  /**
   * Delete a device associated to the user.
   * @param {string} id identifier of the device to be deleted.
   * @param {string} token user authentication token. 
   * @returns {Promise<boolean>} true if the device was deleted successfully.
   */
  static async deleteDevice(id, token) {
    if (!token) throw new Error('Access token required');

    const response = await axios.delete(`${this.URL}/devices/${id}`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.status === 200;
  }

  /**
   * Get suggested tags given a term.
   * @param {string} token user authentication token. 
   * @param {string} term suggestion to be searched.
   * @returns {Promise<[object]>} List of suggested tags.
   * [
   *    {
   *      id: "...",
   *      name: "..."
   *    },
   *    ...
   * ]
   */
  static async getTagSuggestion(token, term) {
    if (!token) throw new Error('Access token is required');

    const response = await axios.get(`${this.URL}/media/tags?term=${term}`, {
      headers: {
        'x-access-token': token,
      },
    });

    // If there are no tags return an empty array, else, return the tags.
    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

  /**
   * Get all tags associated to an user.
   * @param {string} token user authenciation token. 
   * @returns {Promise<object>} All tags associated with the user seperated by types.
   * {
   *    people: [...],
   *    places: [...],
   *    tags: [
   *            {
   *              name: "...",
   *              id: "...",
   *            }
   *          ],
   *    time: [
   *            {
   *              value: "...",
   *              id: "...",
   *            },
   *            ...
   *          ],
   * }
   */
  static async getAllTags(token) {
    if (!token) throw new Error('Access token is required');

    const response = await axios.get(`${this.URL}/media/tagsall`, {
      headers: {
        'x-access-token': token,
      },
    });

    // If there are no tags return an empty array, else, return the tags.
    return response.data === undefined || null ? [] : response.data;
  }

  /**
   * Gets the number of logs for each existing user.
   * @param {string} token user authentication token. 
   * @returns {Promise<object>} A list of users with their id, username and number of logs.
   * [
   *    {
   *        id: "...",
   *        nlogs: 000,
   *        username: "...",
   *    },
   *    ...
   * ]
   */
  static async getUserLogsAmount(token) {
    if (!token) throw Error('Access token is required');

    const response = await axios.get(`${this.URL}/log/usernlogs`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response.data.payload === undefined || null ? [] : response.data.payload;
  }

  /**
   * Search logs of a specific user. Logs are splitted in pages.
   * @param {string} token user authentication token.
   * @param {[string]} codes types of logs to be searched. 
   * @param {string} user id of user associated to the logs to be searched.
   * @param {number} firstPage current page of logs to get.
   * @param {number} pageAmount the total number of log pages.
   * @param {number} pageSize the number of logs per page.
   * @param {number} from the starting date as a long for the logs. 0 if no range applied.
   * @param {number} to the ending date as a long for the logs. 0 if no range applied.
   * @returns {Promise<object>} the total amount of logs, the total amount of pages, and a list of pages with logs.
   * {
   *    logsAmount: 000,
   *    totalPages: 000,
   *    pages: [
   *              {
   *                index: 000,
   *                logs: [
   *                        code: "...",
   *                        content: "...",
   *                        level: "...",
   *                        message: "...",
   *                        timestamp: "...",
   *                        user: "...",
   *                        __v: "...",
   *                        _id: "..."
   *                      ]
   *              },
   *              ...
   *           ]
   * }
   */
  static async searchLogs(token, codes, user, firstPage, pageAmount, pageSize, from, to) {
    if (!token) throw Error('Access token is required');

    const response = await axios.get(`${this.URL}/log/search/?codes=${codes}&user=${user}&firstPage=${firstPage}&pageAmount=${pageAmount}&pageSize=${pageSize}&from=${from}&to=${to}`, {
      headers: {
        'x-access-token': token,
      },
    });

    if(response.data.payload === undefined || null )
      return []

    for(let page of response.data.payload.pages) {
      for(let log of page.logs) {
        if(log.content.includes('\\')) {
          log.content = log.content.replaceAll('\\', '')
          log.content = log.content.substring(1, log.content.length-1);
        }
      }
    }

    return response.data.payload === undefined || null ? [] : response.data.payload;
  }
  
  /**
   * Get the number of sessions of an user in a specific time range.
   * @param {string} token user authentication token. 
   * @param {string} user id of user associated to sessions.
   * @param {string} timescale m for monthly timescale 
   * @param {number} from start of the range to search between dates. 
   * @param {number} to end of the range to search between dates.
   * @returns 
   */
  static async numberOfSessions(token, user, timescale, from, to) {
    if (!token) throw Error('Access token is required');

    const response = await axios.get(`${this.URL}/log/numberOfSessions/?user=${user}&timescale=${timescale}&from=${from}&to=${to}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data.payload === undefined || null ? [] : response.data.payload;
  }
}
