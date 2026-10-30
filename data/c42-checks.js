/* C42 Pre-Flight Checks — microlight training checklist (app's own layout).
   Item order and section order follow a typical C42 school checklist exactly — do not reorder.
   Study aid; always follow the aircraft POH and your school's checklist. */
const C42_CHECKS = {
  attribution: 'Based on a typical C42 checklist. Always follow your aircraft\u2019s POH and your school\u2019s checklist.',
  disclaimer: 'Not a substitute for instructor dual, the POH or current UK regulations.',
  modes: [
    {
      id: 'external',
      title: 'External Checks',
      sub: 'Walk-round',
      phase: 'outside',
      numbered: true,
      speakIntro: 'C 42 external checks. Walk round the aircraft.',
      items: [
        { id: 'ext-elec', label: 'Electrical System', detail: 'Master switch on; check strobe and landing lights are operational. Check all other electrical systems operate correctly.', hotspot: 'nose' },
        { id: 'ext-prop', label: 'Propeller', detail: 'Check blades for damage, especially the leading edge for nicks. Check spinner is secure.', hotspot: 'prop' },
        { id: 'ext-oil', label: 'Oil Level', detail: 'Check level; top up if low.', hotspot: 'engine' },
        { id: 'ext-nose', label: 'Nosewheel', detail: 'Check nose leg and wheel spat security. Check tyre for wear and creep.', hotspot: 'nosewheel' },
        { id: 'ext-doors', label: 'Doors & Undercarriage', detail: 'Check door latches, main gear legs, spats and tyres.', hotspot: 'gear' },
        { id: 'ext-wings', label: 'Wings', detail: 'Check leading edges and tips for damage. Check pitot tube is clear.', hotspot: 'wing' },
        { id: 'ext-ail', label: 'Aileron & Flap', detail: 'Check ailerons move fully and freely. Check fasteners. Check flaps deploy correctly. Check for excessive play. Check fasteners.', hotspot: 'aileron' },
        { id: 'ext-bag', label: 'Baggage Compartment', detail: 'Check fuel quantity. Check for fuel leaks. No unsecured objects. Replace and secure compartment cover.', hotspot: 'baggage' },
        { id: 'ext-fuse', label: 'Fuselage', detail: 'Check drains for leaks. Check general condition and underside for damage.', hotspot: 'fuse' },
        { id: 'ext-hs', label: 'Horizontal Stabiliser', detail: 'Check for damage, especially the underside. Check elevator for full movement; check fasteners.', hotspot: 'tail' },
        { id: 'ext-elev', label: 'Elevator', detail: 'Check for damage and full movement. Check fasteners. Check trim tab. Check rudder fasteners.', hotspot: 'elevator' },
        { id: 'ext-fuel', label: 'Fuel', detail: 'Drain sample from tank and check for water and/or debris.', hotspot: 'fuel' }
      ]
    },
    {
      id: 'internal',
      title: 'Internal Checks',
      sub: 'Cockpit',
      phase: 'inside',
      speakIntro: 'C 42 internal checks.',
      items: [
        { id: 'int-sw', label: 'All Switches', detail: 'Off.', hotspot: 'switches' },
        { id: 'int-pb', label: 'Parking Brake', detail: 'On.', hotspot: 'brake' },
        { id: 'int-inst', label: 'Instruments', detail: 'Reading normally, glass intact.', hotspot: 'instruments' },
        { id: 'int-har', label: 'Harness', detail: 'In good condition and secure; test release.', hotspot: 'harness' },
        { id: 'int-fc', label: 'Flight Controls', detail: 'Full and free movement; cable runs free.', hotspot: 'stick' },
        { id: 'int-fuel', label: 'Fuel', detail: 'Check tank contents.', hotspot: 'fuelgauge' },
        { id: 'int-loose', label: 'Loose Objects', detail: 'Check under seats and remove or secure.', hotspot: 'seats' }
      ]
    },
    {
      id: 'start',
      title: 'Engine Start Up',
      sub: 'Start',
      phase: 'inside',
      speakIntro: 'Engine start up.',
      items: [
        { id: 'st-pb', label: 'Parking Brake', detail: 'Set.', hotspot: 'brake' },
        { id: 'st-thr', label: 'Throttle', detail: 'Closed.', hotspot: 'throttle' },
        { id: 'st-mst', label: 'Master Switch', detail: 'On.', hotspot: 'master' },
        { id: 'st-mag', label: 'Mags', detail: 'On.', hotspot: 'mags' },
        { id: 'st-pump', label: 'Fuel Pump', detail: 'On for 5 seconds, then off.', hotspot: 'fuelpump' },
        { id: 'st-clear', label: 'All Clear', detail: 'Check all around aircraft clear.', hotspot: 'lookout' },
        { id: 'st-call', label: 'Call \u201cClear Prop\u201d', detail: 'Ensure the call is heard!', speak: 'Call clear prop. Ensure the call is heard.', hotspot: 'prop' },
        { id: 'st-choke', label: 'Choke', detail: 'As required.', hotspot: 'choke' },
        { id: 'st-start', label: 'Start Engine', detail: '', hotspot: 'start' },
        { id: 'st-after', label: 'After Start', detail: 'Oil pressure in the green arc. Alternator light off.', hotspot: 'oil' },
        { id: 'st-comms', label: 'Comms', detail: 'Radio on and transponder on standby.', hotspot: 'radio' }
      ]
    },
    {
      id: 'depart',
      title: 'Pre-Departure',
      mnemonic: 'CHIFFTAPWE',
      phase: 'inside',
      speakIntro: 'Pre-departure checks. C H I F F T A P W E.',
      items: [
        { id: 'dep-c', letter: 'C', label: 'Controls', detail: 'Full and free in the correct sense.', hotspot: 'stick' },
        { id: 'dep-h', letter: 'H', label: 'Hatches', detail: 'Doors latched. Harnesses secure. Headset volume.', hotspot: 'hatches' },
        { id: 'dep-i', letter: 'I', label: 'Instruments', detail: 'Left to right, all normal. Ts & Ps in the green arc. Set altimeter to QNH/QFE. Set transponder to ALT. Strobes and landing light ON. Cowl flap open (if applicable).', hotspot: 'instruments' },
        { id: 'dep-f1', letter: 'F', label: 'Fuel', detail: 'Sufficient for flight plus reserves. Fuel tap ON. Fuel pump ON.', hotspot: 'fuelgauge' },
        { id: 'dep-f2', letter: 'F', label: 'Flaps', detail: 'Set for take-off.', hotspot: 'flaps' },
        { id: 'dep-t', letter: 'T', label: 'Trim', detail: 'Motor moves in both directions. Set for take-off.', hotspot: 'trim' },
        { id: 'dep-a', letter: 'A', label: 'All Clear', detail: 'Check around aircraft.', hotspot: 'lookout' },
        { id: 'dep-p', letter: 'P', label: 'Power Check', detail: 'Set 3500 rpm.', speak: 'Power check. Set three thousand five hundred R P M.', hotspot: 'throttle' },
        { id: 'dep-w', letter: 'W', label: 'Wind', detail: 'Check strength and direction.', hotspot: 'lookout' },
        { id: 'dep-e', letter: 'E', label: 'Eventualities', detail: 'Plan for rejected take-off and EFATO.', speak: 'Eventualities. Plan for rejected take-off and engine failure after take-off.', hotspot: 'lookout' }
      ]
    },
    {
      id: 'freda',
      title: 'En-Route',
      mnemonic: 'FREDA',
      phase: 'inside',
      speakIntro: 'En route F R E D A.',
      items: [
        { id: 'fr-f', letter: 'F', label: 'Fuel', detail: 'Check fuel remaining and endurance.', hotspot: 'fuelgauge' },
        { id: 'fr-r', letter: 'R', label: 'Radio', detail: 'Correct frequency; transponder set to ALT.', hotspot: 'radio' },
        { id: 'fr-e', letter: 'E', label: 'Engine', detail: 'Ts & Ps reading normally.', hotspot: 'oil' },
        { id: 'fr-d', letter: 'D', label: 'Direction', detail: 'Confirm position; DI/compass correct.', hotspot: 'instruments' },
        { id: 'fr-a', letter: 'A', label: 'Altimeter', detail: 'Set correctly.', hotspot: 'altimeter' }
      ]
    },
    {
      id: 'landing',
      title: 'Pre-Landing',
      mnemonic: 'FARTTHH',
      phase: 'inside',
      speakIntro: 'Pre-landing F A R T T H H.',
      items: [
        { id: 'pl-f', letter: 'F', label: 'Fuel', detail: 'Sufficient for go-around or diversion.', hotspot: 'fuelgauge' },
        { id: 'pl-a', letter: 'A', label: 'Altimeter', detail: 'Set correctly.', hotspot: 'altimeter' },
        { id: 'pl-r', letter: 'R', label: 'Radio', detail: 'Set correctly.', hotspot: 'radio' },
        { id: 'pl-t1', letter: 'T', label: 'Traffic', detail: 'Lookout; monitor radio.', hotspot: 'lookout' },
        { id: 'pl-t2', letter: 'T', label: 'Ts & Ps', detail: 'Reading normally.', speak: 'Temperatures and pressures. Reading normally.', hotspot: 'oil' },
        { id: 'pl-h1', letter: 'H', label: 'Hatches', detail: 'Doors latched.', hotspot: 'hatches' },
        { id: 'pl-h2', letter: 'H', label: 'Harnesses', detail: 'Secure.', hotspot: 'harness' }
      ]
    },
    {
      id: 'shutdown',
      title: 'Shutdown',
      sub: 'After landing',
      phase: 'inside',
      speakIntro: 'Shutdown.',
      items: [
        { id: 'sd-pb', label: 'Parking Brake', detail: 'Set.', hotspot: 'brake' },
        { id: 'sd-thr', label: 'Throttle', detail: 'Idle.', hotspot: 'throttle' },
        { id: 'sd-com', label: 'Comms', detail: 'Radio and transponder OFF.', hotspot: 'radio' },
        { id: 'sd-lt', label: 'Lights', detail: 'Strobes and landing light OFF.', hotspot: 'lights' },
        { id: 'sd-mag', label: 'Magnetos', detail: 'Check for dead cut, then OFF.', hotspot: 'mags' },
        { id: 'sd-mst', label: 'Master Switch', detail: 'OFF.', hotspot: 'master' }
      ]
    }
  ]
};
