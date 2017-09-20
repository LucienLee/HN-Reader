// Make webpack tree shake firebase
import * as Firebase from 'firebase/app';
import 'firebase/database';


const HACKER_NEWS_CONFIG = {
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
};

const firebaseApp = Firebase.initializeApp(HACKER_NEWS_CONFIG.config);
const db = firebaseApp.database().ref(HACKER_NEWS_CONFIG.version);
const connectedRef = firebaseApp.database().ref('.info/connected');

/**
 * Fetch data from specified path
 * @param {string} child - child path of hacker news API
 */
function fetch(child) {
  return new Promise((resolve, reject) => {
    db.child(child).once('value', (snapshot) => {
      const val = snapshot.val();
      resolve(val);
    }, reject);
  });
}

/*
  The first 500 stories could fetch items IDs directly by API, which have better performace.
  However, we could only get elder stories by traversing item.
  Reference: https://github.com/HackerNews/API/
*/
function fetchTopIDs() {
  return fetch('newstories');
}

function fetchItem(id) {
  return fetch(`item/${id}`);
}

function fetchItemType(id) {
  return fetch(`item/${id}/type`);
}

/**
 * Fetch stories backwardly by traversing from specified ID
 * @param {number} from - item id used to start to backward traversal
 * @param {number} amount - amount of stories to fetch
 * @param {function} cb - callback when fetch a story
 * @returns {Promise<number>} a promise that contains the last query item's ID
 */

async function fetchStoriesByTraversal(from, amount, cb) {
  let pointer = from;
  let counter = amount;

  while (counter > 0 && pointer > 0) {
    // eslint-disable-next-line no-await-in-loop
    const item = await fetchItem(pointer);
    if (item && item.type === 'story') {
      counter -= 1;
      cb(item);
    }
    pointer -= 1;
  }
  return Promise.resolve(pointer);
}


/*
  Check items's types whether it's story by traversing from specified ID
*/
async function checkStoriesByTraversal(from, amount, cb) {
  let pointer = from;
  let counter = amount;

  while (counter > 0 && pointer > 0) {
    // eslint-disable-next-line no-await-in-loop
    const type = await fetchItemType(pointer);
    if (type === 'story') {
      counter -= 1;
      cb(pointer);
    }
    pointer -= 1;
  }
  return Promise.resolve(pointer);
}

/**
 * Watch newest story list
 * @param {function} cb callback function when listen new stories
 */
function watchList(cb) {
  let first = true;
  const ref = db.child('newstories');
  const handler = (snapshot) => {
    if (first) {
      first = false;
    } else {
      cb(snapshot.val());
    }
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  };
}
/**
 * Watch Firebase socket connection
 * @param {function} cb callback function when detect firebase connection change
 */
function watchConnection(cb) {
  connectedRef.on('value', (snap) => {
    cb(snap.val());
  });
}

export {
  fetchTopIDs,
  fetchItem,
  fetchStoriesByTraversal,
  checkStoriesByTraversal,
  watchList,
  watchConnection,
};
