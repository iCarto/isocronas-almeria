// TODO (fpuga): Given that now we have LocalStorageStore, this class probably
// should be removed and use the other instead.
const Storage = {
    set(key, value) {
        localStorage.setItem(key, value);
    },

    get(key) {
        return localStorage.getItem(key);
    },

    remove(key) {
        localStorage.removeItem(key);
    },
};

export default Storage;
