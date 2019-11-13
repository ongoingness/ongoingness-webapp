import 'bulma/css/bulma.css';
import './assets/multiselect.css';
import Vue from 'vue';
import Vuex from 'vuex';
import VueSimpleAlert from "vue-simple-alert";
import store from './store';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
