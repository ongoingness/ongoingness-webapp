import 'bulma/css/bulma.css';
import './assets/multiselect.css';
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import App from './App.vue';

Vue.prototype.$eventBus = new Vue();

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
