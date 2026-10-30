/* Skills modules: Pilot Log, Circuits, Take-off & Landing, Emergencies */
const SkillsUI = (() => {
  const PRACTICAL_DISCLAIMER =
    'Not a substitute for instructor dual / POH / current UK regs. Confirm local procedures with your instructor.';

  function speakBtn(id, label) {
    const fallback = (typeof I18n !== 'undefined') ? I18n.t('common.speak') : 'Speak';
    return `<button type="button" class="btn btn-ghost" data-speak-btn="${id}">🔊 ${label || fallback}</button>`;
  }
  function tt(key, fallback) {
    if (typeof I18n !== 'undefined') return I18n.t(key);
    return fallback || key;
  }
  const CIRCUIT_TITLE_KEYS = {
    joining: 'circuits.joining', lookout: 'circuits.lookout', closure: 'circuits.closure',
    'conflict-final': 'circuits.conflicts', goaround: 'circuits.goaround', 'hard-grass': 'circuits.surface'
  };
  function circuitTitle(s) {
    const key = CIRCUIT_TITLE_KEYS[s.id];
    if (key && typeof I18n !== 'undefined' && I18n.hasOwn(key)) return I18n.t(key);
    return s.title;
  }

  /* ---------- PILOT LOG ---------- */
  function viewLog(ctx) {
    ctx.setNav('computer');
    ctx.titleEl.textContent = tt('log.title', 'Pilot Log');
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const sum = Store.logSummary();
    const entries = Store.logEntries();
    const editing = ctx.logEditId ? Store.logEntries().find(e => e.id === ctx.logEditId) : null;
    return `
      <div class="disclaimer-inline">${PRACTICAL_DISCLAIMER}</div>
      <div class="log-summary">
        <div class="result-tile"><div class="val">${sum.hours}</div><div class="lbl">Total hours</div></div>
        <div class="result-tile"><div class="val">${sum.landings}</div><div class="lbl">Landings</div></div>
        <div class="result-tile"><div class="val">${sum.entries}</div><div class="lbl">Entries</div></div>
      </div>
      <div class="section-label">${editing ? 'Edit entry' : 'Add flight'}</div>
      <form class="card log-form" id="log-form">
        <input type="hidden" id="log-id" value="${editing ? esc(editing.id) : ''}"/>
        <div class="calc-grid">
          <label>Date<input type="date" id="log-date" required value="${editing ? esc(editing.date || '') : ''}"/></label>
          <label>Aircraft<input type="text" id="log-ac" placeholder="e.g. C42 / microlight" value="${editing ? esc(editing.aircraft || '') : esc((typeof AircraftPref !== 'undefined' && AircraftPref.shortLabel()) ? AircraftPref.shortLabel() : 'C42')}"/></label>
          <label>Departure<input type="text" id="log-dep" placeholder="From" required value="${editing ? esc(editing.dep || '') : ''}"/></label>
          <label>Destination<input type="text" id="log-dest" placeholder="To" required value="${editing ? esc(editing.dest || '') : ''}"/></label>
          <label>Dep time<input type="time" id="log-dept" value="${editing ? esc(editing.depTime || '') : ''}"/></label>
          <label>Arr time<input type="time" id="log-arrt" value="${editing ? esc(editing.arrTime || '') : ''}"/></label>
          <label>Total time<input type="text" id="log-total" placeholder="1:30 or 1.5" value="${editing ? esc(editing.totalTime || '') : ''}"/></label>
          <label>Landings day<input type="number" id="log-lday" min="0" value="${editing ? (editing.landDay || 0) : 1}"/></label>
          <label>Landings night<input type="number" id="log-lnight" min="0" value="${editing ? (editing.landNight || 0) : 0}"/></label>
          <label class="span2">Remarks<input type="text" id="log-remarks" placeholder="Dual / PIC / exercises…" value="${editing ? esc(editing.remarks || '') : ''}"/></label>
        </div>
        <div class="btn-row">
          <button type="submit" class="btn btn-primary">${editing ? 'Save changes' : 'Add entry'}</button>
          ${editing ? '<button type="button" class="btn btn-secondary" id="log-cancel">Cancel</button>' : ''}
        </div>
      </form>
      <div class="section-label">Logbook</div>
      ${entries.length ? entries.map(e => `
        <div class="card log-entry">
          <div class="log-entry-head">
            <strong>${esc(e.date)}</strong>
            <span class="meta">${esc(e.totalTime || '—')} · ${esc(e.aircraft || '')}</span>
          </div>
          <div>${esc(e.dep)} → ${esc(e.dest)}</div>
          <div class="meta">${esc(e.depTime || '')}–${esc(e.arrTime || '')} · LDG day ${e.landDay || 0} / night ${e.landNight || 0}</div>
          ${e.remarks ? `<div class="meta">${esc(e.remarks)}</div>` : ''}
          <div class="btn-row" style="margin-top:8px">
            <button type="button" class="btn btn-ghost" data-log-edit="${esc(e.id)}">Edit</button>
            <button type="button" class="btn btn-danger" data-log-del="${esc(e.id)}">Delete</button>
          </div>
        </div>`).join('') : '<p class="meta" style="color:var(--muted)">No entries yet — add your first flight above.</p>'}
      <div class="disclaimer-inline">Personal study log only — not an official CAA logbook substitute.</div>`;
  }

  function bindLog(ctx) {
    const form = document.getElementById('log-form');
    if (form) form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const payload = {
        date: val('log-date'),
        aircraft: val('log-ac') || ((typeof AircraftPref !== 'undefined' && AircraftPref.shortLabel()) || 'C42'),
        dep: val('log-dep'),
        dest: val('log-dest'),
        depTime: val('log-dept'),
        arrTime: val('log-arrt'),
        totalTime: val('log-total') || autoTotal(),
        landDay: parseInt(val('log-lday'), 10) || 0,
        landNight: parseInt(val('log-lnight'), 10) || 0,
        remarks: val('log-remarks')
      };
      const id = val('log-id');
      if (id) Store.updateLogEntry(id, payload);
      else Store.addLogEntry(payload);
      ctx.logEditId = null;
      ctx.go('log');
    });
    const cancel = document.getElementById('log-cancel');
    if (cancel) cancel.addEventListener('click', () => { ctx.logEditId = null; ctx.go('log'); });
    document.querySelectorAll('[data-log-edit]').forEach(btn => btn.addEventListener('click', () => {
      ctx.logEditId = btn.dataset.logEdit;
      ctx.go('log');
    }));
    document.querySelectorAll('[data-log-del]').forEach(btn => btn.addEventListener('click', () => {
      if (confirm('Delete this log entry?')) {
        Store.deleteLogEntry(btn.dataset.logDel);
        ctx.go('log');
      }
    }));
    function val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
    function autoTotal() {
      const a = val('log-dept'), b = val('log-arrt');
      if (!a || !b) return '';
      const [ah, am] = a.split(':').map(Number);
      const [bh, bm] = b.split(':').map(Number);
      let m = (bh * 60 + bm) - (ah * 60 + am);
      if (m < 0) m += 24 * 60;
      return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
    }
  }

  /* ---------- CIRCUITS ---------- */
  function viewCircuits(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = tt('circuits.title', 'Circuits');
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const C = CIRCUITS_DATA;
    const tab = ctx.circuitsTab || 'overview';
    const chips = [
      { id: 'overview', label: 'Overview' },
      { id: 'joining', label: 'Joining' },
      { id: 'lookout', label: 'Lookout' },
      { id: 'closure', label: 'Runway closed' },
      { id: 'conflict-final', label: 'Conflict on final' },
      { id: 'underneath', label: 'Climbs under you' },
      { id: 'goaround', label: 'Go-around' },
      { id: 'hard-grass', label: 'Hard vs grass' }
    ];
    return `
      <div class="disclaimer-inline">${C.disclaimer}</div>
      <div class="chip-row">
        ${chips.map(c => `<button type="button" class="chip ${tab === c.id ? 'active' : ''}" data-circ-tab="${c.id}">${c.label}</button>`).join('')}
      </div>
      ${tab === 'overview' ? circuitsOverview(C) : circuitsSection(C, tab)}
      <div class="callout-gold">Confirm with instructor / AIP / local procedures for your airfield. CAP 413 phraseology varies by ATC / AFIS / A/G.</div>
      <div class="disclaimer-inline">${PRACTICAL_DISCLAIMER}</div>`;
  }

  function circuitsOverview(C) {
    return `
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK aerodrome</div>
        <h1 style="font-size:1.2rem">Standard left-hand circuit</h1>
        ${(typeof AircraftPref !== 'undefined' && AircraftPref.shortLabel()) ? `<p style="color:var(--muted);font-size:0.85rem;margin-top:6px">Generic circuit study · flying a <strong style="color:var(--sky)">${esc(AircraftPref.shortLabel())}</strong> — confirm local procedures / POH.</p>` : ''}
      </div>
      ${Diagrams.circuitFull()}
      <div class="section-label">Narrated circuit video (4 min 13 s)</div>
      <div class="card video-card">
        <video class="lesson-video" controls playsinline preload="none" poster="assets/video/circuit-poster.jpg" aria-label="Narrated walkthrough of a standard UK left-hand circuit">
          <source src="assets/video/circuit-full.mp4" type="video/mp4" />
          Your browser cannot play this video.
        </video>
        <p class="yt-note">Take-off, climb-out, crosswind, downwind, base, final, landing and go-around. Loads only when you tap play (about 20 MB, needs a connection — not saved offline). Study aid only; follow your instructor and local procedures.</p>
      </div>
      <div class="speak-bar">
        ${speakBtn('circuit-all', tt('common.speak_overview', 'Speak overview'))}
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">Stop</button>
      </div>
      <div class="section-label">Legs (plain English)</div>
      <ol class="steps">
        <li><strong>Take-off / climb-out</strong> — runway heading; climb as briefed. Lookout.</li>
        <li><strong>Crosswind</strong> — turn crosswind at briefed height / position (often ~500 ft AAL — confirm local).</li>
        <li><strong>Downwind</strong> — parallel runway, opposite direction. Typical training circuit height ~1000 ft AAL unless briefed otherwise. Checks / radio as taught.</li>
        <li><strong>Base</strong> — turn base; begin descent / configure as briefed.</li>
        <li><strong>Final</strong> — aligned, stable, on speed. Land or go around.</li>
        <li><strong>Go-around</strong> — if unstable, traffic, or doubt: power, climb attitude, reconfigure, rejoin as briefed. A go-around is a success.</li>
      </ol>
      <div class="card">
        <h3>Rules overview</h3>
        <ul style="margin:8px 0 0 1.1em;color:#c9ced8;font-size:0.9rem">
          <li><strong>Height:</strong> typical training ~1000 ft AAL unless briefed / plate says otherwise.</li>
          <li><strong>Radio:</strong> downwind / final calls as required by airfield type (A/G, AFIS, ATC) — CAP 413 style; listen first.</li>
          <li><strong>Spacing:</strong> do not cut inside; extend downwind if needed; lookout constantly.</li>
          <li><strong>Dead-side:</strong> usually opposite the live circuit — used for joins / climb as published. Check AIP / local brief.</li>
          <li><strong>Right-hand circuits:</strong> when published (noise, terrain, airspace) — fly RH as marked; do not assume LH.</li>
        </ul>
      </div>
      <div class="section-label">Study modules (tap chips above)</div>
      ${C.sections.map(s => `
        <div class="card card-tap" data-circ-tab="${esc(s.id)}">
          <div class="subject-card">
            <div class="card-icon">${s.icon}</div>
            <div class="info"><h3>${esc(circuitTitle(s))}</h3><div class="meta">${esc(s.summary)}</div></div>
            <div class="chev">›</div>
          </div>
        </div>`).join('')}
      ${YTEmbed.section(VIDEOS_DATA.circuits, 'Video / How to — circuits')}`;
  }

  function circuitsSection(C, id) {
    const s = C.sections.find(x => x.id === id);
    if (!s) return '<p class="meta">Section not found.</p>';
    return `
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK NPPL · microlight</div>
        <h1 style="font-size:1.15rem">${s.icon} ${esc(circuitTitle(s))}</h1>
        <p style="color:var(--muted);font-size:0.88rem;margin:6px 0 0">${esc(s.summary)}</p>
      </div>
      <div class="speak-bar">
        ${speakBtn('circ-sec-all', tt('common.speak_section', 'Speak section'))}
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">Stop</button>
      </div>
      <div class="section-label">${esc(s.actionsLabel || 'For you as the pilot')}</div>
      ${s.actions.map((a, i) => `
        <div class="card step-card emerg-step">
          <div class="step-num">Action ${i + 1}</div>
          <p style="color:#f1f3f8;font-size:0.95rem;font-weight:500;margin:4px 0 10px;line-height:1.45">${esc(a)}</p>
          ${speakBtn('circ-act-' + i, 'Speak')}
        </div>`).join('')}
      ${(s.notes || []).map(n => `
        <div class="card">
          <h3>${esc(n.title)}</h3>
          <p style="color:#c9ced8;font-size:0.88rem;margin:8px 0 0;line-height:1.45">${esc(n.body)}</p>
        </div>`).join('')}
      <p class="meta" style="margin-top:8px"><button type="button" class="btn btn-ghost" data-circ-tab="overview">← Back to overview</button></p>`;
  }

  function bindCircuits(ctx) {
    document.querySelectorAll('[data-circ-tab]').forEach(el => {
      el.addEventListener('click', () => {
        ctx.circuitsTab = el.dataset.circTab;
        ctx.go('circuits');
      });
    });
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());

    const C = CIRCUITS_DATA;
    const tab = ctx.circuitsTab || 'overview';
    if (tab === 'overview') {
      const b = document.querySelector('[data-speak-btn="circuit-all"]');
      if (b) b.addEventListener('click', () => {
      const spoken = (typeof I18n !== 'undefined' && I18n.hasOwn('circuits.overview_speak'))
        ? I18n.t('circuits.overview_speak') : C.overviewSpeak;
      AudioSpeak.speak(spoken);
    });
      return;
    }
    const s = C.sections.find(x => x.id === tab);
    if (!s) return;
    const all = document.querySelector('[data-speak-btn="circ-sec-all"]');
    if (all) all.addEventListener('click', () => AudioSpeak.speak(s.speakAll));
    s.actions.forEach((a, i) => {
      const btn = document.querySelector(`[data-speak-btn="circ-act-${i}"]`);
      if (btn) btn.addEventListener('click', () => AudioSpeak.speak(a));
    });
  }

  /* ---------- TAKE-OFF & LANDING ---------- */
  function viewLanding(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Take-off & Landing';
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const L = LANDING_DATA;
    const tab = ctx.landingTab || 'controls';
    return `
      <div class="disclaimer-inline">${L.disclaimer}</div>
      <div class="chip-row">
        <button type="button" class="chip ${tab==='controls'?'active':''}" data-land-tab="controls">Controls</button>
        <button type="button" class="chip ${tab==='nil'?'active':''}" data-land-tab="nil">Nil-wind</button>
        <button type="button" class="chip ${tab==='xwind'?'active':''}" data-land-tab="xwind">Crosswind</button>
        <button type="button" class="chip ${tab==='fix'?'active':''}" data-land-tab="fix">Corrections</button>
        <button type="button" class="chip ${tab==='fail'?'active':''}" data-land-tab="fail">Failures</button>
        <button type="button" class="chip ${tab==='video'?'active':''}" data-land-tab="video">Videos</button>
      </div>
      ${tab === 'controls' ? landingControls(L) : ''}
      ${tab === 'nil' ? landingSteps(L.nilWind, Diagrams.nilWindControls()) : ''}
      ${tab === 'xwind' ? landingSteps(L.crosswind, Diagrams.crosswindControls() + Diagrams.frontBank()) : ''}
      ${tab === 'fix' ? landingCorr(L) : ''}
      ${tab === 'fail' ? landingFail(L) : ''}
      ${tab === 'video' ? YTEmbed.section(VIDEOS_DATA.crosswind, 'Crosswind / landing videos') + YTEmbed.section(VIDEOS_DATA.emergencies.slice(0, 2), 'EFATO / forced landing (optional)') : ''}
      <div class="disclaimer-inline">${L.disclaimer}</div>`;
  }

  function landingControls(L) {
    const c = L.controls;
    return `
      <p style="color:var(--muted);font-size:0.85rem;margin-bottom:10px">Learn what each control does in the flare and crosswind — then practise with your instructor.</p>
      ${ctrlCard('aileron', c.aileron)}
      ${ctrlCard('rudder', c.rudder)}
      ${ctrlCard('coordinated', c.coordinated)}
      ${ctrlCard('speed', c.speed)}
      ${Diagrams.crosswindControls()}`;
  }

  function ctrlCard(id, block) {
    return `<div class="card step-card">
      <h3>${esc(block.title)}</h3>
      <ul style="margin:8px 0 10px 1.1em;color:#c9ced8;font-size:0.9rem">
        ${block.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
      </ul>
      ${speakBtn('ctrl-' + id, 'Speak')}
    </div>`;
  }

  function landingSteps(block, diagramHtml) {
    return `
      <div class="speak-bar">
        ${speakBtn('land-all', 'Speak all')}
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">Stop</button>
      </div>
      ${diagramHtml || ''}
      ${block.steps.map((s, i) => `
        <div class="card step-card">
          <div class="step-num">Step ${i + 1}</div>
          <h3>${esc(s.title)}</h3>
          <p style="color:#c9ced8;font-size:0.92rem;margin:6px 0 10px">${esc(s.body)}</p>
          ${speakBtn('land-step-' + i, 'Speak step')}
        </div>`).join('')}`;
  }

  function landingCorr(L) {
    return `
      <div class="section-label">In-flight corrections</div>
      ${L.corrections.map(c => `
        <div class="card step-card">
          <h3>${esc(c.title)}</h3>
          <p style="color:#c9ced8;font-size:0.92rem;margin:6px 0 10px">${esc(c.fix)}</p>
          ${speakBtn('corr-' + c.id, 'Speak')}
        </div>`).join('')}`;
  }

  function landingFail(L) {
    return `
      <div class="section-label">Landing failures / aborts</div>
      ${L.failures.map(f => `
        <div class="card step-card">
          <h3>${esc(f.title)}</h3>
          <p style="color:#c9ced8;font-size:0.92rem;margin:6px 0 10px">${esc(f.body)}</p>
          ${speakBtn('fail-' + f.id, 'Speak')}
        </div>`).join('')}
      <div class="section-label">Take-off failures</div>
      ${L.takeoffFailures.map(f => `
        <div class="card step-card">
          <h3>${esc(f.title)}</h3>
          <p style="color:#c9ced8;font-size:0.92rem;margin:6px 0 10px">${esc(f.body)}</p>
          ${speakBtn('tof-' + f.id, 'Speak')}
        </div>`).join('')}
      <div class="card card-tap" data-go="emergencies"><h3>Full Emergencies module →</h3><div class="meta">EFATO, forced landing, fire, lost…</div></div>`;
  }

  function bindLanding(ctx) {
    document.querySelectorAll('[data-land-tab]').forEach(btn => btn.addEventListener('click', () => {
      ctx.landingTab = btn.dataset.landTab;
      ctx.go('landing');
    }));
    document.querySelectorAll('[data-go="emergencies"]').forEach(el => el.addEventListener('click', () => ctx.go('emergencies')));
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());

    const L = LANDING_DATA;
    const map = {};
    Object.keys(L.controls).forEach(k => { map['ctrl-' + k] = L.controls[k].speak; });
    const tab = ctx.landingTab || 'controls';
    if (tab === 'nil') {
      map['land-all'] = L.nilWind.speakAll;
      L.nilWind.steps.forEach((s, i) => { map['land-step-' + i] = s.speak; });
    }
    if (tab === 'xwind') {
      map['land-all'] = L.crosswind.speakAll;
      L.crosswind.steps.forEach((s, i) => { map['land-step-' + i] = s.speak; });
    }
    L.corrections.forEach(c => { map['corr-' + c.id] = c.speak; });
    L.failures.forEach(f => { map['fail-' + f.id] = f.speak; });
    L.takeoffFailures.forEach(f => { map['tof-' + f.id] = f.speak; });

    document.querySelectorAll('[data-speak-btn]').forEach(btn => {
      const key = btn.dataset.speakBtn;
      if (map[key]) btn.addEventListener('click', () => AudioSpeak.speak(map[key]));
    });
  }

  /* ---------- EMERGENCIES ---------- */
  function viewEmergencies(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Emergencies';
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    return `
      <div class="disclaimer-inline">POH / instructor / aircraft-specific drills override these study checklists. ${PRACTICAL_DISCLAIMER}</div>
      <p style="color:var(--muted);font-size:0.85rem;margin-bottom:12px">UK training mnemonic style · plain English · Speak each drill${(typeof AircraftPref !== 'undefined' && AircraftPref.shortLabel()) ? ` · geared for study in a <strong style="color:var(--sky)">${esc(AircraftPref.shortLabel())}</strong> (confirm POH)` : ''}</p>
      ${EMERGENCIES_DATA.map(e => `
        <div class="card card-tap" data-emerg="${esc(e.id)}">
          <div class="subject-card">
            <div class="card-icon">${e.icon}</div>
            <div class="info"><h3>${esc(e.title)}</h3><div class="meta">${esc(e.summary)}</div></div>
            <div class="chev">›</div>
          </div>
        </div>`).join('')}
      ${YTEmbed.section(VIDEOS_DATA.emergencies, 'Supporting videos')}
      <div class="disclaimer-inline">POH / instructor / aircraft-specific drills override. Not a substitute for dual training.</div>`;
  }

  function viewEmergency(ctx, id) {
    const e = EMERGENCIES_DATA.find(x => x.id === id);
    if (!e) return '<p>Not found</p>';
    ctx.setNav('theory');
    ctx.titleEl.textContent = e.title;
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    return `
      <div class="disclaimer-inline">POH / instructor / aircraft-specific drills override these steps.</div>
      ${Diagrams.emergencyIcon(e.id)}
      <div class="speak-bar">
        ${speakBtn('em-all', 'Speak all')}
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">Stop</button>
      </div>
      <p style="color:#c9ced8;font-size:0.92rem;margin-bottom:12px">${esc(e.summary)}</p>
      ${e.steps.map((s, i) => `
        <div class="card step-card emerg-step">
          <div class="step-num">${i + 1}</div>
          <p style="color:#f1f3f8;font-size:1.02rem;font-weight:600;margin:4px 0 10px">${esc(s)}</p>
          ${speakBtn('em-step-' + i, 'Speak step')}
        </div>`).join('')}
      <div class="disclaimer-inline">${PRACTICAL_DISCLAIMER}</div>`;
  }

  function bindEmergencies(ctx) {
    document.querySelectorAll('[data-emerg]').forEach(el => el.addEventListener('click', () => {
      ctx.go('emergency', { id: el.dataset.emerg });
    }));
  }

  function bindEmergency(ctx) {
    const e = EMERGENCIES_DATA.find(x => x.id === ctx.route.id);
    if (!e) return;
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());
    const all = document.querySelector('[data-speak-btn="em-all"]');
    if (all) all.addEventListener('click', () => {
      AudioSpeak.speak(e.speakIntro + ' ' + e.steps.map((s, i) => `Step ${i + 1}. ${s}`).join(' '));
    });
    e.steps.forEach((s, i) => {
      const b = document.querySelector(`[data-speak-btn="em-step-${i}"]`);
      if (b) b.addEventListener('click', () => AudioSpeak.speak(`Step ${i + 1}. ${s}`));
    });
  }

  /* computer video subsection HTML */
  function computerVideoBlock() {
    return `
      <div class="section-label">Video / How to use</div>
      ${Diagrams.whizzWalkthrough()}
      <ol class="steps">
        <li><strong>Speed / time / distance</strong> — set groundspeed against the rate index (often 60); read time opposite distance on the outer scale.</li>
        <li><strong>Fuel</strong> — treat burn rate like a “speed”; read fuel required opposite time.</li>
        <li><strong>Wind</strong> — mark wind on the sliding grid, set track/TAS, read drift and groundspeed. Practise on a real CRP-1.</li>
      </ol>
      ${YTEmbed.section(VIDEOS_DATA.crp1, 'Curated CRP-1 / flight computer videos')}
      <p class="yt-note">Third-party videos; confirm technique with your instructor. CRP-1 is the UK circular computer (same ideas as an E6B).</p>`;
  }

  return {
    viewLog, bindLog,
    viewCircuits, bindCircuits,
    viewLanding, bindLanding,
    viewEmergencies, bindEmergencies,
    viewEmergency, bindEmergency,
    computerVideoBlock,
    PRACTICAL_DISCLAIMER
  };
})();
