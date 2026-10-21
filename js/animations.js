/* SVG / CSS diagram builders for lessons + skills modules */
const Diagrams = {
  airflow() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wing" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#2896c8"/>
    </linearGradient>
  </defs>
  <rect width="320" height="140" fill="#081420"/>
  <path class="anim-flow" d="M10 40 Q80 20 160 35 T310 30" fill="none" stroke="#7dd3fc" stroke-width="2"/>
  <path class="anim-flow" d="M10 55 Q80 45 160 50 T310 48" fill="none" stroke="#4fc3f7" stroke-width="1.5" opacity="0.7" style="animation-delay:.2s"/>
  <path class="anim-flow" d="M10 95 Q90 110 170 100 T310 105" fill="none" stroke="#8ba0bc" stroke-width="1.5" style="animation-delay:.4s"/>
  <path d="M70 70 Q120 40 200 55 L210 75 Q130 85 70 75 Z" fill="url(#wing)" opacity="0.9"/>
  <text x="160" y="128" fill="#8ba0bc" font-size="11" text-anchor="middle">Faster airflow over wing → lower pressure → lift</text>
</svg>
<div class="diagram-caption">Simple aerofoil airflow (animated)</div></div>`;
  },

  fronts() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="150" fill="#081420"/>
  <path d="M0 110 L320 110" stroke="#3a5070" stroke-width="1"/>
  <path d="M20 90 L140 70" stroke="#f87171" stroke-width="3"/>
  <circle class="anim-pulse" cx="50" cy="82" r="6" fill="#f87171"/>
  <circle class="anim-pulse" cx="90" cy="75" r="6" fill="#f87171" style="animation-delay:.4s"/>
  <circle class="anim-pulse" cx="125" cy="70" r="6" fill="#f87171" style="animation-delay:.8s"/>
  <path d="M160 90 L300 100" stroke="#4fc3f7" stroke-width="3"/>
  <path class="anim-pulse" d="M190 92 L200 75 L210 94 Z" fill="#4fc3f7"/>
  <path class="anim-pulse" d="M230 95 L240 78 L250 97 Z" fill="#4fc3f7" style="animation-delay:.3s"/>
  <path class="anim-pulse" d="M270 98 L280 81 L290 99 Z" fill="#4fc3f7" style="animation-delay:.6s"/>
  <text x="80" y="130" fill="#f87171" font-size="11" text-anchor="middle">Warm front</text>
  <text x="230" y="130" fill="#4fc3f7" font-size="11" text-anchor="middle">Cold front</text>
  <text x="160" y="20" fill="#8ba0bc" font-size="11" text-anchor="middle">UK frontal systems (schematic)</text>
</svg>
<div class="diagram-caption">Warm front (semicircles) · Cold front (triangles)</div></div>`;
  },

  altimeter() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="160" fill="#081420"/>
  <circle cx="110" cy="80" r="55" fill="#0f1f38" stroke="#4fc3f7" stroke-width="2"/>
  <circle cx="110" cy="80" r="4" fill="#4fc3f7"/>
  <g class="anim-spin" style="transform-origin:110px 80px;animation-duration:12s">
    <line x1="110" y1="80" x2="110" y2="35" stroke="#f5c842" stroke-width="3" stroke-linecap="round"/>
  </g>
  <line x1="110" y1="80" x2="145" y2="100" stroke="#e8eef7" stroke-width="2" stroke-linecap="round"/>
  <text x="110" y="145" fill="#8ba0bc" font-size="10" text-anchor="middle">Altimeter</text>
  <text x="200" y="45" fill="#7dd3fc" font-size="12">QNH → altitude AMSL</text>
  <text x="200" y="68" fill="#7dd3fc" font-size="12">QFE → height AAL</text>
  <text x="200" y="91" fill="#8ba0bc" font-size="11">UK: set in hPa</text>
  <text x="200" y="114" fill="#8ba0bc" font-size="11">Cold air: true lower</text>
  <text x="200" y="137" fill="#f5c842" font-size="10">Confirm AIP ENR 1.7</text>
