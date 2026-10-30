/* Saved airfield quick cards — study aid only. Check current AIP/website and get PPR before flying. */
const AIRFIELDS_SEED = [
  {
    "id": "egtb",
    "icao": "EGTB",
    "name": "Wycombe Air Park (Booker)",
    "area": "Bucks / Chilterns",
    "freqs": {
      "afis": "Wycombe Radio 126.555",
      "atis": "",
      "other": ""
    },
    "runway": "06/24 asphalt 730 m; 06G/24G grass 631 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Busy training aerodrome under the London TMA — know the base. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "booker wycombe bucks chilterns",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egld",
    "icao": "EGLD",
    "name": "Denham",
    "area": "Bucks / Chilterns fringe",
    "freqs": {
      "afis": "Denham Radio 130.730",
      "atis": "",
      "other": ""
    },
    "runway": "06/24 asphalt 775 m; 12/30 grass 546 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Close to London controlled airspace — strict height and route discipline. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "denham bucks london tma",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egtr",
    "icao": "EGTR",
    "name": "Elstree",
    "area": "Herts",
    "freqs": {
      "afis": "Elstree Information (AFIS) / Elstree Radio 122.405",
      "atis": "",
      "other": ""
    },
    "runway": "08/26 asphalt 651 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Busy circuit with the London TMA overhead. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "elstree herts",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "eglm",
    "icao": "EGLM",
    "name": "White Waltham",
    "area": "Berks / Thames Valley",
    "freqs": {
      "afis": "Waltham Radio 122.605",
      "atis": "",
      "other": ""
    },
    "runway": "Grass: 03/21 1029 m; 07L/25R 1116 m; 07R/25L 785 m; 11/29 930 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Large grass aerodrome — can be soft after rain. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "white waltham grass berkshire",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egtf",
    "icao": "EGTF",
    "name": "Fairoaks",
    "area": "Surrey",
    "freqs": {
      "afis": "Fairoaks Radio 123.430",
      "atis": "",
      "other": ""
    },
    "runway": "06/24 asphalt 810 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Near London controlled airspace — plan altitudes carefully. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "fairoaks surrey",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "eghp",
    "icao": "EGHP",
    "name": "Popham",
    "area": "Hants",
    "freqs": {
      "afis": "Popham A/G 129.805",
      "atis": "",
      "other": ""
    },
    "runway": "Grass 08/26 and 03/21 (03/21 only on some dates)",
    "ppr": "PPR — see airfield website",
    "notes": "Popular microlight destination. Not in the UK AIP — figures from the airfield website. Source: airfield website (popham-airfield.co.uk). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "popham microlight grass hants",
    "source": "airfield website (popham-airfield.co.uk)"
  },
  {
    "id": "turweston",
    "icao": "EGBT",
    "name": "Turweston",
    "area": "Northants / Bucks border",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Not verified here — check the current frequency on the airfield website/AIP"
    },
    "runway": "Asphalt — confirm plate, microlight acceptance & hours",
    "ppr": "PPR as published",
    "notes": "Useful for northern Bucks / Northants navs. Confirm fuel & hours. Confirm with PPR / instructor before flight — study aid only. Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm AIP",
    "tags": "turweston northants bucks"
  },
  {
    "id": "hinton",
    "icao": "",
    "name": "Hinton-in-the-Hedges",
    "area": "Northants",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Confirm A/G / Safetycom — activity-dependent"
    },
    "runway": "Confirm surface & length for your type",
    "ppr": "PPR essential — parachuting / other activity common",
    "notes": "Parachuting and other activity — brief NOTAMs and local procedures carefully. Confirm with PPR / instructor before flight — study aid only. Do not invent military/restricted ops details. Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm with operator",
    "tags": "hinton hedges parachute northants"
  },
  {
    "id": "bicester",
    "icao": "EGDD",
    "name": "Bicester",
    "area": "Oxon",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Confirm current radio / service — gliding activity context"
    },
    "runway": "Grass / historic — confirm microlight ops & gliding activity",
    "ppr": "PPR / activity brief essential",
    "notes": "Gliding heritage — lookout for gliders & winch cables. Confirm status. Confirm with PPR / instructor before flight — study aid only. Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm with operator / AIP notes",
    "tags": "bicester oxfordshire gliding"
  },
  {
    "id": "amersham-local",
    "icao": "",
    "name": "Local strip (Amersham / Chilterns area)",
    "area": "Bucks / Chilterns",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Add your notes — Safetycom 135.480 / local as briefed by operator"
    },
    "runway": "Private / farm strip — add length, surface, slope, livestock notes from your operator",
    "ppr": "Always PPR with strip operator",
    "notes": "ADD YOUR NOTES — no reliable public AIP card for private strips. Edit this card with real freqs, runway and PPR from your instructor / operator. Do not assume public access. Confirm with PPR / instructor before flight — study aid only. Check current AIP/website and get PPR before flying.",
    "circuit": "Add your notes",
    "tags": "amersham chilterns bucks local strip private",
    "private": true
  },
  {
    "id": "egbk",
    "icao": "EGBK",
    "name": "Sywell (Northampton)",
    "area": "Northants",
    "freqs": {
      "afis": "Sywell Radio/Traffic 122.705",
      "atis": "",
      "other": ""
    },
    "runway": "03L/21R concrete 1258 m; grass 03R/21L 671 m, 14/32 799 m, 05/23 602 m",
    "ppr": "Strictly PPR online; check visitor days/hours on the website",
    "notes": "Microlight training on site. Source: airfield website (sywellaerodrome.co.uk). Check current AIP/website and get PPR before flying.",
    "circuit": "Circuits 1000 ft QFE; overhead join 2000 ft QFE (airfield website)",
    "tags": "sywell northampton microlight",
    "source": "airfield website (sywellaerodrome.co.uk)"
  },
  {
    "id": "egls",
    "icao": "EGLS",
    "name": "Old Sarum",
    "area": "Wilts",
    "freqs": {
      "afis": "Old Sarum Radio 123.205",
      "atis": "",
      "other": "Boscombe Zone 126.705 (aerodrome is inside the Boscombe Down/Middle Wallop CMATZ)"
    },
    "runway": "06/24 grass 781 m",
    "ppr": "PPR by email at least 48 h ahead",
    "notes": "Non-radio aircraft not accepted. Inside a CMATZ — call Boscombe Zone first. No overhead joins. Source: airfield website + NATS frequency card. Check current AIP/website and get PPR before flying.",
    "circuit": "Circuits to the south (06 RH, 24 LH); join via the Alderbury VRP (airfield website)",
    "tags": "old sarum salisbury wiltshire grass",
    "source": "airfield website + NATS frequency card"
  },
  {
    "id": "egha",
    "icao": "EGHA",
    "name": "Compton Abbas",
    "area": "Dorset",
    "freqs": {
      "afis": "Compton Radio 122.710",
      "atis": "",
      "other": ""
    },
    "runway": "08/26 grass 799 m; elevation 811 ft",
    "ppr": "PPR by phone or website",
    "notes": "Hilltop grass aerodrome — allow for the elevation and turbulence. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Circuit 1800 ft QNH; overhead join 2800 ft QNH",
    "tags": "compton abbas dorset grass microlight",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egml",
    "icao": "EGML",
    "name": "Damyns Hall (Upminster)",
    "area": "Essex",
    "freqs": {
      "afis": "Hornchurch Traffic 119.555",
      "atis": "",
      "other": ""
    },
    "runway": "Grass 03/21 (14/32 for based aircraft only)",
    "ppr": "PPR — see airfield website",
    "notes": "Unlicensed grass airfield close to London controlled airspace. Source: airfield website + NATS frequency card. Check current AIP/website and get PPR before flying.",
    "circuit": "Overhead join 1400 ft QNH (airfield website)",
    "tags": "damyns hall upminster essex grass",
    "source": "airfield website + NATS frequency card"
  },
  {
    "id": "egfh",
    "icao": "EGFH",
    "name": "Swansea",
    "area": "South Wales (Gower)",
    "freqs": {
      "afis": "Swansea Radio 119.705",
      "atis": "",
      "other": ""
    },
    "runway": "04/22 concrete 1351 m; 10/28 asphalt 857 m",
    "ppr": "PPR required",
    "notes": "Non-radio aircraft not accepted. Parachuting takes place. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "swansea gower wales",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egfe",
    "icao": "EGFE",
    "name": "Haverfordwest",
    "area": "South Wales (Pembrokeshire)",
    "freqs": {
      "afis": "Haverfordwest Radio 123.605",
      "atis": "",
      "other": ""
    },
    "runway": "03/21 asphalt 1486 m; 09/27 asphalt 1035 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "haverfordwest pembrokeshire wales withybush",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egff",
    "icao": "EGFF",
    "name": "Cardiff",
    "area": "South Wales",
    "freqs": {
      "afis": "Cardiff Approach 119.155",
      "atis": "Cardiff Information 132.480",
      "other": "Tower 133.105; Radar 125.855"
    },
    "runway": "12/30 asphalt 2354 m",
    "ppr": "PPR/handling — check fees",
    "notes": "Class D controlled airspace and commercial traffic; usually not a practical microlight stop (handling fees). Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "cardiff rhoose wales class d",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egcw",
    "icao": "EGCW",
    "name": "Welshpool (Mid Wales)",
    "area": "Mid Wales",
    "freqs": {
      "afis": "Welshpool Radio 128.005",
      "atis": "",
      "other": ""
    },
    "runway": "04/22 asphalt 1020 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Hills around — check weather and terrain. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "welshpool mid wales",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egtn",
    "icao": "EGTN",
    "name": "Enstone",
    "area": "Oxon",
    "freqs": {
      "afis": "Enstone Radio 129.880 (blind calls 'Enstone Traffic' if unanswered)",
      "atis": "",
      "other": ""
    },
    "runway": "08/26 hard 1100 m; grass strip 08/26 south side",
    "ppr": "PPR by phone or online form",
    "notes": "Not in the UK AIP — figures from the airfield website. Source: airfield website (enstoneaerodrome.co.uk). Check current AIP/website and get PPR before flying.",
    "circuit": "Circuits to the north at 800 ft AGL (airfield website)",
    "tags": "enstone oxfordshire microlight",
    "source": "airfield website (enstoneaerodrome.co.uk)"
  },
  {
    "id": "egho",
    "icao": "EGHO",
    "name": "Thruxton",
    "area": "Hants",
    "freqs": {
      "afis": "Thruxton Radio 118.280",
      "atis": "",
      "other": ""
    },
    "runway": "07/25 asphalt 969 m; 12/30 grass 757 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Motor racing circuit on site. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "thruxton andover hampshire",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "eghf",
    "icao": "EGHF",
    "name": "Solent (Lee-on-Solent)",
    "area": "Hants",
    "freqs": {
      "afis": "Lee Information (AFIS) 118.930",
      "atis": "",
      "other": ""
    },
    "runway": "05/23 asphalt 1176 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Close to the Solent CTA — check the airspace base. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "solent lee-on-solent hampshire",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "eghr",
    "icao": "EGHR",
    "name": "Chichester/Goodwood",
    "area": "West Sussex",
    "freqs": {
      "afis": "Goodwood Information (AFIS) / Goodwood Radio 122.455",
      "atis": "",
      "other": ""
    },
    "runway": "Grass: 06/24 855 m; 10/28 700 m; 14/32 1262 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Motor racing circuit around the aerodrome. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "goodwood chichester sussex grass",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egka",
    "icao": "EGKA",
    "name": "Shoreham (Brighton City)",
    "area": "West Sussex",
    "freqs": {
      "afis": "Shoreham Approach/Tower 123.155",
      "atis": "Shoreham Information 130.980",
      "other": ""
    },
    "runway": "02/20 asphalt 1031 m; grass 02G/20G 602 m, 06/24 548 m, 13/31 536 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "shoreham brighton sussex",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egkr",
    "icao": "EGKR",
    "name": "Redhill",
    "area": "Surrey",
    "freqs": {
      "afis": "Redhill Tower 119.605",
      "atis": "Redhill Information 125.305",
      "other": ""
    },
    "runway": "Grass: 07L/25R 683 m; 07R/25L 897 m; 18/36 851 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Under the London TMA and close to Gatwick — know the base. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "redhill surrey grass",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egkh",
    "icao": "EGKH",
    "name": "Headcorn (Lashenden)",
    "area": "Kent",
    "freqs": {
      "afis": "Headcorn Radio 122.210",
      "atis": "",
      "other": ""
    },
    "runway": "10/28 grass 1250 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Parachuting is common — check NOTAMs. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "headcorn lashenden kent grass parachute",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egmd",
    "icao": "EGMD",
    "name": "Lydd (London Ashford)",
    "area": "Kent",
    "freqs": {
      "afis": "Lydd Approach 120.705",
      "atis": "Lydd Information 129.230",
      "other": "Tower 119.380"
    },
    "runway": "03/21 asphalt 1505 m",
    "ppr": "PPR/handling — check fees",
    "notes": "Danger areas nearby (ranges) — check status. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "lydd ashford kent",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egbp",
    "icao": "EGBP",
    "name": "Kemble (Cotswold)",
    "area": "Glos / Wilts",
    "freqs": {
      "afis": "Kemble Information (AFIS) 118.430",
      "atis": "",
      "other": ""
    },
    "runway": "08/26 asphalt 1972 m; 08G/26G grass 561 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "kemble cotswold gloucestershire",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egbj",
    "icao": "EGBJ",
    "name": "Gloucestershire (Staverton)",
    "area": "Glos",
    "freqs": {
      "afis": "Gloster Approach 128.555",
      "atis": "Gloster Information 127.480",
      "other": "Tower 122.905; Radar 120.980"
    },
    "runway": "08/26 asphalt 1432 m; 03/21 asphalt 980 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Busy ATC aerodrome. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "gloucestershire staverton gloster",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  },
  {
    "id": "egtu",
    "icao": "EGTU",
    "name": "Dunkeswell",
    "area": "Devon",
    "freqs": {
      "afis": "Dunkeswell Radio 123.480",
      "atis": "",
      "other": ""
    },
    "runway": "04/22 asphalt 967 m",
    "ppr": "PPR as published by the airfield",
    "notes": "Parachuting takes place. Source: UK AIP AD 2 (AIRAC 29 Oct 2026). Check current AIP/website and get PPR before flying.",
    "circuit": "Confirm circuit direction and heights from the current AIP/airfield website.",
    "tags": "dunkeswell devon",
    "source": "UK AIP AD 2 (AIRAC 29 Oct 2026)"
  }
];
const AIRFIELDS_META = {
  "disclaimer": "Study aid only — frequencies, PPR, runways and notes change. Check current AIP/website and get PPR before every flight, and check NOTAMs. Cards marked UK AIP were checked against the UK AIP AD 2 pages (AIRAC 29 Oct 2026); others come from the airfield website. Blank fields mean not verified. Not affiliated with any flying school.",
  "storageKey": "full-nppl-airfields-v3",
  "seedVersion": 2,
  "legacyKeys": [
    "full-nppl-airfields-v2",
    "full-nppl-airfields-v1"
  ],
  "pprNote": "Check current AIP/website and get PPR before flying."
};
if (typeof globalThis !== "undefined") { globalThis.AIRFIELDS_SEED = AIRFIELDS_SEED; globalThis.AIRFIELDS_META = AIRFIELDS_META; }
