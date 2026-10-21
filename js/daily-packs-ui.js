/* Daily METAR decode · Air Law currency · Signs & signals */
const DailyPacksUI = (() => {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  /* ---- MET daily ---- */
  let metI = 0;
  let metShow = false;
  let liveRaw = null;

  function metData() {
    return typeof MET_DAILY !== 'undefined' ? MET_DAILY : { samples: [], meta: {} };
  }

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function metStreak() {
    if (typeof Store === 'undefined' || !Store.load) return { streak: 0, doneToday: false };
    const s = Store.load();
    const m = s.metDaily || { lastDate: null, streak: 0, doneDates: [] };
    return { streak: m.streak || 0, doneToday: (m.doneDates || []).includes(todayKey()), lastDate: m.lastDate };
  }

  function markMetDone() {
    if (typeof Store === 'undefined' || !Store.update) return;
    Store.update(s => {
      s.metDaily = s.metDaily || { lastDate: null, streak: 0, doneDates: [] };
      const key = todayKey();
      if (!(s.metDaily.doneDates || []).includes(key)) {
        s.metDaily.doneDates = (s.metDaily.doneDates || []).concat([key]).slice(-60);
        const y = new Date(); y.setDate(y.getDate() - 1);
        const yKey = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
        if (s.metDaily.lastDate === yKey || s.metDaily.lastDate === key) s.metDaily.streak = (s.metDaily.streak || 0) + (s.metDaily.lastDate === key ? 0 : 1);
        else s.metDaily.streak = 1;
        if (s.metDaily.lastDate === key) { /* already counted */ }
        else if (s.metDaily.lastDate === yKey) s.metDaily.streak = (s.metDaily.streak || 1);
        else s.metDaily.streak = 1;
        s.metDaily.lastDate = key;
      }
    });
  }

  function viewMet(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Daily METAR';
    ctx.btnBack.hidden = false;
    const samples = metData().samples || [];
    // pick today's sample by date hash
    const day = new Date().getDate();
    metI = day % Math.max(1, samples.length);
    const s = samples[metI] || samples[0];
    const st = metStreak();
    const meta = metData().meta || {};
    if (!s) return `<div class="empty-state">No samples</div>`;
    return `
      <div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>
      <div class="card">
        <div class="meta">Today's METAR · streak ${st.streak} day${st.streak === 1 ? '' : 's'}${st.doneToday ? ' · done today ✓' : ''}</div>
        <pre class="wx-raw" style="white-space:pre-wrap;font-size:0.9rem">${esc(s.raw)}</pre>
        <p class="meta">Decode wind, visibility, weather/cloud, then QNH. UK summer: Zulu + 1 hour for local clock.</p>
        <button type="button" class="btn btn-primary" id="met-reveal" style="width:100%;margin-top:8px">${metShow ? 'Hide' : 'Show'} decode</button>
        <div id="met-ans" class="${metShow ? '' : 'hidden'}" style="margin-top:12px">
          <p class="wx-decode">${esc(s.decode)}</p>
          <ul>${(s.ask || []).map((q, idx) => `<li><strong>${esc(q)}</strong> — ${esc((s.answers || [])[idx] || '')}</li>`).join('')}</ul>
          <button type="button" class="btn btn-secondary" id="met-done" style="width:100%">Mark today's decode done</button>
        </div>
      </div>
      <div class="card">
        <h3>Live nearby (optional)</h3>
        <div class="chip-row">${(meta.nearbyIcaos || ['EGTB']).map(icao => `
          <button type="button" class="chip" data-met-live="${esc(icao)}">${esc(icao)}</button>`).join('')}</div>
        <pre id="met-live" class="wx-raw" style="white-space:pre-wrap;min-height:2em;margin-top:8px">${liveRaw ? esc(liveRaw) : 'Tap an ICAO — best-effort live fetch.'}</pre>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" data-go="law-currency">Air Law currency</button>
        <button type="button" class="btn btn-secondary" data-go="subject" data-subject-jump="met">Met lessons</button>
      </div>`;
  }

  function bindMet(ctx) {
    const rev = document.getElementById('met-reveal');
    if (rev) rev.addEventListener('click', () => { metShow = !metShow; ctx.go('met-daily'); });
    const done = document.getElementById('met-done');
    if (done) done.addEventListener('click', () => { markMetDone(); metShow = true; ctx.go('met-daily'); });
    document.querySelectorAll('[data-met-live]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const icao = btn.dataset.metLive;
        const el = document.getElementById('met-live');
        if (el) el.textContent = 'Fetching ' + icao + '…';
        try {
          if (/\.github\.io$/i.test(location.hostname)) throw new Error('NO_PROXY');
          const r = await fetch('api/metar?icao=' + encodeURIComponent(icao));
          if (!(r.headers.get('content-type') || '').includes('json')) throw new Error('NO_PROXY');
          const j = await r.json();
          liveRaw = (j && (j.raw || j.text || JSON.stringify(j))) || 'No data';
        } catch (e) {
          liveRaw = 'Live METAR not available in this web version — use the samples, or check https://aviationweather.gov/data/metar/?id=' + icao + ' / Met Office.';
        }
        ctx.go('met-daily');
      });
    });
    document.querySelectorAll('[data-subject-jump]').forEach(btn => {
      btn.addEventListener('click', () => ctx.go('subject', { id: btn.dataset.subjectJump }));
    });
  }

  /* ---- Law currency ---- */
  let lawI = 0;
  let lawFlip = false;

  function lawData() {
    return typeof LAW_CURRENCY !== 'undefined' ? LAW_CURRENCY : { cards: [], meta: {} };
  }

  function viewLaw(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Air Law currency';
    ctx.btnBack.hidden = false;
    const cards = lawData().cards || [];
    const c = cards[lawI];
    const meta = lawData().meta || {};
    if (!c) return `<div class="empty-state">No cards</div>`;
    return `
      <div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>
      <div class="fc-progress"><span>${lawI + 1} / ${cards.length}</span><span>${esc(c.topic)}</span></div>
      <div class="card card-tap" id="law-card" style="min-height:140px">
        <div class="meta">${lawFlip ? 'Answer' : 'Tap to flip'}</div>
        <h3 style="line-height:1.4">${esc(lawFlip ? c.back : c.front)}</h3>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="law-prev">Prev</button>
        <button type="button" class="btn btn-secondary" id="law-speak">🔊</button>
        <button type="button" class="btn btn-primary" id="law-next">Next</button>
      </div>
      <button type="button" class="btn btn-secondary" data-go="signs" style="width:100%;margin-top:8px">Signs & signals pack</button>`;
  }

  function bindLaw(ctx) {
    const card = document.getElementById('law-card');
    if (card) card.addEventListener('click', () => { lawFlip = !lawFlip; ctx.go('law-currency'); });
    const cards = lawData().cards || [];
    const c = cards[lawI];
    const prev = document.getElementById('law-prev');
    const next = document.getElementById('law-next');
    const sp = document.getElementById('law-speak');
    if (prev) prev.addEventListener('click', () => { lawI = (lawI - 1 + cards.length) % cards.length; lawFlip = false; ctx.go('law-currency'); });
    if (next) next.addEventListener('click', () => { lawI = (lawI + 1) % cards.length; lawFlip = false; ctx.go('law-currency'); });
    if (sp && c) sp.addEventListener('click', () => {
      if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(lawFlip ? c.back : c.front);
    });
  }

  /* ---- Signs ---- */
  let signI = 0;

  function signsData() {
    return typeof SIGNS_SIGNALS !== 'undefined' ? SIGNS_SIGNALS : { items: [], meta: {} };
  }

  function diagramSvg(kind) {
    const common = 'width="100%" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg"';
    if (kind === 'taxi_loc') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="90" y="35" width="140" height="50" rx="6" fill="#111" stroke="#f5d76e" stroke-width="2"/><text x="160" y="68" text-anchor="middle" fill="#f5d76e" font-size="28" font-family="sans-serif">A</text><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Yellow on black = taxiway you are on</text></svg>`;
    if (kind === 'c_sign') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="110" y="30" width="100" height="60" rx="6" fill="#f5d76e"/><text x="160" y="72" text-anchor="middle" fill="#111" font-size="36" font-family="sans-serif" font-weight="bold">C</text><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Book-in / fees (often near tower)</text></svg>`;
    if (kind === 'threshold') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="40" y="40" width="240" height="40" fill="#333"/><g fill="#fff">${[0,1,2,3,4,5,6,7].map(n=>`<rect x="${50+n*28}" y="45" width="12" height="30"/>`).join('')}</g><text x="260" y="68" fill="#fff" font-size="18">27</text><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Piano keys + magnetic designator</text></svg>`;
    if (kind === 'disp_perm' || kind === 'disp_temp') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="30" y="45" width="260" height="30" fill="#333"/><polygon points="40,60 70,50 70,70" fill="#f5d76e"/><polygon points="80,60 110,50 110,70" fill="#f5d76e"/><rect x="140" y="45" width="8" height="30" fill="#fff"/><text x="200" y="68" fill="#fff" font-size="14">THR</text><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="10">Arrows: may T/O·taxi — do not land before threshold</text></svg>`;
    if (kind === 'closed_x') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="60" y="35" width="200" height="50" fill="#444"/><line x1="80" y1="45" x2="240" y2="75" stroke="#e55" stroke-width="8"/><line x1="80" y1="75" x2="240" y2="45" stroke="#e55" stroke-width="8"/><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Xs = closed — no aircraft use</text></svg>`;
    if (kind === 'boundary') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><rect x="40" y="40" width="40" height="40" fill="#f5a623"/><rect x="80" y="40" width="40" height="40" fill="#fff"/><rect x="120" y="40" width="40" height="40" fill="#f5a623"/><rect x="160" y="40" width="40" height="40" fill="#fff"/><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Orange/white = unfit or boundary</text></svg>`;
    if (kind === 'chequer') return `<svg ${common}><rect width="320" height="120" fill="#0a1628"/><g>${[[0,0,'#c33'],[1,0,'#f5d76e'],[0,1,'#f5d76e'],[1,1,'#c33'],[2,0,'#c33'],[3,0,'#f5d76e'],[2,1,'#f5d76e'],[3,1,'#c33']].map(([x,y,f])=>`<rect x="${100+x*30}" y="${30+y*30}" width="30" height="30" fill="${f}"/>`).join('')}</g><text x="160" y="110" text-anchor="middle" fill="#9ab" font-size="11">Chequered = ATC in operation</text></svg>`;
    return `<svg ${common}><text x="160" y="60" text-anchor="middle" fill="#9ab">Schematic</text></svg>`;
  }

  function viewSigns(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Signs & signals';
    ctx.btnBack.hidden = false;
    const items = signsData().items || [];
    const it = items[signI];
    const meta = signsData().meta || {};
    if (!it) return `<div class="empty-state">No items</div>`;
    return `
      <div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>
      <div class="fc-progress"><span>${signI + 1} / ${items.length}</span></div>
      <div class="card">
        <h3>${esc(it.title)}</h3>
        <div style="margin:10px 0">${diagramSvg(it.diagram)}</div>
        <p style="color:#c9d6e8">${esc(it.meaning)}</p>
        <p class="meta">Memory hook: ${esc(it.hook)}</p>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="sg-prev">Prev</button>
        <button type="button" class="btn btn-secondary" id="sg-speak">🔊</button>
        <button type="button" class="btn btn-primary" id="sg-next">Next</button>
      </div>
      <button type="button" class="btn btn-secondary" data-go="lesson" data-lesson-id="law-signs" style="width:100%;margin-top:8px">Full signs lesson</button>`;
  }

  function bindSigns(ctx) {
    const items = signsData().items || [];
    const it = items[signI];
    const prev = document.getElementById('sg-prev');
    const next = document.getElementById('sg-next');
    const sp = document.getElementById('sg-speak');
    if (prev) prev.addEventListener('click', () => { signI = (signI - 1 + items.length) % items.length; ctx.go('signs'); });
    if (next) next.addEventListener('click', () => { signI = (signI + 1) % items.length; ctx.go('signs'); });
    if (sp && it) sp.addEventListener('click', () => {
      if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(it.title + '. ' + it.meaning + ' Hook: ' + it.hook);
    });
    document.querySelectorAll('[data-lesson-id]').forEach(btn => {
      btn.addEventListener('click', () => ctx.go('lesson', { id: btn.dataset.lessonId }));
    });
  }

  return {
    viewMet, bindMet, viewLaw, bindLaw, viewSigns, bindSigns, metStreak
  };
})();
if (typeof globalThis !== 'undefined') globalThis.DailyPacksUI = DailyPacksUI;