</svg>
<div class="diagram-caption">QNH / QFE — UK altimeter settings</div></div>`;
  },

  circuit() {
    return this.circuitFull();
  },

  circuitFull() {
    return `<div class="diagram circuit-anim" aria-hidden="true">
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="220" fill="#081420"/>
  <!-- runway -->
  <rect x="70" y="155" width="160" height="14" rx="2" fill="#3a5070"/>
  <line x1="90" y1="162" x2="210" y2="162" stroke="#e8eef7" stroke-width="1" stroke-dasharray="6 4"/>
  <text x="150" y="148" fill="#8ba0bc" font-size="9" text-anchor="middle">Runway (into wind ←)</text>
  <!-- LH circuit path -->
  <path id="cpath" d="M220 162 L260 162 L260 50 L60 50 L60 162 L70 162" fill="none" stroke="#1a3a55" stroke-width="3"/>
  <path class="anim-flow" d="M220 162 L260 162 L260 50 L60 50 L60 162 L70 162" fill="none" stroke="#4fc3f7" stroke-width="2"/>
  <!-- labels -->
  <text x="240" y="175" fill="#f5c842" font-size="9">① Take-off</text>
  <text x="268" y="110" fill="#7dd3fc" font-size="9">② Crosswind</text>
  <text x="150" y="38" fill="#7dd3fc" font-size="9" text-anchor="middle">③ Downwind</text>
  <text x="28" y="110" fill="#7dd3fc" font-size="9">④ Base</text>
  <text x="100" y="185" fill="#f5c842" font-size="9">⑤ Final</text>
  <text x="200" y="200" fill="#fb923c" font-size="9">⑥ Go-around ↑</text>
  <!-- go-around arrow -->
  <path class="anim-pulse" d="M100 155 L100 120 L130 120" fill="none" stroke="#fb923c" stroke-width="1.5" marker-end="url(#arrGo)"/>
  <defs>
    <marker id="arrGo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#fb923c"/></marker>
  </defs>
  <!-- moving aircraft -->
  <g class="circuit-plane">
    <polygon points="0,-4 10,0 0,4 -2,0" fill="#f5c842"/>
  </g>
  <text x="160" y="215" fill="#8ba0bc" font-size="9" text-anchor="middle">Standard UK left-hand circuit · confirm local procedures</text>
</svg>
<div class="diagram-caption">Animated LH circuit — take-off → crosswind → downwind → base → final · go-around option</div></div>`;
  },

  whizz() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="180" fill="#081420"/>
  <circle cx="160" cy="95" r="70" fill="none" stroke="#2896c8" stroke-width="8" opacity="0.5"/>
  <circle cx="160" cy="95" r="52" fill="none" stroke="#4fc3f7" stroke-width="6" opacity="0.7"/>
  <g class="anim-spin" style="transform-origin:160px 95px;animation-duration:20s">
    <circle cx="160" cy="95" r="40" fill="#122038" stroke="#7dd3fc" stroke-width="2"/>
    <line x1="160" y1="95" x2="160" y2="58" stroke="#f5c842" stroke-width="2"/>
    <circle cx="160" cy="95" r="5" fill="#4fc3f7"/>
  </g>
  <text x="160" y="20" fill="#7dd3fc" font-size="12" text-anchor="middle">CRP-1 circular slide rule</text>
  <text x="160" y="170" fill="#8ba0bc" font-size="10" text-anchor="middle">Outer = distance/fuel · Inner = time · align speed</text>
</svg>
<div class="diagram-caption">Whizz-wheel concept — time / distance / speed</div></div>`;
  },

  whizzWalkthrough() {
    return `<div class="diagram whizz-walk" aria-hidden="true">
<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="260" fill="#081420"/>
  <text x="160" y="22" fill="#7dd3fc" font-size="12" text-anchor="middle" font-weight="700">Animated CRP-1 concepts</text>
  <!-- wheel -->
  <circle cx="100" cy="120" r="62" fill="none" stroke="#2896c8" stroke-width="10" opacity="0.45"/>
  <circle cx="100" cy="120" r="48" fill="none" stroke="#4fc3f7" stroke-width="7" opacity="0.65"/>
  <g class="anim-spin" style="transform-origin:100px 120px;animation-duration:14s">
    <circle cx="100" cy="120" r="36" fill="#122038" stroke="#7dd3fc" stroke-width="2"/>
    <line x1="100" y1="120" x2="100" y2="88" stroke="#f5c842" stroke-width="2.5"/>
    <text x="100" y="124" fill="#f5c842" font-size="8" text-anchor="middle">60</text>
  </g>
  <text x="100" y="195" fill="#8ba0bc" font-size="9" text-anchor="middle">1 · Speed/time/distance</text>
  <text x="100" y="208" fill="#8ba0bc" font-size="8" text-anchor="middle">Align GS (rate) ↔ read time</text>
  <!-- wind mini -->
  <g transform="translate(200,70)">
    <line x1="0" y1="60" x2="70" y2="60" stroke="#7dd3fc" stroke-width="2"/>
    <line class="anim-pulse" x1="70" y1="60" x2="90" y2="20" stroke="#f87171" stroke-width="2"/>
    <line x1="0" y1="60" x2="90" y2="20" stroke="#f5c842" stroke-width="2"/>
    <text x="35" y="78" fill="#7dd3fc" font-size="8" text-anchor="middle">HDG/TAS</text>
    <text x="100" y="40" fill="#f87171" font-size="8">Wind</text>
    <text x="40" y="12" fill="#f5c842" font-size="8">Track/GS</text>
  </g>
  <text x="240" y="195" fill="#8ba0bc" font-size="9" text-anchor="middle">2 · Wind triangle</text>
  <text x="240" y="208" fill="#8ba0bc" font-size="8" text-anchor="middle">Drift + groundspeed</text>
  <text x="160" y="235" fill="#c9d6e8" font-size="10" text-anchor="middle">Same jobs as E6B — UK CRP-1 packaging</text>
  <text x="160" y="250" fill="#8ba0bc" font-size="9" text-anchor="middle">Practise on a real wheel with your instructor</text>
</svg>
<div class="diagram-caption">Step walkthrough — circular scales + wind vector (study aid)</div></div>`;
  },

  windTriangle() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="150" fill="#081420"/>
  <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#4fc3f7"/></marker></defs>
  <line x1="40" y1="110" x2="200" y2="110" stroke="#7dd3fc" stroke-width="2" marker-end="url(#arr)"/>
  <line class="anim-pulse" x1="200" y1="110" x2="240" y2="50" stroke="#f87171" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="40" y1="110" x2="240" y2="50" stroke="#f5c842" stroke-width="2" marker-end="url(#arr)"/>
  <text x="110" y="128" fill="#7dd3fc" font-size="10">Heading / TAS</text>
  <text x="250" y="85" fill="#f87171" font-size="10">Wind</text>
  <text x="140" y="55" fill="#f5c842" font-size="10">Track / GS</text>
