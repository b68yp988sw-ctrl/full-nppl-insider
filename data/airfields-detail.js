/* Airfield detail sheets — study aid only, NOT for navigation.
 * Source for every fact: UK AIP AD 2 (eAIP, AIRAC 29 OCT 2026) unless a field says otherwise.
 * "Check with airfield" = not published in the source checked. Always check the current AIP, NOTAMs and the airfield before flying. */
const AIRFIELD_DETAIL_META = {
  airac: '29 OCT 2026',
  aipBase: 'https://www.aurora.nats.co.uk/htmlAIP/Publications/2026-10-29-AIRAC/html/eAIP/EG-AD-2.',
  aipIndex: 'https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/AIP/',
  check: 'Check the current AIP/NOTAMs and the airfield before flying.',
  cwc: 'Check with airfield'
};
const AIRFIELD_DETAIL = {
  EGTB: {
    name: 'Wycombe Air Park (Booker)', lat: 51.61167, lon: -0.80833, elev: 516, var: '1.10°E (2027)',
    atsType: 'A/G radio — no ATC, no AFIS',
    ats: [
      { svc: 'A/G', cs: 'Wycombe Radio', f: '126.555', note: 'DOC 25 NM / 4000 ft. Aerodrome hours.' }
    ],
    squawk: '',
    ppr: { req: 'Yes — strictly PPR at all times', how: 'Telephone 01494-529261. All pilots must be briefed before arrival.', link: '' },
    fees: '',
    hours: '0900-1730 (0800-1630) or SS, whichever earlier. Extended 1730-1900 (1630-1900) by arrangement.',
    fuel: 'AVGAS 100LL; Jet A-1 (with AL48)',
    phone: '01494-529261', website: '',
    atz: '2 NM radius, SFC-2516 ft ALT, Class G',
    circuitHeight: '1000 ft QFE (helicopters 750 ft QFE)',
    runways: [
      { d: '06', brg: 62.42, surf: 'Asphalt', dim: '730 x 23 m', thrElev: 513.2, cct: 'Variable' },
      { d: '24', brg: 242.43, surf: 'Asphalt', dim: '730 x 23 m', thrElev: 513.2, cct: 'Variable' },
      { d: '06G', brg: 62.44, surf: 'Grass', dim: '631 x 23 m', thrElev: 510.6, cct: 'Variable' },
      { d: '24G', brg: 242.44, surf: 'Grass', dim: '631 x 23 m', thrElev: 508.9, cct: 'Variable' }
    ],
    cctNote: 'Circuits variable — ask Wycombe Radio. Gliders fly the circuit opposite to powered aircraft.',
    joining: 'Overfly the runway in use at 1200 ft QFE on the QDM. At the runway midpoint turn left or right (per circuit direction) and level at 1000 ft QFE on the crosswind leg before turning downwind.',
    noise: 'Strict noise abatement procedures — details from the aerodrome operator.',
    notes: [
      'Close to the London CTR and beneath the London TMA.',
      'Intense gliding on and around the aerodrome — no overhead transits.',
      'Sharp lookout crossing between the main apron (Hold A3) and grass runway 06/24 (Hold A2).',
      'Helicopters operate inside the fixed-wing circuits.',
      'Aerodrome liable to waterlogging. Main apron markings do not guarantee wingtip clearance.'
    ],
    payPoint: '', tags: 'booker wycombe radio glider chilterns'
  },
  EGLD: {
    name: 'Denham', lat: 51.58833, lon: -0.51306, elev: 249, var: '',
    atsType: 'A/G radio — no ATC, no AFIS',
    ats: [
      { svc: 'A/G', cs: 'Denham Radio', f: '130.730', note: 'Aerodrome hours.' },
      { svc: 'Nearby', cs: 'Northolt', f: '126.450', note: 'Northolt traffic not below 1500 ft AMSL nearby.' }
    ],
    squawk: '7000 with Mode C in the LFA',
    ppr: { req: 'Yes', how: 'By telephone 01895-832161, webform at egld.com or email tower@egld.com. Pilot briefing on the website. Non-radio aircraft need prior permission.', link: 'https://www.egld.com' },
    fees: '',
    hours: '0800-1800 (0700-1900) and by arrangement.',
    fuel: 'AVGAS 100LL 0800-1800 (0700-1900); Jet A-1 Mon-Fri 0900-1430 and by arrangement',
    phone: '01895-832161 (ATC) · 01895-832060 (admin)', website: 'https://www.egld.com',
    atz: 'SFC-2249 ft ALT, Class D/G', circuitHeight: '1000 ft AMSL (altitude)',
    runways: [
      { d: '06', brg: 59.21, surf: 'Asphalt', dim: '775 x 18 m', thrElev: 249, cct: 'LH', disp: 'THR displaced 36 m' },
      { d: '24', brg: 239.22, surf: 'Asphalt', dim: '775 x 18 m', thrElev: 241, cct: 'RH', disp: 'THR displaced 89 m' },
      { d: '12', brg: 118.11, surf: 'Grass', dim: '546 x 18 m', thrElev: 248, cct: 'Variable', disp: 'THR displaced 114 m' },
      { d: '30', brg: 298.11, surf: 'Grass', dim: '546 x 18 m', thrElev: 244, cct: 'Variable', disp: 'THR displaced 183 m' }
    ],
    cctNote: '06/24 circuits to the north (06 LH, 24 RH). Grass 12/30 not available for solo training.',
    joining: 'No overhead join. Join via the VRPs on a long base — Maple Cross for runway 24, St Giles for runway 06.',
    noise: 'RWY 24 departures turn right before the A413. RWY 06 departures turn left over the lakes. Avoid the SW part of the ATZ south of the A40.',
    notes: [
      'Local Flying Area max 1200 ft AMSL.',
      'Road crosses the runway 24 approach.',
      'Power lines 369 ft AMSL 0.6 NM W.',
      'No hard taxiways. Grass parallel to 06/24 on the north side.'
    ],
    payPoint: '', tags: 'denham radio bucks northolt'
  },
  EGTR: {
    name: 'Elstree', lat: 51.65583, lon: -0.32583, elev: 332, var: '',
    atsType: 'AFIS, with A/G radio on the same frequency',
    ats: [
      { svc: 'AFIS', cs: 'Elstree Information', f: '122.405', note: 'When AFIS is operating.' },
      { svc: 'A/G', cs: 'Elstree Radio', f: '122.405', note: 'When AFIS is not operating.' }
    ],
    squawk: '',
    ppr: { req: 'Yes — mandatory PPR and pilot brief', how: 'Via londonelstree.com, tel 020-8953 7480 or email tower@londonelstree.com. Non-radio aircraft not accepted.', link: 'http://www.londonelstree.com' },
    fees: '',
    hours: '0900-2000 (0800-1900) or SS, whichever earlier.',
    fuel: 'AVGAS 100LL; Jet A-1 (by arrangement)',
    phone: '020-8953 7480', website: 'http://www.londonelstree.com',
    atz: 'SFC-2332 ft ALT, Class G', circuitHeight: '1000 ft QFE (helicopters 750 ft AGL)',
    runways: [
      { d: '08', brg: 79.66, surf: 'Asphalt', dim: '651 x 20 m', thrElev: 329.8, cct: 'Variable', disp: '174 m paved W of THR 08 not licensed' },
      { d: '26', brg: 259.67, surf: 'Asphalt', dim: '651 x 20 m', thrElev: 301.4, cct: 'Variable', disp: '128 m E of THR 26 not for take-off/landing' }
    ],
    cctNote: 'Circuits variable in line with the noise limitation schedule — ask the AFISO.',
    joining: 'Standard overhead join.',
    noise: 'RWY 26: runway heading until crossing the M1, turn right at the motorway junction to re-cross it, follow the M1 to 1 NM before the M25. RWY 08: runway heading 1 NM, then turn left to avoid built-up areas.',
    notes: [
      'HT cables 95 ft AAL 0.3 NM N, and running N-S 0.21 NM from THR 08.',
      'Taxiway to obstacle clearance often only 10.5 m — taxi with extreme caution.',
      'Public footpaths cross the aerodrome.',
      'London TMA overhead.'
    ],
    payPoint: '', tags: 'elstree information afis herts'
  },
  EGLM: {
    name: 'White Waltham', lat: 51.50056, lon: -0.77472, elev: 133, var: '',
    atsType: 'A/G radio — no ATC, no AFIS',
    ats: [
      { svc: 'A/G', cs: 'Waltham Radio', f: '122.605', note: 'Aerodrome hours.' }
    ],
    squawk: '7000 with altitude in the LFA',
    ppr: { req: 'Yes — strictly PPR', how: 'By telephone 01628-823272 or the online PPR form.', link: 'https://www.wlac.co.uk/ppr-request/' },
    fees: '',
    hours: '0800-1630 (0700-1830) or SS+30, whichever earlier, and by arrangement.',
    fuel: 'AVGAS 100LL; UL91; Jet A-1',
    phone: '01628-823272', website: 'https://www.wlac.co.uk',
    atz: 'SFC-2133 ft ALT, Class D/G (partly inside London CTR)', circuitHeight: '800 ft QFE',
    runways: [
      { d: '03', brg: 26.23, surf: 'Grass', dim: '1029 x 45 m', thrElev: 114, cct: 'Check with airfield' },
      { d: '21', brg: 206.24, surf: 'Grass', dim: '1029 x 45 m', thrElev: 127.1, cct: 'Check with airfield' },
      { d: '07L', brg: 64.62, surf: 'Grass', dim: '1116 x 45 m', thrElev: 126.2, cct: 'Check with airfield' },
      { d: '25R', brg: 244.63, surf: 'Grass', dim: '1116 x 45 m', thrElev: 123.1, cct: 'Check with airfield', disp: 'THR displaced 67 m' },
      { d: '07R', brg: 64.61, surf: 'Grass', dim: '785 x 25 m', thrElev: 125.3, cct: 'Check with airfield' },
      { d: '25L', brg: 244.62, surf: 'Grass', dim: '785 x 25 m', thrElev: 131.5, cct: 'Check with airfield' },
      { d: '11', brg: 109.91, surf: 'Grass', dim: '930 x 30 m', thrElev: 125.7, cct: 'Check with airfield' },
      { d: '29', brg: 289.91, surf: 'Grass', dim: '930 x 30 m', thrElev: 113.5, cct: 'Check with airfield', disp: 'THR displaced 63 m' }
    ],
    cctNote: 'Circuit direction per runway is not stated in the AIP — see the WLAC operations manual / briefing.',
    joining: 'Arrive via reporting point November, Sierra or Whiskey. Arrive overhead at 1200 ft QFE and make a standard overhead join.',
    noise: 'Follow local noise abatement procedures (briefing room, website, Operations). No flying over built-up areas; avoid overflying local villages.',
    notes: [
      'Local Flying Area (inside the London CTR) max 1500 ft QNH, Class D VMC minima.',
      'Do not enter the London CTR outside the LFA without a Heathrow Radar clearance.',
      'Grass surface rough and undulating; vehicles on the perimeter track.',
      'Aerobatic practice overhead; drones up to 400 ft.'
    ],
    payPoint: '', tags: 'white waltham radio wlac grass berkshire'
  },
  EGTK: {
    name: 'Oxford (London Oxford Airport)', lat: 51.83694, lon: -1.32, elev: 263, var: '0.92°E (2027)',
    atsType: 'ATC — Tower, Ground, Approach/Radar, ATIS',
    ats: [
      { svc: 'APP', cs: 'Oxford Approach', f: '125.090', note: '0630-2230 (0530-2130).' },
      { svc: 'RADAR', cs: 'Oxford Radar', f: '125.090', note: '0730-2000 (0630-1900).' },
      { svc: 'RADAR', cs: 'Oxford Director', f: '119.980', note: 'When directed by ATC.' },
      { svc: 'TWR', cs: 'Oxford Tower', f: '133.430', note: 'TWR may be provided by APP — see ATIS.' },
      { svc: 'GND', cs: 'Oxford Ground', f: '121.955', note: 'When notified on the ATIS.' },
      { svc: 'ATIS', cs: 'Oxford ATIS', f: '136.230', note: '0630-2230 (0530-2130).' },
      { svc: 'Ops', cs: 'Oxford Ops', f: '131.640', note: 'Pre-book; call 15 min before arrival. Non-ATS.' },
      { svc: 'LARS', cs: 'Brize Radar', f: '124.280', note: 'Listening squawk 3727 within 5 NM of Brize CTR edge.' }
    ],
    squawk: 'FMC listening squawk 4517 on 125.090 · VFR departures squawk 4520',
    ppr: { req: 'Yes — book in', how: 'Pre-book with Oxford Ops (131.640) or tel 01865-290660, ops@londonoxfordairport.com. Operate under the airport Terms and Conditions of Use.', link: 'https://www.oxfordairport.co.uk' },
    fees: '',
    hours: '0630-2230 (0530-2130).',
    fuel: 'AVGAS 100LL self-service (credit/fuel card); Jet A-1; SAF',
    phone: '01865-290650 (ATC) · 01865-290660 (Ops)', website: 'https://www.londonoxfordairport.com',
    atz: 'SFC-2263 ft ALT, Class G', circuitHeight: '1200 ft QFE / 1500 ft QNH',
    runways: [
      { d: '01', brg: 10.68, surf: 'Grooved asphalt', dim: '1526 x 30 m', thrElev: 248.9, cct: 'RH', disp: 'THR displaced 143 m' },
      { d: '19', brg: 190.68, surf: 'Grooved asphalt', dim: '1526 x 30 m', thrElev: 258.3, cct: 'LH', disp: 'THR displaced 64 m' }
    ],
    cctNote: 'RWY 01 right-hand, RWY 19 left-hand. RWY 19 preferred with up to 5 kt tailwind.',
    joining: 'Call by 10 NM. Not above 1500 ft QNH within 5 NM. Join on base leg where possible, as cleared by ATC. Departures: not above 2000 ft until 5 NM.',
    noise: 'Avoid Blenheim Palace and Shipton-on-Cherwell. Circuit diagrams: oxfordairport.co.uk/noise-abatement/',
    notes: [
      'Danger Area EG D129 4.5 NM NE. Brize Norton CTR to the west.',
      'Abingdon (8 NM S) has a similar runway layout — confirm you have the right airfield.',
      'Power cables 316 ft AMSL 860 m N of THR 19.',
      'Self-park stands 1-20 on the Main Apron. Run-ups: TWY A (RWY 01) or TWY C east of C3 (RWY 19).'
    ],
    payPoint: '', tags: 'oxford kidlington tower radar atis brize'
  },
  EGTF: {
    name: 'Fairoaks', lat: 51.34806, lon: -0.55861, elev: 80, var: '',
    atsType: 'A/G radio — no ATC, no AFIS',
    ats: [
      { svc: 'A/G', cs: 'Fairoaks Radio', f: '123.430', note: 'Aerodrome hours.' },
      { svc: 'Nearby', cs: 'Farnborough Radar', f: '134.355', note: 'Farnborough CTR < 3 NM SW.' }
    ],
    squawk: '7010 in the Fairoaks circuit and ATZ/LFA',
    ppr: { req: 'Yes', how: 'All circuit traffic PPR by telephone 01276-857300. First-time visitors need a telephone briefing.', link: 'https://fairoaksairport.uk' },
    fees: '',
    hours: 'Mon-Sat 0800-1800 (0700-1700); Sun & PH 0900-1800 (0800-1700).',
    fuel: 'AVGAS 100LL; Jet A-1 (AL48). Fuel Mon-Sat 0815-1740, Sun 0915-1740',
    phone: '01276-857300 (A/G) · 01276-857700 (admin)', website: 'https://fairoaksairport.uk',
    atz: 'SFC-2080 ft ALT, Class G (D where inside CTR/CTA)', circuitHeight: '1100 ft AMSL (helicopters 800 ft)',
    runways: [
      { d: '06', brg: 57.91, surf: 'Asphalt', dim: '810 x 27 m', thrElev: 78.4, cct: 'Variable (LH or RH)', disp: 'THR displaced 53 m' },
      { d: '24', brg: 237.91, surf: 'Asphalt', dim: '810 x 27 m', thrElev: 76.4, cct: 'Variable (LH or RH)', disp: 'THR displaced 11 m' }
    ],
    cctNote: 'Circuits variable. No circuits by non-Fairoaks aircraft except approved operators.',
    joining: 'Enter the ATZ at 1400 ft AMSL and descend to 1100 ft AMSL north of the runway, then turn downwind (06 LH / 24 RH) or crosswind (24 LH / 06 RH). Straight-in, downwind and base joins strongly discouraged.',
    noise: 'Avoid properties in the NE corner below 1100 ft. Only 4 movements before 1000 (0900) on Sundays.',
    notes: [
      'No weight-shift microlights. Non-radio aircraft not accepted.',
      'LFA max 1500 ft QNH; remain west of the M25.',
      'RWY 24 departures turn promptly — Farnborough CTR < 3 NM SW. Controlled airspace base 2000 ft to the south.'
    ],
    payPoint: '', tags: 'fairoaks radio surrey farnborough'
  },
  EGTC: {
    name: 'Cranfield', lat: 52.07222, lon: -0.61667, elev: 360, var: '',
    atsType: 'ATC — Approach, Tower, ATIS',
    ats: [
      { svc: 'APP', cs: 'Cranfield Approach', f: '122.855', note: 'DOC 25 NM / 6000 ft.' },
      { svc: 'TWR', cs: 'Cranfield Tower', f: '134.930', note: 'DOC 30 NM / 4000 ft.' },
      { svc: 'TWR', cs: 'Cranfield Tower', f: '122.855', note: 'When directed by ATC.' },
      { svc: 'ATIS', cs: 'Cranfield Departure Information', f: '121.880', note: 'DOC 2 NM / ground.' }
    ],
    squawk: '',
    ppr: { req: 'Yes — strictly PPR', how: 'ATC 01234-750005 or atc@cranfield.ac.uk. Non-radio aircraft not permitted.', link: 'https://www.cranfieldairport.com' },
    fees: 'Landing fees are paid through Airport Accounts (01234-758151) or the website. There are no payment facilities on site.',
    feesLink: 'https://www.cranfieldairport.com',
    hours: 'Mon-Sun 0630-1900 (0530-1800), including public holidays.',
    fuel: 'AVGAS 100LL; Jet A-1; SAF. Requests by text 07900-738194',
    phone: '01234-750005 (ATC) · 01234-758151 (accounts)', website: 'https://www.cranfieldairport.com',
    atz: 'SFC-2360 ft ALT, Class G', circuitHeight: '1000 ft QFE by day (1200 ft at night)',
    runways: [
      { d: '03', brg: 31.73, surf: 'Asphalt', dim: '1799 x 45 m', thrElev: 358.2, cct: 'Either (both directions in use)', disp: 'THR displaced 206 m' },
      { d: '21', brg: 211.74, surf: 'Asphalt', dim: '1799 x 45 m', thrElev: 357.9, cct: 'Either (both directions in use)' }
    ],
    cctNote: 'Circuits may be flown in both directions — there is no dead side.',
    joining: 'Join via the published VRPs as instructed by ATC.',
    noise: 'Check with airfield',
    notes: [
      'Intensive IFR training within 20 NM.',
      'Deer on the aerodrome.',
      'Splash pit about 610 m from THR 21 near TWY C.',
      'UAS up to 400 ft inside the FRZ.',
      'Visiting pilots leave via the RVP gate.'
    ],
    payPoint: 'Off site — Airport Accounts by phone or website (no on-site payment).', tags: 'cranfield tower approach atis beds'
  },
  EGGW: {
    name: 'London Luton', lat: 51.87472, lon: -0.36833, elev: 527, var: '1.23°E (2027)',
    atsType: 'ATC — Delivery, Ground, Tower, Radar, Director, ATIS (major airport)',
    ats: [
      { svc: 'ATIS', cs: 'Luton Arrival and Departure Information', f: '120.580', note: 'H24. Also tel 01582-395225.' },
      { svc: 'DEL', cs: 'Luton Delivery', f: '121.885', note: 'When directed by ATC (by ATIS).' },
      { svc: 'GND', cs: 'Luton Ground', f: '121.755', note: '0600-2300 (0500-2200).' },
      { svc: 'TWR', cs: 'Luton Tower', f: '132.555', note: 'H24. 126.730 spare when directed.' },
      { svc: 'APP', cs: 'Luton Radar', f: '129.550', note: 'H24. 132.050 when directed.' },
      { svc: 'RADAR', cs: 'Luton Director', f: '128.750', note: 'When directed by ATC.' }
    ],
    squawk: 'FMC listening squawk 0013 on Luton Radar 129.550 (outside CAS only)',
    ppr: { req: 'Yes — slot + handling required', how: 'All flights need an ACL slot (lonacxh@acl-uk.org, 0208-564 0614) and prior ground handling with a based handling agent. VFR flights should file a flight plan. Training needs prior permission from Airport Operations (01582-395525).', link: '' },
    fees: 'Financial penalty if operating without a slot or handling (AIP AD 2.20). Charges: check with airport.',
    hours: 'H24 (training 0800-2000 (0700-1900)).',
    fuel: 'Jet A-1 only listed (no AVGAS in AIP)',
    phone: '01582-395525 (Ops) · 01582-395029 (ATC watch manager)', website: 'Check with airfield',
    atz: '2.5 NM radius, SFC-2527 ft ALT, Class D inside the Luton CTR (SFC-3500 ft)', circuitHeight: '1000 ft QFE for props ≤ 5700 kg',
    runways: [
      { d: '07', brg: 74.38, surf: 'Grooved asphalt', dim: '2162 x 45 m', thrElev: 515.2, cct: 'RH (AIP: jets/heavy training); light aircraft as directed by ATC' },
      { d: '25', brg: 254.40, surf: 'Grooved asphalt', dim: '2162 x 45 m', thrElev: 508.5, cct: 'LH (AIP: jets/heavy training); light aircraft as directed by ATC', disp: 'THR displaced 82 m' }
    ],
    cctNote: 'Class D controlled airspace — you need a clearance from Luton Radar before entering the CTR.',
    joining: 'As cleared by Luton Radar / Tower. Special VFR may be given when traffic permits.',
    noise: 'Avoid overflying built-up areas and isolated properties south of the airport when VFR/SVFR.',
    notes: [
      'Major commercial airport — not a normal NPPL destination. Shown as an example of a full ATC airfield.',
      'Booking out by RTF not accepted.',
      'Non-8.33 kHz aircraft must phone ATC 01582-395029 before operating.',
      'Hold H1 has an unusual alignment — do not cross without clearance.'
    ],
    payPoint: '', tags: 'luton tower radar ground delivery atis class d'
  }
};
if (typeof globalThis !== 'undefined') { globalThis.AIRFIELD_DETAIL = AIRFIELD_DETAIL; globalThis.AIRFIELD_DETAIL_META = AIRFIELD_DETAIL_META; }

