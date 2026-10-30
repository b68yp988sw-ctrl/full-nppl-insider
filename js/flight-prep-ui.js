/* Flight preparation hub — aircraft checks + destination aerodrome brief */
const FlightPrepUI = (() => {
  const KEY = 'full-nppl-flight-prep-v1';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { aircraftTicks: {}, destFields: {}, destTicks: {} };
      const d = JSON.parse(raw);
      return {
        aircraftTicks: d.aircraftTicks || {},
        destFields: d.destFields || {},
        destTicks: d.destTicks || {}
      };
    } catch {
      return { aircraftTicks: {}, destFields: {}, destTicks: {} };
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function aircraftProgress(st) {
    const stages = FLIGHT_PREP.aircraftStages;
    const done = stages.filter(s => st.aircraftTicks[s.id]).length;
    return { done, total: stages.length, pct: stages.length ? Math.round((done / stages.length) * 100) : 0 };
  }

  function destProgress(st) {
    const ticks = FLIGHT_PREP.destTicks;
    const done = ticks.filter(t => st.destTicks[t.id]).length;
    return { done, total: ticks.length, pct: ticks.length ? Math.round((done / ticks.length) * 100) : 0 };
  }

  function view(ctx) {
    ctx.setNav('home');
    ctx.titleEl.textContent = (typeof I18n !== 'undefined' ? I18n.t('fp.title') : 'Flight preparation');
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const st = load();
    const ap = aircraftProgress(st);
    const dp = destProgress(st);

    return `
      <div class="disclaimer-inline">${esc(FLIGHT_PREP.disclaimer)}</div>
      <div class="chip-row">
        <button type="button" class="chip" data-go="airfields">Airfield cards</button>
        <button type="button" class="chip" data-go="trip">Plan a trip</button>
        <button type="button" class="chip" data-go="c42">C42 Checks</button>
      </div>
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">Before you fly</div>
        <h1 style="font-size:1.2rem">Flight preparation</h1>
        <p class="meta">Aircraft stages + destination brief · saved on this device</p>
      </div>

      <section class="fp-block">
        <div class="fp-block-head">
          <div>
            <div class="fp-block-kicker">A · Aircraft</div>
            <h2 class="fp-block-title">Pre-flight stages</h2>
            <p class="fp-block-sub">Tick overview · open C42 Checks for full list + Speak</p>
          </div>
          <div class="fp-pct">${ap.pct}%</div>
        </div>
        <div class="bar" style="margin-bottom:10px"><i style="width:${ap.pct}%"></i></div>
        <div class="fp-link-row">
          <button type="button" class="btn btn-secondary" data-go="c42">Open C42 Checks</button>
          <button type="button" class="btn btn-ghost" data-go="microlights">MTOW / fuel calc</button>
        </div>
        ${FLIGHT_PREP.aircraftStages.map(s => {
          const ticked = !!st.aircraftTicks[s.id];
          return `
            <div class="fp-stage ${ticked ? 'ticked' : ''}">
              <label class="fp-stage-check">
                <input type="checkbox" data-fp-ac="${esc(s.id)}" ${ticked ? 'checked' : ''} />
              </label>
              <div class="fp-stage-body">
                <strong>${esc(s.title)}</strong>
                <div class="meta">${esc(s.blurb)}</div>
                <div class="fp-stage-actions">
                  <button type="button" class="btn btn-ghost" data-fp-c42="${esc(s.c42Mode || '')}">C42 ›</button>
                  <button type="button" class="btn btn-ghost" data-fp-speak-ac="${esc(s.id)}">🔊</button>
                </div>
              </div>
            </div>`;
        }).join('')}
      </section>

      <section class="fp-block">
        <div class="fp-block-head">
          <div>
            <div class="fp-block-kicker">B · Destination</div>
            <h2 class="fp-block-title">Aerodrome brief</h2>
            <p class="fp-block-sub">PPR · freqs · runway · weather/NOTAMs · docs</p>
          </div>
          <div class="fp-pct">${dp.pct}%</div>
        </div>
        <div class="bar" style="margin-bottom:10px"><i style="width:${dp.pct}%"></i></div>
        <div class="fp-link-row">
          <button type="button" class="btn btn-secondary" data-go="trip">Plan a trip</button>
          <button type="button" class="btn btn-ghost" data-go="airfields">Airfield cards</button>
        </div>
        <div class="card fp-dest-card">
          <div class="fp-dest-grid">
            ${FLIGHT_PREP.destFields.map(f => `
              <label class="fp-field">
                <span>${esc(f.label)}</span>
                <input type="${esc(f.type || 'text')}" data-fp-field="${esc(f.id)}"
                  placeholder="${esc(f.placeholder || '')}"
                  value="${esc(st.destFields[f.id] || '')}" autocomplete="off" />
              </label>`).join('')}
          </div>
        </div>
        <div class="section-label">Destination ticks (${dp.done}/${dp.total})</div>
        ${FLIGHT_PREP.destTicks.map(t => `
          <label class="check-row card" style="margin-bottom:8px">
            <input type="checkbox" data-fp-dest="${esc(t.id)}" ${st.destTicks[t.id] ? 'checked' : ''} />
            <span>${esc(t.label)}</span>
          </label>`).join('')}
        <button type="button" class="btn btn-secondary" id="fp-speak-dest" style="width:100%;margin-top:8px">🔊 Speak destination notes</button>
      </section>

      <div class="disclaimer-inline">${esc(FLIGHT_PREP.disclaimer)}</div>`;
  }

  function bind(ctx) {
    document.querySelectorAll('#main [data-go]').forEach(el => {
      el.addEventListener('click', () => ctx.go(el.dataset.go));
    });

    document.querySelectorAll('[data-fp-ac]').forEach(cb => {
      cb.addEventListener('change', () => {
        const st = load();
        st.aircraftTicks[cb.dataset.fpAc] = cb.checked;
        save(st);
        ctx.go('flight-prep');
      });
    });

    document.querySelectorAll('[data-fp-dest]').forEach(cb => {
      cb.addEventListener('change', () => {
        const st = load();
        st.destTicks[cb.dataset.fpDest] = cb.checked;
        save(st);
        ctx.go('flight-prep');
      });
    });

    document.querySelectorAll('[data-fp-field]').forEach(inp => {
      const saveField = () => {
        const st = load();
        st.destFields[inp.dataset.fpField] = inp.value;
        save(st);
      };
      inp.addEventListener('change', saveField);
      inp.addEventListener('blur', saveField);
    });

    document.querySelectorAll('[data-fp-c42]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.fpC42 && typeof C42UI !== 'undefined') C42UI.setMode(btn.dataset.fpC42);
        ctx.go('c42');
      });
    });

    document.querySelectorAll('[data-fp-speak-ac]').forEach(btn => {
      btn.addEventListener('click', () => {
        const stage = FLIGHT_PREP.aircraftStages.find(s => s.id === btn.dataset.fpSpeakAc);
        if (stage && typeof AudioSpeak !== 'undefined') AudioSpeak.speak(stage.speak || stage.title);
      });
    });

    const speakDest = document.getElementById('fp-speak-dest');
    if (speakDest) {
      speakDest.addEventListener('click', () => {
        const st = load();
        const bits = FLIGHT_PREP.destFields.map(f => {
          const v = st.destFields[f.id];
          return v ? (f.label + ': ' + v) : '';
        }).filter(Boolean);
        if (typeof AudioSpeak !== 'undefined') {
          AudioSpeak.speak(bits.length ? bits.join('. ') : 'No destination notes filled yet.');
        }
      });
    }
  }

  return { view, bind, KEY };
})();
if (typeof globalThis !== 'undefined') globalThis.FlightPrepUI = FlightPrepUI;
