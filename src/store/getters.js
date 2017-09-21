export default {
  nextToFetchIndex(state) {
    return state.list.indexOf(state.nextToFetchID);
  },
  numOfWaitToFetchIDs(state) {
    return state.list.indexOf(state.nextToFetchID) === -1
      ? 0
      : state.list.length - state.list.indexOf(state.nextToFetchID);
  },
  displayedItems(state) {
    return Object.keys(state.items).sort((a, b) => b - a)
      .map(id => state.items[id]).filter(item => !item.dead && !item.deleted);
  },
  /* For debug usage
  numOfItems(state) {
    return Object.keys(state.items).length;
  },
  deadItems(state) {
    return Object.keys(state.items).sort((a, b) => b - a)
      .map(id => state.items[id]).filter(item => item.dead || item.deleted);
  },
  */
};
