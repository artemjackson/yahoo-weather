import Yahoo from 'libs/yahoo';
import storage from 'libs/storage';

const yahoo = Yahoo({
  appId: process.env.YAHOO_APP_ID,
  clientId: process.env.YAHOO_CLIENT_ID,
  clientSecret: process.env.YAHOO_CLIENT_SECRET,
});

export default {
  get history() {
    return storage.get();
  },

  async search(...args) {
    const res = await yahoo.weather(...args);

    if (res.location.city) storage.add(res.location.city);

    return res;
  },

  subscribe(cb) {
    const unsubscribe = storage.subscribe(() => cb(this));
    return () => unsubscribe();
  }
};
