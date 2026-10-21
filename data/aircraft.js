/* UK NPPL microlight aircraft study data — typical / example figures only.
   Confirm every number with the aircraft POH, TADS, placard, and instructor.
   MTOW / empty / tanks vary by engine & approval — see variants[] on each type. */
const AIRCRAFT_DATA = (() => {
  const DISCLAIMER =
    'Typical study figures only — use the actual empty weight, MTOW, tank capacity, and POH / placard for the aircraft you fly. Not certified data. Weight limits change with engine, BRS, and approval.';

  /** Shared 3-axis microlight part explanations (plain English). */
  const PARTS_3AXIS = [
    { id: 'propeller', label: 'Propeller', role: 'Turns engine power into thrust that pulls (or pushes) the aircraft forward through the air.' },
    { id: 'spinner', label: 'Spinner', role: 'Smooth cone over the prop hub — reduces drag and covers the hub fasteners.' },
    { id: 'engine', label: 'Engine / cowling', role: 'Usually a Rotax (or similar). The cowling covers and cools the engine; check oil, coolant, and security on walk-round.' },
    { id: 'fuselage', label: 'Fuselage', role: 'The body that carries the cockpit, fuel, and attaches wings, engine, and tail.' },
    { id: 'windscreen', label: 'Windscreen', role: 'Clear canopy / screen so you can see ahead and sideways; keep clean for lookout.' },
    { id: 'doors', label: 'Doors / hatches', role: 'Side doors or bubble canopy — must be closed and latched before flight.' },
    { id: 'wing', label: 'Wing', role: 'Makes lift. High-wing microlights give good downward view; strut-braced on many types.' },
    { id: 'strut', label: 'Wing strut', role: 'Brace from fuselage to wing — carries flight loads. Check pins, fairings, and play.' },
    { id: 'aileron', label: 'Aileron', role: 'Hinged trailing-edge surface on each wing — roll left/right (bank) when you move the stick sideways.' },
    { id: 'flap', label: 'Flap', role: 'Inner trailing-edge surface — increases lift (and drag) for slower approaches and shorter take-offs.' },
    { id: 'pitot', label: 'Pitot / static', role: 'Senses airspeed (and often altitude). Keep covers off for flight; check for bugs or tape.' },
    { id: 'main-gear', label: 'Main gear', role: 'Left and right main wheels — absorb landing loads; check tyres, brakes, and fairings.' },
    { id: 'nose-gear', label: 'Nose gear', role: 'Front wheel that steers on the ground (often linked to rudder pedals). Check tyre and forks.' },
    { id: 'h-stab', label: 'Horizontal stabiliser', role: 'Fixed (or trimable) tailplane that helps keep the nose stable in pitch.' },
    { id: 'elevator', label: 'Elevator', role: 'Hinged on the tailplane — pitch up/down (climb / descend / flare) when you pull or push the stick.' },
    { id: 'rudder', label: 'Rudder', role: 'Vertical hinged surface on the fin — yaws the nose left/right; used with aileron for coordinated turns and to keep straight on the runway.' },
    { id: 'trim', label: 'Trim tab', role: 'Small adjustable tab (or spring trim) that holds pitch (or other) attitude without constant stick pressure.' },
    { id: 'fuel-filler', label: 'Fuel filler', role: 'Where you refuel. Cap must be secure; know which tank(s) you have filled.' },
    { id: 'brs', label: 'BRS / ballistic chute', role: 'Whole-aircraft parachute (if fitted). Know arming and activation — instructor brief mandatory.' }
  ];

  const PARTS_WEIGHTSHIFT = [
    { id: 'propeller', label: 'Propeller', role: 'Pushes the trike forward; usually behind the seats (pusher). Stay clear of the arc.' },
    { id: 'engine', label: 'Engine / pod', role: 'Mounted behind / above the keel area. Check oil, coolant, exhaust, and mounts.' },
    { id: 'wing', label: 'Flexwing', role: 'Fabric wing on a hang-glider-style frame. You steer by weight-shift — moving the bar moves your weight relative to the wing.' },
    { id: 'basebar', label: 'Base bar / A-frame', role: 'The control bar you push and pull. Push bar out → nose up (roughly); pull in → nose down. Sideways moves bank.' },
    { id: 'hangpoint', label: 'Hang point / keel', role: 'Where the trike hangs under the wing. Critical security item on every walk-round.' },
    { id: 'fuselage', label: 'Trike / carriage', role: 'Seats, undercarriage, and engine frame hanging under the wing.' },
    { id: 'windscreen', label: 'Pod screen', role: 'Front fairing / screen for the pilot and passenger.' },
    { id: 'main-gear', label: 'Main gear', role: 'Rear wheels — absorb landings; check tyres and brakes.' },
    { id: 'nose-gear', label: 'Nose wheel', role: 'Front wheel for taxi and take-off roll steering.' },
    { id: 'fuel-filler', label: 'Fuel tank / filler', role: 'Often behind the seats — know capacity and how to read contents.' },
    { id: 'brs', label: 'BRS (if fitted)', role: 'Some flexwings carry a recovery parachute — briefed use only.' }
  ];

  /**
   * Each aircraft has variants[] — engine / power / approval packages.
   * Fields on a variant override type defaults for the calculator & specs table.
   * id, label, engine, powerHpApprox, mtowKg, emptyKgTypical, fuelLitresOptions,
   * maxFuelL, fuelBurnLphTypical, cruiseKts, stallKts, maxSeatKg?, notes?
   */
  const aircraft = [
    {
      id: 'c42',
      name: 'Ikarus C42',
      shortName: 'C42',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 9.5,
      lengthM: 6.2,
      diagram: 'highwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 'c42-912ul-450',
      variants: [
        {
          id: 'c42-912ul-450',
          label: 'Rotax 912 UL · 450 kg',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 268,
          emptyNote: 'Lighter 80 hp fit — typical empty ≈260–275 kg',
          fuelLitresOptions: [50, 65],
          maxFuelL: 65,
          fuelBurnLphTypical: 14,
          cruiseKts: 85,
          stallKts: 38,
          maxSeatKg: 120,
          notes: 'Standard UK microlight MTOW 450 kg with 912 UL (~80 hp).'
        },
        {
          id: 'c42-912uls-450',
          label: 'Rotax 912 ULS · 450 kg',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 450,
          emptyKgTypical: 278,
          emptyNote: '100 hp fit is typically a bit heavier — ≈270–290 kg empty',
          fuelLitresOptions: [50, 65, 100],
          maxFuelL: 65,
          fuelBurnLphTypical: 16,
          cruiseKts: 92,
          stallKts: 38,
          maxSeatKg: 120,
          notes: 'Same 450 kg MTOW; more power / climb. Confirm empty weight on your scales sheet.'
        },
        {
          id: 'c42-912uls-472',
          label: 'Rotax 912 ULS · 472.5 kg (mod)',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 472.5,
          emptyKgTypical: 285,
          emptyNote: 'Higher MTOW mods often include BRS / structural kit — empty often ≈280–295 kg',
          fuelLitresOptions: [50, 65, 100],
          maxFuelL: 100,
          fuelBurnLphTypical: 16,
          cruiseKts: 92,
          stallKts: 38,
          maxSeatKg: 120,
          notes: 'Some UK C42s approved to 472.5 kg with specific mods / BRS — only if YOUR airframe paperwork says so.'
        }
      ],
      notes: [
        'Very common UK NPPL microlight trainer — high-wing, side-by-side, tricycle gear.',
        'Pick the engine / MTOW variant that matches the C42 you fly, then confirm empty weight from the POH / scales.',
        'Max per-seat figures (~120 kg) are commonly cited training limits — confirm placard.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'eurostar',
      name: 'Evektor Eurostar / EV-97',
      shortName: 'Eurostar',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 8.1,
      lengthM: 6.0,
      diagram: 'lowwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 'euro-912ul-450',
      variants: [
        {
          id: 'euro-912ul-450',
          label: 'Rotax 912 UL · 450 kg',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 275,
          emptyNote: '≈270–285 kg typical empty',
          fuelLitresOptions: [50, 65],
          maxFuelL: 65,
          fuelBurnLphTypical: 15,
          cruiseKts: 90,
          stallKts: 40,
          maxSeatKg: 110,
          notes: 'Microlight-eligible 80 hp config.'
        },
        {
          id: 'euro-912uls-450',
          label: 'Rotax 912 ULS · 450 kg',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 450,
          emptyKgTypical: 285,
          emptyNote: '≈280–295 kg typical empty',
          fuelLitresOptions: [50, 65, 85],
          maxFuelL: 65,
          fuelBurnLphTypical: 17,
          cruiseKts: 100,
          stallKts: 40,
          maxSeatKg: 110,
          notes: '100 hp touring / training fit at 450 kg MTOW.'
        }
      ],
      notes: [
        'Low-wing Czech design popular for touring and training in microlight / SSDR configs.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'foxbat',
      name: 'Aeroprakt A22 Foxbat',
      shortName: 'Foxbat',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 9.6,
      lengthM: 6.1,
      diagram: 'highwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 'fox-912ul-450',
      variants: [
        {
          id: 'fox-912ul-450',
          label: 'Rotax 912 UL · 450 kg microlight',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 280,
          emptyNote: '≈275–290 kg typical empty',
          fuelLitresOptions: [90],
          maxFuelL: 90,
          fuelBurnLphTypical: 15,
          cruiseKts: 85,
          stallKts: 35,
          maxSeatKg: 110,
          notes: 'UK microlight-eligible config — confirm paperwork.'
        },
        {
          id: 'fox-912uls-450',
          label: 'Rotax 912 ULS · 450 kg microlight',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 450,
          emptyKgTypical: 290,
          emptyNote: '≈285–300 kg typical empty',
          fuelLitresOptions: [90, 114],
          maxFuelL: 90,
          fuelBurnLphTypical: 17,
          cruiseKts: 95,
          stallKts: 35,
          maxSeatKg: 110,
          notes: 'Some Foxbats are flown outside microlight class at higher MTOW — not shown here.'
        }
      ],
      notes: [
        'High-wing STOL-ish microlight / LSA family — great visibility and short-field manners when light.',
        'Tank options vary widely — use the placard on your airframe.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'skyranger',
      name: 'Best Off Skyranger Nynja',
      shortName: 'Skyranger',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 9.5,
      lengthM: 5.8,
      diagram: 'highwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 'sky-912ul-450',
      variants: [
        {
          id: 'sky-912ul-450',
          label: 'Rotax 912 UL · 450 kg',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 260,
          emptyNote: '≈255–270 kg typical empty',
          fuelLitresOptions: [50, 60],
          maxFuelL: 60,
          fuelBurnLphTypical: 14,
          cruiseKts: 82,
          stallKts: 35,
          maxSeatKg: 110,
          notes: 'Common UK Nynja / Swift-family 80 hp microlight.'
        },
        {
          id: 'sky-912uls-450',
          label: 'Rotax 912 ULS · 450 kg',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 450,
          emptyKgTypical: 270,
          emptyNote: '≈265–280 kg typical empty',
          fuelLitresOptions: [50, 60, 80],
          maxFuelL: 60,
          fuelBurnLphTypical: 16,
          cruiseKts: 90,
          stallKts: 35,
          maxSeatKg: 110,
          notes: '100 hp option — confirm empty weight for your build.'
        }
      ],
      notes: [
        'Popular UK 3-axis microlight (Swift / Nynja family). Tube-and-fabric / composite mixes depending on mark.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'thruster',
      name: 'Thruster T600N',
      shortName: 'Thruster',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 9.6,
      lengthM: 5.7,
      diagram: 'highwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 'thr-912-450',
      variants: [
        {
          id: 'thr-582-450',
          label: 'Rotax 582 · 450 kg',
          engine: 'Rotax 582',
          powerHpApprox: 65,
          mtowKg: 450,
          emptyKgTypical: 245,
          emptyNote: '≈235–255 kg typical empty (2-stroke)',
          fuelLitresOptions: [40, 50],
          maxFuelL: 50,
          fuelBurnLphTypical: 20,
          cruiseKts: 65,
          stallKts: 35,
          maxSeatKg: 100,
          notes: 'Classic 2-stroke club machine — higher burn, different handling.'
        },
        {
          id: 'thr-912-450',
          label: 'Rotax 912 UL · 450 kg',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 255,
          emptyNote: '≈250–270 kg typical empty',
          fuelLitresOptions: [40, 50, 60],
          maxFuelL: 50,
          fuelBurnLphTypical: 15,
          cruiseKts: 75,
          stallKts: 35,
          maxSeatKg: 100,
          notes: '4-stroke 912 conversion / build — quieter and usually more economical.'
        }
      ],
      notes: [
        'Long-standing UK training / club microlight. Handling and burn differ a lot between 582 and 912 powerplants.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'rans-s6',
      name: 'Rans S-6 Coyote II',
      shortName: 'Rans S6',
      badge: null,
      category: '3-axis',
      seats: 2,
      seating: 'Side-by-side',
      wingspanM: 10.5,
      lengthM: 6.0,
      diagram: 'highwing',
      parts: PARTS_3AXIS,
      defaultVariantId: 's6-912-450',
      variants: [
        {
          id: 's6-582-450',
          label: 'Rotax 582 · 450 kg',
          engine: 'Rotax 582',
          powerHpApprox: 65,
          mtowKg: 450,
          emptyKgTypical: 250,
          emptyNote: '≈240–260 kg typical empty',
          fuelLitresOptions: [40, 50],
          maxFuelL: 50,
          fuelBurnLphTypical: 18,
          cruiseKts: 70,
          stallKts: 35,
          maxSeatKg: 100,
          notes: '2-stroke microlight S-6.'
        },
        {
          id: 's6-912-450',
          label: 'Rotax 912 UL · 450 kg',
          engine: 'Rotax 912 UL',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 265,
          emptyNote: '≈255–275 kg typical empty',
          fuelLitresOptions: [40, 50, 68],
          maxFuelL: 50,
          fuelBurnLphTypical: 15,
          cruiseKts: 80,
          stallKts: 35,
          maxSeatKg: 100,
          notes: '4-stroke 912 — common UK touring / training fit.'
        }
      ],
      notes: [
        'High-wing kit / microlight favourite — long wing, docile when flown within limits.',
        'All numbers here are typical / example — confirm POH.'
      ]
    },
    {
      id: 'pm-quik',
      name: 'P&M Quik (weightshift)',
      shortName: 'P&M Quik',
      badge: 'Flexwing',
      category: 'weightshift',
      seats: 2,
      seating: 'Tandem (typical)',
      wingspanM: 10.0,
      lengthM: null,
      diagram: 'weightshift',
      parts: PARTS_WEIGHTSHIFT,
      defaultVariantId: 'quik-912-450',
      variants: [
        {
          id: 'quik-912-450',
          label: 'Rotax 912 · 450 kg',
          engine: 'Rotax 912 UL / ULS',
          powerHpApprox: 80,
          mtowKg: 450,
          emptyKgTypical: 215,
          emptyNote: 'Wing + trike combo ≈200–230 kg — varies a lot with wing choice',
          fuelLitresOptions: [40, 50],
          maxFuelL: 50,
          fuelBurnLphTypical: 13,
          cruiseKts: 65,
          stallKts: 28,
          maxSeatKg: null,
          notes: 'Typical Quik / QuikR-class flexwing at 450 kg.'
        },
        {
          id: 'quik-912uls-450',
          label: 'Rotax 912 ULS · 450 kg',
          engine: 'Rotax 912 ULS',
          powerHpApprox: 100,
          mtowKg: 450,
          emptyKgTypical: 225,
          emptyNote: '≈210–240 kg typical empty',
          fuelLitresOptions: [40, 50, 65],
          maxFuelL: 50,
          fuelBurnLphTypical: 15,
          cruiseKts: 75,
          stallKts: 30,
          maxSeatKg: null,
          notes: '100 hp flexwing — still confirm school W&B sheet.'
        }
      ],
      notes: [
        'Different control philosophy: weight-shift via the base bar, not stick + rudder pedals for primary roll/pitch.',
        'Parts diagram shows what still applies (wing, gear, prop, fuel) plus flexwing-specific controls.',
        'For exact W&B, prefer your school weight-and-balance sheet / POH — flexwing empty weights vary with wing choice.',
        'All numbers here are typical / example — confirm POH.'
      ]
    }
  ];

  function variantOf(ac, variantId) {
    if (!ac || !ac.variants || !ac.variants.length) return null;
    return ac.variants.find(v => v.id === variantId) ||
      ac.variants.find(v => v.id === ac.defaultVariantId) ||
      ac.variants[0];
  }

  /** Merge type + variant into one resolved study profile for UI / calculator. */
  function resolve(ac, variantId) {
    if (!ac) return null;
    const v = variantOf(ac, variantId);
    if (!v) return null;
    return {
      aircraft: ac,
      variant: v,
      id: ac.id,
      name: ac.name,
      shortName: ac.shortName,
      badge: ac.badge,
      category: ac.category,
      seats: ac.seats,
      seating: ac.seating,
      wingspanM: ac.wingspanM,
      lengthM: ac.lengthM,
      diagram: ac.diagram,
      parts: ac.parts,
      notes: ac.notes,
      engineTypical: v.engine + (v.powerHpApprox ? ` (~${v.powerHpApprox} hp)` : ''),
      engine: v.engine,
      powerHpApprox: v.powerHpApprox,
      mtowKg: v.mtowKg,
      emptyKgTypical: v.emptyKgTypical,
      emptyNote: v.emptyNote || '',
      fuelLitresOptions: v.fuelLitresOptions || [v.maxFuelL],
      maxFuelL: v.maxFuelL,
      fuelBurnLphTypical: v.fuelBurnLphTypical,
      cruiseKts: v.cruiseKts,
      stallKts: v.stallKts,
      maxSeatKg: v.maxSeatKg != null ? v.maxSeatKg : null,
      variantLabel: v.label,
      variantNotes: v.notes || '',
      mtowSource: `Variant: ${v.label}`,
      emptySource: `Variant: ${v.label}`
    };
  }

  return {
    disclaimer: DISCLAIMER,
    fuelSgDefault: 0.72,
    aircraft,
    byId(id) {
      return aircraft.find(a => a.id === id) || null;
    },
    variantOf,
    resolve
  };
})();
