/* FULL NPPL INSIDER — i18n + TTS lang mapping
   Persistence: localStorage key nppl_lang (BCP-47: en, cy, pl, fr, de, es, pt, ro)
   Fallback: English. Missing keys never break the app. */
const I18n = (() => {
  const STORAGE_KEY = 'nppl_lang';
  const DEFAULT = 'en';

  const LANGUAGES = [
    { code: 'en', native: 'English', english: 'English', flag: '🇬🇧', tts: 'en-GB' },
    { code: 'cy', native: 'Cymraeg', english: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', tts: 'cy-GB' },
    { code: 'pl', native: 'Polski', english: 'Polish', flag: '🇵🇱', tts: 'pl-PL' },
    { code: 'fr', native: 'Français', english: 'French', flag: '🇫🇷', tts: 'fr-FR' },
    { code: 'de', native: 'Deutsch', english: 'German', flag: '🇩🇪', tts: 'de-DE' },
    { code: 'es', native: 'Español', english: 'Spanish', flag: '🇪🇸', tts: 'es-ES' },
    { code: 'pt', native: 'Português', english: 'Portuguese', flag: '🇵🇹', tts: 'pt-PT' },
    { code: 'ro', native: 'Română', english: 'Romanian', flag: '🇷🇴', tts: 'ro-RO' }
  ];

  const TTS_FALLBACKS = {
    en: ['en-GB', 'en-US', 'en'],
    cy: ['cy-GB', 'cy', 'en-GB', 'en'],
    pl: ['pl-PL', 'pl'],
    fr: ['fr-FR', 'fr'],
    de: ['de-DE', 'de'],
    es: ['es-ES', 'es'],
    pt: ['pt-PT', 'pt-BR', 'pt'],
    ro: ['ro-RO', 'ro']
  };

  let lang = DEFAULT;
  const listeners = [];

  function dict() {
    return (typeof I18N_STRINGS !== 'undefined' && I18N_STRINGS) || {};
  }

  function getLang() {
    return lang;
  }

  function loadSaved() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v && LANGUAGES.some(l => l.code === v)) {
        lang = v;
        return v;
      }
    } catch (_) { /* ignore */ }
    return null;
  }

  function hasLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return !!(v && LANGUAGES.some(l => l.code === v));
    } catch (_) {
      return false;
    }
  }

  function setLang(code, opts = {}) {
    if (!LANGUAGES.some(l => l.code === code)) code = DEFAULT;
    lang = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) { /* ignore */ }
    document.documentElement.lang = code === 'en' ? 'en-GB' : code;
    if (!opts.silent) {
      listeners.forEach(fn => {
        try { fn(code); } catch (_) { /* ignore */ }
      });
    }
    return code;
  }

  function onChange(fn) {
    if (typeof fn === 'function') listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  }

  function langMeta(code) {
    return LANGUAGES.find(l => l.code === (code || lang)) || LANGUAGES[0];
  }

  function ttsLang(code) {
    const meta = langMeta(code || lang);
    return meta.tts;
  }

  function ttsPrefs(code) {
    return TTS_FALLBACKS[code || lang] || TTS_FALLBACKS.en;
  }

  /** Translate key. Optional vars: t('home.progress', { pct: 10 }) */
  function t(key, vars) {
    const d = dict();
    let str;
    if (d[lang] && d[lang][key] != null) str = d[lang][key];
    else if (d.en && d.en[key] != null) str = d.en[key];
    else str = key;
    if (vars && typeof str === 'string') {
      str = str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : '{' + k + '}'));
    }
    return str;
  }

  /** True if current lang has its own translation (not falling back to EN). */
  function hasOwn(key) {
    const d = dict();
    return !!(d[lang] && d[lang][key] != null);
  }

  /** Optional EN badge HTML when falling back. */
  function enBadge(key) {
    if (lang === 'en' || hasOwn(key)) return '';
    return ' <span class="i18n-en-badge" title="English fallback">EN</span>';
  }

  /** Subject name by id (law, tech, …). */
  function subjectName(id) {
    return t('subject.' + id);
  }

  function applyStaticChrome() {
    // Bottom nav
    const navMap = {
      home: 'nav.home',
      theory: 'nav.theory',
      flashcards: 'nav.cards',
      exams: 'nav.exams',
      computer: 'nav.crp1'
    };
    document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
      const key = navMap[btn.dataset.route];
      if (!key) return;
      const label = btn.querySelector('span:not(.nav-ico)');
      if (label) label.textContent = t(key);
    });
    // Gate (if present)
    const gateH1 = document.querySelector('#gate .gate-card h1');
    if (gateH1) gateH1.textContent = t('gate.title');
    const gateSub = document.querySelector('#gate .gate-sub');
    if (gateSub) gateSub.textContent = t('gate.sub');
    const gateBox = document.querySelector('#gate .disclaimer-box');
    if (gateBox) gateBox.innerHTML = t('gate.disclaimer_html');
    const gateAck = document.querySelector('#gate .check-row span');
    if (gateAck) gateAck.textContent = t('gate.ack');
    const gateEnter = document.getElementById('gate-enter');
    if (gateEnter) gateEnter.textContent = t('gate.enter');
    // Language page
    const langTitle = document.querySelector('#lang-gate .lang-title');
    if (langTitle) langTitle.textContent = t('lang.title');
    const langSub = document.querySelector('#lang-gate .lang-sub');
    if (langSub) langSub.textContent = t('lang.sub');
    const langCont = document.getElementById('lang-continue');
    if (langCont) langCont.textContent = t('lang.continue');
    // Aircraft picker page
    const acTitle = document.querySelector('#aircraft-gate .ac-picker-title');
    if (acTitle) acTitle.textContent = t('aircraft.title');
    const acSub = document.querySelector('#aircraft-gate .ac-picker-sub');
    if (acSub) acSub.textContent = t('aircraft.sub');
    const acCont = document.getElementById('ac-continue');
    if (acCont) acCont.textContent = t('aircraft.continue');
    const acBack = document.getElementById('ac-back-lang');
    if (acBack) {
      acBack.textContent = '‹';
      acBack.setAttribute('aria-label', t('aircraft.back_lang'));
      acBack.title = t('aircraft.back_lang');
    }
    // Aria
    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.setAttribute('aria-label', t('common.back'));
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
      btnSearch.setAttribute('aria-label', t('common.search'));
      btnSearch.setAttribute('title', t('common.search'));
    }
    const btnAudio = document.getElementById('btn-audio-global');
    if (btnAudio) {
      btnAudio.setAttribute('aria-label', t('common.audio_mode'));
      btnAudio.setAttribute('title', t('common.audio_mode'));
    }
  }

  // Init from storage (silent — callers decide UI)
  loadSaved();
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'en' ? 'en-GB' : lang;
  }

  return {
    STORAGE_KEY, DEFAULT, LANGUAGES,
    getLang, setLang, hasLang, loadSaved, onChange,
    t, hasOwn, enBadge, subjectName, langMeta, ttsLang, ttsPrefs,
    applyStaticChrome
  };
})();

if (typeof globalThis !== 'undefined') globalThis.I18n = I18n;
