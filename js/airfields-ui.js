/* Saved airfield quick cards — localStorage CRUD */
const AirfieldsUI = (() => {
  function key() {
    return (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.storageKey) || 'full-nppl-airfields-v1';
  }

  function seed() {
    return (typeof AIRFIELDS_SEED !== 'undefined' ? AIRFIELDS_SEED : []).map(a => ({ ...a, freqs: { ...(a.freqs || {}) } }));
  }

  function seedVersion() {
    return (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.seedVersion) || 1;
  }

  /* Storage key bumped (v2 -> v3) so existing users get the new seed cards.
     Carried over from older keys (read-only; old keys are never written, so a rollback still works):
     - custom cards the user added;
     - seed cards the user edited (detected by comparing with the old live v2 seed);
     - seed cards the user deleted stay deleted.
     Unedited old seed cards are replaced by the updated, source-checked versions. */
  const V2_SEED_SIG = {"egtb":"1whnoik","egld":"1g2lcqr","egtr":"1k3ej0d","eglm":"1f9di2a","egtf":"1epwbm3","eghp":"jredad","turweston":"bcf7zi","hinton":"d920vn","bicester":"1irt0tv","amersham-local":"ucttok"};
  const SIG_FIELDS = ['icao', 'name', 'area', 'runway', 'ppr', 'notes', 'circuit', 'tags'];
  function sig(a) {
    const f = a.freqs || {};
    const str = JSON.stringify(SIG_FIELDS.map(k => String(a[k] == null ? '' : a[k]).trim())
      .concat(['afis', 'atis', 'other'].map(k => String(f[k] == null ? '' : f[k]).trim())));
    let x = 5381;
    for (let i = 0; i < str.length; i++) x = ((x * 33) ^ str.charCodeAt(i)) >>> 0;
    return x.toString(36);
  }

  function migrate() {
    const base = seed();
    const legacy = (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.legacyKeys) || [];
    const seen = new Set();
    const extras = [];
    const edited = {};
    const deleted = new Set();
    legacy.forEach(k => {
      try {
        const old = JSON.parse(localStorage.getItem(k) || 'null');
        const items = (old && old.items) || [];
        if (k === 'full-nppl-airfields-v2' && items.length) {
          const have = new Set(items.map(a => a && a.id));
          Object.keys(V2_SEED_SIG).forEach(id => { if (!have.has(id)) deleted.add(id); });
        }
        items.forEach(a => {
          if (!a || !a.id || seen.has(a.id)) return;
          seen.add(a.id);
          if (V2_SEED_SIG[a.id]) {
            if (sig(a) !== V2_SEED_SIG[a.id]) edited[a.id] = a;
          } else if (!base.some(b => b.id === a.id)) {
            extras.push(a);
          }
        });
      } catch (_) { /* ignore */ }
    });
    const items = base.filter(a => !deleted.has(a.id)).map(a => edited[a.id] || a);
    return { items: extras.concat(items), seeded: true, seedVersion: seedVersion() };
  }

  function load() {
    try {
      const raw = localStorage.getItem(key());
      if (!raw) {
        const s = migrate();
        localStorage.setItem(key(), JSON.stringify(s));
        return s;
      }
      const data = JSON.parse(raw);
      if (!data.items || !data.items.length) {
        data.items = seed();
        data.seeded = true;
        data.seedVersion = seedVersion();
        localStorage.setItem(key(), JSON.stringify(data));
      } else if ((data.seedVersion || 0) < seedVersion()) {
        const have = new Set(data.items.map(a => a.id));
        // Seed v3: replace cards the user never edited with the corrected, AIP-checked versions.
        const prev = (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.prevSeedSig) || {};
        const fresh = Object.fromEntries(seed().map(a => [a.id, a]));
        data.items = data.items.map(a => (a && prev[a.id] && fresh[a.id] && sig(a) === prev[a.id]) ? fresh[a.id] : a);
        seed().forEach(a => { if (!have.has(a.id)) data.items.push(a); });
        data.seedVersion = seedVersion();
        localStorage.setItem(key(), JSON.stringify(data));
      }
      return data;
    } catch {
      return { items: seed(), seeded: true };
    }
  }

  function save(data) {
    localStorage.setItem(key(), JSON.stringify(data));
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function all() {
    return load().items || [];
  }

  function get(id) {
    return all().find(a => a.id === id) || null;
  }

  function upsert(card) {
    const data = load();
    const i = data.items.findIndex(a => a.id === card.id);
    if (i >= 0) data.items[i] = card;
    else data.items.unshift(card);
    save(data);
  }

  function remove(id) {
    const data = load();
    data.items = data.items.filter(a => a.id !== id);
    save(data);
  }

  function search(q) {
    const s = (q || '').trim().toLowerCase();
    if (!s) return all();
    return all().filter(a => {
      const hay = [a.icao, a.name, a.area, a.runway, a.ppr, a.notes, a.tags,
        a.freqs && a.freqs.afis, a.freqs && a.freqs.atis, a.freqs && a.freqs.other, detailHay(a)]
        .join(' ').toLowerCase();
      return hay.includes(s);
    });
  }

  /* ---------- Detail sheets (data/airfields-detail.js + data/airfields-geo.js) ---------- */
  function detailFor(a) {
    if (!a || !a.icao || typeof AIRFIELD_DETAIL === 'undefined') return null;
    return AIRFIELD_DETAIL[String(a.icao).toUpperCase()] || null;
  }
  function detailHay(a) {
    const d = detailFor(a);
    if (!d) return '';
    return [d.atsType, d.tags, d.squawk, (d.ats || []).map(x => x.svc + ' ' + x.cs + ' ' + x.f).join(' '),
      (d.runways || []).map(r => r.d + ' ' + r.surf + ' ' + r.cct).join(' ')].join(' ');
  }
  const CWC = 'Check with airfield';
  function val(v) { return (v == null || v === '') ? `<span class="af-cwc">${CWC}</span>` : esc(v); }
  function link(u, label) {
    if (!u || !/^https?:\/\//.test(u)) return val(u);
    return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(label || u.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>`;
  }
  function fmtLatLon(n) { return Number(n).toFixed(5); }
  function satLinks(d) {
    const la = fmtLatLon(d.lat), lo = fmtLatLon(d.lon);
    return `
      <div class="af-sat-links">
        <a class="btn btn-secondary" target="_blank" rel="noopener" href="https://www.google.com/maps/@${la},${lo},15z/data=!3m1!1e3">${ic('pin')}Google Maps</a>
        <a class="btn btn-secondary" target="_blank" rel="noopener" href="https://maps.apple.com/?ll=${la},${lo}&t=k&z=15">${ic('pin')}Apple Maps</a>
      </div>`;
  }

  /* Original ground diagram drawn from AIP threshold co-ordinates + OSM layout. */
  // What the "tower" building is for this airfield, from the published ATS units (not the free-text summary).
  function svcBuilding(d) {
    const svcs = (d.ats || []).map(x => String(x.svc || '').toUpperCase());
    if (svcs.includes('TWR')) return { short: 'TWR', name: 'ATC tower' };
    if (svcs.includes('AFIS')) return svcs.includes('A/G') ? { short: 'AFIS', name: 'AFIS / A/G radio building' } : { short: 'AFIS', name: 'AFIS building' };
    if (svcs.includes('A/G')) return { short: 'A/G', name: 'A/G radio building' };
    return { short: 'ATS', name: 'ATS building' };
  }

  function diagram(icao, d) {
    const g = (typeof AIRFIELD_GEO !== 'undefined') && AIRFIELD_GEO[icao];
    if (!g) return '<p class="meta">Ground diagram not available yet.</p>';
    // Framing: start from the mapped features, then grow until every runway-end number fits inside with a margin.
    const rnoPos = (r, kk) => {
      const dx = r.p2[0] - r.p1[0], dy = r.p2[1] - r.p1[1], L = Math.hypot(dx, dy) || 1;
      const ux = dx / L, uy = dy / L, nx = -uy, ny = ux, off = 13 * kk;
      const side = (des, sgn) => /L$/.test(des) ? sgn * 9 * kk : /R$/.test(des) ? -sgn * 9 * kk : 0;
      const sa = side(r.a, 1), sb = side(r.b, -1);
      return [[r.p1[0] - ux * off + nx * sa, r.p1[1] - uy * off + ny * sa], [r.p2[0] + ux * off + nx * sb, r.p2[1] + uy * off + ny * sb]];
    };
    const frame = kk => {
      let [a0, b0, a1, b1] = g.bbox;
      (g.rwy || []).forEach(r => rnoPos(r, kk).forEach(p => {
        const hw = 22 * kk, hh = 12 * kk;              // half size of a 3-character runway number + margin
        a0 = Math.min(a0, p[0] - hw); a1 = Math.max(a1, p[0] + hw); b0 = Math.min(b0, p[1] - hh); b1 = Math.max(b1, p[1] + hh);
      }));
      const m = 10 * kk; a0 -= m; b0 -= m; a1 += m; b1 += m;
      // keep the drawing at least 3:4 wide so the footer (scale, north arrow, NOT FOR NAVIGATION) always fits
      const w = a1 - a0, h = b1 - b0;
      if (w < 0.78 * h) { const e = (0.78 * h - w) / 2; a0 -= e; a1 += e; }
      return [a0, b0, a1, b1];
    };
    const kOf = f => Math.max(f[2] - f[0], f[3] - f[1]) / 340;
    let f = frame(kOf(g.bbox));
    f = frame(kOf(f) * 1.08);
    let [x0, y0, x1, y1] = f;
    const W = x1 - x0, H = y1 - y0;
    const k = Math.max(W, H) / 340;           // metres per CSS px at phone size
    const fs = 11 * k;
    const FH = 34 * k;                         // footer strip for scale bar, north arrow + NOT FOR NAVIGATION
    const vb = `${x0} ${-y1} ${W} ${H + FH}`;
    const P = p => `${p[0]},${-p[1]}`;
    let out = '';
    // label boxes already placed, in metres [left, bottom, right, top]; used to stop labels overlapping
    const placed = [];
    const gap = 1.5 * k;
    const hit = bx => placed.some(q => bx[0] < q[2] + gap && q[0] < bx[2] + gap && bx[1] < q[3] + gap && q[1] < bx[3] + gap);
    const inside = bx => bx[0] >= x0 && bx[2] <= x1 && bx[1] >= y0 && bx[3] <= y1;
    const tw = (txt, size) => String(txt).length * 0.74 * size + 0.2 * size;
    (g.apron || []).forEach(a => { out += `<polygon class="dg-apron" points="${a.map(P).join(' ')}"/>`; });
    (g.twy || []).forEach(t => { out += `<polyline class="dg-twy" points="${t.p.map(P).join(' ')}" stroke-width="${Math.max(10, 3.2 * k)}"/>`; });
    // runways
    let labels = '';
    (g.rwy || []).forEach(r => {
      const dx = r.p2[0] - r.p1[0], dy = r.p2[1] - r.p1[1], L = Math.hypot(dx, dy) || 1;
      const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const w = Math.max(r.w, 5 * k) / 2;
      const c = [[r.p1[0] + nx * w, r.p1[1] + ny * w], [r.p2[0] + nx * w, r.p2[1] + ny * w], [r.p2[0] - nx * w, r.p2[1] - ny * w], [r.p1[0] - nx * w, r.p1[1] - ny * w]];
      out += `<polygon class="dg-rwy ${r.s === 'grass' ? 'grass' : ''}" points="${c.map(P).join(' ')}"/>`;
      out += `<line class="dg-cl" x1="${r.p1[0]}" y1="${-r.p1[1]}" x2="${r.p2[0]}" y2="${-r.p2[1]}" stroke-dasharray="${3 * k} ${3 * k}" stroke-width="${0.6 * k}"/>`;
      const [e1, e2] = rnoPos(r, k), rs = fs * 1.15;
      [[e1, r.a], [e2, r.b]].forEach(([e, des]) => {
        const hw = tw(des, rs) / 2;
        placed.push([e[0] - hw - 3 * k, e[1] - rs * 0.55, e[0] + hw + 3 * k, e[1] + rs * 0.8]);
        labels += `<text class="dg-rno" x="${e[0]}" y="${-e[1]}" font-size="${rs}" dy="${rs * 0.35}">${esc(des)}</text>`;
      });
    });
    // tower / fuel markers and labels (try right, left, above, below the marker)
    const bld = svcBuilding(d);
    const pointLabel = (pt, txt, cls) => {
      const sz = fs * 0.85, wdt = tw(txt, sz), o = 6 * k;
      const cands = [[pt[0] + o, pt[1] - sz / 2], [pt[0] - o - wdt, pt[1] - sz / 2], [pt[0] - wdt / 2, pt[1] + o], [pt[0] - wdt / 2, pt[1] - o - sz]];
      const bx = cands.map(c => [c[0], c[1], c[0] + wdt, c[1] + sz]).find(b => !hit(b) && inside(b)) || [cands[0][0], cands[0][1], cands[0][0] + wdt, cands[0][1] + sz];
      placed.push(bx);
      labels += `<text class="dg-lbl ${cls}" x="${bx[0]}" y="${-bx[1]}" dy="${-sz * 0.18}" font-size="${sz}">${txt}</text>`;
    };
    (g.tower || []).forEach(t => { out += `<circle class="dg-twr" cx="${t[0]}" cy="${-t[1]}" r="${4 * k}"/>`; placed.push([t[0] - 4 * k, t[1] - 4 * k, t[0] + 4 * k, t[1] + 4 * k]); });
    (g.fuel || []).forEach(t => { out += `<circle class="dg-fuel" cx="${t[0]}" cy="${-t[1]}" r="${4 * k}"/>`; placed.push([t[0] - 4 * k, t[1] - 4 * k, t[0] + 4 * k, t[1] + 4 * k]); });
    (g.tower || []).forEach(t => pointLabel(t, esc(bld.short), ''));
    (g.fuel || []).forEach(t => pointLabel(t, 'FUEL', 'fuel'));
    // taxiway letters: label the longest way for each letter
    const best = {};
    (g.twy || []).forEach(t => {
      if (!t.r) return;
      let len = 0; for (let i = 1; i < t.p.length; i++) len += Math.hypot(t.p[i][0] - t.p[i - 1][0], t.p[i][1] - t.p[i - 1][1]);
      if (!best[t.r] || len > best[t.r].len) best[t.r] = { len, t };
    });
    let hiddenTwy = false;
    Object.keys(best).forEach(r => {
      const rr = fs * 0.75;
      // try every mapped section of this taxiway, longest first
      const ways = (g.twy || []).filter(t => t.r === r).map(t => { let len = 0; for (let i = 1; i < t.p.length; i++) len += Math.hypot(t.p[i][0] - t.p[i - 1][0], t.p[i][1] - t.p[i - 1][1]); return { len, p: t.p }; }).sort((u, v) => v.len - u.len);
      let m = null;
      for (const wy of ways) {
        const pts = wy.p;
      const at = frac => {
        let half = wy.len * frac, m = pts[0];
        for (let i = 1; i < pts.length; i++) {
          const sl = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
          if (half <= sl) { const f2 = half / (sl || 1); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f2, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f2]; }
          half -= sl; m = pts[i];
        }
        return m;
      };
      // slide the letter along its taxiway until it is clear of runway numbers and other labels
      m = [0.5, 0.38, 0.62, 0.26, 0.74, 0.15, 0.85].map(at).find(q => !hit([q[0] - rr, q[1] - rr, q[0] + rr, q[1] + rr]) && inside([q[0] - rr, q[1] - rr, q[0] + rr, q[1] + rr]));
        if (m) break;
      }
      if (!m) { hiddenTwy = true; return; }
      placed.push([m[0] - rr, m[1] - rr, m[0] + rr, m[1] + rr]);
      labels += `<circle class="dg-twy-tag" cx="${m[0]}" cy="${-m[1]}" r="${rr}"/><text class="dg-twy-txt" x="${m[0]}" y="${-m[1]}" dy="${fs * 0.33}" font-size="${fs * 0.9}">${esc(r)}</text>`;
    });
    // holding points: marker always drawn; name placed in the first free spot, otherwise omitted
    const manyHolds = (g.hold || []).length > 14;
    let hiddenHold = false;
    (g.hold || []).forEach(h => {
      out += `<rect class="dg-hold" x="${h.p[0] - 2.2 * k}" y="${-h.p[1] - 2.2 * k}" width="${4.4 * k}" height="${4.4 * k}"/>`;
      if (!h.r || manyHolds) return;
      const sz = fs * 0.75, wdt = tw(h.r, sz), o = 3.5 * k;
      const cands = [[h.p[0] + o, h.p[1] + o], [h.p[0] + o, h.p[1] - o - sz], [h.p[0] - o - wdt, h.p[1] + o], [h.p[0] - o - wdt, h.p[1] - o - sz]];
      const bx = cands.map(c => [c[0], c[1], c[0] + wdt, c[1] + sz]).find(b => !hit(b) && inside(b));
      if (!bx) { hiddenHold = true; return; }
      placed.push(bx);
      labels += `<text class="dg-hold-txt" x="${bx[0]}" y="${-bx[1]}" dy="${-sz * 0.18}" font-size="${sz}">${esc(h.r)}</text>`;
    });
    const twrLbl = bld.name;
    // footer: scale bar (left), north arrow, NOT FOR NAVIGATION (right)
    const sb = [1000, 500, 200, 100, 50].find(v => v / k <= 80) || 50;
    const sx = x0 + 10 * k, sy = -y0 + 22 * k;
    const scale = `<g class="dg-scale"><line x1="${sx}" y1="${sy}" x2="${sx + sb}" y2="${sy}" stroke-width="${1.5 * k}"/><text x="${sx}" y="${sy - 4 * k}" font-size="${fs * 0.8}">${sb} m</text></g>`;
    const nx0 = sx + sb + 22 * k, ny0 = -y0 + 6 * k;
    const north = `<g class="dg-north"><path d="M${nx0},${ny0} l${-5 * k},${16 * k} l${5 * k},${-4.5 * k} l${5 * k},${4.5 * k} z"/><text x="${nx0 + 13 * k}" y="${ny0 + 14 * k}" font-size="${fs}">N</text></g>`;
    const nfn = `<text class="dg-nfn" x="${x1 - 10 * k}" text-anchor="end" y="${-y0 + 24 * k}" font-size="${fs * 0.85}">NOT FOR NAVIGATION</text>`;
    const has = k2 => (g[k2] || []).length > 0;
    const legend = [
      `<span><i class="lg rwy"></i>Paved runway</span>`,
      g.rwy.some(r => r.s === 'grass') ? `<span><i class="lg grass"></i>Grass runway</span>` : '',
      has('twy') ? `<span><i class="lg twy"></i>Taxiway${Object.keys(best).length ? ' (letter)' : ''}</span>` : '',
      has('apron') ? `<span><i class="lg apron"></i>Apron / parking</span>` : '',
      has('hold') ? `<span><i class="lg hold"></i>Holding point${manyHolds ? 's' : ''}</span>` : '',
      has('tower') ? `<span><i class="lg twr"></i>${twrLbl}</span>` : '',
      has('fuel') ? `<span><i class="lg fuel"></i>Fuel</span>` : ''
    ].filter(Boolean).join('');
    const missing = [
      !has('tower') ? `${twrLbl}: not mapped` : '',
      !has('fuel') ? 'Fuel location: not mapped' : '',
      d.payPoint ? `Pay: ${esc(d.payPoint)}` : 'Booking-in / pay point: not published'
    ].filter(Boolean).join(' · ');
    return `
      <figure class="af-diagram">
        <svg viewBox="${vb}" role="img" aria-label="Ground diagram of ${esc(d.name)} — not for navigation" preserveAspectRatio="xMidYMid meet">
          <rect x="${x0}" y="${-y1}" width="${W}" height="${H + FH}" class="dg-bg"/><line class="dg-foot" x1="${x0}" y1="${-y0}" x2="${x1}" y2="${-y0}"/>
          ${out}${labels}${north}${scale}${nfn}
        </svg>
        <figcaption>
          <div class="af-legend">${legend}</div>
          <div class="meta af-small">${missing}${manyHolds || hiddenHold ? ' · Some hold names omitted for clarity: see the AIP chart' : ''}${hiddenTwy ? ' · Some taxiway letters omitted for clarity: see the AIP chart' : ''}</div>
          <div class="meta af-small">Original drawing. Runways from AIP AD 2.12 threshold co-ordinates; taxiways, aprons, holds and buildings from © OpenStreetMap contributors (ODbL). Taxiway letters shown only where AIP AD 2.8 lists them. Not for navigation.</div>
        </figcaption>
      </figure>`;
  }

  const IC = {
    radio: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4"/><circle cx="12" cy="12" r="2"/>',
    ppr: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    rwy: '<path d="M9 21 10.5 3h3L15 21z"/><path d="M12 6v2M12 11v2M12 16v2"/>',
    cct: '<rect x="4" y="7" width="16" height="10" rx="5"/><path d="M14 4l3 3-3 3"/>',
    fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10"/><path d="M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cafe: '<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3"/>',
    wc: '<circle cx="7" cy="5" r="1.6"/><circle cx="17" cy="5" r="1.6"/><path d="M5 21v-6H4l1.5-6h3L10 15H9v6M15 21V9h4v12M12 3v18"/>',
    shop: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>',
    maint: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    hangar: '<path d="M2 20V11a10 10 0 0 1 20 0v9M2 20h20M7 20v-6h10v6"/>',
    car: '<path d="M5 17h14v-4l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/><path d="M5 13h14"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    taxi: '<path d="M5 17h14v-4l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/><path d="M10 8V5h4v3"/>',
    fee: '<circle cx="12" cy="12" r="9"/><path d="M14.5 8.5a2.5 2.5 0 0 0-4.5 1.5v6M8.5 13h4M8.5 16h7"/>',
    wx: '<path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.5A3.3 3.3 0 0 0 7 18z"/>',
    warn: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17v.5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    sat: '<path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3z"/><path d="M9 4v13M15 7v13"/>',
    plan: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    speak: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    trip: '<path d="M2 16l20-8-6 12-3-5z"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    cam: '<path d="M3 8h4l2-2h6l2 2h4v11H3z"/><circle cx="12" cy="13.5" r="3.5"/>',
    phone: '<path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5L16 12l4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 5 7a2 2 0 0 1 2-2z"/>',
    mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m14 15 2.5-3 3.5 5H6l3-4z"/>'
  };
  function nb(t) { return esc(t).replace(/(\d)-(\d)/g, '$1\u2011$2'); }
  function ic(n, cls) { return `<svg class="af-ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ''}</svg>`; }

  function svcKind(d) {
    const t = String(d.atsType || '');
    if (/^ATC/i.test(t)) return { k: 'atc', l: 'Air traffic control (ATC)', s: 'ATC' };
    if (/^AFIS/i.test(t)) return { k: 'afis', l: 'Information service (AFIS)', s: 'AFIS' };
    if (/^A\/G/i.test(t)) return { k: 'ag', l: 'Air/ground radio (A/G)', s: 'A/G radio' };
    if (/safetycom/i.test(t)) return { k: 'safe', l: 'Safetycom' };
    return { k: 'ag', l: t.split(' — ')[0] || 'Radio' };
  }
  const SVC_PLAIN = {
    atc: 'Air traffic control (ATC): you get instructions and clearances.',
    afis: 'Aerodrome flight information service (AFIS): an information service. You get traffic and airfield information, not clearances.',
    ag: 'Air/ground radio (A/G): basic information only, not clearances. You decide.',
    safe: 'Safetycom: no ground station. Pilots announce their own positions.'
  };
  function pprNeeded(d) { return /^yes/i.test(String((d.ppr && d.ppr.req) || '')); }
  function mainSvc(d) {
    const a = d.ats || [];
    return a.find(x => x.svc === 'AFIS') || a.find(x => x.svc === 'A/G') || a.find(x => x.svc === 'RADAR' && !/direct/i.test(x.note || '')) || a.find(x => x.svc === 'APP') || a.find(x => x.svc === 'TWR') || a[0];
  }
  function cctShort(c) {
    c = String(c || '');
    if (/^RH/.test(c)) return 'RH circuit';
    if (/^LH/.test(c)) return 'LH circuit';
    if (/^variable/i.test(c)) return 'variable circuit';
    if (/^either/i.test(c)) return 'either-hand circuit';
    if (/directed by ATC/i.test(c)) return 'circuit as ATC directs';
    return 'circuit: check';
  }
  function rwyChip(r) {
    const m = String(r.dim || '').match(/^(\d+)/);
    const surf = String(r.surf || '').toLowerCase().replace('grooved ', '');
    return `<span class="af-chip"><b>${esc(r.d)}</b> · ${m ? m[1] + ' m ' : ''}${esc(surf)} · <span class="${/check/.test(cctShort(r.cct)) ? 'af-cwc' : ''}">${esc(cctShort(r.cct))}</span></span>`;
  }
  function fuelShort(f) {
    f = String(f || '');
    if (!f || f === CWC) return { v: CWC, cwc: true };
    const t = [];
    if (/100LL/.test(f)) t.push('AVGAS 100LL');
    if (/UL91/.test(f)) t.push('UL91');
    if (/Jet A-1/i.test(f)) t.push('Jet A-1');
    if (/no AVGAS/i.test(f)) return { v: 'Jet A-1 only', sub: 'No AVGAS listed' };
    return { v: t.length ? t.map(x => `<span class="af-nw">${esc(x)}</span>`).join(' · ') : esc(f), raw: 1, sub: /self-service/i.test(f) ? 'Self-service 100LL' : '' };
  }
  function hoursShort(h) {
    h = String(h || '');
    const m = h.match(/(\d{4})-(\d{4}) \((\d{4})-(\d{4})\)/);
    if (/^H24/.test(h)) return { v: 'Open 24 hours', sub: '' };
    if (!m) return { v: h || CWC, sub: '' };
    const pre = h.slice(0, m.index).replace(/[;,]\s*$/, '').trim();
    const rest = h.slice(m.index + m[0].length).trim();
    return {
      v: `${m[1]}–${m[2]} UTC`,
      sub: [pre ? pre + ' · ' : '', `summer ${m[3]}–${m[4]} UTC`, /SS/.test(rest) ? ' · or sunset if earlier' : (rest.replace(/^[.;,]\s*/, '') ? ' · see full details' : '')].join('')
    };
  }
  function cctTile(d) {
    const rs = d.runways || [];
    const all = rs.map(r => cctShort(r.cct));
    let v;
    if (all.every(x => /^(LH|RH)/.test(x))) v = rs.map(r => r.d + ' ' + r.cct.slice(0, 2)).join(' · ');
    else if (all.every(x => /variable/.test(x))) v = 'Variable';
    else if (all.every(x => /either/.test(x))) v = 'Either hand';
    else if (all.every(x => /ATC/.test(x))) v = 'As ATC directs';
    else v = 'Not in AIP';
    return { v, sub: d.circuitHeight || CWC, cwc: v === 'Not in AIP' };
  }
  function autoStudent(d) {
    const s = d.student || {};
    const go = s.go || [
      (pprNeeded(d) ? 'Get PPR: ' : 'PPR: ') + (d.ppr.how || d.ppr.req),
      'Check NOTAMs for the airfield and your route.',
      'Note the ATZ: ' + (d.atz || CWC) + '. Check your chart for the airspace base above.',
      d.fees ? 'Landing fee: ' + d.fees : 'Landing fee: not published in the AIP. Ask when you book.'
    ];
    const know = s.know || [d.joining, d.cctNote, d.circuitHeight ? 'Circuit height: ' + d.circuitHeight + '.' : '',
      d.noise && d.noise !== CWC ? d.noise : ''].concat(d.notes || []).filter(Boolean);
    const calls = s.calls || (d.ats || []).filter(x => !/^(Ops|Nearby|DEL)$/.test(x.svc) && !/when directed/i.test(x.note || ''))
      .map(x => (x.svc === 'ATIS' ? 'Listen to ' : 'Call ') + x.cs + ' ' + x.f + '.');
    return { go, know, calls };
  }
  function satView(d) {
    const ll = d.lat + ',' + d.lon;
    const big = (d.runways || []).some(r => parseInt(r.dim, 10) > 1000);
    const z = big ? 14 : 15;
    const src = `https://maps.google.com/maps?q=${ll}&t=k&z=${z}&output=embed`;
    const online = typeof navigator === 'undefined' || navigator.onLine !== false;
    return `<div class="af-sat" data-sat-src="${esc(src)}">
        ${online ? `<iframe class="af-sat-frame" src="${esc(src)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Satellite view of ${esc(d.name)} (Google Maps)"></iframe>` : ''}
        <div class="af-sat-off"${online ? ' hidden' : ''}>${ic('sat')}<b>Satellite view needs signal</b><span>Live map from Google. Not stored offline.</span></div>
      </div>
      ${satLinks(d)}
      <p class="meta af-small">Live Google Maps imagery. It is not saved for offline use. Imagery may be out of date.</p>`;
  }

  const FAC = {
    cafe: ['cafe', 'Café / restaurant'], toilets: ['wc', 'Toilets'], shop: ['shop', 'Pilot shop'], school: ['school', 'Flying school / club'],
    maint: ['maint', 'Maintenance'], hangar: ['hangar', 'Hangarage'], parking: ['car', 'Parking'], overnight: ['moon', 'Overnight parking'],
    transport: ['taxi', 'Taxi / car hire'], dogs: ['info', 'Dogs']
  };
  const FAC_ORDER = ['cafe', 'toilets', 'shop', 'school', 'maint', 'hangar', 'parking', 'overnight', 'transport', 'dogs'];
  function srcName(u, aip) {
    if (!u) return '';
    if (u === 'AIP') return 'AIP AD 2.4/2.5';
    try { return new URL(u).hostname.replace(/^www\./, '') + (/\.pdf($|\?)/i.test(u) ? ' (PDF)' : ''); } catch (e) { return u; }
  }
  function srcLink(u, aip) {
    if (!u) return '';
    const href = u === 'AIP' ? aip : u;
    return `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(srcName(u))}</a>`;
  }
  function facSection(d, aip) {
    const items = (d.facilities || []).slice().sort((x, y) => FAC_ORDER.indexOf(x.k) - FAC_ORDER.indexOf(y.k));
    if (!items.length) return `<p class="af-line af-cwc">${CWC}</p>`;
    const lab = { yes: 'Available', no: 'Not available', unk: CWC };
    const cells = items.map(x => {
      const f = FAC[x.k] || ['info', x.k];
      const sub = x.t || '';
      return `<li class="af-fac af-fac-${x.s}">${ic(f[0])}<div><div class="af-fac-n">${esc(f[1])}</div>
        <div class="af-fac-st"><span class="af-fac-dot" aria-hidden="true"></span>${lab[x.s]}</div>
        ${sub ? `<div class="af-fac-t">${nb(sub)}</div>` : ''}
        ${x.src && x.s !== 'unk' || (x.s === 'unk' && x.t && x.src) ? `<div class="af-fac-src">Source: ${srcLink(x.src, aip)}</div>` : ''}</div></li>`;
    }).join('');
    return `<ul class="af-facs">${cells}</ul>
      <p class="meta af-small">Checked 3 Nov 2026 from the AIP (AD 2.4/2.5) and the airfield’s own website. “${CWC}” means no current source lists it.</p>`;
  }
  function feeTileVal(L) {
    if (!L || !L.pub) return { v: 'Not published', sub: 'Ask when you book' };
    const parts = [];
    if (L.micro) parts.push('Microlight ' + L.micro);
    if (L.sep) parts.push('SEP ' + L.sep);
    const sub = [L.vt || '', L.disc ? 'Free with 50 L+ Avgas' : (!L.micro ? 'Microlight not listed separately' : '')].filter(Boolean).join(' · ');
    return { v: parts.join(' · '), sub };
  }
  function feeBlock(d) {
    const L = d.landing;
    if (!L) return '';
    if (!L.pub) return `<div class="af-fee"><div class="af-fee-h">${ic('fee')}<b>Landing fee</b></div>
      <p class="af-line"><b>Not published: ask when you book.</b>${L.note ? ' ' + esc(L.note) : ''}</p>
      <p class="meta af-small">Checked ${esc(L.checked)} · ${srcLink(L.src)}</p></div>`;
    const rows = [];
    const v2 = (v, n) => `<b>${nb(v)}</b>` + (n ? ` <span class="meta">${nb(n)}</span>` : '');
    rows.push(['Microlight', L.micro ? v2(L.micro, L.microNote) : 'Not listed separately']);
    rows.push(['SEP', L.sep ? v2(L.sep, L.sepNote) : CWC]);
    if (L.tg) rows.push(['Touch-and-go', nb(L.tg.replace(/^Touch-and-go( \/ circuit)?:\s*/i, ''))]);
    if (L.disc) rows.push(['Discount', nb(L.disc)]);
    rows.push(['VAT', nb(L.vat || 'Not stated')]);
    return `<div class="af-fee"><div class="af-fee-h">${ic('fee')}<b>Landing fee</b></div>
      <table class="af-table af-fee-t">${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</table>
      ${(L.extra || []).map(t => `<p class="af-line af-small">${nb(t)}</p>`).join('')}
      <p class="meta af-small">Checked ${esc(L.checked)} · <a href="${esc(L.src)}" target="_blank" rel="noopener">${esc(L.srcLabel || srcName(L.src))}</a></p></div>`;
  }

  function hoursTile(d) {
    const raw = `<div class="af-hrs-off"><b>Official times, Coordinated Universal Time (UTC):</b> ${esc(d.hours || CWC)}</div>`;
    if (typeof AirfieldHours === 'undefined' || !d.hours) return `<div class="af-tile-l">Opening hours</div><div class="af-tile-v af-cwc">${CWC}</div>${raw}`;
    const S = AirfieldHours.status(d.hours, d.lat, d.lon), P = S.parsed, F = AirfieldHours.fmt;
    const badge = S.open === true ? '<span class="af-open on">Open now</span>' : S.open === false ? '<span class="af-open off">Closed now</span>' : '';
    const ssTxt = n => n === 0 ? 'or sunset if earlier' : `or sunset + ${n} min if earlier`;
    let today;
    if (P.h24) today = `<div class="af-hrs-today"><b>Open 24 hours</b></div>`;
    else if (S.row) today = `<div class="af-hrs-today"><span class="af-hrs-k">Today · ${esc(S.seasonLabel)}</span>
        <div class="af-hrs-oc"><span>Opens <b>${S.openAt}</b></span><span>Closes <b>${S.closeAt}</b>${S.row.sunset != null && S.closeAt !== F(S.row[S.season].close) ? ' <em>(sunset' + (S.row.sunset ? ' +' + S.row.sunset + ' min' : '') + ')</em>' : ''}</span></div>
        ${S.row.sunset != null ? `<div class="af-hrs-n">Closes ${F(S.row[S.season].close)} ${ssTxt(S.row.sunset)}. ${S.sunsetRaw ? `Sunset today about ${S.sunsetRaw}.` : ''}</div>` : ''}</div>`;
    else today = `<div class="af-hrs-today af-cwc">${CWC}</div>`;
    const cell = (r, se) => `${F(r[se].open)}–${F(r[se].close)}${r.sunset != null ? `<span class="af-hrs-ss">${r.sunset ? 'or sunset +' + r.sunset + ' min' : 'or sunset'}</span>` : ''}`;
    const cur = S.season;
    const rows = P.rows.map(r => `<tr${S.row === r ? ' class="now"' : ''}><th>${esc(r.label)}</th><td class="${cur === 'winter' ? 'cur' : ''}">${cell(r, 'winter')}</td><td class="${cur === 'summer' ? 'cur' : ''}">${cell(r, 'summer')}</td></tr>`).join('')
      + P.extra.map(r => `<tr class="x"><th>${esc(r.label)}</th><td class="${cur === 'winter' ? 'cur' : ''}">${cell(r, 'winter')}</td><td class="${cur === 'summer' ? 'cur' : ''}">${cell(r, 'summer')}</td></tr>`).join('');
    return `<div class="af-hrs-head">${ic('clock')}<span class="af-tile-l">Opening hours<span class="af-hrs-lt">UK local time</span></span>${badge}</div>
      ${today}
      ${rows ? `<table class="af-hrs-t"><tr><th></th><th class="${cur === 'winter' ? 'cur' : ''}">Winter, Greenwich Mean Time (GMT)</th><th class="${cur === 'summer' ? 'cur' : ''}">Summer, British Summer Time (BST)</th></tr>${rows}</table>` : ''}
      ${P.notes.map(n => `<div class="af-hrs-n">${esc(n)}</div>`).join('')}
      ${raw}`;
  }


  /* Licensed airfield photos (Wikimedia Commons only) and public webcam pages.
     Never invent contacts. Photos are lazy-loaded and not service-worker cached. */
  const AF_MEDIA = {
    EGTB: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Wycombe_Air_Park%2C_Booker_-_geograph.org.uk_-_119861.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Wycombe_Air_Park%2C_Booker_-_geograph.org.uk_-_119861.jpg",
        credit: "David Ellis",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Wycombe Air Park, Booker"
      },
      webcam: null
    },
    EGLD: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/12/Denham_Aerodrome_-_geograph.org.uk_-_3562420.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Denham_Aerodrome_-_geograph.org.uk_-_3562420.jpg",
        credit: "Robin Webster",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Denham Aerodrome"
      },
      webcam: null
    },
    EGTR: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Elstree_aerodrome_-_geograph.org.uk_-_2236188.jpg/960px-Elstree_aerodrome_-_geograph.org.uk_-_2236188.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Elstree_aerodrome_-_geograph.org.uk_-_2236188.jpg",
        credit: "David Howard",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Elstree aerodrome"
      },
      webcam: null
    },
    EGLM: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1a/White_Waltham_aerodrome%2C_aerial_-_geograph.org.uk_-_3515987.jpg",
        page: "https://commons.wikimedia.org/wiki/File:White_Waltham_aerodrome%2C_aerial_-_geograph.org.uk_-_3515987.jpg",
        credit: "Chris",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "White Waltham aerodrome, aerial"
      },
      webcam: null
    },
    EGTK: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/London_Oxford_Airport_-_geograph.org.uk_-_3345911.jpg/960px-London_Oxford_Airport_-_geograph.org.uk_-_3345911.jpg",
        page: "https://commons.wikimedia.org/wiki/File:London_Oxford_Airport_-_geograph.org.uk_-_3345911.jpg",
        credit: "Des Blenkinsopp",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "London Oxford Airport"
      },
      webcam: null
    },
    EGTF: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Fairoaks_Airport_-_geograph.org.uk_-_8357436.jpg/960px-Fairoaks_Airport_-_geograph.org.uk_-_8357436.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Fairoaks_Airport_-_geograph.org.uk_-_8357436.jpg",
        credit: "Jonathan Billinger",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Fairoaks Airport"
      },
      webcam: null
    },
    EGTC: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cranfield_Airport_by_Thomas_Nugent.jpg/960px-Cranfield_Airport_by_Thomas_Nugent.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Cranfield_Airport_by_Thomas_Nugent.jpg",
        credit: "Thomas Nugent",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Cranfield Airport by Thomas Nugent"
      },
      webcam: null
    },
    EGGW: {
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Touchdown_-_London_Luton_Airport_-_geograph.org.uk_-_4203742.jpg/960px-Touchdown_-_London_Luton_Airport_-_geograph.org.uk_-_4203742.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Touchdown_-_London_Luton_Airport_-_geograph.org.uk_-_4203742.jpg",
        credit: "Richard Humphrey",
        licence: "CC BY-SA 2.0",
        licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        caption: "Touchdown - London Luton Airport"
      },
      webcam: null
    },
  };

  function openBadge(d) {
    if (typeof AirfieldHours === 'undefined' || !d.hours) return '';
    const S = AirfieldHours.status(d.hours, d.lat, d.lon);
    if (S.open === true) return '<span class="af-open on">Open now</span>';
    if (S.open === false) return '<span class="af-open off">Closed now</span>';
    return '';
  }

  function mediaBlock(icao, d) {
    const m = AF_MEDIA[icao] || {};
    const ph = m.photo;
    let photoHtml;
    if (ph && ph.src) {
      photoHtml = `<figure class="af-photo">
        <img src="${esc(ph.src)}" alt="${esc(ph.caption || d.name)}" loading="lazy" decoding="async" data-no-sw-cache="1" />
        <figcaption class="af-photo-cap">
          <span>${esc(ph.caption || d.name)}</span>
          <span class="af-photo-credit">Photo: <a href="${esc(ph.page)}" target="_blank" rel="noopener">${esc(ph.credit)}</a>
          · <a href="${esc(ph.licenceUrl)}" target="_blank" rel="noopener">${esc(ph.licence)}</a>
          · <a href="${esc(ph.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></span>
        </figcaption>
      </figure>`;
    } else {
      photoHtml = `<p class="af-media-none meta">No licensed photo available yet.</p>`;
    }
    let camHtml;
    if (m.webcam && m.webcam.url) {
      camHtml = `<a class="btn btn-secondary af-cam-btn" href="${esc(m.webcam.url)}" target="_blank" rel="noopener">${ic('cam')}Watch live webcam <span class="meta">(needs signal)</span></a>
        <p class="meta af-small">Opens the official public webcam page. Feeds are not embedded here.</p>`;
    } else {
      camHtml = `<p class="af-media-none meta">No public webcam.</p>`;
    }
    return photoHtml + camHtml;
  }

  function extractEmails(text) {
    const out = [], re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
    let m; while ((m = re.exec(String(text || '')))) if (!out.includes(m[0])) out.push(m[0]);
    return out;
  }
  function extractPhones(text) {
    const out = [], re = /(?:\+44[\s-]?(?:\(?0\)?)?|0)(?:\d[\s-]?){9,10}\d/g;
    let m; while ((m = re.exec(String(text || '')))) {
      const n = m[0].replace(/\s+/g, ' ').trim();
      if (!out.includes(n)) out.push(n);
    }
    return out;
  }
  function telHref(n) {
    let d = String(n).replace(/[^\d+]/g, '');
    if (d.startsWith('0')) d = '+44' + d.slice(1);
    return 'tel:' + d;
  }

  function pprGuide(d, icao) {
    const ppr = d.ppr || {};
    const needed = pprNeeded(d);
    const how = String(ppr.how || '');
    const phones = extractPhones([how, d.phone].filter(Boolean).join(' · '));
    const emails = extractEmails([how, d.phone, ppr.link].filter(Boolean).join(' '));
    const link = ppr.link && !/^check with/i.test(ppr.link) ? ppr.link : '';
    const web = d.website && !/^check with/i.test(d.website) ? d.website : '';
    const ahead = 'Check with airfield'; // how far ahead is rarely published in AIP AD 2
    const pprHours = 'Check with airfield — usually during aerodrome hours (see Opening hours above).';

    const btns = [];
    phones.forEach(n => btns.push(`<a class="btn btn-secondary af-ppr-btn" href="${esc(telHref(n))}">${ic('phone')}Call ${esc(n)}</a>`));
    emails.forEach(e => btns.push(`<a class="btn btn-secondary af-ppr-btn" href="mailto:${esc(e)}?subject=${encodeURIComponent('PPR request — ' + (d.name || icao))}">${ic('mail')}Email ${esc(e)}</a>`));
    if (link) btns.push(`<a class="btn btn-primary af-ppr-btn" href="${esc(link)}" target="_blank" rel="noopener">${ic('link')}Online PPR / booking</a>`);
    else if (web) btns.push(`<a class="btn btn-secondary af-ppr-btn" href="${esc(web)}" target="_blank" rel="noopener">${ic('link')}Airfield website</a>`);

    const usual = [
      'Pilot name and phone number',
      'Aircraft registration (e.g. G-ABCD)',
      'Aircraft type (e.g. Ikarus C42)',
      'People on board',
      'Departure airfield',
      'Estimated time of arrival (ETA) / estimated time of departure (ETD), UK time',
      'Purpose of flight (training, visit, fuel, etc.)',
      'Whether you have read the airfield briefing'
    ];

    const name = d.name || icao;
    const script = `Hello, I'd like prior permission required (PPR) to land at ${name} please.
My name is [your name], phone [your number].
Aircraft registration: [G-____]
Type: [e.g. Ikarus C42]
People on board: [__]
Coming from: [departure airfield]
Estimated time of arrival (ETA): [hh:mm] UK time
Purpose: [training / visit / …]
I have / have not read the pilot briefing.
Please tell me the runway in use, any noise or circuit notes, and my PPR reference.`;

    const emailBody = `Subject: PPR request — ${name}

Hello,

Please may I request prior permission required (PPR) to land at ${name}.

Pilot name: [your name]
Phone: [your number]
Aircraft registration: [G-____]
Aircraft type: [e.g. Ikarus C42]
People on board: [__]
Departure airfield: [____]
Estimated time of arrival (ETA): [weekday date hh:mm] UK time
Estimated time of departure (ETD): [weekday date hh:mm] UK time (if known)
Purpose: [training / visit / fuel / …]
I confirm I have / have not read the current pilot briefing.

Thank you.
[your name]`;

    return `
      <div class="af-ppr-guide">
        <div class="af-ppr-status ${needed ? 'need' : 'free'}">
          <b>${needed ? 'Prior permission required (PPR)' : 'Prior permission not required (PPR)'}</b>
          <div class="meta">${esc(ppr.req || CWC)}</div>
        </div>
        <p class="af-line"><b>How to request:</b> ${esc(how || CWC)}</p>
        <p class="af-line"><b>PPR contact hours:</b> ${esc(pprHours)}</p>
        <p class="af-line"><b>How far ahead:</b> ${esc(ahead)}</p>
        ${btns.length ? `<div class="af-ppr-btns">${btns.join('')}</div>` : `<p class="af-cwc">No published phone, email or booking link — ${CWC}.</p>`}
        <div class="af-dsec">
          <h4>Information they ask for</h4>
          <p class="meta af-small">Where the airfield has not published a fixed list, this is a clearly labelled “usually asked for” list for students — confirm when you call.</p>
          <ul class="af-bul">${usual.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <details class="af-ppr-sample">
          <summary>Sample phone script</summary>
          <pre class="af-sample">${esc(script)}</pre>
        </details>
        <details class="af-ppr-sample">
          <summary>Sample email</summary>
          <pre class="af-sample">${esc(emailBody)}</pre>
        </details>
        <div class="af-dsec">
          <h4>What they'll tell you back</h4>
          <ul class="af-bul">
            <li>Whether permission is granted, and any conditions.</li>
            <li>Runway in use, circuit direction, and noise or avoidance notes.</li>
            <li>Your <b>PPR reference</b> — write it down and quote it on the radio if asked.</li>
            <li>Any briefing you must read before arrival.</li>
          </ul>
          <p class="af-line"><b>If plans change:</b> call or email the same contact as soon as you can to cancel or change your ETA. ${CWC} for a published cancellation rule.</p>
        </div>
      </div>`;
  }

  function jumpBar() {
    const items = [
      ['glance', 'At a glance'],
      ['cando', 'PPR'],
      ['weather', 'Weather'],
      ['getthere', 'Getting there'],
      ['arrival', 'Circuit'],
      ['facilities', 'Facilities']
    ];
    return `<nav class="af-jump" id="af-jump" aria-label="Jump to section">${items.map(([id, lab]) =>
      `<button type="button" class="af-jump-chip" data-af-jump="${id}">${esc(lab)}</button>`).join('')}</nav>`;
  }

  function viewDetail(ctx, a, d) {
    const M = (typeof AIRFIELD_DETAIL_META !== 'undefined') ? AIRFIELD_DETAIL_META : {};
    const icao = String(a.icao).toUpperCase();
    ctx.titleEl.textContent = icao + ' · ' + String(d.name || a.name || '').replace(/\s*\(.*\)\s*$/, '');
    const src = (M.aipBase || '') + icao + '-en-GB.html';
    const sk = svcKind(d);
    const ppr = pprNeeded(d);
    const main = mainSvc(d) || { cs: CWC, f: '' };
    const st = autoStudent(d);
    const fu = fuelShort(d.fuel), cc = cctTile(d);
    const fee = feeTileVal(d.landing);
    const cafe = (d.facilities || []).find(x => x.k === 'cafe' && x.s === 'yes');
    const goList = st.go.map(t => (d.landing && /^Landing fee/i.test(t)) ? (d.landing.pub ? 'Landing fee: ' + [d.landing.micro ? 'microlight ' + d.landing.micro : '', d.landing.sep ? 'SEP ' + d.landing.sep : ''].filter(Boolean).join(', ') + '. Details under Facilities.' : 'Landing fee: not published. Ask when you book.') : t);
    const rs = d.runways || [];
    const pairs = [];
    rs.forEach(r => { const m = String(r.dim).match(/^(\d+)/); const k = r.surf + r.dim; if (!pairs.find(p => p.k === k)) pairs.push({ k, d: r.d, len: m ? m[1] : '', surf: r.surf }); else pairs.find(p => p.k === k).d += '/' + r.d; });
    const tile = (icon, label, v, sub, cls) => `<div class="af-tile ${cls || ''}">${ic(icon)}<div class="af-tile-l">${label}</div><div class="af-tile-v">${v}</div>${sub ? `<div class="af-tile-s">${sub}</div>` : ''}</div>`;
    const sec = (id, icon, t, body, cls, accent) => `<section class="card af-sec ${cls || ''}" id="af-sec-${id}" data-af-sec="${id}"${accent ? ` style="--af-accent:${accent}"` : ''}><h3 class="af-h">${ic(icon)}<span>${t}</span></h3>${body}</section>`;
    const atsFull = (d.ats || []).map(x => `
        <tr><td><span class="af-svc">${esc(x.svc)}</span></td><td><strong>${esc(x.cs)}</strong>${x.note ? `<div class="meta af-small">${esc(x.note)}</div>` : ''}</td><td class="af-f">${esc(x.f)}</td></tr>`).join('');
    const atsShort = (d.ats || []).filter(x => x.svc !== 'Nearby').map(x => `
        <tr><td><span class="af-svc">${esc(x.svc)}</span></td><td>${esc(x.cs)}</td><td class="af-f">${esc(x.f)}</td></tr>`).join('');
    const rw = rs.map(r => `
        <tr><td><strong>${esc(r.d)}</strong><div class="af-small af-nw">${String(Math.round(r.brg) % 360 || 360).padStart(3, '0')}° true heading</div></td><td>${esc(r.surf)}<div class="meta af-small">${esc(r.dim)}</div></td><td>${esc(r.thrElev)} ft${r.disp ? `<div class="meta af-small">${esc(r.disp)}</div>` : ''}</td><td class="${/check/i.test(r.cct) ? 'af-cwc' : 'af-cct'}">${esc(r.cct)}</td></tr>`).join('');
    const nearby = (d.ats || []).filter(x => x.svc === 'Nearby');
    const open = openBadge(d);
    return `
      <header class="af-hero">
        <div class="af-hero-top">
          <div class="af-icao">${esc(icao)}</div>
          <div class="af-hero-pills">
            <span class="af-pill af-pill-${sk.k}">${ic('radio')}${esc(sk.l)}</span>
            <span class="af-pill ${ppr ? 'af-pill-amber' : 'af-pill-green'}">${ic('ppr')}${ppr ? 'Prior permission required (PPR)' : 'Prior permission not required (PPR)'}</span>
            ${open}
          </div>
        </div>
        <h2 class="af-name">${esc(d.name || a.name)}</h2>
        <div class="af-sub">${ic('pin')}<span>${esc(a.area || '')}</span><span class="af-dot"></span><span>Elevation ${esc(d.elev)} ft</span></div>
        <div class="af-chips">${rs.map(rwyChip).join('')}</div>
      </header>

      ${d.notice ? `<div class="card af-notice">${ic('warn')}<div><b>${esc(d.notice.t)}</b><div class="meta af-small">Source: ${srcLink(d.notice.src)} · checked 3 Nov 2026</div></div></div>` : ''}

      ${jumpBar()}

      ${sec('glance', 'sat', 'At a glance · views', `
        <div class="af-tiles af-tiles-glance">
          ${tile('radio', 'Talk to', `${esc(main.cs)}`, `<span class="af-mono">${esc(main.f)}</span> megahertz (MHz)`, 'af-tile-wide')}
          ${tile('rwy', 'Runways', pairs.map(p => esc(p.d)).join(' · '), pairs.map(p => `${p.len} m ${esc(p.surf.toLowerCase().replace('grooved ', ''))}`).filter((v, i, ar) => ar.indexOf(v) === i).join(' · '))}
          ${tile('cct', 'Circuit', esc(cc.v), esc(cc.sub), cc.cwc ? 'af-cwc-t' : '')}
          ${tile('fuel', 'Fuel', fu.raw ? fu.v : esc(fu.v), esc(fu.sub || ''))}
        </div>
        <h4 class="af-subh">Satellite view</h4>
        ${satView(d)}
        <h4 class="af-subh">Ground diagram</h4>
        ${diagram(icao, d)}
        <h4 class="af-subh">Photo &amp; webcam</h4>
        ${mediaBlock(icao, d)}
      `, 'af-sec-glance', '#3b82f6')}

      ${sec('cando', 'ppr', 'Can I go?', `
        ${pprGuide(d, icao)}
        <div class="af-tile af-hours" id="af-hours">${hoursTile(d)}</div>
        ${tile('fee', 'Landing fee', esc(fee.v), esc(fee.sub), d.landing && d.landing.pub ? 'af-tile-wide' : 'af-tile-wide af-cwc-t')}
        <ul class="af-check af-check-tight">${goList.map(t => `<li><span class="af-box" aria-hidden="true"></span><span>${nb(t)}</span></li>`).join('')}</ul>
      `, 'af-sec-cando', '#f59e0b')}

      ${typeof AirfieldWeather !== 'undefined' ? sec('weather', 'wx', 'Weather now', AirfieldWeather.shell(icao, d.lat, d.lon), 'af-wxsec af-sec-weather', '#38bdf8') : ''}

      ${sec('getthere', 'radio', 'Getting there', `
        <p class="af-svcplain"><span class="af-pill af-pill-${sk.k} sm">${esc(sk.l)}</span> ${esc(SVC_PLAIN[sk.k])}</p>
        <h4 class="af-subh">Radio call order</h4>
        <ol class="af-calls">${st.calls.map(t => `<li>${nb(t)}</li>`).join('')}</ol>
        <table class="af-table af-rtable"><tr><th>Type</th><th>Callsign</th><th>Frequency, megahertz (MHz)</th></tr>${atsShort}</table>
        ${d.squawk ? `<p class="af-line af-small"><b>Squawk:</b> ${esc(d.squawk)}</p>` : ''}
        <h4 class="af-subh">Joining</h4>
        <p class="af-line">${val(d.joining)}</p>
        ${nearby.map(x => `<p class="af-line"><b>Nearby:</b> ${esc(x.cs)} ${esc(x.f)}. ${esc(x.note || '')}</p>`).join('')}
      `, 'af-sec-get', '#a78bfa')}

      ${sec('arrival', 'cct', 'On arrival', `
        <p class="af-line"><b>Circuit height:</b> ${val(d.circuitHeight)}</p>
        <p class="af-line">${esc(d.cctNote || '')}</p>
        <p class="af-line"><b>Noise / avoid:</b> ${val(d.noise === CWC ? '' : d.noise)}</p>
        <h4 class="af-subh">Runways</h4>
        <table class="af-table af-rwy"><tr><th>Runway</th><th>Surface</th><th>Threshold elevation</th><th>Circuit</th></tr>${rw}</table>
        <ul class="af-bul">${st.know.map(t => `<li>${nb(t)}</li>`).join('')}</ul>
      `, 'af-sec-arrival', '#34d399')}

      ${sec('facilities', 'hangar', 'Facilities &amp; fees', facSection(d, src) + feeBlock(d) + (cafe ? `<p class="af-line af-small"><b>Café:</b> ${esc((cafe.short || 'On site').split('|')[0])} · ${esc((cafe.short || '|Hours not published').split('|')[1] || 'Hours not published')}</p>` : ''), 'af-sec-fac', '#f472b6')}

      <details class="card af-details" id="af-sec-details">
        <summary>${ic('doc')}<span>Full details from the AIP</span></summary>
        <div class="af-dsec"><h4>Radio &amp; air traffic services (ATS)</h4><p class="af-line">${esc(d.atsType)}</p><table class="af-table"><tr><th>Type</th><th>Callsign</th><th>Frequency, megahertz (MHz)</th></tr>${atsFull}</table>
          ${d.squawk ? `<p class="af-line"><b>Squawk:</b> ${esc(d.squawk)}</p>` : ''}
          <p class="af-line"><b>Aerodrome traffic zone (ATZ):</b> ${val(d.atz)}</p></div>
        <div class="af-dsec"><h4>Prior permission (PPR) &amp; fees</h4><p class="af-line"><b>Prior permission:</b> ${esc(d.ppr.req)}</p><p class="af-line">${esc(d.ppr.how)}</p>
          ${d.ppr.link ? `<p class="af-line"><b>Link:</b> ${link(d.ppr.link)}</p>` : ''}
          <p class="af-line"><b>Landing fees (AIP):</b> ${d.fees ? esc(d.fees) + (d.feesLink ? ' ' + link(d.feesLink) : '') : 'Not published in the AIP. See Facilities &amp; fees above.'}</p></div>
        <div class="af-dsec"><h4>Runways &amp; circuits</h4><table class="af-table af-rwy"><tr><th>Runway</th><th>Surface</th><th>Threshold elevation</th><th>Circuit</th></tr>${rw}</table>
          <p class="af-line"><b>Circuit height:</b> ${val(d.circuitHeight)}</p>
          <p class="af-line">${esc(d.cctNote || '')}</p>
          <p class="af-line"><b>Noise / avoid:</b> ${val(d.noise === CWC ? '' : d.noise)}</p></div>
        <div class="af-dsec"><h4>Joining &amp; local notes</h4><p class="af-line"><b>Join:</b> ${val(d.joining)}</p>
          <ul class="af-list">${(d.notes || []).map(n => `<li>${esc(n)}</li>`).join('')}</ul>
          ${nearby.map(x => `<p class="af-line"><b>Nearby:</b> ${esc(x.cs)} ${esc(x.f)}. ${esc(x.note || '')}</p>`).join('')}</div>
        <div class="af-dsec"><h4>Hours, fuel &amp; contact</h4><p class="af-line"><b>Hours:</b> ${val(d.hours)} <span class="meta af-small">Coordinated Universal Time (UTC); summer times in brackets</span></p>
          <p class="af-line"><b>Fuel:</b> ${val(d.fuel)}</p>
          <p class="af-line"><b>Phone:</b> ${val(d.phone)}</p>
          <p class="af-line"><b>Website:</b> ${link(d.website === CWC ? '' : d.website)}</p></div>
      </details>

      <div class="af-actions">
        <button type="button" class="btn btn-secondary" id="af-d-speak">${ic('speak')}Speak</button>
        <button type="button" class="btn btn-secondary" id="af-d-edit">${ic('edit')}Edit my card</button>
        <button type="button" class="btn btn-primary af-wide" id="af-to-trip-d">${ic('trip')}Use in Plan a trip</button>
      </div>
      <footer class="af-foot" id="af-sec-sources">
        <p>Study aid only. Not for navigation. ${esc(M.check || '')}</p>
        <p>Source: <a href="${esc(src)}" target="_blank" rel="noopener">UK AIP AD 2 ${esc(icao)}</a> · AIRAC ${esc(M.airac || '')}. Anything not in the AIP shows “${CWC}”.</p>
        <p class="meta af-small">Photos: Wikimedia Commons only (see credit under each photo). Webcams link out; feeds are not embedded.</p>
      </footer>
    `;
  }


  function blank() {
    return {
      id: 'af_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
      icao: '',
      name: '',
      area: '',
      freqs: { afis: '', atis: '', other: '' },
      runway: '',
      ppr: '',
      notes: '',
      tags: ''
    };
  }

  let mode = 'list'; // list | detail | edit
  let editId = null;
  let forceEdit = null;
  let filter = '';

  function view(ctx) {
    ctx.setNav('plan');
    ctx.titleEl.textContent = 'Airfields';
    const confirmLbl = 'Confirm with PPR / instructor before flight — study aid only.';
    ctx.btnBack.hidden = false;

    const rid = ctx.route && ctx.route.id ? String(ctx.route.id) : null;
    if (rid) {
      editId = rid;
      const card = get(rid);
      const d = detailFor(card);
      if (d && forceEdit !== rid) {
        mode = 'detail';
        return viewDetail(ctx, card, d);
      }
      mode = 'edit';
      return viewEdit(ctx);
    }
    forceEdit = null;
    mode = 'list';
    editId = null;
    return viewList(ctx);
  }

  function listMeta(a) {
    const d = detailFor(a);
    if (!d) return `<div class="af-lc-line">${esc((a.freqs && (a.freqs.afis || a.freqs.other)) || 'No frequency yet')}${a.ppr ? ' · ' + esc(String(a.ppr).slice(0, 48)) : ''}</div>
          <div class="af-lc-pills"><span class="af-pill af-pill-mine sm">My card</span></div>`;
    const main = mainSvc(d) || { cs: '', f: '' };
    const sk = svcKind(d), ppr = pprNeeded(d);
    return `<div class="af-lc-line">${ic('radio')}<span>${esc(main.cs)} <span class="af-mono">${esc(main.f)}</span></span></div>
          <div class="af-lc-pills"><span class="af-pill af-pill-${sk.k} sm">${esc(sk.s || sk.l)}</span><span class="af-pill sm ${ppr ? 'af-pill-amber' : 'af-pill-green'}">${ppr ? 'PPR required' : 'PPR not required'}</span><span class="af-lc-more">Full sheet · satellite · diagram</span></div>`;
  }

  function viewList(ctx) {
    const confirmLbl = 'Confirm with PPR / instructor before flight — study aid only.';
    const list = search(filter);
    const disc = (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.disclaimer) || '';
    return `
      <div class="disclaimer-inline">${esc(disc)}</div>
      <p class="meta" style="margin:10px 0 12px">${all().length} quick cards · runway, frequency, PPR · editable offline</p>
      <div class="af-tools">
        <input type="search" id="af-q" placeholder="Search ICAO, name, area…" aria-label="Search airfields" value="${esc(filter)}" />
        <button type="button" class="btn btn-primary" id="af-new" aria-label="Add airfield card">＋ Add</button>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        <button type="button" class="chip" data-go="trip">Plan a trip</button>
        <button type="button" class="chip" data-go="flight-prep">Flight prep</button>
      </div>
      ${list.map(a => `
        <div class="card card-tap af-lc" data-af-open="${esc(a.id)}">
          <div class="af-lc-icao">${esc(a.icao || '—')}</div>
          <div class="af-lc-body">
            <h3>${esc(a.name || 'Untitled')}</h3>
            <div class="af-lc-area">${esc(a.area || '')}</div>
            ${listMeta(a)}
          </div>
        </div>`).join('') || '<div class="empty-state">No airfields match. Add one.</div>'}
      <button type="button" class="btn btn-secondary" id="af-reseed" style="width:100%;margin-top:8px">Restore seed cards (keeps your extras)</button>
    `;
  }

  function viewEdit(ctx) {
    const a = get(editId) || blank();
    if (!get(editId)) editId = a.id;
    ctx.titleEl.textContent = a.name || 'Edit airfield';
    return `
      <div class="disclaimer-inline">Confirm all freqs / PPR / runway with AIP &amp; airfield before flight.</div>
      <div class="card">
        <label class="meta">ICAO</label>
        <input class="search-input" id="af-icao" value="${esc(a.icao)}" maxlength="4" style="text-transform:uppercase;margin-bottom:8px" />
        <label class="meta">Name</label>
        <input class="search-input" id="af-name" value="${esc(a.name)}" style="margin-bottom:8px" />
        <label class="meta">Area</label>
        <input class="search-input" id="af-area" value="${esc(a.area)}" style="margin-bottom:8px" />
        <label class="meta">A/G · AFIS · ATC freq</label>
        <input class="search-input" id="af-afis" value="${esc(a.freqs && a.freqs.afis)}" style="margin-bottom:8px" />
        <label class="meta">ATIS / other</label>
        <input class="search-input" id="af-atis" value="${esc(a.freqs && a.freqs.atis)}" placeholder="ATIS" style="margin-bottom:8px" />
        <input class="search-input" id="af-other" value="${esc(a.freqs && a.freqs.other)}" placeholder="Other freqs" style="margin-bottom:8px" />
        <label class="meta">Runway</label>
        <textarea class="search-input" id="af-rwy" rows="2" style="margin-bottom:8px">${esc(a.runway)}</textarea>
        <label class="meta">PPR</label>
        <textarea class="search-input" id="af-ppr" rows="2" style="margin-bottom:8px">${esc(a.ppr)}</textarea>
        <label class="meta">Notes</label>
        <textarea class="search-input" id="af-notes" rows="3" style="margin-bottom:8px">${esc(a.notes)}</textarea>
        <label class="meta">Tags (search)</label>
        <input class="search-input" id="af-tags" value="${esc(a.tags)}" />
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="af-save">Save</button>
        <button type="button" class="btn btn-secondary" id="af-speak">🔊 Speak</button>
      </div>
      <button type="button" class="btn btn-danger" id="af-del" style="width:100%;margin-top:8px">Delete card</button>
      <button type="button" class="btn btn-secondary" id="af-to-trip" style="width:100%;margin-top:8px">Use in Plan a trip</button>
    `;
  }

  function bind(ctx) {
    if (mode === 'detail') {
      const hrs = document.getElementById('af-hours');
      if (hrs) {
        const tick = setInterval(() => {
          if (!document.body.contains(hrs)) { clearInterval(tick); return; }
          const d = detailFor(get(editId)); if (d) { hrs.innerHTML = hoursTile(d); if (typeof Gloss !== 'undefined') Gloss.expand(hrs); }
        }, 60000);
      }
      if (typeof Gloss !== 'undefined') document.querySelectorAll('.af-hero, .af-notice, .af-block, .af-sec:not(.af-wxsec), .af-details, .af-foot, .af-ppr-guide').forEach(el => Gloss.expand(el));
      const wxEl = document.getElementById('af-wx');
      if (wxEl && typeof AirfieldWeather !== 'undefined') AirfieldWeather.mount(wxEl);
      const jump = document.getElementById('af-jump');
      if (jump) {
        const chips = [...jump.querySelectorAll('[data-af-jump]')];
        const scrollTo = id => {
          const el = document.getElementById('af-sec-' + id);
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        };
        chips.forEach(btn => btn.addEventListener('click', () => scrollTo(btn.dataset.afJump)));
        const secs = chips.map(c => document.getElementById('af-sec-' + c.dataset.afJump)).filter(Boolean);
        if (secs.length && 'IntersectionObserver' in window) {
          const io = new IntersectionObserver(entries => {
            const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!vis) return;
            const id = vis.target.getAttribute('data-af-sec');
            chips.forEach(c => c.classList.toggle('active', c.dataset.afJump === id));
          }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] });
          secs.forEach(s => io.observe(s));
        }
      }
      const sat = document.querySelector('.af-sat');
      if (sat) {
        const upd = () => {
          if (!document.body.contains(sat)) { window.removeEventListener('online', upd); window.removeEventListener('offline', upd); return; }
          const on = navigator.onLine !== false;
          const off = sat.querySelector('.af-sat-off');
          let fr = sat.querySelector('iframe');
          if (on && !fr) {
            fr = document.createElement('iframe');
            fr.className = 'af-sat-frame'; fr.loading = 'lazy'; fr.title = 'Satellite view (Google Maps)';
            fr.referrerPolicy = 'no-referrer-when-downgrade'; fr.src = sat.dataset.satSrc;
            sat.insertBefore(fr, off);
          }
          if (fr) fr.hidden = !on;
          if (off) off.hidden = on;
        };
        window.addEventListener('online', upd); window.addEventListener('offline', upd);
      }
      const ed = document.getElementById('af-d-edit');
      if (ed) ed.addEventListener('click', () => { forceEdit = editId; ctx.go('airfields', { id: editId }, { replace: true }); });
      const sp = document.getElementById('af-d-speak');
      if (sp) sp.addEventListener('click', () => {
        const a = get(editId); const d = detailFor(a);
        if (!d) return;
        const text = [d.name, d.atsType, (d.ats || []).map(x => x.cs + ' ' + x.f).join('. '), 'PPR ' + d.ppr.req,
          (d.runways || []).map(r => 'Runway ' + r.d + ' circuit ' + r.cct).join('. '), 'Circuit height ' + d.circuitHeight].join('. ');
        if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
      });
      const toTrip = document.getElementById('af-to-trip-d');
      if (toTrip) toTrip.addEventListener('click', () => {
        const a = get(editId) || {}; const d = detailFor(a) || {};
        const main = (d.ats || []).find(x => x.svc === 'TWR' || x.svc === 'AFIS' || x.svc === 'A/G') || (d.ats || [])[0];
        let tripId = null;
        try {
          if (typeof TripUI !== 'undefined' && TripUI.createFromAirfield) {
            const t = TripUI.createFromAirfield({ name: d.name || a.name, icao: a.icao, freq: main ? main.cs + ' ' + main.f : '' });
            tripId = t && t.id;
          }
        } catch (_) { /* ignore */ }
        if (tripId) ctx.go('trip', { id: tripId }); else ctx.go('trip');
      });
      return;
    }
    if (mode === 'edit') {
      const saveBtn = document.getElementById('af-save');
      if (saveBtn) saveBtn.addEventListener('click', () => {
        const card = {
          id: editId,
          icao: (document.getElementById('af-icao').value || '').trim().toUpperCase(),
          name: (document.getElementById('af-name').value || '').trim(),
          area: (document.getElementById('af-area').value || '').trim(),
          freqs: {
            afis: (document.getElementById('af-afis').value || '').trim(),
            atis: (document.getElementById('af-atis').value || '').trim(),
            other: (document.getElementById('af-other').value || '').trim()
          },
          runway: (document.getElementById('af-rwy').value || '').trim(),
          ppr: (document.getElementById('af-ppr').value || '').trim(),
          notes: (document.getElementById('af-notes').value || '').trim(),
          tags: (document.getElementById('af-tags').value || '').trim()
        };
        upsert(card);
        mode = 'list';
        editId = null;
        forceEdit = null;
        ctx.go('airfields', {}, { replace: true });
      });
      const del = document.getElementById('af-del');
      if (del) del.addEventListener('click', () => {
        if (confirm('Delete this airfield card?')) {
          remove(editId);
          mode = 'list';
          editId = null;
          ctx.go('airfields', {}, { replace: true });
        }
      });
      const sp = document.getElementById('af-speak');
      if (sp) sp.addEventListener('click', () => {
        const a = {
          icao: document.getElementById('af-icao').value,
          name: document.getElementById('af-name').value,
          freqs: { afis: document.getElementById('af-afis').value },
          ppr: document.getElementById('af-ppr').value,
          runway: document.getElementById('af-rwy').value,
          notes: document.getElementById('af-notes').value
        };
        const text = [a.name, a.icao, 'Frequency ' + (a.freqs.afis || ''), a.ppr, a.runway, a.notes].filter(Boolean).join('. ');
        if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
      });
      const toTrip = document.getElementById('af-to-trip');
      if (toTrip) toTrip.addEventListener('click', () => {
        const name = (document.getElementById('af-name').value || document.getElementById('af-icao').value || 'Trip').trim();
        const icao = (document.getElementById('af-icao').value || '').trim().toUpperCase();
        let tripId = null;
        try {
          if (typeof TripUI !== 'undefined' && TripUI.createFromAirfield) {
            const t = TripUI.createFromAirfield({ name, icao, freq: document.getElementById('af-afis').value });
            tripId = t && t.id;
          }
        } catch (_) { /* ignore */ }
        if (tripId) ctx.go('trip', { id: tripId });
        else ctx.go('trip');
      });
      return;
    }

    const q = document.getElementById('af-q');
    if (q) {
      let t;
      q.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          filter = q.value;
          ctx.go('airfields');
        }, 150);
      });
    }
    document.querySelectorAll('[data-af-open]').forEach(el => {
      el.addEventListener('click', () => {
        editId = el.dataset.afOpen;
        mode = 'edit';
        ctx.go('airfields', { id: editId });
      });
    });
    const neu = document.getElementById('af-new');
    if (neu) neu.addEventListener('click', () => {
      const b = blank();
      upsert(b);
      editId = b.id;
      mode = 'edit';
      ctx.go('airfields', { id: editId });
    });
    const reseed = document.getElementById('af-reseed');
    if (reseed) reseed.addEventListener('click', () => {
      const data = load();
      const byId = Object.fromEntries(data.items.map(a => [a.id, a]));
      seed().forEach(s => {
        if (!byId[s.id]) data.items.push(s);
      });
      save(data);
      ctx.go('airfields');
    });
    document.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', () => ctx.go(el.dataset.go));
    });
  }

  function resetMode() {
    mode = 'list';
    editId = null;
    forceEdit = null;
  }

  return { view, bind, search, all, get, resetMode, load, detailFor };
})();
if (typeof globalThis !== 'undefined') globalThis.AirfieldsUI = AirfieldsUI;