</svg>
<div class="diagram-caption">Wind triangle — heading ≠ track when wind blows</div></div>`;
  },

  radioWave() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="120" fill="#081420"/>
  <circle cx="50" cy="60" r="12" fill="#4fc3f7"/>
  <text x="50" y="95" fill="#8ba0bc" font-size="10" text-anchor="middle">You</text>
  <path class="anim-flow" d="M70 60 Q120 20 170 60 T270 60" fill="none" stroke="#7dd3fc" stroke-width="2"/>
  <path class="anim-flow" d="M70 60 Q120 100 170 60 T270 60" fill="none" stroke="#2896c8" stroke-width="1.5" opacity="0.6" style="animation-delay:.3s"/>
  <rect x="260" y="45" width="40" height="30" rx="4" fill="#152a4a" stroke="#4fc3f7"/>
  <text x="280" y="65" fill="#4fc3f7" font-size="9" text-anchor="middle">ATS</text>
  <text x="160" y="18" fill="#8ba0bc" font-size="11" text-anchor="middle">Listen first · then transmit · then listen</text>
</svg>
<div class="diagram-caption">RT loop — listen out before and after you speak</div></div>`;
  },

  /* ---- Landing control diagrams ---- */
  nilWindControls() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#081420"/>
  <text x="160" y="18" fill="#7dd3fc" font-size="11" text-anchor="middle" font-weight="700">Nil-wind — wings level + straight</text>
  <!-- runway top view -->
  <rect x="120" y="40" width="80" height="140" rx="2" fill="#1a2a40" stroke="#3a5070"/>
  <line x1="160" y1="45" x2="160" y2="175" stroke="#e8eef7" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- aircraft top -->
  <g class="anim-pulse" transform="translate(160,100)">
    <ellipse cx="0" cy="0" rx="8" ry="22" fill="#4fc3f7"/>
    <rect x="-28" y="-3" width="56" height="6" rx="1" fill="#7dd3fc"/>
    <rect x="-4" y="14" width="8" height="14" fill="#2896c8"/>
  </g>
  <!-- stick -->
  <g transform="translate(40,90)">
    <circle cx="0" cy="0" r="22" fill="#122038" stroke="#4fc3f7" stroke-width="2"/>
    <line x1="0" y1="-14" x2="0" y2="14" stroke="#3a5070" stroke-width="1"/>
    <line x1="-14" y1="0" x2="14" y2="0" stroke="#3a5070" stroke-width="1"/>
    <circle cx="0" cy="0" r="5" fill="#f5c842"/>
    <text x="0" y="38" fill="#8ba0bc" font-size="8" text-anchor="middle">Stick centre</text>
    <text x="0" y="48" fill="#7dd3fc" font-size="8" text-anchor="middle">Aileron: level</text>
  </g>
  <!-- rudder pedals -->
  <g transform="translate(280,90)">
    <rect x="-18" y="-20" width="14" height="28" rx="2" fill="#152a4a" stroke="#7dd3fc"/>
    <rect x="4" y="-20" width="14" height="28" rx="2" fill="#152a4a" stroke="#7dd3fc"/>
    <text x="0" y="28" fill="#8ba0bc" font-size="8" text-anchor="middle">Rudder</text>
    <text x="0" y="38" fill="#7dd3fc" font-size="8" text-anchor="middle">keep straight</text>
  </g>
  <text x="160" y="195" fill="#8ba0bc" font-size="9" text-anchor="middle">Small aileron for level · rudder for centreline</text>
