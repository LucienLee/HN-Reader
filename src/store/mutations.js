/* eslint-disable no-param-reassign */
import Vue from 'vue';

export default {
  SET_LIST(state, { ids }) {
    state.list = state.list.concat(ids).sort((a, b) => b - a);
  },
  SET_ITEM(state, { item }) {
    if (item) {
      Vue.set(state.items, item.id, item);
    }
  },
  SET_NEXT_TO_FETCH(state, { id }) {
    state.nextToFetchID = id;
  },
  SET_LOADING(state, { isLoading }) {
    state.isLoading = isLoading;
  },
};
