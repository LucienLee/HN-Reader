/* eslint-disable no-param-reassign */
import Vue from 'vue';

export default {
  SET_LIST(state, { ids }) {
    if (state.list.length === 0) {
      state.list = ids;
    } else {
      // We are sure the new items would be newer or elder the current list
      const position = ids[0] > state.list[0] ? 0 : state.list.length;
      state.list.splice(position, 0, ...ids);
    }
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
