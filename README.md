# FULL NPPL INSIDER

Mobile-first **UK NPPL Microlight** study aid for Christopher (C42 student-pilot context).

> **Study aid for NPPL. Not affiliated with the CAA or QuizAero. Always check current official syllabus and your instructor.**

## Subjects (first-class)

1. Aviation Law (UK)
2. Aircraft Technical / General Knowledge
3. Meteorology
4. Human Performance & Limitations
5. Navigation (+ CRP-1 flight computer section)
6. **Radio Telephony / FRTOL** (CAP 413-style UK phraseology)

## Features

- Theory lessons with CSS/SVG animations + Speak/Stop (Web Speech API; voice follows selected language: `en-GB`, `fr-FR`, `de-DE`, …)
- Flashcards per subject (shuffle, known/unknown, progress)
- Practice exams (timed/untimed, auto-mark, review with explanations) — **original** question bank
- Flight computer guide + interactive calculator + **Video / How to use** (animated walkthrough + curated YouTube embeds)
- **Pilot Log** (localStorage) — hours & landings summary
- **Circuits** — animated UK LH circuit + joining · lookout · runway closures · final conflicts · climbs underneath · go-around priorities · hard vs grass taxi/vacate + videos
- **Take-off & Landing** — aileron / rudder / speed / crosswind corrections with Speak + videos
- **Emergencies** — step checklists with Speak (forced landing, EFATO, fire, CO, electrics, fuel, radio, lost)
- **Flight preparation** — hub before you fly: aircraft pre-flight overview (links into C42 Checks / CHIFFTAPWE) + destination aerodrome brief (PPR, hours, freqs, runway, weather/NOTAMs, fuel, alternate, docs) with ticks + localStorage
- **C42 Checks** — C42 pre-flight digital checklist (External → Internal → Start → CHIFFTAPWE (Controls… Eventualities) → FREDA → freqs → FARTT HH → Shutdown) with tick-off, Speak, SVG walk-round/panel highlights
- **Plan a trip** — airfield planning checklist (destination, weather, NOTAMs, PPR, radio, fuel, alternates, docs, final brief) with multi-draft localStorage, progress %, Speak, suggested freqs
- **Abbreviations A–Z** — ~130 UK NPPL / microlight / FRTOL terms & mnemonics (MATZ, ATZ, FREDA, CHIFFTAPWE…) with live filter
- **Microlights** — UK NPPL types (C42 + others): labelled SVG parts, specs by **engine/power/MTOW (Maximum Take-Off Weight) variant**, live fuel↔weight calculator with AUW (All-Up Weight) / SG (Specific Gravity 0.72)
- **1:500k Chart** — UK Half-Million VFR legend trainer (original schematics): scale, airspace A–G, ATZ/CTR/CTA/TMA/MATZ, hazards, aerodromes, VRPs, radio/FIS + quiz
- **App-wide Search** — topbar 🔍 finds lessons, flashcards, exams, skills, glossary, chart legend
- localStorage progress + disclaimer gate on first launch
- **Multi-language** — after the disclaimer gate, pick: English, Cymraeg, Polski, Français, Deutsch, Español, Português, Română (`localStorage` key `nppl_lang`). UI chrome + Speak/TTS follow the selection; change anytime in Settings → Language. Long lesson/exam bodies fall back to English when untranslated.

## Run

```bash
cd /workspace/full-nppl-insider
npm install
npm start
```

Open **http://localhost:3850**

## Tech

Vanilla HTML/CSS/JS + Express static server on port **3850**.

## YouTube (embeds only)

Third-party public tutorials are embedded via iframe (youtube-nocookie) with channel attribution and an Open-on-YouTube link. Videos are **not** downloaded or rehosted. Always confirm technique with your instructor.

## Content notes

