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

  const ROOT_TABS = new Set(['home', 'study', 'exams', 'skills', 'plan']);
  /* Which bottom tab each route belongs to (preview layout). */
  const TAB_FOR = {
    home: 'home', log: 'home', settings: 'home',
    study: 'study', theory: 'study', subject: 'study', lesson: 'study', flashcards: 'study', 'flash-play': 'study',
    computer: 'study', 'crp-drills': 'study', 'frtol-drills': 'study', glossary: 'study', search: 'study',
    'met-daily': 'study', 'law-currency': 'study', signs: 'study', chart: 'study', 'half-million': 'study',
    exams: 'exams', 'exam-setup': 'exams', 'exam-play': 'exams', 'exam-result': 'exams',
    weak: 'exams', 'weak-detail': 'exams', 'weak-retest': 'exams',
    skills: 'skills', circuits: 'skills', landing: 'skills', emergencies: 'skills', emergency: 'skills',
    c42: 'skills', microlights: 'skills', microlight: 'skills',
    plan: 'plan', 'flight-prep': 'plan', trip: 'plan', airfields: 'plan'
  };
  /* Routes worth offering in "Continue where you left off". */
  const RESUMABLE = new Set(['subject', 'lesson', 'flash-play', 'exam-setup', 'exam-play', 'exam-result', 'computer',
    'crp-drills', 'frtol-drills', 'glossary', 'met-daily', 'law-currency', 'signs', 'chart', 'circuits', 'landing',
    'emergencies', 'emergency', 'c42', 'microlight', 'microlights', 'flight-prep', 'trip', 'airfields', 'log', 'weak']);
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
    // Bug fix: a timed exam kept ticking (and could jump to results) after leaving via the tab bar.
    if (examState && route && route.name === 'exam-play' && name !== 'exam-play' && name !== 'exam-result') {
      try { if (examState.timerId) clearInterval(examState.timerId); } catch (_) {}
      if (!examState.finished) examState = null;
    }
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
    if (n === 'theory' || n === 'flashcards' || n === 'computer') return { name: 'study' };
    if (n === 'weak-detail' || n === 'weak-retest') return { name: 'weak' };
    if (TAB_FOR[n] && TAB_FOR[n] !== n) return { name: TAB_FOR[n] };
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
    const tab = TAB_FOR[route && route.name] || TAB_FOR[active] || 'home';
    bottomNav.querySelectorAll('.nav-item').forEach(b => {
      const on = b.dataset.route === tab;
      b.classList.toggle('active', on);
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
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

  /* ---------- HOME (preview layout: big sections + continue card) ---------- */
  function tr(key, fallback) {
    const v = t(key);
    return v === key ? fallback : v;
  }

  function navTile(o) {
    // o: { go, id, icon, title, meta }
    const attr = o.id ? `id="${o.id}"` : `data-go="${o.go}"`;
    return `<button type="button" class="hub-row" ${attr}>
      <span class="hub-ico" aria-hidden="true">${o.icon}</span>
      <span class="hub-text"><span class="hub-title">${esc(o.title)}</span>${o.meta ? `<span class="hub-meta">${esc(o.meta)}</span>` : ''}</span>
      <span class="hub-chev" aria-hidden="true">›</span>
    </button>`;
  }

  function hubSection(label, items) {
    return `<h2 class="hub-label">${esc(label)}</h2><div class="hub-list">${items.map(navTile).join('')}</div>`;
  }

  function lastActivity() {
    const st = Store.load();
    const a = st.lastActivity;
    if (!a || !a.route || !a.route.name) return null;
    return a;
  }

  function recordActivity() {
    if (!RESUMABLE.has(route.name)) return;
    const r = { name: route.name };
    if (route.id) r.id = route.id;
    // Resume a sitting at its setup screen (exam state is not persisted)
    if (r.name === 'exam-play' || r.name === 'exam-result') {
      if (!examState) return;
      r.name = 'exam-setup';
      r.id = examState.subject;
    }
    if (r.name === 'flash-play') {
      if (!fcState) return;
      r.id = fcState.subject;
    }
    let title = titleEl.textContent || '';
    let kind = '';
    if (r.name === 'lesson') {
      const l = lessons().find(x => x.id === r.id);
      if (l) kind = subjectName(l.subject);
    } else if (r.name === 'exam-setup') {
      title = tr('exams.title', 'Practice exams');
      kind = r.id === 'mixed' ? 'Mixed mock' : subjectName(r.id);
    } else if (r.name === 'flash-play') {
      kind = tr('home.flashcards', 'Flashcards');
    }
    try {
      Store.update(s => { s.lastActivity = { route: r, title, kind, at: Date.now() }; });
    } catch (_) { /* ignore storage errors */ }
  }

  function resumeActivity() {
    const a = lastActivity();
    if (!a) { go('study'); return; }
    const r = a.route;
    if (r.name === 'flash-play' && r.id) { startFlash(r.id); return; }
    const params = r.id ? { id: r.id } : {};
    go(r.name, params);
  }

  function continueCard() {
    const a = lastActivity();
    if (!a) {
      return `<button type="button" class="continue-card" id="home-continue">
        <span class="continue-k">${esc(tr('home.start_here', 'Start here'))}</span>
        <span class="continue-t">${esc(subjectName('law'))} — ${esc(tr('home.first_lesson', 'first lesson'))}</span>
        <span class="continue-go">${esc(tr('common.continue', 'Continue'))} ›</span>
      </button>`;
    }
    const when = (() => {
      try { return new Date(a.at).toLocaleDateString(I18n && I18n.getLang ? (I18n.getLang() === 'en' ? 'en-GB' : I18n.getLang()) : 'en-GB', { day: 'numeric', month: 'short' }); } catch (_) { return ''; }
    })();
    return `<button type="button" class="continue-card" id="home-continue">
      <span class="continue-k">${esc(tr('home.continue', 'Continue where you left off'))}</span>
      <span class="continue-t">${esc(a.title || '')}</span>
      <span class="continue-m">${esc([a.kind, when].filter(Boolean).join(' · '))}</span>
      <span class="continue-go">${esc(tr('common.continue', 'Continue'))} ›</span>
    </button>`;
  }

  /* ---------- HOME: layout D (carousel + grouped sections) ---------- */
  const HICO = {
    chev: '<path d="m9 6 6 6-6 6"/>',
    play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
    theory: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5V5.5"/><path d="M8.5 7.5h6"/>',
    cards: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 11.5h.1M12 11.5h.1M15.5 11.5h.1M8.5 15h.1M12 15h.1M15.5 15h.1M8.5 18h.1M12 18h.1"/>',
    radio: '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M8 9l9-5"/><circle cx="9" cy="14.5" r="2"/><path d="M14 13h3M14 16h3"/>',
    check: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5"/>',
    circuit: '<rect x="3.5" y="7" width="17" height="10" rx="5"/><path d="m13 4.5 2.5 2.5-2.5 2.5"/>',
    land: '<path d="M3 20h18"/><path d="M4 9.5 6 9l3 3 5.5-1.5L18 5l1.6.5-1.8 6.3L7.3 15 4 11.3z"/>',
    alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.1"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4"/><path d="M8.5 10h7M8.5 14h7M8.5 18h4"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    runway: '<path d="M9 21 10.5 3h3L15 21z"/><path d="M12 6v2M12 11v2M12 16v2"/>',
    log: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18"/><path d="M12 8h4M12 12h4"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    star: '<path d="M12 1 13.7 10.3 23 12 13.7 13.7 12 23 10.3 13.7 1 12 10.3 10.3z"/>'
  };
  function hsvg(name, cls) {
    return `<svg class="i ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${HICO[name] || ''}</svg>`;
  }

  /* Next lesson from real progress: the next unstudied lesson after the one last
     opened (same subject first), else the first unstudied lesson in course order. */
  function nextLessonInfo() {
    const st = Store.load();
    const done = st.lessonsDone || {};
    const all = lessons();
    const a = lastActivity();
    let pick = null, resume = false;
    if (a && a.route && a.route.name === 'lesson') {
      const cur = all.find(l => l.id === a.route.id);
      if (cur && !done[cur.id]) { pick = cur; resume = true; }
      else if (cur) {
        const same = all.filter(l => l.subject === cur.subject);
        pick = same.slice(same.indexOf(cur) + 1).find(l => !done[l.id]) || null;
      }
    } else if (a && a.route && a.route.name === 'subject') {
      pick = all.find(l => l.subject === a.route.id && !done[l.id]) || null;
    }
    if (!pick) pick = all.find(l => !done[l.id]) || null;
    const subjLessons = pick ? all.filter(l => l.subject === pick.subject) : [];
    return { lesson: pick, resume, index: pick ? subjLessons.indexOf(pick) + 1 : 0, of: subjLessons.length };
  }

  /* Today's exam: the subject with the most questions to revise (real weak-area data);
     with no weak areas it rotates through the subjects by date. */
  function todaysExam() {
    const subs = subjects().filter(s => questions().some(q => q.subject === s.id));
    const by = Store.weakBySubject ? Store.weakBySubject() : {};
    let best = null, bestN = 0;
    subs.forEach(s => { const n = (by[s.id] || []).length; if (n > bestN) { best = s; bestN = n; } });
    if (best) return { id: best.id, weak: bestN, count: questions().filter(q => q.subject === best.id).length };
    const d = new Date();
    const day = Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
    const s = subs.length ? subs[day % subs.length] : null;
    if (!s) return { id: 'mixed', weak: 0, count: questions().length };
    return { id: s.id, weak: 0, count: questions().filter(q => q.subject === s.id).length };
  }

  function homeChip(o) {
    const attr = o.id ? `id="${o.id}"` : `data-go="${o.go}"`;
    return `<button type="button" class="hd-chip" ${attr}><span class="hd-ico">${hsvg(o.icon)}</span><span class="hd-chip-t">${esc(o.title)}</span></button>`;
  }
  function homeGroup(o) {
    return `<section class="hd-grp" aria-labelledby="hd-h-${o.key}">
      <div class="hd-gh">
        <h2 id="hd-h-${o.key}"><span class="hd-gh-ico">${hsvg(o.icon)}</span>${esc(o.title)}</h2>
        <button type="button" class="hd-all" data-go="${o.go}" aria-label="${esc(o.allLabel)}">${esc(tr('home.see_all', 'See all'))}${hsvg('chev')}</button>
      </div>
      <div class="hd-chips">${o.items.map(homeChip).join('')}</div>
    </section>`;
  }

  function viewHome() {
    setNav('home');
    titleEl.textContent = 'NPPL INSIDER';
    btnBack.hidden = true;
    const st = Store.load();
    const prog = Store.progressOverview(subjects(), lessons());
    const isNew = !prog.doneLessons && !lastActivity() && !prog.known && !prog.exams;
    const hello = isNew ? tr('home.welcome', 'Welcome') : tr('home.welcome_back', 'Welcome back');
    const sub = isNew
      ? tr('home.welcome_new_sub', '{total} theory lessons across {subjects} subjects').replace('{total}', prog.totalLessons).replace('{subjects}', subjects().length)
      : tr('home.welcome_sub', '{pct}% through the NPPL theory · {done}/{total} lessons').replace('{pct}', prog.pct).replace('{done}', prog.doneLessons).replace('{total}', prog.totalLessons);

    // Card 1: Continue / Start here
    const nl = nextLessonInfo();
    let c1;
    if (!nl.lesson) {
      c1 = `<button type="button" class="hd-card hd-c1" data-go="theory">
        <span class="hd-k">${esc(tr('home.all_done', 'All lessons studied'))}</span>
        <span class="hd-t">${esc(tr('home.all_done_t', 'Review any subject'))}</span>
        <span class="hd-s">${esc(prog.doneLessons + '/' + prog.totalLessons)}</span>
        <span class="hd-cta">${esc(tr('home.theory', 'Theory'))}${hsvg('chev')}</span></button>`;
    } else {
      const L = localizedLesson(nl.lesson);
      const k = isNew ? tr('home.start_here', 'Start here') : tr('common.continue', 'Continue');
      const cta = isNew ? tr('home.start', 'Start') : (nl.resume ? tr('home.resume', 'Resume') : tr('home.next_lesson', 'Next lesson'));
      const meta = subjectName(nl.lesson.subject) + ' · ' + tr('home.lesson_n_of', 'Lesson {n} of {of}').replace('{n}', nl.index).replace('{of}', nl.of);
      c1 = `<button type="button" class="hd-card hd-c1" data-lesson="${esc(nl.lesson.id)}">
        <span class="hd-k">${esc(k)}</span>
        <span class="hd-t">${esc(L.title)}</span>
        <span class="hd-s">${esc(meta)}</span>
        <span class="hd-cta">${esc(cta)}${hsvg('chev')}</span></button>`;
    }
    // Card 2: Today's exam
    const te = todaysExam();
    const teName = te.id === 'mixed' ? tr('exams.mixed', 'Mixed mock') : subjectName(te.id);
    const teMeta = te.weak
      ? tr('home.exam_weak', '{n} questions to revise in this subject').replace('{n}', te.weak)
      : tr('home.exam_meta', 'Practice paper · {n} questions in the bank').replace('{n}', te.count);
    const c2 = `<button type="button" class="hd-card hd-c2" data-exam="${esc(te.id)}">
        <span class="hd-k">${esc(tr('home.todays_exam', "Today's exam"))}</span>
        <span class="hd-t">${esc(teName)}</span>
        <span class="hd-s">${esc(teMeta)}</span>
        <span class="hd-cta">${esc(tr('home.start', 'Start'))}${hsvg('chev')}</span></button>`;
    // Card 3: Circuit video
    const c3 = `<button type="button" class="hd-card hd-c3" id="home-circuit-video">
        <img src="assets/video/circuit-poster.jpg" alt="" loading="lazy" decoding="async" />
        <span class="hd-ov">
          <span class="hd-k">${esc(tr('home.circuit_video', 'Circuit video'))}</span>
          <span class="hd-t">${esc(tr('home.circuit_video_t', 'A standard UK left-hand circuit'))}</span>
          <span class="hd-s">${esc(tr('home.circuit_video_m', '4 min 13 s · narrated'))}</span>
          <span class="hd-cta">${hsvg('play')}${esc(tr('home.watch', 'Watch'))}</span>
        </span></button>`;

    const acP = (typeof AircraftPref !== 'undefined') ? AircraftPref.resolve() : null;
    const checks = acP ? (acP.id === 'c42' ? t('aircraft.checks_c42') : t('aircraft.checks')) : t('home.c42');
    const weak = Store.weakList ? Store.weakList(50) : [];
    const groups = [
      { key: 'study', title: tr('nav.study', 'Study'), icon: 'theory', go: 'study', allLabel: tr('home.see_all', 'See all') + ' — ' + tr('nav.study', 'Study'), items: [
        { go: 'theory', icon: 'theory', title: tr('home.theory', 'Theory') },
        { go: 'flashcards', icon: 'cards', title: tr('home.flashcards', 'Flashcards') },
        { go: 'crp-drills', icon: 'calc', title: tr('home.crp_drills', 'CRP drills') },
        { go: 'frtol-drills', icon: 'radio', title: tr('home.frtol_drills', 'FRTOL drills') } ] },
      { key: 'fly', title: tr('home.fly', 'Fly'), icon: 'circuit', go: 'skills', allLabel: tr('home.see_all', 'See all') + ' — ' + tr('home.sec_skills', 'Flying skills'), items: [
        { go: 'c42', icon: 'check', title: checks },
        { go: 'circuits', icon: 'circuit', title: tr('home.circuits', 'Circuits') },
        { go: 'landing', icon: 'land', title: tr('home.landing', 'T/O & landing') },
        { go: 'emergencies', icon: 'alert', title: tr('home.emergencies', 'Emergencies') } ] },
      { key: 'plan', title: tr('nav.plan', 'Plan'), icon: 'map', go: 'plan', allLabel: tr('home.see_all', 'See all') + ' — ' + tr('home.sec_plan', 'Plan a flight'), items: [
        { go: 'flight-prep', icon: 'clip', title: tr('home.flight_prep', 'Flight preparation') },
        { go: 'trip', icon: 'map', title: tr('home.trip', 'Plan a trip') },
        { go: 'airfields', icon: 'runway', title: tr('home.airfields', 'Airfields') },
        { go: 'log', icon: 'log', title: tr('home.sec_log', 'My log') } ] }
    ];
    return `
      <div class="gold-rule" aria-hidden="true"><svg viewBox="0 0 24 24">${HICO.star}</svg></div>
      <div class="hd-wel"><h2>${esc(hello)}</h2><p>${esc(sub)}</p></div>
      <div class="hd-car" id="home-carousel" role="region" aria-roledescription="carousel" aria-label="${esc(tr('home.highlights', 'Highlights'))}" tabindex="0">
        ${c1}${c2}${c3}
      </div>
      <div class="hd-dots" id="home-dots" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
      ${weak.length ? `<button type="button" class="hd-row hd-row-warn" data-go="weak">
          <span class="hd-ico">${hsvg('target')}</span>
          <span class="hd-row-t"><b>${esc(tr('weak.title', 'Weak areas'))}</b><span>${esc(tr('home.weak_count', '{n} questions to revise').replace('{n}', weak.length))}</span></span>
          ${hsvg('chev', 'hd-chev')}</button>` : ''}
      ${groups.map(homeGroup).join('')}
      <button type="button" class="hd-row" data-go="settings">
        <span class="hd-ico">${hsvg('gear')}</span>
        <span class="hd-row-t"><b>${esc(tr('common.settings', 'Settings'))}</b><span>${esc(tr('home.sec_settings_meta', 'Language, aircraft, backup'))}</span></span>
        ${hsvg('chev', 'hd-chev')}</button>
      <div class="disclaimer-inline">${esc(t('home.disclaimer'))}</div>
    `;
  }

  function bindHomeCarousel() {
    const car = document.getElementById('home-carousel');
    const dots = document.getElementById('home-dots');
    if (!car || !dots) return;
    const cards = Array.from(car.children);
    const ds = Array.from(dots.children);
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = car.scrollWidth - car.clientWidth;
      let idx;
      if (car.scrollLeft >= max - 4) idx = cards.length - 1;
      else {
        const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : car.clientWidth;
        idx = Math.round(car.scrollLeft / Math.max(1, step));
      }
      idx = Math.max(0, Math.min(cards.length - 1, idx));
      ds.forEach((d, i) => d.classList.toggle('on', i === idx));
      car.dataset.index = String(idx);
    };
    car.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    car.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : car.clientWidth;
      car.scrollBy({ left: e.key === 'ArrowRight' ? step : -step, behavior: 'smooth' });
      e.preventDefault();
    });
    update();
    const vid = document.getElementById('home-circuit-video');
    if (vid) vid.addEventListener('click', () => {
      go('circuits');
      setTimeout(() => {
        const v = main.querySelector('.lesson-video');
        if (v) v.closest('.video-card').scrollIntoView({ block: 'center' });
      }, 60);
    });
  }

  /* ---------- HUBS ---------- */
  function viewStudy() {
    setNav('study');
    titleEl.textContent = tr('nav.study', 'Study');
    btnBack.hidden = true;
    const st = Store.load();
    const known = Object.keys(st.flashKnown || {}).length;
    return `
      ${hubSection(tr('hub.learn', 'Learn'), [
        { go: 'theory', icon: '📘', title: tr('home.theory', 'Theory'), meta: tr('hub.theory_meta', '{n} lessons in 6 subjects').replace('{n}', lessons().length) },
        { go: 'flashcards', icon: '🃏', title: tr('home.flashcards', 'Flashcards'), meta: tr('hub.cards_meta', '{known} of {n} known').replace('{known}', known).replace('{n}', cards().length) }
      ])}
      ${hubSection(tr('hub.practise', 'Practise'), [
        { go: 'computer', icon: '⚙', title: tr('home.computer', 'Flight computer'), meta: 'CRP-1' },
        { go: 'crp-drills', icon: '🧮', title: tr('home.crp_drills', 'CRP drills'), meta: tr('hub.crp_meta', 'Time, fuel, wind') },
        { go: 'frtol-drills', icon: '📡', title: tr('home.frtol_drills', 'FRTOL drills'), meta: tr('hub.frtol_meta', 'Radio calls & replies') },
        { go: 'met-daily', icon: '🌤', title: tr('met.daily_title', 'Daily METAR'), meta: tr('hub.met_meta', 'Decode practice') },
        { go: 'law-currency', icon: '⚖', title: tr('law.currency_title', 'Air Law currency'), meta: tr('hub.law_meta', 'VFR minima, ATZ') },
        { go: 'signs', icon: '🚸', title: tr('signs.title', 'Signs & signals'), meta: tr('hub.signs_meta', 'Ground signals & markings') }
      ])}
      ${hubSection(tr('hub.lookup', 'Look up'), [
        { go: 'chart', icon: '🧭', title: tr('home.chart', '1:500k Chart'), meta: tr('hub.chart_meta', 'Chart legend & quiz') },
        { go: 'glossary', icon: '🔤', title: tr('home.glossary', 'A–Z Abbreviations'), meta: 'ATZ · MATZ · FREDA…' },
        { go: 'search', icon: '🔍', title: tr('home.search', 'Search'), meta: tr('hub.search_meta', 'Search the whole app') }
      ])}`;
  }

  function viewSkills() {
    setNav('skills');
    titleEl.textContent = tr('home.sec_skills', 'Flying skills');
    btnBack.hidden = true;
    const acProf = (typeof AircraftPref !== 'undefined') ? AircraftPref.resolve() : null;
    const checksLabel = acProf
      ? (acProf.id === 'c42' ? t('aircraft.checks_c42') : t('aircraft.checks'))
      : t('home.c42');
    return `
      ${hubSection(tr('hub.on_ground', 'Before and after flight'), [
        { go: 'c42', icon: '✅', title: checksLabel, meta: tr('hub.checks_meta', 'Walk-round, CHIFFTAPWE, FREDA') },
        { id: 'home-microlights-btn', icon: '✈', title: tr('home.microlights', 'Microlights'), meta: tr('hub.ml_meta', 'Parts, specs, fuel & weight') }
      ])}
      ${hubSection(tr('hub.in_air', 'In the air'), [
        { go: 'circuits', icon: '↺', title: tr('home.circuits', 'Circuits'), meta: tr('hub.circuits_meta', 'Joining, lookout, go-around') },
        { go: 'landing', icon: '🛬', title: tr('home.landing', 'T/O & landing'), meta: tr('hub.landing_meta', 'Crosswind, speed, controls') },
        { go: 'emergencies', icon: '🚨', title: tr('home.emergencies', 'Emergencies'), meta: tr('hub.emerg_meta', 'Forced landing, EFATO, fire') }
      ])}
      <div class="disclaimer-inline">${esc(tr('hub.skills_disc', 'Not a substitute for instructor dual, the POH or current UK regulations.'))}</div>`;
  }

  function viewPlan() {
    setNav('plan');
    titleEl.textContent = tr('home.sec_plan', 'Plan a flight');
    btnBack.hidden = true;
    return `
      ${hubSection(tr('hub.before', 'Before you go'), [
        { go: 'flight-prep', icon: '📋', title: tr('home.flight_prep', 'Flight preparation'), meta: tr('hub.fp_meta', 'Aircraft & destination brief') },
        { go: 'trip', icon: '🗺️', title: tr('home.trip', 'Plan a trip'), meta: tr('hub.trip_meta', 'Weather, NOTAMs, PPR, fuel') },
        { go: 'airfields', icon: '🛬', title: tr('home.airfields', 'Airfields'), meta: tr('hub.af_meta', 'Quick cards for UK airfields') }
      ])}
      ${hubSection(tr('hub.tools', 'Tools'), [
        { go: 'chart', icon: '🧭', title: tr('home.chart', '1:500k Chart'), meta: tr('hub.chart_meta', 'Chart legend & quiz') },
        { go: 'computer', icon: '⚙', title: tr('home.computer', 'Flight computer'), meta: 'CRP-1' },
        { go: 'met-daily', icon: '🌤', title: tr('met.daily_title', 'Daily METAR'), meta: tr('hub.met_meta', 'Decode practice') }
      ])}
      <div class="disclaimer-inline">${esc(tr('hub.plan_disc', 'Always check the current AIP, NOTAMs and weather, and get PPR before you fly.'))}</div>`;
  }

  /* ---------- THEORY ---------- */
  function viewTheory() {
    setNav('theory');
    titleEl.textContent = t('theory.title');
    btnBack.hidden = false;
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
    btnBack.hidden = false;
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

  /* Bug fix: ~70% of answers in the bank are option B, so choices are now shuffled per sitting.
     _perm maps display position -> original choice index (applied after localisation). */
  function withPerm(q) {
    const n = (q.choices || []).length;
    return { ...q, _perm: shuffle([...Array(n).keys()]) };
  }
  function dq(q) {
    const loc = localizedQuestion(q);
    if (!q || !q._perm) return loc;
    const choices = q._perm.map(i => loc.choices[i]);
    return { ...loc, choices, ans: q._perm.indexOf(q.ans) };
  }
  function isRight(q, a) {
    return a != null && (q._perm ? q._perm[a] === q.ans : a === q.ans);
  }

  function startExam(sid, n, timed) {
    let bank = sid === 'mixed' ? questions().slice() : questions().filter(q => q.subject === sid);
    n = Math.max(1, Math.min(bank.length, n || 15));
    bank = shuffle(bank).slice(0, n).map(withPerm);
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
    const q = dq(examState.list[examState.i]);
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
        <button type="button" class="btn btn-secondary" id="exam-prev" ${examState.i === 0 ? 'disabled' : ''}>${esc(t('common.prev'))}</button>
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
      const ok = isRight(q, a);
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
        const qq = dq(r.q);
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
    return shuffle(bank).slice(0, n).map(withPerm);
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
    const q = dq(weakRetest.list[weakRetest.i]);
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
    btnBack.hidden = false;
    return `
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK microlight nav</div>
        <h1 style="font-size:1.25rem">CRP-1 (Circular flight computer) / whizz-wheel</h1>
      </div>
      ${Diagrams.whizz()}
      <div class="card">
        <h3>What is it for?</h3>
        <p style="color:#c9ced8;font-size:0.9rem;margin-top:8px">The CRP-1 is the UK circular flight computer (slide rule). Microlight navigators use it for time/distance/speed, fuel, and a simplified wind triangle (heading & groundspeed). Same jobs as an E6B, UK packaging and teaching.</p>
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
        <p style="font-size:0.88rem;color:#c9ced8;margin-top:8px">${esc(t('settings.disclaimer'))}</p>
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
      case 'study': html = viewStudy(); break;
      case 'skills': html = viewSkills(); break;
      case 'plan': html = viewPlan(); break;
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
    setNav();
    document.body.dataset.route = route.name;
    recordActivity();
    if (Store.load().audioMode && route.name === 'lesson') {
      // gentle hint only — user taps Speak
    }
  }

  function bind() {
    main.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));
    if (route.name === 'home') bindHomeCarousel();
    const cont = document.getElementById('home-continue');
    if (cont) cont.addEventListener('click', () => {
      if (lastActivity()) resumeActivity();
      else go('lesson', { id: (lessons().find(l => l.subject === 'law') || lessons()[0]).id });
    });
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
      const q = examState.list[examState.i];
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
    const acChipTap = main.querySelector('.ac-selected-chip[data-ac-id]');
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
          const ok = isRight(q, a);
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
    // The sign-in screen is shown on every app open (straight after the splash).
    // Returning users already accepted the disclaimer, so it is pre-ticked and they just tap Continue.
    gate.classList.remove('hidden');
    if (typeof I18n !== 'undefined') I18n.applyStaticChrome();
    const ack = document.getElementById('gate-ack');
    const enter = document.getElementById('gate-enter');
    if (st.disclaimerOk) { ack.checked = true; enter.disabled = false; }
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
