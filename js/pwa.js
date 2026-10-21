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

  function register() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {
        /* ignore — older browsers / file:// */
      });
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

  return { init, isStandalone, isIos, register };
})();

if (typeof globalThis !== 'undefined') globalThis.PWA = PWA;
