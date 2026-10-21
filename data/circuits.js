/* UK NPPL microlight — Circuits study modules (CAP 413 / CAA-style).
   Study aid only. Confirm with instructor / AIP / local procedures. Not US pattern language. */
const CIRCUITS_DATA = {
  disclaimer:
    'Study aid for NPPL microlight. Not a substitute for instructor dual / POH / current UK regs. Confirm with your instructor, AIP, and local procedures. CAP 413 phraseology varies by ATC / AFIS / A/G.',

  overviewSpeak:
    'Standard UK left-hand circuit. Take-off, crosswind, downwind at about one thousand feet above aerodrome level unless briefed otherwise, base, then final. If unstable, go around. Right-hand circuits apply when published. Confirm local procedures with your instructor.',

  sections: [
    {
      id: 'joining',
      title: 'Joining the circuit',
      icon: '⤵',
      summary: 'UK joins: Standard Overhead Join, dead-side, crosswind, published downwind. Look first — then fit in.',
      speakAll:
        'Joining the circuit. Study the airfield first from a safe height if using a Standard Overhead Join. Look for the wind tee, signal square, runway in use, circuit direction, and other traffic. Descend on the dead-side as published, cross midfield to join downwind, and fit in with spacing. Use published joins if different. Listen out and make the radio calls required for ATC, AFIS, or A/G. See and avoid. Confirm with your instructor and the AIP.',
      actionsLabel: 'For you as the pilot — joining',
      actions: [
        'Before you arrive: brief the airfield — runway, circuit direction (LH or RH), join procedure, height, radio type (ATC / AFIS / A/G / Safetycom), noise abatement, ATZ.',
        'Listen out early on the published frequency. Build a mental picture of who is where before you transmit.',
        'Standard Overhead Join (where taught / published): typically arrive overhead roughly circuit height + 1000 ft (often ~2000 ft AAL — confirm plate / brief). Orbit or observe as taught to identify runway in use and traffic.',
        'Descend on the dead-side (the side opposite the live circuit) as published; keep a good lookout for traffic climbing or joining.',
        'Cross the upwind end / midfield as briefed to join the live circuit — usually into the crosswind or downwind leg. Do not cut inside others.',
        'Dead-side / crosswind joins: only as published or instructed. Fit in with spacing; extend if needed rather than squeeze.',
        'Downwind join: only if published or positively arranged (e.g. ATC / AFIS instruction). Never assume a downwind join is OK at every UK strip.',
        'Once established: fly standard legs, make position calls as required, lookout constantly, land only when the runway is clear and you are stable — or go around.'
      ],
      notes: [
        { title: 'Standard Overhead Join (concept)', body: 'Common UK training join: overhead observation → dead-side descent → cross to live side → downwind. Exact heights and track are airfield-specific — AIP / local briefing wins.' },
        { title: 'Published joins override habit', body: 'Some airfields ban overhead joins, require RH circuits, or publish a specific join. Chart supplement / AIP / PPR brief first.' },
        { title: 'Radio', body: 'CAP 413-style: listen first. Typical position calls when joining / downwind / final — content depends on ATC vs AFIS vs A/G. If no reply on A/G, still announce intentions and lookout.' }
      ]
    },
    {
      id: 'lookout',
      title: 'Lookout & what to watch',
      icon: '👁',
      summary: 'Wind tee, signal square, traffic, runway in use, LH/RH — before you commit to the circuit.',
      speakAll:
        'Lookout and what to watch when joining. Check the wind tee or windsock for runway in use. Check the signal square if used. Identify circuit direction — left-hand or right-hand. Scan for other traffic in the circuit, on the ground, and joining. Confirm the runway is clear before landing. Keep a continuous lookout — radio does not replace see and avoid.',
      actionsLabel: 'For you as the pilot — scan checklist',
      actions: [
        'Wind tee / windsock — which runway is into wind? Does it match what you briefed and what others are using?',
        'Signal square (if provided) — runway in use, circuit direction, and any special signals. Know what the shapes mean from your training.',
        'Circuit direction — LH is common; RH when published (noise, terrain, airspace). Do not assume left-hand.',
        'Other traffic — circuit legs, final, climb-out, taxiway, holding point, helicopters, gliders, winch cables if relevant.',
        'Runway occupancy — anyone on the runway, backtracking, vacating slowly, vehicles, wildlife.',
        'Dead-side vs live side — know which side is “live” so your join and lookout are oriented correctly.',
        'Radio picture — calls you hear may not match what you see; believe your eyes if there is conflict, and go around / orbit if unsure.',
        'Your own spacing — do not cut inside; extend downwind rather than rush final behind someone still vacating.'
      ],
      notes: [
        { title: 'See and avoid', body: 'In Class G and at many microlight strips, lookout is primary. Radio helps; it does not guarantee everyone heard you or that everyone is on frequency.' },
        { title: 'Unstable or unsure', body: 'If the picture is messy — go around or orbit clear of the circuit as briefed. Sorting it on short final is late.' }
      ]
    },
    {
      id: 'closure',
      title: 'Runway closed / accident',
      icon: '🚫',
      summary: 'Accident or obstruction on the runway — hold off, orbit, divert; do not land until safe / cleared.',
      speakAll:
        'Runway closed or accident on the runway. Do not land. Hold off, orbit clear of the approach and circuit as briefed, or divert. Listen carefully to ATC, AFIS, or A/G. Inform them of your intentions. Land only when the runway is confirmed clear and safe, or when instructed. Fuel and weather permitting, divert early rather than orbit forever. Confirm local procedures with your instructor.',
      actionsLabel: 'For you as the pilot — runway obstructed',
      actions: [
        'Do NOT land on an obstructed or closed runway. An accident, disabled aircraft, vehicle, or animals means the runway is not available until safe / cleared.',
        'Aviate first — maintain a safe height and speed; stay clear of other traffic.',
        'Hold off / orbit — fly a clear orbit away from the approach path and climb-out as briefed (often outside the ATZ or as instructed). Keep lookout.',
        'Listen — ATC / AFIS / A/G will often state runway closed, go around, or hold. Acknowledge as appropriate to the service.',
        'Transmit your intentions — e.g. orbiting / holding / diverting — so others know what you are doing (phraseology per CAP 413 for the service in use).',
        'Do not land until cleared (ATC) or positively confirmed safe/available (AFIS/A/G/unattended as applicable). “Cleared” language applies at ATC; at AFIS/A/G you still need a safe, available runway.',
        'Divert early if the closure may last, fuel is limited, weather is closing in, or the orbit becomes crowded — choose your alternate and go.',
        'After landing elsewhere: report as required; do not re-enter a closed runway environment out of curiosity.'
      ],
      notes: [
        { title: 'ATC vs AFIS vs A/G', body: 'ATC can clear / instruct. AFIS gives information and may “advise”. A/G is air/ground radio — information only. At all types: you remain responsible for not landing on an unsafe runway.' },
        { title: 'Fuel & divert', body: 'Orbiting burns fuel. Brief a divert trigger (time / fuel / weather) before you need it.' }
      ]
    },
    {
      id: 'conflict-final',
      title: 'Conflict on final',
      icon: '⚠️',
      summary: 'Aircraft enters or occupies the runway while you are on final — go around; do not force a landing.',
      speakAll:
        'Conflict on final. If another aircraft enters or occupies the runway while you are on final, go around. Do not try to land over or around them. Apply go-around power and attitude, climb away on the runway track or as briefed, make a radio call when able, lookout, and rejoin the circuit as taught. See and avoid. Confirm with your instructor.',
      actionsLabel: 'For you as the pilot — runway occupied on final',
      actions: [
        'Decide early — if the runway is not clear, or doubt exists: GO AROUND. Do not hope they will vacate in time.',
        'Go-around now — power as briefed, climb attitude, fly the aeroplane; reconfigure flaps/carb heat as taught for your type once climbing and under control.',
        'Track — usually runway centreline / climb-out track unless noise or traffic requires a published offset; avoid turning into conflicting traffic.',
        'Radio when able — e.g. going around (CAP 413 style for ATC/AFIS/A/G). Aviate before you talk.',
        'Lookout — for the aircraft on the runway, for anyone taking off, and for traffic on crosswind/downwind.',
        'Rejoin — climb to circuit height, fit into the circuit with spacing (often left/right as published into crosswind or downwind). Do not cut inside.',
        'Never dive at the runway to “make it” past traffic — that is how go-around accidents happen.',
        'If ATC says go around / runway occupied: comply; if you see a conflict before any call: still go around — you own the decision to not land unsafe.'
      ],
      notes: [
        { title: 'Stable approach', body: 'Unstable, too high/fast, or poor spacing behind someone still vacating → go around is the professional choice.' },
        { title: 'See and avoid on final', body: 'Head-down on instruments or fixating on the threshold can hide a taxiing aircraft entering the runway. Keep scanning.' }
      ]
    },
    {
      id: 'underneath',
      title: 'Someone climbs under you',
      icon: '⬆',
      summary: 'Traffic takes off or climbs underneath you in the circuit — separate, go around / orbit, radio, lookout.',
      speakAll:
        'Someone climbs underneath you in the circuit. Do not descend into them. Maintain or climb to a safe height, go around or orbit clear as needed, keep them in sight if you can, and make a radio call when able. See and avoid. Rejoin with safe spacing. Confirm conflict procedures with your instructor.',
      actionsLabel: 'For you as the pilot — traffic climbing under you',
      actions: [
        'Fly away from the conflict — do not descend toward the other aircraft. Maintain altitude or climb; adjust heading only when clear of them and terrain/ATZ rules allow.',
        'If you are on final / late downwind and someone launches underneath or passes close below: GO AROUND / climb away on a safe track.',
        'If on downwind / base and traffic appears below: widen, extend, or orbit as briefed — create lateral and vertical separation.',
        'Keep visual if possible — know where they are going (climb-out vs turning crosswind). Do not lose them while looking at the runway.',
        'Radio when able — announce going around / orbiting / traffic in sight as appropriate to the service. Help others build the picture.',
        'Expect the unexpected at busy strips and mixed traffic (microlights, GA, helicopters) — different climb rates and circuit speeds.',
        'Rejoin only with clear spacing. If the picture stays messy, leave the circuit and rejoin from a published / instructed join.',
        'Afterward: debrief with your instructor — what you saw, what you did, what you would change.'
      ],
      notes: [
        { title: 'Different performance', body: 'A faster or steeper-climbing type may appear suddenly from below. Microlight pilots: do not assume everyone matches your climb or circuit speed.' },
        { title: 'Right of way is not a shield', body: 'Knowing who “should” give way does not stop a mid-air. Separate first; discuss later.' }
      ]
    },
    {
      id: 'goaround',
      title: 'Go-around priorities',
      icon: '↺',
      summary: 'Aviate → navigate → communicate. A go-around is a success, not a failure.',
      speakAll:
        'Go-around priorities. First, fly the aeroplane — power, climb attitude, safe speed. Then navigate — runway track or published missed approach / circuit rejoin. Then communicate — going around, when you have spare capacity. Reconfigure as taught. Lookout. Rejoin with spacing. A go-around is a success. Confirm the drill for your type with your instructor.',
      actionsLabel: 'For you as the pilot — go-around order',
      actions: [
        '1. Aviate — power (as briefed), pitch to climb attitude, keep wings level / balanced; achieve and hold a safe climb speed for your type.',
        '2. Configure — flaps / carb heat / fuel pump etc. as your instructor and POH teach for a go-around (often stepwise once climbing).',
        '3. Navigate — track runway centreline or published climb-out; avoid drifting into the live circuit traffic or noise-sensitive areas unless briefed.',
        '4. Communicate — “going around” (and any ATC readback) when flying is under control. At A/G, still announce so others hear you.',
        '5. Lookout — climb-out traffic, crosswind joiners, anyone still on the runway.',
        '6. Rejoin — climb to circuit height, position for crosswind or downwind with spacing; or leave and rejoin if instructed / safer.',
        'Reasons to go around include: unstable approach, runway occupied, traffic conflict, windshear / bounce you cannot salvage, doubt, or ATC instruction.',
        'Pride is not a reason to continue. Touch-and-goes and full-stops both allow a go-around — use it.'
      ],
      notes: [
        { title: 'Microlight note', body: 'Light wing loading and low inertia: pitch and power changes bite quickly. Fly a positive, briefed go-around — do not mush along the runway.' },
        { title: 'Study aid', body: 'Exact power settings, flap schedule, and radio words are type- and airfield-specific. Practise the drill dual until it is automatic.' }
      ]
    },
    {
      id: 'hard-grass',
      title: 'Hard runway vs grass',
      icon: '🛤',
      summary: 'Vacate hard onto grass when told; taxi on grass to line up; follow ATC/AFIS/A/G and the plate — soft ground & prop damage matter.',
      speakAll:
        'Hard runway versus grass. Many UK airfields have a hard runway and grass strips or taxiways. If tower or AFIS asks you to vacate the hard runway onto the grass after landing, do so when clear and safe, using the published exit or the instructed route. Taxi on grass to the holding point if that is the local procedure, then line up on the hard when cleared or safe. Follow ATC, AFIS, or A/G instructions and the aerodrome plate. Do not cut corners across an active runway. Use holding points. Backtrack only when published or instructed. Watch soft ground, ruts, and stones — prop and undercarriage damage are real risks in a microlight. Confirm with your instructor and the AIP.',
      actionsLabel: 'For you as the pilot — hard / grass surface ops',
      actions: [
        'Brief the airfield layout before flight — hard runway designator, grass strips / taxiways, holding points, backtrack notes, soft-ground warnings (AIP / plate / PPR).',
        'After landing on hard: if ATC / AFIS instruct “vacate onto the grass” (or similar), roll to a safe taxi speed, exit via the instructed or published route, and clear the hard runway promptly without blocking the threshold or exit.',
        'Acknowledge as appropriate to the service (ATC readback; AFIS/A/G — confirm you understand and state intentions if needed).',
        'Taxi on grass: slow, lookout for ruts, rabbit holes, wet patches, slope, and stones. Microlight props sit low — stone chip and prop strike risk rises on loose or gravelly grass edges.',
        'Lining up: taxi via the grass / taxiway to the correct holding point for the hard runway in use. Hold short — do not enter or line up until cleared (ATC) or until it is safe and you have announced / been advised as applicable (AFIS/A/G).',
        'Taking off from hard after grass taxi: stop at the hold, power checks / pre-take-off as briefed, lookout final and approach, then enter / backtrack / line up only as instructed or published.',
        'Backtrack on the hard: only when published, instructed, or clearly the local method. Announce backtracking when required; keep a sharp lookout; vacate or line up without delay once done.',
        'Never cut across an active runway or active grass landing strip to save time — use taxiways / published routes / instructed paths only.',
        'Soft / wet grass: if the surface looks unsafe for your weight and tyre type, say so — request an alternative route or hold on hard if available. “Unable” / stating the problem is better than a nosewheel in a rut.',
        'Mixed ops: expect slower vacate times, different runway occupancy, and aircraft using grass in parallel or as a taxiway — build extra spacing in the circuit.'
      ],
      notes: [
        { title: 'What is typically allowed', body: 'Using published grass taxiways; vacating hard onto grass when instructed or published; holding at marked / briefed points; backtracking when published or positively instructed; landing on grass only if that strip is active/available and suitable for your type.' },
        { title: 'What is typically NOT allowed', body: 'Cutting corners across the active hard or grass landing area; lining up without clearance/safe separation; ignoring soft-ground or noise routes; assuming every grass area is a taxiway; blocking the runway while chatting on the radio.' },
        { title: 'ATC / AFIS / A/G', body: 'ATC: comply with taxi / vacate / hold / line-up clearances. AFIS: follow advice and use the information — you still decide safely. A/G: information only — announce intentions, lookout, and use published routes. Local AIP / aerodrome plate always wins over habit.' },
        { title: 'Microlight caution', body: 'Light nosewheels and low props dislike soft ground and FOD. If in doubt after rain, ask locally or use hard only where permitted.' }
      ]
    }
  ]
};
