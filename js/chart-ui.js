/* UK 1:500k VFR chart legend trainer UI — original schematics only */
const ChartUI = (() => {
  const DISCLAIMER =
    'Study aid — original schematic legend. Not a CAA/NATS chart. Confirm with current Half-Million, AIP, NOTAMs & instructor.';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function data() {
    return (typeof CHART_LEGEND !== 'undefined') ? CHART_LEGEND : { items: [], quiz: [], categories: [], meta: {} };
  }

  function items() {
    return data().items || [];
  }

  /* ——— Original schematic SVG previews (not real chart art) ——— */
  function schematic(item) {
    const id = item.id || '';
    const cat = item.category || '';
    const map = {
      'scale-basics': svgScale(),
      'lat-long': svgGrid(),
      'elevation': svgSpot(),
      'variation': svgIsogonal(),
      'class-a': svgSwatch('#1e4d8c', '#3b82f6', 'A', true),
      'class-c': svgSwatch('#1e3a5f', '#60a5fa', 'C', true),
      'class-d': svgSwatch('#1e3a5f', '#38bdf8', 'D', true),
      'class-e': svgSwatch('#0f2744', '#7dd3fc', 'E', false),
      'class-g': svgSwatch('#1a2f1a', '#86efac', 'G', false),
      'atz': svgDashedCircle('#c084fc', 'ATZ'),
      'ctr': svgSolidBox('#38bdf8', 'CTR'),
      'cta': svgBand('#38bdf8', 'CTA'),
      'tma': svgSteps('#3b82f6', 'TMA'),
      'matz': svgMatz(),
      'aiaa': svgDashedBox('#fbbf24', 'AIAA'),
      'danger': svgHatch('#ef4444', 'D…'),
      'restricted': svgHatch('#f97316', 'R…'),
      'prohibited': svgHatch('#dc2626', 'P…'),
      'hirta': svgDashedBox('#a78bfa', 'HIRTA'),
      'gliding': svgGlider(),
      'parachute': svgChute(),
      'obstacle': svgMast(),
      'aero-civil': svgAero('#e2e8f0'),
      'aero-military': svgAero('#fbbf24'),
      'aero-disused': svgAeroHollow(),
      'helipad': svgHeli(),
      'vrp': svgTriangle('#f5c842'),
      'reporting': svgDiamond('#4fc3f7'),
      'isogonal-sym': svgIsogonal(),
      'danger-notes': svgNote(),
      'town-road': svgTopo(),
      'radio-freqs': svgRadio(),
      'fis': svgRadio(),
      'safetycom': svgRadio(),
      'contours': svgSpot(),
      'water': svgTopo(),
      'vor': svgRadio(),
      'ndb': svgRadio()
    };
    if (map[id]) return map[id];
    if (cat === 'airspace') return svgSwatch('#1e3a5f', '#38bdf8', '·', false);
    if (cat === 'hazards') return svgHatch('#ef4444', '!');
    if (cat === 'aerodromes') return svgAero('#e2e8f0');
    return svgGeneric();
  }

  function frame(inner) {
    return `<svg class="chart-svg" viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="120" height="72" rx="8" fill="#0c1a30" stroke="rgba(79,195,247,0.25)"/>
      ${inner}
    </svg>`;
  }

  function svgScale() {
    return frame(`
      <text x="10" y="18" fill="#8ba0bc" font-size="8" font-family="system-ui">1:500,000</text>
      <line x1="10" y1="40" x2="110" y2="40" stroke="#4fc3f7" stroke-width="2"/>
      <line x1="10" y1="34" x2="10" y2="46" stroke="#4fc3f7" stroke-width="2"/>
      <line x1="60" y1="34" x2="60" y2="46" stroke="#4fc3f7" stroke-width="2"/>
      <line x1="110" y1="34" x2="110" y2="46" stroke="#4fc3f7" stroke-width="2"/>
      <text x="8" y="60" fill="#c9d6e8" font-size="7">0</text>
      <text x="52" y="60" fill="#c9d6e8" font-size="7">5 km</text>
      <text x="95" y="60" fill="#c9d6e8" font-size="7">10</text>`);
  }
  function svgGrid() {
    return frame(`
      <g stroke="rgba(79,195,247,0.35)" stroke-width="0.8">
        <line x1="20" y1="8" x2="20" y2="64"/><line x1="40" y1="8" x2="40" y2="64"/>
        <line x1="60" y1="8" x2="60" y2="64"/><line x1="80" y1="8" x2="80" y2="64"/>
        <line x1="100" y1="8" x2="100" y2="64"/>
        <line x1="8" y1="20" x2="112" y2="20"/><line x1="8" y1="36" x2="112" y2="36"/>
        <line x1="8" y1="52" x2="112" y2="52"/>
      </g>
      <text x="22" y="16" fill="#7dd3fc" font-size="7">N</text>
      <text x="100" y="68" fill="#7dd3fc" font-size="7">E</text>`);
  }
  function svgSpot() {
    return frame(`
      <circle cx="40" cy="36" r="2.5" fill="#f5c842"/>
      <text x="48" y="40" fill="#f5c842" font-size="11" font-weight="700">842</text>
      <text x="48" y="52" fill="#8ba0bc" font-size="7">ft AMSL</text>
      <path d="M85 55 Q95 30 105 50" fill="none" stroke="#86efac" stroke-width="1.2" opacity="0.7"/>
      <text x="88" y="20" fill="#8ba0bc" font-size="6">MEF</text>
      <text x="88" y="30" fill="#86efac" font-size="9" font-weight="700">12</text>`);
  }
  function svgIsogonal() {
    return frame(`
      <path d="M5 50 Q40 20 70 40 T115 25" fill="none" stroke="#fb923c" stroke-width="1.5"
        stroke-dasharray="6 4"/>
      <text x="42" y="28" fill="#fb923c" font-size="8">1°W</text>
      <text x="70" y="60" fill="#8ba0bc" font-size="7">isogonal</text>`);
  }
  function svgSwatch(bg, border, label, solid) {
    return frame(`
      <rect x="18" y="14" width="84" height="44" rx="4" fill="${bg}"
        stroke="${border}" stroke-width="${solid ? 2.5 : 1.5}"
        stroke-dasharray="${solid ? '0' : '5 3'}" opacity="0.95"/>
      <text x="60" y="42" text-anchor="middle" fill="#e8eef7" font-size="16" font-weight="800">${label}</text>`);
  }
  function svgDashedCircle(color, label) {
    return frame(`
      <circle cx="60" cy="36" r="24" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="60" cy="36" r="3" fill="${color}"/>
      <text x="60" y="68" text-anchor="middle" fill="${color}" font-size="8">${label}</text>`);
  }
  function svgSolidBox(color, label) {
    return frame(`
      <rect x="22" y="12" width="76" height="48" rx="3" fill="rgba(56,189,248,0.15)"
        stroke="${color}" stroke-width="2.5"/>
      <text x="60" y="42" text-anchor="middle" fill="${color}" font-size="14" font-weight="800">${label}</text>`);
  }
  function svgBand(color, label) {
    return frame(`
      <rect x="10" y="8" width="100" height="20" fill="rgba(56,189,248,0.35)" stroke="${color}" stroke-width="1.5"/>
      <text x="60" y="22" text-anchor="middle" fill="#e8eef7" font-size="9" font-weight="700">${label} upper</text>
      <rect x="10" y="28" width="100" height="16" fill="rgba(134,239,172,0.12)" stroke="#86efac" stroke-width="1" stroke-dasharray="3 2"/>
      <text x="60" y="40" text-anchor="middle" fill="#86efac" font-size="8">under base · Class G?</text>
      <text x="60" y="62" text-anchor="middle" fill="#8ba0bc" font-size="7">read vertical limits</text>`);
  }
  function svgSteps(color, label) {
    return frame(`
      <path d="M10 55 L10 40 L40 40 L40 28 L70 28 L70 16 L110 16 L110 55 Z"
        fill="rgba(59,130,246,0.25)" stroke="${color}" stroke-width="2"/>
      <text x="75" y="36" fill="#e8eef7" font-size="10" font-weight="700">${label}</text>
      <text x="14" y="66" fill="#8ba0bc" font-size="6">stepped bases</text>`);
  }
  function svgMatz() {
    return frame(`
      <circle cx="50" cy="38" r="20" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
      <path d="M68 28 L100 18 L100 48 L68 48 Z" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="50" cy="38" r="2.5" fill="#fbbf24"/>
      <text x="60" y="68" text-anchor="middle" fill="#fbbf24" font-size="8">MATZ + stub</text>`);
  }
  function svgDashedBox(color, label) {
    return frame(`
      <rect x="16" y="12" width="88" height="42" rx="2" fill="none" stroke="${color}"
        stroke-width="2" stroke-dasharray="6 4"/>
      <text x="60" y="38" text-anchor="middle" fill="${color}" font-size="12" font-weight="700">${label}</text>`);
  }
  function svgHatch(color, label) {
    return frame(`
      <defs><pattern id="hatch-${label.replace(/[^a-z0-9]/gi,'')}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="${color}" stroke-width="2" opacity="0.7"/>
      </pattern></defs>
      <rect x="18" y="12" width="84" height="44" rx="2" fill="url(#hatch-${label.replace(/[^a-z0-9]/gi,'')})"
        stroke="${color}" stroke-width="2"/>
      <text x="60" y="40" text-anchor="middle" fill="#e8eef7" font-size="14" font-weight="800">${label}</text>`);
  }
  function svgGlider() {
    return frame(`
      <line x1="20" y1="38" x2="100" y2="38" stroke="#e2e8f0" stroke-width="2.5"/>
      <line x1="60" y1="30" x2="60" y2="48" stroke="#e2e8f0" stroke-width="2"/>
      <path d="M55 30 L60 22 L65 30 Z" fill="#e2e8f0"/>
      <text x="60" y="64" text-anchor="middle" fill="#8ba0bc" font-size="7">gliding</text>`);
  }
  function svgChute() {
    return frame(`
      <path d="M40 22 Q60 8 80 22" fill="none" stroke="#f472b6" stroke-width="2.5"/>
      <path d="M40 22 L60 48 L80 22" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <circle cx="60" cy="52" r="4" fill="#f472b6"/>
      <text x="60" y="68" text-anchor="middle" fill="#f472b6" font-size="7">parachute</text>`);
  }
  function svgMast() {
    return frame(`
      <line x1="60" y1="58" x2="60" y2="14" stroke="#fb923c" stroke-width="2"/>
      <line x1="48" y1="28" x2="72" y2="28" stroke="#fb923c" stroke-width="1.5"/>
      <line x1="52" y1="40" x2="68" y2="40" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="60" cy="12" r="3" fill="#fb923c"/>
      <text x="72" y="20" fill="#fb923c" font-size="9" font-weight="700">1240</text>
      <text x="72" y="30" fill="#8ba0bc" font-size="6">(300)</text>`);
  }
  function svgAero(color) {
    return frame(`
      <circle cx="60" cy="36" r="18" fill="none" stroke="${color}" stroke-width="2"/>
      <rect x="42" y="33" width="36" height="6" rx="1" fill="${color}"/>
      <text x="60" y="64" text-anchor="middle" fill="${color}" font-size="7">aerodrome</text>`);
  }
  function svgAeroHollow() {
    return frame(`
      <circle cx="60" cy="36" r="18" fill="none" stroke="#8ba0bc" stroke-width="1.5" stroke-dasharray="3 3"/>
      <rect x="42" y="33" width="36" height="6" rx="1" fill="none" stroke="#8ba0bc" stroke-width="1.5"/>
      <text x="60" y="64" text-anchor="middle" fill="#8ba0bc" font-size="7">disused</text>`);
  }
  function svgHeli() {
    return frame(`
      <circle cx="60" cy="36" r="18" fill="none" stroke="#4fc3f7" stroke-width="2"/>
      <text x="60" y="42" text-anchor="middle" fill="#4fc3f7" font-size="22" font-weight="800">H</text>`);
  }
  function svgTriangle(color) {
    return frame(`
      <path d="M60 14 L90 58 L30 58 Z" fill="${color}" stroke="#0a1628" stroke-width="1"/>
      <text x="60" y="68" text-anchor="middle" fill="${color}" font-size="8">VRP</text>`);
  }
  function svgDiamond(color) {
    return frame(`
      <path d="M60 12 L88 36 L60 60 L32 36 Z" fill="none" stroke="${color}" stroke-width="2.5"/>
      <text x="60" y="40" text-anchor="middle" fill="${color}" font-size="8">RPT</text>`);
  }
  function svgNote() {
    return frame(`
      <rect x="16" y="12" width="88" height="44" rx="4" fill="#152a4a" stroke="#f87171" stroke-width="1.5"/>
      <text x="24" y="28" fill="#f87171" font-size="7" font-weight="700">D026 · H24 / NOTAM</text>
      <text x="24" y="42" fill="#c9d6e8" font-size="7">SFC–FL100 · see ENR</text>
      <text x="24" y="54" fill="#8ba0bc" font-size="6">activation note (schematic)</text>`);
  }
  function svgTopo() {
    return frame(`
      <rect x="14" y="30" width="30" height="22" rx="2" fill="#64748b" opacity="0.7"/>
      <line x1="50" y1="50" x2="110" y2="28" stroke="#94a3b8" stroke-width="3"/>
      <line x1="50" y1="54" x2="110" y2="32" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2 2"/>
      <path d="M10 20 Q40 10 70 22 T115 18" fill="none" stroke="#38bdf8" stroke-width="2"/>
      <text x="16" y="28" fill="#8ba0bc" font-size="6">town</text>`);
  }
  function svgRadio() {
    return frame(`
      <rect x="28" y="20" width="64" height="32" rx="4" fill="#152a4a" stroke="#4fc3f7" stroke-width="1.5"/>
      <text x="60" y="34" text-anchor="middle" fill="#4fc3f7" font-size="9" font-weight="700">118.700</text>
      <text x="60" y="46" text-anchor="middle" fill="#8ba0bc" font-size="7">APP / TWR</text>
      <circle cx="22" cy="28" r="3" fill="#34d399"/><circle cx="22" cy="40" r="3" fill="#34d399"/>`);
  }
  function svgGeneric() {
    return frame(`<text x="60" y="40" text-anchor="middle" fill="#8ba0bc" font-size="10">symbol</text>`);
  }

  function filtered(q, cat) {
    const needle = (q || '').trim().toLowerCase();
    return items().filter(e => {
      if (cat && cat !== 'all' && cat !== 'practice') {
        if (e.category !== cat) return false;
      }
      if (!needle) return true;
      const hay = (
        e.title + ' ' + (e.appearance || '') + ' ' + (e.what || '') + ' ' +
        (e.flight || '') + ' ' + (e.tags || '') + ' ' + (e.category || '')
      ).toLowerCase();
      return needle.split(/\s+/).every(p => hay.includes(p));
    });
  }

  function catLabel(id) {
    const c = (data().categories || []).find(x => x.id === id);
    return c ? c.label : id;
  }


  /* ——— Original study mock of a UK 1:500k-style VFR chart (NOT NATS/CAA art) ——— */
  function sampleMapSvg() {
    return `<svg class="chart-map-svg" viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Original schematic UK-style VFR chart study mock">
      <defs>
        <pattern id="hatchD" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" stroke-width="2" opacity="0.55"/>
        </pattern>
        <linearGradient id="relief" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1a3a28"/><stop offset="55%" stop-color="#0f2744"/><stop offset="100%" stop-color="#1a2f1a"/>
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#relief)"/>
      <!-- graticule -->
      <g stroke="rgba(125,211,252,0.2)" stroke-width="0.8">
        ${[80,160,240,320,400,480,560].map(x=>`<line x1="${x}" y1="20" x2="${x}" y2="380"/>`).join('')}
        ${[60,120,180,240,300,360].map(y=>`<line x1="20" y1="${y}" x2="620" y2="${y}"/>`).join('')}
      </g>
      <!-- coast / river -->
      <path d="M20 300 C120 280,180 320,280 300 S420 260,520 290 S620 320,640 310" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.85"/>
      <ellipse cx="520" cy="200" rx="36" ry="18" fill="#0ea5e9" opacity="0.35" stroke="#38bdf8"/>
      <text x="500" y="205" fill="#7dd3fc" font-size="9">Reservoir</text>
      <!-- Class D CTR box -->
      <rect x="210" y="110" width="130" height="100" rx="4" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="2"/>
      <text x="235" y="130" fill="#7dd3fc" font-size="11" font-weight="700">CTR Class D</text>
      <text x="240" y="148" fill="#94a3b8" font-size="9">SFC–2500′</text>
      <!-- TMA shelf -->
      <path d="M40 40 H400 V100 H40 Z" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="2"/>
      <text x="50" y="60" fill="#93c5fd" font-size="11" font-weight="700">TMA / Class A shelf</text>
      <text x="50" y="78" fill="#94a3b8" font-size="9">Base 2500′ — stay below</text>
      <!-- ATZ -->
      <circle cx="275" cy="160" r="28" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="5 3"/>
      <text x="258" y="164" fill="#e9d5ff" font-size="10" font-weight="700">ATZ</text>
      <!-- MATZ stub -->
      <path d="M430 80 h90 v70 h-30 v40 h-60 z" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="6 3"/>
      <text x="448" y="100" fill="#fde68a" font-size="10" font-weight="700">MATZ</text>
      <!-- Danger area -->
      <rect x="70" y="200" width="90" height="70" fill="url(#hatchD)" stroke="#ef4444" stroke-width="2"/>
      <text x="88" y="240" fill="#fecaca" font-size="11" font-weight="700">D123</text>
      <!-- Aerodromes -->
      <g transform="translate(275 160)">
        <circle r="5" fill="#e2e8f0"/><text x="10" y="4" fill="#e2e8f0" font-size="10">EGTB</text>
      </g>
      <g transform="translate(150 250)">
        <circle r="5" fill="#e2e8f0"/><text x="10" y="4" fill="#e2e8f0" font-size="10">EGLD</text>
      </g>
      <g transform="translate(360 280)">
        <circle r="4" fill="none" stroke="#94a3b8" stroke-width="1.5"/><text x="10" y="4" fill="#94a3b8" font-size="9">Disused</text>
      </g>
      <!-- VRP -->
      <path d="M190 95 L198 110 L182 110 Z" fill="#f5c842"/>
      <text x="202" y="108" fill="#f5c842" font-size="9">VRP</text>
      <!-- Obstacle -->
      <line x1="400" y1="220" x2="400" y2="190" stroke="#f87171" stroke-width="2"/>
      <path d="M400 190 l-6 10 h12 z" fill="#f87171"/>
      <text x="408" y="200" fill="#fca5a5" font-size="9">Mast 842′</text>
      <!-- Roads / town -->
      <path d="M100 340 L300 320 L500 350" fill="none" stroke="#a8a29e" stroke-width="2"/>
      <rect x="300" y="300" width="50" height="28" rx="3" fill="rgba(168,162,158,0.35)" stroke="#a8a29e"/>
      <text x="308" y="318" fill="#d6d3d1" font-size="9">Town</text>
      <!-- VOR -->
      <g transform="translate(560 120)">
        <circle r="10" fill="none" stroke="#4fc3f7" stroke-width="1.5"/>
        <circle r="3" fill="#4fc3f7"/>
        <text x="14" y="4" fill="#7dd3fc" font-size="9">VOR</text>
      </g>
      <!-- NDB -->
      <g transform="translate(560 160)">
        <circle r="6" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle r="2" fill="#a78bfa"/>
        <text x="12" y="4" fill="#c4b5fd" font-size="9">NDB</text>
      </g>
      <!-- Spot / MEF -->
      <text x="480" y="60" fill="#86efac" font-size="12" font-weight="700">MEF 12</text>
      <text x="480" y="74" fill="#8ba0bc" font-size="8">×100 ft</text>
      <!-- Scale bar -->
      <g transform="translate(40 370)">
        <line x1="0" y1="0" x2="100" y2="0" stroke="#4fc3f7" stroke-width="2"/>
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#4fc3f7"/><line x1="50" y1="-5" x2="50" y2="5" stroke="#4fc3f7"/><line x1="100" y1="-5" x2="100" y2="5" stroke="#4fc3f7"/>
        <text x="0" y="16" fill="#8ba0bc" font-size="8">0</text>
        <text x="40" y="16" fill="#8ba0bc" font-size="8">5 km</text>
        <text x="88" y="16" fill="#8ba0bc" font-size="8">10</text>
      </g>
      <text x="200" y="24" fill="#7dd3fc" font-size="12" font-weight="700">STUDY MOCK · 1:500,000 style · NOT a NATS/CAA chart</text>
      <text x="200" y="40" fill="#8ba0bc" font-size="9">Original schematic for NPPL microlight legend training</text>
    </svg>`;
  }

  function mapBlock() {
    return `
      <div class="section-label">Chart picture (study mock)</div>
      <p class="chart-map-caption">Original SVG illustration — UK Half-Million <em>style</em> only. Pinch/scroll to pan &amp; zoom on phone. Not copyrighted chart artwork.</p>
      <div class="chart-map-toolbar">
        <button type="button" class="btn btn-secondary" id="chart-zoom-out">−</button>
        <button type="button" class="btn btn-secondary" id="chart-zoom-reset">Reset</button>
        <button type="button" class="btn btn-secondary" id="chart-zoom-in">+</button>
      </div>
      <div class="chart-map-wrap">
        <div class="chart-map-scroll" id="chart-map-scroll">${sampleMapSvg()}</div>
      </div>`;
  }

  let tourIndex = 0;

  function tourIds() {
    const d = data();
    if (d.tourSteps && d.tourSteps.length) return d.tourSteps.slice();
    return items().map(i => i.id);
  }

  function viewTour(ctx) {
    const ids = tourIds();
    if (tourIndex < 0) tourIndex = 0;
    if (tourIndex >= ids.length) tourIndex = ids.length - 1;
    const id = ids[tourIndex];
    const e = items().find(x => x.id === id) || items()[0];
    const pct = ids.length ? Math.round(((tourIndex + 1) / ids.length) * 100) : 0;
    ctx.titleEl.textContent = 'Legend tour';
    return `
      <div class="disclaimer-inline">${esc(DISCLAIMER)}</div>
      ${mapBlock()}
      <div class="chart-tour-card">
        <div class="chart-tour-step">Step ${tourIndex + 1} of ${ids.length}</div>
        <div class="chart-tour-progress"><i style="width:${pct}%"></i></div>
        <span class="chart-cat-pill">${esc(catLabel(e.category))}</span>
        <div class="chart-schematic" style="margin:8px 0">${schematic(e)}</div>
        <h2 style="font-size:1.1rem;margin:0 0 8px">${esc(e.title)}</h2>
        <div class="chart-block"><div class="chart-label">On the legend / chart</div><p>${esc(e.appearance)}</p></div>
        <div class="chart-block"><div class="chart-label">What it means</div><p>${esc(e.what)}</p></div>
        <div class="chart-flight"><div class="chart-label">Microlight NPPL tip</div><p>${esc(e.flight)}</p></div>
        <div class="chart-tour-actions">
          <button type="button" class="btn btn-secondary" id="tour-prev" ${tourIndex === 0 ? 'disabled' : ''}>Prev</button>
          <button type="button" class="btn btn-secondary" id="tour-speak">🔊</button>
          <button type="button" class="btn btn-primary" id="tour-next">${tourIndex >= ids.length - 1 ? 'Done' : 'Next'}</button>
        </div>
      </div>
      <button type="button" class="btn btn-secondary" id="tour-exit" style="width:100%">Back to legend list</button>`;
  }


  function view(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = '1:500k Chart';
    ctx.btnBack.hidden = false;

    const initialQ = (ctx.route && ctx.route.q) ? String(ctx.route.q) : '';
    const initialCat = (ctx.route && ctx.route.cat) ? String(ctx.route.cat) : 'all';
    const mode = (ctx.route && ctx.route.mode === 'quiz') || initialCat === 'practice' ? 'quiz'
      : ((ctx.route && ctx.route.mode === 'tour') || initialCat === 'tour') ? 'tour' : 'legend';
    const list = filtered(initialQ, (initialCat === 'practice' || initialCat === 'tour') ? 'all' : initialCat);
    const meta = data().meta || {};

    if (mode === 'quiz') {
      return viewQuizShell(ctx);
    }
    if (mode === 'tour') {
      return viewTour(ctx);
    }

    return `
      <p class="meta gloss-intro">${esc(meta.scale || '1:500,000')} VFR · UK Half-Million legend trainer · NPPL microlight</p>
      <div class="chart-banner callout-gold" style="margin-bottom:12px;padding:10px 12px;border-radius:10px;font-size:0.82rem;line-height:1.45">
        <strong>Original schematics only</strong> — colour swatches &amp; symbols teach the same ideas as a UK Half-Million legend. Not a real CAA/NATS chart image.
      </div>
      ${mapBlock()}
      <div class="btn-row" style="margin-bottom:12px">
        <button type="button" class="btn btn-primary" id="chart-start-tour">Legend walk-through</button>
        <button type="button" class="btn btn-secondary" id="chart-start-quiz">Quiz</button>
      </div>
      <div class="gloss-search-wrap sticky-tools">
        <input type="search" id="chart-q" class="search-input" placeholder="Filter: ATZ, MATZ, Class D, VRP…"
          value="${esc(initialQ)}" autocomplete="off" enterkeyhint="search" />
        <div class="chip-row chart-chips" id="chart-chips" style="margin-bottom:0;margin-top:10px">
          ${(data().categories || []).map(c => `
            <button type="button" class="chip${(initialCat === c.id || (c.id === 'all' && !initialCat)) ? ' active' : ''}"
              data-chart-cat="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
        </div>
      </div>
      <div id="chart-count" class="meta gloss-count">${list.length} legend items</div>
      <div id="chart-list">${renderList(list)}</div>
      <div class="disclaimer-inline">${esc(DISCLAIMER)}</div>`;
  }

  function renderList(list) {
    if (!list.length) {
      return `<div class="empty-state">No matches. Try ATZ, Danger, Class G, VRP…</div>`;
    }
    let html = '';
    let lastCat = null;
    for (const e of list) {
      if (e.category !== lastCat) {
        lastCat = e.category;
        html += `<div class="gloss-letter chart-cat-head">${esc(catLabel(e.category))}</div>`;
      }
      html += `
        <article class="chart-card" data-chart-id="${esc(e.id)}" id="chart-item-${esc(e.id)}">
          <div class="chart-card-top">
            <div class="chart-schematic">${schematic(e)}</div>
            <div class="chart-card-title">
              <h3>${esc(e.title)}</h3>
              <span class="gloss-tag abbr">${esc(catLabel(e.category))}</span>
            </div>
          </div>
          <div class="chart-block">
            <div class="chart-label">Symbol / appearance</div>
            <p>${esc(e.appearance)}</p>
          </div>
          <div class="chart-block">
            <div class="chart-label">What it is</div>
            <p>${esc(e.what)}</p>
          </div>
          <div class="chart-flight">
            <div class="chart-label">For your microlight flight</div>
            <p>${esc(e.flight)}</p>
          </div>
          <button type="button" class="icon-btn gloss-speak chart-speak" data-chart-speak="${esc(e.id)}"
            aria-label="Speak" title="Speak">🔊</button>
        </article>`;
    }
    return html;
  }

  function viewQuizShell(ctx) {
    ctx.titleEl.textContent = 'Chart quiz';
    return `
      <div id="chart-quiz-root" class="chart-quiz">
        <p class="meta gloss-intro">What does this mean? · UK Half-Million concepts · microlight VFR</p>
        <div id="chart-quiz-body"></div>
        <div class="disclaimer-inline">${esc(DISCLAIMER)}</div>
      </div>`;
  }

  function bindMapZoom() {
    const scroll = document.getElementById('chart-map-scroll');
    const svg = scroll && scroll.querySelector('.chart-map-svg');
    if (!svg) return;
    let scale = 1;
    const apply = () => { svg.style.width = (150 * scale) + '%'; };
    const zin = document.getElementById('chart-zoom-in');
    const zout = document.getElementById('chart-zoom-out');
    const zre = document.getElementById('chart-zoom-reset');
    if (zin) zin.addEventListener('click', () => { scale = Math.min(3, scale + 0.25); apply(); });
    if (zout) zout.addEventListener('click', () => { scale = Math.max(0.75, scale - 0.25); apply(); });
    if (zre) zre.addEventListener('click', () => { scale = 1; apply(); });
  }

  function bindTour(ctx) {
    bindMapZoom();
    const ids = tourIds();
    const prev = document.getElementById('tour-prev');
    const next = document.getElementById('tour-next');
    const exit = document.getElementById('tour-exit');
    const speak = document.getElementById('tour-speak');
    if (prev) prev.addEventListener('click', () => {
      tourIndex = Math.max(0, tourIndex - 1);
      ctx.go('chart', { mode: 'tour' });
    });
    if (next) next.addEventListener('click', () => {
      if (tourIndex >= ids.length - 1) {
        tourIndex = 0;
        ctx.go('chart', {}, { replace: true });
        return;
      }
      tourIndex += 1;
      ctx.go('chart', { mode: 'tour' });
    });
    if (exit) exit.addEventListener('click', () => ctx.go('chart', {}, { replace: true }));
    if (speak) speak.addEventListener('click', () => {
      const id = ids[tourIndex];
      const entry = items().find(e => e.id === id);
      if (!entry) return;
      const text = [entry.title, entry.what, 'For your flight.', entry.flight].join(' ');
      if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
    });
  }

  function bind(ctx) {
    if ((ctx.route && ctx.route.mode === 'quiz') || (ctx.route && ctx.route.cat === 'practice')) {
      bindQuiz(ctx);
      return;
    }
    if ((ctx.route && ctx.route.mode === 'tour') || (ctx.route && ctx.route.cat === 'tour')) {
      bindTour(ctx);
      return;
    }

    const input = document.getElementById('chart-q');
    const listEl = document.getElementById('chart-list');
    const countEl = document.getElementById('chart-count');
    let cat = (ctx.route && ctx.route.cat && ctx.route.cat !== 'practice') ? ctx.route.cat : 'all';
    let timer = null;

    function refresh() {
      if (cat === 'practice') {
        ctx.go('chart', { mode: 'quiz' });
        return;
      }
      if (cat === 'tour') {
        tourIndex = 0;
        ctx.go('chart', { mode: 'tour' });
        return;
      }
      const q = input ? input.value : '';
      const list = filtered(q, cat);
      if (countEl) countEl.textContent = list.length + ' legend items';
      if (listEl) listEl.innerHTML = renderList(list);
      wireSpeak();
      // Deep-link highlight
      if (ctx.route && ctx.route.id) {
        const el = document.getElementById('chart-item-' + ctx.route.id);
        if (el) {
          el.classList.add('chart-card-hl');
          try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) {}
        }
      }
    }

    if (input) {
      input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(refresh, 120);
      });
      if (input.value) {
        try { input.focus(); } catch (_) {}
      }
    }

    document.querySelectorAll('[data-chart-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cat = btn.dataset.chartCat || 'all';
        document.querySelectorAll('[data-chart-cat]').forEach(b =>
          b.classList.toggle('active', b === btn)
        );
        if (cat === 'practice') {
          ctx.go('chart', { mode: 'quiz' });
          return;
        }
        if (cat === 'tour') {
          tourIndex = 0;
          ctx.go('chart', { mode: 'tour' });
          return;
        }
        refresh();
      });
    });

    const quizBtn = document.getElementById('chart-start-quiz');
    if (quizBtn) quizBtn.addEventListener('click', () => ctx.go('chart', { mode: 'quiz' }));
    const tourBtn = document.getElementById('chart-start-tour');
    if (tourBtn) tourBtn.addEventListener('click', () => { tourIndex = 0; ctx.go('chart', { mode: 'tour' }); });
    bindMapZoom();

    function wireSpeak() {
      document.querySelectorAll('[data-chart-speak]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const entry = items().find(e => e.id === btn.dataset.chartSpeak);
          if (!entry) return;
          const text = [entry.title, entry.what, 'For your flight.', entry.flight].join(' ');
          if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
        });
      });
    }
    refresh();
  }

  function bindQuiz(ctx) {
    const root = document.getElementById('chart-quiz-body');
    if (!root) return;
    const quiz = (data().quiz || []).slice();
    // shuffle copy
    for (let i = quiz.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    let idx = 0;
    let score = 0;
    let locked = false;

    /* back: goBack() */

    function render() {
      if (idx >= quiz.length) {
        root.innerHTML = `
          <div class="card" style="text-align:center;padding:24px">
            <h2 style="margin-bottom:8px">Quiz complete</h2>
            <p class="meta" style="font-size:1.2rem;color:var(--sky);font-weight:700">${score} / ${quiz.length} correct</p>
            <p class="meta" style="margin:12px 0">Re-read any weak topics in the legend, then confirm with your chart &amp; instructor.</p>
            <button type="button" class="btn btn-primary" id="chart-quiz-again" style="width:100%;margin-top:8px">Try again</button>
            <button type="button" class="btn btn-secondary" id="chart-quiz-back" style="width:100%;margin-top:8px">Back to legend</button>
          </div>`;
        const again = document.getElementById('chart-quiz-again');
        const back = document.getElementById('chart-quiz-back');
        if (again) again.addEventListener('click', () => ctx.go('chart', { mode: 'quiz' }, { replace: true }));
        if (back) back.addEventListener('click', () => {
          if (typeof ctx.goBack === 'function') ctx.goBack();
          else ctx.go('chart', {}, { replace: true });
        });
        return;
      }
      const q = quiz[idx];
      locked = false;
      root.innerHTML = `
        <div class="meta chart-quiz-prog">Question ${idx + 1} of ${quiz.length} · score ${score}</div>
        <div class="card chart-quiz-q">
          <h3 style="margin-bottom:14px;line-height:1.35">${esc(q.prompt)}</h3>
          <div class="chart-quiz-opts">
            ${q.options.map((opt, i) => `
              <button type="button" class="btn btn-secondary chart-opt" data-opt="${i}"
                style="width:100%;margin-bottom:8px;text-align:left;white-space:normal;height:auto;padding:12px 14px">${esc(opt)}</button>`).join('')}
          </div>
          <div id="chart-quiz-feedback" class="chart-quiz-fb hidden"></div>
          <button type="button" class="btn btn-primary hidden" id="chart-quiz-next" style="width:100%;margin-top:10px">Next</button>
        </div>`;
      root.querySelectorAll('.chart-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          if (locked) return;
          locked = true;
          const choice = parseInt(btn.dataset.opt, 10);
          const ok = choice === q.answer;
          if (ok) score++;
          root.querySelectorAll('.chart-opt').forEach((b, i) => {
            b.disabled = true;
            if (i === q.answer) b.classList.add('chart-opt-ok');
            if (i === choice && !ok) b.classList.add('chart-opt-bad');
          });
          const fb = document.getElementById('chart-quiz-feedback');
          if (fb) {
            fb.classList.remove('hidden');
            fb.innerHTML = `<strong>${ok ? 'Correct' : 'Not quite'}</strong> — ${esc(q.explain)}`;
            fb.style.borderColor = ok ? 'rgba(52,211,153,0.45)' : 'rgba(248,113,113,0.45)';
          }
          const next = document.getElementById('chart-quiz-next');
          if (next) {
            next.classList.remove('hidden');
            next.addEventListener('click', () => { idx++; render(); });
          }
        });
      });
    }
    render();
  }

  return { view, bind, filtered, items, data };
})();
