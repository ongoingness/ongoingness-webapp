/**
 Created:  2019-01-25
 Author:   Daniel Welsh
 Description:
 - cookie creation and management.
 */
export default class Cookie {
  /**
   * Get cookie from browser
   * @param name cookie label
   * @returns {*}
   */
  static get(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  /**
   * Delete authToken cookie from browser
   */
  static delete() {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  /**
   * Set a cookie in the browser window, valid for one day.
   * @param value
   */
  static set(value) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `${encodeURIComponent('authToken')}=${`${encodeURIComponent(value)}; expires=${expires}`}`;
  }
}
