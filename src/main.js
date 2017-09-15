import Vue from 'vue';
import 'normalize.css';
import store from './store';
import App from './App';
import * as filters from './util/filters';

Vue.config.productionTip = false;

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
