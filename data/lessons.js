/* UK NPPL Microlight study content — ORIGINAL study-aid text, not CAA official */
const LESSONS_DATA = {
  "subjects": [
    {
      "id": "law",
      "name": "Aviation Law",
      "icon": "⚖",
      "short": "UK airspace, rules, licence"
    },
    {
      "id": "tech",
      "name": "Aircraft Technical",
      "icon": "✈",
      "short": "General knowledge · C42 context"
    },
    {
      "id": "met",
      "name": "Meteorology",
      "icon": "🌤",
      "short": "UK weather for microlights"
    },
    {
      "id": "hpl",
      "name": "Human Performance",
      "icon": "🧠",
      "short": "Limitations & decision-making"
    },
    {
      "id": "nav",
      "name": "Navigation",
      "icon": "🧭",
      "short": "Charts, CRP-1, dead reckoning"
    },
    {
      "id": "radio",
      "name": "Radio Telephony / FRTOL",
      "icon": "📡",
      "short": "CAP 413 phraseology"
    }
  ],
  "lessons": [
    {
      "id": "law-01",
      "subject": "law",
      "title": "NPPL Microlight — what it is",
      "chapter": "Licence basics",
      "diagram": null,
      "body": "\n<h2>NPPL Microlight — UK national licence</h2>\n<p>The National Private Pilot’s Licence (NPPL) is a <strong>UK-specific</strong> licence. It is not automatically recognised abroad. With a Microlight Class Rating you may fly microlights under the privileges of that rating.</p>\n<p>To get an NPPL with Microlight Class Rating you train with a UK CAA-certificated flight instructor entitled to instruct on microlights, pass the ground exams, and pass a General Skills Test (GST) plus type oral with an authorised examiner.</p>\n<div class=\"callout\"><strong>Hours (Without Operational Limitations)</strong> — typically: minimum 25 hours total under instruction, 10 solo, 5 navigation (of which 3 solo nav). Confirm current BMAA / CAP figures with your instructor.</div>\n<div class=\"callout\"><strong>With Operational Limitations</strong> — lower hour minima, but initially: no passengers, cloud base not less than 1,000 ft AGL, visibility not less than 10 km, and not further than 8 NM from take-off.</div>\n<ul>\n<li>Minimum ages (typical teaching): solo from 16, licence from 17 — confirm current ANO.</li>\n<li>Ground exams in five theory subjects must be passed within 24 months before licence application.</li>\n<li>GST and oral typically within 9 months before application.</li>\n</ul>\n<div class=\"confirm\">Confirm all currency, hour and age figures with your instructor and the current official syllabus / CAP 3181.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "law-02",
      "subject": "law",
      "title": "UK airspace classes & VFR",
      "chapter": "Airspace",
      "diagram": "circuit",
      "body": "\n<h2>UK airspace for microlight VFR</h2>\n<p>In the UK you fly under <strong>SERA</strong> and UK differences published in the AIP. Microlights like the C42 typically operate <strong>day VFR</strong>.</p>\n<ul>\n<li><strong>Class A</strong> — no VFR. Example context: London TMA above many Home Counties fields is Class A. Stay out unless you have an IFR clearance (microlight NPPL does not give you that).</li>\n<li><strong>Class D</strong> CTR/CTA — need an ATC clearance before entry.</li>\n<li><strong>Class G</strong> — uncontrolled; you still obey SERA VMC minima and Rules of the Air.</li>\n</ul>\n<h3>Day VMC minima (remember the tight box)</h3>\n<p>Low-level Class G teaching points often used for light aircraft/microlights: at or below 3,000 ft AMSL, IAS ≤140 kt — typically 1,500 m flight visibility, clear of cloud and with the surface in sight. Above 3,000 ft the “5 km / 1,500 m horizontal / 1,000 ft vertical from cloud” picture applies.</p>\n<div class=\"warn\">Ops-limits NPPL weather (10 km / 1,000 ft AGL cloud) is <em>tighter</em> than SERA. Stay in the tighter box until limitations are lifted.</div>\n<div class=\"confirm\">Exact SERA.5001 figures and UK differences: confirm with current AIP ENR 1.2 / instructor.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "law-03",
      "subject": "law",
      "title": "ATZ, MATZ, low flying & right of way",
      "chapter": "Rules of the Air",
      "diagram": null,
      "body": "\n<h2>ATZ, MATZ and see-and-avoid</h2>\n<p>An <strong>Aerodrome Traffic Zone (ATZ)</strong> protects the circuit. Rough teaching size: for a runway ≤1,850 m, a circle of 2 NM radius from the midpoint up to 2,000 ft above aerodrome level. Rule 11: establish two-way communications before entering (or follow the published procedure).</p>\n<p>A <strong>MATZ</strong> (Military Aerodrome Traffic Zone) is not civil controlled airspace, but good airmanship is to call for penetration. The civil <strong>ATZ inside</strong> still needs proper two-way — do not bust it.</p>\n<h3>Low flying (UK teaching points)</h3>\n<ul>\n<li>Congested areas: typically not below 1,000 ft above the highest fixed object within 600 m.</li>\n<li>Elsewhere: not within 500 ft of any person, vessel, vehicle or structure (with training/exceptions as taught).</li>\n</ul>\n<h3>Right of way (basics)</h3>\n<ul>\n<li>Converging: give way to the other on your right.</li>\n<li>Head-on: both alter right.</li>\n<li>Overtaking: pass on the right; the one being overtaken has right of way.</li>\n<li>Landing aircraft / gliders generally have priority as taught — gliders win in many conflict pictures.</li>\n</ul>\n<div class=\"confirm\">Confirm Rule numbers and exact wording in current Rules of the Air / SERA with your instructor.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "law-04",
      "subject": "law",
      "title": "Documents, alcohol, squawks & incidents",
      "chapter": "Ops & compliance",
      "diagram": null,
      "body": "\n<h2>PIC responsibilities</h2>\n<p>You decide go/no-go. Legal VFR can still be a poor day for a light microlight (gusty crosswind, CB nearby).</p>\n<ul>\n<li>Be able to produce licence + medical/PMD, Certificate of Registration, and Permit to Fly / Certificate of Validity when required.</li>\n<li>Passenger currency teaching point: 3 take-offs and landings in the preceding 90 days as PIC before carrying passengers.</li>\n<li>Alcohol limits (UK): 20 mg/100 ml blood, 9 µg/100 ml breath, 27 mg/100 ml urine. Practice: many schools teach “8 hours bottle to throttle” and longer after a heavy night.</li>\n</ul>\n<h3>SSR codes (know cold)</h3>\n<ul>\n<li>7000 — VFR conspicuity</li>\n<li>7700 — emergency · 7600 — radio fail · 7500 — unlawful interference</li>\n<li>0030 — FIR lost (when appropriate)</li>\n<li>121.500 MHz — guard / D&D</li>\n</ul>\n<p>Accidents → AAIB (+ police as required). MOR within timescales taught. AIRPROX → UKAB.</p>\n<div class=\"confirm\">Local listening squawks (e.g. field-specific codes) change — check current AIP / Skyway / plate.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "tech-01",
      "subject": "tech",
      "title": "Four forces & aerofoil",
      "chapter": "Principles of flight",
      "diagram": "airflow",
      "body": "\n<h2>Lift, weight, thrust, drag</h2>\n<p>In steady level flight the four forces balance. An aerofoil produces lift mainly because air over the upper surface moves faster → lower pressure (Bernoulli) plus the wing deflects air downward (Newton).</p>\n<p>Angle of attack (AoA) is the angle between the chord line and the relative airflow. Increase AoA → more lift (and drag) until the stall angle, when the smooth flow breaks down and lift drops sharply.</p>\n<div class=\"callout\">A microlight like the C42 is light and low-inertia — gusts and turbulence hit harder than in a heavier training aeroplane. Fly ahead of the aircraft.</div>\n<ul>\n<li>Stall speed rises with weight, load factor (bank), and centre of gravity changes.</li>\n<li>In a level 60° bank turn, load factor is 2g — stall speed rises by about √2 ≈ 1.41.</li>\n</ul>\n",
      "speakExtra": ""
    },
    {
      "id": "tech-02",
      "subject": "tech",
      "title": "Engine, fuel & carb ice (Rotax context)",
      "chapter": "Powerplant",
      "diagram": null,
      "body": "\n<h2>Microlight powerplant — Rotax 912 context</h2>\n<p>Many UK microlights (including C42 variants) use a Rotax 912 series: four-stroke, dual carburettor, reduction gearbox. Exact RPM, oil and coolant limits are in <strong>your</strong> POH / TADS — memorise the placard, not a mate’s numbers.</p>\n<ul>\n<li>Fuel: often MOGAS (min grade on placard), UL91, or AVGAS 100LL — prolonged AVGAS may not be ideal for some Rotax fits; follow the POH.</li>\n<li>Carburettor icing: the venturi can be tens of degrees colder than OAT. Risk exists even on mild UK days at low power.</li>\n<li>Some C42 variants have carb heat; others may not — check the actual knob/airframe you fly.</li>\n</ul>\n<div class=\"warn\">Carbon monoxide: colourless and odourless. Exhaust + cabin heat is a classic risk. Active detector preferred; heat OFF, fresh air, land if alerted.</div>\n<div class=\"confirm\">Type-specific performance numbers: use your weighing report, placard and current TADS/POH — do not invent figures.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "tech-03",
      "subject": "tech",
      "title": "Airspeeds, flaps & weight & balance",
      "chapter": "Limitations",
      "diagram": null,
      "body": "\n<h2>V-speeds and loading (teaching picture)</h2>\n<p>Know what the symbols mean; then learn <em>your</em> numbers from the POH.</p>\n<ul>\n<li><strong>Vs0 / Vs1</strong> — stall flaps landing config / clean</li>\n<li><strong>Vne</strong> — never exceed</li>\n<li><strong>Va</strong> — manoeuvring / max turbulent-air speed (roughly)</li>\n<li><strong>Vfe</strong> — max flap extended</li>\n</ul>\n<p>Weight &amp; balance: empty mass from last weighing + crew + bags + fuel mass must be ≤ MTOW, with CG inside limits. Fuel has mass (petrol ≈ 0.72 kg/L is a common planning figure).</p>\n<div class=\"callout\">UK microlights fly on a <strong>Permit to Fly</strong> with Certificate of Validity, not a full Certificate of Airworthiness. Daily inspection is on you as PIC.</div>\n<div class=\"confirm\">C42 MTOW/CG/V-speeds vary by variant (e.g. Bravo differences training if MTOW &gt; 475 kg). Confirm with instructor / TADS.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "tech-04",
      "subject": "tech",
      "title": "Walk-round & systems checklist mindset",
      "chapter": "Airworthiness",
      "diagram": null,
      "body": "\n<h2>Daily inspection that matters</h2>\n<ul>\n<li>Fuel: quantity seen with your eyes, cap secure, drains sampled, correct type.</li>\n<li>Oil and coolant levels; cowl secure; propeller free of nicks.</li>\n<li>Flying surfaces, hinges, control horns, free movement, trim.</li>\n<li>Undercarriage, tyres, brakes as fitted.</li>\n<li>Doors, pins, harnesses; ballistic parachute handle if fitted — know the placard.</li>\n<li>Controls full and free; instruments; radio/transponder; mag check per checklist.</li>\n</ul>\n<p>Engine failure after take-off: lower the nose to best glide (POH), pick a field early. Microlight engines are not “certificated transport category” — always keep an option.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "met-01",
      "subject": "met",
      "title": "ISA, pressure & altimetry (UK)",
      "chapter": "Atmosphere",
      "diagram": "altimeter",
      "body": "\n<h2>International Standard Atmosphere & UK altimeter settings</h2>\n<ul>\n<li>ISA sea level: 15 °C, 1013.25 hPa, density 1.225 kg/m³.</li>\n<li>ISA temperature lapse ≈ 2 °C per 1,000 ft.</li>\n<li><strong>QNH</strong> — altimeter reads altitude above mean sea level when on the ground at that aerodrome.</li>\n<li><strong>QFE</strong> — altimeter reads height above the aerodrome elevation (often used in UK circuits).</li>\n<li>1 hPa ≈ 27–30 ft. If QNH falls and you do not reset, you are lower than the altimeter suggests.</li>\n</ul>\n<div class=\"warn\">Cold air: true altitude is lower than indicated (~4 ft per 1,000 ft per 1 °C below ISA is a common teaching rule of thumb).</div>\n<div class=\"confirm\">Transition altitude and local procedures: UK AIP ENR 1.7 and aerodrome plate. Under London TMA use aerodrome QNH as taught — confirm with instructor.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "met-02",
      "subject": "met",
      "title": "Wind, clouds & UK air masses",
      "chapter": "Weather systems",
      "diagram": "fronts",
      "body": "\n<h2>Wind and cloud for microlight decisions</h2>\n<p>Surface wind is usually backed and slower than the wind at 2,000 ft (friction). In the Northern Hemisphere, Buys Ballot: back to the wind, low pressure on the left.</p>\n<p>Know your personal / school surface and crosswind limits. Gusts count. METAR “G” typically when gust ≥10 kt above the mean.</p>\n<ul>\n<li><strong>ST</strong> stratus — sheet, poor vis, can sit on hills.</li>\n<li><strong>CU/SC</strong> — often workable if base is high enough with gaps.</li>\n<li><strong>TCU/CB</strong> — no for a microlight: turbulence, lightning, hail, gust fronts.</li>\n<li><strong>NS</strong> — warm-front rain sheet; base and vis drop.</li>\n</ul>\n<p>UK air masses (simple): maritime tropical (warm, moist, drizzle); maritime polar (showers, good vis between); continental polar (cold, clear, radiation fog risk).</p>\n",
      "speakExtra": ""
    },
    {
      "id": "met-03",
      "subject": "met",
      "title": "Fronts, fog, icing & carb ice",
      "chapter": "Hazards",
      "diagram": null,
      "body": "\n<h2>Fronts and go / no-go hazards</h2>\n<ul>\n<li><strong>Warm front</strong>: cloud sequence CI→CS→AS→NS; rain; poor vis; wind backs then veers.</li>\n<li><strong>Cold front</strong>: line of CU/CB; sharp showers; clearer cooler air behind; wind veers.</li>\n<li><strong>Occlusion</strong>: treat as prolonged weather — do not squeeze a microlight through.</li>\n</ul>\n<p>Fog: FG visibility &lt;1,000 m; BR 1,000–5,000 m. Radiation fog: clear night, inland, light wind. Hill fog on ridges (e.g. Chilterns teaching context).</p>\n<p>Icing: many microlights have no known-icing approval. Cloud near 0 °C → turn around. Carb ice can form with cool moist air even when OAT looks “fine”.</p>\n<div class=\"warn\">Any thunderstorm nearby: stay on the ground. Gust front can arrive before the rain.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "met-04",
      "subject": "met",
      "title": "METAR, TAF & UK briefing",
      "chapter": "Forecasts",
      "diagram": null,
      "body": "\n<h2>Decode enough to decide</h2>\n<ul>\n<li>Wind: 24012KT = from 240° true at 12 kt. 25021G31KT = 21 gusting 31 — often a microlight no-go.</li>\n<li>Visibility 9999 = 10 km or more. Cloud: FEW/SCT/BKN/OVC with height in hundreds of feet AAL (SCT036 = 3,600 ft).</li>\n<li>CAVOK: ≥10 km, no cloud below 5,000 ft or MSA, no CB/TCU, no significant weather.</li>\n<li>TEMPO = temporary periods; BECMG = lasting change; PROB30 = plan as if it might happen.</li>\n<li>Q1005 = QNH 1005 hPa. Temp/dewpoint close at dusk → watch fog.</li>\n</ul>\n<p>Use Met Office aviation products / F214–F215 style charts as taught, plus nearby METARs/TAFs. Forecasts go stale — re-check in the last hour before flight.</p>\n<div class=\"confirm\">Briefing portals change over time — use the current UK authorised source your school recommends.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "hpl-01",
      "subject": "hpl",
      "title": "IMSAFE & fitness to fly",
      "chapter": "Fitness",
      "diagram": null,
      "body": "\n<h2>IMSAFE — before you drive to the airfield</h2>\n<ul>\n<li><strong>I</strong> Illness — cold, sinus, blocked ears. Cannot clear ears = do not fly.</li>\n<li><strong>M</strong> Medication — drowsy antihistamines/codeine mixes are a no. New meds: days on the ground. Confirm with AME/instructor lists.</li>\n<li><strong>S</strong> Stress — steals spare capacity.</li>\n<li><strong>A</strong> Alcohol — legal limits are low; practice bottle-to-throttle discipline.</li>\n<li><strong>F</strong> Fatigue — aim for proper sleep; tired pilots bust CAS.</li>\n<li><strong>E</strong> Eating — low blood sugar looks like poor flying; hydrate.</li>\n</ul>\n<div class=\"callout\">A Pilot Medical Declaration (PMD) is not a daily warrant. If you feel unfit, you are unfit.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "hpl-02",
      "subject": "hpl",
      "title": "Vision, balance & illusions",
      "chapter": "Senses",
      "diagram": null,
      "body": "\n<h2>Eyes, ears and the leans</h2>\n<p>Scan in chunks (about ≤10° hops), covering well left and right of track. Empty-field myopia over haze — refocus on a wingtip. High-wing: lift a wing before turning to clear the blind spot.</p>\n<ul>\n<li>Sunglasses: grey/brown; avoid polarised (LCD/canopy issues) and beware photochromic lenses that stay light under canopy.</li>\n<li><strong>The leans</strong>: slow unnoticed bank, then roll-out feels wrong — trust the visual horizon.</li>\n<li><strong>Somatogravic illusion</strong>: acceleration feels like a climb — do not push the nose down after take-off based on “seat of the pants” alone.</li>\n</ul>\n<p>Motion sickness: look at the horizon, cool air, avoid heads-down map study in bumps; cut the sortie short if needed.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "hpl-03",
      "subject": "hpl",
      "title": "CO, hypoxia & hyperventilation",
      "chapter": "Physiology",
      "diagram": null,
      "body": "\n<h2>Gases — CO is the practical microlight killer</h2>\n<p>Carbon monoxide binds to haemoglobin. Rotax exhaust + cabin heat is the classic scenario. Symptoms: headache, flu-like, poor judgement. Action: heat OFF, max fresh air, land, do not take off with an alert that will not clear.</p>\n<p>Hypoxia teaching altitudes are often above where a typical C42 operates day-to-day, but the exam still asks oxygen rules. CO creates an anaemia-like hypoxia even at circuit height.</p>\n<p>Hyperventilation at height: treat as hypoxia and descend. On the ground it is often stress — slow the breathing and fly the aircraft.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "hpl-04",
      "subject": "hpl",
      "title": "Hazardous attitudes & personal minima",
      "chapter": "Decisions",
      "diagram": null,
      "body": "\n<h2>Aeronautical decision-making</h2>\n<p>Hazardous attitudes (as commonly taught from CAP material): anti-authority, impulsiveness, invulnerability, macho, resignation (plus peer pressure in many briefings). Name it, then pick the boring safe option.</p>\n<p>Startle (engine cough, conflicting traffic, CO alarm): skilled performance can wobble for several seconds. <strong>Aviate → Navigate → Communicate.</strong></p>\n<div class=\"callout\">Personal minima should beat legal minima. 1,500 m visibility may be legal in low Class G and still be a terrible microlight afternoon.</div>\n<p>If you would not take a friend, do not take yourself. Drive home.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "nav-01",
      "subject": "nav",
      "title": "Track, heading, variation & 1-in-60",
      "chapter": "Dead reckoning",
      "diagram": "windTriangle",
      "body": "\n<h2>The navigation words</h2>\n<ul>\n<li><strong>Track</strong> — path over the ground (what you drew).</li>\n<li><strong>Heading</strong> — where the nose points (track ± drift).</li>\n<li><strong>Drift</strong> — wind from the left → heading a little left (into wind) to stay on track.</li>\n<li><strong>TVMDC</strong> — True → Variation → Magnetic → Deviation → Compass. Easterly variation: magnetic is smaller than true (“East is least”).</li>\n</ul>\n<p><strong>1-in-60 rule:</strong> 1° off at 60 NM ≈ 1 NM off track. Track error ° ≈ (distance off ÷ distance gone) × 60.</p>\n<p>Mental maths: 90 kt ≈ 1.5 NM/min. Time (min) = distance × 60 / groundspeed.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "nav-02",
      "subject": "nav",
      "title": "UK charts, NOTAMs & altimeter choice",
      "chapter": "Charts",
      "diagram": null,
      "body": "\n<h2>Half-mil and quarter-mil</h2>\n<ul>\n<li>1:500,000 (half mil): 1 NM ≈ 3.7 mm. Best for CAS picture.</li>\n<li>1:250,000: more ground detail; check what airspace it omits — confirm legend.</li>\n</ul>\n<p>Measure tracks from the nearest meridian. Use a current chart edition. NOTAMs every flight from NATS AIS — RA(T), gliding, U/S A/G, royal flights. Graphical filters miss things.</p>\n<p>Under busy TMA airspace, aerodrome QNH is usually preferred over Regional Pressure Setting as taught for that area — confirm ENR 1.7 / instructor.</p>\n<div class=\"confirm\">Chart symbols and airspace fills: NATS VFR legend + current AIP win.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "nav-03",
      "subject": "nav",
      "title": "Fuel planning & safety altitude",
      "chapter": "Planning",
      "diagram": null,
      "body": "\n<h2>Fuel and MSA mindset</h2>\n<p>Plan taxi + trip + diversion + a safe reserve. For UK microlight Permit ops, follow ANO fuel requirements as taught; many schools use ~30 minutes cruise fuel as a practical day-VFR margin (align with your instructor / NCO AMC teaching).</p>\n<p>See fuel in the tank — do not trust a sender alone. Safety altitude: highest terrain/obstacles near the route + a margin. Chart MEF is not automatically your safety altitude. CAS bases may be the limiting ceiling.</p>\n<div class=\"callout\">GPS is a tool. Chart + stopwatch + lookout is the skill. When the tablet overheats, you still have to get home.</div>\n",
      "speakExtra": ""
    },
    {
      "id": "nav-04",
      "subject": "nav",
      "title": "Lost procedures (UK)",
      "chapter": "When it goes wrong",
      "diagram": "circuit",
      "body": "\n<h2>Unsure of position</h2>\n<ol>\n<li>Aviate — stay VMC.</li>\n<li>Confess early.</li>\n<li>Climb if it helps radio/view — but watch controlled airspace above you.</li>\n<li>Communicate: working ATSU first, else 121.500.</li>\n<li>Squawk 0030 if appropriate when on conspicuity and unsure.</li>\n</ol>\n<p>If following a line feature, UK airmanship teaching is often to keep the feature on your left (fly to the right of it). Confirm current advice with instructor.</p>\n<p>If weather on the nose is worse than the plan, the next turning point is a field — not “maybe it improves”.</p>\n",
      "speakExtra": ""
    },
    {
      "id": "radio-01",
      "subject": "radio",
      "title": "FRTOL basics, phonetics & readbacks",
      "chapter": "Foundations",
      "diagram": "radioWave",
      "body": "\n<h2>UK Flight Radiotelephony (FRTOL)</h2>\n<p>An aircraft radio station licence covers the set; <strong>you</strong> need an FRTOL (or be a student under instruction) to operate the COM. CAP 413 is the UK phraseology bible; Skyway Code helps with practical UK GA.</p>\n<ul>\n<li>First callsign: always <strong>full</strong> phonetic (e.g. Golf Charlie Mike Victor Delta). Only shorten after ATC/ATS shortens you.</li>\n<li>Solo student: prefix <strong>STUDENT</strong> on first contact with an ATSU.</li>\n<li>Station suffix tells the job: <strong>RADIO</strong> (A/G), <strong>INFORMATION</strong> (AFIS), <strong>TOWER/GROUND/APPROACH</strong> (ATC — can clear), <strong>TRAFFIC</strong> (unmanned).</li>\n</ul>\n<h3>Words that matter</h3>\n<ul>\n<li><strong>AFFIRM / NEGATIVE</strong> — yes / no.</li>\n<li><strong>ROGER</strong> — received. Does <em>not</em> mean you will comply.</li>\n<li><strong>WILCO</strong> — understood and will comply.</li>\n<li><strong>CLEARED</strong> — only ATC says this.</li>\n</ul>\n<div class=\"callout\">Mandatory full readbacks include: taxi; level; heading; runway in use; enter/land/take-off/backtrack/cross/hold short; SSR code; altimeter; frequency change; type of ATS service — see current CAP 413 list.</div>\n",
      "speakExtra": "Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu. Numbers: zero wun too tree fower fife six seven ait niner. Decimal is dayseemal."
    },
    {
      "id": "radio-02",
      "subject": "radio",
      "title": "ATC vs AFIS vs A/G — and QNH/QFE",
      "chapter": "ATS types",
      "diagram": null,
      "body": "\n<h2>Who can clear you?</h2>\n<ul>\n<li><strong>ATC (Tower/Ground/Radar)</strong> — CLEARED, HOLD SHORT, LINE UP AND WAIT. Comply or say UNABLE.</li>\n<li><strong>AFIS (Information)</strong> — take-off/land <em>at your discretion</em>. Traffic and runway info.</li>\n<li><strong>AGCS (Radio)</strong> — information only: runway, QNH/QFE, known traffic. <strong>Not</strong> a clearance. You are PIC for every move.</li>\n</ul>\n<p><strong>QNH</strong> for en-route altitude; <strong>QFE</strong> often for UK circuit height. Read back the setting. Listen first — always.</p>\n<h3>Example exchange (AGCS departure) — say aloud</h3>\n<p class=\"rt-example\"><em>Pilot:</em> Wycombe Radio, Golf Charlie Mike Victor Delta, radio check one two six decimal five five five, request taxi information.<br>\n<em>Radio:</em> Golf Charlie Mike Victor Delta, Wycombe Radio, readability five, runway two four, Q N H one zero one eight, no reported traffic.<br>\n<em>Pilot:</em> Runway two four, Q N H one zero one eight, taxiing, Golf Charlie Mike Victor Delta.</p>\n<div class=\"confirm\">Frequencies and procedures are examples for study — always use current AIP / plate for the aerodrome you fly.</div>\n",
      "speakExtra": "Wycombe Radio, Golf Charlie Mike Victor Delta, radio check one two six decimal five five five, request taxi information. Runway two four, Q N H one zero one eight, taxiing, Golf Charlie Mike Victor Delta. Golf Victor Delta, ready for departure."
    },
    {
      "id": "radio-03",
      "subject": "radio",
      "title": "Circuit, join & en-route calls",
      "chapter": "Standard calls",
      "diagram": "circuit",
      "body": "\n<h2>Arrival and circuit (UK)</h2>\n<p>Initial call: station + full callsign + request (e.g. request join). When told “pass your message”: type · from/to · position · altitude/height + setting · intentions.</p>\n<p>Standard overhead join is common at many UK fields unless AIP says otherwise. Some fields (teaching example: Booker) publish a non-standard join — learn your home plate.</p>\n<ul>\n<li>Report downwind and final as required.</li>\n<li>Go-around: fly first, then transmit “going around”.</li>\n<li>Unmanned: address “(Place) Traffic”, broadcast position/intentions, end with the place name. SAFETYCOM 135.480 only within published limits.</li>\n</ul>\n<h3>Freecall for a Basic Service</h3>\n<p class=\"rt-example\"><em>Pilot:</em> Farnborough Radar, Golf Charlie Mike Victor Delta, request Basic Service.<br>\n<em>After instructed to pass message:</em> Golf Charlie Mike Victor Delta, C forty-two, from Wycombe to White Waltham, north of Marlow, two thousand feet Q N H one zero one five, V F R, request Basic Service.</p>\n",
      "speakExtra": "Farnborough Radar, Golf Charlie Mike Victor Delta, request Basic Service. Golf Charlie Mike Victor Delta, C forty-two, from Wycombe to White Waltham, north of Marlow, two thousand feet Q N H one zero one five, V F R, request Basic Service. Basic Service, Golf Victor Delta."
    },
    {
      "id": "radio-04",
      "subject": "radio",
      "title": "MAYDAY, PAN PAN & radio failure",
      "chapter": "Emergencies",
      "diagram": null,
      "body": "\n<h2>Distress and urgency (CAP 413)</h2>\n<ul>\n<li><strong>Distress</strong> — serious and/or imminent danger, immediate help: <strong>MAYDAY</strong> × 3.</li>\n<li><strong>Urgency</strong> — safety of aircraft/person, not immediate distress: <strong>PAN PAN</strong> × 3.</li>\n</ul>\n<p>Format: MAYDAY MAYDAY MAYDAY (or PAN PAN × 3) · station · callsign · type · nature · intentions · position/altitude/heading · POB / other. Squawk <strong>7700</strong>. Fly the aeroplane first.</p>\n<h3>Example — say this aloud</h3>\n<p class=\"rt-example\">MAYDAY MAYDAY MAYDAY, Wycombe Radio, Golf Charlie Mike Victor Delta, C forty-two, engine failure, forced landing ahead, three miles west of Booker, one thousand five hundred feet, two persons on board.</p>\n<ul>\n<li>Cancel when safe: “Cancel distress” / “Cancel urgency”.</li>\n<li>Radio failure: squawk <strong>7600</strong>, stay VMC, join carefully, watch for light signals.</li>\n<li>Lost: working ATSU or 121.500; squawk 0030 if appropriate.</li>\n<li>Practice PAN / Training Fix: only when the frequency is free; real emergency always wins.</li>\n</ul>\n<div class=\"warn\">Priority: distress &gt; urgency &gt; everything else. Keep quiet on frequency unless you can help.</div>\n",
      "speakExtra": "MAYDAY MAYDAY MAYDAY, Wycombe Radio, Golf Charlie Mike Victor Delta, C forty-two, engine failure, forced landing ahead, three miles west of Booker, one thousand five hundred feet, two persons on board. Pan Pan Pan Pan Pan Pan, London Centre, Golf Charlie Mike Victor Delta, unsure of position, request assistance."
    }
    ,
    {
      "id": "law-signs",
      "subject": "law",
      "title": "Signs, signals & airfield markings",
      "chapter": "Aerodrome markings",
      "diagram": "signs",
      "body": "\n<h2>Airfield signs & markings (original study pack)</h2>\n<p>These are teaching meanings in our own words — confirm local paint/sign standards and AIP with your instructor. We draw simple schematics in the Signs module.</p>\n<ul>\n<li><strong>Taxiway location</strong> — yellow characters on a <em>black</em> background: the taxiway you are on. Memory hook: dark ground = you are standing on it.</li>\n<li><strong>Yellow C</strong> — often after-landing book-in / landing fees near tower or ops. Hook: C = come check in.</li>\n<li><strong>Threshold piano keys + designator</strong> — landing starts at the threshold; numbers are magnetic heading to the nearest 10° (e.g. 36 ≈ 360°).</li>\n<li><strong>Permanently displaced threshold (arrows)</strong> — take-off/taxi may be allowed on the pre-threshold pavement; do <em>not</em> land on the displaced bit.</li>\n<li><strong>Closed pavement (Xs)</strong> — not for any aircraft use.</li>\n<li><strong>Temporary displaced threshold</strong> — chevrons/arrows plus Xs for unusable bits; same landing logic as permanent, driven by NOTAM/WIP.</li>\n<li><strong>Orange/white markers</strong> — unfit movement area or aerodrome boundary.</li>\n<li><strong>Red-and-yellow chequered flag</strong> — ATC in operation; apron movement only with ATC permission.</li>\n</ul>\n<div class=\"confirm\">Confirm with PPR / instructor / AIP before flight — study aid only.</div>\n",
      "speakExtra": "Yellow on black marks the taxiway you are on. Piano keys mark the threshold. Crosses mean closed. Chequered red and yellow means A T C is in operation."
    },
    {
      "id": "law-05",
      "subject": "law",
      "title": "UK airspace classes for microlight VFR",
      "chapter": "Airspace",
      "diagram": "airspace",
      "body": "\n<h2>Controlled vs uncontrolled — microlight picture</h2>\n<ul>\n<li><strong>Class A</strong> (e.g. London TMA / many airways) — IFR only. No casual VFR. Stay out.</li>\n<li><strong>Class D CTRs</strong> — need ATC clearance and two-way radio before entry. VFR is possible with clearance; respect cloud/visibility rules.</li>\n<li><strong>Class E</strong> — uncommon at low level for day-to-day UK microlight flying; where charted, clearance rules differ from D — read the chart.</li>\n<li><strong>Class G</strong> — most of the countryside microlights use. Uncontrolled, but Rules of the Air and VMC minima still apply.</li>\n</ul>\n<p>Use our schematic airspace diagram in Theory / Signs-style modules — we do not scrape CAA chart art.</p>\n<div class=\"confirm\">Confirm current classification on your chart/AIP for every route.</div>\n",
      "speakExtra": "Class A is I F R only. Class D needs clearance. Class G is uncontrolled but not rule free."
    },
    {
      "id": "met-clouds",
      "subject": "met",
      "title": "Cloud families by height",
      "chapter": "Clouds",
      "diagram": "clouds",
      "body": "\n<h2>Cloud types — original schematic lesson</h2>\n<p>We use our own labelled schematic (not any textbook photo). Rough families:</p>\n<ul>\n<li><strong>High</strong> — cirrus (Ci), cirrostratus (Cs), cirrocumulus (Cc): ice-crystal wisps or thin veil; Cs may show a halo.</li>\n<li><strong>Middle</strong> — altostratus (As), altocumulus (Ac): sheets or dappled mid-level heaps.</li>\n<li><strong>Low</strong> — stratus (St), stratocumulus (Sc), cumulus (Cu): these often set your VFR ceiling.</li>\n<li><strong>Multi-level</strong> — nimbostratus (Ns) deep rain layer; cumulonimbus (Cb) towering with anvil — avoid.</li>\n</ul>\n<div class=\"warn\">CB means turbulence, hail, lightning, gust fronts — microlights stay well clear.</div>\n<div class=\"confirm\">Heights are approximate teaching bands — real bases vary. Confirm with instructor / Met materials.</div>\n",
      "speakExtra": "High clouds are the cirrus family. Middle are alto. Low are stratus and cumulus. Nimbostratus is a rain layer. Cumulonimbus towers with an anvil — avoid."
    },
    {
      "id": "nav-05",
      "subject": "nav",
      "title": "Chart scales, lat/long, time & MSA skills",
      "chapter": "Nav exam skills",
      "diagram": "chart",
      "body": "\n<h2>Nav exam skills (original scenarios)</h2>\n<ul>\n<li><strong>1:500,000 vs 1:250,000</strong> — quarter-million shows more ground detail but typically depicts airspace only to lower levels; half-million covers higher airspace (toward FL195 idea). Different projections (Lambert-style vs transverse Mercator teaching). Pilot chooses which to carry.</li>\n<li><strong>Meridians converge</strong> on half-million Lambert-style sheets — measure track near mid-leg.</li>\n<li><strong>Latitude</strong> parallels E–W; 1° latitude ≈ 60 nm always. <strong>Longitude</strong> meridians through poles; 1° longitude ≈ 60 nm only at equator, shrinks toward poles.</li>\n<li><strong>UTC/Zulu</strong> for ATC and weather; UK winter ≈ UTC; BST ≈ UTC+1 — convert METARs when on BST.</li>\n<li><strong>Leg time</strong> minutes = (distance ÷ GS) × 60; round to whole minutes.</li>\n<li><strong>MSA</strong> — lowest safe altitude you work out per leg against terrain/obstacles (MEF helps; MEF is not a clearance).</li>\n<li><strong>QNH→QFE</strong> ≈ subtract 1 hPa per 30 ft elevation. <strong>RPS under CAS base</strong> can leave you lower than local QNH suggests.</li>\n<li><strong>Speed units</strong> — knots ↔ mph with ~1.15 either way (know which way).</li>\n</ul>\n<p>Practise in CRP drills / Nav paper mix with original numbers — not cloned commercial papers.</p>\n",
      "speakExtra": "Minutes equals distance over groundspeed times sixty. Measure track mid leg on the half million. M E F is not a clearance. Convert Zulu when on British Summer Time."
    },
    {
      "id": "radio-05",
      "subject": "radio",
      "title": "Radio set-up: licences, frequencies, squelch & intercom",
      "chapter": "Radio basics (SSL 22)",
      "diagram": "rtfsquelch",
      "body": "\n<h2>Before you press the button</h2>\n<h3>Paperwork</h3>\n<ul>\n<li><strong>You</strong> normally need a <strong>FRTOL</strong> (Flight Radiotelephony Operator’s Licence) from the CAA to use an aircraft radio. You can hold it on its own or alongside your NPPL. Student pilots training with an instructor are exempt, but only under certain conditions.</li>\n<li><strong>The aircraft</strong> needs an <strong>Aircraft Radio Licence</strong> from <strong>Ofcom</strong> for a fitted set. A hand-held with its own battery and aerial needs a <strong>Transportable Radio Licence</strong>.</li>\n<li>The set itself must be <strong>CAA-approved</strong>. Many 8.33 kHz hand-helds are covered by a general approval.</li>\n</ul>\n<h3>Choosing a frequency</h3>\n<ul>\n<li>Voice radio uses roughly <strong>118–137 MHz</strong>, with <strong>8.33 kHz</strong> channel spacing. That gives over two thousand channels.</li>\n<li>Some sets also tune 108–118 MHz, the band used by navigation aids such as VOR and ILS.</li>\n<li>Some radios need an extra pull or toggle of the knob for the last decimals, or 8.33 mode switched on. Learn your own set on the ground. Moving maps and EC gadgets you don’t know well will distract you in the air.</li>\n</ul>\n<h3>Volume and squelch</h3>\n<p>Squelch is a gate that keeps the speaker quiet until a strong enough signal arrives, so you don’t listen to hiss all day. To set a manual squelch:</p>\n<ol>\n<li>Put the volume at about half.</li>\n<li>Turn the squelch up until you hear the hiss.</li>\n<li>Back it off until the hiss <em>just</em> stops. It should cut out suddenly. Leave it there.</li>\n</ol>\n<p>Never set squelch while someone is talking. Keep the volume below about 70% or the audio distorts. Automatic sets often have a TEST button that opens the squelch so you can check the volume or catch a faint ATIS.</p>\n<h3>Intercom</h3>\n<p>The intercom (you to your passenger or instructor) has its own volume and sometimes its own squelch. Set it separately from the radio. If the intercom is too loud you will talk straight over an ATC call.</p>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "Volume to half. Squelch up until you hear the hiss. Back it off until the hiss just stops. Keep the volume below about seventy percent. Set the intercom separately so you do not talk over A T C."
    },
    {
      "id": "radio-06",
      "subject": "radio",
      "title": "Transponder, squawks & listening squawks",
      "chapter": "Transponder (SSL 22)",
      "diagram": "rtfxpdr",
      "body": "\n<h2>Your transponder in plain English</h2>\n<p>The transponder sends a four-digit <strong>squawk</strong> code that shows up next to your blip on a controller’s radar screen. That is how they know which blip is you.</p>\n<h3>Codes worth knowing by heart</h3>\n<ul>\n<li><strong>7000</strong>: UK VFR conspicuity, used when nobody has given you a code. (2000 is the IFR version, but not every country uses it.)</li>\n<li><strong>7500</strong>: unlawful interference (hijack).</li>\n<li><strong>7600</strong>: radio failure.</li>\n<li><strong>7700</strong>: emergency.</li>\n<li><strong>0030</strong>: lost (a UK-only code).</li>\n</ul>\n<p>Memory hook: <em>75 taken alive, 76 can’t talk, 77 going to heaven</em>.</p>\n<h3>Modes</h3>\n<ul>\n<li><strong>ALT (Mode C)</strong> also sends your level, always based on 1013.2 hPa. Changing your altimeter setting does <em>not</em> change what the transponder sends. Leave it on ALT unless told otherwise.</li>\n<li><strong>Mode S</strong> adds your aircraft identity and other data.</li>\n<li><strong>IDENT</strong> makes your blip stand out. Press it <em>only</em> when told to \"squawk ident\".</li>\n</ul>\n<h3>Listening squawks (Frequency Monitoring Codes)</h3>\n<p>An <strong>FMC</strong> tells a radar unit \"I’m listening on your frequency\" without you calling them. It’s handy when the frequency is busy or you don’t want a service. If you look like you are about to infringe, they can call you straight away. It does <em>not</em> guarantee a warning. When you leave that frequency, go back to 7000 or the next FMC. FMCs are listed in the UK AIP (ENR 1.6), the Skyway Code and the Airspace &amp; Safety Initiative map.</p>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "Seven thousand is V F R conspicuity. Seven five is hijack, seven six is radio failure, seven seven is emergency. Zero zero three zero means lost in the U K. Leave the transponder on ALT. Press ident only when asked. A listening squawk tells radar you are on their frequency."
    },
    {
      "id": "radio-07",
      "subject": "radio",
      "title": "Making calls: technique, callsigns, readbacks & changing frequency",
      "chapter": "Call technique (SSL 22)",
      "diagram": null,
      "body": "\n<h2>Sounding clear and professional</h2>\n<ul>\n<li><strong>Listen first.</strong> If two people transmit at once, both calls usually turn to noise.</li>\n<li>Use standard phrases. Only switch to plain English when no standard phrase fits.</li>\n<li>Drop filler such as \"this is\", \"and\" or \"with you\".</li>\n<li>Don’t rely on your tone of voice to ask a question. Use a question word, for example <em>\"Confirm…\"</em>.</li>\n<li>Keep the mic close to your lips. Press the button fully <em>before</em> you speak and let go only <em>after</em> your last word.</li>\n</ul>\n<h3>Callsign order</h3>\n<ul>\n<li><strong>First call:</strong> their station name, then your full callsign.</li>\n<li><strong>Later calls:</strong> just your callsign.</li>\n<li><strong>Replying:</strong> the reply first, then your callsign last.</li>\n<li>Only shorten your callsign (G-CMVD becomes \"Golf Victor Delta\") once the ground station has shortened it first.</li>\n</ul>\n<p class=\"rt-example\"><em>You:</em> Wycombe Tower, Golf Charlie Mike Victor Delta.<br><em>Tower:</em> Golf Victor Delta, Wycombe Tower, pass your message.<br>… later …<br><em>Tower:</em> Golf Victor Delta, runway two five, cleared to land, wind two four zero degrees eight knots.<br><em>You:</em> Runway two five, cleared to land, Golf Victor Delta.</p>\n<h3>What you must read back in full</h3>\n<p>If ATC gives you any of these, say them back word for word:</p>\n<ul>\n<li>Taxi instructions; anything about entering, crossing, backtracking or holding short of a runway in use; the runway in use.</li>\n<li>Clearance to take off or land; route and approach clearances.</li>\n<li>Level, heading and speed instructions.</li>\n<li>Squawk codes and ident instructions.</li>\n<li>Pressure settings (say \"hectopascals\" when the number is below 1000).</li>\n<li>Frequency changes, the type of service, VDF bearings and the transition level.</li>\n</ul>\n<p>Read them back <strong>in the order they were given</strong>. For a simple \"report downwind\" you can just say <strong>\"Wilco\"</strong>.</p>\n<h3>Leaving a frequency</h3>\n<p>Tell the unit you’re leaving and where you’re going. Then set 7000 or the right listening squawk, with ALT on.</p>\n<p class=\"rt-example\"><em>You:</em> Golf Victor Delta, changing to Farnborough Radar one two five decimal two five zero.<br><em>Unit:</em> Golf Victor Delta, roger.</p>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "Wycombe Tower, Golf Charlie Mike Victor Delta. Runway two five, cleared to land, Golf Victor Delta. Golf Victor Delta, changing to Farnborough Radar, one two five decimal two five zero."
    },
    {
      "id": "radio-08",
      "subject": "radio",
      "title": "Aerodrome calls: ATC, AFIS, Air/Ground & unattended",
      "chapter": "Aerodrome RT (SSL 22)",
      "diagram": "rtfcircuit",
      "body": "\n<h2>Who is on the other end?</h2>\n<p>The word at the end of the callsign tells you what the ground station can do:</p>\n<ul>\n<li><strong>Tower / Approach / Radar / Ground</strong> means <strong>ATC</strong>. They give clearances and instructions, and inside their ATZ or controlled airspace you must follow them.</li>\n<li><strong>Information</strong> means <strong>AFIS</strong>. They give information. In the UK they can instruct you on the ground up to the runway holding point, but never in the air.</li>\n<li><strong>Radio</strong> means <strong>Air/Ground (AGCS)</strong>. This is not formally an air traffic service. They give traffic and weather information only, often based on what other pilots have reported, and they can’t clear or instruct you.</li>\n<li><strong>Traffic</strong> means nobody is there. You broadcast to other pilots, for example on <strong>SAFETYCOM 135.480</strong>, which you can use within 10 NM and up to 1000 ft above circuit height.</li>\n</ul>\n<div class=\"warn\">Never ask an Information or Radio station for \"instructions\". They can’t give them.</div>\n<h3>Circuit calls</h3>\n<p>The normal calls are <strong>downwind</strong> and <strong>final</strong>. Add base or late downwind if it helps others. On an overhead join, call overhead and when you are descending deadside. \"Final\" covers the last 4 NM, and \"long final\" is 4–8 NM. There’s no official \"short final\". Say a distance instead, for example \"half-mile final\". Rule 11 says you report position and height when you enter or leave an ATZ.</p>\n<h3>ATC aerodrome</h3>\n<p>Call 15 NM or 5 minutes out, whichever is further. Give your request (for example \"request join\") and the ATIS letter. Land only after \"cleared to land\". Taxi clearances always have a <strong>clearance limit</strong>, which is the point where you stop. Say \"<strong>ready for departure</strong>\", and don’t use the word \"take-off\" until you’ve been cleared.</p>\n<p class=\"rt-example\"><em>You:</em> Wycombe Tower, Golf Charlie Mike Victor Delta, C42 at the west apron, request taxi for a local VFR flight, two POB, Information Delta, QNH one zero one eight.</p>\n<h3>AFIS aerodrome</h3>\n<p>\"Land at your discretion\" and \"take off at your discretion\" are <strong>not</strong> clearances. They mean the decision is yours. Reply with what you’re doing (\"Landing\", \"Taking off\"), never \"at my discretion\".</p>\n<h3>Air/Ground</h3>\n<p class=\"rt-example\"><em>You:</em> Denham Radio, Golf Charlie Mike Victor Delta, C42, five miles north-west of Denham near Amersham, request join.<br>… after landing …<br><em>You:</em> Golf Victor Delta, runway vacated, taxiing to the pumps.</p>\n<h3>Unattended field</h3>\n<p>Pick your own runway and circuit following the field’s published procedures. Start <em>and</em> finish each call with the field’s name, so nearby fields don’t get confused. Call when you join, overhead, descending deadside, downwind and final. Before departure, call when you taxi and when you line up.</p>\n<p class=\"rt-example\">Chalfont Farm Traffic, Golf Charlie Mike Victor Delta, overhead, joining for runway two seven, Chalfont Farm.<br><em>(Chalfont Farm is an invented example strip.)</em></p>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "Tower means A T C and clearances. Information means A F I S. Radio means air ground, information only. Traffic means nobody is there, so broadcast to other pilots. Chalfont Farm Traffic, Golf Charlie Mike Victor Delta, overhead, joining for runway two seven, Chalfont Farm."
    },
    {
      "id": "radio-09",
      "subject": "radio",
      "title": "En-route services: FIS, LARS, zone transit, SVFR & MATZ",
      "chapter": "En-route RT (SSL 22)",
      "diagram": "rtfmatz",
      "body": "\n<h2>UK Flight Information Services outside controlled airspace</h2>\n<ul>\n<li><strong>Basic Service</strong> gives you the most freedom. VFR pilots can get it in Class E and G. You may be told about activity, workload permitting, but avoiding other traffic is entirely <strong>your</strong> job.</li>\n<li><strong>Traffic Service</strong> uses radar. You’re told about specific conflicting traffic, but you’re <strong>not</strong> told how to avoid it. VFR pilots can get it in Class E and G.</li>\n<li><strong>Deconfliction Service</strong> gives traffic information <em>plus</em> avoiding advice, but it is <strong>IFR only, in Class G</strong>, so it’s not for a VFR microlight.</li>\n</ul>\n<p>Who provides them: <strong>London Information</strong> or <strong>Scottish Information</strong> give a Basic Service, and any squawk they give you is just for reference with no radar watch. <strong>LARS</strong> units (radar units such as Farnborough) give radar-based services up to FL100. They are listed in the UK AIP ENR 1.6. Further reading: CAP 774.</p>\n<h3>The freecall</h3>\n<p>Ask for the service in your first call. When you hear \"pass your message\", give these in order: <strong>callsign, type, from, to, position, altitude and pressure setting, VFR, intentions</strong>. If you hear \"standby\", just wait and don’t reply.</p>\n<p class=\"rt-example\"><em>You:</em> Farnborough Radar, Golf Charlie Mike Victor Delta, request Basic Service.<br><em>Radar:</em> Golf Charlie Mike Victor Delta, Farnborough Radar, pass your message.<br><em>You:</em> Golf Charlie Mike Victor Delta, C42, Wycombe to Popham, overhead Henley, altitude two thousand three hundred feet, QNH one zero one six, VFR, routing via Basingstoke.<br><em>Radar:</em> Golf Victor Delta, Basic Service, squawk four five two one.<br><em>You:</em> Basic Service, squawk four five two one, Golf Victor Delta.</p>\n<h3>Crossing controlled airspace (usually Class D)</h3>\n<p>Ask about <strong>10 minutes before</strong> the boundary, and give your entry and exit points. Stay <strong>outside</strong> until you have heard the word \"cleared\", and have a plan B route ready. Read back the clearance including any level limits. \"Radar control service\" means instructions inside the zone are mandatory. If you can’t stay VMC, say so straight away.</p>\n<h3>Special VFR</h3>\n<p>SVFR lets you fly in a control zone when the weather is below VMC, without flying IFR. You may have to wait. You don’t need a full flight plan, just your callsign, type, intentions and an ETA for the entry point.</p>\n<h3>Military units and MATZ</h3>\n<ul>\n<li>A <strong>MATZ</strong> is not controlled airspace for civil pilots, but you’re strongly advised to call and ask for a <strong>\"MATZ penetration service\"</strong>, then do what they say. The usual shape is a 5 NM circle from the surface to 3000 ft above the airfield, with stubs about 5 NM long and 4 NM wide from 1000 to 3000 ft. Check the chart.</li>\n<li>Military controllers often work on UHF too. Replies may be slow, and you may hear only half of a conversation.</li>\n<li>If a military instruction would break the civil Rules of the Air (for example too low over a town, or too low to glide clear), say \"unable\" and explain why.</li>\n</ul>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "Basic Service: you avoid traffic yourself. Traffic Service: radar tells you about traffic but not how to avoid it. Deconfliction is I F R only. Farnborough Radar, Golf Charlie Mike Victor Delta, request Basic Service. Stay outside controlled airspace until you hear cleared."
    },
    {
      "id": "radio-10",
      "subject": "radio",
      "title": "Mayday, Pan, radio failure & lost procedure",
      "chapter": "Emergency RT (SSL 22)",
      "diagram": null,
      "body": "\n<h2>When things go wrong</h2>\n<ul>\n<li><strong>MAYDAY</strong> (distress) means serious or imminent danger and you need help <em>now</em>.</li>\n<li><strong>PAN PAN</strong> (urgency) means a safety problem with your aircraft or someone on board or in sight, but you don’t need help immediately. Call early, for example when oil pressure starts dropping. Don’t wait until it’s a Mayday.</li>\n</ul>\n<h3>What goes in the call</h3>\n<p>Mayday or Pan Pan three times, then: <strong>station</strong> (if there’s time), <strong>callsign, aircraft type, what’s wrong, what you intend to do, where you are (height and heading), your qualification</strong> (for example student pilot, no instrument rating) and anything else useful such as POB or endurance. ICAO doesn’t require the qualification, but the UK asks for it because it helps the controller pitch the help to your level.</p>\n<p class=\"rt-example\">MAYDAY MAYDAY MAYDAY, Farnborough Radar, Golf Charlie Mike Victor Delta, C42, engine has stopped, making a forced landing in a field, four miles north of Wycombe, one thousand eight hundred feet, heading three six zero, NPPL microlight pilot, two POB.</p>\n<ul>\n<li>Use whoever you’re already talking to. If you aren’t talking to anyone, use <strong>121.5 MHz</strong>, where <strong>\"London Centre\"</strong> (the D&amp;D cell) answers in UK airspace.</li>\n<li>Squawk <strong>7700</strong>. Ending with \"Mayday out\" means you don’t need a reply.</li>\n<li>Everyone else stays silent, unless they can help with something like a relay, until the emergency is cancelled, moved to another frequency, or ATC allows normal calls again.</li>\n</ul>\n<h3>Radio seems dead?</h3>\n<p><strong>Fly the aeroplane first.</strong> You can fly VFR safely without a radio. Most \"failures\" are really switches set wrong. Work down this list:</p>\n<ol>\n<li>Right frequency and 8.33/25 kHz mode? Is the station actually open?</li>\n<li>Master, avionics and radio switched on? Audio panel set correctly?</li>\n<li>Volume and squelch OK? Push-to-talk stuck? Headset plugs pushed fully in?</li>\n<li>Breaker or fuse (reset only once). Try a second radio if you have one.</li>\n<li>Ask another aircraft to relay. Try another unit or 121.5.</li>\n</ol>\n<p>Still nothing? Squawk <strong>7600</strong>, stay VMC and out of controlled airspace, and think about diverting to a quiet field. If only the receiver may have failed, keep broadcasting your intentions \"blind\". Overhead the field, check the signals square, look out for other traffic and light signals, then phone the units concerned after you land. Full details are in UK AIP ENR 1.1.</p>\n<h3>Lost</h3>\n<p>Admit it <strong>early</strong>. Call a radar unit and squawk <strong>0030</strong> with ALT if you have no code: <em>\"Golf Charlie Mike Victor Delta, unsure of position, request position fix.\"</em> You can also ask for a heading to your destination. 121.5 London Centre can help too. A radar fix is usually more useful than a VDF bearing. If it’s real, don’t call it a \"training fix\". If you’re losing VMC or you’re in cloud without a rating, it’s an emergency, so make a Pan or Mayday.</p>\n<div class=\"confirm\">Study aid only. Check the current CAP 413, the UK AIP and your instructor before you fly. Local procedures vary.</div><p class=\"meta\" style=\"font-size:12px;opacity:.8\">Based on topics from: CAA CAP 3275 (Safety Sense Leaflet 22, Radiotelephony, July 2026) and CAP 413 Radiotelephony Manual. Written in our own words, and the example calls are invented for practice.</p>",
      "speakExtra": "MAYDAY MAYDAY MAYDAY, Farnborough Radar, Golf Charlie Mike Victor Delta, C42, engine has stopped, making a forced landing in a field, four miles north of Wycombe, one thousand eight hundred feet, heading three six zero, N P P L microlight pilot, two persons on board. Radio failure: squawk seven six zero zero, stay V M C and clear of controlled airspace. Lost: squawk zero zero three zero and ask for a position fix."
    }

  ]
};
