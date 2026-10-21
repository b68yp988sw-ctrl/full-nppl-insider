/* Take-off & Landing study content — UK GA/microlight plain English.
   Technique varies by type and instructor. Not a substitute for dual / POH. */
const LANDING_DATA = {
  disclaimer: 'Not a substitute for instructor dual / POH / current UK regs. Technique varies by aircraft type and instructor — especially microlight vs heavier GA.',
  controls: {
    aileron: {
      title: 'Aileron (stick left / right)',
      speak: 'Aileron tilts the wings. In the flare and hold-off, use small aileron to keep wings level in nil wind. In crosswind, hold aileron into wind to keep the into-wind wing down and stop drift. Never abandon aileron on the runway in a crosswind.',
      bullets: [
        'Rolls the aircraft — stick into wind lowers that wing.',
        'Nil-wind flare: tiny inputs to keep wings level.',
        'Crosswind: aileron into wind through the flare and after touchdown (as taught).',
        'More wind → typically more into-wind aileron (within type limits).'
      ]
    },
    rudder: {
      title: 'Rudder (feet)',
      speak: 'Rudder yaws the nose. Use it to keep the longitudinal axis aligned with the runway centreline. In a crab approach you kick straight with rudder just before touchdown. Rudder also stops unwanted yaw. Feet alive — especially in crosswind and after landing.',
      bullets: [
        'Aligns the nose with the runway (prevents sideways loads on gear).',
        'Opposes yaw from asymmetric effects / gusts.',
        'Crab method: rudder “kick-straight” late in the flare (timing from instructor).',
        'After touchdown: keep straight with rudder; aileron still into wind.'
      ]
    },
    coordinated: {
      title: 'Aileron + rudder together',
      speak: 'In crosswind you need both. Aileron into wind stops drift. Rudder keeps you straight with the runway. Using only one control usually means you either drift or land sideways. Think of them as a pair.',
      bullets: [
        'Aileron → stop drift (wing down into wind).',
        'Rudder → keep longitudinal axis on the centreline.',
        'One without the other: drift OR sideways touchdown risk.',
        'Hold both through touchdown and into the roll-out as taught.'
      ]
    },
    speed: {
      title: 'Holding approach speed',
      speak: 'Approach speed discipline is critical. A common training cue is pitch for speed, power for path — confirm the exact teaching with your instructor. Too fast and you float or balloon. Too slow and you sink or stall. Trim and small corrections early.',
      bullets: [
        'Know the briefed approach speed for your type / weight / flap.',
        'Cue often taught: pitch primarily for airspeed; power primarily for glide path (confirm with instructor).',
        'Too fast → float, balloon, long landing, bounce risk.',
        'Too slow → high sink, heavy landing, stall risk — go around if unstable.'
      ]
    }
  },
  nilWind: {
    title: 'Nil-wind landing',
    speakAll: 'Nil-wind landing. Stable approach on speed and centreline. Round out to level, then hold off while speed bleeds. Wings level with small aileron. Rudder keeps you straight. Touch down in a gentle nose-high attitude as taught for your type, then keep straight on the roll-out.',
    steps: [
      { title: 'Stable approach', body: 'On centreline, correct approach speed, correct aiming point. Power and pitch as briefed. If unstable — go around.', speak: 'Stable approach. Centreline, speed, aiming point. If it is not stable, go around.' },
      { title: 'Round-out', body: 'At the taught height, ease back pressure to arrest descent — eyes to the far end of the runway.', speak: 'Round out. Ease back to level the aircraft. Look toward the far end of the runway.' },
      { title: 'Hold-off / flare', body: 'Hold the attitude; let speed reduce. Small aileron for wings level. Rudder to stay straight. Progressive back pressure as taught.', speak: 'Hold off. Keep wings level with aileron. Rudder for straight. Progressive back stick as taught while speed bleeds.' },
      { title: 'Touchdown', body: 'Main gear first in the briefed attitude. Keep flying it — aileron and rudder still active on the roll-out.', speak: 'Touchdown on the main gear in the briefed attitude. Keep flying the aeroplane on the roll-out with aileron and rudder.' }
    ]
  },
  crosswind: {
    title: 'Crosswind landing',
    speakAll: 'Crosswind landing. Two common methods are crab and wing-down, or a combination — your instructor will teach the one for your type. Throughout: aileron into wind to stop drift, rudder to stay aligned. Hold speed. Kick-straight timing if crabbing. Keep aileron into wind after landing.',
    steps: [
      { title: 'Approach with drift managed', body: 'Crab into wind so ground track stays on centreline, OR wing-down / sideslip as taught. Hold briefed speed.', speak: 'On approach, crab or wing-down as taught so you track the centreline. Hold the briefed speed.' },
      { title: 'Aileron into wind', body: 'Stick into wind — into-wind wing down enough to stop drift. Increase as you slow (as taught).', speak: 'Aileron into wind. Lower the into-wind wing enough to stop drift. Typically more aileron as you slow.' },
      { title: 'Rudder for alignment', body: 'If crabbing: before touchdown, rudder to yaw nose parallel with runway (“kick-straight”). Keep aileron into wind — do not centre the stick.', speak: 'Rudder aligns the nose with the runway. If you were crabbing, kick straight with rudder before touchdown while keeping aileron into wind.' },
      { title: 'Touchdown & roll-out', body: 'Into-wind wheel may touch first (wing-down). Hold aileron into wind; rudder to stay straight. Do not relax controls until taxi speed.', speak: 'Touchdown. Keep aileron into wind and rudder for straight. Fly the roll-out until taxi speed.' }
    ]
  },
  corrections: [
    { id: 'drift', title: 'Drifting left / right', fix: 'More into-wind aileron to stop drift; rudder to keep nose on centreline. If drift is large and late — go around.', speak: 'If drifting, add into-wind aileron and use rudder to stay aligned. If you cannot correct safely, go around.' },
    { id: 'balloon', title: 'Balloon (float up)', fix: 'Usually from too much back stick or excess speed. Pause — do not shove nose down. Small forward ease if taught; let it settle; be ready to go around.', speak: 'Balloon. Ease, do not push hard nose down. Let it settle or go around if high or fast.' },
    { id: 'sink', title: 'Sudden sink', fix: 'Often slow or idle too early. Add power if taught and height allows; or go around. Do not yank back aggressively into a stall.', speak: 'Sudden sink. Power if appropriate and go around rather than yanking the stick back into a stall.' },
    { id: 'float', title: 'Long float', fix: 'Too fast. Hold attitude; be patient or go around if runway remaining is in doubt. Do not force it on.', speak: 'Long float means too much speed. Hold the attitude or go around if the runway is running out. Do not force a touchdown.' },
    { id: 'bounce', title: 'Bounce', fix: 'Often firm arrival or high sink. Hold attitude, small power if taught, or go around — do not chase with big stick movements.', speak: 'Bounce. Maintain a landing attitude and either allow a second touch or go around. Avoid big control chases.' }
  ],
  failures: [
    { id: 'bounce', title: 'Bounce', body: 'Hold landing attitude; power as briefed or go around. Do not push nose down onto the runway.', speak: 'Bounce. Hold attitude. Power or go around as taught. Do not push the nose hard onto the runway.' },
    { id: 'balloon-fail', title: 'Balloon', body: 'Relax back pressure slightly; allow settle; go around if too high.', speak: 'Balloon. Relax slightly, allow it to settle, or go around if too high.' },
    { id: 'heavy', title: 'Heavy landing', body: 'Hold attitude, keep straight, taxi clear if able. Inspect undercarriage / prop before next flight. Report.', speak: 'Heavy landing. Keep straight, taxi clear if safe, and have the aircraft inspected before further flight.' },
    { id: 'unstable', title: 'Go-around from unstable approach', body: 'Power as briefed, pitch to climb attitude, flaps as POH, climb away. Unstable = go around is a success.', speak: 'Unstable approach. Go around. Power, climb attitude, configure as POH. A go-around is a success, not a failure.' },
    { id: 'short', title: 'Runway too short / doubt', body: 'If you doubt stopping distance — go around early. Do not hope. Decide before the flare if possible.', speak: 'If you doubt there is enough runway, go around early. Do not hope it will work.' }
  ],
  takeoffFailures: [
    { id: 'abort-gnd', title: 'Abort on the ground', body: 'Engine rough, no airspeed rise, or something feels wrong before rotate: throttle closed, keep straight with rudder, brake as taught, stop on remaining runway.', speak: 'Abort on the ground. Close the throttle, keep straight with rudder, brake as taught, and stop on the runway remaining.' },
    { id: 'efato', title: 'EFATO — engine failure after take-off', body: 'Pitch for glide immediately. Land ahead if low. Avoid the turn-back myth unless trained and high enough. See Emergencies module.', speak: 'Engine failure after take-off. Nose down for glide. Land ahead if low. Do not turn back unless trained and with sufficient height.' }
  ]
};
