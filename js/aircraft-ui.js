/* Microlights — list, labelled SVG parts, fuel/weight calculator (variant-aware) */
const AircraftUI = (() => {
  let selectedPartId = null;
  /** aircraftId -> variantId */
  const variantPick = {};
  /** Live calc field overrides while on a detail page (not persisted). */
  let calcDraft = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function data() {
    return (typeof AIRCRAFT_DATA !== 'undefined') ? AIRCRAFT_DATA : null;
  }

  function list() {
    const d = data();
    return d && Array.isArray(d.aircraft) ? d.aircraft : [];
  }

  function currentVariantId(ac) {
    if (!ac) return null;
    if (variantPick[ac.id]) return variantPick[ac.id];
    if (typeof AircraftPref !== 'undefined') {
      const pref = AircraftPref.getVariantId();
      const found = pref && AircraftPref.findByVariantId(pref);
      if (found && found.aircraft.id === ac.id) return pref;
    }
    return ac.defaultVariantId || (ac.variants && ac.variants[0] && ac.variants[0].id);
  }

  function resolved(ac) {
    const d = data();
    if (!d || !ac) return null;
    return d.resolve(ac, currentVariantId(ac));
  }

  /* ---------- SVG diagrams (schematic silhouettes + hotspots) ---------- */
  function diagramSvg(profile, activePart) {
    const layout = (profile && profile.diagram) || 'highwing';
    if (layout === 'weightshift') return svgWeightshift(activePart);
    if (layout === 'lowwing') return svgLowWing(activePart);
    return svgHighWing(activePart);
  }

  function hotspotClass(id, active) {
    return id === active ? 'ac-hot on' : 'ac-hot';
  }

  function svgHighWing(active) {
    const on = (id) => hotspotClass(id, active);
    return `<svg class="ac-svg" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="High-wing microlight parts diagram">
  <rect width="360" height="220" fill="#05050b" rx="8"/>
  <text x="180" y="16" fill="#93c5fd" font-size="11" text-anchor="middle" font-weight="700">High-wing microlight (schematic · tap a part)</text>
  <!-- wing -->
  <rect class="${on('wing')}" data-ac-part="wing" x="40" y="78" width="240" height="18" rx="3" fill="#3b82f6" opacity="0.9" style="cursor:pointer"/>
  <rect class="${on('strut')}" data-ac-part="strut" x="95" y="96" width="6" height="42" fill="#a6acbb" transform="rotate(18 98 96)" style="cursor:pointer"/>
  <rect class="${on('strut')}" data-ac-part="strut" x="210" y="96" width="6" height="42" fill="#a6acbb" transform="rotate(-18 213 96)" style="cursor:pointer"/>
  <rect class="${on('aileron')}" data-ac-part="aileron" x="48" y="96" width="55" height="8" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('aileron')}" data-ac-part="aileron" x="217" y="96" width="55" height="8" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('flap')}" data-ac-part="flap" x="110" y="96" width="50" height="8" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <rect class="${on('flap')}" data-ac-part="flap" x="170" y="96" width="50" height="8" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <!-- fuselage -->
  <ellipse class="${on('fuselage')}" data-ac-part="fuselage" cx="180" cy="125" rx="22" ry="48" fill="#22223e" stroke="#60a5fa" stroke-width="2" style="cursor:pointer"/>
  <path class="${on('windscreen')}" data-ac-part="windscreen" d="M168 95 Q180 82 192 95 L192 110 L168 110 Z" fill="#93c5fd" opacity="0.55" style="cursor:pointer"/>
  <rect class="${on('doors')}" data-ac-part="doors" x="168" y="112" width="24" height="28" rx="2" fill="#1e1e36" stroke="#93c5fd" stroke-width="1" style="cursor:pointer"/>
  <!-- nose / prop -->
  <circle class="${on('propeller')}" data-ac-part="propeller" cx="180" cy="52" r="16" fill="none" stroke="#f5c842" stroke-width="3" style="cursor:pointer"/>
  <line class="anim-spin" style="transform-origin:180px 52px;animation-duration:1.1s" x1="164" y1="52" x2="196" y2="52" stroke="#f5c842" stroke-width="2"/>
  <circle class="${on('spinner')}" data-ac-part="spinner" cx="180" cy="52" r="5" fill="#f5c842" style="cursor:pointer"/>
  <rect class="${on('engine')}" data-ac-part="engine" x="168" y="62" width="24" height="22" rx="3" fill="#fb923c" style="cursor:pointer"/>
  <!-- gear -->
  <circle class="${on('nose-gear')}" data-ac-part="nose-gear" cx="180" cy="88" r="7" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="148" cy="148" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="212" cy="148" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <!-- pitot on wing -->
  <rect class="${on('pitot')}" data-ac-part="pitot" x="55" y="72" width="14" height="3" rx="1" fill="#f1f3f8" style="cursor:pointer"/>
  <!-- fuel -->
  <circle class="${on('fuel-filler')}" data-ac-part="fuel-filler" cx="180" cy="118" r="6" fill="#34d399" style="cursor:pointer"/>
  <!-- BRS hint on cabin roof -->
  <rect class="${on('brs')}" data-ac-part="brs" x="172" y="100" width="16" height="8" rx="2" fill="#f87171" opacity="0.85" style="cursor:pointer"/>
  <!-- tail -->
  <rect class="${on('h-stab')}" data-ac-part="h-stab" x="160" y="175" width="40" height="8" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <rect class="${on('elevator')}" data-ac-part="elevator" x="155" y="183" width="50" height="7" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('rudder')}" data-ac-part="rudder" x="176" y="165" width="8" height="28" rx="1" fill="#3b82f6" style="cursor:pointer"/>
  <rect class="${on('trim')}" data-ac-part="trim" x="198" y="184" width="10" height="5" rx="1" fill="#f5c842" style="cursor:pointer"/>
  <text x="180" y="212" fill="#a6acbb" font-size="9" text-anchor="middle">Teaching silhouette — not a typed drawing · confirm POH</text>
</svg>`;
  }

  function svgLowWing(active) {
    const on = (id) => hotspotClass(id, active);
    return `<svg class="ac-svg" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Low-wing microlight parts diagram">
  <rect width="360" height="220" fill="#05050b" rx="8"/>
  <text x="180" y="16" fill="#93c5fd" font-size="11" text-anchor="middle" font-weight="700">Low-wing microlight (schematic · tap a part)</text>
  <ellipse class="${on('fuselage')}" data-ac-part="fuselage" cx="180" cy="110" rx="20" ry="50" fill="#22223e" stroke="#60a5fa" stroke-width="2" style="cursor:pointer"/>
  <path class="${on('windscreen')}" data-ac-part="windscreen" d="M168 78 Q180 65 192 78 L192 95 L168 95 Z" fill="#93c5fd" opacity="0.55" style="cursor:pointer"/>
  <rect class="${on('doors')}" data-ac-part="doors" x="168" y="96" width="24" height="30" rx="2" fill="#1e1e36" stroke="#93c5fd" style="cursor:pointer"/>
  <circle class="${on('propeller')}" data-ac-part="propeller" cx="180" cy="42" r="16" fill="none" stroke="#f5c842" stroke-width="3" style="cursor:pointer"/>
  <line class="anim-spin" style="transform-origin:180px 42px;animation-duration:1.1s" x1="164" y1="42" x2="196" y2="42" stroke="#f5c842" stroke-width="2"/>
  <circle class="${on('spinner')}" data-ac-part="spinner" cx="180" cy="42" r="5" fill="#f5c842" style="cursor:pointer"/>
  <rect class="${on('engine')}" data-ac-part="engine" x="168" y="52" width="24" height="20" rx="3" fill="#fb923c" style="cursor:pointer"/>
  <!-- low wing -->
  <rect class="${on('wing')}" data-ac-part="wing" x="40" y="128" width="240" height="16" rx="3" fill="#3b82f6" opacity="0.9" style="cursor:pointer"/>
  <rect class="${on('aileron')}" data-ac-part="aileron" x="48" y="144" width="55" height="7" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('aileron')}" data-ac-part="aileron" x="217" y="144" width="55" height="7" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('flap')}" data-ac-part="flap" x="110" y="144" width="50" height="7" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <rect class="${on('flap')}" data-ac-part="flap" x="170" y="144" width="50" height="7" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <rect class="${on('pitot')}" data-ac-part="pitot" x="55" y="122" width="14" height="3" fill="#f1f3f8" style="cursor:pointer"/>
  <circle class="${on('nose-gear')}" data-ac-part="nose-gear" cx="180" cy="78" r="6" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="150" cy="155" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="210" cy="155" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('fuel-filler')}" data-ac-part="fuel-filler" cx="100" cy="132" r="5" fill="#34d399" style="cursor:pointer"/>
  <rect class="${on('brs')}" data-ac-part="brs" x="172" y="88" width="16" height="8" rx="2" fill="#f87171" opacity="0.85" style="cursor:pointer"/>
  <rect class="${on('h-stab')}" data-ac-part="h-stab" x="160" y="170" width="40" height="8" rx="1" fill="#60a5fa" style="cursor:pointer"/>
  <rect class="${on('elevator')}" data-ac-part="elevator" x="155" y="178" width="50" height="7" rx="1" fill="#93c5fd" style="cursor:pointer"/>
  <rect class="${on('rudder')}" data-ac-part="rudder" x="176" y="160" width="8" height="28" rx="1" fill="#3b82f6" style="cursor:pointer"/>
  <rect class="${on('trim')}" data-ac-part="trim" x="198" y="179" width="10" height="5" rx="1" fill="#f5c842" style="cursor:pointer"/>
  <rect class="${on('strut')}" data-ac-part="strut" x="0" y="0" width="0" height="0" fill="none"/>
  <text x="180" y="212" fill="#a6acbb" font-size="9" text-anchor="middle">Teaching silhouette — not a typed drawing · confirm POH</text>
</svg>`;
  }

  function svgWeightshift(active) {
    const on = (id) => hotspotClass(id, active);
    return `<svg class="ac-svg" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Weightshift flexwing parts diagram">
  <rect width="360" height="220" fill="#05050b" rx="8"/>
  <text x="180" y="16" fill="#93c5fd" font-size="11" text-anchor="middle" font-weight="700">Weightshift / flexwing (schematic · tap a part)</text>
  <!-- wing triangle -->
  <path class="${on('wing')}" data-ac-part="wing" d="M60 70 L180 40 L300 70 L180 95 Z" fill="#3b82f6" opacity="0.85" stroke="#60a5fa" style="cursor:pointer"/>
  <line class="${on('hangpoint')}" data-ac-part="hangpoint" x1="180" y1="95" x2="180" y2="125" stroke="#f5c842" stroke-width="3" style="cursor:pointer"/>
  <!-- A-frame -->
  <path class="${on('basebar')}" data-ac-part="basebar" d="M140 155 L180 110 L220 155 Z" fill="none" stroke="#93c5fd" stroke-width="3" style="cursor:pointer"/>
  <line class="${on('basebar')}" data-ac-part="basebar" x1="145" y1="150" x2="215" y2="150" stroke="#f5c842" stroke-width="4" style="cursor:pointer"/>
  <!-- trike -->
  <ellipse class="${on('fuselage')}" data-ac-part="fuselage" cx="180" cy="145" rx="28" ry="18" fill="#22223e" stroke="#60a5fa" stroke-width="2" style="cursor:pointer"/>
  <path class="${on('windscreen')}" data-ac-part="windscreen" d="M155 135 Q180 118 205 135" fill="none" stroke="#93c5fd" stroke-width="3" style="cursor:pointer"/>
  <rect class="${on('engine')}" data-ac-part="engine" x="168" y="155" width="24" height="20" rx="3" fill="#fb923c" style="cursor:pointer"/>
  <circle class="${on('propeller')}" data-ac-part="propeller" cx="180" cy="188" r="14" fill="none" stroke="#f5c842" stroke-width="3" style="cursor:pointer"/>
  <line class="anim-spin" style="transform-origin:180px 188px;animation-duration:1.1s" x1="166" y1="188" x2="194" y2="188" stroke="#f5c842" stroke-width="2"/>
  <circle class="${on('nose-gear')}" data-ac-part="nose-gear" cx="180" cy="128" r="6" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="155" cy="168" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('main-gear')}" data-ac-part="main-gear" cx="205" cy="168" r="8" fill="#a6acbb" style="cursor:pointer"/>
  <circle class="${on('fuel-filler')}" data-ac-part="fuel-filler" cx="205" cy="148" r="5" fill="#34d399" style="cursor:pointer"/>
  <rect class="${on('brs')}" data-ac-part="brs" x="172" y="100" width="16" height="8" rx="2" fill="#f87171" opacity="0.85" style="cursor:pointer"/>
  <text x="180" y="212" fill="#a6acbb" font-size="9" text-anchor="middle">Weight-shift controls · use school W&amp;B sheet for exact figures</text>
</svg>`;
  }

  function partCard(profile) {
    if (!profile) return '';
    const parts = profile.parts || [];
    const p = parts.find(x => x.id === selectedPartId) || parts[0];
    if (!p) return '<div class="card"><p class="meta">No parts listed.</p></div>';
    selectedPartId = p.id;
    return `
      <div class="card ac-part-card" id="ac-part-card">
        <div class="meta" style="color:var(--sky);font-weight:700">${esc(p.label)}</div>
        <p style="color:#c9ced8;font-size:0.95rem;margin:8px 0 12px">${esc(p.role)}</p>
        <div class="speak-bar" style="margin:0">
          <button type="button" class="btn btn-primary" id="ac-speak-part">🔊 Speak</button>
          <button type="button" class="btn btn-secondary" id="btn-stop-speak">Stop</button>
        </div>
      </div>
      <div class="chip-row ac-part-chips">
        ${parts.map(x =>
          `<button type="button" class="chip ${x.id === selectedPartId ? 'active' : ''}" data-ac-part-chip="${esc(x.id)}">${esc(x.label)}</button>`
        ).join('')}
      </div>`;
  }

  /* ---------- Calculator ---------- */
  function calcState(profile) {
    const d = data();
    const sgDef = (d && d.fuelSgDefault) || 0.72;
    const base = {
      emptyKg: profile.emptyKgTypical,
      pilotKg: 80,
      paxKg: 0,
      bagKg: 0,
      fuelL: Math.min(30, profile.maxFuelL || 50),
      fuelSg: sgDef,
      burnLph: profile.fuelBurnLphTypical || 15,
      tankMaxL: profile.maxFuelL
    };
    if (calcDraft && calcDraft.aircraftId === profile.id && calcDraft.variantId === profile.variant.id) {
      return Object.assign({}, base, calcDraft.fields);
    }
    return base;
  }

  function runNumbers(profile, st) {
    const empty = +st.emptyKg || 0;
    const pilot = +st.pilotKg || 0;
    const pax = +st.paxKg || 0;
    const bag = +st.bagKg || 0;
    const fuelL = Math.max(0, Math.min(+st.fuelL || 0, +st.tankMaxL || profile.maxFuelL || 0));
    const sg = +st.fuelSg || 0.72;
    const burn = +st.burnLph || 0;
    const mtow = profile.mtowKg;
    const fuelKg = fuelL * sg;
    const cockpit = pilot + pax + bag;
    const auw = empty + cockpit + fuelKg;
    const remain = mtow - auw;
    const over = remain < -0.05;
    // Max fuel L for current people+baggage
    const payloadPeopleBag = cockpit;
    const maxFuelKg = Math.max(0, mtow - empty - payloadPeopleBag);
    const maxFuelL = Math.min(st.tankMaxL || profile.maxFuelL, maxFuelKg / sg);
    // Max cockpit with tanks full (or selected tank max)
    const fullFuelKg = (st.tankMaxL || profile.maxFuelL) * sg;
    const maxCockpitFull = Math.max(0, mtow - empty - fullFuelKg);
    const enduranceH = burn > 0 ? fuelL / burn : null;
    return {
      fuelKg, cockpit, auw, remain, over, maxFuelL, maxCockpitFull, enduranceH, fuelL, sg, mtow, empty
    };
  }

  function calcHtml(profile) {
    const st = calcState(profile);
    const n = runNumbers(profile, st);
    const tankOpts = (profile.fuelLitresOptions || [profile.maxFuelL]).map(L =>
      `<option value="${L}" ${+st.tankMaxL === +L ? 'selected' : ''}>${L} L tank</option>`
    ).join('');
    const statusClass = n.over ? 'ac-status-over' : 'ac-status-ok';
    const statusText = n.over ? 'OVER MTOW (Maximum Take-Off Weight)' : 'OK — within typical MTOW (Maximum Take-Off Weight)';
    const endur = n.enduranceH != null
      ? `${Math.floor(n.enduranceH)}h ${Math.round((n.enduranceH % 1) * 60)}m`
      : '—';

    return `
      <div class="card ac-calc-card">
        <div class="meta" style="color:var(--sky);font-weight:700;margin-bottom:6px">Fuel &amp; weight trade</div>
        <p class="ac-variant-source">Limits from variant: <strong>${esc(profile.variantLabel)}</strong>
          · MTOW (Maximum Take-Off Weight) <strong>${profile.mtowKg} kg</strong>
          · Empty typical <strong>${profile.emptyKgTypical} kg</strong>
          · Tank max <strong>${profile.maxFuelL} L</strong>
          ${profile.powerHpApprox ? `· ~${profile.powerHpApprox} hp` : ''}
        </p>
        <div class="calc-grid ac-calc-grid">
          <label>Empty weight (kg)
            <input type="number" id="ac-empty" value="${esc(st.emptyKg)}" min="50" max="400" step="1"/>
          </label>
          <label>Tank capacity
            <select id="ac-tank">${tankOpts}</select>
          </label>
          <label>Pilot (kg)
            <input type="number" id="ac-pilot" value="${esc(st.pilotKg)}" min="0" max="200" step="1"/>
          </label>
          <label>Passenger (kg)
            <input type="number" id="ac-pax" value="${esc(st.paxKg)}" min="0" max="200" step="1"/>
          </label>
          <label>Baggage (kg)
            <input type="number" id="ac-bag" value="${esc(st.bagKg)}" min="0" max="80" step="1"/>
          </label>
          <label>Fuel (litres)
            <input type="number" id="ac-fuel" value="${esc(st.fuelL)}" min="0" max="${esc(st.tankMaxL)}" step="1"/>
          </label>
          <label>Fuel SG (Specific Gravity)
            <input type="number" id="ac-sg" value="${esc(st.fuelSg)}" min="0.6" max="0.85" step="0.01"/>
          </label>
          <label>Burn (L/h) <span class="meta">optional</span>
            <input type="number" id="ac-burn" value="${esc(st.burnLph)}" min="0" max="40" step="0.5"/>
          </label>
        </div>
        <div class="calc-results" id="ac-calc-out">
          <div class="result-tile"><div class="val">${n.fuelKg.toFixed(1)} kg</div><div class="lbl">Fuel weight</div></div>
          <div class="result-tile"><div class="val">${n.cockpit.toFixed(0)} kg</div><div class="lbl">Cockpit load</div></div>
          <div class="result-tile"><div class="val">${n.auw.toFixed(1)} kg</div><div class="lbl">Total AUW (All-Up Weight)</div></div>
          <div class="result-tile"><div class="val" style="color:${n.over ? 'var(--red)' : 'var(--green)'}">${n.remain >= 0 ? '+' : ''}${n.remain.toFixed(1)} kg</div><div class="lbl">Remaining to MTOW (Maximum Take-Off Weight)</div></div>
          <div class="result-tile"><div class="val">${n.maxFuelL.toFixed(0)} L</div><div class="lbl">Max fuel now</div></div>
          <div class="result-tile"><div class="val">${n.maxCockpitFull.toFixed(0)} kg</div><div class="lbl">Max cockpit (tanks full)</div></div>
          <div class="result-tile"><div class="val">${endur}</div><div class="lbl">Endurance est.</div></div>
          <div class="result-tile ${statusClass}"><div class="val">${statusText}</div><div class="lbl">Status</div></div>
        </div>
        <p class="ac-calc-note">Fuel kg = litres × SG (Specific Gravity, default 0.72). Max fuel = leftover mass to MTOW (Maximum Take-Off Weight) ÷ SG, capped by tank. Max cockpit = MTOW − empty − full-tank fuel. Study aid only.</p>
      </div>`;
  }

  /* ---------- Views ---------- */
  function viewList(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Microlights';
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const d = data();
    const items = list();
    selectedPartId = null;
    calcDraft = null;
    const prefId = (typeof AircraftPref !== 'undefined') ? AircraftPref.aircraftId() : null;
    const yoursLabel = (typeof I18n !== 'undefined') ? I18n.t('aircraft.yours') : 'Your aircraft';

    // Prefer selected type at top
    const ordered = prefId
      ? [...items].sort((a, b) => (a.id === prefId ? -1 : b.id === prefId ? 1 : 0))
      : items;

    return `
      <div class="disclaimer-inline">${esc(d ? d.disclaimer : 'Study figures only — confirm POH.')}</div>
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK NPPL · microlight sector</div>
        <h1 style="font-size:1.25rem">Aircraft study cards</h1>
        <p style="color:var(--muted);font-size:0.85rem;margin-top:6px">Parts · typical specs by engine/variant · fuel vs weight calculator</p>
      </div>
      ${ordered.map(ac => {
        const r = resolved(ac);
        const vCount = (ac.variants && ac.variants.length) || 0;
        const isYours = prefId === ac.id;
        const thumb = (typeof AircraftPref !== 'undefined')
          ? `<div class="ac-thumb">${AircraftPref.thumbForAircraft(ac, 48)}</div>`
          : `<div class="card-icon">${ac.category === 'weightshift' ? '🪂' : '✈'}</div>`;
        return `<button type="button" class="card card-tap ac-list-card ${isYours ? 'is-yours' : ''}" data-ac-open="${esc(ac.id)}">
          <div class="subject-card">
            ${thumb}
            <div class="info">
              <h3>${esc(ac.name)}${isYours ? ` <span class="ac-yours-badge">${esc(yoursLabel)}</span>` : (ac.badge ? ` <span class="ac-badge">${esc(ac.badge)}</span>` : '')}</h3>
              <div class="meta">${esc(ac.category)} · ${ac.seats} seats · ${esc(r ? r.engineTypical : '')}</div>
              <div class="meta">MTOW (Maximum Take-Off Weight) typical ${r ? r.mtowKg : '—'} kg · empty ~${r ? r.emptyKgTypical : '—'} kg · ${vCount} engine/variant${vCount === 1 ? '' : 's'}</div>
            </div>
            <div class="chev">›</div>
          </div>
        </button>`;
      }).join('')}
      <div class="disclaimer-inline">${esc(d ? d.disclaimer : '')}</div>`;
  }

  function viewDetail(ctx, id) {
    const ac = list().find(a => a.id === id);
    if (!ac) {
      ctx.setNav('theory');
      ctx.titleEl.textContent = 'Microlights';
      ctx.btnBack.hidden = false;
      /* back: goBack() */
      return `<p>Aircraft not found.</p><button type="button" class="btn btn-primary" data-go="microlights">Back to list</button>`;
    }
    const profile = resolved(ac);
    ctx.setNav('theory');
    ctx.titleEl.textContent = ac.shortName || ac.name;
    ctx.btnBack.hidden = false;
    calcDraft = null;

    if (!selectedPartId && profile.parts && profile.parts.length) {
      selectedPartId = profile.parts[0].id;
    }

    const variantOptions = (ac.variants || []).map(v =>
      `<option value="${esc(v.id)}" ${v.id === profile.variant.id ? 'selected' : ''}>${esc(v.label)}</option>`
    ).join('');

    const specs = [
      ['Category', profile.category],
      ['Seats', `${profile.seats} · ${profile.seating}`],
      ['Engine (this variant)', profile.engineTypical],
      ['MTOW (Maximum Take-Off Weight)', `${profile.mtowKg} kg · ${profile.mtowSource}`],
      ['Empty weight (typical)', `${profile.emptyKgTypical} kg · ${profile.emptySource}`],
      ['Empty note', profile.emptyNote || '—'],
      ['Fuel tank options', (profile.fuelLitresOptions || []).join(' / ') + ' L'],
      ['Default tank max', `${profile.maxFuelL} L`],
      ['Burn (typical)', `${profile.fuelBurnLphTypical} L/h`],
      ['Cruise / stall (rough)', `${profile.cruiseKts} / ${profile.stallKts} kt`],
      ['Wingspan / length', `${profile.wingspanM != null ? profile.wingspanM + ' m' : '—'} / ${profile.lengthM != null ? profile.lengthM + ' m' : '—'}`],
      ['Max per seat (if cited)', profile.maxSeatKg != null ? `~${profile.maxSeatKg} kg` : '— confirm placard']
    ];

    return `
      <div class="disclaimer-inline">${esc(data().disclaimer)}</div>

      <div class="card">
        <div class="meta" style="color:var(--sky);font-weight:700">${esc(ac.name)}${ac.badge ? ` · ${esc(ac.badge)}` : ''}</div>
        <p style="color:#c9ced8;font-size:0.88rem;margin-top:6px">${esc(profile.category)} · ${esc(profile.seating)}</p>
        <label class="ac-variant-label">Engine / power / approval variant
          <select id="ac-variant" class="ac-variant-select">${variantOptions}</select>
        </label>
        <p class="ac-variant-hint">${esc(profile.variantNotes || 'Changing variant updates MTOW (Maximum Take-Off Weight), empty weight, tanks, and calculator defaults.')}</p>
      </div>

      <div class="section-label">Labelled parts</div>
      <div class="diagram ac-diagram" id="ac-diagram-wrap">
        ${diagramSvg(profile, selectedPartId)}
        <div class="diagram-caption">Tap hotspots or chips · schematic teaching diagram (not a copyrighted photo)</div>
      </div>
      ${partCard(profile)}

      <div class="section-label">Characteristics</div>
      <div class="card ac-specs">
        <table class="ac-spec-table">
          ${specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}
        </table>
        ${(ac.notes || []).map(n => `<p class="ac-note">• ${esc(n)}</p>`).join('')}
      </div>

      <div class="section-label">Fuel &amp; weight calculator</div>
      ${calcHtml(profile)}
      <div class="disclaimer-inline">${esc(data().disclaimer)}</div>`;
  }

  function view(ctx) {
    // unused — app calls viewList / viewDetail
    return viewList(ctx);
  }

  /* ---------- Bind ---------- */
  function readCalcFields(profile) {
    const tankEl = document.getElementById('ac-tank');
    const tankMax = tankEl ? parseFloat(tankEl.value) : profile.maxFuelL;
    return {
      emptyKg: num('ac-empty', profile.emptyKgTypical),
      pilotKg: num('ac-pilot', 80),
      paxKg: num('ac-pax', 0),
      bagKg: num('ac-bag', 0),
      fuelL: num('ac-fuel', 30),
      fuelSg: num('ac-sg', 0.72),
      burnLph: num('ac-burn', profile.fuelBurnLphTypical),
      tankMaxL: tankMax
    };
  }

  function num(id, fallback) {
    const el = document.getElementById(id);
    if (!el || el.value === '') return fallback;
    const n = parseFloat(el.value);
    return Number.isFinite(n) ? n : fallback;
  }

  function refreshCalcOnly(profile) {
    const fields = readCalcFields(profile);
    // clamp fuel to tank
    if (fields.fuelL > fields.tankMaxL) fields.fuelL = fields.tankMaxL;
    const fuelInput = document.getElementById('ac-fuel');
    if (fuelInput) {
      fuelInput.max = fields.tankMaxL;
      if (parseFloat(fuelInput.value) > fields.tankMaxL) fuelInput.value = fields.tankMaxL;
    }
    calcDraft = { aircraftId: profile.id, variantId: profile.variant.id, fields };
    const n = runNumbers(profile, fields);
    const out = document.getElementById('ac-calc-out');
    if (!out) return;
    const endur = n.enduranceH != null
      ? `${Math.floor(n.enduranceH)}h ${Math.round((n.enduranceH % 1) * 60)}m`
      : '—';
    const statusClass = n.over ? 'ac-status-over' : 'ac-status-ok';
    const statusText = n.over ? 'OVER MTOW (Maximum Take-Off Weight)' : 'OK — within typical MTOW (Maximum Take-Off Weight)';
    out.innerHTML = `
      <div class="result-tile"><div class="val">${n.fuelKg.toFixed(1)} kg</div><div class="lbl">Fuel weight</div></div>
      <div class="result-tile"><div class="val">${n.cockpit.toFixed(0)} kg</div><div class="lbl">Cockpit load</div></div>
      <div class="result-tile"><div class="val">${n.auw.toFixed(1)} kg</div><div class="lbl">Total AUW (All-Up Weight)</div></div>
      <div class="result-tile"><div class="val" style="color:${n.over ? 'var(--red)' : 'var(--green)'}">${n.remain >= 0 ? '+' : ''}${n.remain.toFixed(1)} kg</div><div class="lbl">Remaining to MTOW (Maximum Take-Off Weight)</div></div>
      <div class="result-tile"><div class="val">${n.maxFuelL.toFixed(0)} L</div><div class="lbl">Max fuel now</div></div>
      <div class="result-tile"><div class="val">${n.maxCockpitFull.toFixed(0)} kg</div><div class="lbl">Max cockpit (tanks full)</div></div>
      <div class="result-tile"><div class="val">${endur}</div><div class="lbl">Endurance est.</div></div>
      <div class="result-tile ${statusClass}"><div class="val">${statusText}</div><div class="lbl">Status</div></div>`;
  }

  function highlightPart(partId) {
    selectedPartId = partId;
    document.querySelectorAll('.ac-hot').forEach(el => {
      const ids = (el.getAttribute('data-ac-part') || '');
      el.classList.toggle('on', ids === partId);
    });
    document.querySelectorAll('[data-ac-part-chip]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.acPartChip === partId);
    });
  }

  function updatePartCard(profile, partId) {
    selectedPartId = partId;
    const p = (profile.parts || []).find(x => x.id === partId);
    const card = document.getElementById('ac-part-card');
    if (card && p) {
      card.querySelector('.meta').textContent = p.label;
      const para = card.querySelector('p');
      if (para) para.textContent = p.role;
    }
    highlightPart(partId);
  }

  function bindList(ctx) {
    document.querySelectorAll('[data-ac-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPartId = null;
        calcDraft = null;
        ctx.go('microlight', { id: btn.dataset.acOpen });
      });
    });
  }

  function bindDetail(ctx, id) {
    const ac = list().find(a => a.id === id);
    if (!ac) return;
    const profile = resolved(ac);

    const variantSel = document.getElementById('ac-variant');
    if (variantSel) {
      variantSel.addEventListener('change', () => {
        variantPick[ac.id] = variantSel.value;
        if (typeof AircraftPref !== 'undefined' && AircraftPref.aircraftId() === ac.id) {
          AircraftPref.setVariantId(variantSel.value, { silent: true });
          AircraftPref.applyTheme();
        }
        selectedPartId = null;
        calcDraft = null;
        ctx.go('microlight', { id: ac.id });
      });
    }

    document.querySelectorAll('[data-ac-part]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = el.getAttribute('data-ac-part');
        if (pid) updatePartCard(profile, pid);
      });
    });
    document.querySelectorAll('[data-ac-part-chip]').forEach(btn => {
      btn.addEventListener('click', () => updatePartCard(profile, btn.dataset.acPartChip));
    });

    const speak = document.getElementById('ac-speak-part');
    if (speak) speak.addEventListener('click', () => {
      const p = (profile.parts || []).find(x => x.id === selectedPartId);
      if (p) AudioSpeak.speak(`${p.label}. ${p.role}`);
    });
    const stop = document.getElementById('btn-stop-speak');
    if (stop) stop.addEventListener('click', () => AudioSpeak.stop());

    ['ac-empty', 'ac-pilot', 'ac-pax', 'ac-bag', 'ac-fuel', 'ac-sg', 'ac-burn', 'ac-tank'].forEach(fid => {
      const el = document.getElementById(fid);
      if (!el) return;
      el.addEventListener('input', () => refreshCalcOnly(profile));
      el.addEventListener('change', () => refreshCalcOnly(profile));
    });
  }

  return {
    viewList,
    viewDetail,
    bindList,
    bindDetail,
    list
  };
})();
