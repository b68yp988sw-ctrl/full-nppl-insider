/* Signs & signals — ORIGINAL pack */
const SIGNS_SIGNALS = {
  "meta": {
    "title": "Signs & signals / airfield markings",
    "disclaimer": "Original teaching diagrams and wording — not copied from any commercial ground-school product. Confirm local paint/sign standards and AIP with instructor."
  },
  "items": [
    {
      "id": "sg1",
      "title": "Taxiway location sign",
      "hook": "Dark ground = you are on it",
      "meaning": "Yellow letter/number on black background = the taxiway you are on.",
      "diagram": "taxi_loc"
    },
    {
      "id": "sg2",
      "title": "Book-in / fees C sign",
      "hook": "C = come check in",
      "meaning": "Yellow C often marks after-landing book-in / landing fees near tower/ops.",
      "diagram": "c_sign"
    },
    {
      "id": "sg3",
      "title": "Threshold piano keys + designator",
      "hook": "Numbers ≈ magnetic tens",
      "meaning": "Piano keys mark threshold; designator is magnetic heading to nearest 10° (36≈360°).",
      "diagram": "threshold"
    },
    {
      "id": "sg4",
      "title": "Permanently displaced threshold",
      "hook": "Land after the threshold marks",
      "meaning": "Arrows before threshold: take-off/taxi may be OK on that bit; do not land before the threshold.",
      "diagram": "disp_perm"
    },
    {
      "id": "sg5",
      "title": "Closed pavement Xs",
      "hook": "X = closed to all",
      "meaning": "Large Xs: not for any aircraft use (taxi/take-off/landing).",
      "diagram": "closed_x"
    },
    {
      "id": "sg6",
      "title": "Temporary displaced threshold",
      "hook": "X closed; arrows temporary logic",
      "meaning": "Chevrons/arrows for temporary threshold; Xs unusable. Take-off may be allowed on some marked bits; landing is not on the displaced portion — confirm NOTAM.",
      "diagram": "disp_temp"
    },
    {
      "id": "sg7",
      "title": "Orange/white boundary markers",
      "hook": "Candy border = don't cross unfit",
      "meaning": "Orange/white boards/flags: unfit movement area or aerodrome boundary.",
      "diagram": "boundary"
    },
    {
      "id": "sg8",
      "title": "Red-and-yellow chequered flag",
      "hook": "Chequer = ATC watching the apron",
      "meaning": "ATC in operation; apron movement only with ATC permission.",
      "diagram": "chequer"
    }
  ]
};
if (typeof globalThis !== 'undefined') globalThis.SIGNS_SIGNALS = SIGNS_SIGNALS;
