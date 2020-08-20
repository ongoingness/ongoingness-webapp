/* eslint-disable */
const state = {
  gotData: false,
  media: [],
};

const mutations = {
  updateMedia: (state, payload) => {
    state.gotData = true
    state.media = payload;
  },

  addMedia: (state, payload) => {
    state.gotData = true
    state.media.push(payload.payload);
  },

  removeMedia: (state, id) => {
    const idx = state.media.findIndex((media) => media._id === id);
    state.media.splice(idx, 1);
  }
};

const actions = {};

const getters = {
  getMedia: state => state.media,

  getMediaById: (state) => (id) => {
    return state.media.find((media) => media._id === id);
  },

  gotData: state => state.gotData,
  
};

export default {
  state,
  mutations,
  actions,
  getters,
};
