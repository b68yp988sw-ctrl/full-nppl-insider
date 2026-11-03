/* Airfield opening hours: turns UK AIP AD 2.3 hours text (UTC, summer in brackets)
 * into UK local clock times, plus an "open now" check using Europe/London time.
 * Winter: local = UTC (GMT). Summer: local = UTC + 1 (BST). */
const AirfieldHours = (() => {
  const pad = n => String(n).padStart(2, '0');
  const toMin = s => parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(2), 10);
  const fmt = m => { m = ((m % 1440) + 1440) % 1440; return pad(Math.floor(m / 60)) + ':' + pad(m % 60); };
  const DAYS = { 'Mon-Sat': [1, 2, 3, 4, 5, 6], 'Mon-Fri': [1, 2, 3, 4, 5], 'Mon-Sun': [0, 1, 2, 3, 4, 5, 6], 'Sun & PH': [0], 'Sat-Sun': [0, 6] };
  const LABEL = { 'Mon-Sat': 'Monday–Saturday', 'Mon-Fri': 'Monday–Friday', 'Mon-Sun': 'Every day', 'Sun & PH': 'Sunday & public holidays', 'Sat-Sun': 'Saturday–Sunday' };
  const T = /(\d{4})-(\d{4}) \((\d{4})-(\d{4})\)/;

  function span(m) { // AIP UTC pairs -> local minutes
    return { winter: { open: toMin(m[1]), close: toMin(m[2]) }, summer: { open: toMin(m[3]) + 60, close: toMin(m[4]) + 60 } };
  }

  function parse(text) {
    const h = String(text || '').trim();
    const out = { h24: false, rows: [], extra: [], notes: [], raw: h };
    if (!h) return out;
    if (/^H24/.test(h)) {
      out.h24 = true;
      const tr = h.match(/training ([^)]*\))/i);
      if (tr) { const m = tr[1].match(T); if (m) out.extra.push(Object.assign({ label: 'Training flights' }, span(m))); }
      return out;
    }
    h.split(/;\s*/).forEach(seg => {
      const dm = seg.match(/^(Mon-Sat|Mon-Fri|Mon-Sun|Sun & PH|Sat-Sun)\s+/);
      const days = dm ? dm[1] : null;
      const m = seg.match(T);
      if (!m) return;
      const after = seg.slice(m.index + m[0].length);
      const ss = after.match(/^\s*or SS(\+\d+)?/);
      const row = Object.assign({
        label: days ? LABEL[days] : 'Every day', days: days ? DAYS[days] : DAYS['Mon-Sun'],
        sunset: ss ? (ss[1] ? parseInt(ss[1].slice(1), 10) : 0) : null
      }, span(m));
      if (/including public holidays/i.test(after)) row.label += ' (incl. public holidays)';
      out.rows.push(row);
      const ex = after.match(/Extended ([\d-]+ \([\d-]+\)) by arrangement/i);
      if (ex) { const em = ex[1].match(T); out.extra.push(Object.assign({ label: 'Extended, by arrangement' }, span(em))); }
      if (/and by arrangement/i.test(after)) out.notes.push('Other times by arrangement with the airfield.');
    });
    if (out.rows.some(r => /public holidays/.test(r.label) && r.days.length === 1)) out.notes.push('On a public holiday, use the Sunday & public holiday times.');
    return out;
  }

  /* London wall-clock now: {dow, min, bst, y, mo, d} */
  function londonNow(date) {
    const p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' })
      .formatToParts(date).forEach(x => { p[x.type] = x.value; });
    const y = +p.year, mo = +p.month, d = +p.day, hh = +p.hour, mm = +p.minute;
    const utcMin = date.getUTCHours() * 60 + date.getUTCMinutes();
    let off = (hh * 60 + mm) - utcMin; if (off < -720) off += 1440; if (off > 720) off -= 1440;
    return { y, mo, d, min: hh * 60 + mm, dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), bst: off === 60 };
  }

  /* Sunset (UTC ms) for a calendar date at lat/lon — NOAA-style sunrise equation, about ±2 min. */
  function sunsetUTC(y, mo, d, lat, lon) {
    const rad = Math.PI / 180;
    const jd = Date.UTC(y, mo - 1, d, 12) / 86400000 + 2440587.5;
    const n = Math.round(jd - 2451545.0 + 0.0008);
    const Js = n - lon / 360;
    const M = (357.5291 + 0.98560028 * Js) % 360;
    const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
    const L = (M + C + 180 + 102.9372) % 360;
    const Jt = 2451545.0 + Js + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
    const dec = Math.asin(Math.sin(L * rad) * Math.sin(23.4397 * rad));
    const cw = (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(dec)) / (Math.cos(lat * rad) * Math.cos(dec));
    if (cw < -1 || cw > 1) return null;
    return (Jt + Math.acos(cw) / rad / 360 - 2440587.5) * 86400000;
  }

  /* Status for now: which season, today's row, open/closed. */
  function status(text, lat, lon, date) {
    date = date || new Date();
    const P = parse(text);
    const L = londonNow(date);
    const season = L.bst ? 'summer' : 'winter';
    const res = { parsed: P, season, seasonLabel: L.bst ? 'Summer, British Summer Time (BST)' : 'Winter, Greenwich Mean Time (GMT)', now: fmt(L.min) };
    if (P.h24) { res.open = true; res.todayText = 'Open 24 hours'; return res; }
    const row = P.rows.find(r => r.days.indexOf(L.dow) >= 0);
    if (!row) { res.open = null; res.todayText = 'Check with airfield'; return res; }
    const t = row[season];
    let close = t.close, ssLocal = null;
    if (row.sunset != null && lat != null) {
      const ms = sunsetUTC(L.y, L.mo, L.d, lat, lon);
      if (ms != null) {
        const s = new Date(ms);
        ssLocal = s.getUTCHours() * 60 + s.getUTCMinutes() + (L.bst ? 60 : 0) + row.sunset;
        close = Math.min(close, ssLocal);
      }
    }
    res.row = row; res.openAt = fmt(t.open); res.closeAt = fmt(close); res.sunsetAt = ssLocal != null ? fmt(ssLocal) : null;
    res.sunsetRaw = ssLocal != null ? fmt(ssLocal - row.sunset) : null;
    res.open = L.min >= t.open && L.min < close;
    return res;
  }

  return { parse, status, sunsetUTC, londonNow, fmt };
})();
if (typeof globalThis !== 'undefined') globalThis.AirfieldHours = AirfieldHours;
if (typeof module !== 'undefined') module.exports = AirfieldHours;
