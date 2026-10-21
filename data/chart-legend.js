/* UK 1:500,000 VFR chart legend trainer — ORIGINAL schematic study aid.
   Concepts styled after a UK Half-Million legend idea only.
   Do NOT embed or reproduce copyrighted CAA/NATS chart artwork.
   Confirm every detail with current chart edition, AIP, NOTAMs and instructor. */
const CHART_LEGEND = {
  meta: {
    title: '1:500,000 VFR Chart',
    shortTitle: '1:500k Chart',
    scale: '1:500,000',
    scaleNote: '1 cm on the chart ≈ 5 km on the ground (≈ 2.7 NM). Rough: 1 NM ≈ 3.7 mm.',
    disclaimer:
      'Study aid only — original schematic legend trainer. Not a CAA/NATS chart and not affiliated with them. Confirm symbols, airspace and procedures with your current Half-Million chart, AIP, NOTAMs and instructor.'
  },


  tourSteps: [
    'scale-basics', 'lat-long', 'contours', 'elevation', 'variation',
    'class-a', 'class-d', 'class-g', 'atz', 'ctr', 'matz',
    'danger', 'restricted', 'obstacle',
    'aero-civil', 'aero-military', 'vrp',
    'town-road', 'water',
    'radio-freqs', 'vor', 'ndb', 'fis', 'safetycom'
  ],
  categories: [
    { id: 'all', label: 'All' },
    { id: 'scale', label: 'Scale' },
    { id: 'airspace', label: 'Airspace' },
    { id: 'aerodromes', label: 'Aerodromes' },
    { id: 'hazards', label: 'Hazards' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'radio', label: 'Radio' },
    { id: 'tour', label: 'Legend tour' },
    { id: 'practice', label: 'Practice' }
  ],

  items: [
    /* ——— SCALE & BASICS ——— */
    {
      id: 'scale-basics',
      category: 'scale',
      title: 'Scale 1:500,000 (Half-Million)',
      tags: 'scale half mil centimetre kilometre distance ruler',
      appearance: 'Chart title / margin states 1:500,000. Scale bar usually in NM and km.',
      what: 'One unit on the map equals 500,000 of the same units on the ground. At this scale, 1 cm ≈ 5 km (≈ 2.7 NM). Ideal overview of Controlled Airspace for UK VFR route planning.',
      flight: 'Use the printed scale bar or a CRP-1 / plotter. Rough check: thumb-width tips from your instructor. Measure track from a meridian. Always use a current chart edition — airspace moves.',
      svg: 'scale'
    },
    {
      id: 'lat-long',
      category: 'scale',
      title: 'Latitude & longitude ticks',
      tags: 'latitude longitude graticule minutes degrees position',
      appearance: 'Tick marks and numbers along chart edges; fine graticule lines across the sheet.',
      what: 'Geographic reference grid. Latitude (N/S) and longitude (E/W) let you plot a position or read one off the chart. Minutes are subdivided on the border.',
      flight: 'Useful for GPS cross-check and lost procedures. Practice reading a lat/long to the nearest minute. Confirm with instructor how they want positions reported (e.g. radial/DME vs lat/long).'
    },
    {
      id: 'elevation',
      category: 'scale',
      title: 'Spot heights & elevation',
      tags: 'elevation spot height mef terrain contour amsl',
      appearance: 'Spot heights as figures (often with a dot). Maximum Elevation Figures (MEF) in quadrangles on many editions. Contours may appear lightly on some VFR products — check your sheet.',
      what: 'Ground and obstacle elevation above mean sea level. MEF is a planning cue for the highest known elevation (+ allowance) in a chart quadrant — not automatically your safety altitude.',
      flight: 'Plan a safety altitude above highest terrain/obstacles near your route with a margin your instructor teaches. Chart MEF ≠ “you are safe at MEF”. CAS bases may cap how high you can climb.'
    },
    {
      id: 'variation',
      category: 'scale',
      title: 'Magnetic variation & isogonals',
      tags: 'variation isogonal magnetic true tvmdc compass',
      appearance: 'Dashed isogonal lines labelled with variation (e.g. 1°W) and year; margin note on annual change.',
      what: 'Angle between True North and Magnetic North. UK variation is typically westerly and changes slowly each year. Isogonals join equal variation.',
      flight: 'TVMDC: True → Variation → Magnetic → Deviation → Compass. “East is least, West is best.” For NPPL nav, apply chart variation (and annual change) then aircraft deviation from the compass card.'
    },

    /* ——— AIRSPACE CLASSES ——— */
    {
      id: 'class-a',
      category: 'airspace',
      title: 'Class A',
      tags: 'class a tma ifr no vfr controlled',
      appearance: 'Solid blue tint / firm blue boundary typical of high-level controlled airspace on UK VFR charts (schematic: solid blue fill swatch).',
      what: 'Highest category of controlled airspace. VFR flight is not permitted. Example context: parts of London TMA and other busy IFR structures.',
      flight: 'Stay out unless you hold IFR privileges and a clearance — an NPPL microlight day-VFR ticket does not give you Class A. Plan routes under / around published bases. Read vertical limits carefully.'
    },
    {
      id: 'class-c',
      category: 'airspace',
      title: 'Class C',
      tags: 'class c controlled clearance vfr',
      appearance: 'Controlled-airspace blue/purple schematic fill with labelled vertical limits (confirm exact chart colours on your edition).',
      what: 'Controlled airspace. IFR and VFR permitted subject to ATC clearance and published rules. Less common at low level for microlight routes than Class D/G, but know it exists.',
      flight: 'Do not enter without an ATC clearance. If planning near Class C, brief frequencies, listening watch, and a Class G alternate route. Confirm AIP / chart.'
    },
    {
      id: 'class-d',
      category: 'airspace',
      title: 'Class D (CTR / CTA)',
      tags: 'class d ctr cta clearance atc controlled',
      appearance: 'Blue-tinted controlled airspace with solid or distinctive boundary; vertical limits printed (e.g. SFC–2500′ / 1500–FL65).',
      what: 'Common UK controlled airspace around regional airports. CTR usually from surface; CTA from a base upwards. VFR allowed with ATC clearance.',
      flight: 'Call early, request transit / zone entry, read back clearance. No clearance = stay outside the boundary (including vertically). Microlights often transit Class D with good RT and planning — practice with instructor.'
    },
    {
      id: 'class-e',
      category: 'airspace',
      title: 'Class E',
      tags: 'class e controlled vfr',
      appearance: 'Controlled-airspace tint with Class E label and vertical limits (confirm chart legend colours).',
      what: 'Controlled airspace where IFR traffic is separated from other IFR; VFR rules differ from Class D. Relatively limited low-level UK footprint compared with D/G — still respect published limits.',
      flight: 'Know whether your route clips Class E. Follow AIP entry/communication requirements. When unsure, treat as “ask ATC / stay clear” until your instructor briefs the specific piece of airspace.'
    },
    {
      id: 'class-g',
      category: 'airspace',
      title: 'Class G (uncontrolled)',
      tags: 'class g open fir uncontrolled lookout',
      appearance: 'Background chart colours with no controlled-airspace fill — the “open FIR” most microlight flying happens in.',
      what: 'Uncontrolled airspace. No ATC clearance required to fly there, but SERA / Rules of the Air, VMC minima, and good airmanship still apply. Flight Information Service may be available.',
      flight: 'Typical NPPL microlight home. Keep a sharp lookout, listen out, use appropriate FIS / Safetycom / A/G as taught. Class G is not “empty” — military low flying, gliders, and other GA share it.'
    },
    {
      id: 'atz',
      category: 'airspace',
      title: 'ATZ (Aerodrome Traffic Zone)',
      tags: 'atz aerodrome traffic zone 2 nm circuit',
      appearance: 'Dashed circle (often magenta/blue) centred on the aerodrome; typically ~2 NM radius / 2,000 ft AAL for many UK ATZs — confirm chart.',
      what: 'Protected zone around many UK aerodromes so circuit traffic can operate safely. Rules of the Air govern entry when the ATZ is active.',
      flight: 'Do not cross an active ATZ without conforming to the rules (radio contact / permission as applicable). Join as instructed / published. Overhead joins and circuit direction: brief the plate and instructor.'
    },
    {
      id: 'ctr',
      category: 'airspace',
      title: 'CTR (Control Zone)',
      tags: 'ctr control zone surface class d',
      appearance: 'Solid boundary around a major aerodrome, usually from the surface up to a stated altitude / FL, tinted as controlled airspace.',
      what: 'Controlled airspace protecting arriving and departing IFR/VFR traffic at a controlled aerodrome. Often Class D in the UK regional picture.',
      flight: 'Clearance required before entry. Plan a route that either requests transit or stays outside laterally and below/above as published. Have a divert plan if refused.'
    },
    {
      id: 'cta',
      category: 'airspace',
      title: 'CTA (Control Area)',
      tags: 'cta control area base upper limit',
      appearance: 'Controlled-airspace fill adjoining a CTR, with a base above the surface (e.g. 1500′–FL65) printed on the chart.',
      what: 'Controlled airspace surrounding / above busy aerodromes but not always from the ground. Bases matter hugely for VFR microlights.',
      flight: 'You may be able to fly underneath a CTA base in Class G — only if the chart and AIP say so and weather/terrain allow. Never assume; read the base. Climb into the CTA only with clearance.'
    },
    {
      id: 'tma',
      category: 'airspace',
      title: 'TMA (Terminal Control Area)',
      tags: 'tma terminal london class a',
      appearance: 'Large controlled-airspace blocks with stepped bases; often Class A in busy UK TMAs.',
      what: 'Complex terminal airspace protecting IFR streams into major airports. Bases can be low enough to trap VFR traffic underneath.',
      flight: 'Study the stepped bases on your Half-Million before any cross-country near a TMA. Stay under the base or route around. Class A TMA = no VFR entry for NPPL microlight ops.'
    },
    {
      id: 'matz',
      category: 'airspace',
      title: 'MATZ (Military Aerodrome Traffic Zone)',
      tags: 'matz military stub zone penetration',
      appearance: 'Usually a circle with one or more “stubs” aligned with instrument approach paths; dashed / distinctive military style.',
      what: 'Military aerodrome traffic zone. Not the same legal animal as a civil ATZ; penetration procedures and radio calls are taught specifically for MATZ.',
      flight: 'Call the MATZ / Approach frequency early; request MATZ penetration. You may be asked to remain clear of the ATZ inside. Confirm current callsign/freq on chart & AIP. Practice RT with instructor.'
    },
    {
      id: 'aiaa',
      category: 'airspace',
      title: 'AIAA — Area of Intense Aerial Activity',
      tags: 'aiaa intense aerial activity military lookout',
      appearance: 'Outlined area (often dashed) labelled AIAA; may note activity type.',
      what: 'Charted heads-up that lots of aircraft (often military or intense GA/gliding) operate there. Not a prohibition by itself.',
      flight: 'Transit with extra lookout, consider higher / different routing, listen to relevant FIS. Not a “keep out” zone — a “keep awake” zone.'
    },

    /* ——— HAZARDS / SPECIAL ——— */
    {
      id: 'danger',
      category: 'hazards',
      title: 'Danger Area (D…)',
      tags: 'danger area da military weapons range notam',
      appearance: 'Hatched / cross-hatched boundary with identification (e.g. D026) and vertical limits; activation notes nearby or in AIP.',
      what: 'Airspace where activities dangerous to flight may exist (weapons, live firing, etc.). May be permanent or notified by times / NOTAM.',
      flight: 'Check AIP ENR / NOTAMs / chart activation notes before flight. If active — stay clear unless you have specific permission/procedure. Never assume “quiet today” without checking.'
    },
    {
      id: 'restricted',
      category: 'hazards',
      title: 'Restricted Area (R…)',
      tags: 'restricted area r flight restriction',
      appearance: 'Boundary with R… identifier and limits; often distinctive hatch.',
      what: 'Flight is restricted subject to specified conditions (not always a total ban). Details in AIP.',
      flight: 'Read the restriction. Many are effectively “do not enter” for GA/microlights without approval. Confirm AIP before planning any transit.'
    },
    {
      id: 'prohibited',
      category: 'hazards',
      title: 'Prohibited Area (P…)',
      tags: 'prohibited area p no entry',
      appearance: 'Boundary with P… identifier — treat as a hard no-go on the chart picture.',
      what: 'Flight of aircraft is prohibited. Rare but absolute when charted/active.',
      flight: 'Stay clear — no microlight “shortcuts”. Plan well around them and brief passengers/students why the dog-leg exists.'
    },
    {
      id: 'hirta',
      category: 'hazards',
      title: 'HIRTA — High Intensity Radio Transmission Area',
      tags: 'hirta radio transmission interference radar',
      appearance: 'Outlined area labelled HIRTA; may show radius / notes.',
      what: 'Area where intense radio/radar transmissions may interfere with aircraft systems or be a hazard.',
      flight: 'Avoid overflying if possible; follow chart/AIP notes. Be alert for unusual instrument / radio behaviour nearby. Confirm current advice with instructor.'
    },
    {
      id: 'gliding',
      category: 'hazards',
      title: 'Gliding site',
      tags: 'gliding winch cable soaring lookout',
      appearance: 'Glider symbol (stylised sailplane) at the site; winch / cable activity may be annotated.',
      what: 'Active gliding. Winch cables can rise thousands of feet; soaring traffic may be far from the field and hard to see.',
      flight: 'Give gliding sites a wide berth unless joining with agreement. Never fly between winch and cable. Extra lookout up-sun. Check NOTAMs for competitions.'
    },
    {
      id: 'parachute',
      category: 'hazards',
      title: 'Parachute dropping site',
      tags: 'parachute drop zone dz freefall',
      appearance: 'Parachute symbol at the drop zone; activity may be H24 or notified.',
      what: 'Parachutists may be in freefall or under canopy — poor radar targets and easy to miss visually.',
      flight: 'Remain clear of the drop zone and overhead when active. Listen out; check NOTAMs. Crossing a DZ “because GPS said straight” is a classic trap.'
    },
    {
      id: 'obstacle',
      category: 'hazards',
      title: 'Obstacles & masts',
      tags: 'obstacle mast wind turbine pylon elevation',
      appearance: 'Obstacle symbols with elevation (AMSL) and/or height AGL figures; groups of wind turbines often charted.',
      what: 'Man-made obstacles significant to flight. Figures usually show top elevation AMSL (and sometimes AGL in brackets) — confirm legend.',
      flight: 'Build obstacles into safety altitude. Night / poor viz: even more critical. Wind farms create turbulence — give clearance laterally and vertically as taught.'
    },

    /* ——— AERODROMES ——— */
    {
      id: 'aero-civil',
      category: 'aerodromes',
      title: 'Civil aerodrome',
      tags: 'aerodrome airfield civil runway runway-symbol',
      appearance: 'Aerodrome symbol (often runway stub / circle style) with name; may show lighting, longest runway length, elevation.',
      what: 'Licensed or unlicensed civil landing site charted for VFR navigation. Details in AIP / flight guide.',
      flight: 'PPR is common at GA/microlight fields. Brief runway, circuit direction, radio (A/G, AFIS, ATC), noise abatement. Elevation for QNH/QFE briefing.'
    },
    {
      id: 'aero-military',
      category: 'aerodromes',
      title: 'Military aerodrome',
      tags: 'military airfield raf matz',
      appearance: 'Distinct military aerodrome symbol; often associated with MATZ stubs.',
      what: 'Military airfield. Traffic can be fast jets, trainers, helicopters — high energy, unusual patterns.',
      flight: 'Do not assume you can join like a civil club field. Use MATZ / Approach procedures. Many are strictly controlled or closed to civil traffic without prior arrangement.'
    },
    {
      id: 'aero-disused',
      category: 'aerodromes',
      title: 'Disused / abandoned aerodrome',
      tags: 'disused abandoned closed airfield',
      appearance: 'Open / hollow aerodrome symbol or annotated “disused”; runways may still be visible on satellite but chart warns.',
      what: 'Former aerodrome — surface may be unsafe, obstructed, or privately controlled. Not a planned diversion unless surveyed/approved.',
      flight: 'Emergency field only with caution. Do not treat as an active airfield for practice forced landings without instructor approval and local knowledge.'
    },
    {
      id: 'helipad',
      category: 'aerodromes',
      title: 'Helipad / heliport',
      tags: 'helipad helicopter h symbol',
      appearance: '“H” or dedicated heliport symbol; hospital sites sometimes annotated.',
      what: 'Helicopter landing site. May have intense rotary traffic and noise abatement.',
      flight: 'Fixed-wing microlights: stay clear of the overhead unless specifically cleared/briefed. Expect helicopters on unusual approaches.'
    },

    /* ——— SYMBOLS ——— */
    {
      id: 'vrp',
      category: 'symbols',
      title: 'VRP — Visual Reference Point',
      tags: 'vrp triangle visual reference reporting',
      appearance: 'Solid or outlined triangle with a name (e.g. “BRIDGE”, “LAKE”).',
      what: 'Charted landmark used for VFR position reports and ATC/FIS correlation. Chosen to be easy to see from the air.',
      flight: 'Learn VRPs near your training area and along cross-country routes. Use the published name in RT (“abeam North Bridge”). Great for zone transits.'
    },
    {
      id: 'reporting',
      category: 'symbols',
      title: 'Reporting point',
      tags: 'reporting point compulsory on-request',
      appearance: 'Named point symbol (sometimes triangle / diamond style) — may be compulsory or on-request; check legend & AIP.',
      what: 'A point where you may be expected to report position to ATC/FIS.',
      flight: 'If compulsory, report unless ATC says otherwise. Have the name ready before you get there — heads-down fumbling near CAS is bad.'
    },
    {
      id: 'isogonal-sym',
      category: 'symbols',
      title: 'Isogonal line',
      tags: 'isogonal variation dashed line',
      appearance: 'Long dashed line across the chart labelled with magnetic variation.',
      what: 'Joins points of equal magnetic variation. See also Magnetic variation.',
      flight: 'Pick the isogonal nearest your route (or interpolate). Apply annual change from the chart margin note.'
    },
    {
      id: 'danger-notes',
      category: 'symbols',
      title: 'Danger area activation notes',
      tags: 'activation hours notam enr times',
      appearance: 'Small text near Danger Areas or in chart margin: times, heights, contact freq, or “activated by NOTAM”.',
      what: 'Quick reference for when a Danger Area is expected to be hot. NOTAMs still win on the day.',
      flight: 'Read notes in planning, then re-check NOTAMs pre-flight. If in doubt, route around.'
    },
    {
      id: 'town-road',
      category: 'symbols',
      title: 'Towns, roads, railways, rivers',
      tags: 'topography town motorway railway river landmark',
      appearance: 'Grey/black built-up areas, road casings, rail tick marks, blue water — ground features for visual navigation.',
      what: 'Topographic detail for map-reading. Half-Million shows major features; fine street detail is limited.',
      flight: 'Use big features (motorway junctions, coast, large lakes) as turning points. Avoid relying on a single small village that looks like its neighbour.'
    },

    /* ——— RADIO / FIS ——— */

    {
      id: 'contours',
      category: 'scale',
      title: 'Contours & relief tint',
      tags: 'contour relief terrain hill tint elevation topography',
      appearance: 'Study schematic: soft brown/green relief tint and sparse contour-style lines on higher ground. Real chart editions vary — check your sheet margin.',
      what: 'Shows rising terrain at a glance so you can picture hills, valleys and ridges under your track. Contours join equal elevation; denser packing means steeper ground.',
      flight: 'Microlights are low and slow — terrain surprises hurt. Use relief to plan MSA/safety altitude with your instructor’s margin. Never treat tint alone as a hard “ceiling”.'
    },
    {
      id: 'water',
      category: 'symbols',
      title: 'Water — rivers, lakes, coast',
      tags: 'water river lake coast reservoir hydrography',
      appearance: 'Blue lines (rivers) and blue fills (lakes/reservoirs/coast). Coastline is a strong visual landmark on UK sheets.',
      what: 'Hydrography used as visual navigation features and forced-landing planning context (avoid landing on water unless trained/equipped).',
      flight: 'Excellent line features for VFR nav (follow a river, coast, reservoir shape). Confirm identity — many UK reservoirs look similar from afar.'
    },
    {
      id: 'vor',
      category: 'radio',
      title: 'VOR (VHF Omnidirectional Range)',
      tags: 'vor navaid radial compass rose radio navigation',
      appearance: 'Compass-rose style navaid symbol with identifier and frequency (schematic hexagon/rose).',
      what: 'Ground VHF navaid providing radials. Still depicted on VFR charts even though many microlight students navigate primarily visually / GPS.',
      flight: 'Know what the symbol means so you do not confuse it with an aerodrome. NPPL microlight nav still centres on visual features, CRP-1 and careful GPS use as taught — confirm with instructor.'
    },
    {
      id: 'ndb',
      category: 'radio',
      title: 'NDB (Non-Directional Beacon)',
      tags: 'ndb adf beacon navaid radio',
      appearance: 'Small circular/dot navaid symbol with Morse ident and kHz frequency on many legends (schematic).',
      what: 'LF/MF beacon historically used with ADF. Fewer in day-to-day microlight use, but still appears on charts.',
      flight: 'Recognise and do not mistake for a field. For NPPL study, focus more on airspace, ATZ/MATZ, VRPs and visual features — confirm current navaid status via NOTAM/AIP.'
    },
    {
      id: 'radio-freqs',
      category: 'radio',
      title: 'Radio frequencies on chart',
      tags: 'frequency mhz approach tower ag afis',
      appearance: 'Frequencies printed near aerodromes / ATS units (Approach, Tower, A/G, ATIS, etc.).',
      what: 'Quick reference RT frequencies. Charts can lag — AIP / NOTAM / flight guide are authoritative.',
      flight: 'Preload boxes before start. Confirm freqs on the day. Microlight: A/G and AFIS common at club fields; Approach for MATZ/CAS.'
    },
    {
      id: 'fis',
      category: 'radio',
      title: 'FIS / LARS notes',
      tags: 'fis lars flight information radar service',
      appearance: 'Margin or area notes for Flight Information Service / Lower Airspace Radar Service coverage cues.',
      what: 'FIS provides information and alerting — not control. LARS (where available) can provide a radar service outside CAS subject to workload.',
      flight: 'Call the appropriate FIS/LARS unit for a Basic Service (or as offered). Still your lookout and navigation. Services are not guaranteed.'
    },
    {
      id: 'safetycom',
      category: 'radio',
      title: 'Safetycom 135.480 (study note)',
      tags: 'safetycom 135.480 unattended airfield',
      appearance: 'Not always printed as a “symbol”; taught alongside chart radio use for unattended fields.',
      what: 'UK common frequency for pilots to broadcast intentions at many airfields without a dedicated A/G — confirm current CAP 413 / AIP practice.',
      flight: 'Use as trained: blind calls for joining, downwind, final, etc. Listen first. Does not replace A/G where one exists. Confirm current frequency/procedure.'
    }
  ],

  quiz: [
    {
      id: 'q1',
      prompt: 'On a 1:500,000 chart, roughly how many kilometres does 1 cm represent?',
      options: ['0.5 km', '5 km', '50 km', '500 km'],
      answer: 1,
      explain: 'Scale 1:500,000 → 1 cm on the chart = 500,000 cm = 5 km on the ground (≈ 2.7 NM).'
    },
    {
      id: 'q2',
      prompt: 'Class A airspace on a UK VFR picture — what does that mean for an NPPL microlight?',
      options: [
        'Enter VFR with a Basic Service only',
        'VFR not permitted — stay out / under the base',
        'Free to enter below 3,000 ft',
        'Only need a Safetycom call'
      ],
      answer: 1,
      explain: 'Class A: no VFR. NPPL microlight ops stay outside (often under stepped TMA bases).'
    },
    {
      id: 'q3',
      prompt: 'What does a dashed circle around many UK aerodromes usually depict?',
      options: ['Danger Area', 'TMA', 'ATZ', 'HIRTA'],
      answer: 2,
      explain: 'ATZ — Aerodrome Traffic Zone. Confirm radius/height on your chart edition.'
    },
    {
      id: 'q4',
      prompt: 'You want to cross a Class D CTR in a C42. What do you need?',
      options: [
        'Nothing — Class D is uncontrolled',
        'An ATC clearance before entry',
        'Only a squawk of 7000',
        'PPR from the fuel company'
      ],
      answer: 1,
      explain: 'Class D requires an ATC clearance to enter. No clearance → remain clear.'
    },
    {
      id: 'q5',
      prompt: 'A charted triangle with a name beside it is most likely a…',
      options: ['Gliding site', 'VRP', 'Prohibited Area', 'Isogonal'],
      answer: 1,
      explain: 'VRP — Visual Reference Point for VFR position reports / navigation.'
    },
    {
      id: 'q6',
      prompt: 'MATZ on the Half-Million — best microlight action?',
      options: [
        'Ignore — military zones do not apply to civil aircraft',
        'Call for MATZ penetration as trained; watch the civil ATZ inside',
        'Always overfly the stub at 500 ft',
        'Only applicable at night'
      ],
      answer: 1,
      explain: 'Use published MATZ procedures / RT. Remain clear of the aerodrome ATZ unless cleared/approved as taught.'
    },
    {
      id: 'q7',
      prompt: 'Hatched area labelled D026 is…',
      options: ['Disused aerodrome', 'Danger Area', 'Class G corridor', 'Compulsory reporting point'],
      answer: 1,
      explain: 'Danger Area identifier D…. Check activation (AIP/NOTAM/chart notes) and stay clear when active.'
    },
    {
      id: 'q8',
      prompt: 'Isogonals on the chart help you with…',
      options: [
        'Fuel specific gravity',
        'Magnetic variation for TVMDC',
        'Cloud base estimation',
        'ATZ radius'
      ],
      answer: 1,
      explain: 'Isogonals join equal magnetic variation — used when converting True to Magnetic.'
    },
    {
      id: 'q9',
      prompt: 'An AIAA means…',
      options: [
        'Flight is always prohibited',
        'Area of Intense Aerial Activity — extra lookout',
        'Automatic IFR airways area',
        'Only gliders may enter'
      ],
      answer: 1,
      explain: 'AIAA is a traffic-density heads-up, not an automatic no-go.'
    },
    {
      id: 'q10',
      prompt: 'CTA base printed as 1,500 ft — can a microlight fly at 1,200 ft beneath it?',
      options: [
        'Yes, if that volume is Class G and weather/terrain allow — confirm chart/AIP',
        'Never — any CTA forbids flight underneath',
        'Only with a Class A rating',
        'Only on Safetycom'
      ],
      answer: 0,
      explain: 'Many CTAs have a base above the surface; Class G may exist underneath. Always read the chart limits and confirm — never assume.'
    },
    {
      id: 'q11',
      prompt: 'Parachute symbol near your track — best practice?',
      options: [
        'Overfly mid-field at circuit height for a better view',
        'Remain clear of the drop zone when active; check NOTAMs',
        'Only avoid if clouds are below 1,000 ft',
        'Treat as a VRP and report overhead'
      ],
      answer: 1,
      explain: 'Stay clear of active drop zones — canopies and freefallers are hard to see.'
    },
    {
      id: 'q12',
      prompt: 'Rough Half-Million rule of thumb: 1 NM on the ground is about…',
      options: ['0.37 mm on the chart', '3.7 mm on the chart', '37 mm on the chart', '3.7 cm = 1 km'],
      answer: 1,
      explain: 'Teaching rule of thumb: ≈ 3.7 mm per NM on 1:500,000. Prefer the printed scale bar when measuring.'
    }
  ]
};
