/* Saved airfield quick cards — localStorage CRUD */
const AirfieldsUI = (() => {
  function key() {
    return (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.storageKey) || 'full-nppl-airfields-v1';
  }

  function seed() {
    return (typeof AIRFIELDS_SEED !== 'undefined' ? AIRFIELDS_SEED : []).map(a => ({ ...a, freqs: { ...(a.freqs || {}) } }));
  }

  function seedVersion() {
    return (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.seedVersion) || 1;
  }

  /* Storage key bumped (v2 -> v3) so existing users get the new seed cards.
     Carried over from older keys (read-only; old keys are never written, so a rollback still works):
     - custom cards the user added;
     - seed cards the user edited (detected by comparing with the old live v2 seed);
     - seed cards the user deleted stay deleted.
     Unedited old seed cards are replaced by the updated, source-checked versions. */
  const V2_SEED_SIG = {"egtb":"1whnoik","egld":"1g2lcqr","egtr":"1k3ej0d","eglm":"1f9di2a","egtf":"1epwbm3","eghp":"jredad","turweston":"bcf7zi","hinton":"d920vn","bicester":"1irt0tv","amersham-local":"ucttok"};
  const SIG_FIELDS = ['icao', 'name', 'area', 'runway', 'ppr', 'notes', 'circuit', 'tags'];
  function sig(a) {
    const f = a.freqs || {};
    const str = JSON.stringify(SIG_FIELDS.map(k => String(a[k] == null ? '' : a[k]).trim())
      .concat(['afis', 'atis', 'other'].map(k => String(f[k] == null ? '' : f[k]).trim())));
    let x = 5381;
    for (let i = 0; i < str.length; i++) x = ((x * 33) ^ str.charCodeAt(i)) >>> 0;
    return x.toString(36);
  }

  function migrate() {
    const base = seed();
    const legacy = (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.legacyKeys) || [];
    const seen = new Set();
    const extras = [];
    const edited = {};
    const deleted = new Set();
    legacy.forEach(k => {
      try {
        const old = JSON.parse(localStorage.getItem(k) || 'null');
        const items = (old && old.items) || [];
        if (k === 'full-nppl-airfields-v2' && items.length) {
          const have = new Set(items.map(a => a && a.id));
          Object.keys(V2_SEED_SIG).forEach(id => { if (!have.has(id)) deleted.add(id); });
        }
        items.forEach(a => {
          if (!a || !a.id || seen.has(a.id)) return;
          seen.add(a.id);
          if (V2_SEED_SIG[a.id]) {
            if (sig(a) !== V2_SEED_SIG[a.id]) edited[a.id] = a;
          } else if (!base.some(b => b.id === a.id)) {
            extras.push(a);
          }
        });
      } catch (_) { /* ignore */ }
    });
    const items = base.filter(a => !deleted.has(a.id)).map(a => edited[a.id] || a);
    return { items: extras.concat(items), seeded: true, seedVersion: seedVersion() };
  }

  function load() {
    try {
      const raw = localStorage.getItem(key());
      if (!raw) {
        const s = migrate();
        localStorage.setItem(key(), JSON.stringify(s));
        return s;
      }
      const data = JSON.parse(raw);
      if (!data.items || !data.items.length) {
        data.items = seed();
        data.seeded = true;
        data.seedVersion = seedVersion();
        localStorage.setItem(key(), JSON.stringify(data));
      } else if ((data.seedVersion || 0) < seedVersion()) {
        const have = new Set(data.items.map(a => a.id));
        seed().forEach(a => { if (!have.has(a.id)) data.items.push(a); });
        data.seedVersion = seedVersion();
        localStorage.setItem(key(), JSON.stringify(data));
      }
      return data;
    } catch {
      return { items: seed(), seeded: true };
    }
  }

  function save(data) {
    localStorage.setItem(key(), JSON.stringify(data));
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function all() {
    return load().items || [];
  }

  function get(id) {
    return all().find(a => a.id === id) || null;
  }

  function upsert(card) {
    const data = load();
    const i = data.items.findIndex(a => a.id === card.id);
    if (i >= 0) data.items[i] = card;
    else data.items.unshift(card);
    save(data);
  }

  function remove(id) {
    const data = load();
    data.items = data.items.filter(a => a.id !== id);
    save(data);
  }

  function search(q) {
    const s = (q || '').trim().toLowerCase();
    if (!s) return all();
    return all().filter(a => {
      const hay = [a.icao, a.name, a.area, a.runway, a.ppr, a.notes, a.tags,
        a.freqs && a.freqs.afis, a.freqs && a.freqs.atis, a.freqs && a.freqs.other]
        .join(' ').toLowerCase();
      return hay.includes(s);
    });
  }

  function blank() {
    return {
      id: 'af_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
      icao: '',
      name: '',
      area: '',
      freqs: { afis: '', atis: '', other: '' },
      runway: '',
      ppr: '',
      notes: '',
      tags: ''
    };
  }

  let mode = 'list'; // list | edit
  let editId = null;
  let filter = '';

  function view(ctx) {
    ctx.setNav('plan');
    ctx.titleEl.textContent = 'Airfields';
    const confirmLbl = 'Confirm with PPR / instructor before flight — study aid only.';
    ctx.btnBack.hidden = false;

    const rid = ctx.route && ctx.route.id ? String(ctx.route.id) : null;
    if (rid) {
      editId = rid;
      mode = 'edit';
      return viewEdit(ctx);
    }
    mode = 'list';
    editId = null;
    return viewList(ctx);
  }

  function viewList(ctx) {
    const confirmLbl = 'Confirm with PPR / instructor before flight — study aid only.';
    const list = search(filter);
    const disc = (typeof AIRFIELDS_META !== 'undefined' && AIRFIELDS_META.disclaimer) || '';
    return `
      <div class="disclaimer-inline">${esc(disc)}</div>
      <p class="meta" style="margin:10px 0 12px">${all().length} quick cards · runway, frequency, PPR · editable offline</p>
      <div class="af-tools">
        <input type="search" id="af-q" placeholder="Search ICAO, name, area…" aria-label="Search airfields" value="${esc(filter)}" />
        <button type="button" class="btn btn-primary" id="af-new" aria-label="Add airfield card">＋ Add</button>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        <button type="button" class="chip" data-go="trip">Plan a trip</button>
        <button type="button" class="chip" data-go="flight-prep">Flight prep</button>
      </div>
      ${list.map(a => `
        <div class="card card-tap" data-af-open="${esc(a.id)}">
          <div class="meta">${esc(a.icao || '—')} · ${esc(a.area || '')}</div>
          <h3>${esc(a.name || 'Untitled')}</h3>
          <div class="meta">${esc((a.freqs && (a.freqs.afis || a.freqs.other)) || 'No freq yet')} · ${esc((a.ppr || '').slice(0, 48))}</div>
        </div>`).join('') || '<div class="empty-state">No airfields match. Add one.</div>'}
      <button type="button" class="btn btn-secondary" id="af-reseed" style="width:100%;margin-top:8px">Restore seed cards (keeps your extras)</button>
    `;
  }

  function viewEdit(ctx) {
    const a = get(editId) || blank();
    if (!get(editId)) editId = a.id;
    ctx.titleEl.textContent = a.name || 'Edit airfield';
    return `
      <div class="disclaimer-inline">Confirm all freqs / PPR / runway with AIP &amp; airfield before flight.</div>
      <div class="card">
        <label class="meta">ICAO</label>
        <input class="search-input" id="af-icao" value="${esc(a.icao)}" maxlength="4" style="text-transform:uppercase;margin-bottom:8px" />
        <label class="meta">Name</label>
        <input class="search-input" id="af-name" value="${esc(a.name)}" style="margin-bottom:8px" />
        <label class="meta">Area</label>
        <input class="search-input" id="af-area" value="${esc(a.area)}" style="margin-bottom:8px" />
        <label class="meta">A/G · AFIS · ATC freq</label>
        <input class="search-input" id="af-afis" value="${esc(a.freqs && a.freqs.afis)}" style="margin-bottom:8px" />
        <label class="meta">ATIS / other</label>
        <input class="search-input" id="af-atis" value="${esc(a.freqs && a.freqs.atis)}" placeholder="ATIS" style="margin-bottom:8px" />
        <input class="search-input" id="af-other" value="${esc(a.freqs && a.freqs.other)}" placeholder="Other freqs" style="margin-bottom:8px" />
        <label class="meta">Runway</label>
        <textarea class="search-input" id="af-rwy" rows="2" style="margin-bottom:8px">${esc(a.runway)}</textarea>
        <label class="meta">PPR</label>
        <textarea class="search-input" id="af-ppr" rows="2" style="margin-bottom:8px">${esc(a.ppr)}</textarea>
        <label class="meta">Notes</label>
        <textarea class="search-input" id="af-notes" rows="3" style="margin-bottom:8px">${esc(a.notes)}</textarea>
        <label class="meta">Tags (search)</label>
        <input class="search-input" id="af-tags" value="${esc(a.tags)}" />
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="af-save">Save</button>
        <button type="button" class="btn btn-secondary" id="af-speak">🔊 Speak</button>
      </div>
      <button type="button" class="btn btn-danger" id="af-del" style="width:100%;margin-top:8px">Delete card</button>
      <button type="button" class="btn btn-secondary" id="af-to-trip" style="width:100%;margin-top:8px">Use in Plan a trip</button>
    `;
  }

  function bind(ctx) {
    if (mode === 'edit') {
      const saveBtn = document.getElementById('af-save');
      if (saveBtn) saveBtn.addEventListener('click', () => {
        const card = {
          id: editId,
          icao: (document.getElementById('af-icao').value || '').trim().toUpperCase(),
          name: (document.getElementById('af-name').value || '').trim(),
          area: (document.getElementById('af-area').value || '').trim(),
          freqs: {
            afis: (document.getElementById('af-afis').value || '').trim(),
            atis: (document.getElementById('af-atis').value || '').trim(),
            other: (document.getElementById('af-other').value || '').trim()
          },
          runway: (document.getElementById('af-rwy').value || '').trim(),
          ppr: (document.getElementById('af-ppr').value || '').trim(),
          notes: (document.getElementById('af-notes').value || '').trim(),
          tags: (document.getElementById('af-tags').value || '').trim()
        };
        upsert(card);
        mode = 'list';
        editId = null;
        ctx.go('airfields', {}, { replace: true });
      });
      const del = document.getElementById('af-del');
      if (del) del.addEventListener('click', () => {
        if (confirm('Delete this airfield card?')) {
          remove(editId);
          mode = 'list';
          editId = null;
          ctx.go('airfields', {}, { replace: true });
        }
      });
      const sp = document.getElementById('af-speak');
      if (sp) sp.addEventListener('click', () => {
        const a = {
          icao: document.getElementById('af-icao').value,
          name: document.getElementById('af-name').value,
          freqs: { afis: document.getElementById('af-afis').value },
          ppr: document.getElementById('af-ppr').value,
          runway: document.getElementById('af-rwy').value,
          notes: document.getElementById('af-notes').value
        };
        const text = [a.name, a.icao, 'Frequency ' + (a.freqs.afis || ''), a.ppr, a.runway, a.notes].filter(Boolean).join('. ');
        if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
      });
      const toTrip = document.getElementById('af-to-trip');
      if (toTrip) toTrip.addEventListener('click', () => {
        const name = (document.getElementById('af-name').value || document.getElementById('af-icao').value || 'Trip').trim();
        const icao = (document.getElementById('af-icao').value || '').trim().toUpperCase();
        let tripId = null;
        try {
          if (typeof TripUI !== 'undefined' && TripUI.createFromAirfield) {
            const t = TripUI.createFromAirfield({ name, icao, freq: document.getElementById('af-afis').value });
            tripId = t && t.id;
          }
        } catch (_) { /* ignore */ }
        if (tripId) ctx.go('trip', { id: tripId });
        else ctx.go('trip');
      });
      return;
    }

    const q = document.getElementById('af-q');
    if (q) {
      let t;
      q.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          filter = q.value;
          ctx.go('airfields');
        }, 150);
      });
    }
    document.querySelectorAll('[data-af-open]').forEach(el => {
      el.addEventListener('click', () => {
        editId = el.dataset.afOpen;
        mode = 'edit';
        ctx.go('airfields', { id: editId });
      });
    });
    const neu = document.getElementById('af-new');
    if (neu) neu.addEventListener('click', () => {
      const b = blank();
      upsert(b);
      editId = b.id;
      mode = 'edit';
      ctx.go('airfields', { id: editId });
    });
    const reseed = document.getElementById('af-reseed');
    if (reseed) reseed.addEventListener('click', () => {
      const data = load();
      const byId = Object.fromEntries(data.items.map(a => [a.id, a]));
      seed().forEach(s => {
        if (!byId[s.id]) data.items.push(s);
      });
      save(data);
      ctx.go('airfields');
    });
    document.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', () => ctx.go(el.dataset.go));
    });
  }

  function resetMode() {
    mode = 'list';
    editId = null;
  }

  return { view, bind, search, all, get, resetMode, load };
})();
if (typeof globalThis !== 'undefined') globalThis.AirfieldsUI = AirfieldsUI;