- UK CAA / NPPL / SERA / CAP 413 framing only (not FAA).
- Uncertain regulatory detail marked to confirm with instructor / current AIP.
- C42 mentioned lightly; type numbers come from POH/TADS — not invented here as gospel.
- Microlight MTOW (Maximum Take-Off Weight) / empty / tanks vary by engine & approval variant — study defaults only; confirm POH/placard.
- Key UI abbreviations shown as **ABBR (meaning)** on labels (e.g. MTOW, AUW, SG, PPR, ATZ, MATZ, QNH, CHIFFTAPWE).
- Chart module uses **original schematic** swatches/symbols only — does not embed or reproduce copyrighted CAA/NATS chart artwork.
- Every practical flying module: “Not a substitute for instructor dual / POH / current UK regs.”

## Recent features (2026-10-07)

- **PWA** — `manifest.webmanifest` + `sw.js`; installable; core study offline after first visit; iOS Add-to-Home-Screen hint
- **Full content i18n** — lessons / flashcards / exams in en, cy, pl, fr, de, es, pt, ro (`data/i18n-content/`)
- **Live METAR/TAF/NOTAM** — Plan a trip panel via server proxies `/api/metar`, `/api/taf`, `/api/notam` (aviationweather.gov; UK NOTAMs may be limited — NATS authoritative)
- **1:500k chart** — original study-mock map SVG (zoomable) + step-by-step **legend walk-through** + existing quiz
- **Airfield quick cards** — seeded Chilterns/Bucks/common microlight fields; localStorage CRUD; linked from Plan a trip / Flight prep
- **CRP-1 drills** — time/distance/speed, fuel, wind triangle
- **FRTOL phraseology drills** — join, circuit, go-around, Mayday/Pan
- **Weak areas** — tracks wrong practice-exam answers; Home / Theory revision list

Study aid only — confirm instructor / POH / AIP / Met Office / NATS. No Progress Flying School branding.


## Hosted web version (GitHub Pages)

Live at **https://b68yp988sw-ctrl.github.io/full-nppl-insider/** — a pure static build (all progress in the browser's localStorage, PWA/offline supported).

The in-app live METAR/TAF/NOTAM proxy (`/api/*` in `server.js`) is not part of the static build; on the hosted version the Plan-a-trip weather panel links to official sources (aviationweather.gov, Met Office, NATS) instead.

## What's new (30 Oct 2026)

- **New home screen:** swipeable cards (Continue / Start here, Today's exam, Circuit video), then Study / Fly / Plan groups with clear headings and *See all* links, Settings and the disclaimer.
- **Logo theme app-wide** (near-black + blue→violet, silver text, gold accents) and bigger tap targets (≥48 px).
- **Simpler navigation:** a 5-tab bottom bar (Home · Study · Exams · Skills · Plan), clear page titles and a labelled Back button, 48 px tap targets, 17 px base text and higher-contrast muted text. Every earlier screen is still reachable from a hub.
- **New logo:** home-screen icons (180/192/512 + maskable 512), black theme, and a 1.5 s opening splash (once per session, tap to skip, never blocks the app).
- **Narrated circuit video** (4 min 13 s) on Flying skills → Circuits. It loads only when you tap play and is not saved offline.
- **Questions:** 352 → 402. The 50 new questions are original, and the answer order is now shuffled for each sitting.
- **Airfields:** 10 → 29 quick cards for south England and South Wales. Each card names its source (UK AIP AIRAC 29 Oct 2026 or the airfield's website). Blanks mean "not verified". **Always check the current AIP/website and get PPR.**
- **C42 check photos:** the school logo is blurred.
- **Translations:** stale or half-English content was removed (it falls back to English), and the missing UI strings were added in all 7 languages. **All non-English text still needs a check by a native speaker.**
- **Bug fixes:** the exam timer kept running after you left the exam; the exam answer key was biased; airfield seeds were missing for existing users; the service worker cache was scoped wrongly; translated choices could mismatch the answer key.
- **Saved progress is kept:** same storage keys as before. Airfield cards move to a new key (`full-nppl-airfields-v3`); your custom cards, edits and deletions carry over.
- Service worker cache: `nppl-live-v3-20261030` (old `nppl-insider-*` caches are removed on update). Close and reopen the app once to get the new version.
