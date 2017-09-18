import { fetchTopIDs, fetchItem, fetchStoriesByTraversal, checkStoriesByTraversal, watchList } from '@/firebase';
import { difference } from 'lodash-es';

let isFetchImmediately = false;

export default {
  async getListData({ commit, dispatch, state }) {
    commit('SET_LOADING', { isLoading: true });
    if (state.list.length === 0) {
      const topIDs = await fetchTopIDs();
      commit('SET_LIST', { ids: topIDs });
      commit('SET_NEXT_TO_FETCH', { id: topIDs[0] });
    }
    dispatch('getItems');
  },
  async getItems({ state, commit, dispatch, getters }) {
    const { list, itemsPerPage } = state;
    const beginIndex = getters.nextToFetchIndex;
    const numOfFetchInList = beginIndex === -1
      ? 0
      : Math.min(list.length - beginIndex, itemsPerPage);
    const numOfFetchByTraversal = itemsPerPage - numOfFetchInList;
    const fetchList = list.slice(beginIndex, beginIndex + numOfFetchInList);

    // Find stock is not enough. stop probe asap
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

    // Fetch by travsersal id, which is slow
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
  },
  getItemByID({ commit }, { id }) {
    return fetchItem(id)
      .then((item) => {
        commit('SET_ITEM', { item });
        return item;
      });
  },
  watchWaitToFetchList({ commit, state, getters }) {
    let isFetching = false;
    async function checkWaitToFetchList() {
      // Wait loaded top list
      if (state.list.length !== 0 && !isFetchImmediately) {
        const numToFetch = state.reservedIDs - getters.numOfWaitToFetchIDs;
        if (!isFetching && numToFetch > 0) {
          isFetching = true;
          await checkStoriesByTraversal(state.list[state.list.length - 1] - 1, numToFetch, (id) => {
            if (!isFetchImmediately) {
              commit('SET_LIST', { ids: [id] });
              if (getters.nextToFetchIndex === -1) {
                commit('SET_NEXT_TO_FETCH', { id });
              }
            }
          }).then(() => {
            isFetching = false;
          });
        }
      }
      requestAnimationFrame(checkWaitToFetchList);
    }

    const reqID = requestAnimationFrame(checkWaitToFetchList);
    return () => cancelAnimationFrame(reqID);
  },
  watchNewStories({ commit, state, dispatch }) {
    return watchList(async (list) => {
      const newItems = difference(list, state.list);
      /*
        Because of API limitation, items might be not available in the newest list immediately.
        Hence, we check unloaded items in every newest list update.
      */
      const results = Promise.all(newItems.map(id => dispatch('getItemByID', { id })));
      commit('SET_LIST', newItems.filter((item, idx) => results[idx]));
    });
  },
};
