/* ORIGINAL flashcards — UK NPPL / FRTOL study aid */
const FLASHCARDS_DATA = [
  {
    "id": "law-fc-01",
    "subject": "law",
    "q": "What is the NPPL?",
    "a": "A UK national private pilot licence — not automatically valid abroad."
  },
  {
    "id": "law-fc-02",
    "subject": "law",
    "q": "Min hours teaching picture for NPPL Microlight Without Operational Limitations?",
    "a": "Often taught as 25 h total, 10 solo, 5 nav of which 3 solo nav — confirm current syllabus."
  },
  {
    "id": "law-fc-03",
    "subject": "law",
    "q": "Ops Limits at initial issue (typical)?",
    "a": "No passengers; ≥10 km vis; cloud base ≥1,000 ft AGL; within 8 NM of take-off."
  },
  {
    "id": "law-fc-04",
    "subject": "law",
    "q": "Age teaching points for solo / licence?",
    "a": "Often 16 solo, 17 licence — confirm current ANO."
  },
  {
    "id": "law-fc-05",
    "subject": "law",
    "q": "How long are ground exams valid before licence application?",
    "a": "Typically must be passed within 24 months prior — confirm CAP/BMAA."
  },
  {
    "id": "law-fc-06",
    "subject": "law",
    "q": "Class A and VFR?",
    "a": "No VFR in Class A (e.g. much of London TMA)."
  },
  {
    "id": "law-fc-07",
    "subject": "law",
    "q": "Class D CTR entry?",
    "a": "Need ATC clearance before entry."
  },
  {
    "id": "law-fc-08",
    "subject": "law",
    "q": "Low Class G day VMC teaching minima (≤3000 ft, ≤140 kt)?",
    "a": "Often 1,500 m vis, clear of cloud, surface in sight — confirm SERA.5001 / AIP."
  },
  {
    "id": "law-fc-09",
    "subject": "law",
    "q": "ATZ rough size (runway ≤1850 m)?",
    "a": "2 NM radius to 2,000 ft AAL — confirm AIP."
  },
  {
    "id": "law-fc-10",
    "subject": "law",
    "q": "Rule 11 ATZ essence?",
    "a": "Establish two-way comms (or published procedure) before entering."
  },
  {
    "id": "law-fc-11",
    "subject": "law",
    "q": "MATZ vs civil ATZ?",
    "a": "MATZ is not civil CAS; civil ATZ inside still needs proper entry procedure."
  },
  {
    "id": "law-fc-12",
    "subject": "law",
    "q": "Congested area low-flying teaching height?",
    "a": "Typically not below 1,000 ft above highest fixed object within 600 m."
  },
  {
    "id": "law-fc-13",
    "subject": "law",
    "q": "Elsewhere 500 ft rule teaching point?",
    "a": "Not within 500 ft of person/vessel/vehicle/structure (with taught exceptions)."
  },
  {
    "id": "law-fc-14",
    "subject": "law",
    "q": "Converging aircraft — who gives way?",
    "a": "Give way to the one on your right."
  },
  {
    "id": "law-fc-15",
    "subject": "law",
    "q": "Head-on — what do both do?",
    "a": "Both alter to the right."
  },
  {
    "id": "law-fc-16",
    "subject": "law",
    "q": "Passenger currency teaching point?",
    "a": "3 take-offs and landings as PIC in preceding 90 days."
  },
  {
    "id": "law-fc-17",
    "subject": "law",
    "q": "UK alcohol limits (blood/breath/urine)?",
    "a": "20 mg/100 ml blood; 9 µg/100 ml breath; 27 mg/100 ml urine."
  },
  {
    "id": "law-fc-18",
    "subject": "law",
    "q": "SSR 7000 / 7700 / 7600 / 7500?",
    "a": "7000 VFR conspicuity; 7700 emergency; 7600 radio fail; 7500 unlawful interference."
  },
  {
    "id": "law-fc-19",
    "subject": "law",
    "q": "Lost conspicuity code often taught?",
    "a": "0030 when appropriate."
  },
  {
    "id": "law-fc-20",
    "subject": "law",
    "q": "Guard frequency?",
    "a": "121.500 MHz."
  },
  {
    "id": "law-fc-21",
    "subject": "law",
    "q": "QNH vs QFE?",
    "a": "QNH → altitude AMSL; QFE → height above aerodrome."
  },
  {
    "id": "law-fc-22",
    "subject": "law",
    "q": "Who is responsible for go/no-go?",
    "a": "You as PIC — legal VFR can still be a bad microlight day."
  },
  {
    "id": "tech-fc-01",
    "subject": "tech",
    "q": "Four forces in steady level flight?",
    "a": "Lift, weight, thrust, drag — in balance."
  },
  {
    "id": "tech-fc-02",
    "subject": "tech",
    "q": "What is angle of attack?",
    "a": "Angle between chord line and relative airflow."
  },
  {
    "id": "tech-fc-03",
    "subject": "tech",
    "q": "What happens at the stall?",
    "a": "Critical AoA exceeded; smooth flow breaks down; lift drops sharply."
  },
  {
    "id": "tech-fc-04",
    "subject": "tech",
    "q": "Load factor in a level 60° bank turn?",
    "a": "2g — stall speed rises by about 1.41."
  },
  {
    "id": "tech-fc-05",
    "subject": "tech",
    "q": "Main cause of lift (simple)?",
    "a": "Pressure difference (faster flow over top) plus downward deflection of air."
  },
  {
    "id": "tech-fc-06",
    "subject": "tech",
    "q": "Va meaning?",
    "a": "Manoeuvring / max rough-air speed (as defined in POH)."
  },
  {
    "id": "tech-fc-07",
    "subject": "tech",
    "q": "Vne meaning?",
    "a": "Never-exceed speed."
  },
  {
    "id": "tech-fc-08",
    "subject": "tech",
    "q": "Vfe meaning?",
    "a": "Maximum flap-extended speed."
  },
  {
    "id": "tech-fc-09",
    "subject": "tech",
    "q": "Permit to Fly vs C of A?",
    "a": "Many UK microlights operate on a Permit to Fly + Certificate of Validity."
  },
  {
    "id": "tech-fc-10",
    "subject": "tech",
    "q": "Carb ice risk?",
    "a": "Venturi cooling can cause ice even on mild moist days at low power."
  },
  {
    "id": "tech-fc-11",
    "subject": "tech",
    "q": "Fuel mass rule of thumb for petrol?",
    "a": "About 0.72 kg per litre — confirm planning figure with school."
  },
  {
    "id": "tech-fc-12",
    "subject": "tech",
    "q": "CG must be…?",
    "a": "Within the POH/TADS forward and aft limits at the actual weight."
  },
  {
    "id": "tech-fc-13",
    "subject": "tech",
    "q": "Best response to engine failure after take-off (first)?",
    "a": "Lower nose to best glide (POH) and fly the aircraft — pick a field."
  },
  {
    "id": "tech-fc-14",
    "subject": "tech",
    "q": "CO from cabin heat — action?",
    "a": "Heat OFF, fresh air, land; do not launch with uncleared alert."
  },
  {
    "id": "tech-fc-15",
    "subject": "tech",
    "q": "Where do type speeds come from?",
    "a": "YOUR placard / POH / TADS — not memory of another variant."
  },
  {
    "id": "tech-fc-16",
    "subject": "tech",
    "q": "MTOW / differences training teaching note?",
    "a": "Some heavier variants may need differences training — confirm with instructor."
  },
  {
    "id": "tech-fc-17",
    "subject": "tech",
    "q": "Daily inspection fuel check?",
    "a": "Eyes on quantity, cap on, drains sampled, correct fuel type."
  },
  {
    "id": "tech-fc-18",
    "subject": "tech",
    "q": "Flap use teaching caution?",
    "a": "Respect Vfe; crosswind technique as taught for the type."
  },
  {
    "id": "met-fc-01",
    "subject": "met",
    "q": "ISA sea-level temperature and pressure?",
    "a": "15 °C and 1013.25 hPa."
  },
  {
    "id": "met-fc-02",
    "subject": "met",
    "q": "ISA lapse rate approx?",
    "a": "About 2 °C per 1,000 ft."
  },
  {
    "id": "met-fc-03",
    "subject": "met",
    "q": "QNH definition?",
    "a": "Pressure setting so altimeter reads altitude AMSL."
  },
  {
    "id": "met-fc-04",
    "subject": "met",
    "q": "QFE definition?",
    "a": "Pressure setting so altimeter reads height above aerodrome."
  },
  {
    "id": "met-fc-05",
    "subject": "met",
    "q": "1 hPa ≈ how many feet?",
    "a": "About 27–30 ft."
  },
  {
    "id": "met-fc-06",
    "subject": "met",
    "q": "Cold air effect on true altitude?",
    "a": "True altitude lower than indicated."
  },
  {
    "id": "met-fc-07",
    "subject": "met",
    "q": "Surface wind vs 2,000 ft wind?",
    "a": "Surface usually backed and slower (friction)."
  },
  {
    "id": "met-fc-08",
    "subject": "met",
    "q": "Buys Ballot (NH)?",
    "a": "Back to wind → low pressure on the left."
  },
  {
    "id": "met-fc-09",
    "subject": "met",
    "q": "CB / TCU for microlights?",
    "a": "No-go — turbulence, lightning, hail, gust fronts."
  },
  {
    "id": "met-fc-10",
    "subject": "met",
    "q": "Warm front cloud sequence (classic)?",
    "a": "CI → CS → AS → NS."
  },
  {
    "id": "met-fc-11",
    "subject": "met",
    "q": "Cold front typical weather?",
    "a": "CU/CB line, sharp showers, clearer cooler air behind, wind veers."
  },
  {
    "id": "met-fc-12",
    "subject": "met",
    "q": "FG vs BR?",
    "a": "FG vis <1,000 m; BR 1,000–5,000 m."
  },
  {
    "id": "met-fc-13",
    "subject": "met",
    "q": "Radiation fog recipe?",
    "a": "Clear night, inland, light wind, moist ground."
  },
  {
    "id": "met-fc-14",
    "subject": "met",
    "q": "METAR 25021G31KT meaning?",
    "a": "Wind from 250° at 21 kt gusting 31 kt."
  },
  {
    "id": "met-fc-15",
    "subject": "met",
    "q": "SCT036 meaning?",
    "a": "Scattered cloud at 3,600 ft AAL."
  },
  {
    "id": "met-fc-16",
    "subject": "met",
    "q": "9999 visibility?",
    "a": "10 km or more."
  },
  {
    "id": "met-fc-17",
    "subject": "met",
    "q": "CAVOK essentials?",
    "a": "≥10 km; no cloud below 5,000 ft/MSA; no CB/TCU; no sig wx."
  },
  {
    "id": "met-fc-18",
    "subject": "met",
    "q": "TEMPO vs BECMG?",
    "a": "TEMPO = temporary periods; BECMG = lasting change."
  },
  {
    "id": "met-fc-19",
    "subject": "met",
    "q": "Carb ice even when OAT warm?",
    "a": "Yes — venturi can be much colder than OAT."
  },
  {
    "id": "met-fc-20",
    "subject": "met",
    "q": "Thunderstorm nearby decision?",
    "a": "Stay on the ground."
  },
  {
    "id": "hpl-fc-01",
    "subject": "hpl",
    "q": "IMSAFE letters?",
    "a": "Illness, Medication, Stress, Alcohol, Fatigue, Eating."
  },
  {
    "id": "hpl-fc-02",
    "subject": "hpl",
    "q": "Blocked ears / cannot clear — fly?",
    "a": "No."
  },
  {
    "id": "hpl-fc-03",
    "subject": "hpl",
    "q": "ROGER means comply?",
    "a": "No — only that you received the transmission."
  },
  {
    "id": "hpl-fc-04",
    "subject": "hpl",
    "q": "The leans — trust what?",
    "a": "The visual horizon / instruments as appropriate — not seat-of-pants."
  },
  {
    "id": "hpl-fc-05",
    "subject": "hpl",
    "q": "Somatogravic illusion after take-off?",
    "a": "Acceleration can feel like a climb — do not push nose down wrongly."
  },
  {
    "id": "hpl-fc-06",
    "subject": "hpl",
    "q": "CO properties?",
    "a": "Colourless, odourless — binds to haemoglobin."
  },
  {
    "id": "hpl-fc-07",
    "subject": "hpl",
    "q": "CO action in flight?",
    "a": "Heat off, max fresh air, land."
  },
  {
    "id": "hpl-fc-08",
    "subject": "hpl",
    "q": "Scan technique teaching point?",
    "a": "Short hops (~10°), cover left and right of track."
  },
  {
    "id": "hpl-fc-09",
    "subject": "hpl",
    "q": "Polarised sunglasses issue?",
    "a": "Can make LCD instruments/canopy hard to read."
  },
  {
    "id": "hpl-fc-10",
    "subject": "hpl",
    "q": "Hazardous attitudes (name three)?",
    "a": "Anti-authority, impulsiveness, invulnerability, macho, resignation (peer pressure)."
  },
  {
    "id": "hpl-fc-11",
    "subject": "hpl",
    "q": "Aviate Navigate Communicate order?",
    "a": "Fly first, then navigate, then talk."
  },
  {
    "id": "hpl-fc-12",
    "subject": "hpl",
    "q": "Personal vs legal minima?",
    "a": "Personal minima should be stricter when needed."
  },
  {
    "id": "hpl-fc-13",
    "subject": "hpl",
    "q": "Startle effect duration teaching point?",
    "a": "Skilled flying can wobble for several seconds — keep it simple."
  },
  {
    "id": "hpl-fc-14",
    "subject": "hpl",
    "q": "Passenger briefing items (examples)?",
    "a": "Prop disc, straps, doors, sick bag, sterile cockpit in critical phases."
  },
  {
    "id": "hpl-fc-15",
    "subject": "hpl",
    "q": "Alcohol practice teaching?",
    "a": "Legal limits are low; many use 8 h+ after drinking, longer after heavy night."
  },
  {
    "id": "hpl-fc-16",
    "subject": "hpl",
    "q": "Hypoxia vs CO at circuit height?",
    "a": "CO can impair you at low level; classic hypoxia altitudes are higher."
  },
  {
    "id": "hpl-fc-17",
    "subject": "hpl",
    "q": "Hyperventilation on ground?",
    "a": "Often stress — slow breathing; still fly the aeroplane."
  },
  {
    "id": "hpl-fc-18",
    "subject": "hpl",
    "q": "If you would not take a friend…?",
    "a": "Do not take yourself — cancel."
  },
  {
    "id": "nav-fc-01",
    "subject": "nav",
    "q": "Track vs heading?",
    "a": "Track = path over ground; heading = nose direction."
  },
  {
    "id": "nav-fc-02",
    "subject": "nav",
    "q": "Wind from left — drift correction?",
    "a": "Heading a little left (into wind)."
  },
  {
    "id": "nav-fc-03",
    "subject": "nav",
    "q": "TVMDC?",
    "a": "True → Variation → Magnetic → Deviation → Compass."
  },
  {
    "id": "nav-fc-04",
    "subject": "nav",
    "q": "East is least means?",
    "a": "With easterly variation, magnetic is less than true."
  },
  {
    "id": "nav-fc-05",
    "subject": "nav",
    "q": "1-in-60 rule?",
    "a": "1° error at 60 NM ≈ 1 NM off track."
  },
  {
    "id": "nav-fc-06",
    "subject": "nav",
    "q": "Track error formula teaching?",
    "a": "TE° ≈ (distance off ÷ distance gone) × 60."
  },
  {
    "id": "nav-fc-07",
    "subject": "nav",
    "q": "90 kt in NM/min?",
    "a": "About 1.5 NM per minute."
  },
  {
    "id": "nav-fc-08",
    "subject": "nav",
    "q": "Time formula?",
    "a": "Minutes = distance × 60 / groundspeed."
  },
  {
    "id": "nav-fc-09",
    "subject": "nav",
    "q": "Half-mil scale?",
    "a": "1:500,000 — about 3.7 mm per NM."
  },
  {
    "id": "nav-fc-10",
    "subject": "nav",
    "q": "NOTAM source (UK)?",
    "a": "NATS AIS (as currently published) — every flight."
  },
  {
    "id": "nav-fc-11",
    "subject": "nav",
    "q": "GPS role?",
    "a": "Aid only — chart, watch, lookout remain primary skill."
  },
  {
    "id": "nav-fc-12",
    "subject": "nav",
    "q": "Fuel planning elements?",
    "a": "Taxi + trip + diversion + safe reserve/margin."
  },
  {
    "id": "nav-fc-13",
    "subject": "nav",
    "q": "Safety altitude idea?",
    "a": "Highest relevant terrain/obstacles + margin; watch CAS bases."
  },
  {
    "id": "nav-fc-14",
    "subject": "nav",
    "q": "Lost — first actions?",
    "a": "Aviate, stay VMC, confess early."
  },
  {
    "id": "nav-fc-15",
    "subject": "nav",
    "q": "121.500 use when lost?",
    "a": "If no working ATSU — D&D / guard as taught."
  },
  {
    "id": "nav-fc-16",
    "subject": "nav",
    "q": "Squawk when lost (often taught)?",
    "a": "0030 if appropriate."
  },
  {
    "id": "nav-fc-17",
    "subject": "nav",
    "q": "Line feature airmanship?",
    "a": "Often taught: keep feature on left / fly to the right of it — confirm instructor."
  },
  {
    "id": "nav-fc-18",
    "subject": "nav",
    "q": "Measure track from?",
    "a": "Nearest meridian on the chart."
  },
  {
    "id": "nav-fc-19",
    "subject": "nav",
    "q": "CRP-1 used for?",
    "a": "Time/distance/speed, fuel, and wind/heading/GS calculations."
  },
  {
    "id": "nav-fc-20",
    "subject": "nav",
    "q": "MEF vs safety altitude?",
    "a": "MEF on chart is not automatically your safety altitude."
  },
  {
    "id": "nav-fc-21",
    "subject": "nav",
    "q": "Variation source?",
    "a": "Current chart isogonals — not last year’s memory."
  },
  {
    "id": "nav-fc-22",
    "subject": "nav",
    "q": "Diversion decision?",
    "a": "If weather worse than plan, divert/land — do not press on hoping."
  },
  {
    "id": "radio-fc-01",
    "subject": "radio",
    "q": "Who says CLEARED?",
    "a": "Only ATC."
  },
  {
    "id": "radio-fc-02",
    "subject": "radio",
    "q": "ROGER vs WILCO?",
    "a": "ROGER = received; WILCO = received and will comply."
  },
  {
    "id": "radio-fc-03",
    "subject": "radio",
    "q": "AFFIRM / NEGATIVE?",
    "a": "Yes / No (or not correct / permission not granted)."
  },
  {
    "id": "radio-fc-04",
    "subject": "radio",
    "q": "First callsign format?",
    "a": "Always full phonetics until ATS shortens you."
  },
  {
    "id": "radio-fc-05",
    "subject": "radio",
    "q": "STUDENT prefix when?",
    "a": "Solo student on first contact with an ATSU."
  },
  {
    "id": "radio-fc-06",
    "subject": "radio",
    "q": "RADIO station means?",
    "a": "Air/Ground (AGCS) — information only, not clearances."
  },
  {
    "id": "radio-fc-07",
    "subject": "radio",
    "q": "INFORMATION station means?",
    "a": "AFIS — take-off/land at your discretion."
  },
  {
    "id": "radio-fc-08",
    "subject": "radio",
    "q": "Mandatory readback examples?",
    "a": "Runway in use, take-off/land/hold short, squawk, altimeter, frequency change, levels/headings…"
  },
  {
    "id": "radio-fc-09",
    "subject": "radio",
    "q": "Listen before transmit?",
    "a": "Yes — always listen out first."
  },
  {
    "id": "radio-fc-10",
    "subject": "radio",
    "q": "Ready call wording?",
    "a": "Ready for departure (not ‘ready take-off’ as the ready call)."
  },
  {
    "id": "radio-fc-11",
    "subject": "radio",
    "q": "MAYDAY vs PAN PAN?",
    "a": "MAYDAY = distress; PAN PAN = urgency."
  },
  {
    "id": "radio-fc-12",
    "subject": "radio",
    "q": "MAYDAY how many times?",
    "a": "Three — MAYDAY MAYDAY MAYDAY."
  },
  {
    "id": "radio-fc-13",
    "subject": "radio",
    "q": "Emergency squawk?",
    "a": "7700."
  },
  {
    "id": "radio-fc-14",
    "subject": "radio",
    "q": "Radio failure squawk?",
    "a": "7600."
  },
  {
    "id": "radio-fc-15",
    "subject": "radio",
    "q": "MAYDAY message order (essence)?",
    "a": "Distress call, station, callsign, type, nature, intentions, position/level, other (POB)."
  },
  {
    "id": "radio-fc-16",
    "subject": "radio",
    "q": "Cancel distress when?",
    "a": "When safe — do not leave 7700 forever."
  },
  {
    "id": "radio-fc-17",
    "subject": "radio",
    "q": "SAFETYCOM frequency?",
    "a": "135.480 — only within published distance/height limits."
  },
  {
    "id": "radio-fc-18",
    "subject": "radio",
    "q": "Unmanned call addressing?",
    "a": "(Place) Traffic … end with place name."
  },
  {
    "id": "radio-fc-19",
    "subject": "radio",
    "q": "Basic Service freecall essence?",
    "a": "Station, full callsign, request Basic Service — then pass message when asked."
  },
  {
    "id": "radio-fc-20",
    "subject": "radio",
    "q": "Conditional line-up readback?",
    "a": "Read back the whole condition, then only act when you see the named traffic."
  },
  {
    "id": "radio-fc-21",
    "subject": "radio",
    "q": "QNH readback?",
    "a": "Yes — altimeter settings are mandatory readbacks (CAP 413)."
  },
  {
    "id": "radio-fc-22",
    "subject": "radio",
    "q": "Frequency change readback?",
    "a": "Read the new frequency back in full (six figures as required)."
  },
  {
    "id": "radio-fc-23",
    "subject": "radio",
    "q": "Practice PAN rule?",
    "a": "Only when frequency free; real emergency always has priority."
  },
  {
    "id": "radio-fc-24",
    "subject": "radio",
    "q": "Light signals if radio fail?",
    "a": "Watch tower signals; know steady/flashing green/red meanings as taught."
  },
  {
    "id": "radio-fc-25",
    "subject": "radio",
    "q": "Traffic info reply options?",
    "a": "Looking / traffic in sight / negative contact — keep looking."
  },
  {
    "id": "law-fc-signs-01",
    "subject": "law",
    "q": "Yellow letter on black taxiway sign?",
    "a": "Taxiway you are ON. Hook: dark ground = you're on it."
  },
  {
    "id": "law-fc-signs-02",
    "subject": "law",
    "q": "Yellow C near tower/ops?",
    "a": "Often book-in / landing fees. Hook: C = come check in."
  },
  {
    "id": "law-fc-signs-03",
    "subject": "law",
    "q": "Runway number 27 means about?",
    "a": "Magnetic heading ~270° (nearest 10°)."
  },
  {
    "id": "law-fc-signs-04",
    "subject": "law",
    "q": "Pavement with large Xs?",
    "a": "Closed — no taxi/take-off/landing."
  },
  {
    "id": "law-fc-signs-05",
    "subject": "law",
    "q": "Red/yellow chequered flag?",
    "a": "ATC in operation — apron moves need ATC permission."
  },
  {
    "id": "law-fc-air-01",
    "subject": "law",
    "q": "Class A for microlight VFR?",
    "a": "Stay out — IFR only (e.g. London TMA/airways when Class A)."
  },
  {
    "id": "law-fc-air-02",
    "subject": "law",
    "q": "Class D CTR entry?",
    "a": "Two-way radio + ATC clearance before entry."
  },
  {
    "id": "law-fc-aic-01",
    "subject": "law",
    "q": "Mauve AIC theme (our hook)?",
    "a": "Temporary airspace restrictions. Hook: mauve = move aside."
  },
  {
    "id": "law-fc-aic-02",
    "subject": "law",
    "q": "Green AIC theme (our hook)?",
    "a": "Safety topics. Hook: green = go careful."
  },
  {
    "id": "met-fc-cloud-01",
    "subject": "met",
    "q": "High cloud family?",
    "a": "Cirrus, cirrostratus, cirrocumulus."
  },
  {
    "id": "met-fc-cloud-02",
    "subject": "met",
    "q": "Middle cloud family?",
    "a": "Altostratus, altocumulus."
  },
  {
    "id": "met-fc-cloud-03",
    "subject": "met",
    "q": "Low cloud family?",
    "a": "Stratus, stratocumulus, cumulus."
  },
  {
    "id": "met-fc-cloud-04",
    "subject": "met",
    "q": "Nimbostratus vs CB?",
    "a": "Ns = deep rain layer; Cb = towering convective with anvil — avoid."
  },
  {
    "id": "met-fc-time-01",
    "subject": "met",
    "q": "METAR times are in?",
    "a": "UTC/Zulu. BST = UTC+1 — convert for local clocks."
  },
  {
    "id": "radio-fc-26",
    "subject": "radio",
    "q": "FRTOL — who issues it?",
    "a": "The CAA. You normally need it to use an aircraft radio."
  },
  {
    "id": "radio-fc-27",
    "subject": "radio",
    "q": "Aircraft Radio Licence — who issues it?",
    "a": "Ofcom. A hand-held with its own battery and aerial needs a Transportable Radio Licence."
  },
  {
    "id": "radio-fc-28",
    "subject": "radio",
    "q": "VHF voice band & spacing?",
    "a": "About 118–137 MHz with 8.33 kHz channel spacing."
  },
  {
    "id": "radio-fc-29",
    "subject": "radio",
    "q": "How do you set a manual squelch?",
    "a": "Volume to half, turn squelch up until it hisses, back off until the hiss just stops. Don’t do it while someone is talking."
  },
  {
    "id": "radio-fc-30",
    "subject": "radio",
    "q": "Max sensible radio volume?",
    "a": "About 70% of the knob. Any higher and the audio distorts."
  },
  {
    "id": "radio-fc-31",
    "subject": "radio",
    "q": "Intercom too loud — risk?",
    "a": "You talk over an ATC call and miss it."
  },
  {
    "id": "radio-fc-32",
    "subject": "radio",
    "q": "7000 / 7600 / 7700 / 7500 / 0030?",
    "a": "VFR conspicuity / radio failure / emergency / unlawful interference / lost (UK)."
  },
  {
    "id": "radio-fc-33",
    "subject": "radio",
    "q": "Does changing QNH change Mode C output?",
    "a": "No. Mode C always reports level from 1013.2 hPa."
  },
  {
    "id": "radio-fc-34",
    "subject": "radio",
    "q": "When to press IDENT?",
    "a": "Only when ATC says \"squawk ident\"."
  },
  {
    "id": "radio-fc-35",
    "subject": "radio",
    "q": "What is an FMC (listening squawk)?",
    "a": "A code that tells a radar unit you’re listening on its frequency without calling. It doesn’t guarantee a warning. Reset to 7000 when you leave."
  },
  {
    "id": "radio-fc-36",
    "subject": "radio",
    "q": "Callsign order: first call vs reply?",
    "a": "First call: their station, then you. Reply: your answer, then your callsign."
  },
  {
    "id": "radio-fc-37",
    "subject": "radio",
    "q": "When may you abbreviate your callsign?",
    "a": "Only after the ground station has abbreviated it first."
  },
  {
    "id": "radio-fc-38",
    "subject": "radio",
    "q": "Readback order rule?",
    "a": "Same order as it was given."
  },
  {
    "id": "radio-fc-39",
    "subject": "radio",
    "q": "\"Report downwind\" — read back?",
    "a": "No. Just say \"Wilco, (callsign)\"."
  },
  {
    "id": "radio-fc-40",
    "subject": "radio",
    "q": "Callsign suffix Information / Radio / Traffic?",
    "a": "AFIS / Air-Ground (AGCS) / no one on duty, pilots broadcast to each other."
  },
  {
    "id": "radio-fc-41",
    "subject": "radio",
    "q": "SAFETYCOM frequency and limits?",
    "a": "135.480 MHz, within 10 NM and up to 1000 ft above circuit height."
  },
  {
    "id": "radio-fc-42",
    "subject": "radio",
    "q": "\"Final\" vs \"long final\"?",
    "a": "Final is within 4 NM of the threshold, long final is 4–8 NM. Say \"half-mile final\" rather than \"short final\"."
  },
  {
    "id": "radio-fc-43",
    "subject": "radio",
    "q": "When to call an ATC field inbound?",
    "a": "15 NM or 5 minutes from the ATZ, whichever is further."
  },
  {
    "id": "radio-fc-44",
    "subject": "radio",
    "q": "\"Land at your discretion\" — is it a clearance?",
    "a": "No. It comes from AFIS and the decision is yours. Reply \"Landing\"."
  },
  {
    "id": "radio-fc-45",
    "subject": "radio",
    "q": "Say \"ready for take-off\"?",
    "a": "No. Say \"ready for departure\". Only use \"take-off\" once cleared, or when announcing that you are taking off."
  },
  {
    "id": "radio-fc-46",
    "subject": "radio",
    "q": "Basic vs Traffic vs Deconfliction?",
    "a": "Basic: you avoid traffic. Traffic: radar tells you about traffic but gives no avoiding advice. Deconfliction: IFR only, Class G."
  },
  {
    "id": "radio-fc-47",
    "subject": "radio",
    "q": "Freecall order after \"pass your message\"?",
    "a": "Callsign, type, from, to, position, altitude and setting, VFR, intentions."
  },
  {
    "id": "radio-fc-48",
    "subject": "radio",
    "q": "When to request a zone transit?",
    "a": "About 10 minutes before the boundary. Stay outside until you hear \"cleared\"."
  },
  {
    "id": "radio-fc-49",
    "subject": "radio",
    "q": "Is a MATZ controlled airspace for you?",
    "a": "No, but call and ask for a \"MATZ penetration service\"."
  },
  {
    "id": "radio-fc-50",
    "subject": "radio",
    "q": "Mayday call contents?",
    "a": "MAYDAY ×3, station, callsign, type, nature, intentions, position, height and heading, qualification, POB and other info."
  },
  {
    "id": "radio-fc-51",
    "subject": "radio",
    "q": "Who answers 121.5 in the UK?",
    "a": "London Centre, the Distress & Diversion cell."
  },
  {
    "id": "radio-fc-52",
    "subject": "radio",
    "q": "Radio failure squawk & plan?",
    "a": "7600, stay VMC and out of CAS, consider a quiet field, check the signals square and lights."
  }
];
if (typeof globalThis !== 'undefined') globalThis.FLASHCARDS_DATA = FLASHCARDS_DATA;
