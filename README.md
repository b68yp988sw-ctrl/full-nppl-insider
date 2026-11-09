# FULL NPPL INSIDER — PREVIEW BUILD

> **Preview only.** This repo (`full-nppl-insider-preview`) is a test copy for review. The live app is
> https://b68yp988sw-ctrl.github.io/full-nppl-insider/ and is not changed by anything here.
> The preview is `noindex`, shows a PREVIEW badge, and uses its own service-worker cache (`nppl-preview-*`).

## What changed in this preview (29 Oct 2026)

- **Simpler layout:** home has 6 big labelled sections (Study · Practice exams · Flying skills · Plan a flight · My log · Settings), a "Continue where you left off" card, a 5-tab bottom bar (Home · Study · Exams · Skills · Plan), clear page titles and a labelled Back button, 48 px tap targets, 17 px base text and higher-contrast muted text. Every earlier screen is still reachable from a hub.
- **New logo:** home-screen icons (180/192/512 + maskable 512), black theme.
- **Full-screen opening splash (30 Oct):** on every app open the logo fills the whole screen (tall art for phones, wide art for landscape/desktop; the original logo is untouched in the centre and the web is extended to the edges), shows for about 1.2 s, fades, then goes straight to the sign-in screen (tap Continue). Tap to skip; reduced-motion users get no zoom/fade; a 2.5 s fallback means it can never get stuck. iOS home-screen launch images and the manifest colours match it, so there is no white flash. Returning users see the sign-in screen with the disclaimer already ticked.
- **Narrated circuit video** (4 min 13 s) on Flying skills → Circuits. It loads only when you tap play and is not saved offline.
- **Questions:** 352 → 402. The 50 new questions are original (`added: "2026-10-preview"`), and the answer order is now shuffled for each sitting.
- **Airfields:** 10 → 29 quick cards for south England and South Wales. Each card names its source (UK AIP AIRAC 29 Oct 2026 or the airfield's website). Blanks mean "not verified". **Always check the current AIP/website and get PPR.**
- **C42 checks:** the app's own checklist design (no photos or school branding); Useful Frequencies omitted.
- **C42 visual aids (30 Oct):** original animated illustrations ("typical" set-up) for Electrical System, Propeller, Fuel (good vs water vs debris sample) and Power Check. The current step shows the visual full width; other rows with art have a tap-to-expand thumbnail. Reduced-motion users get a still. Rows without art are unchanged.
- **More C42 external-check visuals (30 Oct):** added animated "typical" illustrations for the rest of External checks: Oil Level, Nosewheel, Doors & Undercarriage, Wings, Aileron & Flap, Baggage Compartment, Fuselage, Horizontal Stabiliser and Elevator. They are wired the same way and have reduced-motion stills. After a QC pass (hinges, clipping, layering, fasteners, high wing on the fuselage view), the SW cache is `v6-20261030-extvisuals-qc`.
- **Translations:** stale or half-English content was removed (it falls back to English), and the missing UI strings were added in all 7 languages. **All non-English text still needs a check by a native speaker.**
- **Bug fixes:** the exam timer kept running after you left the exam; the exam answer key was biased; airfield seeds were missing for existing users; the service worker cache was scoped wrongly; translated choices could mismatch the answer key.

---


Mobile-first **UK NPPL Microlight** study aid for Christopher (C42 student-pilot context).

> **Study aid for NPPL. Not affiliated with the CAA. Always check current official syllabus and your instructor.**

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
- **C42 Checks** — C42 pre-flight digital checklist (External → Internal → Start → CHIFFTAPWE (Controls… Eventualities) → FREDA → FARTTHH → Shutdown) as tappable sections with tick-off rows, mnemonic letters, Speak and per-section reset
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

## Preview: home layout D + logo theme (30 Oct 2026)

- Home screen redesigned to mockup **D – carousel + grouped sections**: swipeable cards (Continue / Start here, Today's exam, Circuit video) with gold dots, then Study / Fly / Plan groups with clear headings and *See all* links, Settings and the disclaimer.
- Whole app re-themed to match the logo (near-black + blue→violet, silver text, gold accents, web pattern backdrop). Bigger tap targets (filter chips and YouTube links ≥48 px).
- New home labels are translated into cy, pl, fr, de, es, pt, ro — **these translations still need checking by native speakers**.
- Service worker cache bumped to `nppl-preview-v3-20261030-layoutD`.
