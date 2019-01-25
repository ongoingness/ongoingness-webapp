/* eslint-disable no-shadow,no-param-reassign */
/**
 Created:  2019-01-25
 Author:   Daniel
 Description:
 -
 */

const state = {
  token: undefined,
};

const mutations = {
  updateToken: (state, payload) => {
    state.token = payload;
  },
};

const actions = {};

const getters = {
  getToken: state => state.token,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