</svg>
<div class="diagram-caption">Pilot controls — nil wind (schematic top view)</div></div>`;
  },

  crosswindControls() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="220" fill="#081420"/>
  <text x="160" y="16" fill="#7dd3fc" font-size="11" text-anchor="middle" font-weight="700">Crosswind — aileron + rudder together</text>
  <!-- wind arrow -->
  <g class="anim-drift">
    <text x="30" y="50" fill="#f87171" font-size="10">WIND →</text>
    <path d="M20 58 L70 58" stroke="#f87171" stroke-width="2"/>
  </g>
  <!-- runway -->
  <rect x="120" y="36" width="80" height="130" rx="2" fill="#1a2a40" stroke="#3a5070"/>
  <line x1="160" y1="40" x2="160" y2="160" stroke="#e8eef7" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- banked aircraft (wing down into wind = left if wind from left) -->
  <g transform="translate(160,95) rotate(-12)">
    <ellipse cx="0" cy="0" rx="8" ry="20" fill="#4fc3f7"/>
    <rect x="-30" y="-3" width="60" height="6" rx="1" fill="#7dd3fc"/>
    <rect x="-4" y="12" width="8" height="12" fill="#2896c8"/>
  </g>
  <text x="160" y="175" fill="#f5c842" font-size="9" text-anchor="middle">Into-wind wing DOWN</text>
  <!-- stick into wind -->
  <g transform="translate(50,100)">
    <circle cx="0" cy="0" r="24" fill="#122038" stroke="#4fc3f7" stroke-width="2"/>
    <line x1="0" y1="-16" x2="0" y2="16" stroke="#3a5070"/>
    <line x1="-16" y1="0" x2="16" y2="0" stroke="#3a5070"/>
    <circle class="anim-pulse" cx="-10" cy="0" r="6" fill="#f5c842"/>
    <text x="0" y="40" fill="#f5c842" font-size="8" text-anchor="middle">Stick INTO wind</text>
    <text x="0" y="50" fill="#8ba0bc" font-size="8" text-anchor="middle">Aileron</text>
  </g>
  <!-- rudder opposite / align -->
  <g transform="translate(270,100)">
    <rect x="-20" y="-22" width="14" height="30" rx="2" fill="#152a4a" stroke="#7dd3fc"/>
    <rect class="anim-pulse" x="2" y="-22" width="14" height="30" rx="2" fill="#f5c842" stroke="#f5c842"/>
    <text x="0" y="28" fill="#f5c842" font-size="8" text-anchor="middle">Rudder align</text>
    <text x="0" y="38" fill="#8ba0bc" font-size="8" text-anchor="middle">kick-straight</text>
  </g>
  <text x="160" y="198" fill="#c9d6e8" font-size="9" text-anchor="middle">Aileron stops drift · Rudder keeps nose straight</text>
  <text x="160" y="212" fill="#8ba0bc" font-size="8" text-anchor="middle">Use both — technique varies by type / instructor</text>
</svg>
<div class="diagram-caption">Crosswind controls — labelled stick &amp; rudder (schematic)</div></div>`;
  },

  frontBank() {
    return `<div class="diagram" aria-hidden="true">
<svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="140" fill="#081420"/>
  <text x="160" y="18" fill="#7dd3fc" font-size="11" text-anchor="middle">Front view — wing-down into wind</text>
  <line x1="40" y1="110" x2="280" y2="110" stroke="#3a5070" stroke-width="2"/>
  <g class="anim-pulse" transform="translate(160,75) rotate(-15)">
    <rect x="-70" y="-4" width="140" height="8" rx="2" fill="#4fc3f7"/>
    <rect x="-6" y="-18" width="12" height="36" rx="2" fill="#7dd3fc"/>
  </g>
  <text x="60" y="50" fill="#f87171" font-size="10">WIND</text>
  <path d="M50 55 L90 55" stroke="#f87171" stroke-width="2"/>
  <text x="160" y="130" fill="#8ba0bc" font-size="9" text-anchor="middle">Into-wind wheel may touch first · hold aileron</text>
</svg>
<div class="diagram-caption">Wing-down into wind (front view schematic)</div></div>`;
  },

  emergencyIcon(kind) {
    const icons = {
      forced: '🛬', efato: '⚠️', co: '😷', 'fire-eng': '🔥', 'fire-elec': '⚡',
      elec: '🔋', fuel: '⛽', radio: '📡', lost: '🧭'
    };
    const label = icons[kind] || '✈';
    return `<div class="diagram emerg-ico" aria-hidden="true">
<svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="80" fill="#081420"/>
  <circle class="anim-pulse" cx="160" cy="40" r="28" fill="rgba(248,113,113,0.15)" stroke="#f87171" stroke-width="2"/>
  <text x="160" y="48" font-size="28" text-anchor="middle">${label}</text>
</svg></div>`;
  },


  c42Walkround(activeHotspot) {
    const hs = activeHotspot || '';
    const on = (id) => hs === id ? 'c42-hot on' : 'c42-hot';
    return `<div class="diagram c42-walk" aria-hidden="true">
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#081420"/>
  <text x="160" y="16" fill="#7dd3fc" font-size="11" text-anchor="middle" font-weight="700">C42 outside walk-round</text>
  <!-- high-wing microlight schematic top view -->
  <ellipse class="${on('fuse')}" cx="160" cy="110" rx="18" ry="55" fill="#1a3050" stroke="#4fc3f7" stroke-width="2"/>
  <rect class="${on('wing')}" x="40" y="95" width="240" height="16" rx="3" fill="#2896c8" opacity="0.85"/>
  <rect class="${on('aileron')}" x="50" y="111" width="50" height="8" rx="1" fill="#7dd3fc"/>
  <rect class="${on('aileron')}" x="220" y="111" width="50" height="8" rx="1" fill="#7dd3fc"/>
  <circle class="${on('prop')}" cx="160" cy="48" r="14" fill="none" stroke="#f5c842" stroke-width="3"/>
  <line class="anim-spin" style="transform-origin:160px 48px;animation-duration:1.2s" x1="146" y1="48" x2="174" y2="48" stroke="#f5c842" stroke-width="2"/>
  <rect class="${on('engine')}" x="150" y="58" width="20" height="18" rx="2" fill="#fb923c"/>
  <circle class="${on('nosewheel')}" cx="160" cy="78" r="6" fill="#8ba0bc"/>
  <circle class="${on('gear')}" cx="130" cy="130" r="7" fill="#8ba0bc"/>
  <circle class="${on('gear')}" cx="190" cy="130" r="7" fill="#8ba0bc"/>
  <rect class="${on('baggage')}" x="148" y="125" width="24" height="16" rx="2" fill="#152a4a" stroke="#7dd3fc"/>
  <rect class="${on('tail')}" x="145" y="160" width="30" height="8" rx="1" fill="#4fc3f7"/>
  <rect class="${on('elevator')}" x="140" y="168" width="40" height="6" rx="1" fill="#7dd3fc"/>
  <circle class="${on('fuel')}" cx="160" cy="100" r="5" fill="#34d399"/>
  <rect class="${on('nose')}" x="152" y="40" width="16" height="10" rx="2" fill="#4fc3f7" opacity="0.5"/>
  <text x="160" y="195" fill="#8ba0bc" font-size="9" text-anchor="middle">Highlight follows checklist item · schematic only</text>
</svg>
<div class="diagram-caption">External walk-round (animated highlight)</div></div>`;
  },

  c42Panel(activeHotspot) {
    const hs = activeHotspot || '';
    const on = (id) => hs === id ? 'c42-hot on' : 'c42-hot';
    return `<div class="diagram c42-panel" aria-hidden="true">
<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="210" fill="#081420"/>
  <text x="160" y="16" fill="#7dd3fc" font-size="11" text-anchor="middle" font-weight="700">C42 cockpit panel (schematic)</text>
  <rect x="20" y="28" width="280" height="150" rx="8" fill="#0f1f38" stroke="#3a5070"/>
  <!-- instruments row -->
  <g class="${on('instruments')}">
    <circle cx="70" cy="70" r="22" fill="#122038" stroke="#4fc3f7" stroke-width="2"/>
    <circle cx="120" cy="70" r="22" fill="#122038" stroke="#4fc3f7" stroke-width="2"/>
    <text x="70" y="74" fill="#8ba0bc" font-size="8" text-anchor="middle">ASI</text>
    <text x="120" y="74" fill="#8ba0bc" font-size="8" text-anchor="middle">ALT</text>
  </g>
  <circle class="${on('altimeter')}" cx="120" cy="70" r="22" fill="none" stroke="${hs==='altimeter'?'#f5c842':'transparent'}" stroke-width="3"/>
  <circle class="${on('oil')}" cx="170" cy="70" r="18" fill="#122038" stroke="#34d399" stroke-width="2"/>
  <text x="170" y="74" fill="#8ba0bc" font-size="7" text-anchor="middle">T&amp;P</text>
  <rect class="${on('fuelgauge')}" x="200" y="52" width="40" height="36" rx="4" fill="#122038" stroke="#34d399"/>
  <text x="220" y="74" fill="#8ba0bc" font-size="7" text-anchor="middle">FUEL</text>
  <rect class="${on('radio')}" x="250" y="52" width="40" height="36" rx="4" fill="#122038" stroke="#7dd3fc"/>
  <text x="270" y="74" fill="#8ba0bc" font-size="7" text-anchor="middle">COM</text>
  <!-- switches -->
  <g class="${on('switches')} ${on('master')} ${on('mags')} ${on('fuelpump')} ${on('lights')} ${on('start')} ${on('choke')}">
    <rect class="${on('master')}" x="40" y="115" width="36" height="20" rx="3" fill="#152a4a" stroke="#4fc3f7"/>
    <text x="58" y="129" fill="#c9d6e8" font-size="7" text-anchor="middle">MASTER</text>
    <rect class="${on('mags')}" x="84" y="115" width="36" height="20" rx="3" fill="#152a4a" stroke="#4fc3f7"/>
    <text x="102" y="129" fill="#c9d6e8" font-size="7" text-anchor="middle">MAGS</text>
    <rect class="${on('fuelpump')}" x="128" y="115" width="40" height="20" rx="3" fill="#152a4a" stroke="#4fc3f7"/>
    <text x="148" y="129" fill="#c9d6e8" font-size="7" text-anchor="middle">PUMP</text>
    <rect class="${on('lights')}" x="176" y="115" width="40" height="20" rx="3" fill="#152a4a" stroke="#4fc3f7"/>
    <text x="196" y="129" fill="#c9d6e8" font-size="7" text-anchor="middle">LIGHTS</text>
    <rect class="${on('choke')}" x="224" y="115" width="36" height="20" rx="3" fill="#152a4a" stroke="#4fc3f7"/>
    <text x="242" y="129" fill="#c9d6e8" font-size="7" text-anchor="middle">CHOKE</text>
    <rect class="${on('start')}" x="268" y="115" width="28" height="20" rx="3" fill="#152a4a" stroke="#f87171"/>
    <text x="282" y="129" fill="#f87171" font-size="7" text-anchor="middle">STRT</text>
  </g>
  <!-- throttle / trim / flaps / brake / stick -->
  <rect class="${on('throttle')}" x="50" y="150" width="14" height="28" rx="2" fill="#f5c842"/>
  <text x="57" y="192" fill="#8ba0bc" font-size="7" text-anchor="middle">THR</text>
  <rect class="${on('trim')}" x="90" y="155" width="30" height="12" rx="2" fill="#7dd3fc"/>
  <text x="105" y="192" fill="#8ba0bc" font-size="7" text-anchor="middle">TRIM</text>
  <rect class="${on('flaps')}" x="140" y="155" width="30" height="12" rx="2" fill="#2896c8"/>
  <text x="155" y="192" fill="#8ba0bc" font-size="7" text-anchor="middle">FLAP</text>
  <rect class="${on('brake')}" x="190" y="155" width="30" height="12" rx="2" fill="#fb923c"/>
  <text x="205" y="192" fill="#8ba0bc" font-size="7" text-anchor="middle">BRAKE</text>
  <circle class="${on('stick')}" cx="250" cy="160" r="12" fill="#4fc3f7"/>
  <text x="250" y="192" fill="#8ba0bc" font-size="7" text-anchor="middle">STICK</text>
  <text class="${on('harness')} ${on('hatches')} ${on('seats')} ${on('lookout')}" x="160" y="205" fill="#8ba0bc" font-size="8" text-anchor="middle">Labels follow checklist · not a typed POH panel</text>
</svg>
<div class="diagram-caption">Internal / start / departure panel highlight</div></div>`;
  },


  signs() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="140" fill="#0a1628"/>
  <rect x="20" y="30" width="70" height="40" fill="#111" stroke="#f5d76e"/>
  <text x="55" y="56" text-anchor="middle" fill="#f5d76e" font-size="18">A</text>
  <rect x="110" y="30" width="50" height="40" fill="#f5d76e"/>
  <text x="135" y="58" text-anchor="middle" fill="#111" font-size="22" font-weight="bold">C</text>
  <rect x="180" y="35" width="120" height="30" fill="#333"/>
  <g fill="#fff"><rect x="190" y="40" width="8" height="20"/><rect x="202" y="40" width="8" height="20"/><rect x="214" y="40" width="8" height="20"/></g>
  <text x="290" y="55" fill="#fff" font-size="12">27</text>
  <text x="160" y="100" text-anchor="middle" fill="#9ab" font-size="11">Taxiway · book-in C · threshold designator</text>
  <text x="160" y="118" text-anchor="middle" fill="#6a7a90" font-size="10">Original schematic — not commercial art</text>
