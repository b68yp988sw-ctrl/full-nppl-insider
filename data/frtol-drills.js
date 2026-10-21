/* FRTOL / CAP 413-style listen-and-reply scenarios — ORIGINAL study aid */
const FRTOL_DRILLS = {
  "meta": {
    "title": "FRTOL listen-and-reply scenarios",
    "disclaimer": "Study aid only — CAP 413-style UK English teaching examples for FRTOL / RT practice. Not the official phraseology manual. Confirm current CAP 413, local procedures and instructor. Readbacks and unit practices vary. Self-score is for practice, not an examiner verdict."
  },
  "categories": [
    {
      "id": "join",
      "label": "Join"
    },
    {
      "id": "circuit",
      "label": "Circuit"
    },
    {
      "id": "ga",
      "label": "GA / en-route"
    },
    {
      "id": "fis",
      "label": "FIS"
    },
    {
      "id": "units",
      "label": "AGCS / AFIS / ATC"
    },
    {
      "id": "atz",
      "label": "ATZ"
    },
    {
      "id": "matz",
      "label": "MATZ"
    },
    {
      "id": "zone",
      "label": "Zone transit"
    },
    {
      "id": "land",
      "label": "Full land"
    },
    {
      "id": "goaround",
      "label": "Go-around"
    },
    {
      "id": "emergency",
      "label": "Mayday / Pan"
    },
    {
      "id": "route",
      "label": "FRTOL route"
    },
    {
      "id": "ssl22",
      "label": "Leaflet scenarios"
    }
  ],
  "drills": [
    {
      "id": "join-01",
      "cat": "join",
      "prompt": "You are G-ABCD, a C42, 5 NM south of Greendale, requesting join for runway 22. Give a standard inbound call (A/G or Information style teaching).",
      "hints": [
        "Who you are",
        "Where you are",
        "What you want",
        "POB if taught"
      ],
      "model": "Greendale Radio, G-ABCD, C42, 5 miles south, request join for runway 22, 2 POB",
      "notes": "Order and exact words follow CAP 413 / local. Some fields want Information / Tower.",
      "speakModel": "Greendale Radio, Golf Alpha Bravo Charlie Delta, C 42, 5 miles south, request join for runway 22, 2 persons on board.",
      "listenFirst": false
    },
    {
      "id": "join-02",
      "cat": "join",
      "prompt": "AFIS says: join overhead, runway 22, QFE 1012, report overhead. Give a correct readback.",
      "hints": [
        "Callsign",
        "Join",
        "Runway",
        "QFE",
        "Report"
      ],
      "model": "Join overhead, runway 22, QFE 1012, wilco, G-CD",
      "notes": "Read back safety-critical items. Abbreviated callsign only when appropriate.",
      "speakModel": "Join overhead, runway 22, Q F E 1012, wilco, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, join overhead, runway 22, Q F E 1012, report overhead."
    },
    {
      "id": "join-03",
      "cat": "join",
      "prompt": "Tower: G-ABCD, join left base runway 06, QNH 1015, report base. Readback?",
      "hints": [
        "Join",
        "Runway",
        "QNH",
        "Report"
      ],
      "model": "Join left base runway 06, QNH 1015, wilco, G-ABCD",
      "notes": "ATC join clearances need accurate readback before you manoeuvre into the ATZ/circuit.",
      "speakModel": "Join left base runway 06, Q N H 1015, wilco, Golf Alpha Bravo Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Alpha Bravo Charlie Delta, join left base runway 06, Q N H 1015, report base."
    },
    {
      "id": "circuit-01",
      "cat": "circuit",
      "prompt": "Downwind call for runway 04, G-ABCD, touch-and-go intended.",
      "hints": [
        "Downwind",
        "Runway",
        "Intentions"
      ],
      "model": "G-ABCD, downwind runway 04, touch and go",
      "notes": "Some units want position + intentions. Keep it concise.",
      "speakModel": "Golf Alpha Bravo Charlie Delta, downwind runway 04, touch and go.",
      "listenFirst": false
    },
    {
      "id": "circuit-02",
      "cat": "circuit",
      "prompt": "You are late downwind and need to extend for spacing. Teaching call?",
      "hints": [
        "Extend downwind"
      ],
      "model": "G-CD, extending downwind",
      "notes": "Lookout first. Radio second.",
      "speakModel": "Golf Charlie Delta, extending downwind.",
      "listenFirst": false
    },
    {
      "id": "circuit-03",
      "cat": "circuit",
      "prompt": "Final call, runway 22, G-ABCD, full stop.",
      "hints": [
        "Final",
        "Runway",
        "Intentions"
      ],
      "model": "G-ABCD, final runway 22, land",
      "notes": "Some schools say full stop. Match examiner/instructor expectations.",
      "speakModel": "Golf Alpha Bravo Charlie Delta, final runway 22, land.",
      "listenFirst": false
    },
    {
      "id": "circuit-04",
      "cat": "circuit",
      "prompt": "AFIS: G-CD, one ahead on final, report final. Acknowledge teaching reply?",
      "hints": [
        "Wilco / report"
      ],
      "model": "Wilco, G-CD",
      "notes": "Traffic information is not a clearance. Keep looking.",
      "speakModel": "Wilco, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, one ahead on final, report final."
    },
    {
      "id": "ga-01",
      "cat": "ga",
      "prompt": "Freecall Farnborough Radar for Basic Service: G-CMVD, C42, Wycombe to White Waltham, north of Marlow, 2000 ft QNH 1015, VFR.",
      "hints": [
        "Station",
        "Request",
        "Then pass message"
      ],
      "model": "Farnborough Radar, G-CMVD, request Basic Service. (When invited) G-CMVD, C42, from Wycombe to White Waltham, north of Marlow, 2000 feet QNH 1015, VFR, request Basic Service",
      "notes": "Short first call; details when invited.",
      "speakModel": "Farnborough Radar, Golf Charlie Mike Victor Delta, request Basic Service.",
      "listenFirst": false
    },
    {
      "id": "ga-02",
      "cat": "ga",
      "prompt": "Radar: G-VD, Basic Service, squawk 0430, QNH 1014. Readback?",
      "hints": [
        "Service",
        "Squawk",
        "QNH"
      ],
      "model": "Basic Service, squawk 0430, QNH 1014, G-VD",
      "notes": "Set the squawk, set QNH, then continue.",
      "speakModel": "Basic Service, squawk 0430, Q N H 1014, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, Basic Service, squawk 0430, Q N H 1014."
    },
    {
      "id": "fis-01",
      "cat": "fis",
      "prompt": "You want a Traffic Service (UK FIS teaching). Opening request idea?",
      "hints": [
        "Station",
        "Callsign",
        "Request Traffic Service"
      ],
      "model": "Wessex Radar, G-ABCD, request Traffic Service",
      "notes": "Know the differences between Basic / Traffic / Deconfliction / Procedural as currently taught.",
      "speakModel": "Wessex Radar, Golf Alpha Bravo Charlie Delta, request Traffic Service.",
      "listenFirst": false
    },
    {
      "id": "fis-02",
      "cat": "fis",
      "prompt": "Controller: G-CD, Traffic Service, limited traffic information, squawk 7401. Readback essence?",
      "hints": [
        "Service",
        "Limitation if required",
        "Squawk"
      ],
      "model": "Traffic Service, squawk 7401, G-CD",
      "notes": "Limitations mean lookout remains critical.",
      "speakModel": "Traffic Service, squawk 7401, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, Traffic Service, limited traffic information, squawk 7401."
    },
    {
      "id": "units-01",
      "cat": "units",
      "prompt": "At an AGCS field, the operator says: runway 22 in use, QFE 1008, no known traffic. Do you have a clearance to land?",
      "hints": [
        "Clearance vs information"
      ],
      "model": "No — AGCS gives information, not ATC clearances. Landing decision is yours.",
      "notes": "AGCS cannot clear you. Integrate safely and continue lookout.",
      "speakModel": "No. Air ground gives information, not a landing clearance. Decision remains with the pilot.",
      "listenFirst": false
    },
    {
      "id": "units-02",
      "cat": "units",
      "prompt": "AFIS: land at your discretion, surface wind 240 at 8 knots. Teaching understanding?",
      "hints": [
        "Discretion"
      ],
      "model": "Information only — I may land if safe; decision remains with me. G-CD",
      "notes": "Not a tower clearance. Reply as taught locally.",
      "speakModel": "Land at my discretion, wind 240 at 8 knots, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, land at your discretion, surface wind 240 degrees, 8 knots."
    },
    {
      "id": "units-03",
      "cat": "units",
      "prompt": "ATC: G-ABCD, cleared to land runway 06. Readback?",
      "hints": [
        "Cleared land",
        "Runway"
      ],
      "model": "Cleared to land runway 06, G-ABCD",
      "notes": "Full readback of landing clearance.",
      "speakModel": "Cleared to land runway 06, Golf Alpha Bravo Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Alpha Bravo Charlie Delta, cleared to land runway 06."
    },
    {
      "id": "atz-01",
      "cat": "atz",
      "prompt": "Before entering an ATZ with AFIS, teaching requirement essence?",
      "hints": [
        "Two-way"
      ],
      "model": "Establish two-way communications (or follow published procedure) before entering the ATZ",
      "notes": "Rule 11 teaching. Blind busts are a classic fail.",
      "speakModel": "Establish two-way communications before entering the A T Z, or follow the published procedure.",
      "listenFirst": false
    },
    {
      "id": "atz-02",
      "cat": "atz",
      "prompt": "Inbound call already made; AFIS replies with join instructions. Next?",
      "hints": [
        "Readback",
        "Comply",
        "Lookout"
      ],
      "model": "Read back join/runway/pressure as required, then fly the join with lookout",
      "notes": "Radio confirms the plan; eyes still own the circuit.",
      "speakModel": "Read back the join instructions, then fly the join with a good lookout.",
      "listenFirst": false
    },
    {
      "id": "matz-01",
      "cat": "matz",
      "prompt": "Approaching a MATZ for transit. Teaching opening call?",
      "hints": [
        "Station",
        "Callsign",
        "Request MATZ penetration"
      ],
      "model": "Benson Zone, G-ABCD, request MATZ penetration",
      "notes": "MATZ is not civil CAS, but penetration calls are expected. Watch for civil ATZ inside.",
      "speakModel": "Benson Zone, Golf Alpha Bravo Charlie Delta, request M A T Z penetration.",
      "listenFirst": false
    },
    {
      "id": "matz-02",
      "cat": "matz",
      "prompt": "Military: G-CD, MATZ penetration approved, cross at 1500 feet QNH 1012, report entering. Readback?",
      "hints": [
        "Approved",
        "Level",
        "QNH",
        "Report"
      ],
      "model": "MATZ penetration approved, 1500 feet QNH 1012, wilco, G-CD",
      "notes": "Still avoid the civil ATZ without proper contact if one sits inside.",
      "speakModel": "M A T Z penetration approved, 1500 feet Q N H 1012, wilco, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, M A T Z penetration approved, cross at 1500 feet Q N H 1012, report entering."
    },
    {
      "id": "zone-01",
      "cat": "zone",
      "prompt": "Request Class D zone transit: Midtown Approach, G-ABCD, C42, from Northfield to Southfield, 10 miles north, 2400 ft QNH 1016, VFR, request transit.",
      "hints": [
        "Who",
        "What",
        "Where",
        "Level",
        "Request"
      ],
      "model": "Midtown Approach, G-ABCD, request zone transit. (Then) G-ABCD, C42, Northfield to Southfield, 10 miles north, 2400 feet QNH 1016, VFR, request transit",
      "notes": "Remain clear of Class D until cleared.",
      "speakModel": "Midtown Approach, Golf Alpha Bravo Charlie Delta, request zone transit.",
      "listenFirst": false
    },
    {
      "id": "zone-02",
      "cat": "zone",
      "prompt": "Approach: G-ABCD, cleared to enter controlled airspace, not above 2400 feet, squawk 4521, report aerodrome in sight. Readback?",
      "hints": [
        "Cleared enter",
        "Level",
        "Squawk",
        "Report"
      ],
      "model": "Cleared to enter controlled airspace, not above 2400 feet, squawk 4521, wilco, G-ABCD",
      "notes": "If you cannot comply, say unable before entry.",
      "speakModel": "Cleared to enter controlled airspace, not above 2400 feet, squawk 4521, wilco, Golf Alpha Bravo Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Alpha Bravo Charlie Delta, cleared to enter controlled airspace, not above 2400 feet, squawk 4521, report aerodrome in sight."
    },
    {
      "id": "land-01",
      "cat": "land",
      "prompt": "Final, full stop intended, runway 27, G-ABCD at an AFIS unit.",
      "hints": [
        "Final",
        "Runway",
        "Land"
      ],
      "model": "G-ABCD, final runway 27, land",
      "notes": "Expect land-at-your-discretion style replies at AFIS — still your decision.",
      "speakModel": "Golf Alpha Bravo Charlie Delta, final runway 27, land.",
      "listenFirst": false
    },
    {
      "id": "land-02",
      "cat": "land",
      "prompt": "After landing: vacated runway to the left, G-CD.",
      "hints": [
        "Vacated"
      ],
      "model": "G-CD, runway vacated",
      "notes": "Some units want vacated + taxi intentions. Match local.",
      "speakModel": "Golf Charlie Delta, runway vacated.",
      "listenFirst": false
    },
    {
      "id": "ga-go-01",
      "cat": "goaround",
      "prompt": "Go-around decision on short final — radio after aviate.",
      "hints": [
        "Going around"
      ],
      "model": "G-CD, going around",
      "notes": "Climb, re-configure per checklist, then call.",
      "speakModel": "Golf Charlie Delta, going around.",
      "listenFirst": false
    },
    {
      "id": "ga-go-02",
      "cat": "goaround",
      "prompt": "Tower: G-CD, go around, I say again go around, acknowledge.",
      "hints": [
        "Going around"
      ],
      "model": "Going around, G-CD",
      "notes": "Immediate compliance. Fly first.",
      "speakModel": "Going around, Golf Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Delta, go around, I say again go around, acknowledge."
    },
    {
      "id": "em-01",
      "cat": "emergency",
      "prompt": "Engine rough, need priority but not imminent forced landing. Which prefix?",
      "hints": [
        "Urgency"
      ],
      "model": "PAN PAN, PAN PAN, PAN PAN",
      "notes": "PAN = urgency. MAYDAY = distress.",
      "speakModel": "Pan pan, pan pan, pan pan.",
      "listenFirst": false
    },
    {
      "id": "em-02",
      "cat": "emergency",
      "prompt": "Total engine failure, forced landing imminent. Open with…",
      "hints": [
        "Distress"
      ],
      "model": "MAYDAY, MAYDAY, MAYDAY",
      "notes": "Then station, callsign, nature, position, intentions, POB.",
      "speakModel": "Mayday, mayday, mayday.",
      "listenFirst": false
    },
    {
      "id": "em-03",
      "cat": "emergency",
      "prompt": "Complete MAYDAY: G-ABCD, engine failure, 3 NM west of Greendale, 1500 ft, forced landing in field, 1 POB.",
      "hints": [
        "Structure"
      ],
      "model": "MAYDAY MAYDAY MAYDAY Greendale Radio, G-ABCD, engine failure, 3 miles west of Greendale, 1500 feet, forced landing in a field, 1 POB",
      "notes": "Fly first. Squawk 7700 when able.",
      "speakModel": "Mayday mayday mayday, Greendale Radio, Golf Alpha Bravo Charlie Delta, engine failure, 3 miles west of Greendale, 1500 feet, forced landing in a field, 1 person on board.",
      "listenFirst": false
    },
    {
      "id": "em-04",
      "cat": "emergency",
      "prompt": "You declared PAN; now resolved. Teaching cancellation?",
      "hints": [
        "Cancel PAN"
      ],
      "model": "Greendale Radio, G-CD, cancel PAN PAN, operations normal",
      "notes": "Only when truly resolved.",
      "speakModel": "Greendale Radio, Golf Charlie Delta, cancel pan pan, operations normal.",
      "listenFirst": false
    },
    {
      "id": "em-05",
      "cat": "emergency",
      "prompt": "Radio failure in VMC near a towered field. Actions essence?",
      "hints": [
        "Squawk",
        "Join",
        "Lights"
      ],
      "model": "Squawk 7600, stay VMC, join carefully as published, watch for light signals",
      "notes": "Brief lost-comms before you go.",
      "speakModel": "Squawk 7600, stay V M C, join carefully, watch for light signals.",
      "listenFirst": false
    },
    {
      "id": "route-01",
      "cat": "route",
      "prompt": "ROUTE LEG 1/5 — Start-up at Greendale (AFIS): request taxi for local VFR, information Bravo.",
      "hints": [
        "Taxi",
        "ATIS letter"
      ],
      "model": "Greendale Information, G-ABCD, request taxi for local VFR, Information Bravo",
      "notes": "Route sequence practices a whole flight string. Adapt to real fields with instructor.",
      "speakModel": "Greendale Information, Golf Alpha Bravo Charlie Delta, request taxi for local V F R, Information Bravo.",
      "listenFirst": false
    },
    {
      "id": "route-02",
      "cat": "route",
      "prompt": "ROUTE LEG 2/5 — Holding point runway 22: ready for departure.",
      "hints": [
        "Ready"
      ],
      "model": "G-ABCD, ready for departure",
      "notes": "Expect line-up / take-off information or ATC clearance depending on unit type.",
      "speakModel": "Golf Alpha Bravo Charlie Delta, ready for departure.",
      "listenFirst": false
    },
    {
      "id": "route-03",
      "cat": "route",
      "prompt": "ROUTE LEG 3/5 — Airborne, freecall Midtown Approach for Basic Service climbing through 1500 ft to 2400 ft en-route Vale Field.",
      "hints": [
        "Freecall",
        "Basic Service"
      ],
      "model": "Midtown Approach, G-ABCD, request Basic Service",
      "notes": "Pass message when invited: type, route, level, intentions.",
      "speakModel": "Midtown Approach, Golf Alpha Bravo Charlie Delta, request Basic Service.",
      "listenFirst": false
    },
    {
      "id": "route-04",
      "cat": "route",
      "prompt": "ROUTE LEG 4/5 — Midtown: leave frequency for Vale Radio. Acknowledge and change.",
      "hints": [
        "Frequency change"
      ],
      "model": "Wilco, G-ABCD (then change and check in with Vale)",
      "notes": "Listen on the new frequency before transmitting.",
      "speakModel": "Wilco, Golf Alpha Bravo Charlie Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Alpha Bravo Charlie Delta, frequency change approved, contact Vale Radio on 118.055."
    },
    {
      "id": "route-05",
      "cat": "route",
      "prompt": "ROUTE LEG 5/5 — Vale Radio: 4 miles west, request join, Information Charlie, 2 POB.",
      "hints": [
        "Join inbound"
      ],
      "model": "Vale Radio, G-ABCD, C42, 4 miles west, request join, Information Charlie, 2 POB",
      "notes": "Complete the route with a standard join and full-stop intentions later.",
      "speakModel": "Vale Radio, Golf Alpha Bravo Charlie Delta, C 42, 4 miles west, request join, Information Charlie, 2 persons on board.",
      "listenFirst": false
    },
    {
      "id": "ssl22-01",
      "cat": "ssl22",
      "prompt": "Denham Radio (A/G) has just told you the runway and QFE, plus traffic reported on base. Read back.",
      "hints": [
        "A/G info, roger plus readback"
      ],
      "model": "Roger, runway 24 left-hand, QFE 1009, G-VD",
      "notes": "An A/G station gives information, not instructions. Treat its traffic report as advisory.",
      "speakModel": "Roger, runway two four left hand, Q F E one zero zero nine, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, Denham Radio, runway two four left hand, Q F E one zero zero nine, traffic is a P A twenty-eight reported on base.",
      "source": "ssl22"
    },
    {
      "id": "ssl22-02",
      "cat": "ssl22",
      "prompt": "AFIS: \"Land at your discretion\". Respond correctly.",
      "hints": [
        "Not a clearance"
      ],
      "model": "Landing runway 25, G-VD",
      "notes": "Reply with your intention. Never say \"at my discretion\".",
      "speakModel": "Landing runway two five, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, runway two five, land at your discretion, surface wind two four zero degrees eight knots.",
      "source": "ssl22"
    },
    {
      "id": "ssl22-03",
      "cat": "ssl22",
      "prompt": "Unattended strip \"Chalfont Farm\" on SAFETYCOM: you are downwind right-hand runway 27.",
      "hints": [
        "Name at start and end"
      ],
      "model": "Chalfont Farm Traffic, G-CMVD, downwind right-hand runway 27, Chalfont Farm",
      "notes": "Saying the field name twice helps when nearby strips share 135.480.",
      "speakModel": "Chalfont Farm Traffic, Golf Charlie Mike Victor Delta, downwind right hand runway two seven, Chalfont Farm.",
      "listenFirst": false,
      "source": "ssl22"
    },
    {
      "id": "ssl22-04",
      "cat": "ssl22",
      "prompt": "Farnborough Radar says \"pass your message\". Give the full freecall: C42, Wycombe to Popham, overhead Henley, 2300 ft QNH 1016, VFR, via Basingstoke.",
      "hints": [
        "Callsign · type · from/to · position · alt · VFR · intentions"
      ],
      "model": "G-CMVD, C42, Wycombe to Popham, overhead Henley, altitude 2300 ft QNH 1016, VFR, routing via Basingstoke",
      "notes": "You don’t need to repeat \"request Basic Service\" if it was in your first call.",
      "speakModel": "Golf Charlie Mike Victor Delta, C forty-two, Wycombe to Popham, overhead Henley, altitude two thousand three hundred feet, Q N H one zero one six, V F R, routing via Basingstoke.",
      "listenFirst": true,
      "atcSpeak": "Golf Charlie Mike Victor Delta, Farnborough Radar, pass your message.",
      "source": "ssl22"
    },
    {
      "id": "ssl22-05",
      "cat": "ssl22",
      "prompt": "Radar gives Basic Service and a squawk. Read back.",
      "hints": [
        "Service + squawk, same order"
      ],
      "model": "Basic Service, squawk 4521, G-VD",
      "notes": "Read back in the order given, then set the code with ALT selected.",
      "speakModel": "Basic Service, squawk four five two one, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, Basic Service, squawk four five two one.",
      "source": "ssl22"
    },
    {
      "id": "ssl22-06",
      "cat": "ssl22",
      "prompt": "Transit clearance with conditions and a report point. Read back.",
      "hints": [
        "Clearance + limit + QNH + wilco"
      ],
      "model": "Cleared to cross the zone VFR, not above altitude 2000 ft, QNH 1018, wilco, G-VD",
      "notes": "Read back the clearance and level limit in full. \"Wilco\" covers the future report point.",
      "speakModel": "Cleared to cross the zone V F R, not above altitude two thousand feet, Q N H one zero one eight, wilco, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, cleared to cross the zone V F R, not above altitude two thousand feet, Q N H one zero one eight, report entering the zone.",
      "source": "ssl22"
    },
    {
      "id": "ssl22-07",
      "cat": "ssl22",
      "prompt": "Leaving Farnborough for London Information 124.600. Tell them.",
      "hints": [
        "Leaving + where to"
      ],
      "model": "G-VD, changing to London Information 124.600",
      "notes": "Afterwards, reset 7000 or the right listening squawk, with ALT on.",
      "speakModel": "Golf Victor Delta, changing to London Information one two four decimal six zero zero.",
      "listenFirst": false,
      "source": "ssl22"
    },
    {
      "id": "ssl22-08",
      "cat": "ssl22",
      "prompt": "Losing VMC near Amersham and unsure of position. Make an urgency call to London Centre on 121.5.",
      "hints": [
        "PAN ×3 · station · callsign · type · nature · intentions · position · qual · POB"
      ],
      "model": "PAN PAN ×3, London Centre, G-CMVD, C42, unsure of position, weather deteriorating, request position fix and heading to Wycombe, estimate near Amersham, 1500 ft, heading 090, NPPL microlight pilot no instrument rating, 1 POB",
      "notes": "Squawk 0030, or 7700 if things get worse. Ask early. A radar fix beats guessing.",
      "speakModel": "Pan Pan, Pan Pan, Pan Pan, London Centre, Golf Charlie Mike Victor Delta, C forty-two, unsure of position, weather deteriorating, request position fix and heading to Wycombe, estimate near Amersham, one thousand five hundred feet, heading zero nine zero, N P P L microlight pilot, no instrument rating, one person on board.",
      "listenFirst": false,
      "source": "ssl22"
    },
    {
      "id": "ssl22-09",
      "cat": "ssl22",
      "prompt": "Request a MATZ penetration on your initial call to Benson Zone.",
      "hints": [
        "Station · callsign · request"
      ],
      "model": "Benson Zone, G-CMVD, request Basic Service and MATZ penetration",
      "notes": "Military units may be slow to answer while they work UHF traffic too.",
      "speakModel": "Benson Zone, Golf Charlie Mike Victor Delta, request Basic Service and MATZ penetration.",
      "listenFirst": false,
      "source": "ssl22"
    },
    {
      "id": "ssl22-10",
      "cat": "ssl22",
      "prompt": "ATC: \"number 2, follow the C42 on base\". Reply (traffic in sight).",
      "hints": [
        "Number + traffic in sight"
      ],
      "model": "Number 2, C42 in sight, G-VD",
      "notes": "You must follow the landing order ATC gives you.",
      "speakModel": "Number two, C forty-two in sight, Golf Victor Delta.",
      "listenFirst": true,
      "atcSpeak": "Golf Victor Delta, number two, follow the C forty-two on base.",
      "source": "ssl22"
    }
  ]
};
if (typeof globalThis !== 'undefined') globalThis.FRTOL_DRILLS = FRTOL_DRILLS;
