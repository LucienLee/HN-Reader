import Firebase from 'firebase';

const HACKER_NEWS_CONFIG = {
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
};

const firebaseApp = Firebase.initializeApp(HACKER_NEWS_CONFIG.config);
const db = firebaseApp.database().ref(HACKER_NEWS_CONFIG.version);

function fetch(child) {
  return new Promise((resolve, reject) => {
    db.child(child).once('value', (snapshot) => {
      const val = snapshot.val();
      resolve(val);
    }, reject);
  });
}

function fetchItem(id) {
  return fetch(`item/${id}`);
}

export { fetch, fetchItem };