</svg>
<div class="diagram-caption">Signs &amp; markings (study schematic)</div></div>`;
  },

  clouds() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="160" fill="#0a1628"/>
  <text x="8" y="24" fill="#8ba0bc" font-size="9">HIGH</text>
  <path d="M40,30 q20,-12 40,0 q15,-8 30,0" fill="none" stroke="#cde" stroke-width="2"/>
  <text x="120" y="28" fill="#cde" font-size="9">Ci / Cs / Cc</text>
  <text x="8" y="70" fill="#8ba0bc" font-size="9">MID</text>
  <ellipse cx="70" cy="70" rx="28" ry="12" fill="#7a9" opacity="0.7"/>
  <ellipse cx="110" cy="68" rx="22" ry="10" fill="#7a9" opacity="0.5"/>
  <text x="150" y="72" fill="#9cb" font-size="9">As / Ac</text>
  <text x="8" y="115" fill="#8ba0bc" font-size="9">LOW</text>
  <rect x="40" y="100" width="90" height="18" rx="6" fill="#678" opacity="0.8"/>
  <ellipse cx="160" cy="108" rx="20" ry="14" fill="#89a"/>
  <text x="200" y="112" fill="#9ab" font-size="9">St / Sc / Cu</text>
  <path d="M250,120 L260,50 L280,55 L270,120 Z" fill="#566" stroke="#e55"/>
  <path d="M260,50 q30,0 40,10" fill="none" stroke="#ccc" stroke-width="2"/>
  <text x="250" y="140" fill="#e88" font-size="9">Cb+anvil</text>
  <text x="40" y="150" fill="#6af" font-size="9">Ns rain layer →</text>
</svg>
<div class="diagram-caption">Cloud families — original schematic (not a photo copy)</div></div>`;
  },

  airspace() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="150" fill="#0a1628"/>
  <rect x="20" y="20" width="280" height="35" fill="#844" opacity="0.5"/>
  <text x="160" y="42" text-anchor="middle" fill="#fcc" font-size="12">Class A — IFR only (stay out)</text>
  <rect x="40" y="65" width="100" height="45" fill="#48a" opacity="0.45" stroke="#6cf"/>
  <text x="90" y="92" text-anchor="middle" fill="#cdf" font-size="11">Class D</text>
  <text x="90" y="105" text-anchor="middle" fill="#9ab" font-size="8">need clearance</text>
  <rect x="160" y="70" width="120" height="55" fill="#2a5" opacity="0.35"/>
  <text x="220" y="100" text-anchor="middle" fill="#cfc" font-size="12">Class G</text>
  <text x="220" y="114" text-anchor="middle" fill="#9ab" font-size="8">most microlight flying</text>
