/**
 Created:  2019-01-25
 Author:   Daniel
 Description:
 - Vuex store.
 */

// index.js
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import media from './modules/media';
import device from './modules/device';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    media,
    device,
  },
});
