/**
 Created:  2019-02-12
 Author:   Daniel
 Description:
 -
 */

/* eslint-disable */
const state = {
  devices: [],
};

const mutations = {
  updateDevices: (state, payload) => {
    state.devices = payload;
  },

  addDevice: (state, payload) => {
    state.devices.push(payload);
  },

  removeDevice: (state, id) => {
    const idx = state.devices.findIndex((media) => media._id === id);
    state.devices.splice(idx, 1);
  }
};

const actions = {};

const getters = {
  getDevices: state => state.devices,

  getDeviceById: (state) => (id) => {
    return state.devices.find((device) => device._id === id);
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
