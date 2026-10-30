/* FULL NPPL INSIDER — service worker
   Cache-first for static shell/study assets; network-first for live weather/NOTAM APIs. */
/* LIVE build. Live and preview share the same github.io origin, so this worker only
   deletes its own caches: older live caches ('nppl-live-*') and the pre-2026-10-30 live
   caches ('nppl-insider-*'). Preview caches ('nppl-preview-*') are left alone. */
const CACHE_PREFIX = 'nppl-live-';
const OLD_LIVE_PREFIXES = [CACHE_PREFIX, 'nppl-insider-'];
const CACHE_VERSION = CACHE_PREFIX + 'v3-20261030';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/favicon-32.png',
  './assets/icons/splash-logo.jpg',
  './assets/img/logo-small.jpg',
  './assets/img/web.svg',
  './assets/video/circuit-poster.jpg',
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
  './data/airfields.js',
  './assets/c42-checks/sheet-1-preview.jpg',
  './assets/c42-checks/sheet-2-preview.jpg'
];

const LANG_FILES = ['cy', 'pl', 'fr', 'de', 'es', 'pt', 'ro'].map(
  (l) => `./data/i18n-content/${l}.js`
);

function fresh(urls) {
  return urls.map((u) => new Request(u, { cache: 'reload' }));
}

/* Background refresh of a cached file: revalidate with the server instead of
   trusting the HTTP cache (navigation requests can't be cloned with options). */
function revalidate(req) {
  return req.mode === 'navigate'
    ? new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })
    : new Request(req, { cache: 'no-cache' });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      /* cache:'reload' bypasses the browser HTTP cache, so a new version never
         stores stale copies of the previous version's files. */
      cache.addAll(fresh([...SHELL, ...LANG_FILES])).catch(() =>
        cache.addAll(fresh(SHELL))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION && OLD_LIVE_PREFIXES.some((p) => k.startsWith(p))).map((k) => caches.delete(k)))
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
  // Video: never cached (20 MB, Range requests / 206 responses). Straight to network.
  if (/\.(mp4|webm|m4v)$/i.test(url.pathname)) return;

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
      caches.open(CACHE_VERSION).then((c) => c.match(req)).then((cached) => {
        const net = fetch(revalidate(req))
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
      .catch(() => caches.open(CACHE_VERSION).then((c) => c.match(req).then((r) => r || c.match('./index.html'))))
  );
});
