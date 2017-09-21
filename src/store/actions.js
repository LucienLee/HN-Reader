import { fetchTopIDs, fetchItem, fetchStoriesByTraversal, checkStoriesByTraversal, watchList, watchConnection } from '@/firebase';
import difference from 'lodash-es/difference';
import debounce from 'lodash-es/debounce';

let isFetchImmediately = false;
let storageTimestamp = 0;

const save = debounce((state) => {
  localStorage.setItem('state', JSON.stringify({
    list: state.list,
    items: state.items,
    nextToFetchID: state.nextToFetchID,
    timestamp: Date.now(),
  }));
}, 200);

function load() {
  return JSON.parse(localStorage.getItem('state'));
}

export default {
  async getNewestList({ commit, state }) {
    // If data too old, refresh all list and item
    const outdated = Date.now() - storageTimestamp > 3 * 60 * 1000;
    if (state.list.length === 0 || outdated) {
      const topIDs = await fetchTopIDs();
      commit('SET_ENTIRE_LIST', { list: topIDs });
      commit('SET_NEXT_TO_FETCH', { id: topIDs[0] });
      commit('CLEAN_ITEMS');
    }
  },
  async getItems({ state, commit, dispatch, getters }) {
    commit('SET_LOADING', { isLoading: true });
    const { list, itemsPerPage } = state;
    const beginIndex = getters.nextToFetchIndex;
    const numOfFetchInList = beginIndex === -1
      ? 0
      : Math.min(list.length - beginIndex, itemsPerPage);
    const numOfFetchByTraversal = itemsPerPage - numOfFetchInList;
    const fetchList = list.slice(beginIndex, beginIndex + numOfFetchInList);

    // Find stock is not enough. stop probing asap
    if (numOfFetchByTraversal > 0) {
      isFetchImmediately = true;
    }

    // Fetch in the waiting list
    const nextToFetchID = await Promise.all(fetchList.map(id => dispatch('getItemByID', { id })))
      .then(() => {
        // Recaculate index in case that realtime items prepend into the list
        const nextID = numOfFetchInList > 0
          && getters.nextToFetchIndex + numOfFetchInList < list.length
            ? list[getters.nextToFetchIndex + numOfFetchInList]
            : list[list.length - 1] - 1;
        commit('SET_NEXT_TO_FETCH', { id: nextID });
        return nextID;
      });

    // Fetch by travsersal ID when there isn't enough stock of valid IDs
    if (numOfFetchByTraversal > 0) {
      await fetchStoriesByTraversal(nextToFetchID, numOfFetchByTraversal, (item) => {
        commit('SET_ITEM', { item });
        commit('SET_LIST', { ids: [item.id] });
      }).then((id) => {
        commit('SET_NEXT_TO_FETCH', { id });
        isFetchImmediately = false;
      });
    }
    commit('SET_LOADING', { isLoading: false });
    save(state);
  },
  getItemByID({ commit }, { id }) {
    return fetchItem(id)
      .then((item) => {
        commit('SET_ITEM', { item });
        return item;
      });
  },
  getDataFromStorage({ commit }) {
    const { list, items, nextToFetchID, timestamp } = load();
    commit('SET_LIST', { ids: list });
    commit('SET_NEXT_TO_FETCH', { id: nextToFetchID });
    commit('SET_ITEMS', { items });
    storageTimestamp = timestamp;
  },
  watchWaitToFetchList({ commit, state, getters }) {
    let isFetching = false;
    async function checkWaitToFetchList() {
      const numToFetch = state.reservedIDs - getters.numOfWaitToFetchIDs;
      if (!isFetchImmediately && !isFetching && numToFetch > 0) {
        isFetching = true;
        await checkStoriesByTraversal(state.list[state.list.length - 1] - 1, numToFetch, (id) => {
          // Check again in case that flag is changed when callback
          if (!isFetchImmediately) {
            commit('SET_LIST', { ids: [id] });
            if (getters.nextToFetchIndex === -1) {
              commit('SET_NEXT_TO_FETCH', { id });
            }
          }
        });
        isFetching = false;
      }

      if (state.list[state.list.length - 1] > 0) {
        requestAnimationFrame(checkWaitToFetchList);
      }
    }

    const reqID = requestAnimationFrame(checkWaitToFetchList);
    return () => { cancelAnimationFrame(reqID); };
  },
  watchNewStories({ commit, state, dispatch }) {
    return watchList(async (list) => {
      const newItems = difference(list, state.list);
      /*
        Because of API limitation, items might be not available in the newest list immediately.
        Hence, we check unloaded items in every newest list update.
      */
      const results = Promise.all(newItems.map(id => dispatch('getItemByID', { id })));
      commit('SET_LIST', { ids: newItems.filter((item, idx) => results[idx]) });
      save(state);
    });
  },
  detechConnection({ commit }) {
    watchConnection((isOnline) => {
      commit('SET_ONLINE', { isOnline: isOnline || window.navigator.onLine });
    });
  },
};
