import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/app.bundle.js',
  '/app.webmanifest',
  '/sw.bundle.js',
  '/icons/72.png',
  '/icons/96.png',
  '/icons/128.png',
  '/icons/144.png',
  '/icons/152.png',
  '/icons/192.png',
  '/icons/384.png',
  '/icons/512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    CacheHelper.cachingAppShell(assetsToCache)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    CacheHelper.deleteOldCache()
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