/* Plain-English student summaries. Rewritten ONLY from the sourced AIP fields above (same AIRAC) —
 * no new facts. go = before you go, know = when you get there, calls = radio call order.
 * Airfields without a hand-written summary get one built automatically from the same fields. */
(function () {
  const S = {
    EGTK: {
      go: [
        'Book in with Oxford Ops: phone 01865-290660 or email ops@londonoxfordairport.com.',
        'Read the airport Terms and Conditions of Use.',
        'Check NOTAMs for Oxford and your route.',
        'Note the ATZ (surface to 2,263 ft, Class G), Brize Norton CTR to the west and Danger Area EG D129 4.5 NM NE.',
        'Landing fee: not published in the AIP. Ask when you book.'
      ],
      know: [
        'Call by 10 NM out.',
        'Stay at or below 1,500 ft QNH within 5 NM.',
        'Expect to join on base leg, as cleared by ATC.',
        'Circuit: RWY 01 right-hand, RWY 19 left-hand, at 1,200 ft QFE.',
        'Avoid flying over Blenheim Palace and Shipton-on-Cherwell.',
        'Abingdon, 8 NM south, looks similar. Make sure you have the right airfield.',
        'Power cables 316 ft AMSL stand 860 m north of the RWY 19 threshold.',
        'Self-park on stands 1–20 on the Main Apron.',
        'Leaving: stay at or below 2,000 ft until 5 NM.'
      ],
      calls: [
        'Listen to Oxford ATIS 136.230 first.',
        'Call Oxford Radar 125.090 by 10 NM (Oxford Approach on the same frequency outside radar hours).',
        'Change to Oxford Tower 133.430 when told.',
        'On the ground, use Oxford Ground 121.955 when the ATIS says so.',
        'Near Brize Norton: Brize Radar 124.280, or squawk 3727 and listen within 5 NM of the CTR edge.'
      ]
    },
    EGTB: {
      go: [
        'PPR is strict at all times: phone 01494-529261.',
        'You must be briefed by the airfield before you arrive.',
        'Check NOTAMs for Wycombe and your route.',
        'Note the ATZ (2 NM radius, surface to 2,516 ft). You are close to the London CTR and under the London TMA. Check your chart for the base above you.',
        'Landing fee: not published in the AIP. Ask when you book.'
      ],
      know: [
        'Lots of gliding here. Never fly over the top of the airfield.',
        'Join: fly along the runway in use at 1,200 ft QFE.',
        'At the runway midpoint, turn and level at 1,000 ft QFE on crosswind, then turn downwind.',
        'Circuit direction changes. Ask Wycombe Radio.',
        'Gliders fly the opposite circuit to powered aircraft.',
        'Helicopters fly inside your circuit, at 750 ft QFE.',
        'Strict noise rules. Get the details from the airfield.',
        'Look out when crossing between the main apron and the grass runway.',
        'The grass can get waterlogged. Apron markings do not guarantee wingtip clearance.'
      ],
      calls: [
        'Call Wycombe Radio 126.555. It is A/G radio: it gives information, not clearances.'
      ]
    },
    EGLM: {
      go: [
        'PPR is strict: phone 01628-823272 or use the online PPR form.',
        'Check NOTAMs for White Waltham and your route.',
        'Note the ATZ (surface to 2,133 ft). Part of it is inside the London CTR (Class D).',
        'The AIP does not give circuit directions. Get them from the WLAC briefing.',
        'Landing fee: not published in the AIP. Ask when you book.'
      ],
      know: [
        'Arrive via reporting point November, Sierra or Whiskey.',
        'Arrive overhead at 1,200 ft QFE and make a standard overhead join.',
        'Circuit height is 800 ft QFE.',
        'In the Local Flying Area stay at or below 1,500 ft QNH, with Class D VMC minima.',
        'Never leave the Local Flying Area into the London CTR without a Heathrow Radar clearance.',
        'Squawk 7000 with altitude in the Local Flying Area.',
        'Do not fly over built-up areas or local villages.',
        'The grass is rough and uneven. Watch for vehicles on the perimeter track.',
        'Expect aerobatics overhead and drones up to 400 ft.'
      ],
      calls: [
        'Call Waltham Radio 122.605. It is A/G radio: it gives information, not clearances.'
      ]
    }
  };
  Object.keys(S).forEach(k => { if (AIRFIELD_DETAIL[k]) AIRFIELD_DETAIL[k].student = S[k]; });
})();