</svg>
<div class="diagram-caption">Controlled vs uncontrolled — schematic only</div></div>`;
  },

  rtfsquelch() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="130" fill="#0a1628"/>
  <g font-size="9" fill="#8ba0bc" text-anchor="middle">
    <circle cx="50" cy="55" r="24" fill="#16263d" stroke="#4fc3f7"/><line x1="50" y1="55" x2="50" y2="33" stroke="#4fc3f7" stroke-width="3"/>
    <text x="50" y="95">1 · VOL ~half</text>
    <circle cx="160" cy="55" r="24" fill="#16263d" stroke="#f5d76e"/><line x1="160" y1="55" x2="178" y2="40" stroke="#f5d76e" stroke-width="3"/>
    <text x="160" y="95">2 · SQ up → hiss</text>
    <path d="M195,40 q5,-6 10,0 q5,6 10,0" fill="none" stroke="#f5d76e"/>
    <circle cx="270" cy="55" r="24" fill="#16263d" stroke="#7c7"/><line x1="270" y1="55" x2="282" y2="36" stroke="#7c7" stroke-width="3"/>
    <text x="270" y="95">3 · back off → quiet</text>
  </g>
  <text x="160" y="120" text-anchor="middle" fill="#6a7a90" font-size="9">Original schematic · volume below ~70%</text>
</svg>
<div class="diagram-caption">Setting squelch in three turns</div></div>`;
  },

  rtfxpdr() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="140" fill="#0a1628"/>
  <rect x="20" y="20" width="200" height="60" rx="8" fill="#111c2e" stroke="#4fc3f7"/>
  <text x="120" y="60" text-anchor="middle" fill="#7f7" font-size="26" font-family="monospace">7000</text>
  <text x="34" y="34" fill="#8ba0bc" font-size="8">ALT</text>
  <rect x="232" y="22" width="70" height="16" rx="4" fill="#234"/><text x="267" y="34" text-anchor="middle" fill="#cde" font-size="8">IDENT (on request)</text>
  <rect x="232" y="44" width="70" height="16" rx="4" fill="#2a5"/><text x="267" y="56" text-anchor="middle" fill="#fff" font-size="8">ALT = default</text>
  <g font-size="9" fill="#cde">
    <text x="20" y="102">7000 VFR</text><text x="90" y="102" fill="#f99">7500 hijack</text>
    <text x="170" y="102" fill="#fc6">7600 no radio</text><text x="250" y="102" fill="#f66">7700 emerg</text>
    <text x="20" y="122" fill="#6cf">0030 lost (UK)</text><text x="120" y="122" fill="#9ab">FMC = listening squawk</text>
  </g>
