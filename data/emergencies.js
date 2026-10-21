/* UK NPPL / microlight study — emergency & abnormal step checklists (plain English).
   POH / instructor / aircraft-specific drills ALWAYS override. */
const EMERGENCIES_DATA = [
  {
    id: 'forced',
    icon: '🛬',
    title: 'Forced landing (engine failure in cruise)',
    summary: 'Aviate → navigate → communicate. Pick a field, fly the glide, brief, land.',
    speakIntro: 'Forced landing after engine failure in cruise. Fly the aeroplane first. Then choose a field and plan the approach. Communicate if you have time. Confirm every drill with your instructor and POH.',
    steps: [
      'Fly the aeroplane — pitch for best glide (POH / type), trim, keep wings level as able.',
      'Carb heat / fuel / mixture / mag checks as taught for your type (may restore power).',
      'Choose a field: into wind if possible, large enough, clear of wires/livestock, escape options.',
      'Plan a pattern — high key / low key or instructor method; do not stretch a glide.',
      'Mayday (or Pan if still managing) with position, problem, intentions — squawk 7700 if able.',
      'Passenger brief: harness tight, brace, doors as briefed, exit plan.',
      'Secure for landing as taught (fuel off, mags, master as appropriate — POH overrides).',
      'Touchdown: under control, as slow as safe; after stop — evacuate if needed.'
    ]
  },
  {
    id: 'efato',
    icon: '⚠️',
    title: 'Engine out / EFATO (after take-off)',
    summary: 'Pitch for glide, land ahead if low. Turning back is a myth unless trained and high enough.',
    speakIntro: 'Engine failure after take-off. Lower the nose for glide speed immediately. If low, land ahead within about thirty degrees of the runway heading. Do not attempt a turn-back unless you have been trained and have sufficient height. Confirm with your instructor.',
    steps: [
      'Pitch down NOW — achieve and hold glide attitude / speed (type-specific).',
      'Land ahead if height is low — roughly within ±30° of runway track unless briefed otherwise.',
      'Do NOT turn back to the airfield unless trained and height/performance allow (high risk of stall/spin).',
      'Fuel / mag / carb checks only if time and height allow without losing the glide.',
      'Mayday if able — brief call; aviate first.',
      'Touchdown under control into the best available open area ahead.'
    ]
  },
  {
    id: 'co',
    icon: '😷',
    title: 'Carbon monoxide in cabin',
    summary: 'Suspected CO: fresh air, heat off, land ASAP. Do not tough it out.',
    speakIntro: 'Suspected carbon monoxide. Open fresh air, shut cabin heat from the exhaust path, and land as soon as practical. Headache, drowsiness or detector alert are warnings — confirm procedures with your instructor.',
    steps: [
      'Fresh air — open vents / windows as fitted; maximise outside air.',
      'Cabin heat OFF (especially exhaust muff heaters).',
      'Suspect CO: headache, nausea, drowsiness, cherry-red detectors if fitted — take seriously.',
      'Land as soon as practical — declare if needed.',
      'After landing: do not fly again until heater / exhaust inspected.'
    ]
  },
  {
    id: 'fire-eng',
    icon: '🔥',
    title: 'Engine fire',
    summary: 'Fuel off, mixture/idle as taught, land ASAP. Cabin fire is different — see electrical fire.',
    speakIntro: 'Engine fire. Follow your POH. Typically mixture and fuel off, cabin heat off, and land immediately. Do not restart. Confirm the exact drill for your aircraft with your instructor.',
    steps: [
      'Fly the aeroplane — maintain control and a safe speed.',
      'Fuel OFF / mixture idle-cut-off as POH for your type.',
      'Cabin heat and vents — follow POH (often heat off; may keep some air).',
      'Land immediately — field or airfield, do not delay.',
      'Evacuate after stop — upwind if smoke/fire present.'
    ]
  },
  {
    id: 'fire-elec',
    icon: '⚡',
    title: 'Electrical fire / cabin fire',
    summary: 'Master off if safe, extinguisher if fitted, land ASAP. Smoke — fresh air / side window as taught.',
    speakIntro: 'Electrical or cabin fire. Master switch off if it is safe to do so, use extinguisher if available, ventilate as briefed, and land as soon as possible. Confirm with POH and instructor.',
    steps: [
      'Master / alternator OFF if electrical smell or smoke and it is safe.',
      'Cabin extinguisher if fitted — aim at base of fire; know where it is before flight.',
      'Vents: follow POH — sometimes closed initially for extinguisher, then ventilate.',
      'Land ASAP — declare emergency.',
      'Evacuate; do not reopen electrics until inspected.'
    ]
  },
  {
    id: 'elec',
    icon: '🔋',
    title: 'Electrical failure',
    summary: 'Conserve battery, use standby instruments, plan a landing with lost radios / flaps as briefed.',
    speakIntro: 'Electrical failure. Reduce load, use standby instruments if fitted, and plan for landing without electric flaps or radios. Squawk and light signals as taught. Confirm with instructor.',
    steps: [
      'Aviate — fly attitude and speed; use standby ASI/altimeter/compass as needed.',
      'Load shed — non-essential electrics OFF to preserve battery if partial power remains.',
      'Radios: try alternate radio / handheld if carried; otherwise lost-comms procedure.',
      'Plan approach to a suitable airfield — expect manual flap / no lights as briefed for type.',
      'Squawk 7600 if transponder still works; look for light signals at controlled fields.'
    ]
  },
  {
    id: 'fuel',
    icon: '⛽',
    title: 'Fuel starvation / no fuel',
    summary: 'Change tank / pump / mixture as taught; if empty — forced landing. Prevention: fuel plan.',
    speakIntro: 'Fuel starvation. Switch tanks, check fuel pump and mixture as taught for your type. If no fuel remains, fly a forced landing. Prevention with a proper fuel plan is part of every flight. Confirm with instructor and POH.',
    steps: [
      'Fuel selector — correct tank / both as applicable; change tanks.',
      'Fuel pump ON if fitted; mixture rich / as taught.',
      'Carb heat as appropriate for type.',
      'If power restores — land and investigate; do not press on casually.',
      'If no fuel — forced landing drill; Mayday.'
    ]
  },
  {
    id: 'radio',
    icon: '📡',
    title: 'Radio failure (lost comms)',
    summary: 'Squawk 7600, continue as clearable, watch for lights, join as published / briefed.',
    speakIntro: 'Radio failure. Squawk seven six zero zero if able. Join and land following local lost-comms and light-signal procedures. Confirm CAP four one three and airfield procedures with your instructor.',
    steps: [
      'Check volume, frequency, headset plugs, radio select — simple faults first.',
      'Squawk 7600 (radio failure) if transponder available.',
      'Transmit blind on the frequency if useful — someone may hear you.',
      'Join as published / previously cleared; watch for light signals from the ground.',
      'Land when safe; phone ATS / instructor after shutdown.'
    ]
  },
  {
    id: 'lost',
    icon: '🧭',
    title: 'Actions when lost',
    summary: 'Admit it early. Map, orbit, climb if safe, ask for help, divert. SSR 7700/7600 concepts.',
    speakIntro: 'If you are lost, admit it early. Hold a safe orbit, climb if weather and airspace allow, use the map and features, and ask for help on the radio. Squawk seven seven zero zero if in emergency, or seven six zero zero for radio failure. Divert to a known airfield. Confirm with your instructor.',
    steps: [
      'Fly the aeroplane — maintain attitude, heading, and a safe altitude.',
      'Admit you are unsure — early is safer than late.',
      'Orbit / hold over a clear landmark; note time and heading.',
      'Climb if safe (terrain, cloud, airspace) for better radio / view / GPS if fitted.',
      'Map: feature crawl — railway, river, mast, town shapes; do not guess wildly.',
      'Ask for help — ATC / D&D 121.5, or local ATS; squawk 7700 if emergency, 7600 if no radio.',
      'Divert to a known airfield or follow vectors / instructions once identified.'
    ]
  }
];
