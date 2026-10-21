/* FRTOL listen-and-reply scenarios — speechSynthesis ATC + typed reply + self-score */
const FrtolDrillsUI = (() => {
  let cat = 'join';
  let i = 0;
  let list = [];
  let scored = null; // 'good' | 'retry' | null

  function data() {
    return typeof FRTOL_DRILLS !== 'undefined' ? FRTOL_DRILLS : { drills: [], categories: [], meta: {} };
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function rebuild() {
    list = (data().drills || []).filter(d => d.cat === cat);
    i = 0;
    scored = null;
  }

  function speakText(text) {
    if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
    else if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-GB';
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }

  function view(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'FRTOL scenarios';
    ctx.btnBack.hidden = false;
    if (!list.length) rebuild();
    const meta = data().meta || {};
    const d = list[i];
    if (!d) return `<div class="empty-state">No drills</div>`;
    const cats = data().categories || [];
    return `
      <div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>
      <div class="chip-row" style="flex-wrap:wrap">
        ${cats.map(c => `
          <button type="button" class="chip${c.id === cat ? ' active' : ''}" data-fr-cat="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
      </div>
      <div class="fc-progress"><span>${i + 1} / ${list.length}</span><span>${esc((cats.find(c => c.id === cat) || {}).label || '')}</span></div>
      <div class="card">
        <div class="meta">Scenario ${d.listenFirst ? '· listen first' : ''}</div>
        <h3 style="line-height:1.4;margin:8px 0">${esc(d.prompt)}</h3>
        ${(d.hints || []).length ? `<ul style="color:var(--muted);font-size:0.85rem">${d.hints.map(h => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        ${d.atcSpeak ? `<button type="button" class="btn btn-primary" id="fr-play-atc" style="width:100%;margin:8px 0">🔊 Play other station (ATC/AFIS)</button>` : ''}
        <label class="meta">Your reply (type or Speak)</label>
        <textarea id="fr-input" class="search-input" rows="3" placeholder="Type your call…" style="margin:8px 0"></textarea>
        <div class="btn-row">
          <button type="button" class="btn btn-secondary" id="fr-reveal">Show model</button>
          <button type="button" class="btn btn-secondary" id="fr-speak-prompt">🔊 Prompt</button>
        </div>
        <div id="fr-model" class="wx-block hidden" style="margin-top:12px">
          <h4>Model answer (study)</h4>
          <p class="wx-raw">${esc(d.model)}</p>
          <p class="wx-decode">${esc(d.notes || '')}</p>
          <button type="button" class="btn btn-secondary" id="fr-speak-model" style="margin-top:8px">🔊 Speak model</button>
          <div class="btn-row" style="margin-top:12px">
            <button type="button" class="btn btn-primary" id="fr-good">Good enough ✓</button>
            <button type="button" class="btn btn-secondary" id="fr-retry">Retry</button>
          </div>
          <div id="fr-score" class="meta" style="margin-top:8px">${scored === 'good' ? 'Marked good — nice.' : scored === 'retry' ? 'Try again — compare to the model.' : 'Self-score for practice only.'}</div>
        </div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="fr-prev">Prev</button>
        <button type="button" class="btn btn-primary" id="fr-next">Next</button>
      </div>`;
  }

  function bind(ctx) {
    document.querySelectorAll('[data-fr-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cat = btn.dataset.frCat;
        rebuild();
        ctx.go('frtol-drills');
      });
    });
    const d = list[i];
    const playAtc = document.getElementById('fr-play-atc');
    if (playAtc && d && d.atcSpeak) playAtc.addEventListener('click', () => speakText(d.atcSpeak));
    const rev = document.getElementById('fr-reveal');
    if (rev) rev.addEventListener('click', () => {
      const m = document.getElementById('fr-model');
      if (m) m.classList.remove('hidden');
    });
    const sp = document.getElementById('fr-speak-prompt');
    if (sp && d) sp.addEventListener('click', () => speakText(d.prompt));
    const sm = document.getElementById('fr-speak-model');
    if (sm && d) sm.addEventListener('click', () => speakText(d.speakModel || d.model));
    const good = document.getElementById('fr-good');
    if (good && d) good.addEventListener('click', () => {
      scored = 'good';
      if (typeof Store !== 'undefined' && Store.recordDrill) Store.recordDrill('frtol', d.id, true);
      const el = document.getElementById('fr-score');
      if (el) el.textContent = 'Marked good enough — practice only, not an examiner score.';
    });
    const retry = document.getElementById('fr-retry');
    if (retry && d) retry.addEventListener('click', () => {
      scored = 'retry';
      if (typeof Store !== 'undefined' && Store.recordDrill) Store.recordDrill('frtol', d.id, false);
      const inp = document.getElementById('fr-input');
      if (inp) inp.value = '';
      const el = document.getElementById('fr-score');
      if (el) el.textContent = 'Retry — listen again and compare to the model.';
    });
    const prev = document.getElementById('fr-prev');
    const next = document.getElementById('fr-next');
    if (prev) prev.addEventListener('click', () => {
      i = (i - 1 + list.length) % list.length;
      scored = null;
      ctx.go('frtol-drills');
    });
    if (next) next.addEventListener('click', () => {
      i = (i + 1) % list.length;
      scored = null;
      ctx.go('frtol-drills');
    });
  }

  function setCat(c) { if (c && (data().categories || []).some(x => x.id === c)) { cat = c; rebuild(); } }

  return { view, bind, setCat };
})();
if (typeof globalThis !== 'undefined') globalThis.FrtolDrillsUI = FrtolDrillsUI;
