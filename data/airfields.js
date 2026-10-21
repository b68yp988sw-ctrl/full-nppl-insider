/* Saved airfield quick cards — study aid only. Public teaching figures; always confirm AIP/PPR. */
const AIRFIELDS_SEED = [
  {
    "id": "egtb",
    "icao": "EGTB",
    "name": "Wycombe Air Park (Booker)",
    "area": "Bucks / Chilterns",
    "freqs": {
      "afis": "126.725",
      "atis": "",
      "other": "Also check published A/G or other as AIP; Safetycom 135.480 if applicable for unmanned ops elsewhere"
    },
    "runway": "06/24 asphalt + grass available as published — confirm TODA/LDA, which surface in use, microlight suitability",
    "ppr": "PPR typical — phone/online as published on airfield/AIP notes",
    "notes": "Busy training environment. Class G with London TMA above — know the base. Confirm ATZ procedures, noise abatement, and circuit direction from current AIP AD. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm LH/RH and heights from current AIP — do not rely on memory",
    "tags": "booker wycombe bucks chilterns"
  },
  {
    "id": "egld",
    "icao": "EGLD",
    "name": "Denham",
    "area": "Bucks / Chilterns fringe",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "A/G 130.725 (confirm current AIP) — service type can change; verify before flight"
    },
    "runway": "Asphalt — confirm published length/surface and microlight acceptance",
    "ppr": "PPR often required — confirm current procedure by phone/web",
    "notes": "Under London TMA. Strict height/route awareness. Confirm VRPs and local procedures from AIP. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm published circuit and noise — study aid only",
    "tags": "denham bucks london tma"
  },
  {
    "id": "egtr",
    "icao": "EGTR",
    "name": "Elstree",
    "area": "Herts / Chilterns approach",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "A/G / published 122.400 — confirm service type and currency in AIP"
    },
    "runway": "Asphalt — confirm plate length and microlight acceptance",
    "ppr": "PPR / booking as published",
    "notes": "Busy circuit. London TMA overhead — know the base. Confirm local joins and noise. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm AIP circuit direction/heights",
    "tags": "elstree herts chilterns"
  },
  {
    "id": "eglm",
    "icao": "EGLM",
    "name": "White Waltham",
    "area": "Berks / Thames Valley",
    "freqs": {
      "afis": "122.600",
      "atis": "",
      "other": "Confirm current AFIS/A-G designation in AIP"
    },
    "runway": "Multiple grass — confirm which in use, soft-ground limits, TODA/LDA",
    "ppr": "PPR typical for visitors — phone as published",
    "notes": "Historic grass aerodrome. Soft after rain. Confirm circuits and noise abatement. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm published circuits for runway in use",
    "tags": "white waltham grass berkshire"
  },
  {
    "id": "egtf",
    "icao": "EGTF",
    "name": "Fairoaks",
    "area": "Surrey",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Published ~123.430 — confirm service type/currency in AIP"
    },
    "runway": "Asphalt — confirm plate and microlight policy",
    "ppr": "PPR as published",
    "notes": "Near London controlled airspace. Plan altitudes carefully. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm AIP",
    "tags": "fairoaks surrey"
  },
  {
    "id": "eghp",
    "icao": "EGHP",
    "name": "Popham",
    "area": "Hants",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "A/G or Safetycom as published — confirm current frequency and limits"
    },
    "runway": "Grass strips — soft ground; microlight-friendly context; confirm TODA and runway in use",
    "ppr": "PPR / events can close areas — check NOTAM & airfield site",
    "notes": "Popular microlight / light aircraft destination. Confirm runway in use and radio. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Confirm local circuit and noise",
    "tags": "popham microlight grass hants"
  },
  {
    "id": "turweston",
    "icao": "EGBT",
    "name": "Turweston",
    "area": "Northants / Bucks border",
    "freqs": {
      "afis": "",
      "atis": "",
      "other": "Published ~122.180 — confirm service type/currency"
    },
    "runway": "Asphalt — confirm plate, microlight acceptance & hours",
    "ppr": "PPR as published",
    "notes": "Useful for northern Bucks / Northants navs. Confirm fuel & hours. Confirm with PPR / instructor before flight — study aid only.",
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
    "notes": "Parachuting and other activity — brief NOTAMs and local procedures carefully. Confirm with PPR / instructor before flight — study aid only. Do not invent military/restricted ops details.",
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
    "notes": "Gliding heritage — lookout for gliders & winch cables. Confirm status. Confirm with PPR / instructor before flight — study aid only.",
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
    "notes": "ADD YOUR NOTES — no reliable public AIP card for private strips. Edit this card with real freqs, runway and PPR from your instructor / operator. Do not assume public access. Confirm with PPR / instructor before flight — study aid only.",
    "circuit": "Add your notes",
    "tags": "amersham chilterns bucks local strip private",
    "private": true
  }
];
const AIRFIELDS_META = {
  "disclaimer": "Study aid only — frequencies, PPR, runways and notes change. Confirm with PPR / instructor before flight — study aid only. Confirm AIP / airfield plates / phone PPR / NOTAMs. Not affiliated with any flying school. Seed cards use publicly discussed teaching figures where available; private strips need your own notes. Do not invent military/restricted ops details.",
  "storageKey": "full-nppl-airfields-v2"
};
if (typeof globalThis !== 'undefined') { globalThis.AIRFIELDS_SEED = AIRFIELDS_SEED; globalThis.AIRFIELDS_META = AIRFIELDS_META; }
