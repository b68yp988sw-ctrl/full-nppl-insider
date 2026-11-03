/* Live weather for airfield pages (v11).
 * METAR/TAF: MET Norway tafmetar API (api.met.no, keyless, CORS, CC BY 4.0).
 *   aviationweather.gov was tested first but sends no Access-Control-Allow-Origin header, so browsers block it.
 * Site forecast: Open-Meteo (api.open-meteo.com, keyless, CORS, CC BY 4.0), model ukmo_seamless (Met Office UKV + global).
 * Fetched only when a page is opened or Refresh is tapped. Memory cache ~10 min. Never cached by the service worker. */
(function () {
  'use strict';
  const TTL = 10 * 60 * 1000;
  const MEM = new Map();
  // METAR stations near the NPPL airfields (coords: aviationweather.gov station data).
  const ST = {
    EGTK: ['Oxford', 51.838, -1.317], EGGW: ['Luton', 51.875, -0.368], EGTC: ['Cranfield', 52.072, -0.617],
    EGWU: ['Northolt', 51.549, -0.417], EGLL: ['Heathrow', 51.477, -0.461], EGLF: ['Farnborough', 51.28, -0.773],
    EGVO: ['Odiham', 51.239, -0.945], EGKB: ['Biggin Hill', 51.33, 0.033], EGSS: ['Stansted', 51.881, 0.223],
    EGLC: ['London City', 51.505, 0.055], EGVN: ['Brize Norton', 51.758, -1.578], EGKK: ['Gatwick', 51.148, -0.19],
    EGSC: ['Cambridge', 52.205, 0.175], EGBJ: ['Gloucestershire', 51.892, -2.161]
  };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const R = Math.PI / 180;
  const pad = n => String(n).padStart(2, '0');
  const p3 = n => String(Math.round(n)).padStart(3, '0');
  const fmtL = dt => dt.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
  const fmtU = dt => pad(dt.getUTCHours()) + ':' + pad(dt.getUTCMinutes());
  const dayL = dt => dt.toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'short' });

  function distBrg(lat1, lon1, lat2, lon2) {
    const p1 = lat1 * R, p2 = lat2 * R, dl = (lon2 - lon1) * R;
    const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
    const nm = 2 * 3440.065 * Math.asin(Math.sqrt(a));
    const y = Math.sin(dl) * Math.cos(p2), x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    const b = (Math.atan2(y, x) / R + 360) % 360;
    return { nm, brg: b, pt: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'][Math.round(b / 22.5) % 16] };
  }

  // ddhhmm (UTC) -> Date, choosing the month that puts it nearest to now.
  function dToDate(dd, hh, mm) {
    const n = new Date(); let best = null;
    for (const off of [-1, 0, 1]) {
      const t = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + off, dd, hh, mm || 0));
      if (t.getUTCDate() !== dd && hh !== 24) continue;
      if (!best || Math.abs(t - n) < Math.abs(best - n)) best = t;
    }
    return best;
  }

  const WX = { MI: 'shallow', BC: 'patches of', PR: 'partial', DR: 'drifting', BL: 'blowing', SH: 'showers of', TS: 'thunderstorm with', FZ: 'freezing',
    DZ: 'drizzle', RA: 'rain', SN: 'snow', SG: 'snow grains', PL: 'ice pellets', GR: 'hail', GS: 'small hail', UP: 'unknown precipitation',
    BR: 'mist', FG: 'fog', FU: 'smoke', VA: 'volcanic ash', DU: 'dust', SA: 'sand', HZ: 'haze', PO: 'dust whirls', SQ: 'squalls', FC: 'funnel cloud', SS: 'sandstorm', DS: 'duststorm' };
  function wxText(t) {
    const m = /^(\+|-|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)*)((?:DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)*)$/.exec(t);
    if (!m || (!m[2] && !m[3])) return null;
    const parts = [];
    if (m[1] === '-') parts.push('light'); else if (m[1] === '+') parts.push('heavy');
    (m[2].match(/../g) || []).forEach(x => parts.push(WX[x]));
    (m[3].match(/../g) || []).forEach((x, i) => parts.push((i ? 'and ' : '') + WX[x]));
    if (m[1] === 'VC') parts.push('nearby');
    return parts.join(' ').replace('showers of thunderstorm', 'thunderstorm');
  }
  const COV = { FEW: 'Few clouds', SCT: 'Scattered cloud', BKN: 'Broken cloud', OVC: 'Overcast' };
  const PTW = { N: 'north', NNE: 'north-north-east', NE: 'north-east', ENE: 'east-north-east', E: 'east', ESE: 'east-south-east', SE: 'south-east', SSE: 'south-south-east', S: 'south', SSW: 'south-south-west', SW: 'south-west', WSW: 'west-south-west', W: 'west', WNW: 'west-north-west', NW: 'north-west', NNW: 'north-north-west' };

  // Decode the weather groups shared by METAR and TAF.
  function groups(toks) {
    const o = { wind: null, vis: null, wx: [], cloud: [], cavok: false, other: [] };
    for (const t of toks) {
      let m;
      if ((m = /^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?(KT|MPS)$/.exec(t))) {
        const k = m[4] === 'MPS' ? 1.944 : 1;
        o.wind = { dir: m[1] === 'VRB' ? null : +m[1], spd: Math.round(+m[2] * k), gust: m[3] ? Math.round(+m[3] * k) : null };
      } else if ((m = /^(\d{3})V(\d{3})$/.exec(t)) && o.wind) { o.wind.from = +m[1]; o.wind.to = +m[2]; }
      else if (t === 'CAVOK') { o.cavok = true; o.vis = 10000; }
      else if ((m = /^(\d{4})(NDV)?$/.exec(t)) && o.vis == null) o.vis = +m[1] === 9999 ? 10000 : +m[1];
      else if ((m = /^(\d{4})([NSEW]{1,2})$/.exec(t))) o.other.push(`minimum visibility ${+m[1]} m to the ${PTW[m[2]] || m[2]}`);
      else if ((m = /^(FEW|SCT|BKN|OVC)(\d{3}|\/\/\/)(CB|TCU|\/\/\/)?$/.exec(t))) o.cloud.push({ c: m[1], ft: m[2] === '///' ? null : +m[2] * 100, t: m[3] && m[3] !== '///' ? m[3] : '' });
      else if ((m = /^VV(\d{3}|\/\/\/)$/.exec(t))) o.cloud.push({ c: 'VV', ft: m[1] === '///' ? null : +m[1] * 100, t: '' });
      else if (/^(NCD|NSC|SKC|CLR)$/.test(t)) o.cloud.push({ c: t });
      else if (t === 'NSW') o.wx.push('no significant weather (NSW)');
      else if (wxText(t)) o.wx.push(wxText(t) + ' (' + t + ')');
    }
    return o;
  }
  function windTxt(w) {
    if (!w) return null;
    if (!w.spd) return 'Calm';
    let s = (w.dir == null ? 'Variable direction (VRB)' : 'From ' + p3(w.dir) + '° true') + ' at ' + w.spd + ' knots (kt)';
    if (w.gust) s += ', gusts (G) to ' + w.gust + ' knots';
    if (w.from != null) s += `, direction varying between ${p3(w.from)}° and ${p3(w.to)}°`;
    return s;
  }
  function visTxt(v, cavok) {
    if (v == null) return null;
    if (cavok) return '10 km or more, no cloud below 5,000 feet and no significant weather: ceiling and visibility OK (CAVOK)';
    const code = String(v >= 10000 ? 9999 : v).padStart(4, '0');
    return (v >= 10000 ? '10 km or more' : v >= 5000 ? (v / 1000) + ' km' : v.toLocaleString('en-GB') + ' metres') + ` (${code})`;
  }
  function cloudTxt(cl) {
    if (!cl.length) return null;
    const h = c => c.ft == null ? 'unknown height' : c.ft.toLocaleString('en-GB') + ' feet';
    return cl.map(c => c.c === 'NCD' ? 'No cloud detected (NCD)' : c.c === 'NSC' ? 'No significant cloud (NSC)' : /SKC|CLR/.test(c.c) ? `Sky clear (${c.c})`
      : c.c === 'VV' ? `Sky obscured, vertical visibility (VV) ${h(c)}`
      : `${COV[c.c]} (${c.c}) at ${h(c)}${c.t === 'CB' ? ', cumulonimbus (CB)' : c.t === 'TCU' ? ', towering cumulus (TCU)' : ''}`).join(' · ');
  }
  const ceiling = cl => { const c = cl.filter(x => /BKN|OVC|VV/.test(x.c) && x.ft != null).map(x => x.ft); return c.length ? Math.min(...c) : null; };
  function category(vis, ceil) {
    const v = vis == null ? 99999 : vis, c = ceil == null ? 99999 : ceil;
    if (v < 1600 || c < 500) return 'LIFR';
    if (v < 4800 || c < 1000) return 'IFR';
    if (v <= 8000 || c <= 3000) return 'MVFR';
    return 'VFR';
  }

  function parseMetar(raw) {
    const toks = raw.replace(/=\s*$/, '').trim().split(/\s+/);
    let i = 0; if (/^(METAR|SPECI)$/.test(toks[i])) i++;
    const icao = toks[i++]; const tm = /^(\d{2})(\d{2})(\d{2})Z$/.exec(toks[i]) ? toks[i++] : null;
    const time = tm ? dToDate(+tm.slice(0, 2), +tm.slice(2, 4), +tm.slice(4, 6)) : null;
    let end = toks.findIndex((t, k) => k >= i && /^(NOSIG|TEMPO|BECMG|RMK)$/.test(t)); if (end < 0) end = toks.length;
    const body = toks.slice(i, end).filter(t => !/^(AUTO|COR)$/.test(t));
    const o = groups(body);
    for (const t of body) {
      let m;
      if ((m = /^(M?\d{2})\/(M?\d{2})?$/.exec(t))) { o.temp = +m[1].replace('M', '-'); o.dew = m[2] != null ? +m[2].replace('M', '-') : null; }
      else if ((m = /^Q(\d{4})$/.exec(t))) o.qnh = +m[1];
    }
    o.trend = toks.slice(end).join(' ');
    o.icao = icao; o.time = time; o.raw = raw.replace(/=\s*$/, '').trim();
    o.ceil = o.cavok ? null : ceiling(o.cloud);
    o.cat = category(o.vis, o.ceil);
    return o;
  }

  function parseTaf(raw) {
    const toks = raw.replace(/=\s*$/, '').trim().split(/\s+/);
    let i = 0; while (/^(TAF|AMD|COR)$/.test(toks[i])) i++;
    i++; if (/Z$/.test(toks[i])) i++;
    const per = s => { const m = /^(\d{2})(\d{2})\/(\d{2})(\d{2})$/.exec(s); return m ? [dToDate(+m[1], +m[2], 0), dToDate(+m[3], +m[4], 0)] : null; };
    const fmP = p => p ? `${dayL(p[0])} ${fmtL(p[0])}–${dayL(p[1]) !== dayL(p[0]) ? dayL(p[1]) + ' ' : ''}${fmtL(p[1])}` : '';
    const segs = []; let cur = { lab: 'Main forecast', toks: [] };
    let k = i; const p0 = per(toks[k]); if (p0) { cur.lab = 'Main forecast ' + fmP(p0); k++; }
    for (; k < toks.length; k++) {
      const t = toks[k]; let m;
      if ((m = /^FM(\d{2})(\d{2})(\d{2})$/.exec(t))) { segs.push(cur); cur = { lab: 'From (FM) ' + dayL(dToDate(+m[1], +m[2], +m[3])) + ' ' + fmtL(dToDate(+m[1], +m[2], +m[3])), toks: [] }; }
      else if (/^(TEMPO|BECMG|PROB30|PROB40)$/.test(t)) {
        segs.push(cur);
        let lab = t === 'TEMPO' ? 'Temporarily (TEMPO)' : t === 'BECMG' ? 'Becoming (BECMG)' : (t.slice(4) + '% chance (' + t + ')');
        if (/^PROB/.test(t) && toks[k + 1] === 'TEMPO') { lab += ', temporarily (TEMPO)'; k++; }
        const p = per(toks[k + 1]); if (p) { lab += ' ' + fmP(p); k++; }
        cur = { lab, toks: [] };
      } else cur.toks.push(t);
    }
    segs.push(cur);
    return segs.filter(s => s.toks.length).map(s => {
      const g = groups(s.toks);
      const bits = [windTxt(g.wind) && 'wind ' + windTxt(g.wind).replace(/^From/, 'from'), g.vis != null && 'visibility ' + visTxt(g.vis, g.cavok), g.wx.length && g.wx.join(', '), !g.cavok && cloudTxt(g.cloud)].filter(Boolean);
      return { lab: s.lab, txt: bits.join(' · ') || s.toks.join(' ') };
    });
  }

  // Runway true headings from AIP threshold co-ordinates (AIRFIELD_GEO, metres E/N of ARP).
  function runways(icao) {
    const g = typeof AIRFIELD_GEO !== 'undefined' && AIRFIELD_GEO[icao];
    if (!g || !g.rwy) return [];
    // Prefer the AIP AD 2.12 true bearing for each runway end; fall back to the threshold geometry.
    const dd = typeof AIRFIELD_DETAIL !== 'undefined' && AIRFIELD_DETAIL[icao];
    const aip = id => { const r = dd && (dd.runways || []).find(x => x.d === id); return r && typeof r.brg === 'number' ? r.brg : null; };
    return g.rwy.map(r => { const h = (Math.atan2(r.p2[0] - r.p1[0], r.p2[1] - r.p1[1]) / R + 360) % 360;
      const ha = aip(r.a), hb = aip(r.b);
      return [{ id: r.a, hdg: ha != null ? ha : h }, { id: r.b, hdg: hb != null ? hb : (ha != null ? (ha + 180) % 360 : (h + 180) % 360) }]; });
  }
  function comps(w, hdg) {
    const a = (w.dir - hdg) * R;
    return { head: w.spd * Math.cos(a), cross: w.spd * Math.sin(a), xg: w.gust ? w.gust * Math.abs(Math.sin(a)) : null };
  }
  function xwindHtml(icao, w, srcIcao) {
    const pairs = runways(icao);
    if (!w || !pairs.length) return '';
    const note = srcIcao !== icao ? ` using the ${esc(srcIcao)} wind` : '';
    if (!w.spd) return `<div class="wx-sub"><b>Runway wind components</b>${note}: calm, no crosswind.</div>`;
    if (w.dir == null) return `<div class="wx-sub"><b>Runway wind components</b>${note}: wind direction variable (VRB) at ${w.spd} knots (kt), so the crosswind could be up to ${w.gust || w.spd} knots on any runway.</div>`;
    let warn = false;
    const rows = pairs.map(pr => {
      const [a, b] = pr.map(e => ({ e, c: comps(w, e.hdg) }));
      const best = a.c.head >= b.c.head ? a : b;
      const c = best.c, x = Math.abs(c.cross), side = c.cross > 0.5 ? 'from the right' : c.cross < -0.5 ? 'from the left' : '';
      let xv = null;
      if (w.from != null) { const span = ((w.to - w.from) + 360) % 360; let mx = 0; for (let d = 0; d <= span; d += 5) mx = Math.max(mx, Math.abs(Math.sin(((w.from + d) - best.e.hdg) * R))); xv = (w.gust || w.spd) * mx; }
      const xmax = Math.max(x, c.xg || 0, xv || 0); if (xmax > 15) warn = true;
      const hw = c.head >= 0 ? `${Math.round(c.head)} knots headwind` : `${Math.round(-c.head)} knots tailwind`;
      return `<tr><td><b>${esc(best.e.id)}</b> · ${p3(best.e.hdg)}° true heading</td><td>${hw}</td><td class="${xmax > 15 ? 'wx-bad' : ''}">${Math.round(x)} knots ${side}${c.xg && Math.round(c.xg) > Math.round(x) ? ` <span class="meta">(${Math.round(c.xg)} knots in gusts)</span>` : ''}${xv != null && Math.round(xv) > Math.round(x) ? ` <span class="meta">(up to ${Math.round(xv)} knots as the wind direction varies)</span>` : ''}</td></tr>`;
    }).join('');
    return `<div class="wx-sub"><b>Runway wind components</b>${note} <span class="meta">(into-wind end of each runway)</span></div>
      <table class="af-table wx-x"><tr><th>Runway</th><th>Headwind or tailwind</th><th>Crosswind</th></tr>${rows}</table>
      ${warn ? `<p class="wx-warn">Crosswind above 15 kt, a typical microlight limit. Check your aircraft’s limit.</p>` : ''}
      <p class="wx-small wx-note">Runway numbers come from the magnetic heading, rounded to 10°. METAR winds are true; ATIS and tower winds are magnetic. These figures use true for both.</p>`;
  }

  function ago(dt) {
    const m = Math.round((Date.now() - dt) / 60000);
    if (m < 1) return 'just now';
    if (m < 90) return m + (m === 1 ? ' minute ago' : ' minutes ago');
    const h = Math.floor(m / 60); return `${h} hour${h > 1 ? 's' : ''} ${m % 60} minutes ago`;
  }

  async function getText(url, force) {
    const c = MEM.get(url);
    if (!force && c && Date.now() - c.at < TTL) return c;
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 12000);
    try {
      const r = await fetch(url, { cache: 'no-store', signal: ctl.signal });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const v = { at: Date.now(), val: await r.text() }; MEM.set(url, v); return v;
    } catch (e) { if (c) return Object.assign({ stale: true }, c); throw e; }
    finally { clearTimeout(to); }
  }
  function latest(txt, isTaf) {
    const lines = txt.split(/\n/).map(s => s.trim()).filter(s => /^[A-Z]{4}\s/.test(s) || /^(METAR|SPECI|TAF)\s/.test(s));
    let best = null, bt = 0;
    for (const l of lines) {
      const m = /\b(\d{2})(\d{2})(\d{2})Z\b/.exec(l); if (!m) continue;
      const t = dToDate(+m[1], +m[2], +m[3]); if (t && +t >= bt) { bt = +t; best = l; }
    }
    return best;
  }
  const MN = 'https://api.met.no/weatherapi/tafmetar/1.0/';
  async function station(icao, force) {
    const m = await getText(MN + 'metar.txt?icao=' + icao, force);
    const raw = latest(m.val);
    if (!raw) return null;
    let taf = null;
    try { const t = await getText(MN + 'taf.txt?icao=' + icao, force); taf = latest(t.val, true); } catch (e) { /* TAF optional */ }
    return { metar: parseMetar(raw), taf, fetched: m.at, stale: m.stale };
  }

  const CATW = { VFR: 'Visual flight rules (VFR)', MVFR: 'Marginal visual flight rules (MVFR)', IFR: 'Instrument flight rules (IFR)', LIFR: 'Low instrument flight rules (LIFR)' };
  function catBadge(c) { return `<div class="wx-catline"><span class="meta">Flight category, US-style:</span> <span class="wx-cat wx-cat-${c.toLowerCase()}">${CATW[c] || c}</span></div>`; }
  function metarCard(s, label) {
    const o = s.metar;
    const rows = [
      ['Wind', windTxt(o.wind)], ['Visibility', visTxt(o.vis, o.cavok)], ['Weather', o.wx.join(', ')],
      ['Cloud (feet above the airfield)', o.cavok ? 'No cloud below 5,000 feet' : cloudTxt(o.cloud)], ['Cloud base (ceiling)', o.ceil != null ? o.ceil.toLocaleString('en-GB') + ' feet above the airfield' : (o.cloud.length || o.cavok ? 'No ceiling (no broken or overcast layer)' : null)],
      ['Temperature / dew point', o.temp != null ? `${o.temp}°C / ${o.dew != null ? o.dew + '°C' : '–'}` : null], ['Pressure setting (QNH)', o.qnh ? o.qnh + ' hPa' : null],
      ['Next 2 hours (trend)', o.trend ? (o.trend === 'NOSIG' ? 'No significant change expected (NOSIG)' : parseTaf('TAF XXXX ' + o.trend).map(x => x.lab + ': ' + x.txt).join(' · ') || o.trend) : null]
    ].filter(r => r[1]);
    const old = o.time && Date.now() - o.time > 75 * 60000;
    return `<div class="wx-card">
      <div class="wx-head"><div><div class="wx-l">${label}</div>
        <div class="wx-age${old ? ' wx-old' : ''}">${o.time ? `Observed at ${fmtU(o.time)} Coordinated Universal Time (UTC), ${fmtL(o.time)} UK time · <b>${ago(o.time)}</b>` : 'Observation time unknown'}${old ? ' · old report' : ''}</div></div></div>${catBadge(o.cat)}
      <code class="wx-raw">${esc(o.raw)}</code>
      <table class="af-table wx-dec">${rows.map(r => `<tr><th>${r[0]}</th><td>${esc(r[1])}</td></tr>`).join('')}</table>
      ${s.taf ? `<div class="wx-sub"><b>TAF</b> <span class="meta">(times are UK local time)</span></div><code class="wx-raw">${esc(s.taf)}</code>
        <ul class="wx-taf">${parseTaf(s.taf).map(x => `<li><b>${esc(x.lab)}:</b> ${esc(x.txt)}</li>`).join('')}</ul>` : `<p class="meta wx-small">No TAF issued for ${esc(o.icao)} right now.</p>`}
    </div>`;
  }

  async function forecast(lat, lon, force) {
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m,wind_speed_950hPa,wind_direction_950hPa,cloud_cover,cloud_cover_low,precipitation,visibility&models=ukmo_seamless&wind_speed_unit=kn&forecast_hours=12&timezone=Europe%2FLondon`;
    const r = await getText(u, force);
    return { j: JSON.parse(r.val), at: r.at };
  }
  function fcHtml(f, inDetails) {
    const h = f.j.hourly; if (!h || !h.time) return '';
    const n = (v, d) => v == null ? '–' : d(v);
    const wd = (d, s, g) => d == null || s == null ? '–' : `${p3(Math.round(d / 10) * 10 % 360 || 360)}° ${Math.round(s)}${g != null && g - s >= 5 ? `<div class="meta">gusts ${Math.round(g)}</div>` : ''}`;
    const rows = h.time.map((t, i) => `<tr><th>${t.slice(11, 16)}</th><td>${wd(h.wind_direction_10m[i], h.wind_speed_10m[i], h.wind_gusts_10m[i])}</td><td>${wd(h.wind_direction_950hPa[i], h.wind_speed_950hPa[i])}</td><td>${n(h.precipitation[i], v => v ? v.toFixed(1) : '0')}</td><td>${n(h.visibility[i], v => v >= 10000 ? '10 km or more' : (v / 1000).toFixed(1) + ' km')}</td></tr>`).join('');
    return `<div class="wx-card">${inDetails ? '' : '<div class="wx-l">Site forecast, next 12 hours</div>'}
      <div class="wx-age">Fetched ${fmtL(new Date(f.at))} · times are UK local time</div>
      <div class="wx-scroll"><table class="af-table wx-fc"><tr><th>Time</th><th>Surface wind, knots (kt)</th><th>Wind at 2,000 feet, knots</th><th>Rain, millimetres per hour</th><th title="10 km or more is 9999 in a METAR">Visibility</th></tr>${rows}</table></div>
      <p class="meta wx-small">Computer model forecast for the airfield position, not an observation: Open-Meteo using Met Office models (UK high-resolution and global). Wind is direction in degrees true, then speed in knots. 2,000 feet is approximated by the 950 hectopascal (hPa) pressure level. Rain in millimetres (mm) per hour. Visibility 10 km or more is written 9999 in a METAR. Cloud cover is not shown because this model gives no cloud base.</p></div>`;
  }

  async function load(el, force) {
    const icao = el.dataset.icao, lat = +el.dataset.lat, lon = +el.dataset.lon;
    const body = el.querySelector('.wx-body');
    if (navigator.onLine === false) { body.innerHTML = `<p class="wx-off">Live weather needs signal.</p>`; return; }
    body.innerHTML = `<p class="meta">Loading live weather…</p>`;
    const own = !!ST[icao];
    const cand = own ? [icao] : Object.keys(ST).map(k => Object.assign({ k }, distBrg(lat, lon, ST[k][1], ST[k][2]))).sort((a, b) => a.nm - b.nm).slice(0, 3).map(x => x.k);
    let s = null, used = null, err = null;
    for (const k of cand) { try { s = await station(k, force); if (s) { used = k; break; } } catch (e) { err = e; } }
    let f = null; try { f = await forecast(lat, lon, force); } catch (e) { err = err || e; }
    if (!document.body.contains(el)) return;
    let html = '';
    if (s) {
      if (own) html += metarCard(s, `METAR ${esc(icao)} (this airfield)`);
      else {
        const db = distBrg(lat, lon, ST[used][1], ST[used][2]);
        html += `<p class="wx-near">${esc(icao)} has no METAR. <b>Nearest official report: ${esc(used)} ${esc(ST[used][0])}, ${Math.round(db.nm)} nautical miles (NM) ${PTW[db.pt]} (${db.pt})</b>. Conditions at the airfield may differ.</p>`;
      }
      html += xwindHtml(icao, s.metar.wind, used);
      if (!own) html += metarCard(s, `METAR ${esc(used)} ${esc(ST[used][0])}`);
    } else html += `<p class="wx-off">${navigator.onLine === false ? 'Live weather needs signal.' : 'Could not load the METAR just now. Try Refresh.'}</p>`;
    if (f) html += own ? `<details class="wx-more"><summary>Site forecast, next 12 hours</summary>${fcHtml(f, true)}</details>` : fcHtml(f);
    else html += `<p class="meta">Site forecast unavailable just now.</p>`;
    if (s && s.stale) html = `<p class="wx-off">Could not refresh. Showing the last report with its age.</p>` + html;
    body.innerHTML = html;
    const st = el.querySelector('.wx-fetched'); if (st) st.textContent = 'Updated ' + fmtL(new Date(s ? s.fetched : Date.now())) + ' UK time';
    if (typeof Gloss !== 'undefined') Gloss.expand(el);
  }

  function mount(el) {
    if (!el || el.dataset.wxMounted) return;
    el.dataset.wxMounted = '1';
    const btn = el.querySelector('.wx-refresh');
    if (btn) btn.addEventListener('click', () => load(el, true));
    const on = () => { if (!document.body.contains(el)) { window.removeEventListener('online', on); window.removeEventListener('offline', on); return; } load(el, false); };
    window.addEventListener('online', on); window.addEventListener('offline', on);
    load(el, false);
  }

  function shell(icao, lat, lon) {
    return `<div id="af-wx" data-icao="${esc(icao)}" data-lat="${lat}" data-lon="${lon}">
      <div class="wx-bar"><span class="meta wx-fetched"></span><button type="button" class="btn btn-secondary wx-refresh">Refresh</button></div>
      <div class="wx-body"></div>
      <p class="wx-disc">Not an official briefing: check the Met Office and National Air Traffic Services (NATS) briefings before flight.</p>
      <p class="meta wx-small">METAR/TAF: MET Norway (api.met.no), CC BY 4.0. Forecast: Open-Meteo.com, CC BY 4.0. Fetched when you open this page; kept in memory for 10 minutes.</p>
    </div>`;
  }

  window.AirfieldWeather = { mount, shell, _t: { parseMetar, parseTaf, comps, distBrg, runways, category } };
})();
