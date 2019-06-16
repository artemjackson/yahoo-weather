export default {
  _listeners: [],

  get() {
    return JSON.parse(localStorage.getItem('searched')) || []
  },

  add(entry) {
    const searched = this.get()

    if (searched.includes(entry)) return;

    searched.unshift(entry);

    localStorage.setItem('searched', JSON.stringify(searched));

    this._listeners.forEach(cb => cb());
  },

  subscribe(cb) {
    const idx = this._listeners.push(() => cb(this));

    return () => this._listeners.splice(idx, 1);
  }
};
