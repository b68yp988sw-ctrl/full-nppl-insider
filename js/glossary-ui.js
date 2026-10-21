/* Abbreviations / mnemonics A–Z glossary UI */
const GlossaryUI = (() => {
  const DISCLAIMER =
    'Study aid only — confirm meanings with your instructor, current AIP, and CAP 413. Not official CAA material.';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function data() {
    return (typeof NPPL_GLOSSARY !== 'undefined' && Array.isArray(NPPL_GLOSSARY))
      ? NPPL_GLOSSARY
      : [];
  }

  function letterOf(term) {
    const ch = String(term || '').trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  function filtered(q, cat) {
    const needle = (q || '').trim().toLowerCase();
    return data().filter(e => {
      if (cat && cat !== 'all') {
        if (cat === 'abbr' && e.category === 'mnemonic') return false;
        if (cat === 'mnemonic' && e.category !== 'mnemonic') return false;
      }
      if (!needle) return true;
      return (
        e.term.toLowerCase().includes(needle) ||
        e.meaning.toLowerCase().includes(needle)
      );
    });
  }

  function view(ctx) {
    ctx.setNav('theory');
    ctx.titleEl.textContent = 'Abbreviations';
    ctx.btnBack.hidden = false;
    /* back: goBack() */

    const initialQ = (ctx.route && ctx.route.q) ? String(ctx.route.q) : '';
    const list = filtered(initialQ, 'all');

    return `
      <p class="meta gloss-intro">UK NPPL · microlight · FRTOL — A–Z guide to shortened words &amp; mnemonics</p>
      <div class="gloss-search-wrap sticky-tools">
        <input type="search" id="gloss-q" class="search-input" placeholder="Filter terms or meanings…"
          value="${esc(initialQ)}" autocomplete="off" enterkeyhint="search" />
        <div class="chip-row" id="gloss-chips" style="margin-bottom:0;margin-top:10px">
          <button type="button" class="chip active" data-gloss-cat="all">All</button>
          <button type="button" class="chip" data-gloss-cat="abbr">Abbreviations</button>
          <button type="button" class="chip" data-gloss-cat="mnemonic">Mnemonics</button>
        </div>
      </div>
      <div id="gloss-count" class="meta gloss-count">${list.length} terms</div>
      <div id="gloss-list">${renderList(list)}</div>
      <div class="disclaimer-inline">${DISCLAIMER}</div>`;
  }

  function renderList(list) {
    if (!list.length) {
      return `<div class="empty-state">No matches. Try another spelling or clear the filter.</div>`;
    }
    let html = '';
    let lastLetter = null;
    for (const e of list) {
      const L = letterOf(e.term);
      if (L !== lastLetter) {
        lastLetter = L;
        html += `<div class="gloss-letter" id="gloss-letter-${esc(L)}">${esc(L)}</div>`;
      }
      const tag = e.category === 'mnemonic'
        ? '<span class="gloss-tag mnemonic">Mnemonic</span>'
        : '<span class="gloss-tag abbr">Abbr</span>';
      html += `
        <div class="gloss-row" data-gloss-term="${esc(e.term)}">
          <div class="gloss-row-main">
            <div class="gloss-term">${esc(e.term)} ${tag}</div>
            <div class="gloss-meaning">(${esc(e.meaning)})</div>
          </div>
          <button type="button" class="icon-btn gloss-speak" data-gloss-speak="${esc(e.term)}"
            aria-label="Speak ${esc(e.term)}" title="Speak">🔊</button>
        </div>`;
    }
    return html;
  }

  function bind(ctx) {
    const input = document.getElementById('gloss-q');
    const listEl = document.getElementById('gloss-list');
    const countEl = document.getElementById('gloss-count');
    let cat = 'all';
    let timer = null;

    function refresh() {
      const q = input ? input.value : '';
      const list = filtered(q, cat);
      if (countEl) countEl.textContent = list.length + ' terms';
      if (listEl) listEl.innerHTML = renderList(list);
      wireSpeak();
    }

    if (input) {
      input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(refresh, 120);
      });
      // Prefill focus when opened from search with a query
      if (input.value) {
        try { input.focus(); input.setSelectionRange(input.value.length, input.value.length); } catch (_) {}
      }
    }

    document.querySelectorAll('[data-gloss-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cat = btn.dataset.glossCat || 'all';
        document.querySelectorAll('[data-gloss-cat]').forEach(b =>
          b.classList.toggle('active', b === btn)
        );
        refresh();
      });
    });

    function wireSpeak() {
      document.querySelectorAll('[data-gloss-speak]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const term = btn.dataset.glossSpeak;
          const entry = data().find(e => e.term === term);
          if (!entry) return;
          const text = entry.term + '. ' + entry.meaning;
          if (typeof AudioSpeak !== 'undefined') AudioSpeak.speak(text);
        });
      });
    }
    wireSpeak();
  }

  return { view, bind, filtered, data };
})();
