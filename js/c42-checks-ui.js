/* C42 Pre-Flight Checks UI — accordion sections, tick-off rows, mnemonic letters,
   per-section reset, ticks saved locally (key unchanged: full-nppl-c42-ticks). */
const C42UI = (() => {
  const TICK_KEY = 'full-nppl-c42-ticks';
  let openId = 'external';
  let scrollToOpen = false;
  let ticks = {}; // itemId -> true

  function loadTicks() {
    try {
      const raw = localStorage.getItem(TICK_KEY);
      ticks = raw ? JSON.parse(raw) : {};
    } catch { ticks = {}; }
  }
  function saveTicks() {
    try { localStorage.setItem(TICK_KEY, JSON.stringify(ticks)); } catch (_) {}
  }

  const MODE_TITLE_KEYS = {
    external: 'c42.external', internal: 'c42.internal', start: 'c42.start',
    depart: 'c42.depart', freda: 'c42.freda', landing: 'c42.landing', shutdown: 'c42.shutdown'
  };
  const _t = (k, f) => {
    if (typeof I18n === 'undefined') return f;
    const v = I18n.t(k);
    return (v && v !== k) ? v : f;
  };
  function modeTitle(m) {
    const key = MODE_TITLE_KEYS[m.id];
    const raw = key ? _t(key, m.title) : m.title;
    return String(raw).split('\u2014')[0].trim() || m.title;
  }
  const modes = () => C42_CHECKS.modes;
  const prog = (m) => ({ done: m.items.filter(i => ticks[i.id]).length, total: m.items.length });
  const allItems = () => modes().reduce((a, m) => a.concat(m.items), []);

  const TICK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>';
  const CHEV_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const SPK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  const RST_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/></svg>';

  loadTicks();

  function sectionHead(m, idx) {
    const p = prog(m);
    const done = p.done === p.total;
    const badge = m.mnemonic
      ? `<span class="ck-mn" aria-label="${esc(m.mnemonic)}">${m.mnemonic.split('').map(l => `<i>${esc(l)}</i>`).join('')}</span>`
      : `<span class="ck-sub">${esc(m.sub || '')}</span>`;
    return `
      <button type="button" class="ck-head" data-ck-toggle="${m.id}" aria-expanded="${openId === m.id}" aria-controls="ck-body-${m.id}">
        <span class="ck-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="ck-ht">
          <b>${esc(modeTitle(m))}</b>
          ${badge}
        </span>
        <span class="ck-count ${done ? 'is-done' : ''}" data-ck-count="${m.id}">${done ? TICK_SVG : ''}<span>${p.done}/${p.total}</span></span>
        <span class="ck-chev">${CHEV_SVG}</span>
      </button>
      <div class="ck-bar"><i data-ck-bar="${m.id}" style="width:${p.total ? (p.done / p.total * 100) : 0}%"></i></div>`;
  }

  function row(m, it, i) {
    const on = !!ticks[it.id];
    const mark = it.letter
      ? `<span class="ck-letter">${esc(it.letter)}</span>`
      : `<span class="ck-idx">${i + 1}</span>`;
    return `
      <button type="button" class="ck-row ${on ? 'on' : ''}" data-ck-tick="${esc(it.id)}" role="checkbox" aria-checked="${on}">
        ${mark}
        <span class="ck-rt">
          <b>${esc(it.label)}</b>
          ${it.detail ? `<span>${esc(it.detail)}</span>` : ''}
        </span>
        <span class="ck-box">${TICK_SVG}</span>
      </button>`;
  }

  function section(m, idx) {
    const open = openId === m.id;
    return `
      <section class="ck-sec ${open ? 'open' : ''} ${m.mnemonic ? 'has-mn' : ''}" id="ck-sec-${m.id}" data-ck-sec="${m.id}">
        ${sectionHead(m, idx)}
        <div class="ck-body" id="ck-body-${m.id}" ${open ? '' : 'hidden'}>
          ${m.items.map((it, i) => row(m, it, i)).join('')}
          <div class="ck-actions">
            <button type="button" class="ck-act" data-ck-speak="${m.id}">${SPK_SVG}<span>${esc(_t('common.speak_all', 'Speak all'))}</span></button>
            <button type="button" class="ck-act ck-reset" data-ck-reset="${m.id}">${RST_SVG}<span>Reset section</span></button>
          </div>
        </div>
      </section>`;
  }

  function view(ctx) {
    ctx.setNav('skills');
    const prefC42 = (typeof AircraftPref === 'undefined') || AircraftPref.isC42();
    ctx.titleEl.textContent = prefC42 ? _t('c42.title', 'C42 Checks') : _t('aircraft.checks', 'Aircraft checks');
    ctx.btnBack.hidden = false;
    const otherAc = (typeof AircraftPref !== 'undefined' && !AircraftPref.isC42()) ? AircraftPref.resolve() : null;
    const otherBanner = otherAc ? `
      <div class="c42-other-banner card">
        <strong>${esc(_t('aircraft.c42_specific', 'C42-specific — confirm your POH'))}</strong>
        <p style="font-size:0.88rem;color:#c9ced8;margin:8px 0 10px">${esc(typeof I18n !== 'undefined' ? I18n.t('aircraft.c42_other_note', { name: otherAc.name }) : ('You selected ' + otherAc.name + '. This tick-list is C42-specific — confirm your POH.'))}</p>
        <button type="button" class="btn btn-secondary" id="c42-open-yours">${esc(_t('aircraft.open_microlights', 'Open Microlights for your type'))}</button>
      </div>` : '';
    const all = allItems();
    const done = all.filter(i => ticks[i.id]).length;
    return `
      <div class="ck-hero">
        <div class="gold-rule" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 16.8l-5.8 3.5 1.6-6.6L2.6 9.3l6.8-.5z"/></svg></div>
        <div class="ck-kicker">C42 · Microlight</div>
        <h2>Pre-Flight Checks</h2>
        <div class="ck-overall"><span id="ck-total">${done} of ${all.length} ticked</span>
          <button type="button" class="ck-link" id="ck-reset-all">Reset all</button></div>
        <p class="ck-note">${esc(C42_CHECKS.attribution)}</p>
      </div>
      ${otherBanner}
      <div class="ck-list">${modes().map(section).join('')}</div>
      <div class="disclaimer-inline">${esc(C42_CHECKS.disclaimer)}</div>`;
  }

  function refreshCounts(id) {
    const m = modes().find(x => x.id === id);
    if (!m) return;
    const p = prog(m);
    const c = document.querySelector(`[data-ck-count="${id}"]`);
    if (c) {
      const full = p.done === p.total;
      c.classList.toggle('is-done', full);
      c.innerHTML = (full ? TICK_SVG : '') + `<span>${p.done}/${p.total}</span>`;
    }
    const b = document.querySelector(`[data-ck-bar="${id}"]`);
    if (b) b.style.width = (p.total ? p.done / p.total * 100 : 0) + '%';
    const all = allItems();
    const t = document.getElementById('ck-total');
    if (t) t.textContent = `${all.filter(i => ticks[i.id]).length} of ${all.length} ticked`;
  }

  function bind(ctx) {
    const openYours = document.getElementById('c42-open-yours');
    if (openYours) openYours.addEventListener('click', () => {
      const id = (typeof AircraftPref !== 'undefined') ? AircraftPref.aircraftId() : null;
      if (id) ctx.go('microlight', { id }); else ctx.go('microlights');
    });

    document.querySelectorAll('[data-ck-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.ckToggle;
        const wasOpen = openId === id;
        document.querySelectorAll('.ck-sec').forEach(sec => {
          sec.classList.remove('open');
          sec.querySelector('.ck-body').hidden = true;
          sec.querySelector('.ck-head').setAttribute('aria-expanded', 'false');
        });
        openId = wasOpen ? null : id;
        if (!wasOpen) {
          const sec = document.getElementById('ck-sec-' + id);
          sec.classList.add('open');
          sec.querySelector('.ck-body').hidden = false;
          btn.setAttribute('aria-expanded', 'true');
          const r = sec.getBoundingClientRect();
          if (r.top < 60) sec.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('[data-ck-tick]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.ckTick;
        const on = !ticks[id];
        if (on) ticks[id] = true; else delete ticks[id];
        saveTicks();
        btn.classList.toggle('on', on);
        btn.setAttribute('aria-checked', String(on));
        refreshCounts(btn.closest('[data-ck-sec]').dataset.ckSec);
      });
    });

    document.querySelectorAll('[data-ck-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = modes().find(x => x.id === btn.dataset.ckSpeak);
        if (!m || typeof AudioSpeak === 'undefined') return;
        const body = m.items.map(it => it.speak || `${it.label}. ${it.detail}`).join(' ');
        AudioSpeak.speak(`${m.speakIntro} ${body}`);
      });
    });

    // Two-tap reset (no blocking dialogs)
    function armReset(btn, label, fn) {
      btn.addEventListener('click', () => {
        if (btn.dataset.armed === '1') {
          clearTimeout(btn._t); btn.dataset.armed = '';
          fn(); return;
        }
        btn.dataset.armed = '1';
        const span = btn.querySelector('span') || btn;
        const orig = span.textContent;
        span.textContent = 'Tap again to reset';
        btn.classList.add('armed');
        btn._t = setTimeout(() => { btn.dataset.armed = ''; span.textContent = orig; btn.classList.remove('armed'); }, 3000);
      });
    }
    document.querySelectorAll('[data-ck-reset]').forEach(btn => {
      armReset(btn, 'Reset section', () => {
        const m = modes().find(x => x.id === btn.dataset.ckReset);
        if (!m) return;
        m.items.forEach(it => { delete ticks[it.id]; });
        saveTicks();
        openId = m.id;
        ctx.go('c42');
      });
    });
    const resetAll = document.getElementById('ck-reset-all');
    if (resetAll) armReset(resetAll, 'Reset all', () => { ticks = {}; saveTicks(); ctx.go('c42'); });

    if (scrollToOpen && openId) {
      scrollToOpen = false;
      const sec = document.getElementById('ck-sec-' + openId);
      if (sec) setTimeout(() => sec.scrollIntoView({ block: 'start' }), 30);
    }
  }

  function setMode(id) {
    if (modes().some(m => m.id === id)) { openId = id; scrollToOpen = true; }
  }

  return { view, bind, setMode };
})();
