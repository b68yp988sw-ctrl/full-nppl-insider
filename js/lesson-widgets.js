/* FULL NPPL INSIDER — interactive lesson widgets.
   The sample chart is a STUDY RENDERING of a real area of England (the Chilterns and Thames Valley: Oxford and
   Benson to Luton and Elstree, south past Booker and Denham to the edge of the Heathrow CTR) drawn in the style of the UK CAA ICAO 1:500,000 chart legend (2025 legend sheet), built from public
   UK data (OS OpenData, UK AIP via NATS AIS, yaixm, OurAirports, WMM2025). It is NOT a CAA chart,
   it is not for navigation and its data may be out of date. The chart geometry lives in js/vfrchart-data.js and
   is loaded on demand. Widgets are created automatically when a lesson containing <div data-widget="vfrchart"> is rendered. */
(function () {
  'use strict';
  let W = 640, H = 480;                   // replaced by the chart data size on load
  const C = {
    blue: '#3a3fa6', blueT: '#8f93dc', mag: '#a8227f', magT: '#e3a1cf', pink: '#f7d6ec',
    red: '#c2185b', land: '#eef2dc', t1: '#e4dfbd', t2: '#d8c99c', t3: '#c9b07f', cont: '#9a7d55',
    water: '#bfe0f2', river: '#3f86c4', town: '#f4d65a', townE: '#a88400', road: '#c0392b', ink: '#1d1d2b'
  };
  const FONT = 'font-family="Arial,Helvetica,sans-serif"';
  let uid = 0;

  /* ---------- geometry helpers ---------- */
  const pts = a => a.map(p => p.join(',')).join(' ');
  function circlePts(cx, cy, r, n) { const o = []; for (let i = 0; i < n; i++) { const t = i / n * Math.PI * 2; o.push([+(cx + r * Math.cos(t)).toFixed(1), +(cy + r * Math.sin(t)).toFixed(1)]); } return o; }
  // filled half-discs along a closed polygon, bulging inward (RMZ/TMZ style)
  function scallops(poly, size, colorA, colorB) {
    let out = '', k = 0;
    // signed area to know orientation
    let a = 0; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; a += p[0] * q[1] - q[0] * p[1]; }
    const sweep = a > 0 ? 1 : 0;
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length];
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]); const n = Math.max(1, Math.round(len / size));
      for (let j = 0; j < n; j++) {
        const x0 = p[0] + (q[0] - p[0]) * j / n, y0 = p[1] + (q[1] - p[1]) * j / n;
        const x1 = p[0] + (q[0] - p[0]) * (j + 1) / n, y1 = p[1] + (q[1] - p[1]) * (j + 1) / n;
        const r = len / n / 2;
        const col = colorB && (k++ % 2) ? colorB : colorA;
        out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 ${sweep} ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${col}"/>`;
      }
    }
    return out;
  }
  function label(x, y, s, o) {
    o = o || {};
    return `<text x="${x}" y="${y}" ${FONT} font-size="${o.size || 7}" fill="${o.fill || C.ink}" text-anchor="${o.anchor || 'middle'}"${o.weight ? ` font-weight="${o.weight}"` : ''}${o.italic ? ' font-style="italic"' : ''}${o.rotate ? ` transform="rotate(${o.rotate} ${x} ${y})"` : ''}${o.halo === false ? '' : ' paint-order="stroke" stroke="#fff" stroke-width="1.6" stroke-opacity=".85"'}>${s}</text>`;
  }

  /* ---------- symbol drawers (shared by map and legend) ---------- */
  const S = {
    civil(x, y, col) { col = col || C.blue; let t = ''; [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(d => { t += `<line x1="${x + d[0] * 5}" y1="${y + d[1] * 5}" x2="${x + d[0] * 7.5}" y2="${y + d[1] * 7.5}" stroke="${col}" stroke-width="1.8"/>`; }); return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${col}" stroke-width="1.8"/>${t}`; },
    civilLtd(x, y) { return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${C.blue}" stroke-width="1.8"/>`; },
    training(x, y) { return S.civilLtd(x, y) + `<text x="${x + 7}" y="${y + 9}" ${FONT} font-size="6" font-weight="bold" fill="${C.blue}">T</text>`; },
    military(x, y) { return `<circle cx="${x}" cy="${y}" r="6" fill="#fff" stroke="${C.mag}" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="3" fill="none" stroke="${C.mag}" stroke-width="1.6"/>`; },
    heli(x, y) { return `<circle cx="${x}" cy="${y}" r="5.5" fill="#fff" stroke="${C.blue}" stroke-width="1.6"/><text x="${x}" y="${y + 2.6}" ${FONT} font-size="7" font-weight="bold" text-anchor="middle" fill="${C.blue}">H</text>`; },
    micro(x, y) { return `<circle cx="${x}" cy="${y}" r="5.5" fill="#fff" stroke="${C.blue}" stroke-width="1.6"/><text x="${x}" y="${y + 2.6}" ${FONT} font-size="7" font-weight="bold" text-anchor="middle" fill="${C.blue}">M</text>`; },
    disused(x, y) { return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${C.blue}" stroke-width="1.5"/><path d="M${x - 3.3},${y - 3.3}L${x + 3.3},${y + 3.3}M${x + 3.3},${y - 3.3}L${x - 3.3},${y + 3.3}" stroke="${C.blue}" stroke-width="1.4"/>`; },
    glider(x, y) { return `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="${C.blue}" stroke-width="1.5"/><text x="${x}" y="${y + 3.4}" ${FONT} font-size="9" font-weight="bold" text-anchor="middle" fill="${C.blue}">G</text><text x="${x + 7}" y="${y + 11}" ${FONT} font-size="5.5" font-weight="bold" fill="${C.blue}">/2.5</text>`; },
    para(x, y) { return `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="${C.blue}" stroke-width="1.5"/><path d="M${x - 4.5},${y - 0.5} A4.5,4.5 0 0 1 ${x + 4.5},${y - 0.5} Z" fill="${C.blue}"/><path d="M${x - 4.5},${y - 0.5}L${x},${y + 4.5}L${x + 4.5},${y - 0.5}M${x},${y - 0.5}L${x},${y + 4.5}" stroke="${C.blue}" stroke-width=".8" fill="none"/>`; },
    vrp(x, y) { return `<circle cx="${x}" cy="${y}" r="3.2" fill="#fff" stroke="${C.blue}" stroke-width="1.2"/><path d="M${x - 3.2},${y}H${x + 3.2}M${x},${y - 3.2}V${y + 3.2}" stroke="${C.blue}" stroke-width="1"/>`; },
    obst(x, y) { return `<path d="M${x - 3},${y + 3} L${x},${y - 5} L${x + 3},${y + 3}" fill="none" stroke="${C.blue}" stroke-width="1.4"/><circle cx="${x}" cy="${y + 3}" r=".9" fill="${C.blue}"/>`; },
    obstLit(x, y) { let r = ''; [-50, -90, -130].forEach(a => { const t = a * Math.PI / 180; r += `<line x1="${(x + Math.cos(t) * 3).toFixed(1)}" y1="${(y - 6 + Math.sin(t) * 3).toFixed(1)}" x2="${(x + Math.cos(t) * 5.5).toFixed(1)}" y2="${(y - 6 + Math.sin(t) * 5.5).toFixed(1)}" stroke="${C.blue}" stroke-width=".9"/>`; }); return S.obst(x, y) + r; },
    obstHigh(x, y) { return `<path d="M${x - 3.5},${y + 4} L${x},${y - 8} L${x + 3.5},${y + 4} Z" fill="${C.blue}"/>` + `<path d="M${x - 4},${y - 10}l-2,-2M${x + 4},${y - 10}l2,-2M${x},${y - 11}v-3" stroke="${C.blue}" stroke-width=".9"/>`; },
    turbine(x, y) { return `<line x1="${x}" y1="${y + 4}" x2="${x}" y2="${y - 2}" stroke="${C.blue}" stroke-width="1.2"/><path d="M${x},${y - 2}l0,-4.5M${x},${y - 2}l3.9,2.2M${x},${y - 2}l-3.9,2.2" stroke="${C.blue}" stroke-width="1"/>`; },
    vor(x, y) { const p = circlePts(x, y, 4.5, 6); return `<polygon points="${pts(p)}" fill="#fff" stroke="${C.blue}" stroke-width="1.3"/><circle cx="${x}" cy="${y}" r="1" fill="${C.blue}"/>`; },
    ndb(x, y) { let d = ''; for (let r = 3; r <= 7; r += 2) circlePts(x, y, r, Math.round(r * 3)).forEach(p => { d += `<circle cx="${p[0]}" cy="${p[1]}" r=".45" fill="${C.blue}"/>`; }); return d + `<circle cx="${x}" cy="${y}" r="1.4" fill="${C.blue}"/>`; },
    bird(x, y) { return `<circle cx="${x}" cy="${y}" r="6.5" fill="#fff" stroke="${C.blue}" stroke-width="1.3"/><path d="M${x - 4},${y + 1} q2,-4 5,-1 q2,-2 3,0 q-1,3 -5,3 q-2,0 -3,-2z" fill="${C.blue}"/>`; },
    hirta(x, y) { let g = ''; for (let i = -4; i <= 4; i += 2) g += `<path d="M${x + i},${y - 6}V${y + 6}M${x - 6},${y + i}H${x + 6}" stroke="${C.blue}" stroke-width=".5"/>`; return `<clipPath id="hc${x}_${y}"><circle cx="${x}" cy="${y}" r="6.5"/></clipPath><g clip-path="url(#hc${x}_${y})">${g}</g><circle cx="${x}" cy="${y}" r="6.5" fill="none" stroke="${C.blue}" stroke-width="1.3"/>`; },
    spot(x, y) { return `<circle cx="${x}" cy="${y}" r="1.1" fill="${C.ink}"/>`; }
  };

  /* ---------- legend / explanations (plain English, what to do) ---------- */
  const L = [
    { id: 'edition', grp: 'Chart basics', name: 'Title panel, edition & validity date', mini: m => `<rect x="2" y="4" width="36" height="16" fill="#fff" stroke="${C.blue}"/><text x="20" y="15" ${FONT} font-size="6" text-anchor="middle" fill="${C.blue}">Ed. 52</text>`, what: 'Every real CAA chart prints its edition number and the date its aeronautical information is valid from. Airspace changes every year, so an old chart can put you inside controlled airspace without knowing.', todo: 'Fly only with the current edition. Before using it, check the NATS AIS VFR chart amendment list for changes since the validity date, then check NOTAMs and the UK AIP for the day.' },
    { id: 'scale', grp: 'Chart basics', name: 'Scale bar (NM / km)', mini: m => `<path d="M3,14H37M3,10V18M20,12V16M37,10V18" stroke="${C.ink}" stroke-width="1.4"/>`, what: '1:500,000 means 1 cm on the chart is 5 km (about 2.7 NM) on the ground. 1 NM is about 3.7 mm. On a 1:250,000 chart everything is twice as big.', todo: 'Measure distances with the scale bar or a plotter set to the right scale (NM, not km or statute miles).' },
    { id: 'graticule', grp: 'Chart basics', name: 'Latitude & longitude lines', mini: m => `<path d="M2,8H38M2,18H38M12,2V22M28,2V22" stroke="#6a6a8a" stroke-width=".8"/>`, what: 'Graticule lines every 30 minutes of latitude and longitude, with minute ticks on the edges. 1 minute of latitude = 1 NM. The 1:500,000 chart is a Lambert conformal projection, so meridians converge slightly.', todo: 'Measure track angles against a meridian near the middle of the leg. Read positions as degrees and minutes N and W.' },
    { id: 'mef', grp: 'Chart basics', name: 'Maximum Elevation Figure (MEF)', mini: m => `<text x="14" y="20" ${FONT} font-size="18" font-weight="bold" fill="${C.blue}">2</text><text x="25" y="11" ${FONT} font-size="9" font-weight="bold" fill="${C.blue}">0</text>`, what: 'The big digit is thousands of feet and the small one hundreds, above mean sea level, for the highest known feature in that half-degree box, including terrain and obstacles, with an allowance for unknown ones. "2⁰" = 2,000 ft AMSL.', todo: 'Use it as a quick warning of high ground or masts. The legend says it is NOT a safety altitude: work out your own minimum safe altitude for each leg.' },
    { id: 'isogonal', grp: 'Chart basics', name: 'Isogonal (magnetic variation)', mini: m => `<path d="M3,20L37,4" stroke="${C.mag}" stroke-width="1.2" stroke-dasharray="4 2"/><text x="20" y="11" ${FONT} font-size="6" fill="${C.mag}">1°E</text>`, what: 'A dashed line joining places with the same magnetic variation. Across this sheet in 2026 it is about 1° East: it moved from West to East around 2019–2022 and is still drifting east by about 0.2° a year, so always use the current chart.', todo: 'Convert true track to magnetic: variation West, magnetic best (add); variation East, magnetic least (subtract). Use the variation printed near your route on the current chart.' },
    { id: 'terrain', grp: 'Topography', name: 'Contours & terrain colouring', mini: m => `<rect x="2" y="2" width="36" height="20" fill="${C.t1}"/><path d="M6,20 Q20,0 34,20" fill="${C.t2}" stroke="${C.cont}" stroke-width=".8"/><path d="M13,20 Q20,8 27,20" fill="${C.t3}" stroke="${C.cont}" stroke-width=".8"/>`, what: 'Thin brown contour lines join ground of equal height and the colour gets darker as the ground gets higher (layer tints). Close contours mean steep ground. On this study chart ground above 500 ft AMSL is tinted, with a hillshade and extra 250 ft and 750 ft contours (real CAA charts tint in bands from 500 ft upwards).', todo: 'Expect lower cloud bases, hill fog and turbulence over high ground. Plan to clear terrain and obstacles by a safe margin and never scud-run into rising ground.' },
    { id: 'spot', grp: 'Topography', name: 'Spot heights', mini: m => `<circle cx="12" cy="13" r="1.6" fill="${C.ink}"/><text x="16" y="15" ${FONT} font-size="8" fill="${C.ink}">1043</text>`, what: 'A dot with a number is the height of that point in feet above mean sea level. The highest spot heights are often hilltops.', todo: 'Use them with the MEF when you work out a minimum safe altitude, and as checkpoints when hills are visible.' },
    { id: 'water', grp: 'Topography', name: 'Water: coast, rivers & lakes', mini: m => `<rect x="2" y="2" width="36" height="20" fill="${C.water}"/><path d="M2,16 Q14,6 22,14 T38,10" stroke="${C.river}" stroke-width="1.6" fill="none"/>`, what: 'Blue shows sea, lakes, reservoirs and the larger rivers. Water features are some of the best checkpoints because their shapes are distinctive.', todo: 'Choose large, unique water shapes as checkpoints. Small rivers are hard to see from height, especially in summer.' },
    { id: 'town', grp: 'Topography', name: 'Towns & built-up areas', mini: m => `<path d="M5,6 L30,4 L36,16 L14,20 Z" fill="${C.town}" stroke="${C.townE}" stroke-width=".8"/>`, what: 'Yellow areas show the outline of towns and cities. Their shape helps you identify them from the air.', todo: 'Over a congested area SERA.5005(f) needs at least 1,000 ft above the highest obstacle within 600 m (and enough height to glide clear if the engine stops).' },
    { id: 'roads', grp: 'Topography', name: 'Roads & railways', mini: m => `<path d="M2,8 L38,12" stroke="${C.road}" stroke-width="1.8"/><path d="M2,18 L38,18" stroke="${C.ink}" stroke-width="1.2"/><path d="M8,16V20M16,16V20M24,16V20M32,16V20" stroke="${C.ink}" stroke-width=".7"/>`, what: 'Main roads and motorways (red here) and railways (black with ticks). They are line features you can follow.', todo: 'Use them to confirm position, not as your only reference. UK airmanship: keep a line feature on your left so opposite-direction traffic doing the same passes safely.' },
    { id: 'classA', grp: 'Airspace', name: 'Class A (airways & TMAs)', mini: m => `<path d="M2,12H38" stroke="${C.mag}" stroke-width="6" stroke-opacity=".45"/><path d="M2,9H38" stroke="${C.mag}" stroke-width="1.6"/><text x="20" y="21" ${FONT} font-size="6" text-anchor="middle" fill="${C.mag}" font-weight="bold">A FL55+</text>`, what: 'Magenta boundary with a tint band inside. Class A is IFR only: no VFR flight at all. Labels give the base and top, e.g. "FL55+" means from FL55 up to FL195 (the + means the top is FL195).', todo: 'Stay below the base or go around. A microlight on an NPPL can never enter Class A. Work out where the base changes along your route (narrow tint bands show level changes).' },
    { id: 'classD_ctr', grp: 'Airspace', name: 'Class D control zone (CTR) from the surface', mini: m => `<rect x="3" y="3" width="34" height="18" fill="${C.pink}" stroke="${C.blue}" stroke-width="1.6"/><text x="20" y="15" ${FONT} font-size="6" text-anchor="middle" fill="${C.blue}" font-weight="bold">CTR D SFC</text>`, what: 'Blue boundary with blue tint, and a pink fill because it starts at the surface. A control zone protects a busy airport. Label example: "CTR D SFC-2500\'" = Class D from the surface to 2,500 ft ALT.', todo: 'You need an ATC clearance before entering ("cleared" must be heard), two-way radio, and VMC. Call about 10 minutes before the boundary, read back the clearance and have a plan B route round it. Without a clearance stay out.' },
    { id: 'classD_cta', grp: 'Airspace', name: 'Class D control area (CTA) with a base', mini: m => `<path d="M2,12H38" stroke="${C.blue}" stroke-width="6" stroke-opacity=".35"/><path d="M2,9H38" stroke="${C.blue}" stroke-width="1.6"/><text x="20" y="21" ${FONT} font-size="6" text-anchor="middle" fill="${C.blue}" font-weight="bold">D 1500'-3500'</text>`, what: 'Blue boundary and tint band but no pink fill, because it does not reach the ground. "CTA D 1500\'-3500\'" means Class D from 1,500 ft ALT to 3,500 ft ALT. Below 1,500 ft is outside it (usually Class G).', todo: 'Either get a clearance to enter, or stay below the base with a margin (on the QNH of an aerodrome under that airspace). Remember your altimeter error and the terrain under you.' },
    { id: 'classE', grp: 'Airspace', name: 'Class E', mini: m => `<path d="M2,12H38" stroke="${C.blueT}" stroke-width="6" stroke-opacity=".5" stroke-dasharray="7 3"/><text x="20" y="21" ${FONT} font-size="6" text-anchor="middle" fill="${C.blue}" font-weight="bold">E 2000'-6000'</text>`, what: 'Controlled airspace where IFR traffic is controlled but VFR flights do not need a clearance. In the UK it is uncommon at low level. Some Class E is also a TMZ, so a transponder may still be required.', todo: 'VFR: VMC minima of 5 km, 1,500 m horizontally and 1,000 ft vertically from cloud apply. Check whether it is also a TMZ or RMZ. A Basic or Traffic Service from the local unit is wise.' },
    { id: 'rmz', grp: 'Airspace', name: 'Radio Mandatory Zone (RMZ)', mini: m => scallops([[3, 6], [37, 6], [37, 20], [3, 20]], 6, C.blue), what: 'Blue scalloped border. You must carry and use a radio inside: call the controlling unit before entering (state callsign, type, position, level and intentions) and keep listening while inside. It is NOT a clearance zone: the airspace class (often G) still applies.', todo: 'Make the call before the boundary and get two-way contact. If you cannot, stay out. Note the unit and frequency from the chart/AIP. Details: UK AIP GEN 1.5 and ENR 2.2.' },
    { id: 'tmz', grp: 'Airspace', name: 'Transponder Mandatory Zone (TMZ)', mini: m => scallops([[3, 6], [37, 6], [37, 20], [3, 20]], 6, C.mag), what: 'Magenta scalloped border. Aircraft inside must carry and operate a serviceable SSR transponder (Mode S where specified), with altitude reporting. An RMZ/TMZ has alternating blue and magenta scallops and needs both.', todo: 'Switch the transponder to ALT before you reach the boundary. With no transponder you must get permission from the controlling unit first, or route round. Details: UK AIP ENR 1.6 and ENR 2.2.' },
    { id: 'atz', grp: 'Airspace', name: 'Aerodrome Traffic Zone (ATZ)', mini: m => `<circle cx="20" cy="12" r="9" fill="${C.pink}" stroke="${C.mag}" stroke-width="2.4" stroke-dasharray="0 4.5" stroke-linecap="round"/>`, what: 'Magenta dotted circle (pink fill = from the surface). Surface to 2,000 ft above aerodrome level, radius 2 NM from the mid-point of the longest runway (2.5 NM if that runway is longer than 1,850 m). Rule 11 of the Rules of the Air 2015 applies during notified hours.', todo: 'ATC unit: get permission. AFIS: get information. Air/Ground: get information. Report position and height when you enter and before you leave. ATZs entirely inside controlled airspace are not drawn, so a field inside a CTR may still have one. Frequencies are in the chart\'s ATZ table and the AIP.' },
    { id: 'matz', grp: 'Airspace', name: 'Military ATZ (MATZ)', mini: m => `<circle cx="16" cy="12" r="9" fill="${C.blueT}" fill-opacity=".25" stroke="${C.blue}" stroke-width="2.2" stroke-dasharray="0 4.5" stroke-linecap="round"/><rect x="24" y="9" width="14" height="6" fill="${C.blueT}" fill-opacity=".25" stroke="${C.blue}" stroke-width="1.5" stroke-dasharray="0 3.5" stroke-linecap="round"/>`, what: 'Blue dotted outline. Usually the surface to 3,000 ft above aerodrome level within 5 NM, plus stubs (about 4 NM wide and 5 NM long) from 1,000 ft to 3,000 ft AAL. The frequency box shows the penetration frequency, and "LARS" if that unit gives a Lower Airspace Radar Service.', todo: 'A MATZ is not compulsory for civil pilots, but you are strongly advised to call 15 NM or 5 minutes out and ask for a "MATZ penetration", then follow the instructions. The ATZ in the middle IS compulsory (Rule 11).' },
    { id: 'danger', grp: 'Airspace', name: 'Danger Area (solid boundary)', mini: m => `<rect x="3" y="4" width="34" height="16" fill="none" stroke="${C.red}" stroke-width="1.5"/><rect x="5" y="6" width="30" height="12" fill="none" stroke="${C.red}" stroke-width="3" stroke-dasharray="1 2" stroke-opacity=".7"/><text x="20" y="15" ${FONT} font-size="6" text-anchor="middle" fill="${C.red}" font-weight="bold">D123/5.0</text>`, what: 'Red boundary with hatching inside. "D123/5.0" = Danger Area 123, active up to 5,000 ft AMSL. Firing ranges, test sites and similar. A solid line means it has scheduled activity times (see UK AIP ENR 5.1).', todo: 'Find out whether it is active: use the Danger Area Crossing Service (DACS) or Activity Information Service (DAAIS/SUAAIS) frequency on the chart legend, or the pre-flight phone number. If you get no reply, assume it is active and avoid it.' },
    { id: 'danger_notam', grp: 'Airspace', name: 'Danger Area active by NOTAM (broken boundary)', mini: m => `<rect x="3" y="4" width="34" height="16" fill="none" stroke="${C.red}" stroke-width="1.5" stroke-dasharray="4 2.5"/><text x="20" y="15" ${FONT} font-size="6" text-anchor="middle" fill="${C.red}" font-weight="bold">D124/2.0</text>`, what: 'A broken (dashed) boundary means the area is only active when a NOTAM says so.', todo: 'Check the NOTAMs (and the Navigation Warnings) for the day of flight. If it is notified active, stay out.' },
    { id: 'restricted', grp: 'Airspace', name: 'Restricted Area (R)', mini: m => `<rect x="3" y="4" width="34" height="16" fill="none" stroke="${C.red}" stroke-width="1.5"/><text x="20" y="15" ${FONT} font-size="6" text-anchor="middle" fill="${C.red}" font-weight="bold">R105/2.2</text>`, what: 'Flight is restricted by law according to conditions in the UK AIP ENR 5.1 (for example only with permission, or only at certain times). R105/2.2 = up to 2,200 ft AMSL. Temporary restrictions (RA(T)) are published by AIC and NOTAM.', todo: 'Read the conditions in ENR 5.1 and stay out unless you meet them. Check for RA(T)s on every flight: royal flights, air displays and events create them at short notice.' },
    { id: 'prohibited', grp: 'Airspace', name: 'Prohibited Area (P)', mini: m => `<circle cx="20" cy="12" r="8" fill="none" stroke="${C.red}" stroke-width="1.6"/><text x="20" y="14.5" ${FONT} font-size="6" text-anchor="middle" fill="${C.red}" font-weight="bold">P106</text>`, what: 'No flight at all within the stated limits (for example over some sensitive sites).', todo: 'Never enter. Plan your track to stay well clear, allowing for drift and navigation error.' },
    { id: 'civil_ad', grp: 'Aerodromes', name: 'Civil aerodrome', mini: m => S.civil(20, 12), what: 'Blue circle with four ticks: a civil aerodrome. The number next to it is the elevation in feet AMSL. Name in capitals.', todo: 'Check the UK AIP (or the strip\'s own website) for PPR, hours, radio and circuit procedures before you go. Portrayal does not give you any right to land without permission.' },
    { id: 'civil_ltd', grp: 'Aerodromes', name: 'Civil aerodrome, limited or no facilities', mini: m => S.civilLtd(20, 12), what: 'Plain blue circle: a civil aerodrome with limited or no facilities, where flying training may be taking place.', todo: 'Expect non-radio or training traffic. Get PPR, and if there is no radio service, broadcast your intentions and join with great care.' },
    { id: 'training', grp: 'Aerodromes', name: 'Training aerodrome (T)', mini: m => S.training(18, 11), what: 'A "T" by the symbol means flight training, including circuit training, takes place there (UK AIP ENR 1.1 & ENR 5.5).', todo: 'Expect busy circuits and students. Avoid the overhead and circuit unless you are joining, and call them if you are passing nearby.' },
    { id: 'military_ad', grp: 'Aerodromes', name: 'Government (military) aerodrome', mini: m => S.military(20, 12), what: 'Magenta double circle. A government aerodrome. Most have an H24 ATZ and many a MATZ.', todo: 'Do not land without permission (except in an emergency). Call for a MATZ penetration service and observe the ATZ.' },
    { id: 'heliport', grp: 'Aerodromes', name: 'Heliport (H)', mini: m => S.heli(20, 12), what: 'Blue H in a circle: a civil heliport. A magenta one is a government heliport.', todo: 'Expect helicopters arriving and leaving at low level from any direction.' },
    { id: 'microlight', grp: 'Aerodromes', name: 'Microlight flying site (M)', mini: m => S.micro(20, 12), what: 'Blue M in a circle. Intense microlight activity also happens at some other licensed and unlicensed aerodromes (UK AIP ENR 1.1 & ENR 5.5).', todo: 'Expect slow aircraft in the circuit, often without radio. Always get PPR before landing at a farm strip.' },
    { id: 'glider', grp: 'Aerodromes', name: 'Glider launching site (G/2.5)', mini: m => S.glider(16, 10), what: 'G in a circle. The figure after the slash is the maximum altitude of the winch cable in thousands of feet AMSL: "/2.5" = cable up to 2,500 ft AMSL (2,000 ft above the site plus its elevation).', todo: 'Never fly over a winch site below the figure shown: the cable is almost invisible. Expect gliders above and around it too, and in thermals nearby.' },
    { id: 'para', grp: 'Aerodromes', name: 'Free-fall parachuting drop zone', mini: m => S.para(20, 12), what: 'Parachute in a circle. Parachutists may be falling anywhere within 1.5 or 2 NM of the drop zone up to FL150. Drop aircraft squawk 0033 from five minutes before the drop.', todo: 'Avoid the circle. If you must pass close, call the drop zone frequency or the local ATSU first.' },
    { id: 'disused', grp: 'Aerodromes', name: 'Disused aerodrome', mini: m => S.disused(20, 12), what: 'Circle with an X: disused or abandoned aerodrome, shown only as a landmark.', todo: 'Use it as a checkpoint. It may be a forced-landing option, but the surface may be blocked or built on. Do not land there normally.' },
    { id: 'customs', grp: 'Aerodromes', name: 'Customs aerodrome (pecked box round the name)', mini: m => `<rect x="3" y="6" width="34" height="12" fill="none" stroke="${C.blue}" stroke-width="1" stroke-dasharray="3 2"/><text x="20" y="14.5" ${FONT} font-size="6" text-anchor="middle" fill="${C.blue}" font-weight="bold">KESTON</text>`, what: 'A pecked line around the name and elevation marks an aerodrome with customs facilities.', todo: 'For international flights, check the current Border Force/GAR requirements and the aerodrome\'s customs hours.' },
    { id: 'vrp', grp: 'Navigation & radio', name: 'Visual Reference Point (VRP)', mini: m => S.vrp(8, 12) + `<rect x="13" y="7" width="26" height="10" fill="#fff" stroke="${C.blue}" stroke-width=".8"/><text x="26" y="14" ${FONT} font-size="5" text-anchor="middle" fill="${C.blue}">VRP</text>`, what: 'Circle with a cross plus a boxed name: a point notified in the UK AIP that ATC use for VFR routing round controlled airspace (for example "report at TOWER FARM").', todo: 'Learn the VRPs around any CTR you plan to enter or pass. When ATC ask you to report or hold at one, you need to recognise it from the air.' },
    { id: 'obst', grp: 'Navigation & radio', name: 'Obstacle (unlighted)', mini: m => S.obst(10, 14) + `<text x="16" y="12" ${FONT} font-size="6" font-style="italic" fill="${C.blue}">612</text><text x="16" y="19" ${FONT} font-size="5.5" fill="${C.blue}">(350)</text>`, what: 'Inverted V with a dot. The italic figure is the top of the obstacle in feet AMSL (612) and the figure in brackets is its height above the local ground (350). The chart shows land obstacles 100 m (328 ft) AGL and above, and a few lower ones as landmarks.', todo: 'Compare the italic AMSL figure with your altitude on QNH. Keep at least 500 ft clear (more in poor visibility). Masts and guy wires are very hard to see.' },
    { id: 'obst_lit', grp: 'Navigation & radio', name: 'Lighted / multiple obstacles & cables', mini: m => S.obstLit(8, 16) + S.obstLit(16, 16) + `<path d="M8,19 L16,19" stroke="${C.blue}" stroke-width=".8" stroke-dasharray="1.5 1"/><text x="20" y="14" ${FONT} font-size="6" font-style="italic" fill="${C.blue}">1256</text>`, what: 'Rays above the symbol mean the obstacle is lit. Several symbols together mark a group, and a line joining them marks cables between them. Groups shown lit or unlit may be a mixture.', todo: 'Treat the highest figure in the group as the hazard and remember cables are invisible.' },
    { id: 'obst_high', grp: 'Navigation & radio', name: 'Exceptionally high obstacle (1,000 ft AGL or more)', mini: m => S.obstHigh(9, 15) + `<text x="16" y="12" ${FONT} font-size="6" font-style="italic" fill="${C.blue}">1678</text><text x="16" y="19" ${FONT} font-size="5.5" fill="${C.blue}">(1031)</text>`, what: 'Solid symbol with light rays: an exceptionally high lighted obstacle 1,000 ft or more above ground level.', todo: 'These masts often have guy wires a long way out. Plan your minimum safe altitude well above them, or route round.' },
    { id: 'turbine', grp: 'Navigation & radio', name: 'Wind turbines / wind farm', mini: m => S.turbine(10, 14) + S.turbine(18, 14) + S.turbine(26, 14), what: 'Three-bladed symbol. A single turbine or a group (wind farm), with elevation AMSL in italics and height AGL in brackets.', todo: 'Keep well clear: there is turbulence downwind and the blades are hard to see edge-on. Large wind farms can also clutter radar.' },
    { id: 'navaid', grp: 'Navigation & radio', name: 'Radio nav aids (VOR, NDB)', mini: m => S.vor(12, 12) + S.ndb(29, 12), what: 'Hexagon = VOR (with a compass rose oriented on magnetic north). Dotted circles = NDB. A box round a VOR means a co-located DME. Name, ident and frequency are printed next to them.', todo: 'They are useful landmarks and for position fixes. They also often mark busy IFR routes, so keep a good lookout near them.' },
    { id: 'freq', grp: 'Navigation & radio', name: 'Frequency boxes (ATZ table, LARS, FIS)', mini: m => `<rect x="2" y="6" width="36" height="12" fill="#fff" stroke="${C.blue}" stroke-width=".8"/><text x="20" y="14" ${FONT} font-size="5.5" text-anchor="middle" fill="${C.blue}">LARS 125.555</text>`, what: 'MATZ boxes show the penetration frequency and "LARS" if the unit gives a radar service. ATZ frequencies are listed in a table on the chart. LARS units give a Basic or Traffic Service up to FL95 within about 30 NM (chart legend; UK AIP ENR 1.6).', todo: 'Write the frequencies for each leg on your plog before you go and check them against the UK AIP or the aerodrome plate. Frequencies change. The frequencies on this study chart are taken from the UK AIP (AIRAC 2026-10-29) but can change at any time.' },
    { id: 'asr', grp: 'Navigation & radio', name: 'Altimeter Setting Region boundary', mini: m => `<path d="M2,12H38" stroke="${C.blueT}" stroke-width="1.2"/><path d="M8,8V16M4,12H12M22,8V16M18,12H26M34,8V16M30,12H38" stroke="${C.blueT}" stroke-width="1.6"/>`, what: 'A row of crosses separates Altimeter Setting Regions. Each region has a forecast Regional Pressure Setting (RPS), the lowest forecast QNH for the hour.', todo: 'Below the transition altitude en route use the RPS (or a nearby aerodrome QNH). Under and inside a CTR/TMA use the QNH of an aerodrome under that airspace, as the chart note and UK AIP ENR 1.7 say.' },
    { id: 'bird', grp: 'Navigation & radio', name: 'Bird sanctuary', mini: m => S.bird(20, 12), what: 'Bird in a circle with name/effective altitude in thousands of feet. Pilots are asked to avoid these areas during the periods in UK AIP ENR 5.6.', todo: 'Route around or above the stated altitude. A bird strike on a microlight windscreen or propeller can be serious.' },
    { id: 'hirta', grp: 'Navigation & radio', name: 'High Intensity Radio Transmission Area (HIRTA)', mini: m => S.hirta(20, 12), what: 'Gridded circle: strong radio transmissions that can interfere with avionics and, close in, be harmful. Effective altitude in thousands of feet (UK AIP ENR 5.3).', todo: 'Avoid flying through it below the stated altitude.' }
  ];
  /* extra legend entries for features on the study chart */
  const add = (after, o) => { const i = L.findIndex(x => x.id === after); L.splice(i + 1, 0, o); };
  add('town', { id: 'woods', grp: 'Topography', name: 'Woods & forest', mini: m => `<path d="M4,18 Q6,4 18,6 T36,12 Q30,22 4,18Z" fill="#bfe0a4"/>`, what: 'Green areas are woods and forest. The current CAA 1:500,000 chart does not normally show woods, but large woods (on this sheet, the Chiltern beechwoods such as Wendover Woods and Ashridge) are good landmarks, so this study chart includes them.', todo: 'Use the shape of large woods with roads and rivers to confirm your position. Small woods all look alike from the air.' });
  add('roads', { id: 'power', grp: 'Topography', name: 'Power lines (pylons)', mini: m => `<path d="M2,12H38" stroke="#7a7a7a" stroke-width="1"/><path d="M6,12h.1M18,12h.1M30,12h.1" stroke="#555" stroke-width="3.5" stroke-linecap="round"/>`, what: 'Overhead high-voltage power lines on pylons (from OS data). Pylons are often 150 ft high or more and the wires are almost invisible. The CAA chart only shows some major lines.', todo: 'Treat every line as an obstacle, especially in valleys and when low and looking for a field. Look for the pylons, not the wires.' });
  add('power', { id: 'np', grp: 'Topography', name: 'National Park boundary', mini: m => `<path d="M2,12H38" stroke="#3f8f3a" stroke-width="2" stroke-dasharray="6 3"/>`, what: 'Green dashed line: the boundary of a National Park (for example the New Forest or South Downs). This is not airspace, but it is a noise-sensitive area where people and animals are easily disturbed.', todo: 'Fly considerately: keep higher than you need to over villages and livestock, and avoid repeated low passes.' });
  add('classE', { id: 'airway', grp: 'Airspace', name: 'Airways (lower airspace)', mini: m => `<path d="M2,12H38" stroke="#7d74c9" stroke-width="1.6"/><text x="20" y="9" ${FONT} font-size="6" text-anchor="middle" fill="#5c53b0" font-weight="bold">L620 FL85+</text>`, what: 'ATS routes for IFR traffic. In the UK most airways are Class A corridors whose base is shown, e.g. "FL85+". The CAA chart draws them as part of the Class A band; this study chart also draws the centre-line and route name.', todo: 'An NPPL holder can never enter Class A. Know the base of any airway above your route and stay well below it, allowing for altimeter error.' });
  add('civil_ltd', { id: 'strip', grp: 'Aerodromes', name: 'Small airstrip / farm strip', mini: m => `<circle cx="20" cy="12" r="3.2" fill="#fff" stroke="${C.blue}" stroke-width="1.2"/>`, what: 'Small circle: an unlicensed private strip. The CAA chart only shows strips whose owners ask for them; the ones here come from OurAirports (crowd-sourced), so some may be closed or wrongly placed.', todo: 'Never land without the owner\'s permission (PPR). Expect non-radio traffic and keep a good lookout near any strip.' });
  add('hirta', { id: 'gvs', grp: 'Navigation & radio', name: 'Gas venting station & laser sites', mini: m => `<circle cx="12" cy="12" r="6" fill="#fff" stroke="${C.red}" stroke-width="1.2"/><text x="12" y="14.5" ${FONT} font-size="6.5" font-weight="700" text-anchor="middle" fill="${C.red}">G</text><circle cx="29" cy="14" r="4.5" fill="#fff" stroke="${C.red}" stroke-width="1.2"/><circle cx="29" cy="14" r="1.5" fill="${C.red}"/>`, what: 'Gas venting stations (high-pressure gas can be released up to the stated height) and laser sites from UK AIP ENR 5.3 / 5.5.', todo: 'Avoid overflying them below the stated altitude.' });
  const BY = {}; L.forEach(i => BY[i.id] = i);
  /* legend id -> chart feature types (data-f) and notes for symbols not found in this area */
  const MAP = {
    edition: ['margin'], scale: ['margin'], graticule: ['graticule'], mef: ['mef'], isogonal: ['isogonal'], terrain: ['terrain'], spot: ['spot'],
    water: ['water', 'sea'], town: ['town', 'village'], woods: ['woods'], roads: ['motorway', 'roads', 'rail'], power: ['power'], np: ['np'],
    classA: ['classA'], classD_ctr: ['ctr'], classD_cta: ['classD'], classE: ['classE'], airway: ['airway'], tmz: ['tmz'], atz: ['atz'], matz: ['matz'],
    danger: ['danger'], danger_notam: ['danger'], restricted: ['restricted'],
    civil_ad: ['ad_civ'], civil_ltd: ['ad_civ'], training: ['ad_civ'], strip: ['strip'], military_ad: ['ad_mil'], heliport: ['heliport'], microlight: ['microlight'],
    glider: ['glider'], para: ['dz'], disused: ['disused'], vrp: ['vrp'], obst: ['obstacle'], obst_lit: ['obstacle'], turbine: ['turbine'], navaid: ['vor', 'ndb', 'dme'],
    freq: ['freq', 'fis'], hirta: ['hirta'], gvs: ['gvs', 'laser']
  };
  const NONE = {
    rmz: 'There is no RMZ or RMZ/TMZ in this area of the chart.',
    tmz: 'There is no TMZ in this area of the chart.',
    classE: 'There is no Class E airspace in this area of the chart.',
    restricted: 'There is no Restricted Area in this area of the chart.',
    np: 'There is no National Park in this area. The Chilterns are a National Landscape (AONB), which is not an aeronautical feature and is not drawn.',
    prohibited: 'There is no Prohibited Area in this area of the chart.',
    customs: 'Some aerodromes here (for example London Luton) have customs facilities, but this study chart does not draw the pecked customs boxes.',
    obst_high: 'No obstacle of 1,000 ft AGL or more stands in this area.',
    asr: 'No Altimeter Setting Region boundary is drawn on this study chart.',
    bird: 'No bird sanctuary is shown in this area on this study chart.'
  };
  L.forEach(i => { i.f = MAP[i.id] || []; i.none = NONE[i.id] || ''; });

  /* ---------- lazy data load ---------- */
  let loading = null;
  function loadData() {
    if (window.VFRCHART) return Promise.resolve(window.VFRCHART);
    if (loading) return loading;
    loading = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'js/vfrchart-data.js'; s.async = true;
      s.onload = () => window.VFRCHART ? res(window.VFRCHART) : rej(new Error('no data'));
      s.onerror = () => { loading = null; rej(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* ---------- widget ---------- */
  const HELP = '<strong>Tap any symbol, label or area on the chart, or any legend item.</strong> Pinch or use + / − to zoom (more names and detail appear as you zoom in), drag to move.';
  function init(host) {
    if (host.dataset.ready) return; host.dataset.ready = '1';
    const grps = []; L.forEach(i => { if (!grps.includes(i.grp)) grps.push(i.grp); });
    const chip = i => `<button type="button" class="vc-chip${i.none ? ' vc-none' : ''}" data-k="${i.id}"><svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true">${i.mini()}</svg><span>${i.name}</span></button>`;
    host.innerHTML = `
      <div class="vc-wrap">
        <div class="vc-tools">
          <button type="button" class="vc-btn" data-act="in" aria-label="Zoom in">+</button>
          <button type="button" class="vc-btn" data-act="out" aria-label="Zoom out">−</button>
          <button type="button" class="vc-btn" data-act="reset" aria-label="Reset view">⟲</button>
          <button type="button" class="vc-btn vc-btn-wide" data-act="legend" aria-expanded="false">Legend</button>
          <span class="vc-zoom" aria-live="polite">1×</span>
        </div>
        <div class="vc-stage"><div class="vc-load">Loading the study chart…</div></div>
        <div class="vc-info" role="status" aria-live="polite">${HELP}</div>
        <div class="vc-legend" hidden>${grps.map(g => `<div class="vc-lg"><div class="vc-lgh">${g}</div><div class="vc-chips">${L.filter(i => i.grp === g).map(chip).join('')}</div></div>`).join('')}</div>
        <h3 class="vc-allh">All symbols explained</h3>
        <p class="vc-small vc-allintro">Symbols follow the CAA 1:500,000 legend (2025 legend sheet). Differences on this study chart: it also shows woods, power lines, airway centre-lines and extra contours; terrain is one 500 ft tint with hill shading; MEFs are our own calculation; small strips come from OurAirports. Customs boxes, approach feathers, light beacons, ASR/FIS boundaries and AIAAs are not drawn. Items marked &ldquo;Not in this area&rdquo; do not occur on this part of the chart. Study rendering only &mdash; not for navigation, data may be out of date.</p>
        <div class="vc-all" tabindex="0">${L.map(i => `<div class="vc-item" data-k="${i.id}"><button type="button" class="vc-item-btn" data-k="${i.id}"><svg viewBox="0 0 40 24" width="48" height="29" aria-hidden="true">${i.mini()}</svg><span>${i.name}</span><em>${i.none ? 'Not in this area' : 'Show on map'}</em></button><p>${i.what}</p><p class="vc-do"><b>What you do:</b> ${i.todo}</p>${i.none ? `<p class="vc-small">${i.none}</p>` : ''}</div>`).join('')}</div>
      </div>`;
    const stage = host.querySelector('.vc-stage');
    const info = host.querySelector('.vc-info'), legend = host.querySelector('.vc-legend'), all = host.querySelector('.vc-all');
    const zl = host.querySelector('.vc-zoom');
    let D = null, svg = null, styleEl = null, boxes = null, WV = null;
    let vb = null, vbc = null, anim = null, kApplied = 0, tierCls = '', commitT = null;
    const TIERS = [1, 2, 4, 8, 16];
    const SW = () => stage.clientWidth || 340, SH = () => stage.clientHeight || 400;
    const kt = t => W / (D.kref * t);
    const kOf = v => v.w / SW();
    function fitW() { return W * 1.0; }                 // 1x = chart frame fills the width
    function minW() { return kt(16) / 1.6 * SW(); }    // deepest zoom
    function maxW() { return Math.max(WV[2], WV[3] * SW() / SH()); }
    function clamp(v) {
      v.w = Math.min(maxW(), Math.max(minW(), v.w)); v.h = v.w * SH() / SW();
      const x0 = WV[0], y0 = WV[1], x1 = WV[0] + WV[2], y1 = WV[1] + WV[3];
      v.x = v.w >= WV[2] ? x0 + (WV[2] - v.w) / 2 : Math.min(x1 - v.w, Math.max(x0, v.x));
      v.y = v.h >= WV[3] ? y0 + (WV[3] - v.h) / 2 : Math.min(y1 - v.h, Math.max(y0, v.y));
      return v;
    }
    function restyle(force) {
      const k = kOf(vbc);
      if (force || Math.abs(k / kApplied - 1) > 0.02) {
        kApplied = k;
        styleEl.textContent = D.css.replace('scale(K(1))', `scale(${k.toFixed(4)})`).replace(/K\(([\d.]+)\)/g, (m, v) => (v * k).toFixed(3) + 'px');
      }
      const c = TIERS.filter(t => t > 1 && k <= kt(t) * 1.001).map(t => 'z' + t).join(' ');
      if (c !== tierCls) { tierCls = c; svg.setAttribute('class', 'vc-svg vcx ' + c + (svg.classList.contains('vc-dim') ? ' vc-dim' : '')); }
    }
    // commit: real viewBox; between commits we move the already-drawn picture with a CSS transform (smooth on phones)
    function commit() {
      clearTimeout(commitT); commitT = null; vbc = Object.assign({}, vb);
      svg.style.transform = '';
      svg.setAttribute('viewBox', `${vb.x.toFixed(2)} ${vb.y.toFixed(2)} ${vb.w.toFixed(2)} ${vb.h.toFixed(2)}`);
      restyle(); label();
    }
    function label() { const z = fitW() / vb.w; zl.textContent = (z < 10 ? z.toFixed(1) : Math.round(z)).toString().replace(/\.0$/, '') + '×'; host.dataset.zoom = z.toFixed(2); }
    function show(soon) {
      const s = vbc.w / vb.w, sw = SW();
      svg.style.transform = `translate(${((vbc.x - vb.x) / vb.w * sw).toFixed(2)}px,${((vbc.y - vb.y) / vb.w * sw).toFixed(2)}px) scale(${s.toFixed(5)})`;
      label();
      clearTimeout(commitT); commitT = setTimeout(commit, soon ? 0 : 140);
    }
    function animateTo(t) {
      t = clamp(t); if (anim) cancelAnimationFrame(anim); const s = Object.assign({}, vb), t0 = performance.now(), DU = 320;
      const step = n => { const q = Math.min(1, (n - t0) / DU), e = 1 - Math.pow(1 - q, 3); vb = { x: s.x + (t.x - s.x) * e, y: s.y + (t.y - s.y) * e, w: s.w + (t.w - s.w) * e, h: s.h + (t.h - s.h) * e }; if (q < 1) { show(); anim = requestAnimationFrame(step); } else { anim = null; commit(); } };
      anim = requestAnimationFrame(step);
    }
    function toWorld(cx, cy) { const r = stage.getBoundingClientRect(); return { x: vb.x + (cx - r.left) / r.width * vb.w, y: vb.y + (cy - r.top) / r.width * vb.w }; }
    function zoomAt(f, wx, wy) { const nw = Math.min(maxW(), Math.max(minW(), vb.w / f)); const q = nw / vb.w; vb = clamp({ x: wx - (wx - vb.x) * q, y: wy - (wy - vb.y) * q, w: nw }); show(); }
    function home() { const w = fitW(); return clamp({ x: 0, y: WV[1], w }); }

    host.querySelector('.vc-tools').addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
      if (a === 'legend') { legend.hidden = !legend.hidden; b.setAttribute('aria-expanded', String(!legend.hidden)); b.classList.toggle('on', !legend.hidden); return; }
      if (!svg) return;
      if (a === 'in' || a === 'out') { const f = a === 'in' ? 2 : 0.5; const nw = vb.w / f, cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2; animateTo({ x: cx - nw / 2, y: cy - nw * SH() / SW() / 2, w: nw }); }
      else if (a === 'reset') { clearSel(); animateTo(home()); }
    });

    function clearSel() {
      if (!svg) return;
      svg.classList.remove('vc-dim'); svg.querySelectorAll('.vc-hl').forEach(n => n.classList.remove('vc-hl')); boxes.innerHTML = '';
      host.querySelectorAll('.vc-on').forEach(n => n.classList.remove('vc-on')); host.dataset.sel = ''; info.innerHTML = HELP;
    }
    const box = (b, cls) => { const p = 10 * kOf(vbc), w = Math.max(b[2], 0), h = Math.max(b[3], 0); boxes.insertAdjacentHTML('beforeend', `<rect class="vc-box${cls || ''}" x="${(b[0] - p).toFixed(1)}" y="${(b[1] - p).toFixed(1)}" width="${(w + 2 * p).toFixed(1)}" height="${(h + 2 * p).toFixed(1)}" rx="${(p / 2).toFixed(1)}"/>`); };
    const legendOf = t => L.find(i => i.f.includes(t));
    function tapItem(type, idx) {
      const it = D.items[type] && D.items[type][idx]; if (!it) { clearSel(); return; }
      clearSel(); const lg = legendOf(type);
      host.dataset.sel = type + ':' + idx;
      if (it.b[2] < WV[2] * 0.9) box(it.b);
      info.innerHTML = `<div class="vc-info-h">${lg ? `<svg viewBox="0 0 40 24" width="48" height="29" aria-hidden="true">${lg.mini()}</svg>` : ''}<span>${it.h}</span></div>` + (lg ? `<p class="vc-small"><b>${lg.name}:</b> ${lg.what}</p><p class="vc-do"><b>What you do:</b> ${lg.todo}</p>` : '');
      if (lg) host.querySelectorAll(`[data-k="${lg.id}"]`).forEach(n => n.classList.add('vc-on'));
    }
    function select(k, o) {
      o = o || {}; const it = BY[k]; if (!it) return;
      clearSel(); host.dataset.sel = k;
      host.querySelectorAll(`[data-k="${k}"]`).forEach(n => n.classList.add('vc-on'));
      let msg = '';
      if (svg && it.f.length) {
        const els = it.f.flatMap(t => [...svg.querySelectorAll(`g[data-f="${t}"]`)]);
        if (els.length) { svg.classList.add('vc-dim'); els.forEach(n => n.classList.add('vc-hl')); }
        // pick the example nearest the middle of the current view and zoom to it
        const cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2; let best = null, n = 0;
        it.f.forEach(t => (D.items[t] || []).forEach((x, i) => { n++; const d = Math.hypot(x.b[0] + x.b[2] / 2 - cx, x.b[1] + x.b[3] / 2 - cy) + (x.b[2] > WV[2] * 0.9 ? 1e6 : 0); if (!best || d < best.d) best = { d, x, t, i }; }));
        if (best && o.from !== 'map') {
          const b = best.x.b, small = b[2] < WV[2] * 0.9;
          if (small) {
            // zoom in far enough that this item's detail tier is visible
            const g = svg.querySelector(`g[data-f="${best.t}"] > [data-i="${best.i}"]`); const pg = g && g.parentNode;
            const tm = pg && /(?:^|\s)t(\d+)/.exec(pg.getAttribute('class') || ''), tier = tm ? +tm[1] : 1;
            let w = Math.max(b[2], b[3] * SW() / SH()) * 1.6; w = Math.max(w, minW() * 1.2); w = Math.min(w, kt(tier) * SW() * 0.95, maxW());
            animateTo({ x: b[0] + b[2] / 2 - w / 2, y: b[1] + b[3] / 2 - w * SH() / SW() / 2, w });
            box(b);
          } else animateTo(home());
          msg = n > 1 ? `<p class="vc-small">${n} on this chart — the nearest one is boxed. Everything else is dimmed; tap the chart to clear.</p>` : '';
        }
      }
      info.innerHTML = `<div class="vc-info-h"><svg viewBox="0 0 40 24" width="48" height="29" aria-hidden="true">${it.mini()}</svg><strong>${it.name}</strong></div><p>${it.what}</p><p class="vc-do"><b>What you do:</b> ${it.todo}</p>${it.none ? `<p class="vc-small"><b>Not in this area:</b> ${it.none}</p>` : ''}${msg}`;
      const li = all.querySelector(`.vc-item[data-k="${k}"]`); if (li) all.scrollTop = li.offsetTop - 4;
      const ch = legend.querySelector(`.vc-chip[data-k="${k}"]`); if (ch && !legend.hidden) legend.scrollTop = ch.offsetTop - 30;
      if (o.from === 'list' || o.from === 'legend') stage.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    legend.addEventListener('click', e => { const b = e.target.closest('.vc-chip'); if (b) select(b.dataset.k, { from: 'legend' }); });
    all.addEventListener('click', e => { const b = e.target.closest('.vc-item-btn'); if (b) select(b.dataset.k, { from: 'list' }); });
    host.vcSelect = select; host.vcClear = clearSel;

    function start(data) {
      D = data; W = D.W; H = D.H; WV = D.vb;
      stage.innerHTML = `<svg class="vc-svg vcx" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive study rendering of a 1:500,000 style VFR chart of the Chilterns and Thames Valley (not for navigation)" preserveAspectRatio="xMinYMin meet"><style></style>${D.svg}<g class="vc-boxes"></g></svg>`;
      svg = stage.querySelector('svg'); styleEl = svg.querySelector('style'); boxes = svg.querySelector('.vc-boxes');
      vb = home(); vbc = Object.assign({}, vb); commit(); restyle(true);
      // pointer pan / pinch
      const ptrs = new Map(); let st = null, moved = false, downT = null;
      const snap = () => { const a = [...ptrs.values()]; const r = stage.getBoundingClientRect(); if (a.length >= 2) return { vb: Object.assign({}, vb), d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), m: { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 }, r }; return a.length ? { vb: Object.assign({}, vb), p: a[0], r } : null; };
      stage.addEventListener('pointerdown', e => { stage.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (ptrs.size === 1) { moved = false; downT = e.target; } else moved = true; if (anim) { cancelAnimationFrame(anim); anim = null; } st = snap(); });
      stage.addEventListener('pointermove', e => {
        if (!ptrs.has(e.pointerId) || !st) return; ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const a = [...ptrs.values()], r = st.r;
        if (a.length >= 2 && st.d) {
          const d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), m = { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 };
          const nw = Math.min(maxW(), Math.max(minW(), st.vb.w * st.d / d));
          const wx = st.vb.x + (st.m.x - r.left) / r.width * st.vb.w, wy = st.vb.y + (st.m.y - r.top) / r.width * st.vb.w;
          vb = clamp({ x: wx - (m.x - r.left) / r.width * nw, y: wy - (m.y - r.top) / r.width * nw, w: nw }); show();
        } else if (a.length === 1 && st.p) {
          const dx = a[0].x - st.p.x, dy = a[0].y - st.p.y; if (Math.hypot(dx, dy) > 6) moved = true;
          if (moved) { vb = clamp({ x: st.vb.x - dx / r.width * st.vb.w, y: st.vb.y - dy / r.width * st.vb.w, w: st.vb.w }); show(); }
        }
      });
      const end = e => {
        if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
        if (ptrs.size === 0) {
          if (!moved && e.type === 'pointerup') {
            const h = hitAt(e.clientX, e.clientY);
            if (h) tapItem(h.f, h.i); else clearSel();
          }
          if (moved) show(true);
        }
        st = snap();
      };
      // Tap hit-test: prefer a symbol or label within ~16px of the finger over the area underneath.
      const hitList = (x, y) => document.elementsFromPoint(x, y).filter(n => svg.contains(n)).map(n => n.closest('[data-i]')).filter(n => n && !n.closest('.vc-boxes') && n.closest('[data-f]'));
      const asHit = n => ({ f: n.closest('[data-f]').dataset.f, i: +n.dataset.i });
      function hitAt(x, y) {
        const c = hitList(x, y); if (c.length && c[0].tagName === 'g') return asHit(c[0]);
        for (const R of [7, 14]) for (let a = 0; a < 8; a++) { const q = hitList(x + R * Math.cos(a * Math.PI / 4), y + R * Math.sin(a * Math.PI / 4)).find(n => n.tagName === 'g'); if (q) return asHit(q); }
        return c.length ? asHit(c[0]) : null;
      }
      stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
      stage.addEventListener('wheel', e => { e.preventDefault(); const w = toWorld(e.clientX, e.clientY); zoomAt(e.deltaY < 0 ? 1.2 : 1 / 1.2, w.x, w.y); }, { passive: false });
      stage.addEventListener('dblclick', e => { const w = toWorld(e.clientX, e.clientY); vb = clamp(Object.assign({}, vb)); animateTo((() => { const nw = vb.w / 2; return { x: w.x - (w.x - vb.x) / 2, y: w.y - (w.y - vb.y) / 2, w: nw }; })()); });
      let rw = SW(); new ResizeObserver(() => { if (Math.abs(SW() - rw) > 1) { rw = SW(); vb = clamp(Object.assign({}, vb)); commit(); restyle(true); } }).observe(stage);
      host.vcView = (cx, cy, z) => { const w = fitW() / z; vb = clamp({ x: cx - w / 2, y: cy - w * SH() / SW() / 2, w }); commit(); return { k: kOf(vb), tiers: tierCls }; };
      host.dataset.loaded = '1';
    }
    // load when the widget is near the screen (the data file is large)
    const go = () => loadData().then(start).catch(() => { stage.innerHTML = '<div class="vc-load">The chart could not be loaded. Check your connection and reopen this topic.</div>'; host.dataset.ready = ''; });
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { io.disconnect(); go(); } }, { rootMargin: '600px' }); io.observe(stage); } else go();
  }

  function scan(root) { (root || document).querySelectorAll('[data-widget="vfrchart"]').forEach(init); }
  const mo = new MutationObserver(() => scan());
  function boot() { scan(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.LessonWidgets = { scan, legendItems: L };
})();
