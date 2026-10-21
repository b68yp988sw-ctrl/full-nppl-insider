/* Flight planning checklist UI — multi-trip drafts in localStorage */
const TripUI = (() => {
  const KEY = 'full-nppl-trip-plans-v1';
  let viewMode = 'list'; // list | edit
  let activeId = null;
  let openSection = null; // section id accordion

  function loadStore() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { trips: [], activeId: null };
      const data = JSON.parse(raw);
      return { trips: data.trips || [], activeId: data.activeId || null };
    } catch {
      return { trips: [], activeId: null };
    }
  }

  function saveStore(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function allItems() {
    return TRIP_PLAN.sections.flatMap(s => s.items);
  }

  function tripProgress(trip) {
    const items = allItems();
    const done = items.filter(it => trip.checks && trip.checks[it.id]).length;
    return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 };
  }

  function getTrip(id) {
    return loadStore().trips.find(t => t.id === id) || null;
  }

  function upsertTrip(trip) {
    const data = loadStore();
    const i = data.trips.findIndex(t => t.id === trip.id);
    trip.updated = Date.now();
    if (i >= 0) data.trips[i] = trip;
    else data.trips.unshift(trip);
    data.activeId = trip.id;
    saveStore(data);
  }

  function deleteTrip(id) {
    const data = loadStore();
    data.trips = data.trips.filter(t => t.id !== id);
    if (data.activeId === id) data.activeId = data.trips[0] ? data.trips[0].id : null;
    saveStore(data);
  }

  function newTrip(name) {
    const dest = (name || '').trim() || 'Untitled trip';
    const fields = {};
    allItems().forEach(it => {
      (it.fields || []).forEach(f => {
        if (f.default != null) fields[f.id] = f.default;
      });
    });
    if (!fields.aircraft) fields.aircraft = TRIP_PLAN.aircraftDefault || 'C42';
    if (!fields.emergFreq) fields.emergFreq = '121.500';
    const trip = {
      id: 'trip_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name: dest,
      created: Date.now(),
      updated: Date.now(),
      checks: {},
      fields
    };
    upsertTrip(trip);
    return trip;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function fmtDate(ts) {
    try {
      return new Date(ts).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
    } catch {
      return '';
    }
  }


  function extractIcao(trip) {
    const raw = (trip.fields && (trip.fields.destIcao || trip.fields.destName)) || trip.name || '';
    const m = String(raw).toUpperCase().match(/\b(EG[A-Z]{2}|[A-Z]{4})\b/);
    return m ? m[1] : '';
  }

  function wxPanelHtml(trip) {
    const icao = extractIcao(trip) || '';
    return `
      <div class="wx-live-panel" id="wx-live-panel">
        <h3>Live METAR / TAF / NOTAM</h3>
        <p class="meta" style="margin-bottom:8px">Study aid / planning helper — not for sole operational decision. Confirm Met Office, NATS, official NOTAM, AIP, instructor.</p>
        <div class="wx-live-row">
          <input type="text" id="wx-icao" maxlength="4" placeholder="ICAO e.g. EGLL" value="${esc(icao)}" />
          <button type="button" class="btn btn-primary" id="wx-refresh">Refresh</button>
        </div>
        <p class="meta">Needs connection. Offline: core checklists still work; live weather labelled unavailable.</p>
        <div id="wx-status" class="wx-meta"></div>
        <div id="wx-metar" class="wx-block"><h4>METAR</h4><div class="wx-raw">—</div></div>
        <div id="wx-taf" class="wx-block"><h4>TAF</h4><div class="wx-raw">—</div></div>
        <div id="wx-notam" class="wx-block"><h4>NOTAMs</h4><div class="wx-raw">—</div></div>
        <div class="disclaimer-inline" style="margin-top:8px">UK AIP / NATS is authoritative for NOTAMs. Free feeds may be incomplete for UK EG** fields.</div>
      </div>`;
  }

  async function fetchWx(icao) {
    const status = document.getElementById('wx-status');
    const metarEl = document.getElementById('wx-metar');
    const tafEl = document.getElementById('wx-taf');
    const notamEl = document.getElementById('wx-notam');
    if (!icao || !/^[A-Z]{4}$/.test(icao)) {
      if (status) status.textContent = 'Enter a 4-letter ICAO (e.g. EGLL, EGHA).';
      return;
    }
    if (!navigator.onLine) {
      if (status) status.innerHTML = '<span class="wx-offline">Needs connection — live METAR/TAF/NOTAM unavailable offline.</span>';
      return;
    }
    if (status) status.textContent = 'Fetching…';
    const stamp = (iso) => {
      try { return new Date(iso).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'medium' }); }
      catch { return iso || ''; }
    };
    // Live proxy only exists when served by server.js. On static hosting (GitHub Pages)
    // there is no /api — fall back to official links instead of an error.
    const apiJson = (path) => fetch('api/' + path + '?icao=' + encodeURIComponent(icao)).then(r => {
      const ct = r.headers.get('content-type') || '';
      if (!ct.includes('json')) throw new Error('NO_PROXY');
      return r.json();
    });
    const officialLinks = `
      <ul class="wx-links" style="margin:6px 0 0 18px;line-height:1.7">
        <li><a href="https://aviationweather.gov/data/metar/?id=${encodeURIComponent(icao)}&decoded=1&taf=1" target="_blank" rel="noopener">METAR + TAF for ${esc(icao)} (aviationweather.gov)</a></li>
        <li><a href="https://www.metoffice.gov.uk/services/transport/aviation/regulated/national-met" target="_blank" rel="noopener">Met Office aviation (GA)</a></li>
        <li><a href="https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/AIP/" target="_blank" rel="noopener">NATS AIS / AIP &amp; NOTAMs</a></li>
      </ul>`;
    try {
      const [mR, tR, nR] = await Promise.all([apiJson('metar'), apiJson('taf'), apiJson('notam')]);
      if (metarEl) {
        const dec = mR.decoded || {};
        const bits = [dec.wind, dec.vis, dec.clouds, dec.temp, dec.dewp, dec.altim, dec.flightCategory].filter(Boolean).join(' · ');
        metarEl.innerHTML = `<h4>METAR</h4>
          <div class="wx-raw">${esc(mR.raw || (mR.ok ? 'No METAR returned' : (mR.error || 'Unavailable')))}</div>
          ${bits ? `<div class="wx-decode">${esc(bits)}</div>` : ''}
          <div class="wx-meta">${esc(mR.source || '')} · ${esc(stamp(mR.fetchedAt))} · ${esc((mR.disclaimer || '').slice(0, 120))}</div>`;
      }
      if (tafEl) {
        tafEl.innerHTML = `<h4>TAF</h4>
          <div class="wx-raw">${esc(tR.raw || (tR.ok ? 'No TAF returned' : (tR.error || 'Unavailable')))}</div>
          <div class="wx-meta">${esc(tR.source || '')} · ${esc(stamp(tR.fetchedAt))}</div>`;
      }
      if (notamEl) {
        let body;
        if (nR.unavailable || !(nR.notams || []).length) {
          body = `<div class="wx-error">${esc(nR.note || 'NOTAMs unavailable via free proxy — use NATS / official briefing.')}</div>`;
        } else {
          body = (nR.notams || []).map(n => `
            <div class="wx-notam-item">
              <strong>${esc(n.id)}</strong>${n.qcode ? ' · ' + esc(n.qcode) : ''}
              <div class="wx-raw">${esc(n.summary || n.raw || '')}</div>
            </div>`).join('');
        }
        notamEl.innerHTML = `<h4>NOTAMs</h4>${body}
          <div class="wx-meta">Source: ${esc(nR.source || 'none')} · ${esc(stamp(nR.fetchedAt))}</div>`;
      }
      if (status) status.textContent = 'Updated ' + stamp(new Date().toISOString()) + ' · ' + icao;
    } catch (e) {
      if (status) {
        if (String(e && e.message) === 'NO_PROXY' || e instanceof SyntaxError) {
          status.innerHTML = `<span class="wx-offline">In-app live weather isn't available on this web version. Open the official sources:</span>${officialLinks}`;
        } else {
          status.innerHTML = `<span class="wx-error">Fetch failed — ${esc(e.message || e)}. Needs connection.</span>${officialLinks}`;
        }
      }
    }
  }

  function createFromAirfield(info) {
    const name = ((info && (info.icao || info.name)) || 'Trip').toString();
    const trip = newTrip(name);
    trip.fields = trip.fields || {};
    if (info && info.icao) {
      trip.fields.destIcao = info.icao;
      trip.fields.destName = (info.icao + ' ' + (info.name || '')).trim();
    }
    if (info && info.name) trip.name = (info.icao ? info.icao + ' ' : '') + info.name;
    if (info && info.freq) trip.fields.destFreq = info.freq;
    upsertTrip(trip);
    viewMode = 'edit';
    activeId = trip.id;
    return trip;
  }

  /* ---------- LIST VIEW ---------- */
  function viewList(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Plan a trip';
    ctx.btnBack.hidden = false;
    /* back: goBack() */
    const { trips } = loadStore();

    return `
      <div class="disclaimer-inline">${esc(TRIP_PLAN.disclaimer)}</div>
      <div class="hero" style="padding-top:0">
        <div class="hero-badge">UK GA · Microlight · C42</div>
        <h1 style="font-size:1.2rem">Airfield planning</h1>
        <p style="color:var(--muted);font-size:0.85rem;margin-top:6px">Tick-off checklist for flying to another airfield. Progress saved per trip on this device.</p>
      </div>

      <div class="chip-row" style="margin-bottom:10px">
        <button type="button" class="chip" data-go="airfields">Airfield cards</button>
        <button type="button" class="chip" data-go="flight-prep">Flight prep</button>
      </div>
      <div class="card trip-new-card">
        <label style="display:block;font-size:0.8rem;color:var(--muted);margin-bottom:6px">New trip — destination airfield</label>
        <div class="trip-new-row">
          <input type="text" id="trip-new-name" placeholder="e.g. EGHA Compton Abbas" maxlength="80"
            autocomplete="off"/>
          <button type="button" class="btn btn-primary" id="trip-create">Create</button>
        </div>
      </div>

      <div class="section-label">Your trip drafts (${trips.length})</div>
      ${trips.length ? trips.map(t => {
        const p = tripProgress(t);
        return `<div class="card card-tap trip-draft" data-trip-open="${esc(t.id)}">
          <div class="trip-draft-main">
            <h3>${esc(t.name)}</h3>
            <div class="meta">${p.pct}% · ${p.done}/${p.total} · updated ${fmtDate(t.updated)}</div>
            <div class="bar"><i style="width:${p.pct}%"></i></div>
          </div>
          <div class="chev">›</div>
        </div>`;
      }).join('') : '<p class="meta" style="color:var(--muted);margin-bottom:12px">No trips yet — create one above.</p>'}

      <div class="disclaimer-inline">${esc(TRIP_PLAN.disclaimer)}</div>`;
  }

  /* ---------- EDIT VIEW ---------- */
  function viewEdit(ctx) {
    const trip = getTrip(activeId);
    if (!trip) {
      viewMode = 'list';
      return viewList(ctx);
    }
    ctx.setNav('theory');
    ctx.titleEl.textContent = trip.name;
    ctx.btnBack.hidden = false;
    const p = tripProgress(trip);
    const sections = TRIP_PLAN.sections;

    return `
      <div class="disclaimer-inline">${esc(TRIP_PLAN.disclaimer)}</div>

      <div class="card trip-header-card">
        <label style="display:block;font-size:0.75rem;color:var(--muted);margin-bottom:4px">Trip name (destination)</label>
        <input type="text" id="trip-rename" value="${esc(trip.name)}" maxlength="80"/>
        <div class="trip-progress-line">
          <strong>${p.pct}%</strong>
          <span>${p.done} / ${p.total} items</span>
        </div>
        <div class="bar"><i style="width:${p.pct}%"></i></div>
      </div>

      <div class="btn-row" style="margin-top:0;margin-bottom:12px">
        <button type="button" class="btn btn-ghost" id="trip-reset-checks">Reset ticks</button>
        <button type="button" class="btn btn-danger" id="trip-delete">Delete trip</button>
      </div>

      ${wxPanelHtml(trip)}
      <div class="section-label">Suggested frequencies (tap to insert)</div>
      <p class="yt-note">From C42 sheet / common UK — confirm in current AIP before flight.</p>
      <div class="chip-row trip-freq-suggest">
        ${TRIP_PLAN.suggestedFreqs.map(f =>
          `<button type="button" class="chip" data-trip-suggest="${esc(f.value)}" title="${esc(f.note)}">${esc(f.label)} ${esc(f.value)}</button>`
        ).join('')}
      </div>
      <p class="meta" style="color:var(--muted);font-size:0.75rem;margin:-6px 0 12px">Tap a chip, then tap a frequency field below (or it fills the last focused / first empty suggestable field).</p>

      ${sections.map(sec => {
        const secItems = sec.items;
        const secDone = secItems.filter(it => trip.checks[it.id]).length;
        const isOpen = openSection === sec.id;
        return `
          <div class="trip-section ${isOpen ? 'open' : ''}" data-trip-sec="${esc(sec.id)}">
            <button type="button" class="trip-sec-head" data-trip-toggle="${esc(sec.id)}">
              <span class="trip-sec-title">${esc(sec.title)}</span>
              <span class="chip-count">${secDone}/${secItems.length}</span>
              <span class="trip-sec-chev">${isOpen ? '▾' : '▸'}</span>
            </button>
            <div class="trip-sec-body" ${isOpen ? '' : 'hidden'}>
              <div class="speak-bar" style="margin-bottom:8px">
                <button type="button" class="btn btn-ghost" data-trip-speak-sec="${esc(sec.id)}">🔊 Speak section</button>
                <button type="button" class="btn btn-secondary btn-stop-speak">Stop</button>
              </div>
              ${secItems.map(it => {
                const checked = !!trip.checks[it.id];
                return `
                  <div class="card trip-item ${checked ? 'ticked' : ''}">
                    <label class="trip-check-label">
                      <input type="checkbox" data-trip-check="${esc(it.id)}" ${checked ? 'checked' : ''}/>
                      <div class="trip-item-body">
                        <strong>${esc(it.label)}</strong>
                        <div class="meta">${esc(it.help)}</div>
                      </div>
                    </label>
                    ${(it.fields || []).map(f => `
                      <div class="trip-field">
                        <input type="${f.type || 'text'}"
                          data-trip-field="${esc(f.id)}"
                          data-suggestable="${f.suggestable ? '1' : '0'}"
                          placeholder="${esc(f.placeholder || '')}"
                          value="${esc(trip.fields[f.id] || '')}"
                          autocomplete="off"/>
                      </div>`).join('')}
                    <button type="button" class="btn btn-ghost trip-item-speak" data-trip-speak-item="${esc(it.id)}" title="Speak">🔊</button>
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}

      <div class="btn-row">
        <button type="button" class="btn btn-secondary" id="trip-back-list">All trips</button>
        <button type="button" class="btn btn-primary" id="trip-new-from-edit">New trip</button>
      </div>
      <div class="disclaimer-inline">${esc(TRIP_PLAN.disclaimer)}</div>`;
  }

  function view(ctx) {
    const rid = ctx.route && ctx.route.id ? String(ctx.route.id) : null;
    if (rid) {
      activeId = rid;
      viewMode = 'edit';
      return viewEdit(ctx);
    }
    viewMode = 'list';
    activeId = null;
    return viewList(ctx);
  }

  /* ---------- BIND ---------- */
  let lastSuggestTarget = null;

  function bind(ctx) {
    // List
    const create = document.getElementById('trip-create');
    if (create) {
      const nameIn = document.getElementById('trip-new-name');
      const doCreate = () => {
        const t = newTrip(nameIn && nameIn.value);
        activeId = t.id;
        viewMode = 'edit';
        openSection = TRIP_PLAN.sections[0].id;
        ctx.go('trip', { id: t.id });
      };
      create.addEventListener('click', doCreate);
      if (nameIn) nameIn.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); doCreate(); }
      });
    }

    document.querySelectorAll('[data-trip-open]').forEach(el => {
      el.addEventListener('click', () => {
        activeId = el.dataset.tripOpen;
        viewMode = 'edit';
        openSection = TRIP_PLAN.sections[0].id;
        ctx.go('trip', { id: activeId });
      });
    });

    // Edit
    const trip = activeId ? getTrip(activeId) : null;
    if (!trip) return;

    const rename = document.getElementById('trip-rename');
    if (rename) {
      rename.addEventListener('change', () => {
        const n = rename.value.trim() || 'Untitled trip';
        trip.name = n;
        upsertTrip(trip);
        ctx.titleEl.textContent = n;
      });
      rename.addEventListener('blur', () => {
        const n = rename.value.trim() || 'Untitled trip';
        trip.name = n;
        upsertTrip(trip);
      });
    }

    document.querySelectorAll('[data-trip-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tripToggle;
        openSection = openSection === id ? null : id;
        ctx.go('trip', { id: activeId });
      });
    });

    document.querySelectorAll('[data-trip-check]').forEach(cb => {
      cb.addEventListener('change', () => {
        trip.checks[cb.dataset.tripCheck] = cb.checked;
        upsertTrip(trip);
        // update progress without full re-render of scroll if possible — full re-render for consistency
        const scrollY = window.scrollY;
        ctx.go('trip', { id: activeId });
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
      });
    });

    document.querySelectorAll('[data-trip-field]').forEach(inp => {
      inp.addEventListener('focus', () => {
        if (inp.dataset.suggestable === '1') lastSuggestTarget = inp;
      });
      const saveField = () => {
        trip.fields[inp.dataset.tripField] = inp.value;
        upsertTrip(trip);
      };
      inp.addEventListener('change', saveField);
      inp.addEventListener('blur', saveField);
    });

    document.querySelectorAll('[data-trip-suggest]').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.dataset.tripSuggest;
        let target = lastSuggestTarget;
        if (!target || !document.body.contains(target)) {
          target = document.querySelector('[data-suggestable="1"][value=""]') ||
            document.querySelector('[data-suggestable="1"]');
        }
        if (target) {
          target.value = val;
          trip.fields[target.dataset.tripField] = val;
          upsertTrip(trip);
          target.focus();
          target.classList.add('trip-field-flash');
          setTimeout(() => target.classList.remove('trip-field-flash'), 600);
        }
      });
    });

    document.querySelectorAll('[data-trip-speak-sec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = TRIP_PLAN.sections.find(s => s.id === btn.dataset.tripSpeakSec);
        if (!sec) return;
        const body = sec.items.map((it, i) => {
          const bits = [`Item ${i + 1}. ${it.label}. ${it.help}`];
          (it.fields || []).forEach(f => {
            const v = trip.fields[f.id];
            if (v) bits.push(`${f.placeholder || f.id}: ${v}.`);
          });
          return bits.join(' ');
        }).join(' ');
        AudioSpeak.speak(`${sec.speakIntro} ${body}`);
      });
    });

    document.querySelectorAll('[data-trip-speak-item]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const it = allItems().find(x => x.id === btn.dataset.tripSpeakItem);
        if (!it) return;
        const filled = (it.fields || []).map(f => {
          const v = trip.fields[f.id];
          return v ? `${f.placeholder || f.id}: ${v}` : '';
        }).filter(Boolean).join('. ');
        AudioSpeak.speak(`${it.label}. ${it.help}${filled ? '. ' + filled : ''}`);
      });
    });

    document.querySelectorAll('.btn-stop-speak').forEach(btn => {
      btn.addEventListener('click', () => AudioSpeak.stop());
    });

    const reset = document.getElementById('trip-reset-checks');
    if (reset) reset.addEventListener('click', () => {
      if (!confirm('Reset all checklist ticks for this trip? Field notes are kept.')) return;
      trip.checks = {};
      upsertTrip(trip);
      ctx.go('trip', { id: activeId });
    });

    const del = document.getElementById('trip-delete');
    if (del) del.addEventListener('click', () => {
      if (!confirm('Delete this trip draft permanently?')) return;
      deleteTrip(trip.id);
      activeId = null;
      viewMode = 'list';
      ctx.go('trip', {}, { replace: true });
    });

    const back = document.getElementById('trip-back-list');
    if (back) back.addEventListener('click', () => {
      viewMode = 'list';
      activeId = null;
      if (typeof ctx.goBack === 'function') ctx.goBack();
      else ctx.go('trip', {}, { replace: true });
    });

    const neu = document.getElementById('trip-new-from-edit');
    if (neu) neu.addEventListener('click', () => {
      viewMode = 'list';
      activeId = null;
      ctx.go('trip', {}, { replace: true });
      requestAnimationFrame(() => {
        const inp = document.getElementById('trip-new-name');
        if (inp) inp.focus();
      });
    });
    // Live weather + cross-links
    document.querySelectorAll('#main [data-go]').forEach(el => {
      el.addEventListener('click', () => ctx.go(el.dataset.go));
    });
    const wxBtn = document.getElementById('wx-refresh');
    if (wxBtn) {
      const run = () => {
        const icao = ((document.getElementById('wx-icao') || {}).value || '').trim().toUpperCase();
        fetchWx(icao);
      };
      wxBtn.addEventListener('click', run);
      const inp = document.getElementById('wx-icao');
      if (inp && inp.value.trim().length === 4) setTimeout(run, 80);
    }

  }

  function openList() {
    viewMode = 'list';
    activeId = null;
  }

  return { view, bind, openList, KEY, createFromAirfield, fetchWx };
})();
