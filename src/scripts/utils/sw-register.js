import { Workbox } from 'workbox-window';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const workbox = new Workbox('./sw.bundle.js');
      await workbox.register();
      console.log('Service Worker terdaftar dengan sukses!');
    } catch (error) {
      console.error('Gagal mendaftarkan Service Worker:', error);
    }
  } else {
    console.warn('Browser tidak mendukung Service Worker.');
  }
};

export default registerServiceWorker;
