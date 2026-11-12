/* Animated ground diagram + taxi routes (airfield pages). Data: data/taxi-diagrams.js.
   Drawn to scale in local metres (x east, y north); SVG uses y = -north. Not for navigation. */
const TaxiUI = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const D = () => (typeof TAXI_DIAGRAMS !== 'undefined' ? TAXI_DIAGRAMS : {});
  const has = (icao) => !!D()[String(icao || '').toUpperCase()];
  const f1 = (n) => Math.round(n * 10) / 10;
  const pt = (p) => `${f1(p[0])},${f1(-p[1])}`;

  /* ---------- geometry ---------- */
  function rwyPoly(r) {
    const dx = r.p2[0] - r.p1[0], dy = r.p2[1] - r.p1[1], L = Math.hypot(dx, dy);
    const nx = -dy / L * r.w / 2, ny = dx / L * r.w / 2;
    return [[r.p1[0] + nx, r.p1[1] + ny], [r.p2[0] + nx, r.p2[1] + ny], [r.p2[0] - nx, r.p2[1] - ny], [r.p1[0] - nx, r.p1[1] - ny]];
  }
  /* Rounded-corner dense polyline. Returns pts, cumulative dist, and the dense index of every source vertex. */
  function densify(src, radius) {
    const P = src.map((s) => s.p), out = [], at = [];
    const push = (p) => out.push(p);
    for (let i = 0; i < P.length; i++) {
      if (i === 0 || i === P.length - 1) { at.push(out.length); push(P[i]); continue; }
      const a = P[i - 1], b = P[i], c = P[i + 1];
      const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const r = Math.min(radius, l1 * 0.45, l2 * 0.45);
      const s = [b[0] + (a[0] - b[0]) * r / l1, b[1] + (a[1] - b[1]) * r / l1];
      const e = [b[0] + (c[0] - b[0]) * r / l2, b[1] + (c[1] - b[1]) * r / l2];
      const N = 10;
      for (let k = 0; k <= N; k++) {
        const t = k / N, u = 1 - t;
        if (k === N / 2) at.push(out.length);
        push([u * u * s[0] + 2 * u * t * b[0] + t * t * e[0], u * u * s[1] + 2 * u * t * b[1] + t * t * e[1]]);
      }
    }
    const dist = [0];
    for (let i = 1; i < out.length; i++) dist.push(dist[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]));
    return { pts: out, dist, at };
  }
  /* Timeline: base speed (metres of diagram per second of animation), per-segment speed factor, pauses at holds. */
  function timeline(route) {
    const g = densify(route.pts, 14), BASE = 55;
    const T = [0]; let sp = route.pts[0].speed || 1, vi = 0;
    const evT = new Array(route.pts.length).fill(0);
    for (let i = 1; i < g.pts.length; i++) {
      while (vi + 1 < g.at.length && g.at[vi + 1] <= i - 1) { vi++; if (route.pts[vi].speed) sp = route.pts[vi].speed; }
      T.push(T[i - 1] + (g.dist[i] - g.dist[i - 1]) / (BASE * sp));
    }
    // insert pauses: every point after a paused vertex shifts later
    const pauses = [];
    route.pts.forEach((q, j) => { if (q.pause) pauses.push([g.at[j], q.pause / 1000]); });
    const T2 = T.map((t, i) => t + pauses.filter(([ix]) => ix < i).reduce((s, [, d]) => s + d, 0));
    route.pts.forEach((q, j) => { evT[j] = T2[g.at[j]]; });
    return { ...g, T: T2, evT, total: T2[T2.length - 1] + 0.6 };
  }

  /* ---------- static markup ---------- */
  function lblGroup(x, y, inner, cls) {
    return `<g class="tx-lg ${cls || ''}" data-x="${f1(x)}" data-y="${f1(-y)}" transform="translate(${f1(x)},${f1(-y)})">${inner}</g>`;
  }
  function svgMarkup(G, uid) {
    const [x0, y0, x1, y1] = G.frame;
    let s = `<rect class="tx-bg" x="${x0 - 2000}" y="${-y1 - 2000}" width="${x1 - x0 + 4000}" height="${y1 - y0 + 4000}"/>`;
    s += `<g class="tx-sat" hidden></g>`;
    s += `<g class="tx-base">`;
    (G.apron || []).forEach((a) => { s += `<polygon class="tx-apron" points="${a.p.map(pt).join(' ')}"/>`; });
    (G.bld || []).forEach((b) => { s += `<polygon class="tx-bld" points="${b.map(pt).join(' ')}"/>`; });
    (G.rwy || []).forEach((r) => {
      s += `<polygon class="tx-rwy ${r.s === 'grass' ? 'grass' : ''}" points="${rwyPoly(r).map(pt).join(' ')}"/>`;
      if (r.s !== 'grass') s += `<line class="tx-rcl" x1="${f1(r.p1[0])}" y1="${f1(-r.p1[1])}" x2="${f1(r.p2[0])}" y2="${f1(-r.p2[1])}"/>`;
    });
    (G.twy || []).forEach((t) => {
      const d = 'M' + t.p.map(pt).join(' L');
      s += `<path class="tx-twy-edge ${t.s}" d="${d}" stroke-width="${t.w + 2}"/><path class="tx-twy ${t.s}" d="${d}" stroke-width="${t.w}"/><path class="tx-twy-cl" d="${d}"/>`;
    });
    (G.holds || []).forEach((h) => {
      const t = (G.twy || []).find((w) => w.id === h.twy);
      // hold bar across the taxiway, perpendicular to the nearest taxiway segment
      let ang = 0;
      if (t) {
        let best = 1e9;
        for (let i = 1; i < t.p.length; i++) {
          const a = t.p[i - 1], b = t.p[i], vx = b[0] - a[0], vy = b[1] - a[1], L2 = vx * vx + vy * vy;
          const u = Math.max(0, Math.min(1, ((h.p[0] - a[0]) * vx + (h.p[1] - a[1]) * vy) / L2));
          const dd = Math.hypot(a[0] + vx * u - h.p[0], a[1] + vy * u - h.p[1]);
          if (dd < best) { best = dd; ang = Math.atan2(vy, vx); }
        }
      }
      const hw = ((t && t.w) || 9) / 2 + 3, nx = -Math.sin(ang) * hw, ny = Math.cos(ang) * hw;
      s += `<line class="tx-hold-bar" data-hold="${esc(h.id)}" x1="${f1(h.p[0] + nx)}" y1="${f1(-(h.p[1] + ny))}" x2="${f1(h.p[0] - nx)}" y2="${f1(-(h.p[1] - ny))}"/>`;
    });
    s += `</g><g class="tx-route-g"><path class="tx-route-all" d=""/><path class="tx-route-done" d=""/></g><g class="tx-labels">`;
    // runway designators (true heading figures shown in the key, not on the drawing)
    (G.rwy || []).forEach((r) => {
      const dx = r.p2[0] - r.p1[0], dy = r.p2[1] - r.p1[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const g = r.s === 'grass';
      // grass labels go on the south side, hard runway labels beyond the ends
      const A = g ? [r.p1[0] - ux * 26 + uy * 22, r.p1[1] - uy * 26 - ux * 22] : [r.p1[0] - ux * 30, r.p1[1] - uy * 30];
      const B = g ? [r.p2[0] + uy * 26, r.p2[1] - ux * 26] : [r.p2[0] - uy * 26 + ux * 4, r.p2[1] + ux * 26 + uy * 4];
      [[A, r.a], [B, r.b]].forEach(([p, t]) => { s += lblGroup(p[0], p[1], `<text class="tx-rno ${g ? 'grass' : ''}" y="4">${esc(t)}</text>`); });
    });
    (G.twy || []).forEach((t) => { if (t.tag) s += lblGroup(t.tag[0], t.tag[1], `<circle class="tx-tag" r="8"/><text class="tx-tag-t" y="3.6">${esc(t.id)}</text>`); });
    (G.holds || []).forEach((h) => {
      const w = 8 + h.id.length * 7.4;
      const off = h.off || { e: [10, -7], w: [-10 - w, -7], s: [-w / 2, 8], n: [-w / 2, -22] }[h.side || 'e'];
      s += lblGroup(h.p[0], h.p[1], `<g class="tx-hold-lbl" data-hold="${esc(h.id)}"><rect x="${off[0]}" y="${off[1]}" width="${w}" height="14" rx="2"/><text x="${off[0] + w / 2}" y="${off[1] + 10.6}">${esc(h.id)}</text></g>`);
    });
    if (G.control) s += lblGroup(G.control.p[0], G.control.p[1], `<circle class="tx-ctl" r="3.4"/><text class="tx-lbl" x="-6" y="3.5" text-anchor="end">${esc(G.control.label)}</text>`);
    (G.apron || []).forEach((a) => { if (a.lbl) s += lblGroup(a.lbl[0], a.lbl[1], `<text class="tx-lbl apron" y="3.5">${esc(a.name)}</text>`); });
    (G.labels || []).forEach((l) => { s += lblGroup(l.p[0], l.p[1], `<text class="tx-lbl soft" y="3.5">${esc(l.t)}</text>`); });
    s += `</g>`;
    // aircraft: top view, nose up, ~22 px long, drawn in screen px and scaled by the label scaler
    s += `<g class="tx-lg tx-plane" data-x="0" data-y="0" data-fixed="1" transform="translate(-9999,-9999)"><g class="tx-plane-r">
      <path class="tx-plane-b" d="M0,-11 C1.6,-11 2,-8 2,-5 L2,-2 L11,0.5 L11,2.6 L2,2 L1.5,7 L5,8.6 L5,10.2 L0,9.6 L-5,10.2 L-5,8.6 L-1.5,7 L-2,2 L-11,2.6 L-11,0.5 L-2,-2 L-2,-5 C-2,-8 -1.6,-11 0,-11 Z"/></g></g>`;
    return s;
  }

  function section(icao) {
    const G = D()[String(icao).toUpperCase()];
    if (!G) return '';
    const uid = 'tx-' + G.icao;
    const routes = G.routes.map((r, i) => `<button type="button" class="tx-rbtn${i === 0 ? ' on' : ''}" data-tx-route="${esc(r.id)}" aria-pressed="${i === 0}"><b>${esc(r.label)}</b><span>${esc(r.sub)}</span></button>`).join('');
    const rw = G.rwy.map((r) => `<li><b>${esc(r.a)}/${esc(r.b)}</b> ${r.s === 'grass' ? 'grass' : 'asphalt'}, ${esc(r.dim)}. ${esc(r.a)} is ${esc(r.ha)} true heading, ${esc(r.b)} is ${esc(r.hb)} true heading.</li>`).join('');
    return `
      <div class="tx" id="${uid}" data-tx="${esc(G.icao)}">
        <p class="af-line af-small tx-intro">Drawn to scale from the official aerodrome chart, north at the top. Pick a route, then press Play. Pinch, use + and −, or tap Enlarge to see it bigger.</p>
        <div class="tx-routes" role="group" aria-label="Choose a taxi route">${routes}</div>
        <div class="tx-stage" data-tx-stage>
          <svg class="tx-svg" xmlns="${NS}" role="img" aria-label="Ground diagram of ${esc(G.name)} with the chosen taxi route. Not for navigation." preserveAspectRatio="xMidYMid meet">${svgMarkup(G, uid)}</svg>
          <div class="tx-north" aria-hidden="true"><svg viewBox="0 0 20 26"><path d="M10 1 L16 22 L10 17 L4 22 Z"/></svg><span>N</span></div>
        </div>
        <div class="tx-foot" aria-hidden="true"><div class="tx-scale"><i></i><span></span></div><div class="tx-nfn">NOT FOR NAVIGATION</div></div>
        <div class="tx-ctrl">
          <button type="button" class="btn btn-primary tx-play" data-tx-play>▶ Play</button>
          <button type="button" class="tx-cbtn" data-tx-follow aria-pressed="false">Follow plane</button>
          <button type="button" class="tx-cbtn tx-sq" data-tx-zoom="out" aria-label="Zoom out">−</button>
          <button type="button" class="tx-cbtn tx-sq" data-tx-zoom="in" aria-label="Zoom in">+</button>
          <button type="button" class="tx-cbtn" data-tx-fit>Whole airfield</button>
          <button type="button" class="tx-cbtn" data-tx-sat aria-pressed="false">Satellite photo</button>
          <button type="button" class="tx-cbtn" data-tx-full>Enlarge</button>
        </div>
        <div class="tx-say" data-tx-say aria-live="polite"></div>
        <ol class="tx-steps" data-tx-steps></ol>
        <div class="tx-legend">
          <span><i class="lg rw"></i>Hard runway</span><span><i class="lg gr"></i>Grass runway</span>
          <span><i class="lg ta"></i>Taxiway A (asphalt)</span><span><i class="lg tb"></i>Taxiway B (grass matting)</span>
          <span><i class="lg ho"></i>Holding point</span><span><i class="lg ap"></i>Apron</span><span><i class="lg bd"></i>Building</span>
          <span><i class="lg rt"></i>Taxi route</span>
        </div>
        <ul class="tx-facts af-small">${rw}
          <li><b>Holding points on the chart:</b> A1, A2 and A3 on taxiway A (Alpha), and B1 on taxiway B (Bravo). Holds B2, B3, C and D were removed from the chart in AIRAC 6/2026, so older charts and maps may still show them.</li>
          <li>Make a call stating your intention before crossing the runway and before crossing A1, A2 or A3 on taxiway A.</li>
          <li>Taxiway B is grass with plastic matting: stay on the matting, as the grass gets waterlogged.</li>
          <li>Air/ground radio (A/G) only, callsign Wycombe Radio, 126.555 megahertz (MHz). No air traffic control (ATC): you are responsible for your own lookout and separation.</li>
        </ul>
        <div class="tx-cwc">
          <b>Check with airfield</b> (not published, so not drawn):
          <ul class="af-small">
            <li>Fuel pump location. The pilot brief mentions a fuel pump island near stands 1 to 10, but it is not mapped on the official chart.</li>
            <li>Which parking stand to use, and where visiting aircraft park.</li>
            <li>Where to do your engine power checks before departure.</li>
            <li>Where to enter and leave the grass runway 06G/24G. It may only be used with the aerodrome authority's approval.</li>
            <li>Where to vacate after landing, where to turn round when backtracking, and whether B1 can be used to vacate.</li>
            <li>The gliders' 'D' line (100 metres west of taxiway A, running north/south) and the helicopter hold points X-ray, Romeo and Zulu. They are described in the brief or chart but not precisely positioned, so they are not drawn. The helicopter hover-taxi route between X-ray and Romeo crosses taxiway A between A2 and A3.</li>
          </ul>
        </div>
        <details class="tx-src af-small"><summary>Sources</summary>
          <ul>
            <li>UK Aeronautical Information Publication (AIP), AD 2.EGTB, AIRAC 11/2026 (effective 29 Oct 2026): AD 2.8 taxiways, AD 2.12 runway threshold co-ordinates, AD 2.20 ground movement and warnings. <a href="https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/AIP/" target="_blank" rel="noopener">NATS Aeronautical Information Service (AIS)</a></li>
            <li>Aerodrome Chart – ICAO, AD 2.EGTB-2-1 (aero info date 27 Mar 2026). The drawing is traced from this chart, fitted to the four runway threshold co-ordinates to within about 0.2 metres.</li>
            <li>Wycombe Air Park Visiting Pilot Brief, effective 1 June 2025 (Aerodrome Manual Issue 6, Revision 3). <a href="https://bookeraviation.com/visiting-pilot-information/" target="_blank" rel="noopener">Booker Aviation visiting pilot information</a></li>
            <li>Satellite photo (optional, needs signal): Esri World Imagery. Imagery © Esri, Maxar, Earthstar Geographics and the GIS User Community.</li>
          </ul>
          <p>Original drawing for study only. Not for navigation. Always use the current AIP chart and the airfield's briefing.</p>
        </details>
      </div>`;
  }

  /* ---------- live controller ---------- */
  function Controller(root, G, opts) {
    opts = opts || {};
    const svg = root.querySelector('.tx-svg'), stage = root.querySelector('[data-tx-stage]');
    const [fx0, fy0, fx1, fy1] = G.frame;
    const FW = fx1 - fx0, FH = fy1 - fy0;
    const fc = [(fx0 + fx1) / 2, (fy0 + fy1) / 2];
    let view = { cx: fc[0], cy: fc[1], w: FW };
    let aspect = FH / FW, routeIx = 0, tl = null, t = 0, playing = false, last = 0, raf = 0, follow = false, lastEv = -1;
    const plane = svg.querySelector('.tx-plane'), planeR = svg.querySelector('.tx-plane-r');
    const rAll = svg.querySelector('.tx-route-all'), rDone = svg.querySelector('.tx-route-done');
    const sayEl = root.querySelector('[data-tx-say]'), stepsEl = root.querySelector('[data-tx-steps]');
    const playBtn = root.querySelector('[data-tx-play]');
    const lgs = [...svg.querySelectorAll('.tx-lg')];

    function size() {
      const W = stage.clientWidth || 358;
      if (opts.full) {
        const H = Math.max(240, stage.clientHeight || 400);
        aspect = H / W;
      } else aspect = FH / FW;
      svg.style.height = opts.full ? '100%' : Math.round(W * aspect) + 'px';
      return W;
    }
    function fitW() { return Math.max(FW, FH / aspect); }
    function clampView() {
      const fw = fitW();
      view.w = Math.max(fw / 10, Math.min(fw, view.w));
      const h = view.w * aspect, mx = Math.max(0, (fw - view.w) / 2 + (FW < fw ? 0 : 0)), my = Math.max(0, (fw * aspect - h) / 2);
      view.cx = Math.max(fc[0] - (fw - view.w) / 2 - 0, Math.min(fc[0] + (fw - view.w) / 2, view.cx));
      view.cy = Math.max(fc[1] - my, Math.min(fc[1] + my, view.cy));
      return mx;
    }
    function apply() {
      const W = stage.clientWidth || 358;
      clampView();
      const h = view.w * aspect;
      svg.setAttribute('viewBox', `${f1(view.cx - view.w / 2)} ${f1(-view.cy - h / 2)} ${f1(view.w)} ${f1(h)}`);
      const mpp = view.w / W, zoom = fitW() / view.w;
      const sc = mpp * Math.pow(zoom, 0.35);
      lgs.forEach((g) => {
        if (g.dataset.fixed) return;
        g.setAttribute('transform', `translate(${g.dataset.x},${g.dataset.y}) scale(${sc.toFixed(4)})`);
      });
      plane.dataset.sc = (mpp * Math.pow(zoom, 0.5)).toFixed(4);
      svg.style.setProperty('--px', mpp.toFixed(4));
      rDone.setAttribute('stroke-width', (4.5 * mpp).toFixed(3));
      // scale bar: pick a round length about 70 px long
      const target = 70 * mpp, nice = [10, 20, 25, 50, 100, 200, 250, 500].find((n) => n >= target * 0.7) || 500;
      const sb = root.querySelector('.tx-scale');
      if (sb) { sb.querySelector('i').style.width = Math.round(nice / mpp) + 'px'; sb.querySelector('span').textContent = nice + ' m'; }
      stage.style.touchAction = (opts.full || zoom > 1.02) ? 'none' : 'pan-y';
      root.classList.toggle('tx-zoomed', zoom > 1.02);
      drawPlane();
    }
    function at(time) {
      const T = tl.T; let lo = 0, hi = T.length - 1;
      if (time <= 0) return { p: tl.pts[0], i: 0 };
      if (time >= T[hi]) return { p: tl.pts[hi], i: hi };
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (T[m] <= time) lo = m; else hi = m; }
      const u = T[hi] > T[lo] ? (time - T[lo]) / (T[hi] - T[lo]) : 0;
      const a = tl.pts[lo], b = tl.pts[hi];
      return { p: [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u], i: lo, d: tl.dist[lo] + (tl.dist[hi] - tl.dist[lo]) * u };
    }
    function heading(i) {
      const P = tl.pts, a = P[Math.max(0, Math.min(i, P.length - 2))], b = P[Math.max(1, Math.min(i + 1, P.length - 1))];
      return Math.atan2(b[0] - a[0], b[1] - a[1]) * 180 / Math.PI;
    }
    function drawPlane() {
      if (!tl) return;
      const s = at(t), sc = parseFloat(plane.dataset.sc || '1');
      plane.setAttribute('transform', `translate(${f1(s.p[0])},${f1(-s.p[1])}) scale(${sc})`);
      planeR.setAttribute('transform', `rotate(${heading(s.i).toFixed(1)})`);
      const dd = s.d == null ? (t <= 0 ? 0 : tl.dist[tl.dist.length - 1]) : s.d, L = tl.dist[tl.dist.length - 1];
      rDone.style.strokeDasharray = `${f1(L)} ${f1(L + 10)}`;
      rDone.style.strokeDashoffset = f1(L - dd);
      // events
      let ev = -1;
      tl.evT.forEach((et, j) => { if (G.routes[routeIx].pts[j].say && t + 1e-6 >= et) ev = j; });
      if (ev !== lastEv) { lastEv = ev; showEvent(ev); }
      const hold = (() => { const r = G.routes[routeIx]; for (let j = 0; j < r.pts.length; j++) { const q = r.pts[j]; if (q.hold && t >= tl.evT[j] - 0.05 && t <= tl.evT[j] + q.pause / 1000 + 0.05) return q.hold; } return ''; })();
      svg.querySelectorAll('[data-hold]').forEach((el) => el.classList.toggle('on', el.dataset.hold === hold));
      if (follow && playing) { view.cx = s.p[0]; view.cy = s.p[1]; }
    }
    function showEvent(j) {
      const r = G.routes[routeIx];
      const items = [...stepsEl.children];
      items.forEach((li) => li.classList.toggle('on', +li.dataset.j === j));
      sayEl.textContent = j >= 0 ? r.pts[j].say : r.sub;
    }
    function setRoute(ix, autoplay) {
      routeIx = ix; const r = G.routes[ix];
      tl = timeline(r);
      const d = 'M' + tl.pts.map(pt).join(' L');
      rAll.setAttribute('d', d); rDone.setAttribute('d', d);
      stepsEl.innerHTML = r.pts.map((q, j) => q.say ? `<li data-j="${j}">${esc(q.say)}</li>` : '').join('');
      root.querySelectorAll('[data-tx-route]').forEach((b, i) => { b.classList.toggle('on', i === ix); b.setAttribute('aria-pressed', String(i === ix)); });
      t = 0; lastEv = -2; stop(); drawPlane(); apply();
      if (autoplay) play();
    }
    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      t += dt;
      if (t >= tl.total) { t = tl.total; playing = false; }
      if (follow) { const s = at(t); view.cx += (s.p[0] - view.cx) * 0.2; view.cy += (s.p[1] - view.cy) * 0.2; }
      apply();
      playBtn.textContent = playing ? '❚❚ Pause' : (t >= tl.total ? '↻ Replay' : '▶ Play');
      if (playing) raf = requestAnimationFrame(frame);
    }
    function play() {
      if (t >= tl.total) { t = 0; lastEv = -2; }
      if (follow && view.w > fitW() / 2.5) view.w = fitW() / 3;
      playing = true; last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
      playBtn.textContent = '❚❚ Pause';
    }
    function stop() { playing = false; cancelAnimationFrame(raf); if (playBtn) playBtn.textContent = t >= (tl ? tl.total : 1) ? '↻ Replay' : '▶ Play'; }
    function zoomBy(f, px, py) {
      const W = stage.clientWidth || 358, H = W * aspect;
      const old = view.w, nw = Math.max(fitW() / 10, Math.min(fitW(), old / f));
      if (px != null) { // keep the point under the fingers still
        const mx = view.cx + (px / W - 0.5) * old, my = view.cy - (py / H - 0.5) * old * aspect;
        view.cx = mx - (px / W - 0.5) * nw; view.cy = my + (py / H - 0.5) * nw * aspect;
      }
      view.w = nw; apply();
    }

    /* satellite underlay (Esri World Imagery, zoom 17), loaded only on request */
    let satLoaded = false;
    function loadSat() {
      if (satLoaded) return; satLoaded = true;
      const z = 17, n = 2 ** z, A = G.arp, cosl = Math.cos(A[0] * Math.PI / 180);
      const toLL = (e, nn) => [A[0] + nn / 111195, A[1] + e / (cosl * 111320)];
      const tx = (lon) => (lon + 180) / 360 * n;
      const ty = (lat) => (1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * n;
      const ll0 = toLL(fx0 - 150, fy1 + 150), ll1 = toLL(fx1 + 150, fy0 - 150);
      const X0 = Math.floor(tx(ll0[1])), X1 = Math.floor(tx(ll1[1])), Y0 = Math.floor(ty(ll0[0])), Y1 = Math.floor(ty(ll1[0]));
      const lon = (x) => x / n * 360 - 180, lat = (y) => Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
      const loc = (la, lo) => [(lo - A[1]) * cosl * 111320, (la - A[0]) * 111195];
      let h = '';
      for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
        const a = loc(lat(y), lon(x)), b = loc(lat(y + 1), lon(x + 1));
        h += `<image href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}" x="${f1(a[0])}" y="${f1(-a[1])}" width="${f1(b[0] - a[0] + 0.4)}" height="${f1(a[1] - b[1] + 0.4)}" preserveAspectRatio="none"/>`;
      }
      svg.querySelector('.tx-sat').innerHTML = h;
    }

    /* gestures: one finger drags when zoomed, two fingers pinch, double-tap zooms in */
    const ptrs = new Map(); let pinch0 = null, drag0 = null, lastTap = 0;
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      const r = stage.getBoundingClientRect();
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch0 = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), w: view.w, cx: view.cx, cy: view.cy, mx: (a[0] + b[0]) / 2 - r.left, my: (a[1] + b[1]) / 2 - r.top };
        drag0 = null;
      } else if (ptrs.size === 1) {
        drag0 = { x: e.clientX, y: e.clientY, cx: view.cx, cy: view.cy };
        const now = Date.now();
        if (now - lastTap < 300) zoomBy(2, e.clientX - r.left, e.clientY - r.top);
        lastTap = now;
      }
      if (opts.full || fitW() / view.w > 1.02 || ptrs.size === 2) { try { stage.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ } }
    });
    stage.addEventListener('pointermove', (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      const W = stage.clientWidth || 358;
      if (ptrs.size === 2 && pinch0) {
        const [a, b] = [...ptrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        const nw = Math.max(fitW() / 10, Math.min(fitW(), pinch0.w * pinch0.d / Math.max(10, d)));
        const H = W * aspect;
        const mx = pinch0.cx + (pinch0.mx / W - 0.5) * pinch0.w, my = pinch0.cy - (pinch0.my / H - 0.5) * pinch0.w * aspect;
        view.w = nw; view.cx = mx - (pinch0.mx / W - 0.5) * nw; view.cy = my + (pinch0.my / H - 0.5) * nw * aspect;
        apply(); e.preventDefault();
      } else if (drag0 && (opts.full || fitW() / view.w > 1.02)) {
        const k = view.w / W;
        view.cx = drag0.cx - (e.clientX - drag0.x) * k; view.cy = drag0.cy + (e.clientY - drag0.y) * k;
        apply(); e.preventDefault();
      }
    });
    const up = (e) => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = null; if (ptrs.size === 0) drag0 = null; };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    stage.addEventListener('wheel', (e) => { e.preventDefault(); const r = stage.getBoundingClientRect(); zoomBy(e.deltaY < 0 ? 1.25 : 0.8, e.clientX - r.left, e.clientY - r.top); }, { passive: false });

    root.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || !root.contains(b)) return;
      if (b.dataset.txRoute) setRoute(G.routes.findIndex((r) => r.id === b.dataset.txRoute), true);
      else if (b.hasAttribute('data-tx-play')) { if (playing) stop(); else play(); }
      else if (b.dataset.txZoom) zoomBy(b.dataset.txZoom === 'in' ? 1.6 : 1 / 1.6);
      else if (b.hasAttribute('data-tx-fit')) { follow = false; root.querySelector('[data-tx-follow]').setAttribute('aria-pressed', 'false'); view = { cx: fc[0], cy: fc[1], w: fitW() }; apply(); }
      else if (b.hasAttribute('data-tx-follow')) {
        follow = !follow; b.setAttribute('aria-pressed', String(follow));
        if (follow) { const s = at(t); view.w = Math.min(view.w, fitW() / 3); view.cx = s.p[0]; view.cy = s.p[1]; }
        else view = { cx: fc[0], cy: fc[1], w: fitW() };
        apply();
      } else if (b.hasAttribute('data-tx-sat')) {
        const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on));
        if (on) loadSat();
        svg.querySelector('.tx-sat').hidden = !on; root.classList.toggle('tx-sat-on', on);
      } else if (b.hasAttribute('data-tx-full')) openFull(G, routeIx);
      else if (b.hasAttribute('data-tx-close')) closeFull();
    });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { const fw0 = fitW(); size(); if (Math.abs(view.w - fw0) < 1) view.w = fitW(); apply(); }) : null;
    if (ro) ro.observe(stage);
    size(); view.w = fitW(); setRoute(opts.route || 0, !!opts.autoplay);
    return { destroy() { stop(); if (ro) ro.disconnect(); }, setRoute };
  }

  /* ---------- full screen ---------- */
  let full = null;
  function openFull(G, ix) {
    closeFull();
    const wrap = document.createElement('div');
    wrap.className = 'tx-full'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-label', 'Ground diagram, full screen');
    const tmp = document.createElement('div'); tmp.innerHTML = section(G.icao);
    const inner = tmp.firstElementChild; inner.classList.add('tx-is-full');
    wrap.innerHTML = `<div class="tx-full-head"><b>${esc(G.icao)} · ground and taxi</b><button type="button" class="tx-cbtn" data-tx-close>Close</button></div>`;
    wrap.appendChild(inner);
    document.body.appendChild(wrap);
    document.documentElement.classList.add('tx-noscroll');
    const c = Controller(inner, G, { full: true, route: ix, autoplay: false });
    wrap.addEventListener('click', (e) => { if (e.target.closest('[data-tx-close]')) closeFull(); });
    full = { wrap, c };
  }
  function closeFull() {
    if (!full) return;
    full.c.destroy(); full.wrap.remove(); full = null;
    document.documentElement.classList.remove('tx-noscroll');
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFull(); });

  const live = new Set();
  function mount(scope) {
    live.forEach((c) => c.destroy()); live.clear(); closeFull();
    (scope || document).querySelectorAll('.tx[data-tx]:not(.tx-is-full)').forEach((el) => {
      const G = D()[el.dataset.tx]; if (G) live.add(Controller(el, G, {}));
    });
  }
  return { has, section, mount, closeFull };
})();
if (typeof globalThis !== 'undefined') globalThis.TaxiUI = TaxiUI;
