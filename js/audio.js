/* Web Speech API — voice follows I18n language (en-GB, fr-FR, …) */
const AudioSpeak = (() => {
  let utter = null;
  let speaking = false;

  function prefs() {
    if (typeof I18n !== 'undefined' && I18n.ttsPrefs) return I18n.ttsPrefs();
    return ['en-GB', 'en-US', 'en'];
  }

  function targetLang() {
    if (typeof I18n !== 'undefined' && I18n.ttsLang) return I18n.ttsLang();
    return 'en-GB';
  }

  function pickVoice() {
    const voices = speechSynthesis.getVoices() || [];
    const list = prefs();
    // Exact / prefix match in preference order
    for (const want of list) {
      const found = voices.find(v => v.lang && v.lang.toLowerCase() === want.toLowerCase());
      if (found) return found;
    }
    for (const want of list) {
      const prefix = want.split('-')[0].toLowerCase();
      // Prefer Portugal over Brazil for pt when asking pt-PT first already failed
      const found = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
      if (found) return found;
    }
    // Soft fallback: any voice
    return voices[0] || null;
  }

  function stop() {
    speechSynthesis.cancel();
    speaking = false;
    utter = null;
    document.querySelectorAll('[data-speak-state]').forEach(el => {
      el.dataset.speakState = 'idle';
    });
  }

  function speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) {
      const msg = (typeof I18n !== 'undefined' && I18n.t)
        ? I18n.t('audio.unsupported')
        : 'Speech synthesis is not supported in this browser.';
      alert(msg);
      return;
    }
    stop();
    const clean = String(text || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return;
    utter = new SpeechSynthesisUtterance(clean);
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    // Always set lang so OS can fallback even without a matching voice
    utter.lang = (voice && voice.lang) || targetLang();
    utter.rate = opts.rate || 0.92;
    utter.pitch = 1;
    utter.onend = () => { speaking = false; if (opts.onEnd) opts.onEnd(); };
    utter.onerror = () => { speaking = false; };
    speaking = true;
    const kick = () => speechSynthesis.speak(utter);
    if (!speechSynthesis.getVoices().length) {
      speechSynthesis.onvoiceschanged = () => {
        const v = pickVoice();
        if (v) {
          utter.voice = v;
          utter.lang = v.lang || targetLang();
        } else {
          utter.lang = targetLang();
        }
        kick();
      };
      setTimeout(kick, 200);
    } else {
      kick();
    }
  }

  function isSpeaking() { return speaking || speechSynthesis.speaking; }

  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  return { speak, stop, isSpeaking, pickVoice, targetLang };
})();
