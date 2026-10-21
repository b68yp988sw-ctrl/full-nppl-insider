/* Daily METAR decode practice — ORIGINAL samples */
const MET_DAILY = {
  "meta": {
    "title": "Daily METAR decode",
    "disclaimer": "Sample METARs are teaching fiction or simplified public-style strings for practice. Live fetch (when used) is best-effort via the app proxy — always confirm official weather before flight. Study aid only.",
    "nearbyIcaos": [
      "EGTB",
      "EGLL",
      "EGKK",
      "EGGW",
      "EGBB"
    ]
  },
  "samples": [
    {
      "id": "s1",
      "raw": "EGTB 071050Z 24012KT 9999 FEW025 SCT040 16/09 Q1018 NOSIG",
      "decode": "Booker-style teaching sample: day 07 at 1050Z, wind from 240° at 12 kt, visibility 10 km+, few at 2500 ft, scattered 4000 ft, temp 16 dew 9, QNH 1018, no significant change expected shortly.",
      "ask": [
        "Wind direction and speed?",
        "Visibility code meaning?",
        "Cloud bases?",
        "QNH?"
      ],
      "answers": [
        "240°/12 kt",
        "9999 = 10 km or more",
        "FEW 2500, SCT 4000",
        "1018 hPa"
      ]
    },
    {
      "id": "s2",
      "raw": "EGLL 071120Z 27018G28KT 6000 -RA BKN012 OVC020 12/11 Q1006 TEMPO 3000 RA BKN008",
      "decode": "Strong W’ly gusting 28 kt, 6 km in light rain, broken 1200 / overcast 2000, nearly saturated, QNH 1006, tempo 3 km rain and broken 800 — poor VFR microlight day.",
      "ask": [
        "Gusts?",
        "Present weather?",
        "Why cautious for microlights?"
      ],
      "answers": [
        "18G28",
        "Light rain (-RA)",
        "Low cloud, rain, gusts, poor margins"
      ]
    },
    {
      "id": "s3",
      "raw": "EGGW 070650Z 00000KT 0200 FG VV/// 08/08 Q1022",
      "decode": "Calm, 200 m in fog, sky obscured (vertical visibility missing), temp=dewpoint, QNH 1022 — no-go VFR.",
      "ask": [
        "Visibility?",
        "Fog or mist?",
        "Fly VFR?"
      ],
      "answers": [
        "200 m",
        "FG fog",
        "No — remain on ground"
      ]
    },
    {
      "id": "s4",
      "raw": "EGBB 071450Z 20008KT 9999 SCT035 19/10 Q1015 NOSIG",
      "decode": "Handy fine-day sample: 200/08, CAVOK-ish cloud, good VFR check still includes crosswind on your runway.",
      "ask": [
        "Any significant weather group?",
        "Cloud?"
      ],
      "answers": [
        "None in the body",
        "SCT at 3500 ft"
      ]
    },
    {
      "id": "s5",
      "raw": "EGKK 071300Z 24015KT 9999 SHRA SCT020CB BKN035 17/12 Q1011",
      "decode": "Showers and CB — avoid cells even if visibility between showers looks good.",
      "ask": [
        "What does CB imply?",
        "SHRA?"
      ],
      "answers": [
        "Cumulonimbus — turbulence/hail/gusts risk",
        "Rain showers"
      ]
    },
    {
      "id": "s6",
      "raw": "EGTB 071730Z 26006KT CAVOK 18/08 Q1020 NOSIG",
      "decode": "CAVOK packs visibility/cloud/weather criteria — still check wind vs runway and TMA base.",
      "ask": [
        "What does CAVOK bundle?",
        "Still check wind?"
      ],
      "answers": [
        "Vis/cloud/weather criteria as defined",
        "Yes — crosswind and gusts"
      ]
    },
    {
      "id": "s7",
      "raw": "EGSS 071000Z 04004KT 3000 BR SCT003 BKN005 09/08 Q1019 BECMG 1500 FG",
      "decode": "Mist, very low cloud, becoming fog — classic morning trap.",
      "ask": [
        "Trend?",
        "Suitable for departure?"
      ],
      "answers": [
        "BECMG 1500 FG",
        "Normally no for microlight VFR"
      ]
    }
  ]
};
if (typeof globalThis !== 'undefined') globalThis.MET_DAILY = MET_DAILY;
