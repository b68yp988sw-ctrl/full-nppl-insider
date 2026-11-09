/* Live UK clock on every page — device clock, Europe/London (GMT/BST automatic). Offline-safe. */
(function () {
  'use strict';
  const TZ = 'Europe/London';
  const elUk = () => document.getElementById('app-clock-uk');
  const elUtc = () => document.getElementById('app-clock-utc');

  function parts(dt, tz) {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const map = {};
    f.formatToParts(dt).forEach(p => { if (p.type !== 'literal') map[p.type] = p.value; });
    return map;
  }

  function tick() {
    const ukEl = elUk(), utcEl = elUtc();
    if (!ukEl || !utcEl) return;
    const now = new Date();
    const uk = parts(now, TZ);
    const utc = parts(now, 'UTC');
    const hh = String(uk.hour).padStart(2, '0');
    const mm = String(uk.minute).padStart(2, '0');
    const uhh = String(utc.hour).padStart(2, '0');
    const umm = String(utc.minute).padStart(2, '0');
    ukEl.textContent = `${uk.weekday} ${uk.day} ${uk.month} ${uk.year} · ${hh}:${mm} UK time`;
    utcEl.textContent = `${uhh}:${umm} UTC (Coordinated Universal Time)`;
  }

  function start() {
    tick();
    // Align to the next whole minute, then tick every 30s (covers DST flips quickly enough).
    const ms = 60000 - (Date.now() % 60000) + 50;
    setTimeout(function loop() {
      tick();
      setInterval(tick, 30000);
    }, ms);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
