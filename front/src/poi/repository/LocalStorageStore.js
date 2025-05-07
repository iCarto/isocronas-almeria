import Storage from "base/storage/Storage";

/**
 * @typedef {Object} LocalStorageStoreOptions
 * @property {number|string} [cacheDays] - Number of days to keep cache valid
 * @property {string} [keyPrefix] - Prefix for cache keys
 */

class LocalStorageStore {
    #cacheDays;
    #keyPrefix;

    /**
     * @param {LocalStorageStoreOptions} [options]
     */
    constructor(options = {}) {
        this.#cacheDays = Number(
            options.cacheDays || process.env.REACT_APP_POI_CACHE_DAYS || 7
        );
        this.#keyPrefix = options.keyPrefix || "cache_";
    }

    /**
     * Generates a cache key based on the provided parameters
     * @param {string} baseKey - Base key for the cache entry
     * @param {Object} params - Parameters to include in the key
     * @returns {string} The generated cache key
     */
    generateKey(baseKey, params = {}) {
        const paramsString = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}:${value}`)
            .join("_");

        return `${this.#keyPrefix}${baseKey}${paramsString ? "_" + paramsString : ""}`;
    }

    /**
     * Gets data from cache if valid, otherwise returns null
     * @param {string} key - Cache key
     * @returns {any|null} The cached data or null if invalid/not found
     */
    getWithCache(key) {
        // Check if we have valid cached data
        const cachedDataString = Storage.get(key);
        if (cachedDataString) {
            const cachedData = JSON.parse(cachedDataString);
            const cacheAgeInDays =
                (Date.now() - cachedData.timestamp) / (1000 * 60 * 60 * 24);

            if (cacheAgeInDays < this.#cacheDays) {
                return cachedData?.data ? cachedData.data : null;
            } else {
                // TODO (fpuga): Hay situaciones done queremos un LocalStorageStore que
                // almacene un único timestamp para todo lo guardado. Otras donde queremos
                // total granularidad a nivel `key`, y otras donde lo querremos a nivel
                // `#keyPrefix`
                localStorage.clear();
            }
        }

        // Return null if no valid cache or error
        return null;
    }

    /**
     * Sets data in the cache
     * @param {string} key - Cache key
     * @param {any} data - Data to cache
     */
    setCache(key, data) {
        const cacheEntry = {
            timestamp: Date.now(),
            data,
        };
        Storage.set(key, JSON.stringify(cacheEntry));
    }

    /**
     * Clears a specific cache entry
     * @param {string} key - Cache key to clear
     */
    clearCache(key) {
        Storage.remove(key);
    }

    /**
     * Clears all cache entries with the current prefix
     */
    clearAllCache() {
        // Get all localStorage keys
        const keys = Object.keys(localStorage);

        // Filter keys that start with our prefix
        const cacheKeys = keys.filter(key => key.startsWith(this.#keyPrefix));

        // Remove each matching key
        cacheKeys.forEach(key => {
            Storage.remove(key);
        });
    }
}

/**
 * Creates a LocalStorageStore instance
 * @param {LocalStorageStoreOptions} [options] - Configuration options
 * @returns {LocalStorageStore} A new LocalStorageStore instance
 */
export const createLocalStorageStore = (options = {}) => {
    return new LocalStorageStore(options);
};

export default createLocalStorageStore;
