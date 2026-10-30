/* Flight preparation hub — everything before you fly (UK NPPL microlight).
   Study aid only. Links into C42 Checks + Plan a trip; destination brief is local fill. */
const FLIGHT_PREP = {
  disclaimer:
    'Study aid only — not a substitute for instructor dual / POH / current UK regs. Confirm PPR, weather, NOTAMs, AIP plates, and aircraft limits before every flight.',
  aircraftStages: [
    {
      id: 'walkround',
      title: 'External walk-round',
      blurb: 'Prop, oil, gear, wings, controls, fuel drain — before you get in.',
      c42Mode: 'external',
      speak: 'External walk round. Check the aeroplane itself before you sit down.'
    },
    {
      id: 'internal',
      title: 'Internal / cockpit',
      blurb: 'Switches, brake, instruments, harness, controls free, fuel contents, loose objects.',
      c42Mode: 'internal',
      speak: 'Internal checks. Cockpit secure before start.'
    },
    {
      id: 'start',
      title: 'Engine start',
      blurb: 'Brake, throttle, master, mags, clear prop, start, oil pressure, radio standby.',
      c42Mode: 'start',
      speak: 'Engine start up. Call clear prop and ensure it is heard.'
    },
    {
      id: 'chifftapwe',
      title: 'CHIFFTAPWE (Controls, Hatches, Instruments, Fuel, Flaps, Trim, All clear, Power, Wind, Eventualities)',
      blurb: 'Pre-departure mnemonic on the C42 sheet — power check, wind, EFATO plan.',
      c42Mode: 'depart',
      speak: 'Pre-departure C H I F F T A P W E.'
    },
    {
      id: 'freda',
      title: 'FREDA (Fuel, Radio, Engine, Direction, Altimeter)',
      blurb: 'En-route checks once airborne — revisit as needed.',
      c42Mode: 'freda',
      speak: 'En route F R E D A.'
    },
    {
      id: 'fartt',
      title: 'FARTT HH (Fuel, Altimeter, Radio, Traffic, Ts & Ps, Hatches, Harnesses)',
      blurb: 'Pre-landing checks before joining / final.',
      c42Mode: 'landing',
      speak: 'Pre-landing F A R T T H H.'
    },
    {
      id: 'shutdown',
      title: 'Shutdown',
      blurb: 'After landing — brake, idle, radios, lights, mags, master.',
      c42Mode: 'shutdown',
      speak: 'Shutdown checklist.'
    }
  ],
  destFields: [
    { id: 'icao', label: 'ICAO (International Civil Aviation Organization) / name', type: 'text', placeholder: 'e.g. EGHA / Compton Abbas' },
    { id: 'ppr', label: 'PPR (Prior Permission Required) — yes/no + obtained?', type: 'text', placeholder: 'Yes/No · obtained · who' },
    { id: 'pprPhone', label: 'PPR (Prior Permission Required) phone / contact', type: 'text', placeholder: 'Phone / ops contact' },
    { id: 'hoursOpen', label: 'Hours open', type: 'text', placeholder: 'Open from…' },
    { id: 'hoursClose', label: 'Hours close / last landing', type: 'text', placeholder: 'Close / PPR cut-off' },
    { id: 'callsign', label: 'Callsign / station type', type: 'text', placeholder: '… Radio / Information / Tower' },
    { id: 'freqTower', label: 'Tower / ATC (Air Traffic Control) frequency', type: 'text', placeholder: 'MHz if ATC' },
    { id: 'freqAfis', label: 'AFIS (Aerodrome Flight Information Service) frequency', type: 'text', placeholder: 'MHz if AFIS' },
    { id: 'freqAg', label: 'A/G (Air/Ground) frequency', type: 'text', placeholder: 'MHz if A/G' },
    { id: 'freqSafetycom', label: 'Safetycom (135.480) / unattended', type: 'text', placeholder: '135.480 or N/A' },
    { id: 'runway', label: 'Runway(s) / surface / length vs C42', type: 'text', placeholder: 'e.g. 08/26 grass · TODA/LDA · OK for C42?' },
    { id: 'elevation', label: 'Elevation (ft AMSL — Above Mean Sea Level)', type: 'text', placeholder: 'Airfield elevation' },
    { id: 'circuit', label: 'Circuit direction / height', type: 'text', placeholder: 'LH/RH · height AAL' },
    { id: 'noise', label: 'Noise / local procedures', type: 'text', placeholder: 'Noise abatement · join · avoidances' },
    { id: 'fuel', label: 'Fuel available (AVGAS / MOGAS / UL91…)', type: 'text', placeholder: 'Grade · hours · payment' },
    { id: 'weather', label: 'Weather source checked (METAR / TAF / local)', type: 'text', placeholder: 'Source + summary' },
    { id: 'notams', label: 'NOTAMs (Notice to Air Missions) checked', type: 'text', placeholder: 'Key NOTAMs / none affecting' },
    { id: 'alternate', label: 'Alternate aerodrome', type: 'text', placeholder: 'ICAO / name · why suitable' },
    { id: 'docs', label: 'Docs — licence, medical, insurance, aircraft docs', type: 'text', placeholder: 'NPPL · medical/PMD · insurance · C of A/Permit · tech log' }
  ],
  destTicks: [
    { id: 'tick-icao', label: 'ICAO / name noted' },
    { id: 'tick-ppr', label: 'PPR (Prior Permission Required) sorted (or N/A)' },
    { id: 'tick-hours', label: 'Opening / closing times checked' },
    { id: 'tick-radio', label: 'Callsign + frequencies written (Tower / AFIS / A/G / Safetycom)' },
    { id: 'tick-rwy', label: 'Runway surface & length OK vs C42 / POH' },
    { id: 'tick-elev', label: 'Elevation & QNH (altimeter sea-level setting) briefing noted' },
    { id: 'tick-circuit', label: 'Circuit direction / noise / local procedures briefed' },
    { id: 'tick-fuel', label: 'Fuel plan / availability confirmed' },
    { id: 'tick-wx', label: 'Weather checked — go / no-go' },
    { id: 'tick-notam', label: 'NOTAMs checked' },
    { id: 'tick-alt', label: 'Alternate aerodrome named' },
    { id: 'tick-docs', label: 'Licence, medical, insurance, aircraft docs aboard' }
  ]
};
