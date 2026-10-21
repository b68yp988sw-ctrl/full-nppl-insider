/* CRP-1 / Nav skills pack UI — includes optional short timed nav paper */
const CrpDrillsUI = (() => {
  let cat = 'tds';
  let i = 0;
  let list = [];
  let paper = null; // { list, i, answers, remaining, timerId, finished }

  function data() {
    return typeof CRP_DRILLS !== 'undefined' ? CRP_DRILLS : { drills: [], categories: [], meta: {} };
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function rebuild() {
    list = (data().drills || []).filter(d => d.cat === cat);
    i = 0;
  }

  function shuffle(a) {
    const arr = a.slice();
    for (let n = arr.length - 1; n > 0; n--) {
      const j = Math.floor(Math.random() * (n + 1));
      [arr[n], arr[j]] = [arr[j], arr[n]];
    }
    return arr;
  }

  function startPaper() {
    const pool = (data().drills || []).filter(d => ['tds','fuel','wind','sixty','alt','paper'].includes(d.cat));
    const pick = shuffle(pool).slice(0, Math.min(12, pool.length));
    paper = { list: pick, i: 0, answers: {}, remaining: pick.length * 90, timerId: null, finished: false };
    paper.timerId = setInterval(() => {
      if (!paper || paper.finished) return;
      paper.remaining--;
      const el = document.getElementById('nav-paper-time');
      if (el) {
        const m = Math.floor(Math.max(0, paper.remaining) / 60), s = Math.max(0, paper.remaining) % 60;
        el.textContent = m + ':' + String(s).padStart(2, '0');
      }
      if (paper.remaining <= 0) finishPaper();
    }, 1000);
  }

  function finishPaper() {
    if (!paper || paper.finished) return;
    paper.finished = true;
    clearInterval(paper.timerId);
    let ok = 0;
    paper.review = paper.list.map(d => {
      const a = paper.answers[d.id];
      const good = a === d.ans;
      if (good) ok++;
      return { d, a, ok: good };
    });
    paper.pct = Math.round((ok / paper.list.length) * 100);
    paper.correct = ok;
  }

  function view(ctx) {
    ctx.setNav('computer');
    ctx.titleEl.textContent = paper ? 'Nav calc paper' : 'CRP / Nav drills';
    ctx.btnBack.hidden = false;

    if (paper && paper.finished) {
      const pass = paper.pct >= 75;
      return `
        <div class="score-big">
          <div class="pct">${paper.pct}%</div>
          <div class="label">${paper.correct} / ${paper.list.length} · Pass bar 75%: <strong style="color:${pass ? 'var(--green)' : 'var(--gold)'}">${pass ? 'PASS (study)' : 'BELOW 75% — revise'}</strong></div>
        </div>
        <button type="button" class="btn btn-primary" id="nav-paper-done" style="width:100%">Back to drills</button>
        ${paper.review.map(r => `
          <div class="review-item ${r.ok ? 'ok' : ''}">
            <strong>${esc(r.d.q)}</strong>
            <div>Your answer: ${r.a == null ? '—' : esc(r.d.choices[r.a])}</div>
            ${r.ok ? '' : `<div>Correct: ${esc(r.d.choices[r.d.ans])}</div>`}
            <div class="exp">${esc(r.d.exp)}</div>
          </div>`).join('')}
        <div class="disclaimer-inline">Study paper only — not an official exam. Confirm methods with instructor.</div>`;
    }

    if (paper && !paper.finished) {
      const d = paper.list[paper.i];
      const sel = paper.answers[d.id];
      const m = Math.floor(Math.max(0, paper.remaining) / 60), s = Math.max(0, paper.remaining) % 60;
      return `
        <div class="timer-bar"><span>Q ${paper.i + 1} / ${paper.list.length}</span><span class="time" id="nav-paper-time">${m}:${String(s).padStart(2,'0')}</span></div>
        <div class="q-text">${esc(d.q)}</div>
        ${d.choices.map((ch, idx) => `
          <button type="button" class="choice ${sel === idx ? 'selected' : ''}" data-np-choice="${idx}">${esc(ch)}</button>`).join('')}
        <div class="btn-row">
          <button type="button" class="btn btn-secondary" id="np-prev" ${paper.i === 0 ? 'disabled' : ''}>Back</button>
          ${paper.i < paper.list.length - 1
            ? `<button type="button" class="btn btn-primary" id="np-next">Next</button>`
            : `<button type="button" class="btn btn-primary" id="np-finish">Finish</button>`}
        </div>`;
    }

    if (!list.length) rebuild();
    const meta = data().meta || {};
    const d = list[i];
    if (!d) {
      return `<div class="empty-state">No drills.</div><div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>`;
    }
    return `
      <div class="disclaimer-inline">${esc(meta.disclaimer || '')}</div>
      <button type="button" class="btn btn-primary" id="nav-paper-start" style="width:100%;margin-bottom:12px">⏱ Short timed Nav calc paper (12 Q · ~75% study pass)</button>
      <div class="chip-row" id="crp-cats" style="flex-wrap:wrap">
        ${(data().categories || []).map(c => `
          <button type="button" class="chip${c.id === cat ? ' active' : ''}" data-crp-cat="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
      </div>
      <div class="fc-progress"><span>${i + 1} / ${list.length}</span><span>${esc((data().categories || []).find(c => c.id === cat)?.label || '')}</span></div>
      <div class="card">
        <div class="meta" style="margin-bottom:8px">Work it on your CRP-1, then reveal${d.writeIn ? ' · write-in style' : ''}</div>
        <h3 style="line-height:1.35">${esc(d.q)}</h3>
        <div id="crp-choices" style="margin-top:12px">
          ${d.choices.map((ch, idx) => `
            <button type="button" class="btn btn-secondary chart-opt" data-crp-ans="${idx}"
              style="width:100%;margin-bottom:8px;text-align:left;white-space:normal;height:auto;padding:12px">${esc(ch)}</button>`).join('')}
        </div>
        <div id="crp-fb" class="chart-quiz-fb hidden" style="margin-top:10px"></div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="crp-prev">Prev</button>
        <button type="button" class="btn btn-secondary" id="crp-speak">🔊 Speak</button>
        <button type="button" class="btn btn-primary" id="crp-next">Next</button>
      </div>`;
  }

  function bind(ctx) {
    const start = document.getElementById('nav-paper-start');
    if (start) start.addEventListener('click', () => { startPaper(); ctx.go('crp-drills'); });
    const done = document.getElementById('nav-paper-done');
    if (done) done.addEventListener('click', () => { paper = null; ctx.go('crp-drills'); });

    if (paper && !paper.finished) {
      document.querySelectorAll('[data-np-choice]').forEach(btn => {
        btn.addEventListener('click', () => {
          const d = paper.list[paper.i];
          paper.answers[d.id] = parseInt(btn.dataset.npChoice, 10);
          ctx.go('crp-drills');
        });
      });
      const np = document.getElementById('np-next');
      if (np) np.addEventListener('click', () => { paper.i++; ctx.go('crp-drills'); });
      const pp = document.getElementById('np-prev');
      if (pp) pp.addEventListener('click', () => { paper.i--; ctx.go('crp-drills'); });
      const nf = document.getElementById('np-finish');
      if (nf) nf.addEventListener('click', () => { finishPaper(); ctx.go('crp-drills'); });
      return;
    }

    document.querySelectorAll('[data-crp-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cat = btn.dataset.crpCat;
        rebuild();
        ctx.go('crp-drills');
      });
    });
    const d = list[i];
    document.querySelectorAll('[data-crp-ans]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!d) return;
        const choice = parseInt(btn.dataset.crpAns, 10);
        const ok = choice === d.ans;
        document.querySelectorAll('[data-crp-ans]').forEach((b, idx) => {
          b.disabled = true;
          if (idx === d.ans) b.classList.add('chart-opt-ok');
          if (idx === choice && !ok) b.classList.add('chart-opt-bad');
        });
        const fb = document.getElementById('crp-fb');
        if (fb) {
          fb.classList.remove('hidden');
          fb.innerHTML = `<strong>${ok ? 'Correct' : 'Check working'}</strong> — ${esc(d.exp)}`;
        }
        if (typeof Store !== 'undefined' && Store.recordDrill) Store.recordDrill('crp', d.id, ok);
      });
    });
    const prev = document.getElementById('crp-prev');
    const next = document.getElementById('crp-next');
    const speak = document.getElementById('crp-speak');
    if (prev) prev.addEventListener('click', () => {
      i = (i - 1 + list.length) % list.length;
      ctx.go('crp-drills');
    });
    if (next) next.addEventListener('click', () => {
      i = (i + 1) % list.length;
      ctx.go('crp-drills');
    });
    if (speak && d) speak.addEventListener('click', () => {
      const text = d.speak || (d.q + ' ' + (d.exp || ''));
      if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
    });
  }

  return { view, bind };
})();
if (typeof globalThis !== 'undefined') globalThis.CrpDrillsUI = CrpDrillsUI;
