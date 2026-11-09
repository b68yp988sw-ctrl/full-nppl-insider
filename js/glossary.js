/* Plain-English expansion for airfield pages (v12).
 * Within each section the first use of a short form becomes "full words (CODE)";
 * later uses keep the code (acronyms) or the full word (units). Raw METAR/TAF code (<code>) is never changed. */
(function () {
  'use strict';
  // Acronyms: first use "full words (CODE)", then CODE.
  const ACR = {
    AIP: 'Aeronautical Information Publication', AIRAC: 'aeronautical information regulation and control cycle',
    ATC: 'air traffic control', ATS: 'air traffic services', ATZ: 'aerodrome traffic zone', ATIS: 'automatic terminal information service',
    PPR: 'prior permission required', 'A/G': 'air/ground radio', AFIS: 'aerodrome flight information service', AFISO: 'aerodrome flight information service officer',
    TWR: 'tower', APP: 'approach', GND: 'ground', CTR: 'control zone', CTA: 'control area', TMA: 'terminal control area', CAS: 'controlled airspace',
    LFA: 'local flying area', FRZ: 'flight restriction zone', LARS: 'lower airspace radar service', RTF: 'radiotelephony', DOC: 'designated operational coverage',
    QNH: 'sea-level pressure setting', QFE: 'airfield pressure setting', FMC: 'frequency monitoring code', QDM: 'magnetic heading to steer to the airfield',
    THR: 'threshold', RWY: 'runway', TWY: 'taxiway', ARP: 'aerodrome reference point', PCR: 'pavement classification rating', VRP: 'visual reference point',
    LH: 'left-hand', RH: 'right-hand', SFC: 'surface', AMSL: 'above mean sea level', ALT: 'altitude', AGL: 'above ground level', AAL: 'above aerodrome level',
    UTC: 'Coordinated Universal Time', GMT: 'Greenwich Mean Time', BST: 'British Summer Time', H24: 'open 24 hours', SS: 'sunset', SR: 'sunrise', PH: 'public holidays',
    AVGAS: 'aviation petrol', UL91: 'unleaded aviation petrol, 91 octane', '100LL': '100-octane low-lead aviation petrol', SAF: 'sustainable aviation fuel',
    VFR: 'visual flight rules', SVFR: 'special visual flight rules', IFR: 'instrument flight rules', MVFR: 'marginal visual flight rules', LIFR: 'low instrument flight rules',
    VMC: 'visual meteorological conditions', SEP: 'single-engine piston', MTOW: 'maximum take-off weight', NOTAM: 'notice to airmen', NOTAMs: 'notices to airmen', UAS: 'unmanned aircraft (drones)',
    ICAO: 'International Civil Aviation Organization', GA: 'general aviation', PPL: 'private pilot licence', ACL: 'Airport Coordination Limited',
    TORA: 'take-off run available', TODA: 'take-off distance available', ASDA: 'accelerate-stop distance available', LDA: 'landing distance available',
    METAR: 'aviation routine weather report', TAF: 'terminal aerodrome forecast', CAVOK: 'ceiling and visibility OK', CNL: 'cancelled', NIL: 'nil / none',
    NE: 'north-east', NW: 'north-west', SE: 'south-east', SW: 'south-west', VAT: 'value added tax'
  };
  // Units after a number: first use "full word (unit)", then the full word.
  const UNIT = { kt: 'knots', KT: 'knots', ft: 'feet', FT: 'feet', NM: 'nautical miles', kg: 'kilograms', m: 'metres', hPa: 'hectopascals', MHz: 'megahertz', min: 'minutes', mm: 'millimetres', h: 'hours' };
  // Always written out.
  const WORD = { hrs: 'hours', cct: 'circuit', Cct: 'Circuit', elev: 'elevation', Elev: 'Elevation', incl: 'including', info: 'information', approx: 'approximately', max: 'maximum', 'N/A': 'not applicable', Nav: 'Navigation' };
  const esc = s => s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
  const acrRe = new RegExp('(^|[^A-Za-z0-9])(' + Object.keys(ACR).sort((a, b) => b.length - a.length).map(esc).join('|') + ')(?![A-Za-z0-9])', 'g');
  const unitRe = new RegExp('(\\d)(\\s?)(' + Object.keys(UNIT).sort((a, b) => b.length - a.length).map(esc).join('|') + ')(?![A-Za-z0-9²])', 'g');
  const wordRe = new RegExp('(^|[^A-Za-z])(' + Object.keys(WORD).map(esc).join('|') + ')(?![A-Za-z])', 'g');
  function line(s, seen) {
    s = s.replace(wordRe, (m, p, w) => p + WORD[w]);
    s = s.replace(unitRe, (m, d, sp, u) => { const full = UNIT[u]; if (seen.has('u:' + full)) return d + ' ' + full; seen.add('u:' + full); return `${d} ${full} (${u})`; });
    s = s.replace(acrRe, (m, p, a, off, all) => {
      if (a === 'AD' || (a === 'SS' && /\d/.test(all[off + m.length] || ''))) return m;
      if (p === '(' && all[off + m.length] === ')') { seen.add(a); return m; }
      if (seen.has(a)) return m; seen.add(a);
      // The full words are already beside it, e.g. "Circuit (cct)"? Leave alone.
      let f = ACR[a]; if (/^\s*$/.test(all.slice(0, off + p.length)) || /[.:!?]\s*$/.test(all.slice(0, off + p.length))) f = f[0].toUpperCase() + f.slice(1);
      return `${p}${f} (${a})`;
    });
    return s;
  }
  function expand(root, seen) {
    if (!root) return;
    seen = seen || new Set();
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('code, pre, script, style, .no-gloss, svg') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    for (const n of nodes) { const v = line(n.nodeValue, seen); if (v !== n.nodeValue) n.nodeValue = v; }
  }
  window.Gloss = { expand, line, ACR };
})();
