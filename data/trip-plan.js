/* Flight planning checklist — flying to another airfield (UK GA / microlight).
   Study aid only. Fill weather/NOTAM/AIP/PPR from official sources. No live APIs. */
const TRIP_PLAN = {
  disclaimer:
    'Not official flight planning. Always use current official weather, NOTAMs, AIP / airfield plates, PPR, and your instructor. Confirm runway suitability against POH / school figures. Not a substitute for instructor dual / POH / current UK regs.',
  aircraftDefault: 'C42',
  suggestedFreqs: [
    { label: 'Distress & Diversion', value: '121.500', note: 'Emergency' },
    { label: 'Safetycom', value: '135.480', note: 'Unattended airfields' },
    { label: 'Farnborough West', value: '125.250', note: 'LARS (confirm AIP)' },
    { label: 'Farnborough North', value: '132.800', note: 'LARS (confirm AIP)' },
    { label: 'Benson Zone', value: '120.900', note: 'Confirm AIP' },
    { label: 'Luton Radar', value: '129.550', note: 'Confirm AIP' },
    { label: 'London Info', value: '124.750', note: 'Confirm AIP' }
  ],
  sections: [
    {
      id: 'dest',
      title: '1. Destination & routing',
      speakIntro: 'Destination and routing. Confirm where you are going, the route, minimum safe altitude, airspace, and that the C 42 is suitable.',
      items: [
        {
          id: 'dest-icao',
          label: 'Destination ICAO (International Civil Aviation Organization) / name',
          help: 'Write the destination airfield code and name (e.g. EGHA / Compton Abbas).',
          fields: [{ id: 'destName', placeholder: 'ICAO / name', type: 'text' }]
        },
        {
          id: 'dest-route',
          label: 'Route planned',
          help: 'Note track / turning points / VRPs you will use. Keep it simple for VFR microlight.',
          fields: [{ id: 'routeNotes', placeholder: 'Route / turning points', type: 'text' }]
        },
        {
          id: 'dest-msa',
          label: 'MSA (Minimum Safe Altitude) / chart checked',
          help: 'Minimum safe altitude and the chart you are using (1:500k / 1:250k / Pooleys plates).',
          fields: [{ id: 'msa', placeholder: 'MSA / chart', type: 'text' }]
        },
        {
          id: 'dest-airspace',
          label: 'Airspace to avoid / cross',
          help: 'Note controlled airspace, ATZs (Aerodrome Traffic Zones), danger areas, and how you will avoid or cross with a clearance / FIS (Flight Information Service).',
          fields: [{ id: 'airspaceNotes', placeholder: 'Airspace notes', type: 'text' }]
        },
        {
          id: 'dest-vrp',
          label: 'VRP (Visual Reference Point) / visual landmark notes',
          help: 'Visual reference points for join and en-route navigation.',
          fields: [{ id: 'vrpNotes', placeholder: 'VRPs / landmarks', type: 'text' }]
        },
        {
          id: 'dest-ac',
          label: 'Aircraft suitable for trip (default C42)',
          help: 'Confirm C42 (or type you fly) range, runway needs, and school approval for this trip.',
          fields: [{ id: 'aircraft', placeholder: 'Aircraft type', type: 'text', default: 'C42' }]
        }
      ]
    },
    {
      id: 'wx',
      title: '2. Weather',
      speakIntro: 'Weather. Check departure, en route, and destination. Apply your personal minima. Make a clear go or no-go decision.',
      items: [
        {
          id: 'wx-dep',
          label: 'Departure TAF (forecast) / METAR (actual) / forecast',
          help: 'Check current METAR and TAF (or local forecast) for departure. Note cloud base, wind, visibility.',
          fields: [{ id: 'wxDep', placeholder: 'Dep WX summary', type: 'text' }]
        },
        {
          id: 'wx-enroute',
          label: 'En-route weather / winds / cloud / vis / precip',
          help: 'Winds aloft, cloud base, visibility, showers or fronts along the route.',
          fields: [{ id: 'wxEnroute', placeholder: 'En-route WX', type: 'text' }]
        },
        {
          id: 'wx-dest',
          label: 'Destination weather + trend',
          help: 'Destination METAR/TAF and whether it is improving or deteriorating for your ETA.',
          fields: [{ id: 'wxDest', placeholder: 'Dest WX + trend', type: 'text' }]
        },
        {
          id: 'wx-minima',
          label: 'Personal minima noted',
          help: 'Your limits — cloud base, wind, crosswind. Leave blank only if you truly have none set with your instructor.',
          fields: [
            { id: 'minCloud', placeholder: 'Cloud base min (ft)', type: 'text' },
            { id: 'minWind', placeholder: 'Wind limit (kt)', type: 'text' },
            { id: 'minXwind', placeholder: 'Crosswind limit (kt)', type: 'text' }
          ]
        },
        {
          id: 'wx-gono',
          label: 'Go / no-go decision noted',
          help: 'Write GO or NO-GO and a short reason. Be honest with yourself.',
          fields: [{ id: 'goNoGo', placeholder: 'GO / NO-GO + reason', type: 'text' }]
        }
      ]
    },
    {
      id: 'notam',
      title: '3. NOTAMs (Notice to Air Missions) & airspace',
      speakIntro: 'NOTAMs and airspace. Check departure, route, and destination. Look for restricted, danger, temporary airspace, runway closures, and navaid outages.',
      items: [
        {
          id: 'notam-all',
          label: 'Departure, route & destination NOTAMs checked',
          help: 'Use official NOTAM briefing. Note anything that affects your route or airfields.',
          fields: [{ id: 'notamNotes', placeholder: 'Relevant NOTAM notes', type: 'text' }]
        },
        {
          id: 'notam-rest',
          label: 'Restricted / danger / temp airspace, RA(T), displays, parachuting',
          help: 'RA(T), air displays, parachuting drops, danger areas — avoid or plan around.',
          fields: [{ id: 'restNotes', placeholder: 'Restrictions / events', type: 'text' }]
        },
        {
          id: 'notam-rwy',
          label: 'Runway / taxiway closures & navaid outages',
          help: 'Closed runways, unserviceable aids, temporary obstacles.',
          fields: [{ id: 'closureNotes', placeholder: 'Closures / outages', type: 'text' }]
        }
      ]
    },
    {
      id: 'ppr',
      title: '4. PPR (Prior Permission Required) & airfield info',
      speakIntro: 'Prior permission and airfield information. Confirm P P R, opening hours, runway length for the C 42, parking, fuel, and fees.',
      items: [
        {
          id: 'ppr-req',
          label: 'PPR (Prior Permission Required) — required? Obtained? Contact logged',
          help: 'Many UK GA / microlight strips need Prior Permission Required. Log who you spoke to and the phone number.',
          fields: [
            { id: 'pprStatus', placeholder: 'PPR (Prior Permission Required) yes/no + obtained?', type: 'text' },
            { id: 'pprContact', placeholder: 'Contact / phone', type: 'text' }
          ]
        },
        {
          id: 'ppr-hours',
          label: 'Opening hours / noise / circuits / joining',
          help: 'Hours, noise abatement, circuit direction/height, joining instructions from AIP / Pooleys / airfield brief.',
          fields: [{ id: 'joinNotes', placeholder: 'Hours / join / noise', type: 'text' }]
        },
        {
          id: 'ppr-rwy',
          label: 'Runway length & surface — suitable for C42 T/O & landing',
          help: 'TODA (Take-Off Distance Available) / LDA (Landing Distance Available) or published length. Tick only after checking against POH / school figures.',
          fields: [
            { id: 'rwyLength', placeholder: 'TODA (Take-Off Distance Available) / LDA (Landing Distance Available) / published length', type: 'text' },
            { id: 'rwySurface', placeholder: 'Surface (grass / asphalt…)', type: 'text' },
            { id: 'rwyPohCheck', placeholder: 'Checked vs POH / school figures?', type: 'text' }
          ]
        },
        {
          id: 'ppr-obs',
          label: 'Obstacles, slope, wet grass / soft field',
          help: 'Approach obstacles, runway slope, soft or wet grass — plan short-field / soft-field technique if needed.',
          fields: [{ id: 'fieldNotes', placeholder: 'Obstacles / soft field notes', type: 'text' }]
        },
        {
          id: 'ppr-park',
          label: 'Parking, fuel, fees, customs (if relevant)',
          help: 'Where to park, Avgas / UL91 / Mogas availability, landing fees, customs for Channel Islands / abroad.',
          fields: [{ id: 'parkFuelFees', placeholder: 'Parking / fuel / fees', type: 'text' }]
        }
      ]
    },
    {
      id: 'radio',
      title: '5. Radio — frequencies & callsigns',
      speakIntro: 'Radio. Write departure, en route, and destination frequencies. Use the correct callsign for A stroke G, A F I S, or A T C. Note one two one decimal five for emergency.',
      items: [
        {
          id: 'rad-dep',
          label: 'Departure frequency + callsign / station',
          help: 'Home airfield A/G, AFIS, or ATC. Phrase: “[Station] Radio / Information / Tower”.',
          fields: [
            { id: 'depFreq', placeholder: 'Dep freq', type: 'text', suggestable: true },
            { id: 'depCallsign', placeholder: 'Station name / type', type: 'text' }
          ]
        },
        {
          id: 'rad-enroute',
          label: 'En-route (LARS (Lower Airspace Radar Service) / Info / Safetycom)',
          help: 'Farnborough LARS, London Info, Safetycom, or other as applicable. Confirm current freqs in AIP.',
          fields: [
            { id: 'enrouteFreq', placeholder: 'En-route freq(s)', type: 'text', suggestable: true },
            { id: 'enrouteService', placeholder: 'Service (LARS / Info…)', type: 'text' }
          ]
        },
        {
          id: 'rad-dest',
          label: 'Destination A/G (Air/Ground), AFIS (Aerodrome Flight Information Service) or ATC (Air Traffic Control) + phraseology',
          help: 'Correct station name. A/G = “Radio”; AFIS = “Information”; ATC = “Tower” / “Approach”. Confirm before flight.',
          fields: [
            { id: 'destFreq', placeholder: 'Dest freq', type: 'text', suggestable: true },
            { id: 'destCallsign', placeholder: 'Callsign phrase (… Radio / Info / Tower)', type: 'text' }
          ]
        },
        {
          id: 'rad-atis',
          label: 'ATIS (Automatic Terminal Information Service) / VOLMET (if any)',
          help: 'Record ATIS frequency and information letter if the airfield has one.',
          fields: [{ id: 'atis', placeholder: 'ATIS / VOLMET', type: 'text' }]
        },
        {
          id: 'rad-1215',
          label: '121.500 noted for emergency',
          help: 'Distress & Diversion — 121.500. Know when and how to use it (training with instructor).',
          fields: [{ id: 'emergFreq', placeholder: 'Emergency freq', type: 'text', default: '121.500', suggestable: true }]
        },
        {
          id: 'rad-xpdr',
          label: 'Transponder / listening squawk (if published)',
          help: 'Listening squawks for the area (confirm current AIP / chart notes). Mode ALT when flying.',
          fields: [{ id: 'squawk', placeholder: 'Squawk / listening code', type: 'text' }]
        }
      ]
    },
    {
      id: 'fuel',
      title: '6. Fuel & endurance',
      speakIntro: 'Fuel and endurance. Calculate trip fuel, contingency and reserves. Confirm fuel at destination or plan an alternate fuel stop. Check with instructor and P O H.',
      items: [
        {
          id: 'fuel-calc',
          label: 'Trip fuel calculated (time × burn + climb)',
          help: 'Route time × burn rate, plus climb allowance. Use CRP-1 or school figures.',
          fields: [
            { id: 'tripTime', placeholder: 'Route time (min)', type: 'text' },
            { id: 'tripFuelL', placeholder: 'Trip fuel (L)', type: 'text' }
          ]
        },
        {
          id: 'fuel-res',
          label: 'Contingency / reserves (diversion + reserve)',
          help: 'UK training practice: enough for diversion plus reserve. Confirm policy with instructor / POH — do not invent numbers.',
          fields: [
            { id: 'plannedFuelL', placeholder: 'Planned total fuel (L)', type: 'text' },
            { id: 'endurance', placeholder: 'Endurance (hh:mm)', type: 'text' }
          ]
        },
        {
          id: 'fuel-dest',
          label: 'Fuel at destination? Alternate fuel plan',
          help: 'Is fuel available at destination? If not, plan uplift before departure or a fuel alternate.',
          fields: [{ id: 'fuelPlan', placeholder: 'Dest fuel / alternate plan', type: 'text' }]
        }
      ]
    },
    {
      id: 'alt',
      title: '7. Alternates & emergencies',
      speakIntro: 'Alternates and emergencies. Name at least one alternate. Know diversion triggers and forced landing considerations along the route.',
      items: [
        {
          id: 'alt-named',
          label: 'Alternate airfield named + why suitable',
          help: 'At least one alternate — length, open, weather, and within reach on remaining fuel.',
          fields: [
            { id: 'altName', placeholder: 'Alternate ICAO / name', type: 'text' },
            { id: 'altWhy', placeholder: 'Why suitable', type: 'text' }
          ]
        },
        {
          id: 'alt-triggers',
          label: 'Diversion triggers',
          help: 'What will make you divert? Weather below minima, fuel, radio failure, feeling unwell, etc.',
          fields: [{ id: 'divTriggers', placeholder: 'Diversion triggers', type: 'text' }]
        },
        {
          id: 'alt-forced',
          label: 'Forced-landing considerations along route',
          help: 'High ground, water, built-up areas — note better and worse options for a forced landing.',
          fields: [{ id: 'forcedNotes', placeholder: 'Terrain / forced landing notes', type: 'text' }]
        },
        {
          id: 'alt-survival',
          label: 'Survival / phone / PLB (if carried)',
          help: 'Phone charged, PLB / ELT if you carry one, warm layers, water — as briefed by your school.',
          fields: [{ id: 'survival', placeholder: 'Kit carried', type: 'text' }]
        }
      ]
    },
    {
      id: 'docs',
      title: '8. Docs & weight',
      speakIntro: 'Documents and weight. Licence, medical, aircraft papers, charts. Mass and balance. Book out if required.',
      items: [
        {
          id: 'docs-kit',
          label: 'Licence, medical, aircraft docs, charts / plates',
          help: 'Pilot licence, medical, aircraft documents, charts, Pooleys / AIP extract, plates.',
          fields: [{ id: 'docsNotes', placeholder: 'Docs checklist notes', type: 'text' }]
        },
        {
          id: 'docs-mb',
          label: 'Mass & balance / passenger brief',
          help: 'Within C42 limits. Brief passenger on harness, canopy, sterile cockpit, emergencies.',
          fields: [{ id: 'mbNotes', placeholder: 'M&B / pax brief notes', type: 'text' }]
        },
        {
          id: 'docs-book',
          label: 'Book out / flight notification if required',
          help: 'Book out with club / ATSU. Flight notification or SAR arrangements if your school requires them.',
          fields: [{ id: 'bookOut', placeholder: 'Book-out / notification', type: 'text' }]
        }
      ]
    },
    {
      id: 'final',
      title: '9. Final brief',
      speakIntro: 'Final brief. E F A T O and reject plan. Arrival join and circuit. Ask yourself: am I fit to fly?',
      items: [
        {
          id: 'final-efato',
          label: 'EFATO / reject plan at departure',
          help: 'Rejected take-off and engine failure after take-off plan from this runway — brief before lining up.',
          fields: [{ id: 'efatoPlan', placeholder: 'Reject / EFATO plan', type: 'text' }]
        },
        {
          id: 'final-arrive',
          label: 'Arrival join / circuit height / runway assumed',
          help: 'Standard overhead join or as published. Circuit height and likely runway in use.',
          fields: [{ id: 'arrivalPlan', placeholder: 'Join / circuit / runway', type: 'text' }]
        },
        {
          id: 'final-imsafe',
          label: '“Am I fit to fly?” IMSAFE (Illness, Medication, Stress, Alcohol, Fatigue, Eating)',
          help: 'Illness, Medication, Stress, Alcohol, Fatigue, Eating / Emotion — honest tick.',
          fields: [{ id: 'imsafe', placeholder: 'IMSAFE notes (optional)', type: 'text' }]
        }
      ]
    }
  ]
};
