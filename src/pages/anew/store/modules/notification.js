/* eslint-disable */

const state = {
  message: '',
  visible: false,
  type: 'info',
};

const mutations = {
  setNotificationMessage: (state, payload) => {
    state.message = payload;
  },

  setNotificationVisibility: (state, payload) => {
    state.visible = payload;
  },

  setNotificationType: (state, payload) => {
    state.type = payload;
  }
};

const actions = {};

const getters = {
  getNotificationMessage: state => state.message,
  getNotificationVisibility: state => state.visible,
  getNotificationType: state => state.type,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
