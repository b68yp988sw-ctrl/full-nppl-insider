/* CRP-1 / Nav skills pack — ORIGINAL study drills */
const CRP_DRILLS = {
  "meta": {
    "title": "CRP-1 / Nav skills pack",
    "disclaimer": "Study aid for CRP-1 and nav exam skills. Work on your CRP-1 or calculator, then check. Confirm methods with instructor. Not a substitute for a real whizz-wheel in the exam room if required. Original scenarios — not copied from any commercial paper."
  },
  "categories": [
    {
      "id": "tds",
      "label": "Time / distance / speed"
    },
    {
      "id": "fuel",
      "label": "Fuel"
    },
    {
      "id": "wind",
      "label": "Wind triangle"
    },
    {
      "id": "sixty",
      "label": "One-in-sixty"
    },
    {
      "id": "chart",
      "label": "Chart / legend"
    },
    {
      "id": "alt",
      "label": "QNH / QFE / FL"
    },
    {
      "id": "paper",
      "label": "Nav paper mix"
    }
  ],
  "drills": [
    {
      "id": "tds-01",
      "cat": "tds",
      "q": "Distance 40 NM, GS 80 kt. Time?",
      "choices": [
        "20 min",
        "30 min",
        "40 min",
        "48 min"
      ],
      "ans": 1,
      "exp": "Time min ≈ NM×60÷GS → 40×60÷80 = 30 minutes.",
      "speak": "Time min ≈ NM×60÷GS → 40×60÷80 = 30 minutes."
    },
    {
      "id": "tds-02",
      "cat": "tds",
      "q": "Flown 24 min at 90 kt GS. Distance?",
      "choices": [
        "27 NM",
        "36 NM",
        "40 NM",
        "48 NM"
      ],
      "ans": 1,
      "exp": "NM ≈ GS×min÷60 → 90×24÷60 = 36 NM.",
      "speak": "NM ≈ GS×min÷60 → 90×24÷60 = 36 NM."
    },
    {
      "id": "tds-03",
      "cat": "tds",
      "q": "Need 60 NM in 45 min. GS?",
      "choices": [
        "70",
        "80",
        "90",
        "100"
      ],
      "ans": 1,
      "exp": "GS ≈ NM×60÷min → 60×60÷45 = 80 kt.",
      "speak": "GS ≈ NM×60÷min → 60×60÷45 = 80 kt."
    },
    {
      "id": "tds-04",
      "cat": "tds",
      "q": "Leg 25 NM, GS 100 kt. Time?",
      "choices": [
        "12",
        "15",
        "18",
        "25"
      ],
      "ans": 1,
      "exp": "25×60÷100 = 15 minutes.",
      "speak": "25×60÷100 = 15 minutes."
    },
    {
      "id": "tds-05",
      "cat": "tds",
      "q": "~70 kt GS for 20 min. Distance ≈?",
      "choices": [
        "18",
        "~23",
        "28",
        "35"
      ],
      "ans": 1,
      "exp": "70×20÷60 ≈ 23.3 NM.",
      "speak": "70×20÷60 ≈ 23.3 NM."
    },
    {
      "id": "tds-06",
      "cat": "tds",
      "q": "55 NM remaining, GS 75 kt. Minutes left?",
      "choices": [
        "36",
        "40",
        "44",
        "50"
      ],
      "ans": 2,
      "exp": "55×60÷75 = 44 minutes.",
      "speak": "55×60÷75 = 44 minutes."
    },
    {
      "id": "tds-07",
      "cat": "tds",
      "q": "36 NM at 90 kt. Time?",
      "choices": [
        "18",
        "24",
        "30",
        "36"
      ],
      "ans": 1,
      "exp": "36/90×60 = 24 minutes. Round to whole minutes on the log.",
      "speak": "36/90×60 = 24 minutes. Round to whole minutes on the log."
    },
    {
      "id": "tds-08",
      "cat": "tds",
      "q": "48 NM in 32 min. Required GS?",
      "choices": [
        "80",
        "90",
        "100",
        "120"
      ],
      "ans": 1,
      "exp": "48×60÷32 = 90 kt.",
      "speak": "48×60÷32 = 90 kt."
    },
    {
      "id": "fuel-01",
      "cat": "fuel",
      "q": "Burn 15 L/h, airborne 40 min. Fuel used ≈?",
      "choices": [
        "8",
        "10",
        "12",
        "15"
      ],
      "ans": 1,
      "exp": "15×40÷60 = 10 L.",
      "speak": "15×40÷60 = 10 L."
    },
    {
      "id": "fuel-02",
      "cat": "fuel",
      "q": "18 L at 12 L/h supports?",
      "choices": [
        "1 h",
        "1 h 30",
        "1 h 45",
        "2 h"
      ],
      "ans": 1,
      "exp": "18÷12 = 1.5 h = 90 min.",
      "speak": "18÷12 = 1.5 h = 90 min."
    },
    {
      "id": "fuel-03",
      "cat": "fuel",
      "q": "1 h 20 min at 14 L/h. Trip fuel before contingency ≈?",
      "choices": [
        "14",
        "~18.7",
        "22",
        "28"
      ],
      "ans": 1,
      "exp": "14×80÷60 ≈ 18.7 L.",
      "speak": "14×80÷60 ≈ 18.7 L."
    },
    {
      "id": "fuel-04",
      "cat": "fuel",
      "q": "Usable 50 L at 16 L/h. Endurance no reserve ≈?",
      "choices": [
        "2 h 30",
        "3 h 07",
        "3 h 45",
        "4 h"
      ],
      "ans": 1,
      "exp": "50÷16 ≈ 3.125 h ≈ 3 h 07. Keep reserves.",
      "speak": "50÷16 ≈ 3.125 h ≈ 3 h 07. Keep reserves."
    },
    {
      "id": "fuel-05",
      "cat": "fuel",
      "q": "MOGAS density planning figure often?",
      "choices": [
        "0.5",
        "~0.72 kg/L",
        "1.0",
        "1.25"
      ],
      "ans": 1,
      "exp": "≈0.72 kg/L common planning figure — confirm POH.",
      "speak": "≈0.72 kg/L common planning figure — confirm POH."
    },
    {
      "id": "fuel-06",
      "cat": "fuel",
      "q": "30 L at 0.72 kg/L ≈ mass?",
      "choices": [
        "15",
        "18",
        "21.6",
        "30"
      ],
      "ans": 2,
      "exp": "30×0.72 = 21.6 kg.",
      "speak": "30×0.72 = 21.6 kg."
    },
    {
      "id": "fuel-07",
      "cat": "fuel",
      "q": "Climb 8 L + cruise 22 L + join 3 L + reserve 8 L. Uplift ≥?",
      "choices": [
        "22",
        "41",
        "30",
        "8"
      ],
      "ans": 1,
      "exp": "8+22+3+8=41 L. Round up as taught.",
      "speak": "8+22+3+8=41 L. Round up as taught."
    },
    {
      "id": "wind-01",
      "cat": "wind",
      "q": "Track 090°, wind from 180°/20 kt, TAS 80. Drift mainly?",
      "choices": [
        "Right",
        "Left (port)",
        "Nil",
        "Always into wind"
      ],
      "ans": 1,
      "exp": "Wind from right → drift left. Correct heading into wind.",
      "speak": "Wind from right → drift left. Correct heading into wind."
    },
    {
      "id": "wind-02",
      "cat": "wind",
      "q": "Headwind mainly reduces?",
      "choices": [
        "TAS only",
        "Groundspeed",
        "Fuel density",
        "Variation"
      ],
      "ans": 1,
      "exp": "Headwind reduces GS; heading corrects drift.",
      "speak": "Headwind reduces GS; heading corrects drift."
    },
    {
      "id": "wind-03",
      "cat": "wind",
      "q": "TAS 70, 20 kt direct HW. GS ≈?",
      "choices": [
        "50",
        "70",
        "90",
        "20"
      ],
      "ans": 0,
      "exp": "GS ≈ TAS−HW = 50 kt (direct case).",
      "speak": "GS ≈ TAS−HW = 50 kt (direct case)."
    },
    {
      "id": "wind-04",
      "cat": "wind",
      "q": "CRP-1 wind face typically sets?",
      "choices": [
        "Only QNH",
        "Wind then TAS/course to read HDG & GS",
        "Only fuel SG",
        "SSR"
      ],
      "ans": 1,
      "exp": "Mark wind, set TAS/course, read drift and GS.",
      "speak": "Mark wind, set TAS/course, read drift and GS."
    },
    {
      "id": "wind-05",
      "cat": "wind",
      "q": "~30 kt full crosswind, TAS 90. Drift ≈?",
      "choices": [
        "10°",
        "20°",
        "30°",
        "45°"
      ],
      "ans": 1,
      "exp": "≈30/90 rad ≈ 20°. Confirm on CRP-1.",
      "speak": "≈30/90 rad ≈ 20°. Confirm on CRP-1."
    },
    {
      "id": "wind-06",
      "cat": "wind",
      "q": "Port drift — correct by aiming?",
      "choices": [
        "Further left",
        "Into wind / toward the wind",
        "Reduce QNH",
        "Squawk 7700"
      ],
      "ans": 1,
      "exp": "Apply wind correction angle into wind.",
      "speak": "Apply wind correction angle into wind."
    },
    {
      "id": "sixty-01",
      "cat": "sixty",
      "q": "1 NM offline after 60 NM ≈ track error?",
      "choices": [
        "1°",
        "10°",
        "30°",
        "60°"
      ],
      "ans": 0,
      "exp": "One-in-sixty: ~1° per NM off after 60 NM.",
      "speak": "One-in-sixty: ~1° per NM off after 60 NM."
    },
    {
      "id": "sixty-02",
      "cat": "sixty",
      "q": "6 NM left after 30 NM. Approx TE?",
      "choices": [
        "3°",
        "6°",
        "12°",
        "18°"
      ],
      "ans": 2,
      "exp": "6×60/30 = 12°.",
      "speak": "6×60/30 = 12°."
    },
    {
      "id": "sixty-03",
      "cat": "sixty",
      "q": "3 NM right after 60 NM. TE ≈?",
      "choices": [
        "1°",
        "3°",
        "6°",
        "9°"
      ],
      "ans": 1,
      "exp": "3×60/60 = 3°.",
      "speak": "3×60/60 = 3°."
    },
    {
      "id": "sixty-04",
      "cat": "sixty",
      "q": "Closing angle: 2 NM offline, 20 NM to go ≈?",
      "choices": [
        "3°",
        "6°",
        "12°",
        "2°"
      ],
      "ans": 1,
      "exp": "2×60/20 = 6° closing (teaching).",
      "speak": "2×60/20 = 6° closing (teaching)."
    },
    {
      "id": "sixty-05",
      "cat": "sixty",
      "q": "Double the track error to regain (same distance) teaching idea?",
      "choices": [
        "Always false",
        "Often used when same distance remains as already flown",
        "Only for IFR",
        "Only above FL100"
      ],
      "ans": 1,
      "exp": "Classic 1-in-60 regain: change by ~2×TE when distance to go ≈ distance flown. Confirm with instructor.",
      "speak": "Classic 1-in-60 regain: change by ~2×TE when distance to go ≈ distance flown. Confirm with instructor."
    },
    {
      "id": "chart-01",
      "cat": "chart",
      "q": "MEF on a chart quadrant is:",
      "choices": [
        "A cleared cruising level",
        "Highest known elevation in the quadrant incl. obstacles — not a clearance",
        "MSA already finished for you",
        "Radio freq"
      ],
      "ans": 1,
      "exp": "Use MEF when building MSA; do not fly 'at the MEF' as if cleared.",
      "speak": "Use MEF when building MSA; do not fly 'at the MEF' as if cleared."
    },
    {
      "id": "chart-02",
      "cat": "chart",
      "q": "Half-million vs quarter-million teaching:",
      "choices": [
        "Identical detail",
        "1:250k more ground detail / airspace often to lower levels; 1:500k higher airspace coverage idea",
        "1:500k always more topo detail",
        "Quarter-million banned"
      ],
      "ans": 1,
      "exp": "Pilot chooses which sheet to carry for the job.",
      "speak": "Pilot chooses which sheet to carry for the job."
    },
    {
      "id": "chart-03",
      "cat": "chart",
      "q": "Measure track on half-million preferably:",
      "choices": [
        "At one end only always",
        "Near mid-leg (meridians converge)",
        "With a fuel dipstick",
        "From runway number only"
      ],
      "ans": 1,
      "exp": "Lambert-style convergence — mid-leg reduces protractor error.",
      "speak": "Lambert-style convergence — mid-leg reduces protractor error."
    },
    {
      "id": "chart-04",
      "cat": "chart",
      "q": "Glider winch symbol means:",
      "choices": [
        "Fuel",
        "Possible cable launch — note height AGL/AMSL as charted",
        "Compulsory overhead join",
        "ATZ closed"
      ],
      "ans": 1,
      "exp": "Cables are invisible hazards. Brief activity.",
      "speak": "Cables are invisible hazards. Brief activity."
    },
    {
      "id": "chart-05",
      "cat": "chart",
      "q": "Danger area 'notified' means activity:",
      "choices": [
        "Never",
        "When notified by NOTAM/AIS — check before assuming cold",
        "Only Sundays",
        "Only above FL195"
      ],
      "ans": 1,
      "exp": "Scheduled vs notified — decode the legend.",
      "speak": "Scheduled vs notified — decode the legend."
    },
    {
      "id": "chart-06",
      "cat": "chart",
      "q": "Feature fix teaching: best visual pinpoints often use:",
      "choices": [
        "A single straight road alone",
        "Combinations (rail+river+road/town shapes)",
        "Only cloud shadows",
        "Only GPS without looking"
      ],
      "ans": 1,
      "exp": "Combinations beat ambiguous single lines.",
      "speak": "Combinations beat ambiguous single lines."
    },
    {
      "id": "alt-01",
      "cat": "alt",
      "q": "Elev 240 ft, QNH 1013. Approx QFE?",
      "choices": [
        "1013",
        "~1005",
        "990",
        "1020"
      ],
      "ans": 1,
      "exp": "~1 hPa per 30 ft → 240/30≈8 → 1013−8=1005.",
      "speak": "~1 hPa per 30 ft → 240/30≈8 → 1013−8=1005."
    },
    {
      "id": "alt-02",
      "cat": "alt",
      "q": "Elev 90 ft, QNH 1022. Approx QFE?",
      "choices": [
        "1022",
        "~1019",
        "1000",
        "1030"
      ],
      "ans": 1,
      "exp": "90/30=3 → ≈1019.",
      "speak": "90/30=3 → ≈1019."
    },
    {
      "id": "alt-03",
      "cat": "alt",
      "q": "Why avoid RPS under a CAS base?",
      "choices": [
        "RPS always higher",
        "RPS is lowest forecast regional QNH — you can be lower than local QNH suggests",
        "RPS = QFE",
        "Only for jets"
      ],
      "ans": 1,
      "exp": "Prefer local QNH near CAS bases.",
      "speak": "Prefer local QNH near CAS bases."
    },
    {
      "id": "alt-04",
      "cat": "alt",
      "q": "FL55 with QNH 1013 ≈ altitude AMSL teaching?",
      "choices": [
        "550 ft",
        "~5,500 ft",
        "55,000 ft",
        "FL means metres"
      ],
      "ans": 1,
      "exp": "On 1013, FL≈pressure altitude in hundreds of feet.",
      "speak": "On 1013, FL≈pressure altitude in hundreds of feet."
    },
    {
      "id": "alt-05",
      "cat": "alt",
      "q": "QNH 993 (20 below 1013): FL55 true alt roughly?",
      "choices": [
        "5,500",
        "~4,900",
        "6,100",
        "550"
      ],
      "ans": 1,
      "exp": "20 hPa×~30 ft ≈ 600 ft lower → ~4,900 ft AMSL teaching.",
      "speak": "20 hPa×~30 ft ≈ 600 ft lower → ~4,900 ft AMSL teaching."
    },
    {
      "id": "paper-01",
      "cat": "paper",
      "q": "True track 075°, var 2°W. Magnetic track?",
      "choices": [
        "073",
        "077",
        "075",
        "085"
      ],
      "ans": 1,
      "exp": "West is best: 075+2=077.",
      "speak": "West is best: 075+2=077.",
      "writeIn": true
    },
    {
      "id": "paper-02",
      "cat": "paper",
      "q": "Mag HDG 090°, deviation 3°E. Compass HDG?",
      "choices": [
        "093",
        "087",
        "090",
        "100"
      ],
      "ans": 1,
      "exp": "Compass ≈ magnetic − east → 087°. Use your compass card.",
      "speak": "Compass ≈ magnetic − east → 087°. Use your compass card.",
      "writeIn": true
    },
    {
      "id": "paper-03",
      "cat": "paper",
      "q": "80 kt ≈ how many mph?",
      "choices": [
        "80",
        "92",
        "70",
        "115"
      ],
      "ans": 1,
      "exp": "×1.15 ≈ 92 mph.",
      "speak": "×1.15 ≈ 92 mph.",
      "writeIn": true
    },
    {
      "id": "paper-04",
      "cat": "paper",
      "q": "115 mph ≈ knots?",
      "choices": [
        "115",
        "100",
        "130",
        "87"
      ],
      "ans": 1,
      "exp": "÷1.15 = 100 kt.",
      "speak": "÷1.15 = 100 kt.",
      "writeIn": true
    },
    {
      "id": "paper-05",
      "cat": "paper",
      "q": "Fix: 18 NM in 12 min. GS? Then 27 NM remaining — minutes left?",
      "choices": [
        "90 kt / 18 min",
        "80/20",
        "100/16",
        "70/25"
      ],
      "ans": 0,
      "exp": "GS=18×60/12=90; 27/90×60=18 min.",
      "speak": "GS=18×60/12=90; 27/90×60=18 min.",
      "writeIn": true
    },
    {
      "id": "paper-06",
      "cat": "paper",
      "q": "Fuel phases 5+20+3+7 L. Minimum uplift before extra contingency?",
      "choices": [
        "20",
        "35",
        "28",
        "7"
      ],
      "ans": 1,
      "exp": "5+20+3+7=35 L. Round up as taught.",
      "speak": "5+20+3+7=35 L. Round up as taught.",
      "writeIn": true
    }
  ]
};
if (typeof globalThis !== 'undefined') globalThis.CRP_DRILLS = CRP_DRILLS;