/* Facilities + landing fees. Checked 3 Nov 2026. Every item cites its source; anything not
 * found in a source is status 'unk' and shows "Check with airfield". 'AIP' = this airfield's
 * AD 2 page for the AIRAC above (AD 2.4 / 2.5). Dogs are only listed where a source states it
 * (none found). Fees come from the airfield's own price list or website, not the AIP. */
(function () {
  const A = 'AIP';
  const F = {
    EGTB: {
      fac: [
        ['cafe', 'yes', 'Café on the airfield. Opening times not published.', 'https://www.wycombeairpark.co.uk/', 'On site|Hours not published'],
        ['school', 'yes', 'Booker Aviation: aeroplane pilot training.', 'https://www.wycombeairpark.co.uk/'],
        ['maint', 'yes', 'Booker Aviation: aircraft maintenance.', 'https://www.wycombeairpark.co.uk/'],
        ['hangar', 'unk', '', A], ['parking', 'unk', '', ''], ['overnight', 'unk', '', ''],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['transport', 'unk', '', A]
      ],
      landing: { pub: false, src: 'https://bookeraviation.com/wp-content/uploads/2024/08/Pilot-Brief-01-01-2024-VISITING-PILOTS.pdf',
        note: 'Visiting Pilot Brief: “All landings must be paid for.” No current price list found on the operator’s website.' }
    },
    EGTK: {
      fac: [
        ['cafe', 'yes', 'Restaurant and bar/café on site.', A, 'Restaurant, bar/café|Hours not published'],
        ['toilets', 'yes', 'Pilots’ lounge and rest rooms in the terminal.', A],
        ['school', 'unk', '', ''], ['shop', 'unk', '', ''],
        ['maint', 'yes', 'Repair stations on the airport. Contact Oxford Ops.', A],
        ['hangar', 'yes', 'By arrangement with Ops. £48 + VAT per 24 h (single piston up to 2,730 kg).', 'https://www.oxfordairport.co.uk/general-aviation-charges-2/'],
        ['parking', 'yes', 'First 2 hours free.', 'https://www.oxfordairport.co.uk/general-aviation-charges-2/'],
        ['overnight', 'yes', '£27 + VAT per 24 h after the first 2 hours.', 'https://www.oxfordairport.co.uk/general-aviation-charges-2/'],
        ['transport', 'yes', 'Bus, taxis, car hire. Oxford Parkway station 3.1 miles.', A]
      ],
      landing: { pub: true, vt: '+ VAT', sep: '£31', sepNote: 'single piston 0–2,730 kg', micro: '', vat: 'Fees exclude VAT. VAT charged where applicable.',
        tg: 'Touch-and-go: half the landing fee. Each circuit is billed as a landing.',
        extra: ['Nav fee £27 for instrument approaches, on top of the landing.', 'Arriving without confirmed PPR adds a handling fee. £50 late fee if unpaid after 24 h.'],
        src: 'https://www.oxfordairport.co.uk/wp-content/uploads/2026/01/visitor_fees_2026_v2.pdf', srcLabel: 'Visitor fees 2026 (PDF)' }
    },
    EGLM: {
      notice: { t: 'Closed to fixed-wing visitors from 25 Sep 2026 until further notice. Check the NOTAM.', src: 'https://www.wlac.co.uk/ppr-request/' },
      fac: [
        ['cafe', 'unk', 'Historic clubhouse (West London Aero Club). Food for visitors not published.', 'https://www.wlac.co.uk/'],
        ['school', 'yes', 'West London Aero Club: PPL training.', 'https://www.wlac.co.uk/'],
        ['parking', 'yes', 'The club has plenty of car parking.', 'https://www.wlac.co.uk/'],
        ['overnight', 'yes', 'Overnight parking £15 single, £30 twin.', 'https://www.wlac.co.uk/start-your-flying-experience-with-a-trial-flying-lesson-at-the-west-london-aero-club/pilot-information/'],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['maint', 'unk', '', A], ['hangar', 'unk', '', A], ['transport', 'unk', '', '']
      ],
      landing: { pub: true, vt: 'VAT not stated', sep: '£15', sepNote: 'single-engine fixed wing', micro: '', vat: 'VAT not stated.',
        disc: 'No landing fee if you take 50 litres or more of Avgas.', extra: ['Twin £30.'],
        src: 'https://www.wlac.co.uk/start-your-flying-experience-with-a-trial-flying-lesson-at-the-west-london-aero-club/pilot-information/', srcLabel: 'WLAC pilot information' }
    },
    EGLD: {
      fac: [
        ['cafe', 'yes', 'The Crew Room café (north side): tea, coffee, cakes, light meals. Biggles Restaurant (south side).', 'https://www.egld.com/who_is_here.html', 'Crew Room café · Biggles|Hours not published'],
        ['school', 'yes', 'The Pilot Centre flying school and club; HQ Aviation (helicopters).', 'https://www.egld.com/who_is_here.html'],
        ['maint', 'yes', 'Maintenance and engineering companies on the aerodrome.', 'https://egld.com/faqs.html'],
        ['hangar', 'unk', '', A], ['parking', 'unk', '', ''], ['overnight', 'unk', '', ''],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['transport', 'unk', '', A]
      ],
      landing: { pub: false, src: 'https://egld.com/pilots.html', note: 'No price list on egld.com.' }
    },
    EGTR: {
      fac: [
        ['cafe', 'yes', 'The Aerodrome Cafe: 09:00–17:00, 7 days. Lunch from 12:00. Last hot food 45 min before closing.', 'https://www.londonelstree.com/cafe', 'The Aerodrome Cafe|09:00–17:00 daily'],
        ['school', 'yes', 'Several flying schools on site.', 'https://www.londonelstree.com/'],
        ['maint', 'yes', 'Aircraft maintenance on site.', 'https://www.londonelstree.com/'],
        ['hangar', 'yes', 'Limited hangarage and apron parking.', 'https://www.londonelstree.com/pilots'],
        ['parking', 'yes', 'No charge for day parking (aircraft). Car park: free 1 h, then £1/h.', 'https://www.londonelstree.com/visitors'],
        ['overnight', 'yes', 'Single-engine fixed wing £29 + VAT (£34.80) per night.', 'https://www.londonelstree.com/_files/ugd/4e7dd5_9599a8a67d074008b551392ea596645a.pdf'],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['transport', 'unk', '', A]
      ],
      landing: { pub: true, vt: 'inc. VAT', sep: '£24', sepNote: 'fixed wing up to 1,500 kg (£20 + VAT)', micro: '', vat: 'Inc. VAT (£20 ex VAT).',
        extra: ['1,501–2,000 kg £37.20 inc. VAT.'],
        src: 'https://www.londonelstree.com/_files/ugd/4e7dd5_9599a8a67d074008b551392ea596645a.pdf', srcLabel: 'Schedule of fees from 1 Oct 2026 (PDF)' }
    },
    EGTF: {
      fac: [
        ['cafe', 'yes', 'Hangar Café: Mon–Fri 08:00–16:00, Sat 09:00–16:00, Sun 10:00–16:00. Terrace over the runway.', 'https://fairoaksairport.uk/welcome/', 'Hangar Café|Mon–Fri 08:00–16:00 · Sat 09:00–16:00 · Sun 10:00–16:00'],
        ['hangar', 'yes', 'Limited hangar space for visiting aircraft.', A],
        ['parking', 'yes', 'Free on the day of arrival.', 'https://fairoaksairport.uk/parking-and-hangarage/'],
        ['overnight', 'yes', 'Under 2,500 kg £50 + VAT (£60) per night.', 'https://fairoaksairport.uk/wp-content/uploads/NEW-PRICE-LIST-FROM-APRIL-2026.pdf'],
        ['transport', 'yes', 'Taxi rank at Woking station, about 10 min by taxi.', 'https://fairoaksairport.uk/welcome/'],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['school', 'unk', '', ''], ['maint', 'unk', '', A]
      ],
      landing: { pub: true, vt: 'inc. VAT', micro: '£27.60', microNote: 'under 999 kg (£23 + VAT)', sep: '£42', sepNote: '1,000–1,499 kg (£35 + VAT)', vat: 'Inc. VAT; ex-VAT prices also listed.',
        extra: ['Visitor rates by weight. Under 999 kg covers most microlights.'],
        src: 'https://fairoaksairport.uk/wp-content/uploads/NEW-PRICE-LIST-FROM-APRIL-2026.pdf', srcLabel: 'Price list from 1 Apr 2026 (PDF)' }
    },
    EGTC: {
      fac: [
        ['cafe', 'yes', 'Café on site. Hotel on the aerodrome.', A, 'On site|Hours not published'],
        ['transport', 'yes', 'Taxi, hire car and chauffeur on request.', A],
        ['parking', 'yes', 'Charged from the moment you stop. No free period. Not charged if you only refuel.', 'https://londoncranfieldairport.co.uk/wp-content/uploads/2026/10/Schedule-of-Fees-October-2026-visiting-aircraft.pdf'],
        ['overnight', 'yes', 'Single engine £25 + VAT per 24 h.', 'https://londoncranfieldairport.co.uk/wp-content/uploads/2026/10/Schedule-of-Fees-October-2026-visiting-aircraft.pdf'],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['school', 'unk', '', ''], ['maint', 'unk', '', A], ['hangar', 'unk', '', A]
      ],
      landing: { pub: true, sep: '£27 + VAT', sepNote: 'single engine under 2,700 kg', micro: '', vat: 'Plus VAT.',
        tg: 'Touch-and-go / circuit: £13.50 + VAT (single engine).',
        extra: ['Instrument approach £30 + VAT (single engine).'],
        src: 'https://londoncranfieldairport.co.uk/wp-content/uploads/2026/10/Schedule-of-Fees-October-2026-visiting-aircraft.pdf', srcLabel: 'Schedule of fees, Oct 2026 (PDF)' }
    },
    EGGW: {
      fac: [
        ['cafe', 'yes', 'Restaurants (airport). Hotel at the airport.', A, 'Restaurants|Hours not published'],
        ['maint', 'yes', 'Repairs by arrangement with local companies.', A],
        ['hangar', 'yes', 'By arrangement with based companies.', A],
        ['transport', 'yes', 'DART to Luton Airport Parkway, buses, taxis.', A],
        ['parking', 'yes', 'Free for 15 min, then charged per tonne per minute.', 'https://eu-assets.contentstack.com/v3/assets/blt4d5e17844b60f82b/blt6aa5ba62affc8f2a/6a3e39e5033cbc1aa59fe018/Charges_and_Conditions_of_Use_2026_V7.pdf'],
        ['toilets', 'unk', '', ''], ['shop', 'unk', '', ''], ['school', 'unk', '', ''], ['overnight', 'unk', '', '']
      ],
      landing: { pub: true, vt: 'plus nav charge, handling', sep: 'min £803.96', sepNote: 'GA non-Chapter 14 landing charge', micro: '', vat: 'VAT not stated.',
        extra: ['Plus navigation charge, minimum £576.49 per landing.', 'Handling agent mandatory (extra).'],
        src: 'https://eu-assets.contentstack.com/v3/assets/blt4d5e17844b60f82b/blt6aa5ba62affc8f2a/6a3e39e5033cbc1aa59fe018/Charges_and_Conditions_of_Use_2026_V7.pdf', srcLabel: 'Charges & Conditions of Use 2026 (PDF)' }
    }
  };
  Object.keys(F).forEach(k => {
    const d = AIRFIELD_DETAIL[k]; if (!d) return;
    d.facilities = F[k].fac.map(x => ({ k: x[0], s: x[1], t: x[2], src: x[3], short: x[4] || '' }));
    d.landing = Object.assign({ checked: '3 Nov 2026' }, F[k].landing);
    if (F[k].notice) d.notice = F[k].notice;
  });
})();
