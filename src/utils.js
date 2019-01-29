/**
 Created:  2019-01-29
 Author:   Daniel
 Description:
 - Small helper functions.
 */

/**
 * Check if Vue is in test state.
 * Used across API functions to determine whether to use dummy service.
 * @returns {boolean}
 */
export function isTest() {
  return process.env.NODE_ENV === 'test';
}
