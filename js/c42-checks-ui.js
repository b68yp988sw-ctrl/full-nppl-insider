/* C42 Pre-Flight Checks UI — tick lists, step-through, Speak, SVG highlights */
const C42UI = (() => {
  let modeId = 'external';
  let stepIndex = 0;
  let ticks = {}; // itemId -> true

  function loadTicks() {
    try {
      const raw = localStorage.getItem('full-nppl-c42-ticks');
      ticks = raw ? JSON.parse(raw) : {};
    } catch { ticks = {}; }
  }
  function saveTicks() {
    localStorage.setItem('full-nppl-c42-ticks', JSON.stringify(ticks));
  }

  const MODE_TITLE_KEYS = {
    external: 'c42.external', internal: 'c42.internal', start: 'c42.start',
    depart: 'c42.depart', freda: 'c42.freda', freqs: 'c42.freqs',
    landing: 'c42.landing', shutdown: 'c42.shutdown'
  };

  function localizeItem(it) {
    if (it.id !== 'dep-p' || typeof I18n === 'undefined') return it;
    // Overlay into-wind power check translations when available
    const out = { ...it };
    if (I18n.hasOwn('c42.power_into_wind_label')) out.label = I18n.t('c42.power_into_wind_label');
    if (I18n.hasOwn('c42.power_into_wind_detail')) out.detail = I18n.t('c42.power_into_wind_detail');
    if (I18n.hasOwn('c42.power_into_wind_speak')) out.speak = I18n.t('c42.power_into_wind_speak');
    return out;
  }

  function localizeMode(m) {
    if (!m) return m;
    const titleKey = MODE_TITLE_KEYS[m.id];
    const title = (typeof I18n !== 'undefined' && titleKey) ? I18n.t(titleKey) : m.title;
    return { ...m, title, items: m.items.map(localizeItem) };
  }

  loadTicks();

  function mode() {
    return C42_CHECKS.modes.find(m => m.id === modeId) || C42_CHECKS.modes[0];
  }

  function modeProgress(m) {
    const done = m.items.filter(i => ticks[i.id]).length;
    return { done, total: m.items.length };
  }

  function diagramFor(m, hotspot) {
    if (m.phase === 'outside') return Diagrams.c42Walkround(hotspot);
    if (m.phase === 'ref') return '';
    return Diagrams.c42Panel(hotspot);
  }

  function view(ctx) {
    ctx.setNav('theory');
    const _t = (k, f) => (typeof I18n !== 'undefined' ? I18n.t(k) : f);
    const prefC42 = (typeof AircraftPref === 'undefined') || AircraftPref.isC42();
    ctx.titleEl.textContent = prefC42
      ? _t('c42.title', 'C42 Checks')
      : _t('aircraft.checks', 'Aircraft checks');
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const m = localizeMode(mode());
    const item = m.items[Math.min(stepIndex, m.items.length - 1)];
    const prog = modeProgress(m);
    const allModes = C42_CHECKS.modes.map(localizeMode);

    const otherAc = (typeof AircraftPref !== 'undefined' && !AircraftPref.isC42()) ? AircraftPref.resolve() : null;
    const otherBanner = otherAc ? `
      <div class="c42-other-banner card">
        <strong>${esc(typeof I18n !== 'undefined' ? I18n.t('aircraft.c42_specific') : 'C42-specific — confirm your POH')}</strong>
        <p style="font-size:0.88rem;color:#c9d6e8;margin:8px 0 10px">${esc(typeof I18n !== 'undefined' ? I18n.t('aircraft.c42_other_note', { name: otherAc.name }) : ('You selected ' + otherAc.name + '. This tick-list is C42-specific — confirm your POH.'))}</p>
        <button type="button" class="btn btn-secondary" id="c42-open-yours">${esc(typeof I18n !== 'undefined' ? I18n.t('aircraft.open_microlights') : 'Open Microlights for your type')}</button>
      </div>` : '';
    const titleLine = otherAc
      ? ((typeof I18n !== 'undefined' ? I18n.t('aircraft.checks_other') : 'Pre-flight checks') + ' · C42 study pattern')
      : 'C42 PRE-FLIGHT CHECKS';
    return `
      <div class="disclaimer-inline">${esc(C42_CHECKS.disclaimer)}</div>
      ${otherBanner}
      <div class="card" style="margin-bottom:10px">
        <div class="meta" style="color:var(--sky);font-weight:700">${esc(titleLine)}</div>
        <div class="meta">Microlight · study checklist</div>
        <p style="font-size:0.78rem;color:var(--muted);margin-top:6px">${esc(C42_CHECKS.attribution)}</p>
      </div>

      <div class="chip-row c42-modes">
        ${allModes.map(x => {
          const p = modeProgress(x);
          return `<button type="button" class="chip ${x.id === modeId ? 'active' : ''}" data-c42-mode="${x.id}">${esc(x.title.split('—')[0].trim())} <span class="chip-count">${p.done}/${p.total}</span></button>`;
        }).join('')}
      </div>

      <div class="section-label">${esc(m.title)} · ${prog.done}/${prog.total}</div>
      <div class="bar" style="margin-bottom:12px"><i style="width:${prog.total ? (prog.done/prog.total*100) : 0}%"></i></div>

      ${diagramFor(m, item && item.hotspot)}

      <div class="speak-bar">
        <button type="button" class="btn btn-primary" id="c42-speak-step">🔊 ${_t('common.speak_step', 'Speak step')}</button>
        <button type="button" class="btn btn-ghost" id="c42-speak-all">${_t('common.speak_all', 'Speak all')}</button>
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">${_t('common.stop', 'Stop')}</button>
      </div>

      <div class="card step-card c42-current">
        <div class="step-num">Step ${stepIndex + 1} of ${m.items.length}</div>
        <h3>${esc(item.label)}</h3>
        <p style="color:#c9d6e8;font-size:0.95rem;margin:8px 0 12px">${esc(item.detail)}</p>
        <label class="check-row" style="margin:0">
          <input type="checkbox" id="c42-tick-current" ${ticks[item.id] ? 'checked' : ''}/>
          <span>Done</span>
        </label>
        <div class="btn-row" style="margin-top:12px">
          <button type="button" class="btn btn-secondary" id="c42-prev" ${stepIndex === 0 ? 'disabled' : ''}>Prev</button>
          <button type="button" class="btn btn-primary" id="c42-next">${stepIndex >= m.items.length - 1 ? 'Done' : 'Next'}</button>
        </div>
      </div>

      <div class="section-label">Full checklist (tick off)</div>
      ${m.items.map((it, i) => `
        <label class="card c42-item ${ticks[it.id] ? 'ticked' : ''} ${i === stepIndex ? 'is-current' : ''}" data-c42-jump="${i}">
          <input type="checkbox" data-c42-tick="${esc(it.id)}" ${ticks[it.id] ? 'checked' : ''}/>
          <div class="c42-item-body">
            <strong>${esc(it.label)}</strong>
            <div class="meta">${esc(it.detail)}</div>
          </div>
          <button type="button" class="btn btn-ghost c42-mini-speak" data-c42-speak-item="${i}" title="Speak">🔊</button>
        </label>`).join('')}

      <div class="btn-row">
        <button type="button" class="btn btn-danger" id="c42-reset-mode">Reset this page</button>
        <button type="button" class="btn btn-ghost" id="c42-reset-all">Reset all ticks</button>
      </div>

      <div class="section-label">Reference photos</div>
      <p class="yt-note">Reference photos of your laminated checklist sheets (for study only).</p>
      ${C42_CHECKS.sheets.map(s => `
        <figure class="c42-sheet">
          <img src="${esc(s.src)}" alt="${esc(s.label)}" loading="lazy"/>
          <figcaption>${esc(s.label)}</figcaption>
        </figure>`).join('')}

      <div class="disclaimer-inline">${esc(C42_CHECKS.attribution)} ${esc(C42_CHECKS.disclaimer)}</div>`;
  }

  function bind(ctx) {
    const openYours = document.getElementById('c42-open-yours');
    if (openYours) openYours.addEventListener('click', () => {
      const id = (typeof AircraftPref !== 'undefined') ? AircraftPref.aircraftId() : null;
      if (id) ctx.go('microlight', { id });
      else ctx.go('microlights');
    });
    document.querySelectorAll('[data-c42-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        modeId = btn.dataset.c42Mode;
        stepIndex = 0;
        ctx.go('c42');
      });
    });

    const m = localizeMode(mode());
    const item = m.items[stepIndex];

    const tickCur = document.getElementById('c42-tick-current');
    if (tickCur) tickCur.addEventListener('change', () => {
      ticks[item.id] = tickCur.checked;
      saveTicks();
      ctx.go('c42');
    });

    document.querySelectorAll('[data-c42-tick]').forEach(cb => {
      cb.addEventListener('click', (e) => e.stopPropagation());
      cb.addEventListener('change', () => {
        ticks[cb.dataset.c42Tick] = cb.checked;
        saveTicks();
        ctx.go('c42');
      });
    });

    document.querySelectorAll('[data-c42-jump]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-c42-tick]') || e.target.closest('[data-c42-speak-item]')) return;
        stepIndex = parseInt(el.dataset.c42Jump, 10) || 0;
        ctx.go('c42');
      });
    });

    const prev = document.getElementById('c42-prev');
    if (prev) prev.addEventListener('click', () => {
      if (stepIndex > 0) { stepIndex--; ctx.go('c42'); }
    });
    const next = document.getElementById('c42-next');
    if (next) next.addEventListener('click', () => {
      ticks[item.id] = true;
      saveTicks();
      if (stepIndex < m.items.length - 1) {
        stepIndex++;
        ctx.go('c42');
      } else {
        ctx.go('c42');
      }
    });

    function itemSpeakText(it) {
      if (it.speak) return it.speak;
      return `${it.label}. ${it.detail}`;
    }
    const speakStep = document.getElementById('c42-speak-step');
    if (speakStep) speakStep.addEventListener('click', () => {
      AudioSpeak.speak(itemSpeakText(item));
    });
    const speakAll = document.getElementById('c42-speak-all');
    if (speakAll) speakAll.addEventListener('click', () => {
      const body = m.items.map((it, i) => `Step ${i + 1}. ${itemSpeakText(it)}`).join(' ');
      AudioSpeak.speak(`${m.speakIntro} ${body}`);
    });
    document.querySelectorAll('[data-c42-speak-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const it = m.items[parseInt(btn.dataset.c42SpeakItem, 10)];
        if (it) AudioSpeak.speak(itemSpeakText(it));
      });
    });
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());

    const resetMode = document.getElementById('c42-reset-mode');
    if (resetMode) resetMode.addEventListener('click', () => {
      if (!confirm('Reset ticks for this checklist page?')) return;
      m.items.forEach(it => { delete ticks[it.id]; });
      saveTicks();
      stepIndex = 0;
      ctx.go('c42');
    });
    const resetAll = document.getElementById('c42-reset-all');
    if (resetAll) resetAll.addEventListener('click', () => {
      if (!confirm('Reset ALL C42 checklist ticks?')) return;
      ticks = {};
      saveTicks();
      stepIndex = 0;
      ctx.go('c42');
    });
  }

  function setMode(id) {
    if (C42_CHECKS.modes.some(m => m.id === id)) {
      modeId = id;
      stepIndex = 0;
    }
  }

  return { view, bind, setMode };
})();
