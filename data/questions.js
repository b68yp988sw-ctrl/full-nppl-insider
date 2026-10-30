/* ORIGINAL exam questions — UK NPPL / FRTOL study aid — NOT from QuizAero, Pooleys, or commercial banks.
   Explanations are study aids — confirm with instructor / current AIP / CAP. */
const QUESTIONS_DATA = [
  {
    "id": "law-q-01",
    "subject": "law",
    "q": "The NPPL is best described as:",
    "choices": [
      "An ICAO licence valid worldwide without further paperwork",
      "A UK national licence not automatically valid abroad",
      "A military flying permit",
      "An EASA airline transport licence"
    ],
    "ans": 1,
    "exp": "The National Private Pilot's Licence is a UK national licence. Privileges overseas are not automatic. Confirm any foreign flying with the relevant authority and your instructor before you go.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-02",
    "subject": "law",
    "q": "Typical teaching minima for NPPL Microlight Without Operational Limitations include:",
    "choices": [
      "15 hours total only",
      "About 25 hours total with solo and navigation elements as published",
      "100 hours cross-country only",
      "No flight training required"
    ],
    "ans": 1,
    "exp": "Without Operational Limitations the teaching picture is usually around 25 hours total under instruction with solo and navigation elements. Confirm current BMAA/CAP figures with your instructor.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-03",
    "subject": "law",
    "q": "Operational Limitations at initial issue commonly include:",
    "choices": [
      "IFR only",
      "No passengers and tighter weather/distance limits",
      "Night flying mandatory",
      "Class A access"
    ],
    "ans": 1,
    "exp": "Operational Limitations typically mean no passengers, tighter weather minima, and a distance limit from take-off. Confirm exact wording on your licence with your instructor.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-04",
    "subject": "law",
    "q": "In UK Class A airspace (e.g. London TMA / many airways), VFR flight is:",
    "choices": [
      "Always permitted by day for microlights",
      "Not permitted — Class A is IFR only",
      "Allowed below 3,000 ft without clearance",
      "Allowed with Mode A only"
    ],
    "ans": 1,
    "exp": "Class A is IFR-only. Microlight NPPL VFR pilots must stay out — including under the London TMA and airways when Class A. Plan altitudes carefully on the chart.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-05",
    "subject": "law",
    "q": "To enter a Class D CTR you generally need:",
    "choices": [
      "Only a listening squawk",
      "An ATC clearance before entry plus two-way radio",
      "Nothing if you remain VMC",
      "A MATZ penetration call only"
    ],
    "ans": 1,
    "exp": "Class D requires two-way radio and an ATC clearance before entry. VFR is possible with clearance, but do not enter hoping to sort it out inside.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-06",
    "subject": "law",
    "q": "An ATZ is primarily intended to protect:",
    "choices": [
      "Oceanic tracks",
      "Aerodrome circuit traffic",
      "Class A airways only",
      "Gliding wave windows only"
    ],
    "ans": 1,
    "exp": "An Aerodrome Traffic Zone protects traffic in and around the circuit. Know dimensions and Rule 11 procedures before joining.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-07",
    "subject": "law",
    "q": "Rule 11 teaching essence for ATZ entry requires:",
    "choices": [
      "Squawk 7000 only",
      "Two-way communications or the published procedure",
      "No radio ever",
      "Permission from NATS HQ"
    ],
    "ans": 1,
    "exp": "Establish two-way communications before entering an ATZ, or follow the published AIP/plate procedure. Blind joining without the required contact is a common trap.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-08",
    "subject": "law",
    "q": "A MATZ is:",
    "choices": [
      "Civil Class A airspace",
      "Not civil controlled airspace, but the civil ATZ inside still matters",
      "Always compulsory to enter",
      "The same as a CTR"
    ],
    "ans": 1,
    "exp": "A MATZ is not civil controlled airspace, but good airmanship is to call for penetration. The civil ATZ inside still needs proper two-way.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-09",
    "subject": "law",
    "q": "Day VMC minima teaching for Class G at or below 3,000 ft AMSL and IAS ≤140 kt typically include:",
    "choices": [
      "8 km visibility and 1,000 ft vertical from cloud",
      "About 1,500 m flight visibility, clear of cloud, surface in sight",
      "Always 5 km and 1,000 ft from cloud",
      "IFR minima only"
    ],
    "ans": 1,
    "exp": "Low-level Class G teaching often uses about 1,500 m flight visibility, clear of cloud, surface in sight. Above 3,000 ft the tighter picture applies. Ops-limits can be stricter.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-10",
    "subject": "law",
    "q": "Most of the UK countryside where microlights typically operate is:",
    "choices": [
      "Class A",
      "Class D everywhere",
      "Class G uncontrolled airspace under standard VFR Rules of the Air",
      "Class E only"
    ],
    "ans": 1,
    "exp": "Class G covers much of the country used by microlights. You still obey SERA VMC minima and Rules of the Air. Controlled airspace needs the correct clearance or avoidance.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-11",
    "subject": "law",
    "q": "Class E airspace in the UK at low level is:",
    "choices": [
      "The most common class for microlight circuits",
      "Relatively uncommon at low level — know local charting and clearance differences",
      "Identical to Class A for VFR",
      "Always free to enter without radio"
    ],
    "ans": 1,
    "exp": "Class E is less common in day-to-day low-level UK microlight flying than G or D. Where it exists, rules differ from D — read the chart and AIP.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-12",
    "subject": "law",
    "q": "Congested-area low-flying teaching height is typically not below:",
    "choices": [
      "500 ft above the highest object within 600 m",
      "1,000 ft above the highest fixed object within 600 m",
      "2,000 ft AGL always",
      "100 ft AGL"
    ],
    "ans": 1,
    "exp": "Over congested areas teaching is not below 1,000 ft above the highest fixed object within 600 m. Elsewhere the 500 ft rule applies with exceptions as taught.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-13",
    "subject": "law",
    "q": "When two aircraft converge head-on, both should:",
    "choices": [
      "Climb",
      "Alter course to the right",
      "Alter course to the left",
      "Maintain heading"
    ],
    "ans": 1,
    "exp": "Head-on: both alter right. Converging: give way to the aircraft on your right. Overtaking: pass on the right. Lookout first.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-14",
    "subject": "law",
    "q": "SSR conspicuity code commonly used for VFR when no other code is assigned:",
    "choices": [
      "7700",
      "7000",
      "7500",
      "7600"
    ],
    "ans": 1,
    "exp": "7000 is usual VFR conspicuity. 7700 emergency, 7600 radio fail, 7500 unlawful interference. Check local listening squawks for your route.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-15",
    "subject": "law",
    "q": "Radio failure squawk is:",
    "choices": [
      "7000",
      "7600",
      "7700",
      "0033"
    ],
    "ans": 1,
    "exp": "Squawk 7600 for radio failure. Stay VMC if possible, join carefully, watch for light signals.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-16",
    "subject": "law",
    "q": "Emergency squawk is:",
    "choices": [
      "7000",
      "7500",
      "7700",
      "2000"
    ],
    "ans": 1,
    "exp": "7700 is the emergency squawk. Fly the aeroplane first, then communicate. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-17",
    "subject": "law",
    "q": "UK alcohol blood limit teaching figure for aviation is:",
    "choices": [
      "80 mg/100 ml",
      "20 mg/100 ml",
      "50 mg/100 ml",
      "No limit if feeling fine"
    ],
    "ans": 1,
    "exp": "UK aviation alcohol limits are low (teaching about 20 mg/100 ml blood). Many schools teach 8 hours bottle-to-throttle or longer. Legal is not the same as fit.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-18",
    "subject": "law",
    "q": "Passenger currency teaching before carrying passengers as PIC:",
    "choices": [
      "1 landing in the last year",
      "3 take-offs and landings in the preceding 90 days as PIC",
      "No currency for microlights",
      "10 hours last month"
    ],
    "ans": 1,
    "exp": "Teaching point: 3 take-offs and landings as PIC in the preceding 90 days before carrying passengers. Confirm current rules with your instructor.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-19",
    "subject": "law",
    "q": "Documents a microlight PIC should be able to produce when required typically include:",
    "choices": [
      "Only a logbook",
      "Licence + medical/PMD, registration, and Permit to Fly / Certificate of Validity as applicable",
      "Passport only",
      "Insurance only"
    ],
    "ans": 1,
    "exp": "Be ready with licence and medical/PMD, Certificate of Registration, and Permit to Fly with Certificate of Validity as applicable.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-20",
    "subject": "law",
    "q": "Who has final go/no-go authority?",
    "choices": [
      "The fuel attendant",
      "The pilot-in-command",
      "Any passenger",
      "ATC always"
    ],
    "ans": 1,
    "exp": "The PIC decides go/no-go. Legal VFR can still be a poor day for a light microlight. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-21",
    "subject": "law",
    "q": "Typical ATZ radius teaching for runway ≤1,850 m:",
    "choices": [
      "5 NM up to 5,000 ft",
      "About 2 NM radius up to 2,000 ft above aerodrome level",
      "10 NM cylinder",
      "Only the runway strip"
    ],
    "ans": 1,
    "exp": "Teaching size: roughly 2 NM radius from midpoint up to 2,000 ft aal for many ATZs. Confirm exact dimensions on the chart/AIP.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-22",
    "subject": "law",
    "q": "SERA day VMC above 3,000 ft AMSL (teaching) typically needs flight visibility about:",
    "choices": [
      "1,500 m",
      "5 km",
      "8 km always",
      "150 m"
    ],
    "ans": 1,
    "exp": "Above 3,000 ft AMSL teaching is often 5 km visibility plus distances from cloud. Ops-limits NPPL weather can be stricter.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-23",
    "subject": "law",
    "q": "PPR means:",
    "choices": [
      "Preferred Passenger Rate",
      "Prior Permission Required",
      "Pressure Pattern Routing",
      "Pilot Performance Rating"
    ],
    "ans": 1,
    "exp": "Prior Permission Required — many UK fields expect phone/online PPR before arrival. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-24",
    "subject": "law",
    "q": "When overtaking in the air, teaching is to pass:",
    "choices": [
      "On the left",
      "On the right",
      "Above only",
      "Below only"
    ],
    "ans": 1,
    "exp": "Pass on the right; the overtaken aircraft has right of way. Keep well clear. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-25",
    "subject": "law",
    "q": "Ground exams for NPPL theory typically must be within what period before licence application (teaching)?",
    "choices": [
      "6 months",
      "24 months",
      "10 years",
      "No time limit"
    ],
    "ans": 1,
    "exp": "Teaching: ground exams usually within 24 months before application. Confirm current CAP/BMAA timescales.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-26",
    "subject": "law",
    "q": "A CTR is:",
    "choices": [
      "Always Class G",
      "A Control Zone around an aerodrome, class as charted",
      "Only used at night",
      "A MATZ stub"
    ],
    "ans": 1,
    "exp": "A Control Zone protects an aerodrome and is charted with a class (often D). Need appropriate clearance before entry.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-27",
    "subject": "law",
    "q": "VFR flight in IMC is:",
    "choices": [
      "OK with GPS",
      "Not permitted — remain in VMC for VFR",
      "Allowed below 500 ft",
      "Allowed in Class A"
    ],
    "ans": 1,
    "exp": "VFR requires Visual Meteorological Conditions. If you cannot stay VMC, divert or turn back early.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-28",
    "subject": "law",
    "q": "The 500 ft rule teaching (away from congested areas) is about:",
    "choices": [
      "Minimum cloud base always",
      "Not flying within 500 ft of persons, vessels, vehicles or structures (with exceptions as taught)",
      "Maximum crosswind",
      "Radio range"
    ],
    "ans": 1,
    "exp": "Away from congested areas, teaching emphasises not within 500 ft of person/vessel/vehicle/structure, with training exceptions as taught.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-29",
    "subject": "law",
    "q": "AFIS provides:",
    "choices": [
      "Full ATC clearances like a tower",
      "Flight Information Service — information and advice, not ATC clearances",
      "No radio",
      "Only ATIS"
    ],
    "ans": 1,
    "exp": "AFIS gives information and advice; the PIC remains responsible for collision avoidance. Phraseology differs from full ATC.",
    "lesson": "radio-02"
  },
  {
    "id": "law-q-30",
    "subject": "law",
    "q": "AGCS / Air/Ground typically means:",
    "choices": [
      "Radar vectors",
      "A radio operator providing traffic/aerodrome information — not ATC",
      "Compulsory IFR",
      "Class A access"
    ],
    "ans": 1,
    "exp": "Air/Ground provides information, not clearances. You sequence yourself safely. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "law-q-31",
    "subject": "law",
    "q": "SAFETYCOM 135.480 should be used:",
    "choices": [
      "Worldwide en-route always",
      "Only within published limits for unmanned aerodrome traffic as taught",
      "Instead of 121.500 for MAYDAY",
      "As Class D clearance"
    ],
    "ans": 1,
    "exp": "SAFETYCOM is for traffic at certain unmanned aerodromes within published limits — not general chat.",
    "lesson": "radio-03"
  },
  {
    "id": "law-q-32",
    "subject": "law",
    "q": "Temporary Danger Areas / restrictions on your route should be:",
    "choices": [
      "Ignored if VMC",
      "Briefed from NOTAM/AIP — avoid or comply",
      "Entered if squawking 7000",
      "Only for airlines"
    ],
    "ans": 1,
    "exp": "Temporary and permanent restrictions appear in NOTAMs and AIP. Brief, plot, avoid or comply.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-33",
    "subject": "law",
    "q": "Listening squawks should be:",
    "choices": [
      "Invented by the pilot",
      "Confirmed from current AIP/chart notes for the area",
      "Always 7000 only",
      "The same as 7700"
    ],
    "ans": 1,
    "exp": "Listening squawks are area-specific and change. Check current notes; still make radio contact when required.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-34",
    "subject": "law",
    "q": "QNH is the pressure setting so the altimeter reads:",
    "choices": [
      "Height above aerodrome only",
      "Altitude AMSL",
      "Always Flight Level",
      "Density altitude"
    ],
    "ans": 1,
    "exp": "QNH makes the altimeter show altitude above mean sea level. QFE shows height above aerodrome datum.",
    "lesson": "met-01"
  },
  {
    "id": "law-q-35",
    "subject": "law",
    "q": "Gliders in many teaching right-of-way pictures:",
    "choices": [
      "Always give way to powered aircraft",
      "Often have priority — give them room",
      "Must stay on the ground",
      "Use Class A freely"
    ],
    "ans": 1,
    "exp": "Gliders and landing aircraft often have priority. Watch for winch cables and aerotows. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-36",
    "subject": "law",
    "q": "If unsure whether airspace ahead is Class D or G:",
    "choices": [
      "Press on at 2,000 ft",
      "Stop, check chart/moving map with current data, ask ATS if needed",
      "Assume Class G",
      "Climb into CAS to see"
    ],
    "ans": 1,
    "exp": "Never guess airspace. Cross-check chart and database currency; call ATS early. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-37",
    "subject": "law",
    "q": "Noise-abatement procedures should be:",
    "choices": [
      "Ignored in a microlight",
      "Followed as published unless safety requires otherwise",
      "Only for jets",
      "Optional if squawking 7000"
    ],
    "ans": 1,
    "exp": "Follow published noise tracks and heights unless safety requires a deviation. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-38",
    "subject": "law",
    "q": "Day VFR teaching for microlights typically excludes:",
    "choices": [
      "Circuits",
      "Night flying as a normal NPPL microlight privilege",
      "Navigation exercises",
      "ATZ joins"
    ],
    "ans": 1,
    "exp": "Standard NPPL microlight privileges are day VFR oriented. Night needs additional privileges.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-39",
    "subject": "law",
    "q": "Converging: other aircraft on your right — you should:",
    "choices": [
      "Maintain heading",
      "Give way",
      "Climb through their level",
      "Turn left into them"
    ],
    "ans": 1,
    "exp": "Give way to the aircraft on your right. Alter early and obviously. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-03"
  },
  {
    "id": "law-q-40",
    "subject": "law",
    "q": "AIC colour memory — green AIC commonly linked to:",
    "choices": [
      "Charts and maps only",
      "Safety-related topics",
      "Admin only",
      "Temporary airspace only"
    ],
    "ans": 1,
    "exp": "Green AICs are commonly taught as safety-related. Colour is a memory aid — always read the AIC text. Hook idea: green = go careful / safety.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-41",
    "subject": "law",
    "q": "AIC colour memory — mauve/purple AIC commonly linked to:",
    "choices": [
      "Office admin only",
      "Temporary airspace restriction themes",
      "Chart legend only",
      "Fuel prices"
    ],
    "ans": 1,
    "exp": "Mauve AICs are the exam hook for temporary airspace restriction themes. Pair with NOTAMs; do not rely on colour alone. Hook idea: mauve = move aside / restricted.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-42",
    "subject": "law",
    "q": "AIC colour memory — yellow AIC commonly linked to:",
    "choices": [
      "ATS operations / procedures themes",
      "Gliding only",
      "Squawk lists",
      "Desert weather"
    ],
    "ans": 1,
    "exp": "Yellow AICs are commonly taught as ATS operations/procedures. Hook idea: yellow = yield to procedures. Read the document.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-43",
    "subject": "law",
    "q": "AIC colour memory — pink/white admin AIC commonly linked to:",
    "choices": [
      "Temporary danger areas only",
      "Admin / general information themes",
      "Mandatory IFR",
      "Mode S only"
    ],
    "ans": 1,
    "exp": "Pink/white admin-style AICs cover general/administrative information. Hook idea: pale paper = paperwork.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-44",
    "subject": "law",
    "q": "AIC colour memory — chart/maps related AIC:",
    "choices": [
      "Only mauve",
      "Associated with chart and map update themes",
      "Always green",
      "Never published"
    ],
    "ans": 1,
    "exp": "Chart and map update AICs have their own colour category in UK teaching. When charts change, brief the AIC and get the current sheet.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-45",
    "subject": "law",
    "q": "For temporary airspace restrictions, trustworthy sources include:",
    "choices": [
      "Teletext and social media only",
      "NOTAMs, AIS information, and relevant mauve AICs as published",
      "Green AICs only always",
      "Yesterday's newspaper"
    ],
    "ans": 1,
    "exp": "Use official AIS/NOTAM channels and relevant AICs. Do not brief temporary restrictions from unofficial sources.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-46",
    "subject": "law",
    "q": "Permit to Fly / Certificate of Validity out of date means:",
    "choices": [
      "Fly if insured",
      "Do not fly until validity is restored as required",
      "Only passengers banned",
      "Night only banned"
    ],
    "ans": 1,
    "exp": "Airworthiness documents must be valid. Check dates in planning. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-04"
  },
  {
    "id": "law-q-47",
    "subject": "law",
    "q": "VRPs are used to:",
    "choices": [
      "Replace GPS",
      "Help ATS identify your position relative to the aerodrome",
      "Mark Class A only",
      "Set QFE"
    ],
    "ans": 1,
    "exp": "Visual Reporting Points are charted landmarks used in clearances and traffic info. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-02"
  },
  {
    "id": "law-q-48",
    "subject": "law",
    "q": "Ops-limits weather vs SERA VMC is often:",
    "choices": [
      "More relaxed",
      "Tighter (higher vis / cloud requirements)",
      "Identical",
      "Only about wind"
    ],
    "ans": 1,
    "exp": "Operational Limitations commonly impose tighter weather and distance limits. Use the tighter box until limits are lifted.",
    "lesson": "law-01"
  },
  {
    "id": "law-q-49",
    "subject": "law",
    "q": "Controlled vs uncontrolled airspace — teaching essence:",
    "choices": [
      "Identical rules",
      "Controlled needs ATC clearance/procedures as charted; Class G uses Rules of the Air without ATC clearance to enter",
      "Class G needs Class A clearance",
      "Microlights ignore class"
    ],
    "ans": 1,
    "exp": "Controlled airspace has entry rules. Class G is uncontrolled but not rule-free. Read the schematic/chart before every flight.",
    "lesson": "law-02"
  },
  {
    "id": "law-q-50",
    "subject": "law",
    "q": "A taxiway location sign (yellow letter on black) means:",
    "choices": [
      "The runway ahead",
      "The taxiway you are on",
      "Closed pavement",
      "ATC closed"
    ],
    "ans": 1,
    "exp": "Yellow characters on a black background mark the taxiway you are currently on. Our memory hook: dark ground = you are standing on it. Confirm local paint/sign standards with instructor.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-51",
    "subject": "law",
    "q": "A yellow sign with a large C near the tower/building often means:",
    "choices": [
      "Climb immediately",
      "After-landing book-in / landing fees reporting point",
      "Closed runway",
      "Class C airspace"
    ],
    "ans": 1,
    "exp": "The yellow C reporting/book-in point is commonly near the tower or ops building for landing fees and booking in. Follow local airfield instructions.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-52",
    "subject": "law",
    "q": "Runway threshold piano keys and a designator like 36 indicate:",
    "choices": [
      "True north exactly always",
      "Magnetic runway heading to the nearest 10 degrees (36 ≈ 360° magnetic)",
      "Wind from 360 only",
      "Taxiway 36"
    ],
    "ans": 1,
    "exp": "Runway numbers are magnetic heading rounded to the nearest 10 degrees. 09 ≈ 090°, 27 ≈ 270°, 36 ≈ 360°. Opposite end differs by 18.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-53",
    "subject": "law",
    "q": "Permanently displaced threshold marked with arrows typically means:",
    "choices": [
      "Land on the arrows",
      "Take-off/taxi may be allowed on the pre-threshold area, but do not land on the displaced portion",
      "Pavement is closed to everyone",
      "Only gliders may land there"
    ],
    "ans": 1,
    "exp": "Displaced threshold: landing begins at the threshold markings. The area before may be usable for take-off or taxi as published — not for landing. Confirm AIP/plate.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-54",
    "subject": "law",
    "q": "Pavement marked with large Xs means:",
    "choices": [
      "Preferred landing zone",
      "Closed — not for any aircraft use",
      "Take-off only",
      "Glider winch track"
    ],
    "ans": 1,
    "exp": "Closed pavement is marked with Xs. Do not use it for taxi, take-off, or landing. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-55",
    "subject": "law",
    "q": "A red-and-yellow chequered flag at an aerodrome typically indicates:",
    "choices": [
      "Fuel unavailable",
      "ATC is in operation — apron movement only with ATC permission",
      "Runway closed permanently",
      "Gliding competition only"
    ],
    "ans": 1,
    "exp": "Red-and-yellow chequered flag teaching: ATC in operation; do not move on the apron without ATC permission. Confirm local signals with instructor.",
    "lesson": "law-signs"
  },
  {
    "id": "met-q-01",
    "subject": "met",
    "q": "ISA sea-level temperature teaching figure is:",
    "choices": [
      "0 °C",
      "15 °C",
      "25 °C",
      "−56 °C"
    ],
    "ans": 1,
    "exp": "ISA sea-level temperature is 15 °C with pressure about 1013 hPa. Real UK days deviate — use QNH and actual temperatures for performance thinking.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-02",
    "subject": "met",
    "q": "ISA sea-level pressure teaching figure is about:",
    "choices": [
      "1000 hPa",
      "1013 hPa",
      "980 hPa",
      "1030 hPa always"
    ],
    "ans": 1,
    "exp": "ISA sea-level pressure is about 1013 hPa. Setting 1013 gives pressure altitude. For terrain clearance use local QNH or QFE as briefed.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-03",
    "subject": "met",
    "q": "QFE set on the altimeter makes it read approximately:",
    "choices": [
      "Flight level",
      "Height above the aerodrome datum",
      "Altitude AMSL always",
      "Density altitude"
    ],
    "ans": 1,
    "exp": "QFE makes the altimeter read height above the aerodrome datum (roughly zero on the runway). Useful in the circuit when the unit works QFE.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-04",
    "subject": "met",
    "q": "A high density altitude means performance will generally:",
    "choices": [
      "Improve",
      "Degrade (longer take-off, poorer climb)",
      "Be unchanged",
      "Only affect radios"
    ],
    "ans": 1,
    "exp": "Hot, high, or low-pressure conditions raise density altitude and reduce performance. Microlights feel this on warm days and short strips.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-05",
    "subject": "met",
    "q": "Wind is reported as the direction:",
    "choices": [
      "It is blowing towards",
      "It is blowing from",
      "Magnetic only always",
      "True only never"
    ],
    "ans": 1,
    "exp": "Meteorological wind is FROM which it blows. METARs use degrees true; tower winds are often magnetic.",
    "lesson": "met-02"
  },
  {
    "id": "met-q-06",
    "subject": "met",
    "q": "Growing cumulus / congestus can indicate:",
    "choices": [
      "Stable sinking air only",
      "Possible showers and turbulence; watch for CB development",
      "Perfect smooth air always",
      "Fog only"
    ],
    "ans": 1,
    "exp": "Towering cumulus can grow into cumulonimbus. Microlights should give convective weather a wide berth.",
    "lesson": "met-02"
  },
  {
    "id": "met-q-07",
    "subject": "met",
    "q": "A cold front passage often brings:",
    "choices": [
      "Warm moist air and steady drizzle only",
      "A wind veer, possible showers, and clearer cooler air behind",
      "No wind change",
      "Always fog"
    ],
    "ans": 1,
    "exp": "Cold fronts can bring a wind shift, showers or thunderstorms, then clearer cooler air. Brief timing on your route.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-08",
    "subject": "met",
    "q": "Radiation fog typically forms:",
    "choices": [
      "In strong winds over hills only",
      "On clear calm nights when ground cools the air to dew point",
      "Only in deserts",
      "Only above FL100"
    ],
    "ans": 1,
    "exp": "Radiation fog needs clear skies, light winds, and moist air cooling overnight. Check TAF TEMPO/BECMG and have a diversion.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-09",
    "subject": "met",
    "q": "Carburettor icing risk is often highest in:",
    "choices": [
      "Hot dry desert air only",
      "Cool moist air, including unexpectedly in mild UK temperatures",
      "Only below −20 °C",
      "Only above 10,000 ft"
    ],
    "ans": 1,
    "exp": "Carb ice can form in mild moist conditions, especially at low power. Know signs and hot-air procedures for your engine — confirm POH.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-10",
    "subject": "met",
    "q": "In a METAR, FEW015 means:",
    "choices": [
      "Fog at 15 km",
      "Few clouds at about 1,500 ft AGL",
      "15 kt wind",
      "QNH 1015 only"
    ],
    "ans": 1,
    "exp": "Cloud amount FEW/SCT/BKN/OVC with height in hundreds of feet AGL. FEW015 ≈ few at 1,500 ft.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-11",
    "subject": "met",
    "q": "METAR code RA means:",
    "choices": [
      "Rain",
      "Radar advisory",
      "Right aileron",
      "Restricted area"
    ],
    "ans": 0,
    "exp": "RA is rain; SHRA showers; DZ drizzle; SN snow; FG fog; BR mist. Intensity prefixes matter for go/no-go.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-12",
    "subject": "met",
    "q": "A TAF differs from a METAR mainly because it is:",
    "choices": [
      "A snapshot observation",
      "A forecast for a period at an aerodrome",
      "Only used by airlines",
      "Always more accurate"
    ],
    "ans": 1,
    "exp": "METARs are observations; TAFs are forecasts with change groups. Read both. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-13",
    "subject": "met",
    "q": "CAVOK teaching meaning includes:",
    "choices": [
      "Ceilings below 100 ft",
      "Visibility 10 km or more, no significant cloud below 5,000 ft, no significant weather as defined",
      "Must be raining",
      "Winds calm only"
    ],
    "ans": 1,
    "exp": "CAVOK packs several nice-day criteria into one code. Still check gusts and crosswind for microlights.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-14",
    "subject": "met",
    "q": "Decode wind 24015G25KT:",
    "choices": [
      "From 240° at 15 kt gusting 25 kt",
      "To 240° at 15 kt",
      "Visibility 240 m",
      "Cloud at 2,400 ft"
    ],
    "ans": 0,
    "exp": "Wind from 240° true at 15 kt, gusting 25 kt. Gust spread matters for microlight crosswind.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-15",
    "subject": "met",
    "q": "NOSIG on a METAR trend means:",
    "choices": [
      "No significant change expected shortly",
      "No signal",
      "Not signed",
      "Night operations significant"
    ],
    "ans": 0,
    "exp": "NOSIG indicates no significant change expected in the short trend period. Still read the TAF for later.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-16",
    "subject": "met",
    "q": "Visibility 9999 in a METAR means:",
    "choices": [
      "9,999 m exactly only",
      "10 km or more",
      "99 ft",
      "Fog"
    ],
    "ans": 1,
    "exp": "9999 means visibility 10 km or more. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-17",
    "subject": "met",
    "q": "BKN025 means cloud is:",
    "choices": [
      "Few at 250 ft",
      "Broken at about 2,500 ft AGL",
      "Clear skies",
      "Wind 25 kt"
    ],
    "ans": 1,
    "exp": "Broken at 2,500 ft is a significant ceiling for VFR. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-18",
    "subject": "met",
    "q": "METAR timestamp 121650Z means:",
    "choices": [
      "12 June 16:50 UTC",
      "Day 12 at 16:50 UTC",
      "Year 1216",
      "QNH 1650"
    ],
    "ans": 1,
    "exp": "Day of month and time UTC (Zulu). In UK summer (BST) convert +1 hour for local clock — weather stays on UTC.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-19",
    "subject": "met",
    "q": "Thunderstorms (TS) near your route mean:",
    "choices": [
      "Fly underneath for lift",
      "Avoid — severe turbulence, gusts, hail, lightning risk",
      "Only a radio problem",
      "Safe if CAVOK elsewhere"
    ],
    "ans": 1,
    "exp": "Never treat CB/TS lightly. Divert, delay, or land early. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-20",
    "subject": "met",
    "q": "PROB40 TEMPO 1416 TSRA suggests:",
    "choices": [
      "Guaranteed thunderstorms all day",
      "40% probability of temporary thunderstorms with rain in the 14–16 Z window",
      "No weather",
      "Wind only"
    ],
    "ans": 1,
    "exp": "PROB and TEMPO qualify likelihood and temporary changes. Even 40% TS risk is often a no-go for microlights.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-21",
    "subject": "met",
    "q": "Dew point close to temperature suggests:",
    "choices": [
      "Very dry air",
      "High relative humidity — mist/fog/cloud more likely",
      "Desert conditions",
      "High freezing level always"
    ],
    "ans": 1,
    "exp": "Small temperature–dew-point spread means moist air and greater chance of mist, fog, or low cloud.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-22",
    "subject": "met",
    "q": "Flying towards lower pressure without updating QNH means true altitude is:",
    "choices": [
      "Higher than indicated",
      "Lower than indicated (terrain risk)",
      "Unchanged",
      "Always safer"
    ],
    "ans": 1,
    "exp": "From high to low, look out below — indicated altitude overreads relative to true when QNH falls and you do not reset.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-23",
    "subject": "met",
    "q": "Aviation weather and ATC time use:",
    "choices": [
      "Local pub time only",
      "UTC / Zulu",
      "BST only year-round",
      "Sunset tables only"
    ],
    "ans": 1,
    "exp": "ATC and METARs/TAFs use UTC (Zulu). UK winter local ≈ UTC; BST (roughly Mar–Oct) = UTC+1. Always convert when on BST.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-24",
    "subject": "met",
    "q": "High-level cloud family includes:",
    "choices": [
      "Stratus and nimbostratus only",
      "Cirrus, cirrostratus, and cirrocumulus",
      "Only cumulonimbus",
      "Only fog"
    ],
    "ans": 1,
    "exp": "High clouds are the cirrus family: cirrus (Ci), cirrostratus (Cs), cirrocumulus (Cc). Typically ice-crystal, wispy or thin veil.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-25",
    "subject": "met",
    "q": "Middle-level cloud family includes:",
    "choices": [
      "Cirrus only",
      "Altostratus and altocumulus",
      "Only stratus",
      "Only CB anvil"
    ],
    "ans": 1,
    "exp": "Middle clouds: altostratus (As) and altocumulus (Ac). Often water/ice mix; can thicken toward rain-bearing layers.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-26",
    "subject": "met",
    "q": "Low-level cloud family includes:",
    "choices": [
      "Only cirrus",
      "Stratus, stratocumulus, and cumulus",
      "Only altostratus",
      "Only contrails"
    ],
    "ans": 1,
    "exp": "Low clouds: stratus (St), stratocumulus (Sc), and fair-weather cumulus (Cu). These most often set your VFR ceiling.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-27",
    "subject": "met",
    "q": "Nimbostratus is best described as:",
    "choices": [
      "A high ice-crystal tuft",
      "A deep rain-bearing layer cloud, often multi-level",
      "A boundary marker flag",
      "A taxiway sign"
    ],
    "ans": 1,
    "exp": "Nimbostratus (Ns) is a thick rain layer that can span levels — steady precipitation and poor VFR conditions.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-28",
    "subject": "met",
    "q": "Cumulonimbus is best described as:",
    "choices": [
      "Thin high veil only",
      "Towering convective cloud often with anvil — avoid",
      "Stable fog layer",
      "Altostratus sheet"
    ],
    "ans": 1,
    "exp": "Cumulonimbus (Cb) towers through levels and often spreads an anvil aloft. Turbulence, hail, lightning, gust fronts — microlights stay well clear.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-29",
    "subject": "met",
    "q": "Which cloud is most associated with steady continuous rain rather than showers?",
    "choices": [
      "Fair-weather cumulus",
      "Nimbostratus",
      "Cirrocumulus",
      "Stratocumulus only always dry"
    ],
    "ans": 1,
    "exp": "Nimbostratus brings steadier rain; shower activity is more Cu/Cb. Brief the difference for go/no-go.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-30",
    "subject": "met",
    "q": "Cirrostratus often appears as:",
    "choices": [
      "A dark low rain sheet",
      "A thin high milky veil, sometimes with halo",
      "Orange boundary boards",
      "Piano keys"
    ],
    "ans": 1,
    "exp": "Cirrostratus is a thin high veil; halos around sun/moon are a classic clue. Can precede frontal weather.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-31",
    "subject": "met",
    "q": "Altocumulus looks like:",
    "choices": [
      "Only fog on the runway",
      "Mid-level heaps or patches, sometimes dappled",
      "Runway Xs",
      "Chequered flags"
    ],
    "ans": 1,
    "exp": "Altocumulus forms mid-level patches or rolls. Some patterns hint at instability — watch trends.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-32",
    "subject": "met",
    "q": "Stratus is typically:",
    "choices": [
      "A towering anvil cloud",
      "A low grey sheet that can sit as a ceiling or hill fog",
      "High ice hooks only",
      "Always CAVOK"
    ],
    "ans": 1,
    "exp": "Stratus is a low featureless sheet — classic VFR spoiler when it sits as a low ceiling or covers ridges.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-33",
    "subject": "met",
    "q": "Stratocumulus is typically:",
    "choices": [
      "Only CB with lightning",
      "A low lumpy layer or patches — may allow gaps",
      "High cirrus hooks",
      "A METAR wind group"
    ],
    "ans": 1,
    "exp": "Stratocumulus is common in the UK — lumpy low layer. Gaps may exist; do not assume they persist for a whole nav.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-34",
    "subject": "met",
    "q": "Fair-weather cumulus usually indicates:",
    "choices": [
      "Severe icing mandatory",
      "Daytime heating and generally usable VFR between build-ups if bases allow",
      "Class A entry",
      "Night only"
    ],
    "ans": 1,
    "exp": "Small Cu often means unstable but flyable air if bases and spacing are good. Growing Cu needs watching.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-35",
    "subject": "met",
    "q": "An anvil top is associated with:",
    "choices": [
      "Stratus",
      "Mature cumulonimbus",
      "Cirrocumulus only",
      "Taxiway C signs"
    ],
    "ans": 1,
    "exp": "The icy anvil is a mature Cb signature. Steer clear of the cell and its outflow. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-36",
    "subject": "met",
    "q": "For a C42-type microlight on a hot day at a short strip, especially check:",
    "choices": [
      "Only radio battery",
      "Density altitude / take-off performance and climb",
      "IFR plates",
      "Autopilot"
    ],
    "ans": 1,
    "exp": "High density altitude lengthens take-off and weakens climb. Soft grass adds drag. Leave margin.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-37",
    "subject": "met",
    "q": "Transition altitude in many UK areas (teaching) is often:",
    "choices": [
      "1,000 ft",
      "About 3,000 ft AMSL (check AIP — some airports differ)",
      "18,000 ft always",
      "500 ft"
    ],
    "ans": 1,
    "exp": "Many UK areas use 3,000 ft AMSL transition altitude; some airports differ. Above transition use 1013 / flight levels as taught.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-38",
    "subject": "met",
    "q": "OVC004 for a VFR microlight departure is:",
    "choices": [
      "Fine for any nav",
      "Overcast at ~400 ft — typically below VFR comfort/legality",
      "Scattered at 4,000 m",
      "Wind overcast"
    ],
    "ans": 1,
    "exp": "Overcast at 400 ft is IMC territory for practical VFR. Do not launch hoping for a hole. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-39",
    "subject": "met",
    "q": "If destination TAF shows TEMPO 800 m FG at ETA:",
    "choices": [
      "Launch without diversion",
      "Plan a solid alternate and consider delaying",
      "Ignore TEMPO",
      "Only check wind"
    ],
    "ans": 1,
    "exp": "TEMPO fog at ETA is a classic trap. Have fuel and a viable alternate, or wait. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-40",
    "subject": "met",
    "q": "SIGMET is:",
    "choices": [
      "A landing fee",
      "A warning of significant en-route weather hazards",
      "Only a METAR remark",
      "A squawk"
    ],
    "ans": 1,
    "exp": "SIGMETs warn of thunderstorms, severe icing/turbulence, etc. Rethink the flight if one covers your route.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-41",
    "subject": "met",
    "q": "RVR is mainly:",
    "choices": [
      "Radar Vector Range",
      "Runway Visual Range — instrument/runway measure",
      "Radio Voice Recording",
      "Restricted VFR Route"
    ],
    "ans": 1,
    "exp": "RVR is mainly for instrument ops. VFR microlight pilots care about reported visibility and surface references.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-42",
    "subject": "met",
    "q": "Approx ISA troposphere lapse rate teaching:",
    "choices": [
      "1 °C per 1,000 ft",
      "About 2 °C per 1,000 ft",
      "10 °C per 100 ft",
      "0 °C always"
    ],
    "ans": 1,
    "exp": "ISA tropospheric lapse teaching is about 2 °C per 1,000 ft. Used for rough freezing-level estimates.",
    "lesson": "met-01"
  },
  {
    "id": "met-q-43",
    "subject": "met",
    "q": "Sea-breeze effects near the coast can:",
    "choices": [
      "Never affect inland areas",
      "Change wind direction/speed inland during the day",
      "Only happen at night",
      "Remove all turbulence"
    ],
    "ans": 1,
    "exp": "Sea breezes can penetrate inland and change surface wind through the day. Ask instructors about local afternoon shifts.",
    "lesson": "met-02"
  },
  {
    "id": "met-q-44",
    "subject": "met",
    "q": "Wind shear near the surface is especially hazardous during:",
    "choices": [
      "Cruise only",
      "Take-off and landing",
      "Refuelling",
      "Radio calls only"
    ],
    "ans": 1,
    "exp": "Shear and gusts bite hardest near the ground. Delay or divert if gusty crosswind is beyond comfort.",
    "lesson": "met-02"
  },
  {
    "id": "met-q-45",
    "subject": "met",
    "q": "Freezing level matters because:",
    "choices": [
      "It only affects jets",
      "Icing and carb-ice risk rise near/above it in moist air",
      "It sets QNH",
      "Same as transition altitude"
    ],
    "ans": 1,
    "exp": "Know approximate freezing level. Microlights rarely have anti-ice — stay out of icing. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-46",
    "subject": "met",
    "q": "FG vs BR in METAR:",
    "choices": [
      "Same thing",
      "FG fog (vis <1 km teaching), BR mist (≥1 km teaching but reduced)",
      "BR is rain",
      "FG is wind"
    ],
    "ans": 1,
    "exp": "Fog and mist are visibility-based. Either can stop a VFR microlight flight. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-47",
    "subject": "met",
    "q": "BECMG 1214 3000 BR means becoming:",
    "choices": [
      "Immediately exact at 12Z only",
      "Toward 3,000 m visibility with mist in the 12–14 Z period",
      "Wind 3000°",
      "Cloud few"
    ],
    "ans": 1,
    "exp": "BECMG describes change over a period. Read times and new groups for your ETA. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-48",
    "subject": "met",
    "q": "Inversions can trap:",
    "choices": [
      "Only cosmic rays",
      "Haze and pollution — reducing visibility",
      "Always stronger climb",
      "Carb heat permanently on"
    ],
    "ans": 1,
    "exp": "Stable inversions can give murky low-level visibility even with acceptable cloud bases. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-02"
  },
  {
    "id": "met-q-49",
    "subject": "met",
    "q": "Virga is:",
    "choices": [
      "A radio call",
      "Precipitation evaporating before the ground — can still mean downdraughts",
      "Always safe rain",
      "An ATZ symbol"
    ],
    "ans": 1,
    "exp": "Virga can indicate downdraughts. Treat convective virga with respect. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-03"
  },
  {
    "id": "met-q-50",
    "subject": "met",
    "q": "Daily METAR decode — first items to read:",
    "choices": [
      "Colour of the paper",
      "Wind, visibility, and cloud/weather groups",
      "Only ICAO",
      "Only bird remarks"
    ],
    "ans": 1,
    "exp": "Start with wind, visibility, and significant weather/cloud, then QNH and trends. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "met-q-51",
    "subject": "met",
    "q": "Which list is high → middle → low cloud families?",
    "choices": [
      "St/Sc/Cu then As/Ac then Ci/Cs/Cc",
      "Ci/Cs/Cc then As/Ac then St/Sc/Cu",
      "Only CB at all levels listed as high",
      "Fog then haze then smoke"
    ],
    "ans": 1,
    "exp": "High = cirrus family; middle = alto-; low = stratus/cumulus family. Ns and Cb are multi-level rain/storm clouds.",
    "lesson": "met-clouds"
  },
  {
    "id": "met-q-52",
    "subject": "met",
    "q": "UK winter local time vs UTC for METAR reading:",
    "choices": [
      "Always add 5 hours",
      "Approximately the same as UTC in winter; add 1 hour in BST",
      "Always subtract 1",
      "Ignore Z"
    ],
    "ans": 1,
    "exp": "UK winter local ≈ UTC. BST ≈ UTC+1. METARs stay on Zulu — convert when planning on a local clock.",
    "lesson": "met-04"
  },
  {
    "id": "nav-q-01",
    "subject": "nav",
    "q": "1° of latitude is approximately:",
    "choices": [
      "1 nm",
      "60 nm",
      "100 nm",
      "15 nm"
    ],
    "ans": 1,
    "exp": "Parallels of latitude run east–west. One degree of latitude is about 60 nautical miles anywhere on Earth. Minutes of latitude give finer position (1' ≈ 1 nm).",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-02",
    "subject": "nav",
    "q": "1° of longitude equals 60 nm:",
    "choices": [
      "Everywhere",
      "Only near the equator; it shrinks toward the poles",
      "Only at the poles",
      "Never"
    ],
    "ans": 1,
    "exp": "Meridians of longitude meet at the poles, so east–west distance per degree shrinks as latitude increases. At the equator ≈ 60 nm; near UK latitudes less.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-03",
    "subject": "nav",
    "q": "Latitude lines (parallels) run:",
    "choices": [
      "North–south through the poles",
      "East–west",
      "Only around London",
      "Along magnetic north"
    ],
    "ans": 1,
    "exp": "Latitude parallels are east–west. Longitude meridians run through the poles. Greenwich is 0° longitude.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-04",
    "subject": "nav",
    "q": "On a half-million (1:500,000) VFR chart vs quarter-million (1:250,000):",
    "choices": [
      "Half-million always shows more ground detail",
      "Quarter-million shows more ground detail but typically charts airspace only to lower levels; half-million covers higher airspace toward FL195 idea",
      "They are identical",
      "Quarter-million is useless for microlights"
    ],
    "ans": 1,
    "exp": "1:250k packs more topographic detail in a larger paper area for the same ground. 1:500k shows less detail but depicts airspace higher (toward FL195 teaching). Pilot chooses which to carry.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-05",
    "subject": "nav",
    "q": "Half-million chart projection teaching (Lambert-style idea): meridians:",
    "choices": [
      "Are always parallel rectangles",
      "Converge toward the true poles — measure track near mid-leg to reduce protractor error",
      "Diverge at the equator only on every chart",
      "Are magnetic only"
    ],
    "ans": 1,
    "exp": "On Lambert conformal conic style charts used for half-million sheets, meridians converge toward the true pole. Measuring track angle near the middle of the leg reduces error from that convergence.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-06",
    "subject": "nav",
    "q": "Quarter-million UK VFR charts commonly use a projection teaching described as:",
    "choices": [
      "Identical Lambert always",
      "Transverse Mercator style in plain terms — different from half-million",
      "No projection",
      "Only stereographic polar"
    ],
    "ans": 1,
    "exp": "UK 1:250k sheets use a different projection family (transverse Mercator teaching) than the half-million Lambert-style sheets. You do not need the maths — know they differ and measure carefully.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-07",
    "subject": "nav",
    "q": "Leg time in minutes ≈:",
    "choices": [
      "Distance × groundspeed",
      "(Distance ÷ groundspeed) × 60",
      "Groundspeed ÷ distance",
      "Distance + groundspeed"
    ],
    "ans": 1,
    "exp": "Minutes = (NM ÷ GS kt) × 60. Example: 40 NM at 80 kt → 40/80×60 = 30 minutes. Round to whole minutes for practical nav logs.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-08",
    "subject": "nav",
    "q": "Distance 36 NM, GS 90 kt. Time en-route ≈:",
    "choices": [
      "18 min",
      "24 min",
      "30 min",
      "36 min"
    ],
    "ans": 1,
    "exp": "36/90×60 = 24 minutes. Work it on CRP-1 or by arithmetic; round sensibly for the log. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-09",
    "subject": "nav",
    "q": "Need 48 NM in 32 minutes. Required GS ≈:",
    "choices": [
      "80 kt",
      "90 kt",
      "100 kt",
      "120 kt"
    ],
    "ans": 1,
    "exp": "GS = NM×60÷min → 48×60÷32 = 90 kt. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-10",
    "subject": "nav",
    "q": "MSA for a leg is:",
    "choices": [
      "The ATZ height always",
      "The lowest safe altitude you work out for that leg against terrain/obstacles",
      "Always 2,000 ft",
      "The MEF plus zero always"
    ],
    "ans": 1,
    "exp": "Minimum Safe Altitude is the pilot's planned lowest safe level for the leg given terrain and obstacles (plus taught margins). It is your responsibility per leg — not a random round number.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-11",
    "subject": "nav",
    "q": "Maximum Elevation Figure (MEF) on a chart quadrant means:",
    "choices": [
      "A cleared altitude you may fly at freely",
      "The highest known elevation in that quadrant including obstacles — NOT a clearance to fly at that height",
      "Minimum Safe Altitude already computed for you",
      "Radio frequency"
    ],
    "ans": 1,
    "exp": "MEF is a chart safety figure showing the highest known terrain/obstacle elevation in the quadrant. It is not an ATC clearance and not automatically your cruising level — use it when building MSA.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-12",
    "subject": "nav",
    "q": "Knots vs mph teaching conversion factor is about:",
    "choices": [
      "2.0",
      "1.15 either way depending on direction",
      "10",
      "0.5"
    ],
    "ans": 1,
    "exp": "1 kt ≈ 1.15 mph; 1 mph ≈ 0.87 kt (or divide mph by 1.15). Know which way you are converting. Microlight ASI may be kt or mph — check the instrument.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-13",
    "subject": "nav",
    "q": "80 kt is about how many mph?",
    "choices": [
      "80",
      "92",
      "70",
      "115"
    ],
    "ans": 1,
    "exp": "80 × 1.15 ≈ 92 mph. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-14",
    "subject": "nav",
    "q": "When converting QNH to approximate QFE, a teaching rule is subtract about:",
    "choices": [
      "1 hPa per 1000 ft",
      "1 hPa per 30 ft of aerodrome elevation",
      "10 hPa per 30 ft",
      "Nothing — they are identical"
    ],
    "ans": 1,
    "exp": "Rough teaching: 1 hPa ≈ 30 ft. For an aerodrome 300 ft AMSL, QFE ≈ QNH − 10 hPa. Worked example: QNH 1020, elev 150 ft → subtract ~5 → QFE ≈ 1015. Confirm with ATIS/ATS.",
    "lesson": "met-01"
  },
  {
    "id": "nav-q-15",
    "subject": "nav",
    "q": "Aerodrome elevation 240 ft, QNH 1013. Approx QFE teaching?",
    "choices": [
      "1013",
      "About 1005",
      "990",
      "1020"
    ],
    "ans": 1,
    "exp": "240/30 ≈ 8 hPa → QFE ≈ 1013 − 8 = 1005. Teaching estimate only — use the unit's stated QFE when given.",
    "lesson": "met-01"
  },
  {
    "id": "nav-q-16",
    "subject": "nav",
    "q": "Why avoid Regional Pressure Setting (RPS) when under a controlled airspace base?",
    "choices": [
      "RPS is always higher than QNH",
      "RPS is the lowest forecast QNH in the region — you can be lower than you think compared with local QNH",
      "RPS is only for jets",
      "RPS equals QFE"
    ],
    "ans": 1,
    "exp": "RPS is a conservative regional lowest forecast QNH. Flying on RPS under a CAS base can leave you lower than a local QNH would show — risking a bust. Prefer local QNH when operating near CAS bases.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-17",
    "subject": "nav",
    "q": "CTA base published as FL55 with QNH 1013 teaching approx altitude AMSL near standard?",
    "choices": [
      "Always 55,000 ft",
      "About 5,500 ft AMSL when 1013 (pressure altitude ≈ altitude)",
      "550 ft",
      "FL only means feet exactly always with any QNH"
    ],
    "ans": 1,
    "exp": "Flight levels are pressure altitudes on 1013. With QNH 1013, FL55 ≈ 5,500 ft AMSL. When QNH differs, convert carefully so you know the approximate altitude of the base. Invent practice: FL45 at 1013 ≈ 4,500 ft.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-18",
    "subject": "nav",
    "q": "If QNH is 993 hPa (20 below 1013), a FL55 base is roughly how many feet AMSL (teaching)?",
    "choices": [
      "5,500",
      "About 4,900 (roughly 20×30 ft lower true)",
      "6,100",
      "550"
    ],
    "ans": 1,
    "exp": "Each hPa ≈ 30 ft. QNH 20 hPa below standard → true altitude of a given FL is about 600 ft lower. FL55 pressure altitude 5500 with low QNH sits nearer ~4900 ft AMSL. Method matters more than memorising one number.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-19",
    "subject": "nav",
    "q": "True track 075°, variation 2°W. Magnetic track ≈:",
    "choices": [
      "073°",
      "077°",
      "075°",
      "085°"
    ],
    "ans": 1,
    "exp": "West is best (add): magnetic = true + west variation → 075+2 = 077°. East variation subtracts.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-20",
    "subject": "nav",
    "q": "Magnetic heading 090°, compass deviation 3°E. Compass heading ≈:",
    "choices": [
      "093°",
      "087°",
      "090°",
      "100°"
    ],
    "ans": 1,
    "exp": "East deviation: compass reads less than magnetic (teaching: compass = magnetic − east). 090−3 = 087°. Confirm your aircraft compass card.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-21",
    "subject": "nav",
    "q": "Fuel planning teaching: trip fuel should include:",
    "choices": [
      "Cruise burn only",
      "Climb + cruise + join/land allowance + reserve, then round up litres as taught",
      "Reserve only",
      "Taxi fuel only"
    ],
    "ans": 1,
    "exp": "Build fuel from phases: climb, cruise, circuit/join/land, then contingency/reserve. Round up for practical uplift. Confirm school policy and POH burns.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-22",
    "subject": "nav",
    "q": "Climb 8 L, cruise 22 L, join/land 3 L, reserve 8 L. Uplift at least about:",
    "choices": [
      "22 L",
      "41 L",
      "30 L",
      "8 L"
    ],
    "ans": 1,
    "exp": "8+22+3+8 = 41 L before any extra contingency your school requires. Round up if uplift steps are coarse.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-23",
    "subject": "nav",
    "q": "Progress check: 18 NM covered in 12 minutes. GS ≈:",
    "choices": [
      "80 kt",
      "90 kt",
      "100 kt",
      "70 kt"
    ],
    "ans": 1,
    "exp": "GS = NM×60÷min → 18×60÷12 = 90 kt. Revise ETA for the remaining distance with this GS. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-24",
    "subject": "nav",
    "q": "Remaining 27 NM at revised GS 90 kt. Minutes left ≈:",
    "choices": [
      "12",
      "18",
      "27",
      "30"
    ],
    "ans": 1,
    "exp": "27/90×60 = 18 minutes. Update ETA from the fix time. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-25",
    "subject": "nav",
    "q": "One-in-sixty rule: 1 NM offline after 60 NM flown is about:",
    "choices": [
      "1° track error",
      "10°",
      "30°",
      "60°"
    ],
    "ans": 0,
    "exp": "One-in-sixty: roughly 1° of track error for each NM off after 60 NM (or proportionally). Closing angle ≈ miles offline × 60 ÷ miles to go.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-26",
    "subject": "nav",
    "q": "6 NM left of track after 30 NM. Approx track error?",
    "choices": [
      "3°",
      "6°",
      "12°",
      "18°"
    ],
    "ans": 2,
    "exp": "TE ≈ offline×60/distance = 6×60/30 = 12°. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-27",
    "subject": "nav",
    "q": "Danger area chart coding teaching: scheduled vs notified means:",
    "choices": [
      "Identical always",
      "Activity may be H24 schedule or by NOTAM/notification — decode the chart legend",
      "Always inactive for microlights",
      "Only mauve AICs without charts"
    ],
    "ans": 1,
    "exp": "Chart legends show whether danger areas are scheduled or notified. Heights are often coded in thousands/hundreds style — learn the legend, do not invent.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-28",
    "subject": "nav",
    "q": "Glider winch/cable launch chart symbols indicate:",
    "choices": [
      "A safe taxiway",
      "Possible cable launches — note height meaning (AGL vs AMSL as charted) and stay clear when active",
      "Compulsory join overhead always",
      "Fuel available"
    ],
    "ans": 1,
    "exp": "Winch cables are invisible hazards. Read the symbol notes for cable height (AGL vs AMSL as published) and brief NOTAMs/activity.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-29",
    "subject": "nav",
    "q": "Using AIP AD section before visiting a new field, you should check among other things:",
    "choices": [
      "Only the cafe menu",
      "Circuit direction, displaced thresholds, PPR, and join methods (overhead vs published alternatives)",
      "Only the ICAO code colour",
      "SSR 7700"
    ],
    "ans": 1,
    "exp": "AIP Aerodrome entries teach circuit direction, thresholds, PPR, rejoins, and restrictions. Read the current AD — do not rely on memory from another field.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-30",
    "subject": "nav",
    "q": "An overhead join is:",
    "choices": [
      "Compulsory at every UK field",
      "A common standard join unless the AIP/plate publishes an alternative",
      "Only for jets",
      "Illegal in Class G"
    ],
    "ans": 1,
    "exp": "Many UK fields expect overhead joins by default, but some publish non-standard joins. Confirm before arrival.",
    "lesson": "radio-03"
  },
  {
    "id": "nav-q-31",
    "subject": "nav",
    "q": "Variation West means magnetic north is:",
    "choices": [
      "East of true",
      "West of true — add west variation to true to get magnetic",
      "Identical to true",
      "Random"
    ],
    "ans": 1,
    "exp": "West variation: magnetic north lies west of true. Magnetic track = true + W. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-32",
    "subject": "nav",
    "q": "On a schematic chart, a rail + river + road combination used as a fix is valuable because:",
    "choices": [
      "It replaces fuel planning",
      "Unique feature clusters make reliable visual pinpointing",
      "It sets QNH",
      "It is Class A"
    ],
    "ans": 1,
    "exp": "Feature combinations (rail/road/river/town shapes) beat single ambiguous lines. Practise on schematics without copying any one exam chart.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-33",
    "subject": "nav",
    "q": "UTC is also called:",
    "choices": [
      "BST always",
      "Zulu time",
      "Local Mean Sun only",
      "ATZ time"
    ],
    "ans": 1,
    "exp": "UTC = Zulu. Used for ATC and weather. Convert for BST when your watch is on summer time. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-04"
  },
  {
    "id": "nav-q-34",
    "subject": "nav",
    "q": "Safety altitude planning should consider:",
    "choices": [
      "Only destination elevation",
      "Highest terrain/obstacles on the leg plus taught margin → MSA",
      "Only MEF without margin",
      "ATZ 2,000 ft always"
    ],
    "ans": 1,
    "exp": "Work MSA from the highest relevant elevation/obstacle plus the margin your instructor teaches. MEF helps; it is not the finished MSA.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-35",
    "subject": "nav",
    "q": "Distance 55 NM, GS 75 kt. Minutes ≈:",
    "choices": [
      "36",
      "40",
      "44",
      "50"
    ],
    "ans": 2,
    "exp": "55×60÷75 = 44 minutes. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-36",
    "subject": "nav",
    "q": "Burn 14 L/h for 1 h 15 min. Fuel ≈:",
    "choices": [
      "14 L",
      "17.5 L",
      "21 L",
      "28 L"
    ],
    "ans": 1,
    "exp": "14 × 75/60 = 17.5 L. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-37",
    "subject": "nav",
    "q": "Lost procedure teaching first priorities include:",
    "choices": [
      "Climb into Class A immediately",
      "Confess early, climb if safe for better radio/view, squawk as taught, and seek help",
      "Turn off the radio",
      "Descend to 200 ft"
    ],
    "ans": 1,
    "exp": "Lost: aviate, navigate, communicate. Climb for reception if safe, use 0030 when appropriate, call ATS/121.500. Confirm school lost procedure.",
    "lesson": "nav-04"
  },
  {
    "id": "nav-q-38",
    "subject": "nav",
    "q": "ISAM / similar teaching mnemonics for lost (essence):",
    "choices": [
      "Ignore maps",
      "Climb / confess / communicate style actions as taught — confirm your school's exact mnemonic",
      "Squawk 7500 first always",
      "Land anywhere immediately without plan"
    ],
    "ans": 1,
    "exp": "Schools use slightly different lost mnemonics. Core: fly the aircraft, fix position, talk to someone. Confirm your instructor's version.",
    "lesson": "nav-04"
  },
  {
    "id": "nav-q-39",
    "subject": "nav",
    "q": "True track between two plotted points is measured:",
    "choices": [
      "With a fuel dipstick",
      "With protractor/plotter from mid-leg on the chart",
      "Only by GPS without chart",
      "From the runway number only"
    ],
    "ans": 1,
    "exp": "Measure true track with a plotter, preferably mid-leg on converging-meridian charts. Then apply variation and deviation for headings.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-40",
    "subject": "nav",
    "q": "Compass heading accounts for:",
    "choices": [
      "Only variation",
      "Deviation of the aircraft compass from magnetic",
      "Only wind",
      "Only QNH"
    ],
    "ans": 1,
    "exp": "Deviation is aircraft-specific compass error. Use the compass card. Magnetic heading ± deviation → compass heading.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-41",
    "subject": "nav",
    "q": "Groundspeed from two fixes is used to:",
    "choices": [
      "Set squawk",
      "Revise ETA and fuel for the remaining route",
      "Change ICAO code",
      "Ignore wind"
    ],
    "ans": 1,
    "exp": "Time and distance between fixes give GS. Apply to remaining distance for new ETA and fuel check.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-42",
    "subject": "nav",
    "q": "Chart airspace base labelled 3500 means teaching:",
    "choices": [
      "Always FL350",
      "Typically 3,500 ft altitude on the charted pressure reference — read the chart legend",
      "35 ft",
      "Only metres"
    ],
    "ans": 1,
    "exp": "Read the chart legend for whether bases are altitudes or flight levels. Do not guess. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-43",
    "subject": "nav",
    "q": "When CAS base is FL45 and you cruise at 3,400 ft QNH in Class G nearby:",
    "choices": [
      "You have automatically entered FL45",
      "You may be legal if clear of the CAS laterally/vertically — confirm chart and altimetry carefully",
      "You must squawk 7700",
      "FL45 equals 345 ft"
    ],
    "ans": 1,
    "exp": "Know whether your altitude conflicts with the CAS base after converting FL to approx altitude for the day's QNH. Stay outside laterally if unsure.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-44",
    "subject": "nav",
    "q": "Wind correction: wind from the right typically causes drift:",
    "choices": [
      "Right",
      "Left (port)",
      "Nil always",
      "Up only"
    ],
    "ans": 1,
    "exp": "Wind from starboard drifts you port. Correct heading into wind. Practice on CRP-1. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-45",
    "subject": "nav",
    "q": "TAS 70 kt, 15 kt direct headwind. Approx GS:",
    "choices": [
      "55 kt",
      "70 kt",
      "85 kt",
      "15 kt"
    ],
    "ans": 0,
    "exp": "Rough direct headwind: GS ≈ TAS − HW = 55 kt. Crosswind needs the triangle. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-46",
    "subject": "nav",
    "q": "A notified danger area may be active:",
    "choices": [
      "Never",
      "When notified by NOTAM/AIS — check before transit assumptions",
      "Only at weekends always",
      "Only above FL195"
    ],
    "ans": 1,
    "exp": "Notified areas need a current brief. Scheduled areas follow published times — still check NOTAMs for changes.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-47",
    "subject": "nav",
    "q": "Height of a winch cable on charts may be annotated:",
    "choices": [
      "Only as Class A",
      "As AGL or AMSL per legend — read which",
      "Only in kilometres always",
      "As QFE only"
    ],
    "ans": 1,
    "exp": "Misreading AGL vs AMSL for cable height is dangerous. Read the note. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-48",
    "subject": "nav",
    "q": "Flight plan sheet skills include:",
    "choices": [
      "Only passenger names",
      "True track, distance, variation, headings, time, fuel phases",
      "Only the cafe stop",
      "SSR decoration"
    ],
    "ans": 1,
    "exp": "Nav logs capture track, distance, headings (T/M/C), times, and fuel. Practise with original numbers — not cloned exam routes.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-49",
    "subject": "nav",
    "q": "Orange/white boundary markers (boards/flags) teaching meaning:",
    "choices": [
      "Preferred runway centreline",
      "Unfit movement area or aerodrome boundary marking",
      "Fuel pump",
      "ATIS antenna"
    ],
    "ans": 1,
    "exp": "Orange/white markers often show unfit areas or boundaries. Do not treat marked-unfit surfaces as usable.",
    "lesson": "law-signs"
  },
  {
    "id": "nav-q-50",
    "subject": "nav",
    "q": "Temporary displaced threshold with chevrons/Xs teaching:",
    "choices": [
      "Land anywhere on the markings",
      "Xs = unusable; arrows/chevrons guide take-off allowance vs no landing on displaced part as published",
      "Ignore and land long always",
      "Only for helicopters"
    ],
    "ans": 1,
    "exp": "Temporary threshold changes use chevrons/arrows/Xs. Xs closed; understand which bits allow take-off but not landing. Confirm NOTAM/AIP.",
    "lesson": "law-signs"
  },
  {
    "id": "nav-q-51",
    "subject": "nav",
    "q": "Measuring track on half-million near mid-leg reduces error because:",
    "choices": [
      "Fuel burns less",
      "Meridians converge — mid-leg angle better represents the whole leg",
      "GPS turns off",
      "Variation is zero mid-leg"
    ],
    "ans": 1,
    "exp": "Convergence means a track angle measured at one end can disagree slightly with the other. Mid-leg measurement is the usual teaching fix.",
    "lesson": "nav-02"
  },
  {
    "id": "nav-q-52",
    "subject": "nav",
    "q": "115 mph is about how many knots?",
    "choices": [
      "115",
      "100",
      "130",
      "87"
    ],
    "ans": 1,
    "exp": "Divide by 1.15: 115/1.15 = 100 kt. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-53",
    "subject": "nav",
    "q": "Altimeter setting for terrain clearance en-route when away from local QNH often uses:",
    "choices": [
      "Random 1000",
      "Regional Pressure Setting / regional QNH as taught — with care near CAS bases",
      "QFE from departure all the way",
      "Flight level below 1000 ft always"
    ],
    "ans": 1,
    "exp": "Regional settings help terrain clearance but beware under CAS bases — prefer accurate local QNH there.",
    "lesson": "nav-03"
  },
  {
    "id": "nav-q-54",
    "subject": "nav",
    "q": "A fictional practice: field elev 90 ft, QNH 1022. Approx QFE?",
    "choices": [
      "1022",
      "About 1019",
      "1000",
      "1030"
    ],
    "ans": 1,
    "exp": "90/30 = 3 hPa → ≈ 1019. Teaching estimate. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "met-01"
  },
  {
    "id": "nav-q-55",
    "subject": "nav",
    "q": "ETA revision: departed 10:00 Z, fix at 10:24 Z after 28 NM, 42 NM remaining. New ETA approx:",
    "choices": [
      "10:36 Z",
      "11:00 Z",
      "10:48 Z",
      "11:12 Z"
    ],
    "ans": 1,
    "exp": "GS = 28×60/24 = 70 kt. Remaining 42 NM at 70 kt → 36 min. ETA = 10:24 + 36 = 11:00 Z. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-56",
    "subject": "nav",
    "q": "Distance 22 NM at GS 66 kt. Time ≈:",
    "choices": [
      "15 min",
      "20 min",
      "22 min",
      "30 min"
    ],
    "ans": 1,
    "exp": "22/66×60 = 20 minutes. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-57",
    "subject": "nav",
    "q": "Magnetic variation East 3°, true track 200°. Magnetic track ≈:",
    "choices": [
      "203°",
      "197°",
      "200°",
      "230°"
    ],
    "ans": 1,
    "exp": "East is least: magnetic = true − E → 200−3 = 197°. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-01"
  },
  {
    "id": "nav-q-58",
    "subject": "nav",
    "q": "Which source is NOT appropriate as primary for temporary airspace restrictions?",
    "choices": [
      "NOTAMs",
      "AIS / relevant mauve AICs",
      "Television teletext / random social posts",
      "Official AIP supplements as published"
    ],
    "ans": 2,
    "exp": "Use official AIS/NOTAM/AIC channels — not teletext or random social media. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "nav-02"
  },
  {
    "id": "tech-q-01",
    "subject": "tech",
    "q": "The four forces in steady level flight are:",
    "choices": [
      "Lift, weight, thrust, drag",
      "Only lift and thrust",
      "Magnetic and true",
      "QNH and QFE"
    ],
    "ans": 0,
    "exp": "Lift opposes weight; thrust opposes drag. In steady level flight they balance in pairs. Climb/descent and turns change the picture.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-02",
    "subject": "tech",
    "q": "An aerofoil produces lift primarily because:",
    "choices": [
      "The engine pulls air under the wing only",
      "Pressure differences from airflow over the shape (Bernoulli/Newton teaching combined)",
      "Fuel colour",
      "Radio waves"
    ],
    "ans": 1,
    "exp": "Cambered aerofoils accelerate air and create pressure difference plus downward turning of flow. Stalls when critical angle is exceeded.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-03",
    "subject": "tech",
    "q": "Angle of attack is:",
    "choices": [
      "Pitch attitude to the horizon only",
      "Angle between chord line and the relative airflow",
      "Magnetic heading",
      "Flap angle only"
    ],
    "ans": 1,
    "exp": "AoA is chord vs relative airflow — not the same as attitude. You can have high AoA nose-low in a stall.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-04",
    "subject": "tech",
    "q": "Stall occurs when:",
    "choices": [
      "IAS is always exactly 40 kt",
      "Critical angle of attack is exceeded",
      "Only when flaps are up",
      "Only above 10,000 ft"
    ],
    "ans": 1,
    "exp": "Stall is about AoA, not a single airspeed. Weight, load factor, and configuration change stall speed.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-05",
    "subject": "tech",
    "q": "In a turn, stall speed:",
    "choices": [
      "Decreases",
      "Increases with load factor",
      "Is unchanged always",
      "Only changes with colour of paint"
    ],
    "ans": 1,
    "exp": "Load factor rises in a turn → higher stall speed. Steep turns need margin and coordination.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-06",
    "subject": "tech",
    "q": "Flaps primarily allow:",
    "choices": [
      "Higher stall speed always",
      "Steeper approaches / lower stall speed for landing as designed",
      "Class A entry",
      "More fuel burn only with no lift change"
    ],
    "ans": 1,
    "exp": "Flaps increase camber/drag (and lift depending on setting) to steepen approach and reduce stall speed for landing. Use POH limits.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-07",
    "subject": "tech",
    "q": "Va / manoeuvring speed teaching essence:",
    "choices": [
      "Never slow below Va",
      "Do not make full abrupt control inputs above Va — structural protection idea",
      "Always fly at Va",
      "Va equals Vne"
    ],
    "ans": 1,
    "exp": "Above Va, full abrupt deflection can overstress. Below Va you may stall before overstressing in some cases. Confirm POH numbers for your type.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-08",
    "subject": "tech",
    "q": "Vne is:",
    "choices": [
      "Never-exceed speed",
      "Normal climb speed",
      "Stall speed flaps down",
      "Best glide always"
    ],
    "ans": 0,
    "exp": "Vne is the never-exceed red line. Do not intentionally exceed it — flutter/structural risk.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-09",
    "subject": "tech",
    "q": "Centre of gravity too far aft typically:",
    "choices": [
      "Makes stall recovery easier",
      "Can make the aircraft pitch unstable / harder to recover from stall",
      "Has no effect",
      "Only affects radio"
    ],
    "ans": 1,
    "exp": "Aft CG reduces static stability and can worsen stall/spin characteristics. Stay within the POH envelope.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-10",
    "subject": "tech",
    "q": "Centre of gravity too far forward typically:",
    "choices": [
      "Improves short-field landing always without cost",
      "Can make rotation/flare heavier and raise stall speed",
      "Removes need for trim",
      "Only helps cruise"
    ],
    "ans": 1,
    "exp": "Forward CG can make the nose heavy, raise stall speed, and harden flare. Still must stay in limits.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-11",
    "subject": "tech",
    "q": "Rotax 912 context — fuel typically:",
    "choices": [
      "Jet A-1 only",
      "MOGAS and/or AVGAS per POH approvals",
      "Diesel only",
      "Water"
    ],
    "ans": 1,
    "exp": "Many Rotax 912 installations approve MOGAS and/or AVGAS within limits. Confirm POH, coolant, and oil specs for the actual aircraft.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-12",
    "subject": "tech",
    "q": "Carburettor ice signs may include:",
    "choices": [
      "Rising RPM with smooth running",
      "RPM drop / rough running especially at low power",
      "Only high CHT always",
      "GPS failure"
    ],
    "ans": 1,
    "exp": "Unexpected RPM drop or roughness can be carb ice. Apply carb heat / alternate air per POH for your induction system.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-13",
    "subject": "tech",
    "q": "Before take-off power check teaching (C42 context) often includes:",
    "choices": [
      "Idle only",
      "Facing into wind at about teaching RPM (e.g. ~3500) and checking mag drop / instruments as briefed",
      "Full flap always",
      "Squawk 7700"
    ],
    "ans": 1,
    "exp": "Power checks need correct RPM, facing into wind where taught, and monitoring temps/pressures/mag drop. Confirm checklist for the aircraft.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-14",
    "subject": "tech",
    "q": "Oil pressure indication in cruise should be:",
    "choices": [
      "Ignored if RPM is OK",
      "Within the green/POH range",
      "Always at zero",
      "Only checked yearly"
    ],
    "ans": 1,
    "exp": "Monitor oil pressure and temperature. Out-of-limits → land and investigate. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-15",
    "subject": "tech",
    "q": "Best glide speed is used to:",
    "choices": [
      "Climb at Vx",
      "Maximise distance for height available after engine failure",
      "Stay above Vne",
      "Enter Class A"
    ],
    "ans": 1,
    "exp": "Best glide (or POH glide speed) stretches the glide. Pitch for speed, then pick a field. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-16",
    "subject": "tech",
    "q": "Vx is approximately:",
    "choices": [
      "Best angle of climb speed",
      "Never exceed",
      "Stall flaps up",
      "Best glide"
    ],
    "ans": 0,
    "exp": "Vx = best angle (most altitude for distance). Vy = best rate (most altitude per time). Confirm POH.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-17",
    "subject": "tech",
    "q": "Vy is approximately:",
    "choices": [
      "Best angle",
      "Best rate of climb speed",
      "Vne",
      "Vfe"
    ],
    "ans": 1,
    "exp": "Vy gives the best climb rate. Used after take-off when obstacle clearance distance is less critical than height gain.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-18",
    "subject": "tech",
    "q": "Ground effect reduces:",
    "choices": [
      "Weight",
      "Induced drag near the surface",
      "Fuel density",
      "Variation"
    ],
    "ans": 1,
    "exp": "In ground effect, induced drag falls — ballooning and float on landing are common student traps.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-19",
    "subject": "tech",
    "q": "Wake turbulence avoidance: land:",
    "choices": [
      "On the same point as a heavy ahead",
      "Beyond the large aircraft's touchdown point",
      "On the threshold always regardless",
      "With flaps up always"
    ],
    "ans": 1,
    "exp": "Stay above the lead aircraft's path and land beyond their touchdown. Wait for vortices to clear in light winds.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-20",
    "subject": "tech",
    "q": "Empty mass + fuel + payload must not exceed:",
    "choices": [
      "Va",
      "MTOW / maximum take-off mass",
      "Vne",
      "Only seat limit ignoring fuel"
    ],
    "ans": 1,
    "exp": "Stay within MTOW and CG envelope. Weigh/calculate — do not guess. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-21",
    "subject": "tech",
    "q": "Fuel specific gravity teaching figure for petrol often ~:",
    "choices": [
      "0.5",
      "0.72",
      "1.0",
      "1.25"
    ],
    "ans": 1,
    "exp": "About 0.72 kg/L is a common MOGAS planning figure. Confirm POH/school. Mass = litres × SG.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-22",
    "subject": "tech",
    "q": "30 L avgas/mogas at 0.72 kg/L ≈:",
    "choices": [
      "15 kg",
      "21.6 kg",
      "30 kg",
      "72 kg"
    ],
    "ans": 1,
    "exp": "30 × 0.72 = 21.6 kg. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-23",
    "subject": "tech",
    "q": "Magneto check: RPM drop on one mag should be:",
    "choices": [
      "Infinite",
      "Within POH limits and not excessive difference between mags",
      "Always zero only",
      "Ignored"
    ],
    "ans": 1,
    "exp": "Each mag must sustain combustion within published drop. Excessive drop or rough running → abort.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-24",
    "subject": "tech",
    "q": "Pitot blockage typically affects:",
    "choices": [
      "Altimeter only",
      "ASI (and related systems)",
      "Compass only",
      "Fuel gauges only"
    ],
    "ans": 1,
    "exp": "Pitot blockage corrupts airspeed. Alternate static / known symptoms as taught. Check covers before flight.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-25",
    "subject": "tech",
    "q": "Static blockage can affect:",
    "choices": [
      "Only the compass",
      "Altimeter, ASI, and VSI as taught",
      "Only oil temp",
      "Only RPM"
    ],
    "ans": 1,
    "exp": "Static errors hit pressure instruments. Be suspicious if instruments disagree with feel/power.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-26",
    "subject": "tech",
    "q": "Trim is used to:",
    "choices": [
      "Replace elevator authority entirely",
      "Relieve control stick pressure for a desired attitude/speed",
      "Increase MTOW",
      "Set QNH"
    ],
    "ans": 1,
    "exp": "Trim for hands-off for the desired speed/attitude. Re-trim after configuration or power changes.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-27",
    "subject": "tech",
    "q": "Left-turning tendencies (tractor props) teaching includes:",
    "choices": [
      "Slipstream, torque, asymmetric blade, gyroscopic effects as applicable",
      "Only wind",
      "Only QFE",
      "Only flaps"
    ],
    "ans": 0,
    "exp": "Several effects yaw/roll left especially at high power/low speed. Use right rudder as taught on take-off/climb.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-28",
    "subject": "tech",
    "q": "Side-slipping teaching use includes:",
    "choices": [
      "Increasing MTOW",
      "Losing height without gaining as much speed, or crosswind technique as taught",
      "Entering IMC",
      "Replacing flaps illegally always"
    ],
    "ans": 1,
    "exp": "Sideslip can steepen descent. Crosswind landing uses wing-down/sideslip or crab as taught for type.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-29",
    "subject": "tech",
    "q": "Pre-flight walk-round should include:",
    "choices": [
      "Only the left wing",
      "Structure, controls, fuel, oil/coolant, tyres, covers removed, documents mindset",
      "Only GPS database",
      "Only radio check"
    ],
    "ans": 1,
    "exp": "Systematic walk-round catches loose bolts, water in fuel, pitot covers, cracked plastics. Use the checklist.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-30",
    "subject": "tech",
    "q": "Water in fuel samples appears:",
    "choices": [
      "As a pink layer on top always",
      "As droplets or a layer beneath avgas/mogas (denser)",
      "Identical to fuel",
      "Only in winter"
    ],
    "ans": 1,
    "exp": "Water sinks. Drain until clean. Contaminated fuel is a no-go. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-31",
    "subject": "tech",
    "q": "CHT / coolant temp high in climb — teaching response idea:",
    "choices": [
      "Ignore and push on",
      "Improve cooling: climb attitude/speed, mixture/cowl as POH, reduce climb angle",
      "Close vents",
      "Add flaps"
    ],
    "ans": 1,
    "exp": "Overheating needs cooling airflow and POH procedures. Do not cook the engine for a steep climb aesthetic.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-32",
    "subject": "tech",
    "q": "Electrical failure in a microlight day VFR:",
    "choices": [
      "Always MAYDAY immediately",
      "Fly the aircraft, conserve battery if partial, use lost-comms procedures if radio fails",
      "Enter Class A",
      "Descend to 50 ft"
    ],
    "ans": 1,
    "exp": "Aviate first. Many day VFR flights can continue to a landing with careful planning if instruments/radio are limited.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-33",
    "subject": "tech",
    "q": "Tyre / undercarriage check before flight:",
    "choices": [
      "Optional on grass",
      "Pressure, wear, creep marks, attachment security as checklist",
      "Only after landing fees",
      "Only in rain"
    ],
    "ans": 1,
    "exp": "Undercarriage failures start with skipped inspections. Especially important on rough farm strips.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-34",
    "subject": "tech",
    "q": "Control surface freedom and security check:",
    "choices": [
      "Move full travel, correct sense, hinges/rod ends secure",
      "Only ailerons",
      "Never move controls on ground",
      "Only elevator"
    ],
    "ans": 0,
    "exp": "Full and free in correct sense with no binding. Gust locks removed. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-35",
    "subject": "tech",
    "q": "Induced drag is highest roughly when:",
    "choices": [
      "High speed clean",
      "High lift coefficient / slow flight / high AoA",
      "On the ground only",
      "Above Vne"
    ],
    "ans": 1,
    "exp": "Induced drag rises as you fly slowly with high AoA. Total drag has induced + parasite parts.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-36",
    "subject": "tech",
    "q": "Parasite drag rises with:",
    "choices": [
      "Decreasing speed squared roughly opposite",
      "Increasing speed (roughly with speed squared teaching)",
      "Only flap setting ignoring speed",
      "CG only"
    ],
    "ans": 1,
    "exp": "Parasite drag grows with speed. Clean configuration helps cruise. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-37",
    "subject": "tech",
    "q": "Authorised empty mass / moment data for W&B comes from:",
    "choices": [
      "Guesswork",
      "Aircraft weighing schedule / POH data as applicable",
      "Facebook",
      "Fuel receipt only"
    ],
    "ans": 1,
    "exp": "Use current empty mass/moment from weighing. Modifications change numbers. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-38",
    "subject": "tech",
    "q": "Soft-field take-off teaching essence:",
    "choices": [
      "Brake hard on the run",
      "Keep weight off the nose / lift early into ground effect as taught, then accelerate",
      "Full flap never",
      "Ignore RPM"
    ],
    "ans": 1,
    "exp": "Soft/grass technique protects the nosewheel and reduces drag from sinking wheels — follow type training.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-39",
    "subject": "tech",
    "q": "Short-field landing teaching essence:",
    "choices": [
      "Aim long always",
      "Aim for a precise touchdown zone with appropriate approach speed and brake as taught",
      "Dive at Vne",
      "Idle from 5 miles"
    ],
    "ans": 1,
    "exp": "Accurate speed and aiming point matter. Go around if unstable. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-40",
    "subject": "tech",
    "q": "Detonation / abnormal combustion may be linked to:",
    "choices": [
      "Correct MOGAS as approved only",
      "Wrong fuel, hot spots, incorrect timing — shut down procedures as POH",
      "Only cold oil",
      "Too much carb heat always harmless"
    ],
    "ans": 1,
    "exp": "Use approved fuel and monitor temps. Unusual noises/temps → reduce power and land. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-41",
    "subject": "tech",
    "q": "Propeller care teaching:",
    "choices": [
      "Nicks are always fine",
      "Inspect nicks/cracks; dress only as approved; do not hand-prop without training",
      "Paint over damage",
      "Ignore stone chips"
    ],
    "ans": 1,
    "exp": "Prop damage is serious on high-rpm microlight props. Ground-handling clearances matter. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-42",
    "subject": "tech",
    "q": "Fuel endurance estimate: 40 L usable at 16 L/h (no reserve) ≈:",
    "choices": [
      "1.5 h",
      "2.5 h",
      "3.0 h",
      "4 h"
    ],
    "ans": 1,
    "exp": "40/16 = 2.5 h. Never plan to run tanks dry — keep taught reserves. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-43",
    "subject": "tech",
    "q": "Alternate static source if fitted may cause:",
    "choices": [
      "No instrument change",
      "Slight instrument errors — know the POH note",
      "Compass swing",
      "Fuel siphon"
    ],
    "ans": 1,
    "exp": "Cabin alternate static can bias altimeter/ASI/VSI. Know what to expect. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-44",
    "subject": "tech",
    "q": "Glide ratio teaching 8:1 means roughly:",
    "choices": [
      "8 nm per 1000 ft always exactly in wind",
      "About 8 units distance per 1 unit height in still air — wind changes it",
      "Climb 8×",
      "Fuel 8 L"
    ],
    "ans": 1,
    "exp": "Still-air glide ratio is distance/height. Headwind shortens glide; plan fields early. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-45",
    "subject": "tech",
    "q": "After landing, hot engine / turbo teaching (as applicable):",
    "choices": [
      "Immediate full cold shutdown always without care",
      "Follow POH cool-down / shutdown — Rotax procedures as published",
      "Leave mags on unattended",
      "Idle for one second only always"
    ],
    "ans": 1,
    "exp": "Respect published shutdown and cool-down. Hot restarts and heat soak have type-specific notes.",
    "lesson": "tech-02"
  },
  {
    "id": "tech-q-46",
    "subject": "tech",
    "q": "Vac system failure (if equipped) primarily affects:",
    "choices": [
      "Fuel quantity",
      "Attitude/DI type gyros as equipped — cover/partial panel as taught",
      "Oil pressure always",
      "Flap motors always"
    ],
    "ans": 1,
    "exp": "Know which instruments are vacuum vs electric vs pitot-static on your fit. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-04"
  },
  {
    "id": "tech-q-47",
    "subject": "tech",
    "q": "MTOW example: empty 280 kg, pilot 85, pax 70, fuel 30 kg. AUW ≈:",
    "choices": [
      "280",
      "465",
      "435",
      "500"
    ],
    "ans": 1,
    "exp": "280+85+70+30 = 465 kg. Compare with MTOW and CG. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-48",
    "subject": "tech",
    "q": "If AUW exceeds MTOW you should:",
    "choices": [
      "Take off carefully",
      "Reduce load/fuel — do not fly overweight",
      "Only tell passengers to lean left",
      "Ignore if runway long"
    ],
    "ans": 1,
    "exp": "Overweight is illegal and unsafe. Offload or defuel. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-03"
  },
  {
    "id": "tech-q-49",
    "subject": "tech",
    "q": "Ailerons control:",
    "choices": [
      "Pitch",
      "Roll",
      "Yaw only",
      "Thrust"
    ],
    "ans": 1,
    "exp": "Ailerons roll; elevator pitch; rudder yaw. Coordinated flight uses all three. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-01"
  },
  {
    "id": "tech-q-50",
    "subject": "tech",
    "q": "Adverse yaw is countered mainly with:",
    "choices": [
      "More flap",
      "Rudder in the turn direction as taught",
      "Opposite aileron only always",
      "Trim nose down only"
    ],
    "ans": 1,
    "exp": "Aileron drag yaws opposite; rudder coordinates. Look at the ball/string. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "tech-01"
  },
  {
    "id": "hpl-q-01",
    "subject": "hpl",
    "q": "IMSAFE stands for fitness factors including:",
    "choices": [
      "Only Insurance",
      "Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion style checklist",
      "ILS approaches",
      "Mode S"
    ],
    "ans": 1,
    "exp": "IMSAFE is a personal fitness mnemonic before flight. Any red flag can be a no-go. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-02",
    "subject": "hpl",
    "q": "Hypoxia risk rises with:",
    "choices": [
      "Descending only",
      "Altitude / reduced oxygen partial pressure",
      "Eating lunch",
      "QFE setting"
    ],
    "ans": 1,
    "exp": "Less oxygen pressure with height. Microlights rarely go high, but be aware of night vision and CO interactions.",
    "lesson": "hpl-03"
  },
  {
    "id": "hpl-q-03",
    "subject": "hpl",
    "q": "Carbon monoxide sources include:",
    "choices": [
      "Only electric aircraft",
      "Exhaust leaks into the cabin",
      "Wing tips",
      "GPS units"
    ],
    "ans": 1,
    "exp": "CO is colourless; headache/drowsiness are clues. Cabin heat from muffs needs inspection culture. Land if suspected.",
    "lesson": "hpl-03"
  },
  {
    "id": "hpl-q-04",
    "subject": "hpl",
    "q": "Hyperventilation symptoms can mimic:",
    "choices": [
      "Hypoxia / dizziness / tingling",
      "Perfect calm only",
      "Only hunger",
      "Only ear pain"
    ],
    "ans": 0,
    "exp": "Stress can cause hyperventilation. Slow breathing / talk-down techniques as taught. Do not misdiagnose and spiral.",
    "lesson": "hpl-03"
  },
  {
    "id": "hpl-q-05",
    "subject": "hpl",
    "q": "Spatial disorientation is more likely when:",
    "choices": [
      "Flying visual references in CAVOK",
      "Visibility is poor / horizon lost / unusual attitudes",
      "Sitting in the clubhouse",
      "Reading METARs"
    ],
    "ans": 1,
    "exp": "Trust instruments when trained; for VFR microlights — stay in VMC and keep a horizon. Avoid scud running.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-06",
    "subject": "hpl",
    "q": "The leans are:",
    "choices": [
      "A fuel state",
      "A vestibular illusion after a false sense of bank",
      "A type of flap",
      "A squawk"
    ],
    "ans": 1,
    "exp": "Inner-ear illusions mislead attitude sense. Get visual references or instrument confirmation as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-07",
    "subject": "hpl",
    "q": "Empty field myopia means:",
    "choices": [
      "Eyes focus only at infinity perfectly",
      "In featureless sky/fog eyes may focus wrongly — active scanning needed",
      "Only short-sighted pilots fly",
      "Maps are useless"
    ],
    "ans": 1,
    "exp": "Look at specific distances deliberately; move your scan. Do not stare blankly ahead. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-08",
    "subject": "hpl",
    "q": "Hazardous attitude 'anti-authority' example:",
    "choices": [
      "Following SOPs",
      "'Don't tell me what to do' — ignoring rules/advice",
      "Asking ATC for help",
      "Using checklists"
    ],
    "ans": 1,
    "exp": "Antidote teaching: follow the rules — they are usually right. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-09",
    "subject": "hpl",
    "q": "Hazardous attitude 'macho' antidote teaching:",
    "choices": [
      "I can do it — watch this",
      "Taking chances is foolish",
      "Never ask for help",
      "Speed is always safe"
    ],
    "ans": 1,
    "exp": "Macho pushes limits. Antidote: taking chances is foolish. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-10",
    "subject": "hpl",
    "q": "Hazardous attitude 'impulsivity' antidote:",
    "choices": [
      "Do something quickly now",
      "Not so fast — think first",
      "Always climb",
      "Always descend"
    ],
    "ans": 1,
    "exp": "Pause before acting on the first impulse in abnormal situations. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-11",
    "subject": "hpl",
    "q": "Hazardous attitude 'invulnerability' antidote:",
    "choices": [
      "It won't happen to me",
      "It could happen to me",
      "Only happens to students",
      "Only happens to ATPL"
    ],
    "ans": 1,
    "exp": "Accidents happen to people like us. Personal minima help. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-12",
    "subject": "hpl",
    "q": "Hazardous attitude 'resignation' antidote:",
    "choices": [
      "What's the use",
      "I can make a difference / I'm not helpless",
      "Give up radio",
      "Stop looking out"
    ],
    "ans": 1,
    "exp": "Stay in the loop; you can still influence outcomes. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-13",
    "subject": "hpl",
    "q": "Personal minima should be:",
    "choices": [
      "Always exactly SERA legal limits",
      "Often stricter than legal minima, especially early after licence",
      "Ignored if friends fly",
      "Only for IFR"
    ],
    "ans": 1,
    "exp": "Set tighter weather/crosswind/fuel minima than the legal floor until experience grows. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-14",
    "subject": "hpl",
    "q": "Fatigue effects include:",
    "choices": [
      "Sharper lookout always",
      "Slower reactions and poorer decisions",
      "Better IMC skill",
      "Improved memory"
    ],
    "ans": 1,
    "exp": "Tired pilots miss radio calls and push weather. No-go when shattered. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-15",
    "subject": "hpl",
    "q": "Alcohol and flying:",
    "choices": [
      "Fine after one pint if feeling OK",
      "Respect low legal limits and school bottle-to-throttle guidance — prefer zero",
      "Only banned for instructors",
      "Only overnight if beer"
    ],
    "ans": 1,
    "exp": "Limits are low; residual effects linger. When in doubt, do not fly. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-16",
    "subject": "hpl",
    "q": "Medication before flight:",
    "choices": [
      "All pharmacy meds are fine",
      "Check with AME/instructor guidance — many meds are incompatible",
      "Only antibiotics matter",
      "Only painkillers banned"
    ],
    "ans": 1,
    "exp": "Many common meds cause drowsiness or other effects. Ask before self-medicating and flying.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-17",
    "subject": "hpl",
    "q": "Stress and flying:",
    "choices": [
      "Makes you sharper always",
      "Can narrow attention and harm CRM — postpone if overloaded",
      "Only helps radio",
      "Irrelevant"
    ],
    "ans": 1,
    "exp": "Life stress spills into the cockpit. Postpone non-essential flights. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-18",
    "subject": "hpl",
    "q": "Lookout scan teaching:",
    "choices": [
      "Stare at one point",
      "Systematic sectors, move eyes, include above/below",
      "Only look at GPS",
      "Only look at ASI"
    ],
    "ans": 1,
    "exp": "See-and-avoid needs an active scan. Especially critical in circuits and Class G. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-19",
    "subject": "hpl",
    "q": "Confirmation bias example:",
    "choices": [
      "Seeking data that might prove you wrong",
      "Seeing only METAR clues that support a 'go' decision",
      "Using IMSAFE",
      "Diverting early"
    ],
    "ans": 1,
    "exp": "We favour information that matches our plan. Force yourself to seek disconfirming weather/NOTAM cues.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-20",
    "subject": "hpl",
    "q": "Get-there-itis is:",
    "choices": [
      "A useful motivation always",
      "Pressure to arrive that overrides safety margins",
      "A type of cloud",
      "A radio failure code"
    ],
    "ans": 1,
    "exp": "External pressure kills margins. Be willing to turn back or delay. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-21",
    "subject": "hpl",
    "q": "Sterile cockpit teaching around critical phases:",
    "choices": [
      "Chat freely about holidays",
      "Limit non-essential talk during take-off/landing/join",
      "Ban all radio",
      "Ignore checklists"
    ],
    "ans": 1,
    "exp": "Critical phases need attention. Brief passengers to stay quiet then. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-22",
    "subject": "hpl",
    "q": "Passenger brief should happen:",
    "choices": [
      "After landing only",
      "Before flight — harness, exits, sterile periods, emergencies",
      "Only if raining",
      "Only for children"
    ],
    "ans": 1,
    "exp": "Brief before taxi. Include what not to touch. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-23",
    "subject": "hpl",
    "q": "Dehydration and microlight open cockpits:",
    "choices": [
      "Impossible in UK",
      "Real risk — drink water, consider exposure",
      "Only in deserts",
      "Fixed by QNH"
    ],
    "ans": 1,
    "exp": "Windblast and sun dehydrate. Carry water on longer navs. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-24",
    "subject": "hpl",
    "q": "Night vision is:",
    "choices": [
      "Unaffected by altitude/CO/smoking",
      "Sensitive to hypoxia, CO, and bright light adaptation issues",
      "Better after alcohol",
      "Irrelevant to day-only pilots entirely for theory"
    ],
    "ans": 1,
    "exp": "Even day pilots learn night-vision factors for exams. Smoking/CO/hypoxia hurt vision. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-25",
    "subject": "hpl",
    "q": "Ear clearing problems on descent:",
    "choices": [
      "Ignore and push harder descent",
      "Level off / climb slightly, try Valsalva carefully as taught, land if blocked",
      "Descend faster",
      "Only use radio"
    ],
    "ans": 1,
    "exp": "Do not force a blocked ear aggressively. Equalise early and often. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-26",
    "subject": "hpl",
    "q": "Illusion: false horizon from sloping cloud/lights:",
    "choices": [
      "Never happens",
      "Can mislead wings-level sense — cross-check",
      "Only at sea",
      "Only IFR rated"
    ],
    "ans": 1,
    "exp": "Pick true horizons; beware sloping cloud decks and ground lights. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-27",
    "subject": "hpl",
    "q": "Decision-making model teaching (DECIDE / similar):",
    "choices": [
      "Act without detecting",
      "Detect–estimate–choose–identify–do–evaluate style loops",
      "Ignore outcomes",
      "Only use after landing"
    ],
    "ans": 1,
    "exp": "Structured decision models slow impulsivity. Confirm the model your school teaches. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-28",
    "subject": "hpl",
    "q": "Peer pressure to launch in marginal weather:",
    "choices": [
      "Always comply to fit in",
      "Use personal minima and be willing to say no",
      "Prove macho attitude",
      "Follow the most junior only"
    ],
    "ans": 1,
    "exp": "Good clubs respect no-go decisions. Leave ego on the ground. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-29",
    "subject": "hpl",
    "q": "After a scare (near miss), healthy response includes:",
    "choices": [
      "Never talk about it",
      "Debrief, learn, file reports as required",
      "Increase risk next flight",
      "Blame only ATC always"
    ],
    "ans": 1,
    "exp": "Learning culture beats silence. AIRPROX/MOR as applicable. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-30",
    "subject": "hpl",
    "q": "Blood donation before flying:",
    "choices": [
      "Fine same hour",
      "Follow grounding guidance as taught/AME — often wait period",
      "Improves hypoxia tolerance immediately",
      "Only affects cabin crew"
    ],
    "ans": 1,
    "exp": "Donation reduces capacity temporarily. Respect grounding intervals. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-31",
    "subject": "hpl",
    "q": "Scuba diving before flying:",
    "choices": [
      "No issue",
      "Risk of decompression sickness — observe published wait times",
      "Improves cabin pressure sense",
      "Only banned for ATPL"
    ],
    "ans": 1,
    "exp": "Diving then flying is a known risk. Wait the recommended hours. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-32",
    "subject": "hpl",
    "q": "Situational awareness includes:",
    "choices": [
      "Only fuel state",
      "Aircraft state, position, weather, traffic, plan, and contingencies",
      "Only the next radio call",
      "Only passengers"
    ],
    "ans": 1,
    "exp": "Build a mental picture and update it. Lose SA → simplify and regain. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-33",
    "subject": "hpl",
    "q": "Startle effect after a bang/noise:",
    "choices": [
      "Instant perfect diagnosis",
      "Brief freeze possible — fly the aircraft first",
      "Always MAYDAY before aviate",
      "Close eyes"
    ],
    "ans": 1,
    "exp": "Aviate → navigate → communicate. Delay complex diagnosis until under control. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-34",
    "subject": "hpl",
    "q": "Optical illusion of runway width/slope can cause:",
    "choices": [
      "Perfect aiming always",
      "High/low approaches — know the traps",
      "Only GPS errors",
      "Only ASI errors"
    ],
    "ans": 1,
    "exp": "Narrow/wide/sloping runways fool aiming. Use aim-point and airspeed discipline. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-35",
    "subject": "hpl",
    "q": "Workload peaks typically at:",
    "choices": [
      "Cruise with autopilot fantasy",
      "Departure, join, circuit, landing, emergencies",
      "Only while refuelling",
      "Only paperwork"
    ],
    "ans": 1,
    "exp": "Shed tasks early (ATIS, brief, frequencies) before high-workload phases. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-36",
    "subject": "hpl",
    "q": "CRM in two-seat microlight training means:",
    "choices": [
      "Captain never listens",
      "Clear roles, assertiveness, shared lookout and plans",
      "Silence always",
      "Passenger flies without brief"
    ],
    "ans": 1,
    "exp": "Even simple aircraft benefit from clear communication between occupants. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-37",
    "subject": "hpl",
    "q": "Medication labelled 'may cause drowsiness':",
    "choices": [
      "Ideal for long cross-countries",
      "Generally incompatible with flying",
      "Only affects driving not flying",
      "Fine if coffee taken"
    ],
    "ans": 1,
    "exp": "If it warns about driving/machines, do not fly on it. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-38",
    "subject": "hpl",
    "q": "Aerobatic / unusual attitude inadvertent recovery teaching first:",
    "choices": [
      "Radio call first",
      "Reduce power / wings level / recover dive as taught — aviate first",
      "Close eyes",
      "Squawk first always before flying"
    ],
    "ans": 1,
    "exp": "Upset recovery priorities are aircraft control. Training required for intentional aeros. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-39",
    "subject": "hpl",
    "q": "Nutrition before flight:",
    "choices": [
      "Skip all meals for lightness",
      "Eat sensibly — avoid flying starved or on a sugar crash",
      "Only energy drinks",
      "Only fasting improves hypoxia"
    ],
    "ans": 1,
    "exp": "Low blood sugar harms decisions. Plan snacks on long days. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-40",
    "subject": "hpl",
    "q": "Anxiety before first solo nav:",
    "choices": [
      "Proves you must cancel forever",
      "Normal — use briefings, personal minima, and instructor support",
      "Best solved by macho launch",
      "Ignore weather entirely"
    ],
    "ans": 1,
    "exp": "Nerves are normal. Preparation and conservative minima channel them productively. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-41",
    "subject": "hpl",
    "q": "Visual scan for traffic should include:",
    "choices": [
      "Only straight ahead",
      "Clock sectors and vertical — other aircraft are above/below too",
      "Only TCAS",
      "Only radio"
    ],
    "ans": 1,
    "exp": "Traffic converges from all angles. Especially scan the circuit pattern direction. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-02"
  },
  {
    "id": "hpl-q-42",
    "subject": "hpl",
    "q": "CO detector in cabin (if fitted):",
    "choices": [
      "Decoration only",
      "Useful warning — respond by ventilating and landing",
      "Ignore alarms",
      "Only for jets"
    ],
    "ans": 1,
    "exp": "Treat alarms seriously. Exhaust leaks kill. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-03"
  },
  {
    "id": "hpl-q-43",
    "subject": "hpl",
    "q": "After alcohol evening, morning fitness:",
    "choices": [
      "Always OK if under legal limit numerically",
      "May still be impaired — use conservative grounding",
      "Improved reflexes",
      "Only hydration matters"
    ],
    "ans": 1,
    "exp": "Hangover is fatigue + residual effects. Cancel if unsure. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-01"
  },
  {
    "id": "hpl-q-44",
    "subject": "hpl",
    "q": "Pressure to please passengers wanting a scenic low pass:",
    "choices": [
      "Comply for reviews",
      "Refuse unsafe requests — you are PIC",
      "Always say yes",
      "Let passenger decide altitude"
    ],
    "ans": 1,
    "exp": "PIC authority exists for safety. Brief passengers that limits are firm. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "hpl-q-45",
    "subject": "hpl",
    "q": "Good personal weather minima example for a new NPPL:",
    "choices": [
      "Legal SERA only always",
      "Higher cloud base/visibility than ops-limits/SERA floor, limited crosswind",
      "Zero visibility OK with GPS",
      "Any wind OK"
    ],
    "ans": 1,
    "exp": "Write your minima down. Raise them when rusty; review with instructor. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "hpl-04"
  },
  {
    "id": "radio-q-01",
    "subject": "radio",
    "q": "FRTOL is required to:",
    "choices": [
      "Operate an aeronautical radio as PIC privileges require",
      "Fly only gliders silent",
      "Enter Class A VFR freely",
      "Skip ATZ procedures"
    ],
    "ans": 0,
    "exp": "A Flight Radiotelephony Operator's Licence (as applicable) is needed to operate the aircraft radio.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-02",
    "subject": "radio",
    "q": "Phonetic alphabet for B is:",
    "choices": [
      "Bravo",
      "Baker always only",
      "Beta",
      "Blue"
    ],
    "ans": 0,
    "exp": "Standard ICAO phonetics: Alpha Bravo Charlie. Use them for callsigns and tricky spellings.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-03",
    "subject": "radio",
    "q": "Read back safety-critical items such as:",
    "choices": [
      "Runway, QNH/QFE, clearances, holding points as taught",
      "Cafe lunch orders",
      "Only your name",
      "Squawk 7000 never"
    ],
    "ans": 0,
    "exp": "Read back what CAP 413 teaching requires — especially clearances, runways, and pressure settings.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-04",
    "subject": "radio",
    "q": "ATC vs AFIS vs AGCS — which issues clearances?",
    "choices": [
      "ATC",
      "AGCS",
      "AFIS",
      "All identically"
    ],
    "ans": 0,
    "exp": "ATC issues clearances. AFIS and AGCS provide information/advice; PIC remains responsible for sequencing.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-05",
    "subject": "radio",
    "q": "Initial call to a busy ATSU often starts with:",
    "choices": [
      "Station + callsign + request (e.g. request join / Basic Service)",
      "Full life story",
      "Only squawk",
      "Silence"
    ],
    "ans": 0,
    "exp": "Keep the first call short. Pass details when invited to pass your message. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-06",
    "subject": "radio",
    "q": "When told pass your message, include typically:",
    "choices": [
      "Type, from/to, position, level+setting, intentions as taught",
      "Only fuel brand",
      "Only POB",
      "Only colour of aircraft"
    ],
    "ans": 0,
    "exp": "Standard teaching order helps the controller build a picture quickly. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-07",
    "subject": "radio",
    "q": "MAYDAY is used for:",
    "choices": [
      "Distress — serious and/or imminent danger requiring immediate assistance",
      "Urgency only",
      "Practice always on busy freq",
      "Booking PPR"
    ],
    "ans": 0,
    "exp": "MAYDAY times three for distress. PAN PAN times three for urgency. Fly first, then transmit.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-08",
    "subject": "radio",
    "q": "PAN PAN is used for:",
    "choices": [
      "Urgency — safety of aircraft/person but not immediate distress",
      "Imminent forced landing always only",
      "Ordering fuel",
      "Cancelling IFR"
    ],
    "ans": 0,
    "exp": "Engine rough but controllable, or a medical issue with time, may be PAN. Escalate if it becomes distress.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-09",
    "subject": "radio",
    "q": "After MAYDAY, squawk when able:",
    "choices": [
      "7700",
      "7000",
      "7600",
      "0033"
    ],
    "ans": 0,
    "exp": "7700 emergency. 7600 radio fail. Fly the aeroplane first. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-10",
    "subject": "radio",
    "q": "Radio failure squawk:",
    "choices": [
      "7600",
      "7700",
      "7500",
      "7000"
    ],
    "ans": 0,
    "exp": "7600. Stay VMC, join carefully, watch light signals. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-11",
    "subject": "radio",
    "q": "Guard / distress frequency:",
    "choices": [
      "121.500",
      "123.450",
      "135.480 always en-route",
      "118.000"
    ],
    "ans": 0,
    "exp": "121.500 MHz is the international guard/distress frequency. SAFETYCOM is different and limited.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-12",
    "subject": "radio",
    "q": "Basic Service is:",
    "choices": [
      "An ATS service providing information — traffic info as practicable, not separation",
      "Radar separation service",
      "Class A clearance",
      "AFIS only"
    ],
    "ans": 0,
    "exp": "Under Basic Service you remain responsible for collision avoidance and terrain. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-13",
    "subject": "radio",
    "q": "Traffic Service differs from Basic mainly by:",
    "choices": [
      "Deconfliction/traffic information levels as defined for UK FIS — confirm current CAP",
      "Free fuel",
      "No radio needed",
      "Automatic Class D entry"
    ],
    "ans": 0,
    "exp": "UK Flight Information Services have defined levels. Know what you asked for and what you get.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-14",
    "subject": "radio",
    "q": "MATZ penetration call is:",
    "choices": [
      "Good airmanship — request penetration as taught",
      "Never required",
      "Only for jets",
      "Only at night"
    ],
    "ans": 0,
    "exp": "Call the military unit for MATZ penetration. Embedded civil ATZ still needs proper two-way.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-15",
    "subject": "radio",
    "q": "Zone transit of Class D typically needs:",
    "choices": [
      "Clearance before entry",
      "Nothing if VMC",
      "Only SAFETYCOM",
      "Only Mode A"
    ],
    "ans": 0,
    "exp": "Request and obtain clearance; remain clear until you have it. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-16",
    "subject": "radio",
    "q": "Downwind call typically includes:",
    "choices": [
      "Position (downwind), runway, intentions (touch-and-go/land) as local practice",
      "Only callsign whispered",
      "Only fuel",
      "Only QNH"
    ],
    "ans": 0,
    "exp": "Keep it concise. Match local AFIS/ATC/A-G expectations. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-17",
    "subject": "radio",
    "q": "Go-around radio teaching priority:",
    "choices": [
      "Aviate — climb/configure — then call going around",
      "Transmit before flying",
      "Argue on frequency",
      "Squawk 7500"
    ],
    "ans": 0,
    "exp": "Aviate, navigate, communicate. A late radio call beats a stall. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-18",
    "subject": "radio",
    "q": "Unmanned field traffic call addressing:",
    "choices": [
      "(Place) Traffic ... (Place)",
      "London Control always",
      "MAYDAY only",
      "Any random station"
    ],
    "ans": 0,
    "exp": "Broadcast to Place Traffic and end with the place name so others know the frequency context.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-19",
    "subject": "radio",
    "q": "QNH given by ATS — you should:",
    "choices": [
      "Set it and read back as required",
      "Ignore",
      "Set QFE always instead without thinking",
      "Add 10 hPa"
    ],
    "ans": 0,
    "exp": "Pressure settings are safety-critical readbacks. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-20",
    "subject": "radio",
    "q": "Abbreviated callsign may be used when:",
    "choices": [
      "ATS has abbreviated it / as CAP 413 teaching allows",
      "You feel like it from first call",
      "Always from engine start",
      "Never ever"
    ],
    "ans": 0,
    "exp": "Use full callsign initially; abbreviate when appropriate after ATS does. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-21",
    "subject": "radio",
    "q": "Report final means:",
    "choices": [
      "Call when established on final as instructed",
      "Report when ready for coffee",
      "Report when parked",
      "Squawk change"
    ],
    "ans": 0,
    "exp": "Comply with reporting instructions — they sequence traffic. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-22",
    "subject": "radio",
    "q": "Student callsign suffix teaching:",
    "choices": [
      "May use STUDENT as taught to invite slower speech/help",
      "Never identify as student",
      "Must use MAYDAY",
      "Only for instructors"
    ],
    "ans": 0,
    "exp": "Identifying as student can help ATS. Confirm exact usage with instructor. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-23",
    "subject": "radio",
    "q": "Frequency change: you should:",
    "choices": [
      "Read back the frequency / acknowledge as taught, then change and check in",
      "Leave without contact",
      "Stay forever",
      "Use SAFETYCOM only"
    ],
    "ans": 0,
    "exp": "Acknowledge, change, listen, then check in on the new frequency. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-24",
    "subject": "radio",
    "q": "Blind transmissions when unsure if heard:",
    "choices": [
      "Transmit position/intentions as taught for the situation — then listen",
      "Shout louder once",
      "Never transmit",
      "Squawk 7500"
    ],
    "ans": 0,
    "exp": "At some A/G or quiet fields you may need clear blind calls. Still listen first. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-25",
    "subject": "radio",
    "q": "Conditional clearance teaching requires:",
    "choices": [
      "Identifying the traffic/condition and complying exactly — or reject if unsure",
      "Ignoring the condition",
      "Landing first always",
      "Reading back only callsign"
    ],
    "ans": 0,
    "exp": "If you cannot identify the conflicting traffic, do not accept the conditional clearance. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-26",
    "subject": "radio",
    "q": "Phonetic for G is:",
    "choices": [
      "Golf",
      "George",
      "Gamma",
      "Green"
    ],
    "ans": 0,
    "exp": "Golf. Callsigns like G-ABCD use Golf Alpha Bravo Charlie Delta. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-27",
    "subject": "radio",
    "q": "Numbers teaching: 1013 often spoken as:",
    "choices": [
      "One zero one three (pressure) as taught",
      "Ten thirteen only always",
      "One thousand thirteen always identical worldwide",
      "QNH letter only"
    ],
    "ans": 0,
    "exp": "Pressure settings digit-by-digit teaching is common. Follow CAP 413 style as taught. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-28",
    "subject": "radio",
    "q": "If given runway opposite wind preference for noise:",
    "choices": [
      "Accept if safe for your performance/crosswind — else state unable",
      "Always refuse",
      "Ignore wind entirely",
      "Take any runway silently"
    ],
    "ans": 0,
    "exp": "You may decline an unsuitable runway. Safety beats noise preference. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-29",
    "subject": "radio",
    "q": "Orbit instruction teaching:",
    "choices": [
      "Hold position in the pattern as directed — ask if unclear",
      "Climb immediately into CAS",
      "Land immediately",
      "Squawk 7600"
    ],
    "ans": 0,
    "exp": "Orbits manage spacing. Maintain lookout and altitude as instructed. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-30",
    "subject": "radio",
    "q": "Hold short of runway XX means:",
    "choices": [
      "Stop before the runway / holding point — do not enter",
      "Enter and line up",
      "Cross immediately",
      "Take off"
    ],
    "ans": 0,
    "exp": "Holding short prevents runway incursions. Read back clearly. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-31",
    "subject": "radio",
    "q": "Line up means:",
    "choices": [
      "Enter runway and line up — not cleared take-off until that is said",
      "Stay on taxiway",
      "Take off immediately always",
      "Orbit"
    ],
    "ans": 0,
    "exp": "Line-up is not take-off clearance. Wait. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-32",
    "subject": "radio",
    "q": "Cleared take-off means:",
    "choices": [
      "You are cleared to take off — still PIC go/no-go",
      "Maybe take off later",
      "Line up only",
      "Cross the other runway only"
    ],
    "ans": 0,
    "exp": "Read back and go when safe. You may still reject if something is wrong. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-33",
    "subject": "radio",
    "q": "Practice PAN on a busy frequency is:",
    "choices": [
      "Only when frequency free / as taught — real traffic wins",
      "Always OK",
      "Mandatory each flight",
      "Done on 121.500 without thought"
    ],
    "ans": 0,
    "exp": "Do not block busy channels with practice. Coordinate as instructed. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-34",
    "subject": "radio",
    "q": "Cancel MAYDAY/PAN when:",
    "choices": [
      "Situation truly resolved — advise accordingly as taught",
      "Bored",
      "Still in distress",
      "ATS asks casually without resolution"
    ],
    "ans": 0,
    "exp": "Only cancel when safe and accurate. Do not cancel prematurely. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-35",
    "subject": "radio",
    "q": "Relay of MAYDAY if you hear one and ATS may not:",
    "choices": [
      "Assist as taught if you can help without blocking — do not add clutter",
      "Chat over them",
      "Ignore always",
      "Tell them to use SAFETYCOM"
    ],
    "ans": 0,
    "exp": "Distress has priority. Help carefully; keep frequency clear. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-36",
    "subject": "radio",
    "q": "ATIS letters help you:",
    "choices": [
      "Confirm you have current broadcast — state Information X when checking in as taught",
      "Ignore weather",
      "Replace lookout",
      "Set flaps"
    ],
    "ans": 0,
    "exp": "ATIS cycles alphabetically. If the letter changed, re-listen. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-37",
    "subject": "radio",
    "q": "Requesting join — typical items:",
    "choices": [
      "Position relative to field, altitude, request join, ATIS letter if any, POB as taught",
      "Only aircraft colour",
      "Only ETA next week",
      "SSR 7500"
    ],
    "ans": 0,
    "exp": "Give the unit a clear picture of where you are and what you want. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-38",
    "subject": "radio",
    "q": "Overhead join standard teaching often includes:",
    "choices": [
      "Descend dead-side / cross overhead as published locally",
      "Immediate straight-in without looking",
      "Only downwind join always",
      "Ignore other traffic"
    ],
    "ans": 0,
    "exp": "Standard overhead: lookout, descend on the correct side as taught, integrate with circuit. Local plates may differ.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-39",
    "subject": "radio",
    "q": "Full-stop vs touch-and-go should be stated:",
    "choices": [
      "When it helps traffic planning — downwind/final intentions",
      "Never",
      "Only after landing",
      "Only in MAYDAY"
    ],
    "ans": 0,
    "exp": "Intentions let ATS and other traffic plan spacing. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-40",
    "subject": "radio",
    "q": "Freecall means:",
    "choices": [
      "Call the unit without prior handover — check-in as a new contact",
      "Paid subscription radio",
      "Only 121.500",
      "Satellite phone"
    ],
    "ans": 0,
    "exp": "Freecall when no one hands you over. Listen first, then call. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-41",
    "subject": "radio",
    "q": "Radar vectors if offered and accepted:",
    "choices": [
      "Follow headings/altitudes or say unable — maintain terrain/VMC responsibility as VFR",
      "Ignore altitudes",
      "Enter cloud freely without privilege",
      "Squawk standby always"
    ],
    "ans": 0,
    "exp": "VFR pilots remain responsible for terrain and collision avoidance even when vectored. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-42",
    "subject": "radio",
    "q": "Position reports using VRPs:",
    "choices": [
      "Use published VRP names",
      "Invent creative nicknames",
      "Only lat/long always",
      "Only GPS screenshots"
    ],
    "ans": 0,
    "exp": "Published VRPs keep everyone on the same map language. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-43",
    "subject": "radio",
    "q": "Listening before transmitting prevents:",
    "choices": [
      "Blocking distress/urgent or ongoing exchanges",
      "Good manners only",
      "Fuel burn",
      "Stall"
    ],
    "ans": 0,
    "exp": "Listen first — especially on 121.500 and busy tower frequencies. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-44",
    "subject": "radio",
    "q": "Roger means:",
    "choices": [
      "I have received your message",
      "Yes I will comply with a clearance",
      "I am squawking 7700",
      "Cleared take-off"
    ],
    "ans": 0,
    "exp": "Roger is not Wilco. Wilco means will comply. Do not use Roger to accept a clearance needing full readback.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-45",
    "subject": "radio",
    "q": "Wilco means:",
    "choices": [
      "Will comply",
      "Message received only",
      "Wilco is not used in UK",
      "Weather is CAVOK"
    ],
    "ans": 0,
    "exp": "Will comply. Still read back critical items as required. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-46",
    "subject": "radio",
    "q": "Standby means:",
    "choices": [
      "Wait — I will call you back",
      "Change frequency now",
      "Cleared to enter",
      "Orbit left"
    ],
    "ans": 0,
    "exp": "Stay on frequency and wait. Do not miss the call-back. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-47",
    "subject": "radio",
    "q": "Say again means:",
    "choices": [
      "Please repeat",
      "New frequency",
      "Cleared land",
      "Squawk ident"
    ],
    "ans": 0,
    "exp": "Ask for repeat rather than guessing a clearance. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-48",
    "subject": "radio",
    "q": "Correction phrase is used to:",
    "choices": [
      "Amend a mistaken transmission",
      "Joke",
      "Cancel MAYDAY automatically",
      "Change QNH silently"
    ],
    "ans": 0,
    "exp": "Say Correction then give the right words. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-49",
    "subject": "radio",
    "q": "Priority on frequency:",
    "choices": [
      "Distress > urgency > direction finding > flight safety > others as taught",
      "Club chat first",
      "Fuel prices first",
      "ATIS music"
    ],
    "ans": 0,
    "exp": "Keep quiet for MAYDAY/PAN. Help only if useful. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-50",
    "subject": "radio",
    "q": "AGCS cannot:",
    "choices": [
      "Issue ATC clearances",
      "Give weather/traffic information as able",
      "Hear your callsign",
      "Advise runway in use as information"
    ],
    "ans": 0,
    "exp": "No clearances from AGCS. You decide when safe to enter runway/circuit. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-51",
    "subject": "radio",
    "q": "AFIS land at your discretion means:",
    "choices": [
      "Information — landing decision remains yours",
      "ATC landing clearance",
      "Mandatory orbit",
      "Runway closed"
    ],
    "ans": 0,
    "exp": "Discretion phrases are not tower clearances. Lookout and decide. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-52",
    "subject": "radio",
    "q": "When given a squawk, you should:",
    "choices": [
      "Select it and identify/mode as instructed",
      "Ignore",
      "Always use 7000 instead",
      "Pick a random code"
    ],
    "ans": 0,
    "exp": "Set the code correctly; Mode C/S as equipped and instructed. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-53",
    "subject": "radio",
    "q": "Continuing into IMC on a VFR flight is:",
    "choices": [
      "Not acceptable — remain VMC or divert",
      "Fine with Basic Service",
      "OK below 500 ft",
      "OK if squawking 7700"
    ],
    "ans": 0,
    "exp": "VFR means VMC. Pushing into cloud without privilege is dangerous and illegal. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "radio-q-54",
    "subject": "radio",
    "q": "Training Fix / practice diversion RT:",
    "choices": [
      "Is a planned training tool when coordinated — not a real emergency",
      "Blocks MAYDAY",
      "Replaces GST",
      "Uses 7500"
    ],
    "ans": 0,
    "exp": "Know the difference between practice and real. Real emergency language wins. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-04"
  },
  {
    "id": "radio-q-55",
    "subject": "radio",
    "q": "CAP 413 is:",
    "choices": [
      "UK radiotelephony manual / phraseology reference — this app is not a replacement",
      "A fuel specification",
      "A chart projection",
      "An alcohol limit"
    ],
    "ans": 0,
    "exp": "This app's drills are CAP 413-style teaching examples, not the official manual. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-56",
    "subject": "radio",
    "q": "Callsign G-ABCD on first contact spoken as:",
    "choices": [
      "Golf Alpha Bravo Charlie Delta",
      "GABCD",
      "Gee ABCD",
      "Ground ABCD"
    ],
    "ans": 0,
    "exp": "Full phonetics on first call. Abbreviate only when appropriate later. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-01"
  },
  {
    "id": "radio-q-57",
    "subject": "radio",
    "q": "Requesting Basic Service freecall essence:",
    "choices": [
      "Station, callsign, request Basic Service — then pass message when invited",
      "Hello anyone",
      "MAYDAY first",
      "Only ATIS letter"
    ],
    "ans": 0,
    "exp": "Short request first; details when asked. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-03"
  },
  {
    "id": "radio-q-58",
    "subject": "radio",
    "q": "If you cannot accept a clearance:",
    "choices": [
      "State unable and reason/alternative as needed",
      "Say nothing and do something else",
      "Accept then ignore",
      "Squawk 7600"
    ],
    "ans": 0,
    "exp": "Unable is a valid reply. Do not accept what you cannot comply with safely. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "radio-02"
  },
  {
    "id": "law-q-56",
    "subject": "law",
    "q": "Orange and white boundary markers typically indicate:",
    "choices": [
      "Unfit movement area or aerodrome boundary",
      "Active runway centreline",
      "Open fuel bowser",
      "Glider winch only"
    ],
    "ans": 0,
    "exp": "Treat marked unfit areas as unusable. Boundary markers define limits — do not taxi beyond into hazards.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-57",
    "subject": "law",
    "q": "Temporary displaced threshold chevrons/arrows vs Xs — teaching essence:",
    "choices": [
      "Xs mark unusable surface; arrows/chevrons relate to displaced threshold ops (take-off may be OK, landing not on displaced part) as published",
      "All markings mean land here",
      "Ignore NOTAMs",
      "Only for jets"
    ],
    "ans": 0,
    "exp": "Read temporary WIP markings with the NOTAM/AIP. When unsure, ask ATS/PPR and keep safe margins.",
    "lesson": "law-signs"
  },
  {
    "id": "law-q-58",
    "subject": "law",
    "q": "Runway designator 09 roughly means magnetic heading:",
    "choices": [
      "090°",
      "009°",
      "900°",
      "180°"
    ],
    "ans": 0,
    "exp": "Numbers are magnetic heading to nearest 10°. 09 ≈ 090°, opposite end 27 ≈ 270°. Confirm with your instructor and current AIP / CAP / POH as applicable.",
    "lesson": "law-signs"
  },
  {
    "id": "radio-q-59",
    "subject": "radio",
    "q": "Who issues the Aircraft Radio Licence for a radio fitted to a UK aircraft?",
    "choices": [
      "Ofcom",
      "The CAA Licensing department",
      "NATS",
      "The BMAA"
    ],
    "ans": 0,
    "exp": "The licence for the radio equipment itself comes from Ofcom. Your personal FRTOL is the CAA’s. Don’t mix up the person licence with the equipment licence.",
    "lesson": "radio-05"
  },
  {
    "id": "radio-q-60",
    "subject": "radio",
    "q": "A hand-held VHF with its own battery and aerial needs which licence?",
    "choices": [
      "A Transportable Radio Licence",
      "No licence if under 5 W",
      "An Aircraft Radio Licence for the airframe only",
      "A ham radio licence"
    ],
    "ans": 0,
    "exp": "A self-contained hand-held needs a Transportable Radio Licence. The set must also be CAA-approved. Many 8.33 kHz hand-helds are covered by a general approval.",
    "lesson": "radio-05"
  },
  {
    "id": "radio-q-61",
    "subject": "radio",
    "q": "The correct way to set a manual squelch is to:",
    "choices": [
      "Turn it up until you hear hiss, then back off until the hiss just stops",
      "Turn it fully down",
      "Set it while ATC is transmitting",
      "Set the volume to maximum first"
    ],
    "ans": 0,
    "exp": "You want the gate to open on real signals but stay shut on background noise. Turning up to hiss and then backing off finds that point. Setting it during a transmission gives a false result.",
    "lesson": "radio-05"
  },
  {
    "id": "radio-q-62",
    "subject": "radio",
    "q": "Your radio sounds distorted. The leaflet’s rule of thumb for volume is:",
    "choices": [
      "Keep it below about 70% of the range",
      "Always at 100%",
      "Volume does not affect distortion",
      "Use the intercom knob instead"
    ],
    "ans": 0,
    "exp": "Above about 70% many sets distort, so you understand less, not more. Set radio and intercom levels separately so neither drowns the other.",
    "lesson": "radio-05"
  },
  {
    "id": "radio-q-63",
    "subject": "radio",
    "q": "Which voice channel spacing is used in UK airspace for aircraft VHF?",
    "choices": [
      "8.33 kHz",
      "50 kHz",
      "100 kHz",
      "1 MHz"
    ],
    "ans": 0,
    "exp": "The 8.33 kHz spacing allows over two thousand channels in the band. Some sets need 8.33 mode switched on, or an extra pull of the knob for the last digits. Practise on the ground.",
    "lesson": "radio-05"
  },
  {
    "id": "radio-q-64",
    "subject": "radio",
    "q": "You are VFR with no code given by ATC. Your squawk is normally:",
    "choices": [
      "7000",
      "2000",
      "0030",
      "7600"
    ],
    "ans": 0,
    "exp": "7000 is UK VFR conspicuity. 2000 is the IFR conspicuity code (not used everywhere). 0030 means lost and 7600 means radio failure.",
    "lesson": "radio-06"
  },
  {
    "id": "radio-q-65",
    "subject": "radio",
    "q": "You change the altimeter from QNH 1020 to 1013. What happens to the level your Mode C sends?",
    "choices": [
      "Nothing — Mode C always uses 1013.2 hPa",
      "It drops by 210 ft",
      "It switches to QFE",
      "Mode C turns off"
    ],
    "ans": 0,
    "exp": "The transponder reports pressure level from a fixed 1013.2 hPa datum, whatever is set in your altimeter window. ATC adjusts it on their side.",
    "lesson": "radio-06"
  },
  {
    "id": "radio-q-66",
    "subject": "radio",
    "q": "When should you press the IDENT button?",
    "choices": [
      "Only when ATC asks you to squawk ident",
      "Every time you change frequency",
      "When entering any ATZ",
      "Every 10 minutes"
    ],
    "ans": 0,
    "exp": "Ident highlights your blip on the radar screen. Pressing it without being asked can confuse a controller who is trying to identify someone else.",
    "lesson": "radio-06"
  },
  {
    "id": "radio-q-67",
    "subject": "radio",
    "q": "What does a Frequency Monitoring Code (listening squawk) do?",
    "choices": [
      "Tells a radar unit you are listening on its frequency, without requesting a service",
      "Gives you a Traffic Service automatically",
      "Clears you through controlled airspace",
      "Replaces the need for a lookout"
    ],
    "ans": 0,
    "exp": "An FMC lets the unit call you quickly if you head for an infringement. It does not guarantee a warning and it is not a service. When you leave that frequency, return to 7000 or the next FMC.",
    "lesson": "radio-06"
  },
  {
    "id": "radio-q-68",
    "subject": "radio",
    "q": "Squawk 0030 in the UK indicates:",
    "choices": [
      "Lost",
      "Radio failure",
      "Hijack",
      "Glider"
    ],
    "ans": 0,
    "exp": "0030 is the UK lost code. Use it with ALT on and ask a radar unit for a position fix. 7600 is radio failure and 7500 is unlawful interference.",
    "lesson": "radio-06"
  },
  {
    "id": "radio-q-69",
    "subject": "radio",
    "q": "On a first call to Wycombe Tower, the correct order is:",
    "choices": [
      "\"Wycombe Tower, Golf Charlie Mike Victor Delta\"",
      "\"Golf Charlie Mike Victor Delta, Wycombe Tower\"",
      "\"This is Golf Charlie Mike Victor Delta calling Tower\"",
      "\"Hello Tower, with you\""
    ],
    "ans": 0,
    "exp": "On an initial call the station you are calling comes first, then your full callsign. Filler such as \"this is\" or \"with you\" wastes airtime.",
    "lesson": "radio-07"
  },
  {
    "id": "radio-q-70",
    "subject": "radio",
    "q": "When may you shorten G-CMVD to \"Golf Victor Delta\"?",
    "choices": [
      "Only after the ground station has shortened it first",
      "Whenever the frequency is busy",
      "After your first call, always",
      "Never in the UK"
    ],
    "ans": 0,
    "exp": "Only the ground station starts using the abbreviated callsign. Until then, keep using the full one so there’s no confusion with similar callsigns.",
    "lesson": "radio-07"
  },
  {
    "id": "radio-q-71",
    "subject": "radio",
    "q": "Tower says: \"Golf Victor Delta, report downwind.\" The best reply is:",
    "choices": [
      "\"Wilco, Golf Victor Delta\"",
      "\"Report downwind, Golf Victor Delta\"",
      "\"Roger\"",
      "\"Copy that\""
    ],
    "ans": 0,
    "exp": "A simple request to report a position doesn’t need a word-for-word readback. \"Wilco\" means understood and will comply. \"Roger\" alone only says you heard it.",
    "lesson": "radio-07"
  },
  {
    "id": "radio-q-72",
    "subject": "radio",
    "q": "ATC gives you a squawk then a QNH. How should you read them back?",
    "choices": [
      "Squawk first, then QNH, the same order given",
      "QNH first, as pressure is more important",
      "Only the squawk",
      "Either order is fine"
    ],
    "ans": 0,
    "exp": "Read back in the order you heard it. Reversing the order is a common error and makes it harder for the controller to check you.",
    "lesson": "radio-07"
  },
  {
    "id": "radio-q-73",
    "subject": "radio",
    "q": "Which item does NOT need a full readback?",
    "choices": [
      "A traffic information report",
      "Clearance to land",
      "A squawk code",
      "A frequency change"
    ],
    "ans": 0,
    "exp": "Clearances, codes, frequencies, pressure settings, levels, headings and the runway in use must be read back. Traffic information just needs an acknowledgement, such as \"traffic in sight\".",
    "lesson": "radio-07"
  },
  {
    "id": "radio-q-74",
    "subject": "radio",
    "q": "A station with the callsign suffix \"Radio\" provides:",
    "choices": [
      "Air/Ground Communication Service — information only",
      "Air Traffic Control",
      "Aerodrome Flight Information Service",
      "Military radar"
    ],
    "ans": 0,
    "exp": "\"Radio\" means AGCS. It isn’t formally an air traffic service and can’t clear or instruct you. Its traffic information often comes from other pilots' reports, so treat it as advisory.",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-75",
    "subject": "radio",
    "q": "An AFIS officer says \"land at your discretion\". You should:",
    "choices": [
      "Make your own decision, check the runway is clear, and reply \"Landing\"",
      "Treat it as a clearance to land",
      "Reply \"at my discretion\"",
      "Go around automatically"
    ],
    "ans": 0,
    "exp": "AFIS doesn’t issue landing clearances. The phrase hands the decision to you. Reply with what you are doing, not \"at my discretion\".",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-76",
    "subject": "radio",
    "q": "At holding point Echo you are ready. The correct call is:",
    "choices": [
      "\"Ready for departure\"",
      "\"Ready for take-off\"",
      "\"Taking off now\" before any reply",
      "\"Request instructions\""
    ],
    "ans": 0,
    "exp": "The words \"take-off\" are kept for the clearance itself, or for announcing that you are taking off at AFIS or A/G fields. That avoids dangerous misunderstandings.",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-77",
    "subject": "radio",
    "q": "SAFETYCOM (135.480) may be used:",
    "choices": [
      "Within 10 NM and up to 1000 ft above circuit height of a field with no frequency",
      "Anywhere en route as a chat channel",
      "Only inside controlled airspace",
      "Only by gliders"
    ],
    "ans": 0,
    "exp": "SAFETYCOM is a common frequency for fields that have none of their own. Start and finish each call with the field name, for example \"Chalfont Farm Traffic … Chalfont Farm\", so nearby fields aren’t confused.",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-78",
    "subject": "radio",
    "q": "The position \"final\" in the circuit covers:",
    "choices": [
      "From about 4 NM to the threshold",
      "From 8 NM to 4 NM",
      "Only the last 200 m",
      "Base leg turn"
    ],
    "ans": 0,
    "exp": "Final is within about 4 NM. \"Long final\" is 4–8 NM. There is no official \"short final\", so give a distance such as \"half-mile final\" if you need to.",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-79",
    "subject": "radio",
    "q": "Inbound to an ATC aerodrome, you should make the first call at:",
    "choices": [
      "15 NM or 5 minutes from the ATZ, whichever is further",
      "The ATZ boundary",
      "Overhead",
      "2 NM final"
    ],
    "ans": 0,
    "exp": "Calling early gives the controller time to plan your arrival. State your request (\"request join\") and the ATIS letter in that first call.",
    "lesson": "radio-08"
  },
  {
    "id": "radio-q-80",
    "subject": "radio",
    "q": "Under a Basic Service, avoiding other traffic is the responsibility of:",
    "choices": [
      "The pilot only",
      "The controller",
      "Shared equally",
      "The FISO, if workload allows"
    ],
    "ans": 0,
    "exp": "A Basic Service gives you the most freedom. You may hear about activity if the controller knows of it and has time, but lookout and avoidance are entirely yours.",
    "lesson": "radio-09"
  },
  {
    "id": "radio-q-81",
    "subject": "radio",
    "q": "A VFR C42 in Class G asks for a Deconfliction Service. It will:",
    "choices": [
      "Not be available — Deconfliction is IFR only in Class G",
      "Be given automatically",
      "Only be given above FL100",
      "Be given by London Information"
    ],
    "ans": 0,
    "exp": "Deconfliction Service is only for IFR flights in Class G. A VFR pilot can get a Basic or Traffic Service. Under a Traffic Service you get traffic information but no avoiding advice.",
    "lesson": "radio-09"
  },
  {
    "id": "radio-q-82",
    "subject": "radio",
    "q": "After \"pass your message\", the standard freecall order is:",
    "choices": [
      "Callsign, type, from, to, position, altitude & setting, VFR, intentions",
      "Type, POB, fuel, callsign",
      "Position only",
      "Request, then callsign at the end"
    ],
    "ans": 0,
    "exp": "Using the standard order means the controller knows where to find each item. You don’t need to repeat the service request if it was in your first call.",
    "lesson": "radio-09"
  },
  {
    "id": "radio-q-83",
    "subject": "radio",
    "q": "You requested a zone transit and are told \"remain outside controlled airspace\". You should:",
    "choices": [
      "Stay clear and fly your plan B until you hear \"cleared\"",
      "Enter slowly",
      "Enter if VMC is good",
      "Squawk 7600 and enter"
    ],
    "ans": 0,
    "exp": "You need the word \"cleared\" before entering Class D. Ask about 10 minutes from the boundary and always have an alternative route planned.",
    "lesson": "radio-09"
  },
  {
    "id": "radio-q-84",
    "subject": "radio",
    "q": "For a civil pilot, a MATZ is:",
    "choices": [
      "Not controlled airspace, but you should call for a \"MATZ penetration service\"",
      "Class A airspace",
      "Prohibited airspace",
      "Only active at weekends"
    ],
    "ans": 0,
    "exp": "A MATZ has no legal force over civil traffic, but calling is strongly recommended because military traffic is intense there. Follow any instructions you accept, and say \"unable\" if one would break civil rules.",
    "lesson": "radio-09"
  },
  {
    "id": "radio-q-85",
    "subject": "radio",
    "q": "The UK expects one item in a Mayday that ICAO does not require. It is:",
    "choices": [
      "Pilot qualification (e.g. student, no instrument rating)",
      "Aircraft colour",
      "Departure time",
      "Fuel price"
    ],
    "ans": 0,
    "exp": "Your qualification helps the controller choose help that suits your ability. It comes after position, height and heading, before POB and endurance.",
    "lesson": "radio-10"
  },
  {
    "id": "radio-q-86",
    "subject": "radio",
    "q": "You aren’t talking to anyone and need emergency help. Use:",
    "choices": [
      "121.5 MHz — \"London Centre\"",
      "SAFETYCOM 135.480",
      "The last ATIS frequency",
      "Any FM broadcast"
    ],
    "ans": 0,
    "exp": "In UK airspace the Distress and Diversion cell answers 121.5 as \"London Centre\". If you are already talking to a unit, make the call to them instead.",
    "lesson": "radio-10"
  },
  {
    "id": "radio-q-87",
    "subject": "radio",
    "q": "Your oil pressure is slowly falling but the engine runs. Best radio action?",
    "choices": [
      "Make an early PAN PAN call",
      "Wait until the engine stops, then Mayday",
      "Say nothing to avoid fuss",
      "Squawk 7500"
    ],
    "ans": 0,
    "exp": "Urgency calls are for problems that may get worse. Calling early lets ATC arrange priority, navigation help or quicker search and rescue.",
    "lesson": "radio-10"
  },
  {
    "id": "radio-q-88",
    "subject": "radio",
    "q": "The radio suddenly goes silent. Your FIRST priority is:",
    "choices": [
      "Fly the aircraft and keep a lookout, then troubleshoot simply",
      "Spend time unscrewing the panel",
      "Enter controlled airspace to be seen",
      "Turn the master off and on repeatedly"
    ],
    "ans": 0,
    "exp": "VFR flight is safe without a radio. Most \"failures\" are settings, such as frequency, volume, squelch, plugs or the audio panel. If it stays dead, squawk 7600, stay VMC and out of CAS, and consider a quiet field.",
    "lesson": "radio-10"
  },
  {
    "id": "radio-q-89",
    "subject": "radio",
    "q": "You are genuinely lost near Amersham in fading visibility. Which is best?",
    "choices": [
      "Squawk 0030 and call for help early, making a Pan if VMC is at risk",
      "Ask for a \"training fix\"",
      "Keep quiet and keep flying",
      "Squawk 7000 and climb into cloud"
    ],
    "ans": 0,
    "exp": "Admit it early and use a radar fix if you can. If the flight’s safety is in doubt, for example you’re losing VMC, make an urgency or distress call. Don’t call a real situation a training fix.",
    "lesson": "radio-10"
  },
  {
    "id": "law-q-59",
    "subject": "law",
    "q": "In Class G below 3,000 ft AMSL at 140 kt IAS or less, the UK VFR minima are:",
    "choices": [
      "Clear of cloud, surface in sight, 1,500 m flight visibility",
      "1,000 ft vertically from cloud and 8 km visibility",
      "Clear of cloud with 500 m visibility",
      "5 km visibility and 1,500 m horizontally from cloud"
    ],
    "ans": 0,
    "exp": "These are the reduced UK Class G minima at low level and low speed. Your own personal minima should be higher, and check the current rules with your instructor.",
    "lesson": "law-05",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-60",
    "subject": "law",
    "q": "In the signals area, a red square panel with one yellow diagonal means:",
    "choices": [
      "Landing is prohibited",
      "The manoeuvring area is in poor condition, so take special care when landing",
      "Gliding is in progress",
      "Use paved surfaces only"
    ],
    "ans": 1,
    "exp": "One diagonal means take special care. A red square with a yellow cross (two diagonals) means landings are prohibited.",
    "lesson": "law-signs",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-61",
    "subject": "law",
    "q": "An aircraft in flight sees a flashing red light from the tower. It means:",
    "choices": [
      "Cleared to land",
      "Return to the aerodrome",
      "Aerodrome not available, do not land",
      "Give way and continue circling"
    ],
    "ans": 2,
    "exp": "Flashing red in flight means do not land here. Steady red means give way and keep circling.",
    "lesson": "law-signs",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-62",
    "subject": "law",
    "q": "An NPPL holder can usually meet the medical requirement by:",
    "choices": [
      "No medical requirement exists for microlights",
      "A class 1 medical only",
      "A yearly eyesight test only",
      "Making a Pilot Medical Declaration or holding a suitable medical certificate"
    ],
    "ans": 3,
    "exp": "Most NPPL microlight pilots use a Pilot Medical Declaration based on DVLA standards. Check the current CAA guidance for your situation.",
    "lesson": "law-01",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-63",
    "subject": "law",
    "q": "Can a microlight NPPL holder fly at night?",
    "choices": [
      "No, NPPL privileges are for flight by day only",
      "Yes, with a night rating on the NPPL",
      "Yes, inside controlled airspace only",
      "Yes, in summer only"
    ],
    "ans": 0,
    "exp": "The NPPL is a day-only licence. Plan to be on the ground with a margin before sunset.",
    "lesson": "law-01",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-64",
    "subject": "law",
    "q": "A Danger Area Activity Information Service (DAAIS) tells you:",
    "choices": [
      "The best height to fly through the area",
      "Whether a danger area is active, but it does not give a crossing clearance",
      "The area is permanently inactive",
      "How to get a clearance through any restricted area"
    ],
    "ans": 1,
    "exp": "DAAIS gives activity status only. Even if an area is shown as inactive, take care and plan to avoid active areas.",
    "lesson": "law-02",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-53",
    "subject": "met",
    "q": "You fly from warm air into much colder air without changing the altimeter setting. Your true altitude is:",
    "choices": [
      "Higher than indicated",
      "The same as indicated",
      "Lower than indicated",
      "Higher only over the sea"
    ],
    "ans": 2,
    "exp": "Cold air is denser, so pressure levels are closer together and the altimeter over-reads. Remember high to low, or hot to cold, look out below.",
    "lesson": "met-01",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-54",
    "subject": "met",
    "q": "Advection fog forms when:",
    "choices": [
      "Cold air moves over warm sea",
      "The sun heats the ground strongly",
      "Air sinks in a high",
      "Warm moist air moves over a colder surface"
    ],
    "ans": 3,
    "exp": "Advection fog can form and persist even in stronger winds. It is common over cold sea and coasts in spring and early summer.",
    "lesson": "met-03",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-55",
    "subject": "met",
    "q": "As a warm front approaches, the typical cloud sequence is:",
    "choices": [
      "Cirrus, then cirrostratus, altostratus and nimbostratus, with lowering cloud",
      "Cumulonimbus first, then clear skies",
      "Fog, then cumulus",
      "Lenticular cloud only"
    ],
    "ans": 0,
    "exp": "The cloud thickens and lowers ahead of a warm front, often with widespread rain and poor visibility.",
    "lesson": "met-03",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-56",
    "subject": "met",
    "q": "In a TAF, TEMPO means:",
    "choices": [
      "A permanent change during the period",
      "Temporary changes, each lasting under an hour and in total less than half the period",
      "Temperature information",
      "The forecast has been cancelled"
    ],
    "ans": 1,
    "exp": "Plan for the TEMPO conditions as well as the main forecast, because they will happen for part of the period.",
    "lesson": "met-04",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-57",
    "subject": "met",
    "q": "With your back to the wind in the northern hemisphere, low pressure is:",
    "choices": [
      "On your right",
      "Directly behind you",
      "On your left",
      "Directly ahead of you"
    ],
    "ans": 2,
    "exp": "This is Buys Ballot's law. It helps you picture the pressure pattern from the wind you feel.",
    "lesson": "met-02",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-58",
    "subject": "met",
    "q": "Compared with the wind at 2,000 ft, the surface wind over land is usually:",
    "choices": [
      "Veered and stronger",
      "Exactly the same",
      "Backed and stronger",
      "Backed and lighter, especially at night"
    ],
    "ans": 3,
    "exp": "Surface friction slows the wind and turns it to an anti-clockwise direction. By day, mixing makes the difference smaller.",
    "lesson": "met-02",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-59",
    "subject": "met",
    "q": "The air temperature is 18 °C and the dew point is 10 °C. Roughly where is the cumulus cloud base?",
    "choices": [
      "About 3,200 ft",
      "About 800 ft",
      "About 10,000 ft",
      "About 1,800 ft"
    ],
    "ans": 0,
    "exp": "A rule of thumb is a spread of (18 − 10) × 400 ft ≈ 3,200 ft above ground. Always check the forecast and actual reports.",
    "lesson": "met-clouds",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-59",
    "subject": "nav",
    "q": "On a 1:500,000 chart, 1 cm represents:",
    "choices": [
      "500 m",
      "5 km",
      "50 km",
      "1 nm"
    ],
    "ans": 1,
    "exp": "1 cm × 500,000 = 500,000 cm = 5 km. Many pilots use a scale rule in nautical miles instead.",
    "lesson": "nav-05",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-60",
    "subject": "nav",
    "q": "In summer the UK uses BST. UTC is:",
    "choices": [
      "One hour ahead of local time",
      "The same as local time",
      "One hour behind local time",
      "Two hours behind local time"
    ],
    "ans": 2,
    "exp": "Flight plans, METARs, TAFs and NOTAMs use UTC (Z). In summer, take one hour off BST to get UTC.",
    "lesson": "nav-05",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-61",
    "subject": "nav",
    "q": "A 33 nm leg at a groundspeed of 66 kt takes:",
    "choices": [
      "20 minutes",
      "45 minutes",
      "33 minutes",
      "30 minutes"
    ],
    "ans": 3,
    "exp": "Time = distance ÷ groundspeed = 0.5 h. Use the CRP or mental maths and add time for the climb and joining.",
    "lesson": "nav-03",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-62",
    "subject": "nav",
    "q": "The engine burns 18 litres an hour. How much fuel does a 1 h 20 min flight use, before any reserve?",
    "choices": [
      "24 litres",
      "18 litres",
      "20 litres",
      "36 litres"
    ],
    "ans": 0,
    "exp": "18 × 1.333 = 24 L. Add your reserve and an allowance for taxi and diversions.",
    "lesson": "nav-03",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-63",
    "subject": "nav",
    "q": "Isogonals on a chart are lines joining places with:",
    "choices": [
      "The same elevation",
      "The same magnetic variation",
      "The same air pressure",
      "The same time zone"
    ],
    "ans": 1,
    "exp": "Isogonals let you convert between true and magnetic directions. Variation changes slowly over the years.",
    "lesson": "nav-01",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-64",
    "subject": "nav",
    "q": "The aircraft's compass deviation card corrects for:",
    "choices": [
      "The difference between true and magnetic north",
      "The wind",
      "Magnetic effects from the aircraft itself",
      "Errors in the airspeed indicator"
    ],
    "ans": 2,
    "exp": "Deviation comes from the aircraft's own metal and electrics. Variation comes from the Earth's magnetic field.",
    "lesson": "nav-01",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-65",
    "subject": "nav",
    "q": "Spot heights and elevations on a UK VFR chart are given in:",
    "choices": [
      "Metres above ground",
      "Feet above aerodrome level",
      "Flight levels",
      "Feet above mean sea level"
    ],
    "ans": 3,
    "exp": "Use them with QNH to keep a safe height above the terrain and obstacles.",
    "lesson": "nav-02",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-66",
    "subject": "nav",
    "q": "You are uncertain of your position. A sound first step is to:",
    "choices": [
      "Keep flying a known heading, check the time and fuel, and look for a big feature",
      "Turn several times to look around",
      "Climb into cloud for a better view",
      "Switch off the radio to concentrate"
    ],
    "ans": 0,
    "exp": "Stay calm and keep the aircraft under control. Then use your heading, the time and big features to work out where you are, and ask for help early.",
    "lesson": "nav-04",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-51",
    "subject": "tech",
    "q": "An aerofoil stalls when:",
    "choices": [
      "The airspeed drops below a fixed figure",
      "The critical angle of attack is exceeded, at any airspeed",
      "The engine stops",
      "The wing reaches a certain bank angle"
    ],
    "ans": 1,
    "exp": "The stall is about angle of attack. Stall speed changes with weight, load factor and configuration.",
    "lesson": "tech-01",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-52",
    "subject": "tech",
    "q": "Loading the aircraft with the centre of gravity behind the aft limit will:",
    "choices": [
      "Make the aircraft more stable",
      "Reduce the stall speed safely",
      "Reduce pitch stability and make stall or spin recovery harder",
      "Have no noticeable effect"
    ],
    "ans": 2,
    "exp": "Always stay inside the weight and balance envelope in the flight manual. An aft CG can make the aircraft dangerously unstable.",
    "lesson": "tech-03",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-53",
    "subject": "tech",
    "q": "A two-stroke microlight engine such as a Rotax 582 is lubricated by:",
    "choices": [
      "A wet sump like a car engine",
      "Grease points checked before flight",
      "No lubrication",
      "Oil mixed with the fuel or injected, not by a wet sump"
    ],
    "ans": 3,
    "exp": "Use the correct oil and ratio or keep the oil-injection tank filled, as the engine manual says. Four-strokes such as the 912 have a separate oil system.",
    "lesson": "tech-02",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-54",
    "subject": "tech",
    "q": "Compared with a dry paved runway, short wet grass will usually:",
    "choices": [
      "Increase the landing distance significantly",
      "Shorten the landing distance",
      "Make no difference",
      "Only affect take-off"
    ],
    "ans": 0,
    "exp": "Wet grass reduces braking. Use CAA Safety Sense factors and the flight manual figures, and add a margin.",
    "lesson": "tech-03",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-55",
    "subject": "tech",
    "q": "If the aircraft weight increases, the stall speed:",
    "choices": [
      "Decreases",
      "Increases",
      "Stays the same",
      "Only changes in turns"
    ],
    "ans": 1,
    "exp": "A heavier aircraft needs a higher angle of attack for the same speed, so it reaches the critical angle at a higher speed.",
    "lesson": "tech-03",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-46",
    "subject": "hpl",
    "q": "After a long, gentle turn, you roll level and feel as if you are banking the other way. This is:",
    "choices": [
      "Carbon monoxide poisoning",
      "Hyperventilation",
      "The leans, a balance (vestibular) illusion",
      "Normal and a sign of good balance"
    ],
    "ans": 2,
    "exp": "Trust the instruments and the horizon, not your body's sense of balance.",
    "lesson": "hpl-02",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-47",
    "subject": "hpl",
    "q": "You smell exhaust fumes and get a headache in flight. You should:",
    "choices": [
      "Turn the cabin heat up",
      "Ignore it if the engine is running well",
      "Climb higher to clear it",
      "Turn the heat off, get fresh air and land as soon as practicable"
    ],
    "ans": 3,
    "exp": "Carbon monoxide can come from exhaust leaks into the heater. It is colourless and builds up slowly. A CO detector is cheap protection.",
    "lesson": "hpl-03",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-48",
    "subject": "hpl",
    "q": "Threat and error management encourages pilots to:",
    "choices": [
      "Spot threats early, catch errors and manage any unwanted aircraft state",
      "Ignore small mistakes",
      "Blame others for errors",
      "Avoid briefing before flight"
    ],
    "ans": 0,
    "exp": "Brief the threats you expect, such as weather, terrain, airspace and fatigue, and agree how you will deal with them.",
    "lesson": "hpl-04",
    "added": "2026-10-preview"
  },
  {
    "id": "radio-q-90",
    "subject": "radio",
    "q": "Under CAP 413, the standard word for 'yes' is:",
    "choices": [
      "AFFIRMATIVE",
      "AFFIRM",
      "YES-YES",
      "CORRECT"
    ],
    "ans": 1,
    "exp": "Use AFFIRM for yes and NEGATIVE for no.",
    "lesson": "radio-07",
    "added": "2026-10-preview"
  },
  {
    "id": "radio-q-91",
    "subject": "radio",
    "q": "Under CAP 413, how should 118.105 MHz be spoken?",
    "choices": [
      "ONE EIGHT ONE ZERO",
      "ONE ONE EIGHT ONE",
      "ONE ONE EIGHT DECIMAL ONE ZERO FIVE",
      "ONE EIGHTEEN POINT ONE"
    ],
    "ans": 2,
    "exp": "With 8.33 kHz channel spacing, say all six digits.",
    "lesson": "radio-01",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-65",
    "subject": "law",
    "q": "A white dumb-bell in the signals area means:",
    "choices": [
      "Gliding is in progress",
      "The aerodrome is closed",
      "Right-hand circuits are in use",
      "Aircraft must take off, land and taxi on runways and taxiways only"
    ],
    "ans": 3,
    "exp": "A dumb-bell with black stripes across each end adds that take-offs and landings must be on runways, but taxiing may use other areas.",
    "lesson": "law-signs",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-66",
    "subject": "law",
    "q": "A steady green light to an aircraft in flight means:",
    "choices": [
      "Cleared to land",
      "Return for landing and wait for a steady green",
      "Do not land",
      "Give way and keep circling"
    ],
    "ans": 0,
    "exp": "Flashing green means return for landing. Steady green means cleared to land. Still check the runway is clear.",
    "lesson": "law-signs",
    "added": "2026-10-preview"
  },
  {
    "id": "law-q-67",
    "subject": "law",
    "q": "Two aircraft are approaching the same aerodrome to land. Which normally has right of way?",
    "choices": [
      "The higher one",
      "The lower one, but it must not cut in front of or overtake the other",
      "The faster one",
      "The one with the bigger engine"
    ],
    "ans": 1,
    "exp": "Aircraft landing or on final approach have right of way. Between two landing aircraft, the lower one has priority but must not take advantage of it to cut in.",
    "lesson": "law-03",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-60",
    "subject": "met",
    "q": "Smooth, lens-shaped (lenticular) clouds downwind of hills usually show:",
    "choices": [
      "Calm, stable air with no turbulence",
      "An approaching warm front only",
      "Mountain or lee waves, with possible strong up- and downdraughts and rotor",
      "Fog forming"
    ],
    "ans": 2,
    "exp": "Lee waves can give strong sink and severe rotor turbulence below the wave crests, near the lee slopes.",
    "lesson": "met-clouds",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-61",
    "subject": "met",
    "q": "In meteorology, fog (FG) means visibility is:",
    "choices": [
      "Less than 5 km",
      "Less than 10 km",
      "Less than 100 m only",
      "Less than 1,000 m"
    ],
    "ans": 3,
    "exp": "Mist (BR) is visibility of 1,000 m or more with high humidity. Both can drop below VFR minima quickly.",
    "lesson": "met-03",
    "added": "2026-10-preview"
  },
  {
    "id": "met-q-62",
    "subject": "met",
    "q": "Moist air blown up the windward slopes of hills is likely to give:",
    "choices": [
      "Hill fog or low cloud on the high ground",
      "Clearer air on the hilltops",
      "Only high cirrus",
      "Dry, warm air on the windward side"
    ],
    "ans": 0,
    "exp": "Orographic lift cools the air until it condenses. Hills can disappear into cloud while the valleys stay clear.",
    "lesson": "met-02",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-67",
    "subject": "nav",
    "q": "Using the 1-in-60 rule of thumb, the maximum drift with a 15 kt crosswind at a TAS of 60 kt is about:",
    "choices": [
      "4°",
      "15°",
      "30°",
      "60°"
    ],
    "ans": 1,
    "exp": "Maximum drift ≈ wind speed × 60 ÷ TAS = 15 × 60 ÷ 60 = 15°. This explains why slow microlights see large drift angles.",
    "lesson": "nav-01",
    "added": "2026-10-preview"
  },
  {
    "id": "nav-q-68",
    "subject": "nav",
    "q": "You cover 12 nm between two fixes in 8 minutes. Your groundspeed is:",
    "choices": [
      "60 kt",
      "96 kt",
      "90 kt",
      "72 kt"
    ],
    "ans": 2,
    "exp": "12 nm ÷ 8 min = 1.5 nm a minute = 90 nm an hour. Use it to update your ETAs.",
    "lesson": "nav-01",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-56",
    "subject": "tech",
    "q": "A wing with washout has:",
    "choices": [
      "A bigger angle of incidence at the tips",
      "Flaps on the tips",
      "No twist at all",
      "A smaller angle of incidence at the tips, so the roots stall first"
    ],
    "ans": 3,
    "exp": "Washout helps keep aileron control near the stall and gives a gentler stall.",
    "lesson": "tech-01",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-57",
    "subject": "tech",
    "q": "In a dive with a fixed-pitch propeller and the throttle unchanged, engine rpm will:",
    "choices": [
      "Rise, and could exceed the limit",
      "Fall",
      "Stay exactly the same",
      "Drop to idle"
    ],
    "ans": 0,
    "exp": "Reduce power in a descent or dive to keep the rpm within limits.",
    "lesson": "tech-02",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-58",
    "subject": "tech",
    "q": "In a weight-shift microlight, to turn left the pilot moves the control bar:",
    "choices": [
      "To the left",
      "To the right, shifting weight to the left",
      "Forward",
      "Back"
    ],
    "ans": 1,
    "exp": "Moving the bar right moves the pilot's weight left and the wing banks left. 3-axis aircraft use stick and rudder instead.",
    "lesson": "tech-01",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-59",
    "subject": "tech",
    "q": "On a Rotax 912, the engine is cooled by:",
    "choices": [
      "Air only",
      "Oil only",
      "Liquid-cooled cylinder heads and air-cooled cylinders",
      "Liquid only, with no air cooling"
    ],
    "ans": 2,
    "exp": "Check the coolant level and look for leaks on the walk-round, as the engine manual says.",
    "lesson": "tech-02",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-49",
    "subject": "hpl",
    "q": "You have a heavy cold and blocked ears. Flying could cause:",
    "choices": [
      "Better hearing",
      "No effect in a microlight",
      "Only a mild itch",
      "Severe ear pain or damage, especially when descending"
    ],
    "ans": 3,
    "exp": "Blocked Eustachian tubes cannot equalise the pressure. Do not fly with a heavy cold, and check any decongestant with your doctor or AME.",
    "lesson": "hpl-01",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-50",
    "subject": "hpl",
    "q": "Long-term exposure to engine and wind noise can cause:",
    "choices": [
      "Permanent hearing loss, so use a good headset or ear protection",
      "Better hearing over time",
      "Only a short-term headache",
      "No effect in open cockpits"
    ],
    "ans": 0,
    "exp": "Noise damage builds up slowly and cannot be reversed. Protect your hearing on every flight.",
    "lesson": "hpl-02",
    "added": "2026-10-preview"
  },
  {
    "id": "hpl-q-51",
    "subject": "hpl",
    "q": "Polarised sunglasses in the cockpit can:",
    "choices": [
      "Improve all screen readability",
      "Hide reflections and make some displays or canopy panels hard to read",
      "Eliminate the need for lookout",
      "Cause hypoxia"
    ],
    "ans": 1,
    "exp": "Many pilots choose non-polarised sunglasses with good optical quality.",
    "lesson": "hpl-02",
    "added": "2026-10-preview"
  },
  {
    "id": "radio-q-92",
    "subject": "radio",
    "q": "Under CAP 413, QNH 1009 is spoken as:",
    "choices": [
      "TEN OH NINE",
      "ONE THOUSAND AND NINE",
      "ONE ZERO ZERO NINER",
      "ONE ZERO ZERO NINE"
    ],
    "ans": 2,
    "exp": "Say each digit and use NINER for 9.",
    "lesson": "radio-01",
    "added": "2026-10-preview"
  },
  {
    "id": "radio-q-93",
    "subject": "radio",
    "q": "An altitude of 2,500 ft is spoken as:",
    "choices": [
      "TWO FIVE ZERO ZERO FEET",
      "TWENTY-FIVE HUNDRED FEET",
      "FLIGHT LEVEL TWO FIVE",
      "TWO THOUSAND FIVE HUNDRED FEET"
    ],
    "ans": 3,
    "exp": "Use whole thousands and hundreds for altitudes and heights.",
    "lesson": "radio-01",
    "added": "2026-10-preview"
  },
  {
    "id": "radio-q-94",
    "subject": "radio",
    "q": "With a speechless code, one press of the transmit button means:",
    "choices": [
      "Yes",
      "No",
      "Say again",
      "Request homing"
    ],
    "ans": 0,
    "exp": "Under CAP 413, two presses mean no, three mean say again and four mean request homing. Check the current CAP 413 wording.",
    "lesson": "radio-04",
    "added": "2026-10-preview"
  },
  {
    "id": "tech-q-60",
    "subject": "tech",
    "q": "In a level 60° banked turn, the load factor and stall speed are about:",
    "choices": [
      "1 g, with stall speed unchanged",
      "2 g, with stall speed about 41% higher",
      "3 g, with stall speed doubled",
      "1.5 g, with stall speed 10% higher"
    ],
    "ans": 1,
    "exp": "Load factor = 1/cos 60° = 2. Stall speed increases with the square root of the load factor (√2 ≈ 1.41).",
    "lesson": "tech-03",
    "added": "2026-10-preview"
  }
];
if (typeof globalThis !== 'undefined') globalThis.QUESTIONS_DATA = QUESTIONS_DATA;
