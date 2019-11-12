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
import notification from './modules/notification';
import user from './modules/user';
import tags from './modules/tags';
import usernlogs from './modules/usernlogs';
import logCodes from './modules/logCodes';
import logForm from './modules/logForm';
import log from './modules/log';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    media,
    device,
    notification,
    user,
    tags,
    usernlogs,
    logCodes,
    logForm,
    log,
  },
});
