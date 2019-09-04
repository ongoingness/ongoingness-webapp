/* eslint-disable */
const state = {
  media: [],
};

const mutations = {
  updateMedia: (state, payload) => {
    state.media = payload;
  },

  addMedia: (state, payload) => {
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
