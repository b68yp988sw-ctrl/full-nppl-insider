/* C42 Pre-Flight Checks — microlight training checklist.
   Study aid; confirm with instructor & POH. No invented performance numbers. */
const C42_CHECKS = {
  attribution: 'C42 study checklist. Study aid; confirm with instructor & POH.',
  disclaimer: 'Not a substitute for instructor dual / POH / current UK regs. Match your school’s current sheet and aircraft.',
  sheets: [
    { src: 'assets/c42-checks/sheet-2-preview.jpg', label: 'External & Internal (reference photo)' },
    { src: 'assets/c42-checks/sheet-1-preview.jpg', label: 'Start / CHIFFTAPWE / FREDA / Landing / Shutdown (reference photo)' }
  ],
  modes: [
    {
      id: 'external',
      title: 'External Checks',
      phase: 'outside',
      speakIntro: 'C 42 external checks. Walk round the aircraft. Confirm each item with your instructor and P O H.',
      items: [
        { id: 'ext-elec', label: 'Electrical System', detail: 'Master switch on — check strobe & landing lights are operational. Check all other electrical systems operate correctly.', hotspot: 'nose' },
        { id: 'ext-prop', label: 'Propeller', detail: 'Check blades for damage, especially leading edge for nicks. Check spinner is secure.', hotspot: 'prop' },
        { id: 'ext-oil', label: 'Oil Level', detail: 'Check level, top up if low.', hotspot: 'engine' },
        { id: 'ext-nose', label: 'Nosewheel', detail: 'Check nose leg & wheel spat security. Check tyre for wear and creep.', hotspot: 'nosewheel' },
        { id: 'ext-doors', label: 'Doors & Undercarriage', detail: 'Check door latches, main gear legs, spats & tyres.', hotspot: 'gear' },
        { id: 'ext-wings', label: 'Wings', detail: 'Check leading edges and tips for damage. Check pitot tube is clear.', hotspot: 'wing' },
        { id: 'ext-ail', label: 'Aileron & Flap', detail: 'Check ailerons move fully & freely. Check fasteners. Check flaps deploy correctly. Check for excessive play. Check fasteners.', hotspot: 'aileron' },
        { id: 'ext-bag', label: 'Baggage Compartment', detail: 'Check fuel quantity. Check for fuel leaks. No unsecured objects. Replace & secure compartment cover.', hotspot: 'baggage' },
        { id: 'ext-fuse', label: 'Fuselage', detail: 'Check drains for leaks. Check general condition & underside for damage.', hotspot: 'fuse' },
        { id: 'ext-hs', label: 'Horizontal Stabiliser', detail: 'Check for damage, especially underside. Check elevator for full movement, check fasteners.', hotspot: 'tail' },
        { id: 'ext-elev', label: 'Elevator', detail: 'Check for damage and full movement. Check fasteners. Check trim tab. Check rudder fasteners.', hotspot: 'elevator' },
        { id: 'ext-fuel', label: 'Fuel', detail: 'Drain sample from tank & check for water and/or debris.', hotspot: 'fuel' }
      ]
    },
    {
      id: 'internal',
      title: 'Internal Checks',
      phase: 'inside',
      speakIntro: 'C 42 internal checks. Cockpit secure before start.',
      items: [
        { id: 'int-sw', label: 'All switches', detail: 'Off.', hotspot: 'switches' },
        { id: 'int-pb', label: 'Parking Brake', detail: 'On.', hotspot: 'brake' },
        { id: 'int-inst', label: 'Instruments', detail: 'Reading normally, glass intact.', hotspot: 'instruments' },
        { id: 'int-har', label: 'Harness', detail: 'In good condition & secure, test release.', hotspot: 'harness' },
        { id: 'int-fc', label: 'Flight Controls', detail: 'Full & free movement, cable runs free.', hotspot: 'stick' },
        { id: 'int-fuel', label: 'Fuel', detail: 'Check tank contents.', hotspot: 'fuelgauge' },
        { id: 'int-loose', label: 'Loose Objects', detail: 'Check under seats & remove or secure.', hotspot: 'seats' }
      ]
    },
    {
      id: 'start',
      title: 'Engine Start Up',
      phase: 'inside',
      speakIntro: 'Engine start up. Parking brake set. Follow the sheet. Call clear prop and ensure it is heard.',
      items: [
        { id: 'st-pb', label: 'PARKING BRAKE', detail: 'Set.', hotspot: 'brake' },
        { id: 'st-thr', label: 'THROTTLE', detail: 'Closed.', hotspot: 'throttle' },
        { id: 'st-mst', label: 'MASTER SWITCH', detail: 'On.', hotspot: 'master' },
        { id: 'st-mag', label: 'MAGS', detail: 'On.', hotspot: 'mags' },
        { id: 'st-pump', label: 'FUEL PUMP', detail: 'On for 5 seconds, then Off.', hotspot: 'fuelpump' },
        { id: 'st-clear', label: 'ALL CLEAR', detail: 'Check all around aircraft clear.', hotspot: 'lookout' },
        { id: 'st-call', label: 'CALL CLEAR PROP', detail: 'Ensure call is heard!', hotspot: 'prop' },
        { id: 'st-choke', label: 'CHOKE', detail: 'As req.', hotspot: 'choke' },
        { id: 'st-start', label: 'START ENGINE', detail: 'Start.', hotspot: 'start' },
        { id: 'st-after', label: 'AFTER START', detail: 'Oil pressure in the green arc. Alternator light off.', hotspot: 'oil' },
        { id: 'st-comms', label: 'COMMS', detail: 'Radio on & transponder on standby.', hotspot: 'radio' }
      ]
    },
    {
      id: 'depart',
      title: 'Pre-Departure — CHIFFTAPWE (Controls, Hatches, Instruments, Fuel, Flaps, Trim, All clear, Power, Wind, Eventualities)',
      phase: 'inside',
      speakIntro: 'Pre-departure checks. C H I F F T A P W E. Controls, Hatches, Instruments, Fuel, Flaps, Trim, All clear, Power check — face into wind then about three thousand five hundred R P M — Wind, Eventualities.',
      items: [
        { id: 'dep-c', label: 'C — CONTROLS', detail: 'Full & free in correct sense.', hotspot: 'stick' },
        { id: 'dep-h', label: 'H — HATCHES', detail: 'Doors latched. Harnesses secure. Headset volume.', hotspot: 'hatches' },
        { id: 'dep-i', label: 'I — INSTRUMENTS', detail: 'Left to Right, all normal. Ts & Ps in the green arc. Set Altimeter to QNH (sea-level pressure) / QFE (airfield datum). Set Transponder to ALT. Strobes & landing light ON. Cowl Flap open (if applicable).', hotspot: 'instruments' },
        { id: 'dep-f1', label: 'F — FUEL', detail: 'Sufficient for flight + reserves. Fuel tap ON. Fuel pump ON.', hotspot: 'fuelgauge' },
        { id: 'dep-f2', label: 'F — FLAPS', detail: 'Set for take-off.', hotspot: 'flaps' },
        { id: 'dep-t', label: 'T — TRIM', detail: 'Motor moves in both directions. Set for take-off.', hotspot: 'trim' },
        { id: 'dep-a', label: 'A — ALL CLEAR', detail: 'Check around aircraft.', hotspot: 'lookout' },
        { id: 'dep-p', label: 'P — POWER CHECK (into wind)', detail: 'Face into wind, then set ~3500 RPM for the power / run-up check (confirm exact figure with instructor & POH). Into wind: (1) better cooling / airflow through the engine and radiator/cowling at high power on the ground; (2) more accurate, representative engine indications and carb-heat / mag checks with prop wash and wind aligned; (3) avoids blasting dirt or people behind with taxi/propwash; (4) keeps the aircraft more stable on the ground — less weathercock surprise if wind is from the side or behind. Hold the brakes; lookout before and during. Confirm local run-up area and procedures with your instructor.', speak: 'Power check. Face into wind before you set about three thousand five hundred R P M. Into wind gives better cooling through the engine and cowling at high power on the ground, more representative engine indications and carb heat or mag checks, avoids blasting dirt or people behind, and keeps the aeroplane more stable — less weathercock if the wind is from the side or behind. Hold the brakes. Confirm the figure and run-up area with your instructor and P O H.', hotspot: 'throttle' },
        { id: 'dep-w', label: 'W — WIND', detail: 'Check strength & Direction.', hotspot: 'lookout' },
        { id: 'dep-e', label: 'E — EVENTUALITIES', detail: 'Plan for rejected take off & EFATO.', hotspot: 'lookout' }
      ]
    },
    {
      id: 'freda',
      title: 'En-Route — FREDA (Fuel, Radio, Engine, Direction, Altimeter)',
      phase: 'inside',
      speakIntro: 'En route F R E D A. Fuel, Radio, Engine, Direction, Altimeter.',
      items: [
        { id: 'fr-f', label: 'F — FUEL', detail: 'Check fuel remaining & endurance.', hotspot: 'fuelgauge' },
        { id: 'fr-r', label: 'R — RADIO', detail: 'Correct frequency & Transponder set to ALT.', hotspot: 'radio' },
        { id: 'fr-e', label: 'E — ENGINE', detail: 'Ts & Ps reading normally.', hotspot: 'oil' },
        { id: 'fr-d', label: 'D — DIRECTION', detail: 'Confirm position. & DI/Compass correct.', hotspot: 'instruments' },
        { id: 'fr-a', label: 'A — ALTIMETER', detail: 'Set correctly.', hotspot: 'altimeter' }
      ]
    },
    {
      id: 'freqs',
      title: 'Useful Frequencies',
      phase: 'ref',
      speakIntro: 'Useful frequencies for study. Confirm current frequencies in the A I P or airfield plates before flight.',
      items: [
        { id: 'fq-dd', label: 'Distress & Diversion', detail: '121.500', hotspot: 'radio' },
        { id: 'fq-fw', label: 'Farnborough West', detail: '125.250', hotspot: 'radio' },
        { id: 'fq-fn', label: 'Farnborough North', detail: '132.800', hotspot: 'radio' },
        { id: 'fq-ben', label: 'Benson Zone', detail: '120.900', hotspot: 'radio' },
        { id: 'fq-lut', label: 'Luton Radar', detail: '129.550', hotspot: 'radio' },
        { id: 'fq-safe', label: 'Safetycom', detail: '135.480', hotspot: 'radio' },
        { id: 'fq-lon', label: 'London Info', detail: '124.750', hotspot: 'radio' }
      ]
    },
    {
      id: 'landing',
      title: 'Pre-Landing — FARTT HH (Fuel, Altimeter, Radio, Traffic, Ts & Ps, Hatches, Harnesses)',
      phase: 'inside',
      speakIntro: 'Pre-landing F A R T T H H. Fuel, Altimeter, Radio, Traffic, Temperatures and pressures, Hatches, Harnesses.',
      items: [
        { id: 'pl-f', label: 'F — FUEL', detail: 'Sufficient for go around or diversion.', hotspot: 'fuelgauge' },
        { id: 'pl-a', label: 'A — ALTIMETER', detail: 'Set correctly.', hotspot: 'altimeter' },
        { id: 'pl-r', label: 'R — RADIO', detail: 'Set correctly.', hotspot: 'radio' },
        { id: 'pl-t1', label: 'T — TRAFFIC', detail: 'Lookout, monitor radio.', hotspot: 'lookout' },
        { id: 'pl-t2', label: 'T — Ts & Ps', detail: 'Reading normally.', hotspot: 'oil' },
        { id: 'pl-h1', label: 'H — HATCHES', detail: 'Doors latched.', hotspot: 'hatches' },
        { id: 'pl-h2', label: 'H — HARNESSES', detail: 'Secure.', hotspot: 'harness' }
      ]
    },
    {
      id: 'shutdown',
      title: 'Shutdown',
      phase: 'inside',
      speakIntro: 'Shutdown. Parking brake set. Throttle idle. Radios and lights off. Magnetos dead cut then off. Master off.',
      items: [
        { id: 'sd-pb', label: 'PARKING BRAKE', detail: 'Set.', hotspot: 'brake' },
        { id: 'sd-thr', label: 'THROTTLE', detail: 'Idle.', hotspot: 'throttle' },
        { id: 'sd-com', label: 'COMMS', detail: 'Radio & Transponder OFF.', hotspot: 'radio' },
        { id: 'sd-lt', label: 'LIGHTS', detail: 'Strobes & Landing light OFF.', hotspot: 'lights' },
        { id: 'sd-mag', label: 'MAGNETOS', detail: 'Check for dead cut then OFF.', hotspot: 'mags' },
        { id: 'sd-mst', label: 'MASTER SWITCH', detail: 'OFF.', hotspot: 'master' }
      ]
    }
  ]
};
