import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    items: {},
    isLoading: false,
  },
  actions,
  mutations,
  getters,
  strict: process.env.NODE_ENV !== 'production',
});
