/* PWA register + iOS Add to Home Screen hint */
const PWA = (() => {
  const HINT_KEY = 'nppl_ios_install_hint_dismissed';

  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  function isIos() {
    const ua = navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  const RELOAD_KEY = 'nppl_sw_reloaded_for';

  function register() {
    if (!('serviceWorker' in navigator)) return;
    // Only reload when a NEW worker replaces an existing one (not on the very first install).
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController) return;
      askBuild().then((v) => {
        // Guard against loops: reload at most once per new build in this tab session.
        const key = v || ('t' + Math.floor(Date.now() / 60000));
        try {
          if (sessionStorage.getItem(RELOAD_KEY) === key) return;
          sessionStorage.setItem(RELOAD_KEY, key);
        } catch (_) { return; }
        window.location.reload();
      });
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { scope: './', updateViaCache: 'none' }).then((reg) => {
        // iOS keeps home-screen apps suspended: check for a new build whenever the app comes back.
        const check = () => { try { reg.update(); } catch (_) { /* ignore */ } };
        document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
        window.addEventListener('pageshow', check);
      }).catch(() => {
        /* ignore — older browsers / file:// */
      });
    });
  }

  /* Ask the active service worker which build (cache version) it is serving. */
  function askBuild() {
    return new Promise((resolve) => {
      const sw = navigator.serviceWorker && navigator.serviceWorker.controller;
      if (!sw || typeof MessageChannel === 'undefined') return resolve('');
      const ch = new MessageChannel();
      const timer = setTimeout(() => resolve(''), 1500);
      ch.port1.onmessage = (e) => { clearTimeout(timer); resolve((e.data && e.data.version) || ''); };
      try { sw.postMessage({ type: 'get-version' }, [ch.port2]); } catch (_) { clearTimeout(timer); resolve(''); }
    });
  }

  function showBuild() {
    const el = document.getElementById('app-build');
    if (!el) return;
    askBuild().then((v) => {
      const b = el.querySelector('b') || el;
      b.textContent = v ? v.replace(/^nppl-(live|preview)-/, '') : 'not installed yet (reopen the app)';
    });
  }

  function showIosHint() {
    if (isStandalone() || !isIos()) return;
    try {
      if (localStorage.getItem(HINT_KEY) === '1') return;
    } catch (_) { /* ignore */ }

    const bar = document.createElement('div');
    bar.id = 'pwa-install-hint';
    bar.className = 'pwa-install-hint';
    bar.setAttribute('role', 'status');
    const t = (k, fb) => (typeof I18n !== 'undefined' ? I18n.t(k) : fb);
    bar.innerHTML = `
      <div class="pwa-install-inner">
        <strong>${t('pwa.install_title', 'Install / Add to Home Screen')}</strong>
        <p>${t('pwa.ios_how', 'On iPhone/iPad: tap Share ▢↑ then “Add to Home Screen”. Works offline for core study after first visit.')}</p>
        <button type="button" class="btn btn-secondary btn-sm" id="pwa-hint-dismiss">${t('common.ok', 'OK')}</button>
      </div>`;
    document.body.appendChild(bar);
    const btn = document.getElementById('pwa-hint-dismiss');
    if (btn) {
      btn.addEventListener('click', () => {
        try { localStorage.setItem(HINT_KEY, '1'); } catch (_) { /* ignore */ }
        bar.remove();
      });
    }
  }

  function init() {
    register();
    // Non-blocking: after gate, or shortly after load
    setTimeout(showIosHint, 2500);
  }

  return { init, isStandalone, isIos, register, showBuild, askBuild };
})();

if (typeof globalThis !== 'undefined') globalThis.PWA = PWA;
