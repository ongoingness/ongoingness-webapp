/* eslint-disable no-shadow,no-param-reassign */
/**
 Created:  2019-04-26
 Author:   Daniel
 Description:
 -
 */

const state = {
  user: null,
};

const mutations = {
  updateUser: (state, payload) => {
    state.user = payload;
  },
};

const actions = {};

const getters = {
  getUser: state => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
