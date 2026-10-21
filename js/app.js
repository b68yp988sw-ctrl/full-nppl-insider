/* FULL NPPL INSIDER — UK NPPL / C42 / FRTOL study SPA */
(() => {
  const t = (k, v) => (typeof I18n !== 'undefined' ? I18n.t(k, v) : k);

  function localizedLesson(l) {
    if (!l) return l;
    if (typeof ContentI18n !== 'undefined' && ContentI18n.lesson) return ContentI18n.lesson(l);
    return l;
  }
  function localizedCard(c) {
    if (!c) return c;
    if (typeof ContentI18n !== 'undefined' && ContentI18n.card) return ContentI18n.card(c);
    return c;
  }
  function localizedQuestion(q) {
    if (!q) return q;
    if (typeof ContentI18n !== 'undefined' && ContentI18n.question) return ContentI18n.question(q);
    return q;
  }


  const subjects = () => LESSONS_DATA.subjects;
  const lessons = () => LESSONS_DATA.lessons;
  const cards = () => FLASHCARDS_DATA;
  const questions = () => QUESTIONS_DATA;

  const main = document.getElementById('main');
  const titleEl = document.getElementById('page-title');
  const btnBack = document.getElementById('btn-back');
  const btnAudio = document.getElementById('btn-audio-global');
  const gate = document.getElementById('gate');
  const bottomNav = document.getElementById('bottom-nav');

  let route = { name: 'home' };
  let examState = null;
  let fcState = null;
  let logEditId = null;
  let landingTab = 'controls';

  function skillsCtx() {
    return {
      go, goBack, setNav, titleEl, btnBack,
      startFlash,
      setC42Mode: (id) => { if (typeof C42UI !== 'undefined' && C42UI.setMode) C42UI.setMode(id); },
      get logEditId() { return logEditId; },
      set logEditId(v) { logEditId = v; },
      get landingTab() { return landingTab; },
      set landingTab(v) { landingTab = v; },
      get route() { return route; }
    };
  }

  const ROOT_TABS = new Set(['home', 'theory', 'flashcards', 'exams', 'computer']);
  let navStack = [];

  function routeKey(r) {
    if (!r || !r.name) return '';
    const { name, ...rest } = r;
    const keys = Object.keys(rest).sort();
    return name + '|' + keys.map(k => k + '=' + String(rest[k])).join('&');
  }

  function go(name, params = {}, opts = {}) {
    AudioSpeak.stop();
    const next = { name, ...params };
    const replace = !!opts.replace;
    const isBack = !!opts.back;
    if (!isBack) {
      if (ROOT_TABS.has(name) && !params.id) {
        navStack = [];
      } else if (!replace && routeKey(route) !== routeKey(next)) {
        // Don't push duplicate of current
        if (route && route.name) navStack.push({ ...route });
        // Cap stack
        if (navStack.length > 40) navStack = navStack.slice(-40);
      }
    }
    route = next;
    render();
    window.scrollTo(0, 0);
  }

  /** Sensible parent when navStack is empty (deep-link / replace edge cases). */
  function fallbackParent() {
    const n = route.name;
    if (n === 'subject') return { name: 'theory' };
    if (n === 'lesson') {
      const l = lessons().find(x => x.id === route.id);
      return l ? { name: 'subject', id: l.subject } : { name: 'theory' };
    }
    if (n === 'flash-play') return { name: 'flashcards' };
    if (n === 'exam-setup' || n === 'exam-play' || n === 'exam-result') return { name: 'exams' };
    if (n === 'emergency') return { name: 'emergencies' };
    if (n === 'microlight') return { name: 'microlights' };
    if (n === 'chart' && (route.mode === 'quiz' || route.mode === 'tour')) return { name: 'chart' };
    if (n === 'trip' && route.id) return { name: 'trip' };
    if (n === 'airfields' && route.id) return { name: 'airfields' };
    if (n === 'crp-drills') return { name: 'computer' };
    if (n === 'settings' || n === 'search' || n === 'weak' || n === 'weak-detail' || n === 'weak-retest' || n === 'met-daily' || n === 'law-currency' || n === 'signs' || n === 'glossary' ||
        n === 'log' || n === 'circuits' || n === 'landing' || n === 'emergencies' ||
        n === 'c42' || n === 'microlights' || n === 'trip' || n === 'airfields' ||
        n === 'chart' || n === 'flight-prep' || n === 'frtol-drills' || n === 'half-million') {
      return { name: 'home' };
    }
    return { name: 'home' };
  }

  function goBack() {
    AudioSpeak.stop();
    // Cancel in-place log edit before leaving the log screen
    if (route.name === 'log' && logEditId) {
      logEditId = null;
      render();
      return;
    }
    if (examState && (route.name === 'exam-play' || route.name === 'exam-result' || route.name === 'exam-setup')) {
      try { if (examState.timerId) clearInterval(examState.timerId); } catch (_) {}
      examState = null;
    }
    while (navStack.length) {
      const prev = navStack.pop();
      if (routeKey(prev) === routeKey(route)) continue;
      const params = Object.fromEntries(Object.entries(prev).filter(([k]) => k !== 'name'));
      go(prev.name, params, { back: true });
      return;
    }
    // Stack empty: nested chart/trip/airfields → parent screen; else sensible root
    if (route.name === 'chart' && (route.mode === 'quiz' || route.mode === 'tour')) {
      go('chart', {}, { replace: true, back: true });
      return;
    }
    if (route.name === 'trip' && route.id) {
      go('trip', {}, { replace: true, back: true });
      return;
    }
    if (route.name === 'airfields' && route.id) {
      go('airfields', {}, { replace: true, back: true });
      return;
    }
    const fb = fallbackParent();
    if (fb.name === route.name && !fb.id && !route.id && !route.mode) {
      go('home', {}, { replace: true, back: true });
      return;
    }
    const params = Object.fromEntries(Object.entries(fb).filter(([k]) => k !== 'name'));
    go(fb.name, params, { replace: true, back: true });
  }

  function syncBackButton() {
    if (!btnBack) return;
    // Views may still set onclick; clear so the durable goBack listener is the only handler.
    btnBack.onclick = null;
    // Root tabs (no deep params) with empty stack hide back. Everything else shows it.
    const deepRoot = ROOT_TABS.has(route.name) && (route.id || route.mode);
    const onRoot = ROOT_TABS.has(route.name) && navStack.length === 0 && !deepRoot;
    btnBack.hidden = onRoot;
    btnBack.classList.toggle('hidden', onRoot);
    btnBack.setAttribute('aria-hidden', onRoot ? 'true' : 'false');
    btnBack.disabled = false;
    btnBack.style.pointerEvents = onRoot ? 'none' : 'auto';
  }

  function setNav(active) {
    bottomNav.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.route === active);
    });
  }

  function ringSVG(pct) {
    const r = 26, c = 2 * Math.PI * r;
    const off = c - (pct / 100) * c;
    return `<svg class="ring" viewBox="0 0 64 64" aria-hidden="true">
      <circle class="bg" cx="32" cy="32" r="${r}"/>
      <circle class="fg" cx="32" cy="32" r="${r}"
        stroke-dasharray="${c}" stroke-dashoffset="${off}"
        transform="rotate(-90 32 32)"/>
    </svg>`;
  }

  /* ---------- HOME ---------- */
  function viewHome() {
    setNav('home');
    titleEl.textContent = t('home.title');
    btnBack.hidden = true;
    const prog = Store.progressOverview(subjects(), lessons());
    const acProf = (typeof AircraftPref !== 'undefined') ? AircraftPref.resolve() : null;
    const acChip = acProf ? `
        <div class="ac-selected-chip" data-ac-id="${esc(acProf.id)}" role="button" tabindex="0">
          <div class="ac-thumb">${AircraftPref.thumbForProfile(acProf, 44)}</div>
          <div class="ac-sel-text">
            <span class="ac-sel-label">${esc(t('aircraft.flying'))}</span>
            <span class="ac-sel-name">${esc(AircraftPref.typeName({ id: acProf.id, name: acProf.name }))}</span>
            <span class="ac-sel-variant">${esc(acProf.variantLabel || '')}</span>
          </div>
        </div>` : '';
    const checksLabel = acProf
      ? (acProf.id === 'c42' ? t('aircraft.checks_c42') : t('aircraft.checks'))
      : t('home.c42');
    return `
      <div class="hero">
        <div class="hero-badge">${esc(t('home.badge'))}</div>
        <h1>${esc(t('home.title'))}</h1>
        <p>${esc(t('home.tagline'))}</p>
        ${acChip}
      </div>
      <div class="progress-ring-wrap">
        ${ringSVG(prog.pct)}
        <div class="progress-stats">
          <strong>${prog.pct}%</strong>
          <span>${esc(t('home.progress_meta', { done: prog.doneLessons, total: prog.totalLessons, known: prog.known, exams: prog.exams }))}</span>
        </div>
      </div>

      <div class="chip-row" style="margin:0 0 12px;flex-wrap:wrap">
        <button type="button" class="chip active" data-go="theory">📘 Study</button>
        <button type="button" class="chip" data-go="flight-prep">🛫 Fly / Prep</button>
        <button type="button" class="chip" data-go="exams">📝 Continue exams</button>
        <button type="button" class="chip" data-go="met-daily">🌤 Today's METAR</button>
        <button type="button" class="chip" data-go="law-currency">⚖ Law currency</button>
      </div>
      <div class="quick-grid">
        <button type="button" class="quick-tile" data-go="theory"><span class="qico">📘</span><span>${esc(t('home.theory'))}</span></button>
        <button type="button" class="quick-tile" data-go="flashcards"><span class="qico">🃏</span><span>${esc(t('home.flashcards'))}</span></button>
        <button type="button" class="quick-tile" data-go="exams"><span class="qico">📝</span><span>${esc(t('home.exams'))}</span></button>
        <button type="button" class="quick-tile" data-go="computer"><span class="qico">⚙</span><span>${esc(t('home.computer'))}</span></button>
        <button type="button" class="quick-tile" data-go="log"><span class="qico">📒</span><span>${esc(t('home.log'))}</span></button>
        <button type="button" class="quick-tile" data-go="circuits"><span class="qico">↺</span><span>${esc(t('home.circuits'))}</span></button>
        <button type="button" class="quick-tile" data-go="landing"><span class="qico">🛬</span><span>${esc(t('home.landing'))}</span></button>
        <button type="button" class="quick-tile" data-go="emergencies"><span class="qico">🚨</span><span>${esc(t('home.emergencies'))}</span></button>
        <button type="button" class="quick-tile" data-go="flight-prep"><span class="qico">📋</span><span>${esc(t('home.flight_prep'))}</span></button>
        <button type="button" class="quick-tile" data-go="c42"><span class="qico">✅</span><span>${esc(checksLabel)}</span></button>
        <button type="button" class="quick-tile" id="home-microlights-btn"><span class="qico">✈</span><span>${esc(t('home.microlights'))}</span></button>
        <button type="button" class="quick-tile" data-go="trip"><span class="qico">🗺️</span><span>${esc(t('home.trip'))}</span></button>
        <button type="button" class="quick-tile" data-go="glossary"><span class="qico">🔤</span><span>${esc(t('home.glossary'))}</span></button>
        <button type="button" class="quick-tile" data-go="chart"><span class="qico">🧭</span><span>${esc(t('home.chart'))}</span></button>
        <button type="button" class="quick-tile" data-go="airfields"><span class="qico">🛬</span><span>${esc(t('home.airfields') !== 'home.airfields' ? t('home.airfields') : 'Airfields')}</span></button>
        <button type="button" class="quick-tile" data-go="crp-drills"><span class="qico">🧮</span><span>${esc(t('home.crp_drills') !== 'home.crp_drills' ? t('home.crp_drills') : 'CRP drills')}</span></button>
        <button type="button" class="quick-tile" data-go="frtol-drills"><span class="qico">📡</span><span>${esc(t('home.frtol_drills') !== 'home.frtol_drills' ? t('home.frtol_drills') : 'FRTOL drills')}</span></button>
        <button type="button" class="quick-tile" data-go="search"><span class="qico">🔍</span><span>${esc(t('home.search'))}</span></button>
      </div>
      <div class="section-label">${esc(t('common.subjects'))}</div>
      ${subjects().map(s => {
        const pct = Store.subjectLessonPct(s.id, lessons());
        const name = t('subject.' + s.id);
        const short = t('subject.' + s.id + '_short');
        return `<div class="card card-tap subject-card" data-subject="${s.id}">
          <div class="card-icon">${s.icon}</div>
          <div class="info">
            <h3>${esc(name)}</h3>
            <div class="meta">${esc(short)}</div>
            <div class="bar"><i style="width:${pct}%"></i></div>
          </div>
          <div class="chev">›</div>
        </div>`;
      }).join('')}
      <div class="section-label">${esc(t('common.more'))}</div>
      <div class="card card-tap" data-go="settings"><h3>${esc(t('home.settings'))}</h3><div class="meta">${esc(t('home.settings_meta'))}</div></div>
      ${(() => {
        const weak = Store.weakList ? Store.weakList(5) : [];
        if (!weak.length) return '';
        return `<div class="section-label">${esc(t('weak.title') !== 'weak.title' ? t('weak.title') : 'Revise weak areas')}</div>
          <div class="card">
            <p class="meta" style="margin-bottom:8px">From wrong practice-exam answers</p>
            ${weak.map(w => `<div class="review-item card-tap" data-weak-id="${esc(w.id)}" style="margin-bottom:6px"><strong>${esc(w.q || w.id)}</strong>
              <div class="meta">${esc(typeof I18n !== 'undefined' ? I18n.subjectName(w.subject) : w.subject)} · wrong ${w.wrong || 0} · tap to revise</div></div>`).join('')}
            <button type="button" class="btn btn-secondary" data-go="weak" style="width:100%;margin-top:8px">Full revision list</button>
          </div>`;
      })()}
      <div class="disclaimer-inline">${esc(t('home.disclaimer'))}</div>
    `;
  }

  /* ---------- THEORY ---------- */
  function viewTheory() {
    setNav('theory');
    titleEl.textContent = t('theory.title');
    btnBack.hidden = true;
    return `
      <p class="meta" style="margin-bottom:12px;color:var(--muted);font-size:0.85rem">${esc(t('theory.intro'))}</p>
      ${subjects().map(s => {
        const n = lessons().filter(l => l.subject === s.id).length;
        const pct = Store.subjectLessonPct(s.id, lessons());
        return `<div class="card card-tap subject-card" data-subject="${s.id}">
          <div class="card-icon">${s.icon}</div>
          <div class="info"><h3>${esc(t('subject.' + s.id))}</h3><div class="meta">${esc(t('theory.lessons_meta', { n, pct }))}</div>
          <div class="bar"><i style="width:${pct}%"></i></div></div>
          <div class="chev">›</div>
        </div>`;
      }).join('')}
      <div class="section-label">${esc(t('theory.skills'))}</div>
      <div class="card card-tap" data-go="circuits"><div class="subject-card"><div class="card-icon">↺</div><div class="info"><h3>${esc(t('circuits.title'))}</h3><div class="meta">Join · closures · conflicts · hard/grass · go-around</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="landing"><div class="subject-card"><div class="card-icon">🛬</div><div class="info"><h3>${esc(t('landing.title'))}</h3><div class="meta">Aileron · rudder · speed · crosswind</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="emergencies"><div class="subject-card"><div class="card-icon">🚨</div><div class="info"><h3>${esc(t('emergencies.title'))}</h3><div class="meta">Forced landing · EFATO · fire · lost</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="flight-prep"><div class="subject-card"><div class="card-icon">📋</div><div class="info"><h3>${esc(t('fp.title'))}</h3><div class="meta">Aircraft checks · destination PPR (Prior Permission Required) · freqs · docs</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="c42"><div class="subject-card"><div class="card-icon">✅</div><div class="info"><h3>${esc(t('c42.title'))}</h3><div class="meta">C42 pre-flight · CHIFFTAPWE (Controls… Eventualities)</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" id="theory-microlights-btn"><div class="subject-card"><div class="card-icon">✈</div><div class="info"><h3>${esc(t('microlights.title'))}</h3><div class="meta">C42 &amp; types · parts · fuel/weight calc</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="trip"><div class="subject-card"><div class="card-icon">🗺️</div><div class="info"><h3>${esc(t('trip.title'))}</h3><div class="meta">Airfield planning checklist · PPR (Prior Permission Required) · weather · fuel</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="glossary"><div class="subject-card"><div class="card-icon">🔤</div><div class="info"><h3>${esc(t('glossary.title'))}</h3><div class="meta">MATZ (Military ATZ) · ATZ (Aerodrome Traffic Zone) · FRTOL · FREDA · CHIFFTAPWE · IMSAFE</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="chart"><div class="subject-card"><div class="card-icon">🧭</div><div class="info"><h3>${esc(t('chart.title'))}</h3><div class="meta">Half-Million legend · airspace · symbols · microlight meaning</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="airfields"><div class="subject-card"><div class="card-icon">🛬</div><div class="info"><h3>Airfield cards</h3><div class="meta">Freqs · PPR · runway · Chilterns / Bucks seeds</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="frtol-drills"><div class="subject-card"><div class="card-icon">📡</div><div class="info"><h3>FRTOL scenarios</h3><div class="meta">Listen-and-reply · join · MATZ · zone · Mayday</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="met-daily"><div class="subject-card"><div class="card-icon">🌤</div><div class="info"><h3>Daily METAR</h3><div class="meta">Decode practice · streak · live nearby</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="law-currency"><div class="subject-card"><div class="card-icon">⚖</div><div class="info"><h3>Air Law currency</h3><div class="meta">VFR minima · ATZ · AIC colours</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="signs"><div class="subject-card"><div class="card-icon">🚸</div><div class="info"><h3>Signs & signals</h3><div class="meta">Taxiway · threshold · closed · ATC flag</div></div><div class="chev">›</div></div></div>
      <div class="card card-tap" data-go="weak"><div class="subject-card"><div class="card-icon">🎯</div><div class="info"><h3>Weak areas</h3><div class="meta">Revise missed practice-exam questions</div></div><div class="chev">›</div></div></div>
      <div class="disclaimer-inline">${esc(t('theory.disclaimer'))}</div>`;
  }

  function viewSubject(sid) {
    const s = subjects().find(x => x.id === sid);
    setNav('theory');
    titleEl.textContent = s ? (typeof I18n !== 'undefined' ? I18n.subjectName(s.id) : s.name) : t('theory.subject');
    btnBack.hidden = false;

    const ls = lessons().filter(l => l.subject === sid);
    const st = Store.load();
    const navChart = sid === 'nav' ? `
      <div class="card card-tap" data-go="chart">
        <div class="subject-card">
          <div class="card-icon">🧭</div>
          <div class="info">
            <h3>1:500,000 VFR Chart</h3>
            <div class="meta">Legend trainer · airspace · symbols · what it means in a microlight</div>
          </div>
          <div class="chev">›</div>
        </div>
      </div>` : '';
    return `
      <div class="chip-row">
        <button type="button" class="chip" data-go-fc="${sid}">Flashcards</button>
        <button type="button" class="chip" data-go-ex="${sid}">Practice exam</button>
        ${sid === 'nav' ? '<button type="button" class="chip" data-go="chart">1:500k Chart</button>' : ''}${sid === 'radio' ? '<button type="button" class="chip" data-go="frtol-drills">FRTOL drills</button>' : ''}
      </div>
      ${navChart}
      ${ls.map(l => { const ll = localizedLesson(l); return `
        <div class="card card-tap" data-lesson="${ll.id}">
          <div class="meta">${esc(ll.chapter)}</div>
          <h3>${esc(ll.title)}</h3>
          <div class="meta">${st.lessonsDone[ll.id] ? esc(t('theory.studied')) : esc(t('theory.not_done'))}</div>
        </div>`; }).join('')}`;
  }

  function viewLesson(lid) {
    const l = localizedLesson(lessons().find(x => x.id === lid));
    if (!l) return '<p>Lesson not found</p>';
    const s = subjects().find(x => x.id === l.subject);
    setNav('theory');
    titleEl.textContent = l.title;
    btnBack.hidden = false;

    const diag = l.diagram ? Diagrams.get(l.diagram) : '';
    const speakText = strip(l.body) + ' ' + (l.speakExtra || '');
    return `
      <div class="speak-bar">
        <button type="button" class="btn btn-primary" id="btn-speak" data-speak-state="idle">🔊 ${esc(t('common.speak'))}</button>
        <button type="button" class="btn btn-secondary" id="btn-stop-speak">${esc(t('common.stop'))}</button>
      </div>
      <article class="lesson-body" id="lesson-content">
        ${l.body}
        ${diag}
        <div class="video-placeholder">
          <div class="play">▶</div>
          <strong>Video placeholder</strong><br/>
          Full instructor video can embed here later. v1 uses animated diagrams + text + speech — not Hollywood video.
        </div>
        ${l.speakExtra ? `<div class="callout"><strong>${esc(t('theory.say_aloud'))}</strong><br/>${esc(l.speakExtra)}</div>` : ''}
        <div class="confirm">${esc(t('theory.confirm'))}</div>
      </article>
      <div class="btn-row">
        <button type="button" class="btn btn-success" id="btn-mark-done">${esc(t('theory.mark_done'))}</button>
      </div>`;
  }

  /* ---------- FLASHCARDS ---------- */
  function viewFlashcards() {
    setNav('flashcards');
    titleEl.textContent = t('fc.title');
    btnBack.hidden = true;
    const st = Store.load();
    return subjects().map(s => {
      const all = cards().filter(c => c.subject === s.id);
      const known = all.filter(c => st.flashKnown[c.id]).length;
      return `<div class="card card-tap" data-go-fc="${s.id}">
        <div class="subject-card">
          <div class="card-icon">${s.icon}</div>
          <div class="info"><h3>${esc(typeof I18n !== 'undefined' ? I18n.subjectName(s.id) : s.name)}</h3>
          <div class="meta">${esc(t('fc.known_meta', { known, total: all.length }))}</div>
          <div class="bar"><i style="width:${all.length ? (known/all.length*100) : 0}%"></i></div></div>
          <div class="chev">›</div>
        </div></div>`;
    }).join('');
  }

  function startFlash(sid) {
    let list = cards().filter(c => c.subject === sid);
    list = shuffle(list.slice());
    fcState = { subject: sid, list, i: 0, flipped: false };
    go('flash-play', { id: sid });
  }

  function viewFlashPlay() {
    const s = subjects().find(x => x.id === fcState.subject);
    setNav('flashcards');
    titleEl.textContent = s ? ((typeof I18n !== 'undefined' ? I18n.subjectName(s.id) : s.name) + ' ' + t('fc.cards_suffix')) : t('nav.cards');
    btnBack.hidden = false;

    if (!fcState.list.length) return '<div class="empty-state">' + esc(t('fc.no_cards')) + '</div>';
    const c = localizedCard(fcState.list[fcState.i]);
    const st = Store.load();
    return `
      <div class="fc-progress">
        <span>${fcState.i + 1} / ${fcState.list.length}</span>
        <span>${Object.keys(st.flashKnown).filter(id => id.startsWith(fcState.subject)).length} known</span>
      </div>
      <div class="flashcard ${fcState.flipped ? 'flipped' : ''}" id="flashcard">
        <div class="fc-inner">
          <div class="fc-face front"><div class="fc-label">${esc(t('fc.question'))}</div><p>${esc(c.q)}</p><div class="fc-hint">${esc(t('fc.tap'))}</div></div>
          <div class="fc-face back"><div class="fc-label">${esc(t('fc.answer'))}</div><p>${esc(c.a)}</p></div>
        </div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-danger" id="fc-unknown">${esc(t('fc.still'))}</button>
        <button type="button" class="btn btn-success" id="fc-known">${esc(t('fc.known'))}</button>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-ghost" id="fc-speak">🔊 ${esc(t('common.speak'))}</button>
        <button type="button" class="btn btn-ghost" id="fc-shuffle">${esc(t('fc.shuffle'))}</button>
        <button type="button" class="btn btn-ghost" id="fc-prev">${esc(t('common.prev'))}</button>
        <button type="button" class="btn btn-ghost" id="fc-next">${esc(t('common.next'))}</button>
      </div>`;
  }

  /* ---------- EXAMS ---------- */
  function viewExams() {
    setNav('exams');
    titleEl.textContent = t('exams.title');
    btnBack.hidden = true;
    const hist = Store.load().examHistory.slice(-5).reverse();
    return `
      <p style="color:var(--muted);font-size:0.85rem;margin-bottom:12px">Original UK NPPL / FRTOL-style questions. Not QuizAero. Timed or untimed. Study pass bar ~75%.</p>
      <div class="card card-tap" data-exam="mixed"><h3>Mixed mock</h3><div class="meta">Questions from all subjects</div></div>
      ${subjects().map(s => {
        const n = questions().filter(q => q.subject === s.id).length;
        return `<div class="card card-tap" data-exam="${s.id}"><h3>${s.icon} ${esc(typeof I18n !== 'undefined' ? I18n.subjectName(s.id) : s.name)}</h3><div class="meta">${esc(t('exams.bank', { n }))}</div></div>`;
      }).join('')}
      <div class="section-label">Recent results</div>
      ${hist.length ? hist.map(h => `<div class="card"><strong>${h.pct}%</strong> · ${esc(h.label)} · ${h.correct}/${h.total}${h.timed ? ' · timed' : ''}<div class="meta">${new Date(h.at).toLocaleString('en-GB')}</div></div>`).join('') : '<p class="meta" style="color:var(--muted)">No exams yet</p>'}
    `;
  }

  function viewExamSetup(sid) {
    const s = sid === 'mixed' ? { name: 'Mixed mock', id: 'mixed' } : subjects().find(x => x.id === sid);
    setNav('exams');
    titleEl.textContent = t('exams.setup');
    btnBack.hidden = false;

    const bank = sid === 'mixed' ? questions() : questions().filter(q => q.subject === sid);
    return `
      <div class="card exam-setup">
        <h3>${s.name}</h3>
        <div class="meta" style="margin-bottom:12px">${bank.length} questions available</div>
        <label class="toggle-row"><span>Timed (1.5 min / question)</span><input type="checkbox" class="toggle" id="exam-timed"/></label>
        <label style="display:block;font-size:0.8rem;color:var(--muted);margin:12px 0 6px">Number of questions</label>
        <input type="number" id="exam-n" min="5" max="${bank.length}" value="${Math.min(15, bank.length)}"
          style="width:100%;padding:12px;border-radius:10px;border:1px solid var(--border);background:var(--navy);color:var(--text);font-size:1rem"/>
        <button type="button" class="btn btn-primary" style="margin-top:16px" id="exam-start" data-sid="${sid}">Start exam</button>
      </div>`;
  }

  function startExam(sid, n, timed) {
    let bank = sid === 'mixed' ? questions().slice() : questions().filter(q => q.subject === sid);
    bank = shuffle(bank).slice(0, n);
    examState = {
      subject: sid,
      list: bank,
      i: 0,
      answers: {},
      timed,
      remaining: timed ? n * 90 : null,
      timerId: null,
      finished: false
    };
    go('exam-play');
    if (timed) tickExam();
  }

  function tickExam() {
    if (!examState || !examState.timed || examState.finished) return;
    clearInterval(examState.timerId);
    examState.timerId = setInterval(() => {
      examState.remaining--;
      const el = document.getElementById('exam-time');
      if (el) el.textContent = fmtTime(examState.remaining);
      if (examState.remaining <= 0) {
        clearInterval(examState.timerId);
        finishExam();
      }
    }, 1000);
  }

  function viewExamPlay() {
    setNav('exams');
    titleEl.textContent = t('exams.exam');
    btnBack.hidden = false;
    const q = localizedQuestion(examState.list[examState.i]);
    const sel = examState.answers[q.id];
    return `
      <div class="timer-bar">
        <span>Q ${examState.i + 1} / ${examState.list.length}</span>
        <span class="time" id="exam-time">${examState.timed ? fmtTime(examState.remaining) : 'Untimed'}</span>
      </div>
      <div class="q-num">${subjectName(q.subject)}</div>
      <div class="q-text">${esc(q.q)}</div>
      ${q.choices.map((ch, idx) => `
        <button type="button" class="choice ${sel === idx ? 'selected' : ''}" data-choice="${idx}">${esc(ch)}</button>
      `).join('')}
      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="exam-prev" ${examState.i === 0 ? 'disabled' : ''}>${esc(t('common.back'))}</button>
        ${examState.i < examState.list.length - 1
          ? `<button type="button" class="btn btn-primary" id="exam-next">${esc(t('common.next'))}</button>`
          : `<button type="button" class="btn btn-primary" id="exam-finish">${esc(t('common.finish'))}</button>`}
      </div>`;
  }

  function finishExam() {
    clearInterval(examState.timerId);
    examState.finished = true;
    let correct = 0;
    const review = examState.list.map(q => {
      const a = examState.answers[q.id];
      const ok = a === q.ans;
      if (ok) correct++;
      return { q, a, ok };
    });
    const total = examState.list.length;
    const pct = Math.round((correct / total) * 100);
    const label = examState.subject === 'mixed' ? 'Mixed' : subjectName(examState.subject);
    Store.update(s => {
      s.examHistory.push({ label, subject: examState.subject, correct, total, pct, timed: !!examState.timed, at: Date.now() });
    });
    if (Store.recordExamWrong) Store.recordExamWrong(review);
    examState.review = review;
    examState.pct = pct;
    examState.correct = correct;
    go('exam-result', {}, { replace: true });
  }

  function viewExamResult() {
    setNav('exams');
    titleEl.textContent = t('exams.results');
    btnBack.hidden = false;
    const wrong = examState.review.filter(r => !r.ok);
    const PASS = 75;
    const passed = examState.pct >= PASS;
    return `
      <div class="score-big">
        <div class="pct">${examState.pct}%</div>
        <div class="label">${examState.correct} / ${examState.list.length} correct</div>
        <div class="label" style="margin-top:10px;font-size:0.95rem">Study pass bar <strong>75%</strong>:
          <span style="color:${passed ? 'var(--green)' : 'var(--gold)'};font-weight:700">${passed ? 'PASS (study)' : 'BELOW PASS — keep revising'}</span>
        </div>
        <div class="meta" style="margin-top:6px">Timed papers use ~1.5 min/question. Official exams differ — confirm with instructor.</div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="exam-again">${esc(t('common.done'))}</button>
        ${wrong.length ? '<button type="button" class="btn btn-secondary" data-go="weak">Revise weak items</button>' : ''}
      </div>
      <div class="section-label">Review</div>
      ${examState.review.map(r => {
        const qq = localizedQuestion(r.q);
        return `
        <div class="review-item ${r.ok ? 'ok' : ''}">
          <strong>${esc(qq.q)}</strong>
          <div>Your answer: ${r.a == null ? '—' : esc(qq.choices[r.a])}</div>
          ${r.ok ? '' : `<div>Correct: ${esc(qq.choices[qq.ans])}</div>`}
          <div class="exp">${esc(qq.exp)}</div>
        </div>`; }).join('')}
      ${wrong.length ? '' : '<p style="color:var(--green);text-align:center">All correct — nice work.</p>'}
      <div class="disclaimer-inline">Scores are for personal study only. Official exams differ. Confirm with instructor.</div>`;
  }


  let weakRetest = null; // { sourceId, list, i, answers }

  function lessonForSubject(sid) {
    const map = { law: 'law-02', tech: 'tech-01', met: 'met-04', hpl: 'hpl-01', nav: 'nav-05', radio: 'radio-01' };
    const all = lessons().filter(l => l.subject === sid);
    return map[sid] || (all[0] && all[0].id) || null;
  }

  function similarQuestions(qid, subject, n) {
    const bank = questions().filter(q => q.subject === subject && q.id !== qid);
    return shuffle(bank).slice(0, n);
  }

  function viewWeak() {
    setNav('theory');
    titleEl.textContent = t('weak.title') !== 'weak.title' ? t('weak.title') : 'Weak areas';
    btnBack.hidden = false;

    const list = Store.weakList ? Store.weakList(50) : [];
    const by = Store.weakBySubject ? Store.weakBySubject() : {};
    if (!list.length) {
      return `<div class="empty-state">No weak areas yet. Sit a practice exam and wrong answers will appear here.</div>
        <div class="disclaimer-inline">Study tracking only — not an official exam record.</div>`;
    }
    return `
      <div class="disclaimer-inline">Tap a weak item for full explanation → lesson → 3 similar retest questions. Persist until you clear them by passing a retest.</div>
      <div class="chip-row">
        ${Object.keys(by).map(sid => `<button type="button" class="chip" data-go-ex="${esc(sid)}">${esc(typeof I18n !== 'undefined' ? I18n.subjectName(sid) : sid)} (${by[sid].length})</button>`).join('')}
      </div>
      ${list.map(w => `
        <div class="card card-tap" data-weak-id="${esc(w.id)}">
          <div class="meta">${esc(typeof I18n !== 'undefined' ? I18n.subjectName(w.subject) : w.subject)} · wrong ${w.wrong || 0} · right ${w.right || 0}</div>
          <h3 style="font-size:0.95rem;line-height:1.35">${esc(w.q || w.id)}</h3>
          <div class="meta">Tap for explanation · lesson · retest ›</div>
        </div>`).join('')}
      <button type="button" class="btn btn-danger" id="weak-clear" style="width:100%;margin-top:8px">Clear weak-area history</button>`;
  }

  function viewWeakDetail(qid) {
    setNav('theory');
    titleEl.textContent = 'Weak item';
    btnBack.hidden = false;
    const q0 = questions().find(q => q.id === qid);
    const weak = (Store.load().weakAreas || {})[qid];
    if (!q0) {
      return `<div class="empty-state">Question not found (bank updated). <button class="btn btn-secondary" data-go="weak">Back</button></div>`;
    }
    const qq = localizedQuestion(q0);
    const lid = q0.lesson || lessonForSubject(q0.subject);
    return `
      <div class="card">
        <div class="meta">${esc(subjectName(q0.subject))}${weak ? ` · wrong ${weak.wrong || 0} · right ${weak.right || 0}` : ''}</div>
        <h3 style="line-height:1.35">${esc(qq.q)}</h3>
        <div class="review-item ok" style="margin-top:12px">
          <div><strong>Correct:</strong> ${esc(qq.choices[qq.ans])}</div>
          <div class="exp">${esc(qq.exp)}</div>
        </div>
      </div>
      ${lid ? `<button type="button" class="btn btn-secondary" data-lesson="${esc(lid)}" style="width:100%;margin-bottom:8px">Open related lesson</button>` : ''}
      <button type="button" class="btn btn-primary" id="weak-retest-start" data-qid="${esc(qid)}" data-sid="${esc(q0.subject)}" style="width:100%">Retest 3 similar questions</button>
      <button type="button" class="btn btn-ghost" data-go="weak" style="width:100%;margin-top:8px">Back to weak list</button>
      <div class="disclaimer-inline">Explanations are study aids — confirm with instructor / current regs.</div>`;
  }

  function viewWeakRetest() {
    setNav('theory');
    titleEl.textContent = 'Weak retest';
    btnBack.hidden = false;
    if (!weakRetest || !weakRetest.list.length) {
      return `<div class="empty-state">No retest loaded.</div><button class="btn" data-go="weak">Back</button>`;
    }
    if (weakRetest.finished) {
      const ok = weakRetest.correct;
      const total = weakRetest.list.length;
      const pct = Math.round(ok / total * 100);
      const passed = ok >= 2; // 2/3 good enough to improve
      return `
        <div class="score-big">
          <div class="pct">${pct}%</div>
          <div class="label">${ok} / ${total} on retest</div>
          <div class="label" style="margin-top:8px">${passed ? 'Improved — weak item cleared or reduced.' : 'Keep practising — item stays on weak list.'}</div>
        </div>
        <button type="button" class="btn btn-primary" data-go="weak" style="width:100%">Back to weak list</button>
        ${weakRetest.review.map(r => {
          const qq = localizedQuestion(r.q);
          return `<div class="review-item ${r.ok ? 'ok' : ''}"><strong>${esc(qq.q)}</strong>
            <div class="exp">${esc(qq.exp)}</div></div>`;
        }).join('')}`;
    }
    const q = localizedQuestion(weakRetest.list[weakRetest.i]);
    const sel = weakRetest.answers[q.id];
    return `
      <div class="timer-bar"><span>Retest ${weakRetest.i + 1} / ${weakRetest.list.length}</span><span>Untimed</span></div>
      <div class="q-num">${esc(subjectName(q.subject))}</div>
      <div class="q-text">${esc(q.q)}</div>
      ${q.choices.map((ch, idx) => `
        <button type="button" class="choice ${sel === idx ? 'selected' : ''}" data-wr-choice="${idx}">${esc(ch)}</button>`).join('')}
      <div class="btn-row">
        ${weakRetest.i < weakRetest.list.length - 1
          ? `<button type="button" class="btn btn-primary" id="wr-next">Next</button>`
          : `<button type="button" class="btn btn-primary" id="wr-finish">Finish retest</button>`}
      </div>`;
  }

  /* ---------- FLIGHT COMPUTER ---------- */

  function viewComputer() {
    setNav('computer');
    titleEl.textContent = t('computer.title');
    btnBack.hidden = true;
    return `
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK microlight nav</div>
        <h1 style="font-size:1.25rem">CRP-1 (Circular flight computer) / whizz-wheel</h1>
      </div>
      ${Diagrams.whizz()}
      <div class="card">
        <h3>What is it for?</h3>
        <p style="color:#c9d6e8;font-size:0.9rem;margin-top:8px">The CRP-1 is the UK circular flight computer (slide rule). Microlight navigators use it for time/distance/speed, fuel, and a simplified wind triangle (heading & groundspeed). Same jobs as an E6B, UK packaging and teaching.</p>
      </div>
      <div class="section-label">Step-by-step</div>
      <ol class="steps">
        <li><strong>Time / distance / speed</strong> — align speed on the inner scale with distance on the outer; read time opposite. Or: minutes = NM × 60 ÷ GS(kt).</li>
        <li><strong>Fuel</strong> — same proportion: burn rate (L/h) like a “speed”; fuel required opposite time.</li>
        <li><strong>Wind (simplified)</strong> — mark wind direction/speed on the sliding grid, set true heading/TAS, read drift and groundspeed. Practice with instructor on a real CRP-1.</li>
      </ol>
      <button type="button" class="btn btn-primary" data-go="crp-drills" style="width:100%;margin-bottom:12px">CRP-1 practice drills</button>
      <div class="section-label">Interactive calculator</div>
      <div class="card">
        <div class="calc-grid">
          <label>Distance (NM)<input type="number" id="c-dist" value="45" min="0" step="0.1"/></label>
          <label>GS (Groundspeed) kt<input type="number" id="c-gs" value="80" min="1" step="1"/></label>
          <label>Fuel burn (L/h)<input type="number" id="c-burn" value="12" min="0" step="0.1"/></label>
          <label>Reserve (min)<input type="number" id="c-res" value="30" min="0" step="5"/></label>
          <label class="span2">Wind (optional) — from ° / kt
            <div style="display:flex;gap:8px">
              <input type="number" id="c-wdir" placeholder="Dir °" min="0" max="360"/>
              <input type="number" id="c-wspd" placeholder="Kt" min="0"/>
              <input type="number" id="c-track" placeholder="Track °T" min="0" max="360"/>
              <input type="number" id="c-tas" placeholder="TAS (True Airspeed) kt" min="0" value="85"/>
            </div>
          </label>
        </div>
        <button type="button" class="btn btn-primary" style="margin-top:12px" id="c-calc">Calculate</button>
        <div class="calc-results" id="c-out"></div>
        <p style="font-size:0.75rem;color:var(--muted);margin-top:10px">Wind solution is a simplified vector estimate for study — verify on a CRP-1 / with instructor before flight.</p>
      </div>
      ${Diagrams.windTriangle()}
      <div class="btn-row">
        <button type="button" class="btn btn-ghost" id="c-speak">🔊 ${esc(t('common.speak_guide'))}</button>
        <button type="button" class="btn btn-ghost" data-go="log">📒 Pilot log</button>
      </div>
      ${SkillsUI.computerVideoBlock()}
      <div class="disclaimer-inline">Study aid. Confirm fuel policy with ANO teaching / instructor. Not a substitute for a real flight computer in the exam room if required. Not a substitute for instructor dual / POH / current UK regs.</div>`;
  }

  /* ---------- SETTINGS ---------- */
  function viewSettings() {
    setNav('home');
    titleEl.textContent = t('settings.title');
    btnBack.hidden = false;

    const st = Store.load();
    const meta = (typeof I18n !== 'undefined') ? I18n.langMeta() : { native: 'English', english: 'English', flag: '🇬🇧' };
    const acProf = (typeof AircraftPref !== 'undefined') ? AircraftPref.resolve() : null;
    const acBlock = `
      <div class="card">
        <h3>${esc(t('settings.aircraft'))}</h3>
        <p style="font-size:0.8rem;color:var(--muted);margin-top:8px">${esc(t('settings.aircraft_hint'))}</p>
        ${acProf ? `
        <div class="ac-selected-chip" style="margin-top:10px">
          <div class="ac-thumb">${AircraftPref.thumbForProfile(acProf, 44)}</div>
          <div class="ac-sel-text">
            <span class="ac-sel-name">${esc(acProf.name)}</span>
            <span class="ac-sel-variant">${esc(acProf.variantLabel || '')}</span>
          </div>
        </div>` : `<p style="margin-top:10px;color:var(--muted);font-size:0.88rem">${esc(t('common.empty'))}</p>`}
        <button type="button" class="btn btn-secondary" style="margin-top:12px" id="btn-change-aircraft">${esc(t('settings.change_aircraft'))}</button>
      </div>`;
    return `
      <div class="card">
        <h3>${esc(t('settings.language'))}</h3>
        <p style="font-size:0.8rem;color:var(--muted);margin-top:8px">${esc(t('settings.language_hint'))}</p>
        <p style="margin-top:10px;font-size:0.9rem">${meta.flag || ''} <strong>${esc(meta.native)}</strong> <span style="color:var(--muted)">(${esc(meta.english)})</span></p>
        <button type="button" class="btn btn-secondary" style="margin-top:12px" id="btn-change-lang">${esc(t('settings.change_lang'))}</button>
      </div>
      ${acBlock}
      <div class="card">
        <label class="toggle-row"><span>${esc(t('settings.audio'))}</span>
          <input type="checkbox" class="toggle" id="set-audio" ${st.audioMode ? 'checked' : ''}/>
        </label>
        <p style="font-size:0.8rem;color:var(--muted);margin-top:8px">${esc(t('settings.audio_hint'))}</p>
      </div>
      <div class="card">
        <h3>${esc(t('settings.disclaimer_h'))}</h3>
        <p style="font-size:0.88rem;color:#c9d6e8;margin-top:8px">${esc(t('settings.disclaimer'))}</p>
      </div>
      <div class="card backup-card">
        <h3>${esc(t('settings.backup_h'))}</h3>
        <p class="backup-hint">${esc(t('settings.backup_hint'))}</p>
        <button type="button" class="btn btn-primary" id="btn-backup-export" style="margin-top:12px">${esc(t('settings.backup_export'))}</button>
        <button type="button" class="btn btn-secondary" id="btn-backup-copy" style="margin-top:10px">${esc(t('settings.backup_copy'))}</button>
        <p class="backup-msg" id="backup-export-msg" hidden></p>
      </div>
      <div class="card backup-card">
        <h3>${esc(t('settings.backup_import_h'))}</h3>
        <p class="backup-hint">${esc(t('settings.backup_import_hint'))}</p>
        <label class="btn btn-secondary backup-file-label" style="margin-top:12px;cursor:pointer">
          ${esc(t('settings.backup_pick'))}
          <input type="file" id="backup-file" accept="application/json,.json,text/plain" hidden />
        </label>
        <p class="backup-file-name" id="backup-file-name" hidden></p>
        <textarea id="backup-paste" class="backup-paste" rows="5" placeholder="${esc(t('settings.backup_paste_ph'))}"></textarea>
        <button type="button" class="btn btn-primary" id="btn-backup-import" style="margin-top:12px">${esc(t('settings.backup_import'))}</button>
        <p class="backup-msg" id="backup-import-msg" hidden></p>
      </div>
      <button type="button" class="btn btn-danger" id="reset-progress">${esc(t('settings.reset'))}</button>
    `;
  }

  /* ---------- RENDER ---------- */
  function render() {
    syncAudioBtn();
    let html = '';
    switch (route.name) {
      case 'home': html = viewHome(); break;
      case 'theory': html = viewTheory(); break;
      case 'subject': html = viewSubject(route.id); break;
      case 'lesson': html = viewLesson(route.id); break;
      case 'flashcards': html = viewFlashcards(); break;
      case 'flash-play': html = viewFlashPlay(); break;
      case 'exams': html = viewExams(); break;
      case 'exam-setup': html = viewExamSetup(route.id); break;
      case 'exam-play': html = viewExamPlay(); break;
      case 'exam-result': html = viewExamResult(); break;
      case 'computer': html = viewComputer(); break;
      case 'crp-drills': html = CrpDrillsUI.view(skillsCtx()); break;
      case 'frtol-drills': html = FrtolDrillsUI.view(skillsCtx()); break;
      case 'airfields': html = AirfieldsUI.view(skillsCtx()); break;
      case 'weak': html = viewWeak(); break;
      case 'weak-detail': html = viewWeakDetail(route.id); break;
      case 'weak-retest': html = viewWeakRetest(); break;
      case 'met-daily': html = DailyPacksUI.viewMet(skillsCtx()); break;
      case 'law-currency': html = DailyPacksUI.viewLaw(skillsCtx()); break;
      case 'signs': html = DailyPacksUI.viewSigns(skillsCtx()); break;
      case 'log': html = SkillsUI.viewLog(skillsCtx()); break;
      case 'circuits': html = SkillsUI.viewCircuits(skillsCtx()); break;
      case 'landing': html = SkillsUI.viewLanding(skillsCtx()); break;
      case 'emergencies': html = SkillsUI.viewEmergencies(skillsCtx()); break;
      case 'emergency': html = SkillsUI.viewEmergency(skillsCtx(), route.id); break;
      case 'c42': html = C42UI.view(skillsCtx()); break;
      case 'microlights':
        html = AircraftUI.viewList(skillsCtx());
        break;
      case 'microlight': html = AircraftUI.viewDetail(skillsCtx(), route.id); break;
      case 'trip': html = TripUI.view(skillsCtx()); break;
      case 'glossary': html = GlossaryUI.view(skillsCtx()); break;
      case 'chart':
      case 'half-million': html = ChartUI.view(skillsCtx()); break;
      case 'flight-prep': html = FlightPrepUI.view(skillsCtx()); break;
      case 'search': html = SearchUI.view(skillsCtx()); break;
      case 'settings': html = viewSettings(); break;
      default: html = viewHome();
    }
    main.innerHTML = html;
    bind();
    syncBackButton();
    if (Store.load().audioMode && route.name === 'lesson') {
      // gentle hint only — user taps Speak
    }
  }

  function bind() {
    main.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));
    main.querySelectorAll('[data-subject]').forEach(el => el.addEventListener('click', () => go('subject', { id: el.dataset.subject })));
    main.querySelectorAll('[data-lesson]').forEach(el => el.addEventListener('click', () => go('lesson', { id: el.dataset.lesson })));
    main.querySelectorAll('[data-go-fc]').forEach(el => el.addEventListener('click', () => startFlash(el.dataset.goFc)));
    main.querySelectorAll('[data-go-ex]').forEach(el => el.addEventListener('click', () => go('exam-setup', { id: el.dataset.goEx })));
    main.querySelectorAll('[data-exam]').forEach(el => el.addEventListener('click', () => go('exam-setup', { id: el.dataset.exam })));

    const speak = document.getElementById('btn-speak');
    if (speak) {
      const l = lessons().find(x => x.id === route.id);
      speak.addEventListener('click', () => {
        const text = strip(document.getElementById('lesson-content').innerText) + ' ' + (l.speakExtra || '');
        AudioSpeak.speak(text);
      });
    }
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());

    const mark = document.getElementById('btn-mark-done');
    if (mark) mark.addEventListener('click', () => {
      Store.update(s => { s.lessonsDone[route.id] = true; });
      mark.textContent = t('theory.studied');
      mark.disabled = true;
    });

    // flashcards
    const fc = document.getElementById('flashcard');
    if (fc) fc.addEventListener('click', () => { fcState.flipped = !fcState.flipped; render(); });
    const fk = document.getElementById('fc-known');
    if (fk) fk.addEventListener('click', () => {
      const c = localizedCard(fcState.list[fcState.i]);
      Store.update(s => { s.flashKnown[c.id] = true; delete s.flashUnknown[c.id]; });
      fcNext();
    });
    const fu = document.getElementById('fc-unknown');
    if (fu) fu.addEventListener('click', () => {
      const c = localizedCard(fcState.list[fcState.i]);
      Store.update(s => { s.flashUnknown[c.id] = true; delete s.flashKnown[c.id]; });
      fcNext();
    });
    const fn = document.getElementById('fc-next');
    if (fn) fn.addEventListener('click', fcNext);
    const fp = document.getElementById('fc-prev');
    if (fp) fp.addEventListener('click', () => {
      fcState.i = (fcState.i - 1 + fcState.list.length) % fcState.list.length;
      fcState.flipped = false; render();
    });
    const fsh = document.getElementById('fc-shuffle');
    if (fsh) fsh.addEventListener('click', () => {
      fcState.list = shuffle(fcState.list); fcState.i = 0; fcState.flipped = false; render();
    });
    const fsp = document.getElementById('fc-speak');
    if (fsp) fsp.addEventListener('click', () => {
      const c = localizedCard(fcState.list[fcState.i]);
      AudioSpeak.speak(fcState.flipped ? c.a : c.q);
    });

    // exam setup
    const es = document.getElementById('exam-start');
    if (es) es.addEventListener('click', () => {
      const n = parseInt(document.getElementById('exam-n').value, 10) || 15;
      const timed = document.getElementById('exam-timed').checked;
      startExam(es.dataset.sid, n, timed);
    });
    main.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => {
      const q = localizedQuestion(examState.list[examState.i]);
      examState.answers[q.id] = parseInt(btn.dataset.choice, 10);
      render();
    }));
    const en = document.getElementById('exam-next');
    if (en) en.addEventListener('click', () => { examState.i++; render(); });
    const ep = document.getElementById('exam-prev');
    if (ep) ep.addEventListener('click', () => { examState.i--; render(); });
    const ef = document.getElementById('exam-finish');
    if (ef) ef.addEventListener('click', finishExam);
    const ea = document.getElementById('exam-again');
    if (ea) ea.addEventListener('click', () => { examState = null; go('exams'); });

    // computer
    const cc = document.getElementById('c-calc');
    if (cc) cc.addEventListener('click', runCalc);
    const csp = document.getElementById('c-speak');
    if (csp) csp.addEventListener('click', () => {
      AudioSpeak.speak('The C R P 1 is the UK circular flight computer. Align speed with distance to read time. Fuel uses the same proportion with litres per hour. Wind correction is a vector triangle — practise on a real whizz-wheel with your instructor.');
    });

    // settings
    const sa = document.getElementById('set-audio');
    if (sa) sa.addEventListener('change', () => {
      Store.update(s => { s.audioMode = sa.checked; });
      syncAudioBtn();
    });
    const rp = document.getElementById('reset-progress');
    if (rp) rp.addEventListener('click', () => {
      if (confirm(t('settings.reset_confirm'))) {
        const audio = Store.load().audioMode;
        const logs = Store.load().pilotLog;
        localStorage.removeItem(Store.KEY);
        Store.update(s => { s.disclaimerOk = true; s.audioMode = audio; s.pilotLog = logs; });
        // language stays in nppl_lang; aircraft stays in nppl_aircraft
        go('home');
      }
    });
    const chLang = document.getElementById('btn-change-lang');
    if (chLang) chLang.addEventListener('click', () => showLangPicker({ fromSettings: true }));
    const chAc = document.getElementById('btn-change-aircraft');
    if (chAc) chAc.addEventListener('click', () => showAircraftPicker({ fromSettings: true }));

    // Progress backup export / import
    function showBackupMsg(el, msg, ok) {
      if (!el) return;
      el.hidden = false;
      el.textContent = msg;
      el.className = 'backup-msg ' + (ok ? 'backup-msg-ok' : 'backup-msg-err');
    }
    function backupErrorKey(code) {
      const map = {
        empty: 'settings.backup_err_empty',
        json: 'settings.backup_err_json',
        shape: 'settings.backup_err_shape',
        app: 'settings.backup_err_app',
        version: 'settings.backup_err_version',
        keys: 'settings.backup_err_keys',
        empty_data: 'settings.backup_err_empty_data'
      };
      return map[code] || 'settings.backup_err_generic';
    }
    const btnExp = document.getElementById('btn-backup-export');
    if (btnExp && typeof Backup !== 'undefined') {
      btnExp.addEventListener('click', async () => {
        const msg = document.getElementById('backup-export-msg');
        try {
          const payload = Backup.buildPayload();
          const { text: json } = Backup.downloadFile(payload);
          const copied = await Backup.copyText(json);
          showBackupMsg(msg, t('settings.backup_export_ok'), true);
        } catch (e) {
          showBackupMsg(msg, t('settings.backup_err_generic'), false);
        }
      });
    }
    const btnCopy = document.getElementById('btn-backup-copy');
    if (btnCopy && typeof Backup !== 'undefined') {
      btnCopy.addEventListener('click', async () => {
        const msg = document.getElementById('backup-export-msg');
        try {
          const payload = Backup.buildPayload();
          const ok = await Backup.copyText(Backup.toJson(payload));
          showBackupMsg(msg, t(ok ? 'settings.backup_copied' : 'settings.backup_copy_fail'), ok);
        } catch (e) {
          showBackupMsg(msg, t('settings.backup_copy_fail'), false);
        }
      });
    }
    const fileIn = document.getElementById('backup-file');
    if (fileIn) {
      fileIn.addEventListener('change', () => {
        const f = fileIn.files && fileIn.files[0];
        const nameEl = document.getElementById('backup-file-name');
        const paste = document.getElementById('backup-paste');
        if (!f) return;
        if (nameEl) { nameEl.hidden = false; nameEl.textContent = f.name; }
        const reader = new FileReader();
        reader.onload = () => {
          if (paste) paste.value = String(reader.result || '');
        };
        reader.onerror = () => {
          showBackupMsg(document.getElementById('backup-import-msg'), t('settings.backup_err_generic'), false);
        };
        reader.readAsText(f);
      });
    }
    const btnImp = document.getElementById('btn-backup-import');
    if (btnImp && typeof Backup !== 'undefined') {
      btnImp.addEventListener('click', () => {
        const msg = document.getElementById('backup-import-msg');
        const paste = document.getElementById('backup-paste');
        const raw = paste ? paste.value : '';
        const parsed = Backup.parseAndValidate(raw);
        if (!parsed.ok) {
          showBackupMsg(msg, t(backupErrorKey(parsed.error)), false);
          return;
        }
        if (!confirm(t('settings.backup_confirm'))) return;
        try {
          Backup.applyReplace(parsed.payload);
          showBackupMsg(msg, t('settings.backup_import_ok'), true);
          setTimeout(() => { location.reload(); }, 700);
        } catch (e) {
          showBackupMsg(msg, t('settings.backup_err_generic'), false);
        }
      });
    }
    const homeMl = document.getElementById('home-microlights-btn');
    if (homeMl) homeMl.addEventListener('click', () => {
      const id = (typeof AircraftPref !== 'undefined') ? AircraftPref.aircraftId() : null;
      if (id) go('microlight', { id });
      else go('microlights');
    });
    const theoryMl = document.getElementById('theory-microlights-btn');
    if (theoryMl) theoryMl.addEventListener('click', () => {
      const id = (typeof AircraftPref !== 'undefined') ? AircraftPref.aircraftId() : null;
      if (id) go('microlight', { id });
      else go('microlights');
    });
    const acChipTap = main.querySelector('.hero .ac-selected-chip[data-ac-id]');
    if (acChipTap) acChipTap.addEventListener('click', () => {
      const id = acChipTap.getAttribute('data-ac-id');
      if (id) go('microlight', { id });
      else go('microlights');
    });

    // Skills modules
    if (route.name === 'log') SkillsUI.bindLog(skillsCtx());
    if (route.name === 'circuits') SkillsUI.bindCircuits(skillsCtx());
    if (route.name === 'landing') SkillsUI.bindLanding(skillsCtx());
    if (route.name === 'emergencies') SkillsUI.bindEmergencies(skillsCtx());
    if (route.name === 'emergency') SkillsUI.bindEmergency(skillsCtx());
    if (route.name === 'c42') C42UI.bind(skillsCtx());
    if (route.name === 'microlights') AircraftUI.bindList(skillsCtx());
    if (route.name === 'microlight') AircraftUI.bindDetail(skillsCtx(), route.id);
    if (route.name === 'trip') TripUI.bind(skillsCtx());
    if (route.name === 'glossary') GlossaryUI.bind(skillsCtx());
    if (route.name === 'chart' || route.name === 'half-million') ChartUI.bind(skillsCtx());
    if (route.name === 'airfields') AirfieldsUI.bind(skillsCtx());
    if (route.name === 'crp-drills') CrpDrillsUI.bind(skillsCtx());
    if (route.name === 'frtol-drills') FrtolDrillsUI.bind(skillsCtx());
    if (route.name === 'weak') {
      const clr = document.getElementById('weak-clear');
      if (clr) clr.addEventListener('click', () => {
        Store.update(s => { s.weakAreas = {}; });
        go('weak');
      });
    }
    main.querySelectorAll('[data-weak-id]').forEach(el => {
      el.addEventListener('click', () => go('weak-detail', { id: el.dataset.weakId }));
    });
    const wrStart = document.getElementById('weak-retest-start');
    if (wrStart) wrStart.addEventListener('click', () => {
      const qid = wrStart.dataset.qid;
      const sid = wrStart.dataset.sid;
      const list = similarQuestions(qid, sid, 3);
      weakRetest = { sourceId: qid, list, i: 0, answers: {}, finished: false };
      go('weak-retest');
    });
    if (route.name === 'weak-retest' && weakRetest && !weakRetest.finished) {
      main.querySelectorAll('[data-wr-choice]').forEach(btn => {
        btn.addEventListener('click', () => {
          const q = weakRetest.list[weakRetest.i];
          weakRetest.answers[q.id] = parseInt(btn.dataset.wrChoice, 10);
          render();
        });
      });
      const wn = document.getElementById('wr-next');
      if (wn) wn.addEventListener('click', () => { weakRetest.i++; render(); });
      const wf = document.getElementById('wr-finish');
      if (wf) wf.addEventListener('click', () => {
        let correct = 0;
        weakRetest.review = weakRetest.list.map(q => {
          const a = weakRetest.answers[q.id];
          const ok = a === q.ans;
          if (ok) correct++;
          return { q, a, ok };
        });
        weakRetest.correct = correct;
        weakRetest.finished = true;
        const passed = correct >= 2;
        if (Store.recordWeakRetest) Store.recordWeakRetest(weakRetest.sourceId, passed);
        render();
      });
    }
    if (route.name === 'met-daily') DailyPacksUI.bindMet(skillsCtx());
    if (route.name === 'law-currency') DailyPacksUI.bindLaw(skillsCtx());
    if (route.name === 'signs') DailyPacksUI.bindSigns(skillsCtx());
    if (route.name === 'flight-prep') FlightPrepUI.bind(skillsCtx());
    if (route.name === 'search') SearchUI.bind(skillsCtx());
    if (typeof YTEmbed !== 'undefined' && YTEmbed.enableFallbacks) YTEmbed.enableFallbacks();
  }

  function fcNext() {
    fcState.flipped = false;
    if (fcState.i < fcState.list.length - 1) fcState.i++;
    else fcState.i = 0;
    render();
  }

  function runCalc() {
    const dist = num('c-dist'), gs = num('c-gs'), burn = num('c-burn'), res = num('c-res');
    if (!dist || !gs) { alert('Enter distance and groundspeed'); return; }
    const minutes = dist * 60 / gs;
    const fuelTrip = burn * (minutes / 60);
    const fuelRes = burn * (res / 60);
    let windHtml = '';
    const wdir = num('c-wdir'), wspd = num('c-wspd'), track = num('c-track'), tas = num('c-tas') || 85;
    if (wdir != null && wspd != null && track != null && wspd > 0) {
      // simplified: wind angle from track, crosswind / headwind components
      const ang = ((wdir - track + 360) % 360) * Math.PI / 180;
      const hw = wspd * Math.cos(ang); // + headwind if wind from ahead roughly when wdir≈track
      // meteorological wind FROM direction: component along track
      const headwind = wspd * Math.cos((wdir - track) * Math.PI / 180);
      const cross = wspd * Math.sin((wdir - track) * Math.PI / 180);
      const gsEst = Math.sqrt(Math.max(0, tas * tas - cross * cross)) - headwind;
      const drift = Math.asin(Math.min(1, Math.max(-1, cross / tas))) * 180 / Math.PI;
      const hdg = (track + drift + 360) % 360;
      windHtml = `
        <div class="result-tile"><div class="val">${hdg.toFixed(0)}°</div><div class="lbl">Est. HDG (Heading)</div></div>
        <div class="result-tile"><div class="val">${Math.max(0, gsEst).toFixed(0)} kt</div><div class="lbl">Est. GS (Groundspeed)</div></div>`;
    }
    document.getElementById('c-out').innerHTML = `
      <div class="result-tile"><div class="val">${fmtMin(minutes)}</div><div class="lbl">Time</div></div>
      <div class="result-tile"><div class="val">${fuelTrip.toFixed(1)} L</div><div class="lbl">Trip fuel</div></div>
      <div class="result-tile"><div class="val">${(fuelTrip + fuelRes).toFixed(1)} L</div><div class="lbl">Trip + reserve</div></div>
      <div class="result-tile"><div class="val">${res} min</div><div class="lbl">Reserve</div></div>
      ${windHtml}`;
    Store.update(s => { s.computerUses++; });
  }

  /* helpers */
  function strip(html) {
    const d = document.createElement('div'); d.innerHTML = html; return d.textContent || '';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function fmtTime(sec) {
    const m = Math.floor(Math.max(0, sec) / 60), s = Math.max(0, sec) % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }
  function fmtMin(mins) {
    const m = Math.floor(mins), s = Math.round((mins - m) * 60);
    return `${m}m ${String(s).padStart(2, '0')}s`;
  }
  function num(id) {
    const v = document.getElementById(id).value;
    if (v === '' || v == null) return null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }
  function subjectName(id) {
    if (typeof I18n !== 'undefined') return I18n.subjectName(id);
    const s = subjects().find(x => x.id === id);
    return s ? s.name : id;
  }
  function syncAudioBtn() {
    btnAudio.classList.toggle('active-audio', !!Store.load().audioMode);
  }

  // bottom nav
  bottomNav.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => go(btn.dataset.route));
  });

  if (btnBack) {
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goBack();
    });
  }

  const btnSearch = document.getElementById('btn-search');
  if (btnSearch) btnSearch.addEventListener('click', () => go('search'));

  btnAudio.addEventListener('click', () => {
    Store.update(s => { s.audioMode = !s.audioMode; });
    syncAudioBtn();
    if (Store.load().audioMode) {
      AudioSpeak.speak(t('audio.on'));
    } else {
      AudioSpeak.stop();
    }
  });

  // Language picker
  const langGate = document.getElementById('lang-gate');
  const aircraftGate = document.getElementById('aircraft-gate');
  let pendingLang = null;
  let pendingAircraft = null;
  let aircraftPickerOpts = {};

  function buildLangList(selected) {
    const list = document.getElementById('lang-list');
    if (!list || typeof I18n === 'undefined') return;
    list.innerHTML = I18n.LANGUAGES.map(L => `
      <button type="button" class="lang-option ${selected === L.code ? 'selected' : ''}" data-lang="${L.code}" role="option" aria-selected="${selected === L.code}">
        <span class="lang-flag">${L.flag || ''}</span>
        <span class="lang-names">
          <span class="lang-native">${esc(L.native)}</span>
          <span class="lang-english">${esc(L.english)}</span>
        </span>
        <span class="lang-check">✓</span>
      </button>`).join('');
    list.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingLang = btn.dataset.lang;
        buildLangList(pendingLang);
        const cont = document.getElementById('lang-continue');
        if (cont) cont.disabled = !pendingLang;
      });
    });
  }

  function buildAircraftList(selectedVariantId) {
    const list = document.getElementById('ac-picker-list');
    if (!list || typeof AircraftPref === 'undefined') return;
    const items = AircraftPref.list();
    list.innerHTML = items.map(ac => {
      const typeName = AircraftPref.typeName(ac);
      const cat = AircraftPref.categoryLabel(ac.category);
      const hasSel = (ac.variants || []).some(v => v.id === selectedVariantId);
      const variants = (ac.variants || []).map(v => `
        <button type="button" class="ac-variant-opt ${selectedVariantId === v.id ? 'selected' : ''}" data-ac-variant="${esc(v.id)}" role="option" aria-selected="${selectedVariantId === v.id}">
          <span class="ac-v-label">${esc(v.label)}
            <span class="ac-v-meta">${v.powerHpApprox ? '~' + v.powerHpApprox + ' hp · ' : ''}MTOW ${v.mtowKg} kg</span>
          </span>
          <span class="lang-check">✓</span>
        </button>`).join('');
      return `
        <div class="ac-picker-type ${hasSel ? 'has-sel' : ''}" data-ac-type="${esc(ac.id)}">
          <div class="ac-picker-head">
            <div class="ac-thumb">${AircraftPref.thumbForAircraft(ac, 56)}</div>
            <div class="ac-picker-names">
              <span class="ac-type-name">${esc(typeName)}</span>
              <span class="ac-type-meta">${esc(cat)} · ${ac.seats} seats · ${esc(ac.seating || '')}</span>
            </div>
          </div>
          <div class="ac-picker-variants">${variants}</div>
        </div>`;
    }).join('');
    list.querySelectorAll('[data-ac-variant]').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingAircraft = btn.dataset.acVariant;
        buildAircraftList(pendingAircraft);
        const cont = document.getElementById('ac-continue');
        if (cont) cont.disabled = !pendingAircraft;
      });
    });
  }

  function hideAllGates() {
    gate.classList.add('hidden');
    if (langGate) langGate.classList.add('hidden');
    if (aircraftGate) aircraftGate.classList.add('hidden');
  }

  function afterOnboarding() {
    if (typeof AircraftPref !== 'undefined' && !AircraftPref.hasAircraft()) {
      showAircraftPicker();
      return;
    }
    enterApp();
  }

  function showLangPicker(opts = {}) {
    if (!langGate) { afterOnboarding(); return; }
    pendingLang = (typeof I18n !== 'undefined' && I18n.hasLang()) ? I18n.getLang() : null;
    if (typeof I18n !== 'undefined') I18n.applyStaticChrome();
    buildLangList(pendingLang);
    const cont = document.getElementById('lang-continue');
    if (cont) {
      cont.disabled = !pendingLang;
      cont.onclick = () => {
        if (!pendingLang) return;
        I18n.setLang(pendingLang, { silent: true });
        I18n.applyStaticChrome();
        langGate.classList.add('hidden');
        if (opts.fromSettings) {
          go('settings');
          render();
        } else {
          afterOnboarding();
        }
      };
    }
    hideAllGates();
    langGate.classList.remove('hidden');
  }

  function showAircraftPicker(opts = {}) {
    if (!aircraftGate || typeof AircraftPref === 'undefined') {
      if (opts.fromSettings) { go('settings'); render(); }
      else enterApp();
      return;
    }
    pendingAircraft = AircraftPref.getVariantId();
    if (typeof I18n !== 'undefined') I18n.applyStaticChrome();
    buildAircraftList(pendingAircraft);
    const cont = document.getElementById('ac-continue');
    if (cont) {
      cont.disabled = !pendingAircraft;
      cont.onclick = () => {
        if (!pendingAircraft) return;
        AircraftPref.setVariantId(pendingAircraft, { silent: true });
        AircraftPref.applyTheme();
        aircraftGate.classList.add('hidden');
        if (opts.fromSettings) {
          go('home');
          render();
        } else {
          enterApp();
        }
      };
    }
    aircraftPickerOpts = opts;
    const backLang = document.getElementById('ac-back-lang');
    if (backLang) {
      backLang.textContent = '‹';
      const label = opts.fromSettings
        ? (typeof I18n !== 'undefined' ? I18n.t('common.back') : 'Back')
        : (typeof I18n !== 'undefined' ? I18n.t('aircraft.back_lang') : 'Back to language');
      backLang.setAttribute('aria-label', label);
      backLang.title = label;
      backLang.hidden = false;
      backLang.removeAttribute('hidden');
      backLang.style.pointerEvents = 'auto';
      if (!backLang.dataset.navBound) {
        backLang.dataset.navBound = '1';
        backLang.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          aircraftGate.classList.add('hidden');
          pendingAircraft = null;
          if (aircraftPickerOpts && aircraftPickerOpts.fromSettings) {
            go('settings');
          } else {
            showLangPicker({ fromSettings: false, fromAircraft: true });
          }
        });
      }
    }
    hideAllGates();
    aircraftGate.classList.remove('hidden');
  }

  function enterApp() {
    hideAllGates();
    if (typeof I18n !== 'undefined') I18n.applyStaticChrome();
    if (typeof AircraftPref !== 'undefined') AircraftPref.applyTheme();
    go('home');
  }

  // Gate
  function initGate() {
    if (typeof I18n !== 'undefined') {
      I18n.loadSaved();
      I18n.applyStaticChrome();
      I18n.onChange(() => {
        I18n.applyStaticChrome();
        render();
      });
    }
    if (typeof AircraftPref !== 'undefined') AircraftPref.applyTheme();
    const st = Store.load();
    if (st.disclaimerOk) {
      gate.classList.add('hidden');
      if (typeof I18n !== 'undefined' && !I18n.hasLang()) {
        showLangPicker();
      } else if (typeof AircraftPref !== 'undefined' && !AircraftPref.hasAircraft()) {
        showAircraftPicker();
      } else {
        enterApp();
      }
      return;
    }
    gate.classList.remove('hidden');
    if (typeof I18n !== 'undefined') I18n.applyStaticChrome();
    const ack = document.getElementById('gate-ack');
    const enter = document.getElementById('gate-enter');
    ack.addEventListener('change', () => { enter.disabled = !ack.checked; });
    enter.addEventListener('click', () => {
      Store.update(s => { s.disclaimerOk = true; });
      gate.classList.add('hidden');
      if (typeof I18n !== 'undefined' && !I18n.hasLang()) {
        showLangPicker();
      } else if (typeof AircraftPref !== 'undefined' && !AircraftPref.hasAircraft()) {
        showAircraftPicker();
      } else {
        enterApp();
      }
    });
  }

  initGate();
  if (typeof PWA !== 'undefined') PWA.init();
})();
