/* localStorage progress for FULL NPPL INSIDER */
const Store = (() => {
  const KEY = 'full-nppl-insider-v1';
  const defaults = () => ({
    disclaimerOk: false,
    audioMode: false,
    lessonsDone: {},      // lessonId -> true
    flashKnown: {},       // cardId -> true
    flashUnknown: {},     // cardId -> true
    examHistory: [],      // {subject, score, total, pct, timed, at}
    computerUses: 0,
    pilotLog: [],         // flight log entries
    weakAreas: {},        // questionId -> { subject, wrong, right, q, lastAt }
    drillStats: {},       // optional drill results
    metDaily: { lastDate: null, streak: 0, doneDates: [] }
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      return { ...defaults(), ...JSON.parse(raw) };
    } catch {
      return defaults();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function update(fn) {
    const s = load();
    fn(s);
    save(s);
    return s;
  }

  function progressOverview(subjects, lessons) {
    const s = load();
    let totalLessons = 0, doneLessons = 0;
    subjects.forEach(sub => {
      const ls = lessons.filter(l => l.subject === sub.id);
      totalLessons += ls.length;
      doneLessons += ls.filter(l => s.lessonsDone[l.id]).length;
    });
    const known = Object.keys(s.flashKnown).length;
    const exams = s.examHistory.length;
    const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;
    return { totalLessons, doneLessons, known, exams, pct };
  }

  function subjectLessonPct(subjectId, lessons) {
    const s = load();
    const ls = lessons.filter(l => l.subject === subjectId);
    if (!ls.length) return 0;
    const done = ls.filter(l => s.lessonsDone[l.id]).length;
    return Math.round((done / ls.length) * 100);
  }

  /* ---- Pilot log helpers ---- */
  function logEntries() {
    return (load().pilotLog || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.depTime || '').localeCompare(a.depTime || ''));
  }

  function logSummary() {
    const entries = load().pilotLog || [];
    let minutes = 0, landings = 0;
    entries.forEach(e => {
      minutes += parseLogMinutes(e.totalTime);
      landings += (parseInt(e.landDay, 10) || 0) + (parseInt(e.landNight, 10) || 0);
    });
    return { entries: entries.length, hours: +(minutes / 60).toFixed(1), minutes, landings };
  }

  function parseLogMinutes(t) {
    if (!t) return 0;
    const s = String(t).trim();
    if (/^\d+:\d{1,2}$/.test(s)) {
      const [h, m] = s.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? Math.round(n * 60) : 0;
  }

  function addLogEntry(entry) {
    return update(s => {
      s.pilotLog = s.pilotLog || [];
      s.pilotLog.push({ id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7), ...entry });
    });
  }

  function updateLogEntry(id, patch) {
    return update(s => {
      s.pilotLog = (s.pilotLog || []).map(e => e.id === id ? { ...e, ...patch } : e);
    });
  }

  function deleteLogEntry(id) {
    return update(s => {
      s.pilotLog = (s.pilotLog || []).filter(e => e.id !== id);
    });
  }

  
  function recordExamWrong(review) {
    return update(s => {
      s.weakAreas = s.weakAreas || {};
      (review || []).forEach(r => {
        if (!r || !r.q) return;
        const id = r.q.id;
        const cur = s.weakAreas[id] || { subject: r.q.subject, wrong: 0, right: 0, q: r.q.q, lastAt: 0 };
        if (r.ok) cur.right = (cur.right || 0) + 1;
        else {
          cur.wrong = (cur.wrong || 0) + 1;
          cur.q = r.q.q;
          cur.subject = r.q.subject;
        }
        cur.lastAt = Date.now();
        s.weakAreas[id] = cur;
      });
    });
  }

  function weakList(limit) {
    const s = load();
    const entries = Object.entries(s.weakAreas || {}).map(([id, v]) => ({ id, ...v }));
    entries.sort((a, b) => (b.wrong - b.right) - (a.wrong - a.right) || (b.lastAt || 0) - (a.lastAt || 0));
    return entries.filter(e => (e.wrong || 0) > (e.right || 0)).slice(0, limit || 20);
  }

  function weakBySubject() {
    const list = weakList(100);
    const map = {};
    list.forEach(e => {
      map[e.subject] = map[e.subject] || [];
      map[e.subject].push(e);
    });
    return map;
  }

  function clearWeakItem(id) {
    return update(s => {
      if (s.weakAreas) delete s.weakAreas[id];
    });
  }

  function recordWeakRetest(id, passed) {
    return update(s => {
      s.weakAreas = s.weakAreas || {};
      const cur = s.weakAreas[id];
      if (!cur) return;
      if (passed) {
        cur.right = (cur.right || 0) + 2;
        cur.lastAt = Date.now();
        if ((cur.right || 0) >= (cur.wrong || 0)) delete s.weakAreas[id];
        else s.weakAreas[id] = cur;
      } else {
        cur.wrong = (cur.wrong || 0) + 1;
        cur.lastAt = Date.now();
        s.weakAreas[id] = cur;
      }
    });
  }

  function recordDrill(kind, id, ok) {
    return update(s => {
      s.drillStats = s.drillStats || {};
      const k = kind + ':' + id;
      const cur = s.drillStats[k] || { ok: 0, bad: 0 };
      if (ok) cur.ok++; else cur.bad++;
      s.drillStats[k] = cur;
    });
  }

  return {
    load, save, update, progressOverview, subjectLessonPct, KEY,
    logEntries, logSummary, parseLogMinutes, addLogEntry, updateLogEntry, deleteLogEntry,
    recordExamWrong, weakList, weakBySubject, recordDrill, clearWeakItem, recordWeakRetest
  };
})();
