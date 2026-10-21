/* FULL NPPL INSIDER — service worker
   Cache-first for static shell/study assets; network-first for live weather/NOTAM APIs. */
const CACHE_VERSION = 'nppl-insider-v9-20261021-ghpages';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './data/lessons.js',
  './data/flashcards.js',
  './data/questions.js',
  './data/videos.js',
  './data/emergencies.js',
  './data/landing.js',
  './data/circuits.js',
  './data/c42-checks.js',
  './data/trip-plan.js',
  './data/glossary.js',
  './data/aircraft.js',
  './data/chart-legend.js',
  './data/flight-prep.js',
  './data/i18n.js',
  './data/i18n-content/index.js',
  './js/i18n.js',
  './js/storage.js',
  './js/backup.js',
  './js/aircraft-pref.js',
  './js/audio.js',
  './js/animations.js',
  './js/youtube.js',
  './js/skills.js',
  './js/c42-checks-ui.js',
  './js/trip-plan-ui.js',
  './js/glossary-ui.js',
  './js/search-ui.js',
  './js/aircraft-ui.js',
  './js/chart-ui.js',
  './js/flight-prep-ui.js',
  './js/app.js',
  './js/airfields-ui.js',
  './js/crp-drills-ui.js',
  './js/frtol-drills-ui.js',
  './js/daily-packs-ui.js',
  './data/signs-signals.js',
  './data/law-currency.js',
  './data/met-daily.js',
  './js/pwa.js',
  './data/crp-drills.js',
  './data/frtol-drills.js',
  './data/airfields.js'
];

const LANG_FILES = ['cy', 'pl', 'fr', 'de', 'es', 'pt', 'ro'].map(
  (l) => `./data/i18n-content/${l}.js`
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.addAll([...SHELL, ...LANG_FILES]).catch(() =>
        cache.addAll(SHELL)
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Base path the SW is served from (e.g. /full-nppl-insider/ on GitHub Pages, / locally)
const BASE = new URL('./', self.location).pathname;
function rel(url) {
  return url.pathname.startsWith(BASE) ? '/' + url.pathname.slice(BASE.length) : url.pathname;
}

function isApi(url) {
  return rel(url).startsWith('/api/');
}

function isStatic(url) {
  const p = rel(url);
  return /\.(js|css|png|jpg|jpeg|webp|svg|webmanifest|woff2?)$/i.test(p) ||
    p === '/' || p.endsWith('.html') ||
    p.startsWith('/data/') || p.startsWith('/assets/') ||
    p.startsWith('/js/') || p.startsWith('/css/');
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Live weather / NOTAM — network first, no stale operational data from cache as primary
  if (isApi(url)) {
    event.respondWith(
      fetch(req)
        .then((res) => res)
        .catch(() =>
          new Response(
            JSON.stringify({
              ok: false,
              offline: true,
              error: 'Needs connection — live METAR/TAF/NOTAM unavailable offline.'
            }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          )
        )
    );
    return;
  }

  // Static / shell — cache first, then network; update cache in background when possible
  if (isStatic(url)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || net;
      })
    );
    return;
  }

  // Default: network with cache fallback
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
  );
});
