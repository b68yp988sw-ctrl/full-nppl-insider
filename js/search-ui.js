/* App-wide iPhone-style search — indexes lessons, skills, exams, glossary */
const SearchUI = (() => {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function subjectName(id) {
    try {
      const s = LESSONS_DATA.subjects.find(x => x.id === id);
      return s ? s.name : id;
    } catch (_) { return id; }
  }

  /** Build flat searchable index once per open (cheap for this app size). */
  function buildIndex() {
    const items = [];

    // Skills / modules
    const skills = [
      { title: 'Circuits', subtitle: 'Join · lookout · closures · conflicts · hard/grass · go-around', route: 'circuits', keywords: 'circuit pattern downwind base final overhead join dead-side go-around runway closed accident conflict climb grass hard vacate taxi backtrack holding point microlight' },
      { title: 'Joining the circuit', subtitle: 'Standard Overhead Join · dead-side · published joins', route: 'circuits', keywords: 'overhead join dead-side crosswind downwind join ATZ CAP413' },
      { title: 'Circuit lookout', subtitle: 'Wind tee · signal square · LH/RH · traffic', route: 'circuits', keywords: 'wind tee signal square lookout runway in use' },
      { title: 'Runway closed / accident', subtitle: 'Hold off · orbit · divert · radio', route: 'circuits', keywords: 'runway closed accident obstruction orbit divert' },
      { title: 'Conflict on final', subtitle: 'Runway occupied · go-around · see-and-avoid', route: 'circuits', keywords: 'final conflict occupied go-around' },
      { title: 'Traffic climbs under you', subtitle: 'Separate · go-around · orbit · radio', route: 'circuits', keywords: 'underneath climb conflict circuit' },
      { title: 'Go-around priorities', subtitle: 'Aviate · navigate · communicate', route: 'circuits', keywords: 'go-around missed approach unstable' },
      { title: 'Hard runway vs grass', subtitle: 'Vacate onto grass · taxi · hold · backtrack', route: 'circuits', keywords: 'hard grass vacate taxi holding point backtrack soft ground prop stone' },
      { title: 'Take-off & Landing', subtitle: 'Aileron · rudder · speed · crosswind', route: 'landing', keywords: 'takeoff flare hold-off crosswind' },
      { title: 'Emergencies', subtitle: 'Forced landing · EFATO · fire · lost', route: 'emergencies', keywords: 'emergency mayday pan' },
      { title: 'Flight preparation', subtitle: 'Aircraft checks · destination PPR · freqs · docs', route: 'flight-prep', keywords: 'flight prep preparation preflight walkround chifftapwe destination aerodrome ppr notam brief before fly' },
      { title: 'C42 Checks', subtitle: 'Pre-flight · CHIFFTAPWE (Controls… Eventualities) · FREDA · FARTT', route: 'c42', keywords: 'checklist walkround chifftapwe freda' },
      { title: 'Microlights', subtitle: 'Aircraft parts · specs · fuel/weight calculator', route: 'microlights', keywords: 'aircraft c42 foxbat eurostar skyranger thruster rans weight mtow fuel' },
      { title: 'Plan a trip', subtitle: 'PPR · weather · NOTAMs · fuel · IMSAFE', route: 'trip', keywords: 'planning airfield destination' },
      { title: 'CRP-1 Flight computer', subtitle: 'Whizz-wheel · time · fuel · wind', route: 'computer', keywords: 'crp1 e6b navigation calculator' },
      { title: 'Pilot log', subtitle: 'Hours & landings (local study log)', route: 'log', keywords: 'logbook hours' },
      { title: 'Abbreviations A–Z', subtitle: 'MATZ, ATZ, FRTOL, FREDA…', route: 'glossary', keywords: 'glossary acronyms mnemonics dictionary' },
      { title: '1:500k Chart', subtitle: 'Half-Million VFR legend · airspace · symbols', route: 'chart', keywords: 'chart half million 1:500000 vfr legend atz matz airspace navigation map' },
      { title: 'Legend walk-through', subtitle: 'Step-by-step 1:500k legend tour', route: 'chart', keywords: 'chart tour legend walkthrough half million', params: { mode: 'tour' } },
      { title: 'Airfield cards', subtitle: 'Freqs · PPR · runway · Chilterns / Bucks', route: 'airfields', keywords: 'airfield aerodrome frequency ppr runway amersham booker denham elstree chilterns bucks' },
      { title: 'CRP-1 drills', subtitle: 'Time/distance/speed · fuel · wind triangle', route: 'crp-drills', keywords: 'crp-1 flight computer drills fuel wind triangle groundspeed' },
      { title: 'FRTOL drills', subtitle: 'Join · circuit · go-around · Mayday/Pan', route: 'frtol-drills', keywords: 'frtol radio phraseology cap 413 mayday pan join circuit' },
      { title: 'Weak areas', subtitle: 'Revise missed practice-exam questions', route: 'weak', keywords: 'weak revise exam wrong revision' },
      { title: 'Theory', subtitle: 'Six UK NPPL subjects', route: 'theory', keywords: 'lessons subjects' },
      { title: 'Flashcards', subtitle: 'Cards by subject', route: 'flashcards', keywords: 'revise memory' },
      { title: 'Practice exams', subtitle: 'Timed / untimed mocks', route: 'exams', keywords: 'test quiz questions' },
      { title: 'Settings', subtitle: 'Audio mode · progress reset', route: 'settings', keywords: 'disclaimer audio' }
    ];
    skills.forEach(s => items.push({
      group: 'Skills',
      title: s.title,
      subtitle: s.subtitle,
      hay: (s.title + ' ' + s.subtitle + ' ' + (s.keywords || '')).toLowerCase(),
      go: Object.assign({ name: s.route }, s.params || {})
    }));

    // Lessons
    try {
      LESSONS_DATA.lessons.forEach(l => {
        const sub = subjectName(l.subject);
        const bodyBits = String(l.body || '').replace(/<[^>]+>/g, ' ').slice(0, 1200);
        items.push({
          group: 'Lessons',
          title: l.title,
          subtitle: sub + (l.chapter ? ' · ' + l.chapter : ''),
          hay: (l.title + ' ' + sub + ' ' + (l.chapter || '') + ' ' + bodyBits).toLowerCase(),
          go: { name: 'lesson', id: l.id }
        });
      });
      LESSONS_DATA.subjects.forEach(s => {
        items.push({
          group: 'Lessons',
          title: s.name,
          subtitle: s.short || 'Subject',
          hay: (s.name + ' ' + (s.short || '') + ' ' + s.id).toLowerCase(),
          go: { name: 'subject', id: s.id }
        });
      });
    } catch (_) {}

    // Flashcards (front text → open that subject’s deck)
    try {
      FLASHCARDS_DATA.forEach(c => {
        items.push({
          group: 'Flashcards',
          title: c.q,
          subtitle: subjectName(c.subject),
          hay: (c.q + ' ' + c.a + ' ' + subjectName(c.subject)).toLowerCase(),
          go: { name: 'flash-start', id: c.subject }
        });
      });
    } catch (_) {}

    // Exams / subjects
    try {
      items.push({
        group: 'Exams',
        title: 'Mixed mock exam',
        subtitle: 'Questions from all subjects',
        hay: 'mixed mock exam practice all subjects',
        go: { name: 'exam-setup', id: 'mixed' }
      });
      LESSONS_DATA.subjects.forEach(s => {
        items.push({
          group: 'Exams',
          title: s.name + ' exam',
          subtitle: 'Practice questions',
          hay: (s.name + ' exam practice questions ' + s.id).toLowerCase(),
          go: { name: 'exam-setup', id: s.id }
        });
      });
    } catch (_) {}

    // Emergencies
    try {
      EMERGENCIES_DATA.forEach(e => {
        items.push({
          group: 'Skills',
          title: e.title,
          subtitle: e.summary || 'Emergency checklist',
          hay: (e.title + ' ' + (e.summary || '') + ' ' + e.id).toLowerCase(),
          go: { name: 'emergency', id: e.id }
        });
      });
    } catch (_) {}

    // Microlight aircraft
    try {
      if (typeof AIRCRAFT_DATA !== 'undefined' && AIRCRAFT_DATA.aircraft) {
        AIRCRAFT_DATA.aircraft.forEach(a => {
          const engines = (a.variants || []).map(v => v.label + ' ' + (v.engine || '')).join(' ');
          items.push({
            group: 'Skills',
            title: a.name,
            subtitle: (a.category || '') + ' · microlight study card',
            hay: (a.name + ' ' + (a.shortName || '') + ' ' + (a.category || '') + ' ' + engines + ' microlight aircraft mtow fuel').toLowerCase(),
            go: { name: 'microlight', id: a.id }
          });
        });
      }
    } catch (_) {}


    // Flight preparation hub
    try {
      if (typeof FLIGHT_PREP !== 'undefined') {
        (FLIGHT_PREP.aircraftStages || []).forEach(s => {
          items.push({
            group: 'Skills',
            title: 'Prep · ' + s.title,
            subtitle: 'Aircraft pre-flight',
            hay: ('flight prep aircraft ' + s.title + ' ' + (s.blurb || '')).toLowerCase(),
            go: { name: 'flight-prep' }
          });
        });
        (FLIGHT_PREP.destTicks || []).forEach(s => {
          items.push({
            group: 'Skills',
            title: 'Prep · ' + s.label,
            subtitle: 'Destination aerodrome brief',
            hay: ('flight prep destination ' + s.label).toLowerCase(),
            go: { name: 'flight-prep' }
          });
        });
      }
    } catch (_) {}

    // C42 checklist sections
    try {
      C42_CHECKS.modes.forEach(m => {
        items.push({
          group: 'Skills',
          title: 'C42 · ' + m.title,
          subtitle: 'C42 pre-flight checklist',
          hay: ('c42 ' + m.title + ' ' + m.id + ' checklist ' + (m.speakIntro || '')).toLowerCase(),
          go: { name: 'c42', mode: m.id }
        });
      });
    } catch (_) {}

    // Trip plan sections
    try {
      TRIP_PLAN.sections.forEach(s => {
        items.push({
          group: 'Skills',
          title: 'Trip · ' + s.title,
          subtitle: 'Airfield planning checklist',
          hay: ('trip plan ' + s.title + ' ' + s.id).toLowerCase(),
          go: { name: 'trip' }
        });
      });
    } catch (_) {}

    // Landing control topics
    try {
      if (LANDING_DATA && LANDING_DATA.controls) {
        Object.keys(LANDING_DATA.controls).forEach(k => {
          const c = LANDING_DATA.controls[k];
          items.push({
            group: 'Skills',
            title: c.title || k,
            subtitle: 'Take-off & landing',
            hay: ((c.title || k) + ' landing takeoff ' + (c.speak || '')).toLowerCase(),
            go: { name: 'landing' }
          });
        });
      }
    } catch (_) {}

    // Glossary
    try {
      NPPL_GLOSSARY.forEach(g => {
        items.push({
          group: 'Glossary',
          title: g.term,
          subtitle: g.meaning,
          hay: (g.term + ' ' + g.meaning + ' ' + (g.category || '')).toLowerCase(),
          go: { name: 'glossary', q: g.term }
        });
      });
    } catch (_) {}


    const push = o => items.push(Object.assign({ group: 'Skills' }, o));
    // Airfield cards
    if (typeof AirfieldsUI !== 'undefined' && AirfieldsUI.all) {
      AirfieldsUI.all().forEach(a => {
        push({
          title: (a.icao ? a.icao + ' · ' : '') + (a.name || 'Airfield'),
          subtitle: 'Airfield card · ' + (a.area || ''),
          hay: [a.icao, a.name, a.area, a.ppr, a.runway, a.notes, a.tags, a.freqs && a.freqs.afis].join(' ').toLowerCase(),
          go: { name: 'airfields' }
        });
      });
    }
    // CRP / FRTOL drills
    if (typeof CRP_DRILLS !== 'undefined') {
      (CRP_DRILLS.drills || []).forEach(d => {
        push({
          title: d.q.slice(0, 80),
          subtitle: 'CRP-1 drill · ' + d.cat,
          hay: (d.q + ' ' + d.exp + ' crp drill').toLowerCase(),
          go: { name: 'crp-drills' }
        });
      });
    }
    if (typeof FRTOL_DRILLS !== 'undefined') {
      (FRTOL_DRILLS.drills || []).forEach(d => {
        push({
          title: d.prompt.slice(0, 80),
          subtitle: 'FRTOL drill · ' + d.cat,
          hay: (d.prompt + ' ' + d.model + ' ' + (d.notes || '') + ' frtol radio').toLowerCase(),
          go: { name: 'frtol-drills', mode: d.cat }
        });
      });
    }

    // 1:500k chart legend
    try {
      if (typeof CHART_LEGEND !== 'undefined' && CHART_LEGEND.items) {
        items.push({
          group: 'Skills',
          title: 'Chart quiz',
          subtitle: '1:500k legend practice questions',
          hay: 'chart quiz half million practice symbol meaning',
          go: { name: 'chart', mode: 'quiz' }
        });
        CHART_LEGEND.items.forEach(c => {
          items.push({
            group: 'Chart',
            title: c.title,
            subtitle: '1:500k legend · ' + (c.category || ''),
            hay: (c.title + ' ' + (c.tags || '') + ' ' + (c.what || '') + ' ' + (c.appearance || '') + ' chart legend half million').toLowerCase(),
            go: { name: 'chart', id: c.id }
          });
        });
      }
    } catch (_) {}

    return items;
  }

  function match(items, q) {
    const needle = (q || '').trim().toLowerCase();
    if (!needle) return [];
    const parts = needle.split(/\s+/).filter(Boolean);
    return items.filter(it => parts.every(p => it.hay.includes(p))).slice(0, 60);
  }

  function groupOrder(g) {
    return ({ Skills: 0, Lessons: 1, Flashcards: 2, Exams: 3, Glossary: 4, Chart: 5 }[g] ?? 9);
  }

  function view(ctx) {
    ctx.setNav('home');
    ctx.titleEl.textContent = 'Search';
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const initial = (ctx.route && ctx.route.q) ? String(ctx.route.q) : '';

    return `
      <div class="search-page">
        <div class="search-bar-wrap sticky-tools">
          <input type="search" id="app-search-q" class="search-input search-input-lg"
            placeholder="Search theory, checklists, abbreviations…"
            value="${esc(initial)}" autocomplete="off" enterkeyhint="search" autofocus />
        </div>
        <div id="app-search-results" class="search-results">
          ${initial
            ? ''
            : `<div class="empty-state">Type to search theory, checklists, emergencies, abbreviations…</div>`}
        </div>
      </div>`;
  }

  function renderResults(hits) {
    if (!hits.length) {
      return `<div class="empty-state">No matches. Try a shorter word (e.g. MATZ, FREDA, EFATO).</div>`;
    }
    const groups = {};
    hits.forEach(h => {
      (groups[h.group] || (groups[h.group] = [])).push(h);
    });
    const keys = Object.keys(groups).sort((a, b) => groupOrder(a) - groupOrder(b));
    return keys.map(g => `
      <div class="section-label">${esc(g)}</div>
      ${groups[g].map((h, i) => `
        <button type="button" class="card card-tap search-hit" data-search-idx="${esc(g + ':' + i)}"
          data-go-name="${esc(h.go.name)}"
          data-go-id="${esc(h.go.id || '')}"
          data-go-q="${esc(h.go.q || '')}"
          data-go-mode="${esc(h.go.mode || '')}">
          <div class="info" style="flex:1;min-width:0">
            <h3>${esc(h.title)}</h3>
            <div class="meta search-hit-sub">${esc(h.subtitle)}</div>
          </div>
          <div class="chev">›</div>
        </button>`).join('')}
    `).join('');
  }

  function bind(ctx) {
    const input = document.getElementById('app-search-q');
    const out = document.getElementById('app-search-results');
    const index = buildIndex();
    let timer = null;

    function run() {
      const q = input ? input.value : '';
      if (!q.trim()) {
        if (out) {
          out.innerHTML = `<div class="empty-state">Type to search theory, checklists, emergencies, abbreviations…</div>`;
        }
        return;
      }
      const hits = match(index, q);
      if (out) out.innerHTML = renderResults(hits);
      wireHits();
    }

    function navigate(btn) {
      const name = btn.dataset.goName;
      const id = btn.dataset.goId || undefined;
      const q = btn.dataset.goQ || undefined;
      const mode = btn.dataset.goMode || undefined;
      if (name === 'flash-start' && id && typeof ctx.startFlash === 'function') {
        ctx.startFlash(id);
        return;
      }
      if (name === 'frtol-drills' && mode && typeof FrtolDrillsUI !== 'undefined' && FrtolDrillsUI.setCat) {
        FrtolDrillsUI.setCat(mode);
      }
      if (name === 'c42' && mode && typeof ctx.setC42Mode === 'function') {
        ctx.setC42Mode(mode);
      }
      const params = {};
      if (id) params.id = id;
      if (q) params.q = q;
      if (mode) params.mode = mode;
      ctx.go(name, params);
    }

    function wireHits() {
      document.querySelectorAll('.search-hit').forEach(btn => {
        btn.addEventListener('click', () => navigate(btn));
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(run, 130);
      });
      try { input.focus(); } catch (_) {}
      if (input.value.trim()) run();
    }
  }

  return { view, bind, buildIndex };
})();
