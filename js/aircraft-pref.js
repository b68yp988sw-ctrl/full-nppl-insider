/* Selected aircraft preference — localStorage nppl_aircraft = variant id */
const AircraftPref = (() => {
  const STORAGE_KEY = 'nppl_aircraft';

  const ACCENTS = {
    c42: { accent: '#60a5fa', sky: '#60a5fa', skyDim: '#3b82f6' },
    eurostar: { accent: '#a78bfa', sky: '#a78bfa', skyDim: '#7c5cbf' },
    foxbat: { accent: '#34d399', sky: '#34d399', skyDim: '#059669' },
    skyranger: { accent: '#fb923c', sky: '#fb923c', skyDim: '#c2410c' },
    thruster: { accent: '#f472b6', sky: '#f472b6', skyDim: '#db2777' },
    'rans-s6': { accent: '#fbbf24', sky: '#fbbf24', skyDim: '#d97706' },
    'pm-quik': { accent: '#2dd4bf', sky: '#2dd4bf', skyDim: '#0d9488' }
  };

  function data() {
    return (typeof AIRCRAFT_DATA !== 'undefined') ? AIRCRAFT_DATA : null;
  }

  function list() {
    const d = data();
    return d && Array.isArray(d.aircraft) ? d.aircraft : [];
  }

  function findByVariantId(variantId) {
    if (!variantId) return null;
    for (const ac of list()) {
      const v = (ac.variants || []).find(x => x.id === variantId);
      if (v) return { aircraft: ac, variant: v };
    }
    return null;
  }

  function getVariantId() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v && findByVariantId(v)) return v;
    } catch (_) { /* ignore */ }
    return null;
  }

  function hasAircraft() {
    return !!getVariantId();
  }

  function setVariantId(variantId, opts = {}) {
    const found = findByVariantId(variantId);
    if (!found) return null;
    try { localStorage.setItem(STORAGE_KEY, variantId); } catch (_) { /* ignore */ }
    applyTheme();
    if (!opts.silent && typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('nppl-aircraft-change', { detail: { variantId } }));
    }
    return variantId;
  }

  function clear() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
  }

  function resolve() {
    const d = data();
    const vid = getVariantId();
    if (!d || !vid) return null;
    const found = findByVariantId(vid);
    if (!found) return null;
    return d.resolve(found.aircraft, found.variant.id);
  }

  function aircraftId() {
    const r = resolve();
    return r ? r.id : null;
  }

  function isC42() {
    return aircraftId() === 'c42';
  }

  function shortLabel() {
    const r = resolve();
    if (!r) return '';
    return r.shortName || r.name;
  }

  function fullLabel() {
    const r = resolve();
    if (!r) return '';
    return `${r.name} · ${r.variantLabel}`;
  }

  function displayName(langAware) {
    const r = resolve();
    if (!r) return '';
    if (langAware && typeof I18n !== 'undefined') {
      const key = 'aircraft.name.' + r.id;
      if (I18n.hasOwn(key) || (I18n.t(key) !== key)) {
        const n = I18n.t(key);
        if (n && n !== key) return n;
      }
    }
    return r.shortName || r.name;
  }

  /* Compact SVG thumbnails for picker / home (labelled schematic) */
  function thumbSvg(diagram, opts = {}) {
    const w = opts.size || 56;
    const layout = diagram || 'highwing';
    if (layout === 'weightshift') {
      return `<svg class="ac-thumb-svg" width="${w}" height="${w}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="10" fill="#05050b"/>
        <path d="M8 22 L32 10 L56 22 L32 30 Z" fill="#3b82f6" opacity="0.9"/>
        <line x1="32" y1="30" x2="32" y2="40" stroke="#f5c842" stroke-width="2"/>
        <ellipse cx="32" cy="46" rx="10" ry="7" fill="#22223e" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="32" cy="56" r="5" fill="none" stroke="#f5c842" stroke-width="1.5"/>
        <circle cx="24" cy="52" r="3" fill="#a6acbb"/><circle cx="40" cy="52" r="3" fill="#a6acbb"/>
      </svg>`;
    }
    if (layout === 'lowwing') {
      return `<svg class="ac-thumb-svg" width="${w}" height="${w}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="10" fill="#05050b"/>
        <ellipse cx="32" cy="28" rx="7" ry="16" fill="#22223e" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="32" cy="10" r="5" fill="none" stroke="#f5c842" stroke-width="1.5"/>
        <rect x="28" y="14" width="8" height="6" rx="1" fill="#fb923c"/>
        <rect x="8" y="38" width="48" height="6" rx="2" fill="#3b82f6"/>
        <circle cx="22" cy="48" r="3.5" fill="#a6acbb"/><circle cx="42" cy="48" r="3.5" fill="#a6acbb"/>
        <rect x="29" y="48" width="6" height="10" rx="1" fill="#3b82f6"/>
      </svg>`;
    }
    // highwing default
    return `<svg class="ac-thumb-svg" width="${w}" height="${w}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="10" fill="#05050b"/>
      <rect x="8" y="24" width="48" height="6" rx="2" fill="#3b82f6"/>
      <ellipse cx="32" cy="36" rx="7" ry="14" fill="#22223e" stroke="#60a5fa" stroke-width="1.5"/>
      <circle cx="32" cy="12" r="5" fill="none" stroke="#f5c842" stroke-width="1.5"/>
      <rect x="28" y="16" width="8" height="6" rx="1" fill="#fb923c"/>
      <circle cx="22" cy="48" r="3.5" fill="#a6acbb"/><circle cx="42" cy="48" r="3.5" fill="#a6acbb"/>
      <rect x="29" y="48" width="6" height="10" rx="1" fill="#3b82f6"/>
    </svg>`;
  }

  function thumbForAircraft(ac, size) {
    if (!ac) return thumbSvg('highwing', { size });
    return thumbSvg(ac.diagram || 'highwing', { size });
  }

  function thumbForProfile(profile, size) {
    if (!profile) return thumbSvg('highwing', { size });
    return thumbSvg(profile.diagram || 'highwing', { size });
  }

  function accentFor(acId) {
    return ACCENTS[acId] || ACCENTS.c42;
  }

  function applyTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const id = aircraftId();
    const a = accentFor(id);
    root.style.setProperty('--ac-accent', a.accent);
    /* Preview (layout D): the logo-matched blue/violet theme is app-wide, so the
       aircraft colour is exposed only as --ac-accent and no longer repaints --sky/--accent. */
    if (id) root.setAttribute('data-aircraft', id);
    else root.removeAttribute('data-aircraft');
  }

  function typeName(ac) {
    if (!ac) return '';
    if (typeof I18n !== 'undefined') {
      const key = 'aircraft.name.' + ac.id;
      const n = I18n.t(key);
      if (n && n !== key) return n;
    }
    return ac.name;
  }

  function categoryLabel(cat) {
    if (typeof I18n !== 'undefined') {
      const key = 'aircraft.cat.' + (cat === 'weightshift' ? 'weightshift' : '3axis');
      const n = I18n.t(key);
      if (n && n !== key) return n;
    }
    return cat === 'weightshift' ? 'Flexwing / weightshift' : '3-axis';
  }

  return {
    STORAGE_KEY,
    list,
    findByVariantId,
    getVariantId,
    hasAircraft,
    setVariantId,
    clear,
    resolve,
    aircraftId,
    isC42,
    shortLabel,
    fullLabel,
    displayName,
    thumbSvg,
    thumbForAircraft,
    thumbForProfile,
    accentFor,
    applyTheme,
    typeName,
    categoryLabel
  };
})();

if (typeof globalThis !== 'undefined') globalThis.AircraftPref = AircraftPref;
