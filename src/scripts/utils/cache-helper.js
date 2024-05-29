import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    const cachesToDelete = cacheNames.filter((name) => name !== CONFIG.CACHE_NAME);
    await Promise.all(cachesToDelete.map((name) => caches.delete(name)));
  },

  async revalidateCache(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      const fetchPromise = this._fetchRequest(request);
      fetchPromise.then(() => {});
      return cachedResponse;
    }

    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    const cache = await this._openCache();
    await cache.put(request, response.clone());
    return response;
  },
};

export default CacheHelper;
