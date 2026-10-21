/* UK NPPL / microlight / FRTOL study glossary — original study-aid wording.
   Confirm uncertain detail with instructor / current AIP / CAP 413. Not CAA official. */
const NPPL_GLOSSARY = [
  /* ——— A ——— */
  { term: 'A/G', meaning: 'Air/Ground radio — unlicensed operator giving airfield information only (not clearances).', category: 'abbr' },
  { term: 'ADF', meaning: 'Automatic Direction Finder — cockpit receiver that points toward an NDB.', category: 'abbr' },
  { term: 'AFIS', meaning: 'Aerodrome Flight Information Service — provides information and advice; does not issue ATC clearances.', category: 'abbr' },
  { term: 'AGCS', meaning: 'Air/Ground Communication Service — UK A/G radio service at many GA airfields.', category: 'abbr' },
  { term: 'AGL', meaning: 'Above Ground Level — height measured from the surface beneath you.', category: 'abbr' },
  { term: 'AIAA', meaning: 'Area of Intense Aerial Activity — charted area with lots of military or GA traffic; keep a sharp lookout.', category: 'abbr' },
  { term: 'AIC', meaning: 'Aeronautical Information Circular — CAA circular giving advice or temporary information.', category: 'abbr' },
  { term: 'AIP', meaning: 'Aeronautical Information Publication — the official UK “bible” of aerodromes, airspace, procedures (NATS AIS).', category: 'abbr' },
  { term: 'AIS', meaning: 'Aeronautical Information Service — provider of AIP, NOTAMs and related aeronautical data.', category: 'abbr' },
  { term: 'ALT', meaning: 'Altitude — vertical distance above mean sea level when QNH is set (also used as transponder “ALT” mode).', category: 'abbr' },
  { term: 'AME', meaning: 'Aeromedical Examiner — doctor authorised to issue/renew pilot medicals.', category: 'abbr' },
  { term: 'AMSL', meaning: 'Above Mean Sea Level — height referenced to sea-level datum.', category: 'abbr' },
  { term: 'ANO', meaning: 'Air Navigation Order — UK statute covering much civil aviation regulation.', category: 'abbr' },
  { term: 'ASI', meaning: 'Air Speed Indicator — cockpit instrument showing indicated airspeed.', category: 'abbr' },
  { term: 'ATC', meaning: 'Air Traffic Control — issues clearances and instructions to separate and sequence traffic.', category: 'abbr' },
  { term: 'ATIS', meaning: 'Automatic Terminal Information Service — continuous recorded aerodrome weather and runway info.', category: 'abbr' },
  { term: 'AUW', meaning: 'All-Up Weight — total weight of the aircraft as loaded for flight (empty + crew + fuel + baggage). Must not exceed MTOW.', category: 'abbr' },
  { term: 'ATZ', meaning: 'Aerodrome Traffic Zone — protected airspace around many UK aerodromes (often 2 NM / 2,000 ft AAL). Confirm chart.', category: 'abbr' },
  { term: 'AVGAS', meaning: 'Aviation gasoline — leaded petrol for many piston aero engines (check your type: Rotax may use MOGAS).', category: 'abbr' },

  /* ——— B ——— */
  { term: 'BECMG', meaning: 'Becoming — TAF change group: conditions expected to change gradually to those stated.', category: 'abbr' },
  { term: 'BKN', meaning: 'Broken cloud — 5 to 7 oktas of cloud cover in METAR/TAF.', category: 'abbr' },
  { term: 'BMAA', meaning: 'British Microlight Aircraft Association — UK microlight representative body / NPPL pathway context.', category: 'abbr' },
  { term: 'BR', meaning: 'Mist — visibility reduction in METAR (between fog and haze thresholds).', category: 'abbr' },

  /* ——— C ——— */
  { term: 'CAA', meaning: 'Civil Aviation Authority — UK civil aviation regulator.', category: 'abbr' },
  { term: 'CAP 413', meaning: 'CAA Radiotelephony Manual — the UK phraseology reference for FRTOL / RT study.', category: 'abbr' },
  { term: 'CAS', meaning: 'Calibrated Airspeed — IAS corrected for instrument and position error (also used loosely for Controlled Airspace).', category: 'abbr' },
  { term: 'CAS (airspace)', meaning: 'Controlled Airspace — Classes A–E in the UK where ATC separation/clearance rules apply as published.', category: 'abbr' },
  { term: 'CAVOK', meaning: 'Ceiling And Visibility OK — visibility ≥10 km, no cloud below 5,000 ft / MSA, no significant weather (ICAO METAR code).', category: 'abbr' },
  { term: 'CB', meaning: 'Cumulonimbus — thunderstorm cloud; avoid; turbulence, hail, icing, windshear.', category: 'abbr' },
  { term: 'CG', meaning: 'Centre of Gravity — balance point; must stay within POH limits with weight & balance.', category: 'abbr' },
  { term: 'CHIFFTAPWE', meaning: 'Pre-departure mnemonic (C42 checklist): Controls, Hatches, Instruments, Fuel, Flaps, Trim, All clear, Power check, Wind, Eventualities.', category: 'mnemonic' },
  { term: 'Class A–G', meaning: 'ICAO airspace classes. UK VFR microlights typically operate in Class G (and sometimes D/E with clearance). Confirm chart / AIP.', category: 'abbr' },
  { term: 'CO', meaning: 'Carbon monoxide — colourless toxic gas; cabin heater leaks are a classic source. Use a detector.', category: 'abbr' },
  { term: 'CRP-1', meaning: 'Circular slide-rule flight computer (UK “whizz-wheel”) for time/distance/fuel and wind triangle.', category: 'abbr' },
  { term: 'CTA', meaning: 'Control Area — controlled airspace above a CTR / around busy aerodromes from a stated base upwards.', category: 'abbr' },
  { term: 'CTR', meaning: 'Control Zone — controlled airspace around a major aerodrome from surface (or low base) to a stated upper limit.', category: 'abbr' },
  { term: 'CU', meaning: 'Cumulus — heaped fair-weather or building convective cloud.', category: 'abbr' },

  /* ——— D ——— */
  { term: 'DA', meaning: 'Danger Area — airspace within which activities dangerous to flight may exist (often military). Check activity / NOTAM.', category: 'abbr' },
  { term: 'Danger Area', meaning: 'See DA — charted with identification (e.g. D…); may be permanent or notified by NOTAM.', category: 'abbr' },
  { term: 'DEV', meaning: 'Deviation — compass error caused by the aircraft’s own magnetism (from compass card).', category: 'abbr' },
  { term: 'DI', meaning: 'Directional Indicator (direction gyro) — gyro heading instrument; set to compass, drifts with time.', category: 'abbr' },
  { term: 'DME', meaning: 'Distance Measuring Equipment — slant-range distance from a ground beacon (often paired with VOR).', category: 'abbr' },
  { term: 'Drift', meaning: 'Angle between heading and track caused by wind; corrected with wind correction angle (WCA).', category: 'abbr' },

  /* ——— E ——— */
  { term: 'EASA', meaning: 'European Union Aviation Safety Agency — historically regulated many UK licences; UK now largely CAA/UK regulations post-Brexit. Confirm current licence privileges.', category: 'abbr' },
  { term: 'EFATO', meaning: 'Engine Failure After Take-Off — pitch for glide, land ahead if low; turn-back only if trained and height allows.', category: 'abbr' },
  { term: 'ELT', meaning: 'Emergency Locator Transmitter — crash-activated distress beacon (121.5 / 406 MHz types).', category: 'abbr' },
  { term: 'ETA', meaning: 'Estimated Time of Arrival.', category: 'abbr' },

  /* ——— F ——— */
  { term: 'FARTT HH', meaning: 'Pre-landing mnemonic (C42 checklist): Fuel, Altimeter, Radio, Traffic, Ts & Ps, Hatches, Harnesses.', category: 'mnemonic' },
  { term: 'FEW', meaning: 'Few cloud — 1 to 2 oktas in METAR/TAF.', category: 'abbr' },
  { term: 'FG', meaning: 'Fog — visibility under 1,000 m due to suspended water droplets (METAR).', category: 'abbr' },
  { term: 'FIR', meaning: 'Flight Information Region — large volume of airspace for flight information / alerting (e.g. London FIR).', category: 'abbr' },
  { term: 'FIS', meaning: 'Flight Information Service — information useful for safe flight; not control.', category: 'abbr' },
  { term: 'FL', meaning: 'Flight Level — pressure altitude in hundreds of feet with 1013 hPa (QNE) set.', category: 'abbr' },
  { term: 'Flarm', meaning: 'FLARM — traffic awareness / collision-avoidance system common in gliders and some GA (not TCAS).', category: 'abbr' },
  { term: 'Forced landing', meaning: 'Landing forced by engine failure or other emergency — aviate, choose field, communicate if able, land under control.', category: 'abbr' },
  { term: 'FREDA', meaning: 'En-route checks mnemonic: Fuel, Radio, Engine, Direction, Altimeter.', category: 'mnemonic' },
  { term: 'FRTOL', meaning: 'Flight Radiotelephony Operator’s Licence — UK licence to use aeronautical radio (CAP 413 phraseology).', category: 'abbr' },

  /* ——— G ——— */
  { term: 'GA', meaning: 'General Aviation — civil aviation other than commercial air transport (includes microlights).', category: 'abbr' },
  { term: 'GPS', meaning: 'Global Positioning System — satellite navigation; backup with map & stopwatch for NPPL nav mind-set.', category: 'abbr' },
  { term: 'GS', meaning: 'Groundspeed — speed over the ground (TAS ± wind component).', category: 'abbr' },

  /* ——— H ——— */
  { term: 'HASELL', meaning: 'Pre-stall / spin / aerobatic checks: Height, Airframe, Security, Engine, Location, Lookout. Confirm with instructor.', category: 'mnemonic' },
  { term: 'HDG', meaning: 'Heading — direction the aeroplane’s nose is pointing (compass / DI).', category: 'abbr' },

  /* ——— I ——— */
  { term: 'IAS', meaning: 'Indicated Airspeed — what the ASI reads (uncorrected for position/instrument error).', category: 'abbr' },
  { term: 'ICAO', meaning: 'International Civil Aviation Organization — sets international standards (phonetics, airspace classes, etc.).', category: 'abbr' },
  { term: 'IFR', meaning: 'Instrument Flight Rules — flight primarily by instruments in IMC; NPPL microlight is normally VFR.', category: 'abbr' },
  { term: 'IMC', meaning: 'Instrument Meteorological Conditions — weather below VFR minima (cloud/visibility).', category: 'abbr' },
  { term: 'IMSAFE', meaning: 'Fitness-to-fly mnemonic: Illness, Medication, Stress, Alcohol, Fatigue, Eating (sometimes Emotion).', category: 'mnemonic' },
  { term: 'ISA', meaning: 'International Standard Atmosphere — sea-level 15 °C / 1013.25 hPa; baseline for performance & altimetry.', category: 'abbr' },

  /* ——— L ——— */
  { term: 'LARS', meaning: 'Lower Airspace Radar Service — UK radar information / traffic service from some units (confirm AIP / hours).', category: 'abbr' },
  { term: 'LDA', meaning: 'Landing Distance Available — usable landing length of runway.', category: 'abbr' },
  { term: 'LFA', meaning: 'Low Flying Area / Area of Intense Aerial Activity context — military low flying; extra lookout. Confirm chart legend.', category: 'abbr' },

  /* ——— M ——— */
  { term: 'MATZ', meaning: 'Military Aerodrome Traffic Zone — zone around many UK military aerodromes; penetration procedures / contact as published.', category: 'abbr' },
  { term: 'MAYDAY', meaning: 'Distress call — grave and imminent danger requiring immediate assistance (CAP 413).', category: 'abbr' },
  { term: 'MEF', meaning: 'Maximum Elevation Figure — highest terrain/obstacle in a chart quadrant (study aid: confirm chart legend).', category: 'abbr' },
  { term: 'METAR', meaning: 'Routine aerodrome weather report (actual).', category: 'abbr' },
  { term: 'Mode A / C / S', meaning: 'SSR transponder modes: A = code only; C = code + pressure altitude; S = selective addressing / more data.', category: 'abbr' },
  { term: 'MOGAS', meaning: 'Motor gasoline — road petrol; some Rotax microlights are approved — confirm POH / fuel grade.', category: 'abbr' },
  { term: 'MSA', meaning: 'Minimum Safe Altitude — altitude giving terrain/obstacle clearance on a route segment (planning figure).', category: 'abbr' },
  { term: 'MTOW', meaning: 'Maximum Take-Off Weight — structural/POH limit; never exceed.', category: 'abbr' },

  /* ——— N ——— */
  { term: 'NATS', meaning: 'UK air navigation services provider (AIS, many ATC units).', category: 'abbr' },
  { term: 'NDB', meaning: 'Non-Directional Beacon — ground radio beacon used with ADF.', category: 'abbr' },
  { term: 'NM', meaning: 'Nautical Mile — 1 NM ≈ 1.852 km; standard aviation distance unit.', category: 'abbr' },
  { term: 'NOSIG', meaning: 'No Significant Change — METAR trend: no significant change expected.', category: 'abbr' },
  { term: 'NOTAM', meaning: 'Notice to Airmen (Notice to Air Missions) — time-critical aeronautical information (closures, hazards, temporary airspace).', category: 'abbr' },
  { term: 'NPPL', meaning: 'National Private Pilot’s Licence — UK national licence (microlight / SSEA / SLMG pathways). Not automatically valid abroad.', category: 'abbr' },

  /* ——— O ——— */
  { term: 'OAT', meaning: 'Outside Air Temperature — ambient temperature for performance and carb-ice awareness.', category: 'abbr' },
  { term: 'OVC', meaning: 'Overcast — 8 oktas cloud cover in METAR/TAF.', category: 'abbr' },

  /* ——— P ——— */
  { term: 'PAN PAN', meaning: 'Urgency call — condition concerning safety of aircraft or person, but not requiring immediate assistance (CAP 413).', category: 'abbr' },
  { term: 'PFL', meaning: 'Practice Forced Landing — training exercise for engine-failure glide and field selection.', category: 'abbr' },
  { term: 'PIC', meaning: 'Pilot in Command — the pilot responsible for the flight.', category: 'abbr' },
  { term: 'PLB', meaning: 'Personal Locator Beacon — portable distress beacon carried by the pilot.', category: 'abbr' },
  { term: 'PMD', meaning: 'Pilot Medical Declaration — UK medical route used by many NPPL holders (confirm current CAA rules).', category: 'abbr' },
  { term: 'POB', meaning: 'Persons On Board — number of people in the aircraft (stated in emergencies).', category: 'abbr' },
  { term: 'POH', meaning: 'Pilot’s Operating Handbook — the aircraft’s official operating/performance manual (overrides study apps).', category: 'abbr' },
  { term: 'PPL', meaning: 'Private Pilot’s Licence — ICAO/EASA-style private licence (distinct from NPPL privileges).', category: 'abbr' },
  { term: 'PPR', meaning: 'Prior Permission Required — must obtain permission before visiting an airfield.', category: 'abbr' },
  { term: 'Prohibited Area', meaning: 'Airspace flight through which is prohibited (charted P…). Do not enter.', category: 'abbr' },

  /* ——— Q ——— */
  { term: 'QDM', meaning: 'Magnetic heading to steer to reach a station / bearing (Q-code).', category: 'abbr' },
  { term: 'QFE', meaning: 'Pressure setting so altimeter reads height above the aerodrome datum (roughly “zero on the airfield”).', category: 'abbr' },
  { term: 'QNE', meaning: 'Standard pressure setting 1013.2 hPa — used to fly Flight Levels.', category: 'abbr' },
  { term: 'QNH', meaning: 'Pressure setting so altimeter reads altitude above mean sea level in that area.', category: 'abbr' },

  /* ——— R ——— */
  { term: 'Restricted Area', meaning: 'Airspace with flight restrictions (charted R…); entry only if conditions met / permission held.', category: 'abbr' },
  { term: 'RNAV', meaning: 'Area Navigation — navigating on any desired path using GPS/RNAV systems rather than only ground beacons.', category: 'abbr' },
  { term: 'RPM', meaning: 'Revolutions Per Minute — engine/prop speed.', category: 'abbr' },
  { term: 'RVR', meaning: 'Runway Visual Range — visibility along the runway (instrument/ops use).', category: 'abbr' },

  /* ——— S ——— */
  { term: 'Safetycom', meaning: 'UK frequency 135.480 MHz for traffic information at unattended aerodromes (confirm current AIP).', category: 'abbr' },
  { term: 'SCT', meaning: 'Scattered cloud — 3 to 4 oktas in METAR/TAF.', category: 'abbr' },
  { term: 'SG', meaning: 'Specific Gravity — density of a liquid relative to water; used to convert fuel litres to kilograms (typical Avgas/Mogas study value ~0.72).', category: 'abbr' },
  { term: 'SERA', meaning: 'Standardised European Rules of the Air — many UK rules of the air align with SERA (confirm current UK application).', category: 'abbr' },
  { term: 'SPECI', meaning: 'Special METAR issued when weather changes significantly between routine METARs.', category: 'abbr' },
  { term: 'SSR', meaning: 'Secondary Surveillance Radar — ground interrogator + aircraft transponder (squawk).', category: 'abbr' },
  { term: 'SVFR', meaning: 'Special VFR — ATC clearance to fly VFR in a control zone when weather is below normal VFR minima (rules apply).', category: 'abbr' },
  { term: 'Squawk', meaning: 'Four-digit Mode A/C/S code set on the transponder (e.g. 7000 conspicuity, 7700 emergency).', category: 'abbr' },

  /* ——— T ——— */
  { term: 'TAF', meaning: 'Terminal Aerodrome Forecast — forecast weather for an aerodrome for a stated period.', category: 'abbr' },
  { term: 'TAS', meaning: 'True Airspeed — IAS corrected for density altitude (and calibration) — speed through the air mass.', category: 'abbr' },
  { term: 'TEMPO', meaning: 'Temporary — TAF group: fluctuations lasting less than an hour at a time within the period.', category: 'abbr' },
  { term: 'TMA', meaning: 'Terminal Control Area — controlled airspace around a major terminal (e.g. London TMA).', category: 'abbr' },
  { term: 'TODA', meaning: 'Take-Off Distance Available — take-off run plus clearway if declared.', category: 'abbr' },
  { term: 'TRK', meaning: 'Track — path over the ground (desired or actual).', category: 'abbr' },
  { term: 'Transponder', meaning: 'SSR airborne equipment that replies to interrogations with a squawk code (± altitude in Mode C/S).', category: 'abbr' },
  { term: 'TS', meaning: 'Thunderstorm — METAR/TAF weather group; do not fly into or under developing CB.', category: 'abbr' },
  { term: 'TVMDC', meaning: 'True → Variation → Magnetic → Deviation → Compass — converting true track/heading to compass.', category: 'mnemonic' },

  /* ——— U ——— */
  { term: 'UIR', meaning: 'Upper Information Region — upper counterpart to an FIR (high-level airspace).', category: 'abbr' },
  { term: 'UTC', meaning: 'Coordinated Universal Time — aviation “Zulu” time used in METAR/TAF/NOTAM.', category: 'abbr' },

  /* ——— V ——— */
  { term: 'VAR', meaning: 'Variation — angle between true north and magnetic north (from chart).', category: 'abbr' },
  { term: 'VFR', meaning: 'Visual Flight Rules — fly with visual reference to surface/horizon within VMC minima.', category: 'abbr' },
  { term: 'VMC', meaning: 'Visual Meteorological Conditions — weather at or above VFR minima for the airspace/class.', category: 'abbr' },
  { term: 'VOLMET', meaning: 'Broadcast meteorological information for aircraft in flight (HF/VHF as published).', category: 'abbr' },
  { term: 'VOR', meaning: 'VHF Omnidirectional Range — ground beacon giving magnetic radial information.', category: 'abbr' },
  { term: 'VRP', meaning: 'Visual Reference Point — charted landmark used for joins / ATC reporting.', category: 'abbr' },
  { term: 'VV', meaning: 'Vertical Visibility — reported when sky is obscured (fog etc.) instead of a cloud ceiling.', category: 'abbr' },

  /* ——— W ——— */
  { term: 'WCA', meaning: 'Wind Correction Angle — degrees of heading offset into wind to maintain desired track.', category: 'abbr' },

  /* ——— Numbers / special ——— */
  { term: '121.500', meaning: 'International aeronautical emergency frequency (MHz) — distress & urgency; also monitored by many ATS units.', category: 'abbr' },
  { term: '135.480', meaning: 'UK Safetycom frequency (MHz) for unattended aerodrome traffic calls — confirm current AIP.', category: 'abbr' },
  { term: '7000', meaning: 'UK SSR conspicuity code commonly used by VFR traffic when no other code assigned (confirm AIP / unit).', category: 'abbr' },
  { term: '7700', meaning: 'SSR emergency squawk — general emergency.', category: 'abbr' },
  { term: '7600', meaning: 'SSR radio-failure squawk.', category: 'abbr' },
  { term: '7500', meaning: 'SSR unlawful-interference squawk (hijack) — know it; hope never to use it.', category: 'abbr' }
];

/* Ensure A–Z sort (case-insensitive) at load */
NPPL_GLOSSARY.sort((a, b) => a.term.localeCompare(b.term, 'en-GB', { sensitivity: 'base' }));