</svg>
<div class="diagram-caption">Transponder codes (original schematic)</div></div>`;
  },

  rtfcircuit() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="160" fill="#0a1628"/>
  <rect x="110" y="72" width="100" height="10" fill="#555"/><text x="160" y="96" text-anchor="middle" fill="#9ab" font-size="8">runway</text>
  <rect x="70" y="35" width="180" height="80" rx="30" fill="none" stroke="#4fc3f7" stroke-dasharray="5 4"/>
  <text x="160" y="22" text-anchor="middle" fill="#8ba0bc" font-size="8">deadside (overhead join → descend here)</text>
  <circle cx="160" cy="115" r="6" fill="#f5d76e"/><text x="160" y="135" text-anchor="middle" fill="#f5d76e" font-size="9">“DOWNWIND” call</text>
  <circle cx="265" cy="77" r="6" fill="#7c7"/><text x="282" y="62" text-anchor="middle" fill="#7c7" font-size="9">“FINAL”</text>
  <text x="282" y="100" text-anchor="middle" fill="#6a7a90" font-size="7">final ≤4 NM</text>
  <text x="282" y="110" text-anchor="middle" fill="#6a7a90" font-size="7">long final 4–8</text>
  <text x="40" y="150" fill="#8ba0bc" font-size="8">Optional: base · late downwind · say “half-mile final”, not “short final”</text>
</svg>
<div class="diagram-caption">Where the circuit calls go (original schematic)</div></div>`;
  },

  rtfmatz() {
    return `<div class="diagram" aria-hidden="true">
<svg width="100%" viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="150" fill="#0a1628"/>
  <circle cx="110" cy="75" r="50" fill="#36a" opacity="0.25" stroke="#6cf"/>
  <rect x="160" y="55" width="60" height="40" fill="#36a" opacity="0.18" stroke="#6cf" stroke-dasharray="4 3"/>
  <line x1="110" y1="75" x2="160" y2="75" stroke="#6cf"/><text x="135" y="70" text-anchor="middle" fill="#cde" font-size="8">5 NM</text>
  <text x="110" y="79" text-anchor="middle" fill="#fff" font-size="10">MATZ</text>
  <text x="190" y="110" text-anchor="middle" fill="#9ab" font-size="8">stub ~4 NM wide</text>
  <text x="190" y="120" text-anchor="middle" fill="#9ab" font-size="8">1000–3000 ft</text>
  <text x="110" y="140" text-anchor="middle" fill="#9ab" font-size="8">circle: surface – 3000 ft aal</text>
  <text x="245" y="30" fill="#f5d76e" font-size="9">Call first:</text>
  <text x="245" y="44" fill="#cde" font-size="8">“request MATZ</text>
  <text x="245" y="55" fill="#cde" font-size="8">penetration”</text>
</svg>
<div class="diagram-caption">Typical MATZ shape — check chart (original schematic)</div></div>`;
  },

  chart() {
    return `<div class="diagram" aria-hidden="true"><div class="diagram-caption">Use CRP drills + 1:500k Chart module for legend practice</div></div>`;
  },

  get(name) {
    return (this[name] && this[name]()) || '';
  }
};
