import Vue from 'vue';
import 'normalize.css';
import store from './store';
import App from './App';


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
