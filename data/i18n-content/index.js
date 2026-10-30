/* Content i18n registry — lessons, flashcards, exams (and optional extras).
   Language packs assign onto globalThis.I18N_CONTENT[lang].
   English falls back to LESSONS_DATA / FLASHCARDS_DATA / QUESTIONS_DATA. */
const I18N_CONTENT = globalThis.I18N_CONTENT || { en: null };
globalThis.I18N_CONTENT = I18N_CONTENT;

const ContentI18n = (() => {
  function lang() {
    return (typeof I18n !== 'undefined' && I18n.getLang()) || 'en';
  }

  function pack(code) {
    const L = code || lang();
    if (L === 'en') return null;
    return (I18N_CONTENT && I18N_CONTENT[L]) || null;
  }

  function lesson(base) {
    if (!base) return base;
    const p = pack();
    const over = p && p.lessons && p.lessons[base.id];
    if (!over) return base;
    return Object.assign({}, base, {
      title: over.title != null ? over.title : base.title,
      chapter: over.chapter != null ? over.chapter : base.chapter,
      body: over.body != null ? over.body : base.body,
      speakExtra: over.speakExtra != null ? over.speakExtra : base.speakExtra
    });
  }

  function card(base) {
    if (!base) return base;
    const p = pack();
    const over = p && p.flashcards && p.flashcards[base.id];
    if (!over) return base;
    return Object.assign({}, base, {
      q: over.q != null ? over.q : base.q,
      a: over.a != null ? over.a : base.a
    });
  }

  function question(base) {
    if (!base) return base;
    const p = pack();
    const over = p && p.questions && p.questions[base.id];
    if (!over) return base;
    return Object.assign({}, base, {
      q: over.q != null ? over.q : base.q,
      choices: (Array.isArray(over.choices) && Array.isArray(base.choices) && over.choices.length === base.choices.length) ? over.choices : base.choices,
      exp: over.exp != null ? over.exp : base.exp
    });
  }

  function glossaryDef(base) {
    if (!base) return base;
    const p = pack();
    const over = p && p.glossary && p.glossary[base.id || base.term];
    if (!over) return base;
    return Object.assign({}, base, over);
  }

  return { lesson, card, question, glossaryDef, pack, lang };
})();

if (typeof globalThis !== 'undefined') globalThis.ContentI18n = ContentI18n;
