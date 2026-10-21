/* Progress backup — export / import ALL localStorage keys the app uses.
   Phone-first: one JSON file; full replace of known keys after confirm. */
const Backup = (() => {
  const VERSION = 1;
  const APP = 'FULL NPPL INSIDER';

  /** Known keys (always included when present). */
  const KNOWN = [
    'full-nppl-insider-v1',           // Store.KEY
    'nppl_lang',
    'nppl_aircraft',
    'full-nppl-c42-ticks',
    'full-nppl-trip-plans-v1',
    'full-nppl-flight-prep-v1',
    'full-nppl-airfields-v1',
    'nppl_ios_install_hint_dismissed'
  ];

  function isAppKey(k) {
    if (!k || typeof k !== 'string') return false;
    if (KNOWN.includes(k)) return true;
    if (k.startsWith('nppl_') || k.startsWith('full-nppl')) return true;
    return false;
  }

  function collectKeys() {
    const keys = new Set(KNOWN);
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (isAppKey(k)) keys.add(k);
      }
    } catch (_) { /* ignore */ }
    // Prefer module-reported keys when available
    try { if (typeof Store !== 'undefined' && Store.KEY) keys.add(Store.KEY); } catch (_) {}
    try { if (typeof I18n !== 'undefined' && I18n.STORAGE_KEY) keys.add(I18n.STORAGE_KEY); } catch (_) {}
    try { if (typeof AircraftPref !== 'undefined' && AircraftPref.STORAGE_KEY) keys.add(AircraftPref.STORAGE_KEY); } catch (_) {}
    try {
      if (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.storageKey) {
        keys.add(AIRFIELDS_META.storageKey);
      }
    } catch (_) {}
    return Array.from(keys).sort();
  }

  function buildPayload() {
    const data = {};
    collectKeys().forEach((k) => {
      try {
        const v = localStorage.getItem(k);
        if (v != null) data[k] = v;
      } catch (_) { /* skip */ }
    });
    return {
      version: VERSION,
      exportedAt: new Date().toISOString(),
      app: APP,
      data
    };
  }

  function toJson(payload) {
    return JSON.stringify(payload, null, 2);
  }

  function downloadFile(payload) {
    const text = toJson(payload);
    const stamp = (payload.exportedAt || '').slice(0, 10) || 'backup';
    const name = 'full-nppl-insider-backup-' + stamp + '.json';
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { URL.revokeObjectURL(url); } catch (_) {}
      try { a.remove(); } catch (_) {}
    }, 500);
    return { text, name };
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return !!ok;
    } catch (_) {
      return false;
    }
  }

  function parseAndValidate(raw) {
    if (raw == null || String(raw).trim() === '') {
      return { ok: false, error: 'empty' };
    }
    let obj;
    try {
      obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (_) {
      return { ok: false, error: 'json' };
    }
    if (!obj || typeof obj !== 'object') return { ok: false, error: 'shape' };
    if (obj.app && obj.app !== APP) return { ok: false, error: 'app' };
    if (obj.version != null && (typeof obj.version !== 'number' || obj.version < 1 || obj.version > VERSION + 5)) {
      return { ok: false, error: 'version' };
    }
    if (!obj.data || typeof obj.data !== 'object' || Array.isArray(obj.data)) {
      return { ok: false, error: 'shape' };
    }
    const keys = Object.keys(obj.data);
    if (!keys.length) return { ok: false, error: 'empty_data' };
    // At least one recognised key, or any nppl_/full-nppl key
    const recognised = keys.some(isAppKey);
    if (!recognised) return { ok: false, error: 'keys' };
    return { ok: true, payload: obj };
  }

  /** Full replace of app keys: clear known/scanned app keys, then write backup data. */
  function applyReplace(payload) {
    const incoming = payload.data || {};
    const toClear = new Set(collectKeys());
    Object.keys(incoming).forEach((k) => {
      if (isAppKey(k)) toClear.add(k);
    });
    toClear.forEach((k) => {
      try { localStorage.removeItem(k); } catch (_) {}
    });
    let written = 0;
    Object.keys(incoming).forEach((k) => {
      if (!isAppKey(k)) return;
      try {
        const v = incoming[k];
        localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
        written++;
      } catch (_) { /* quota etc */ }
    });
    return written;
  }

  return {
    VERSION,
    APP,
    KNOWN,
    collectKeys,
    buildPayload,
    toJson,
    downloadFile,
    copyText,
    parseAndValidate,
    applyReplace,
    isAppKey
  };
})();
