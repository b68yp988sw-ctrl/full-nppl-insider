/* YouTube embed helpers — iframe with thumbnail fallback; never rehost */
const YTEmbed = {
  card(v) {
    const id = v.id;
    const title = esc(v.title);
    const channel = esc(v.channel);
    const topic = v.topic ? `<div class="yt-topic">${esc(v.topic)}</div>` : '';
    return `
      <div class="yt-card" data-yt="${esc(id)}">
        <div class="yt-frame-wrap">
          <iframe
            class="yt-iframe"
            src="https://www.youtube-nocookie.com/embed/${esc(id)}"
            title="${title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
          <div class="yt-fallback">
            <a href="https://www.youtube.com/watch?v=${esc(id)}" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="${title}" loading="lazy"/>
              <span class="yt-play">▶ Open on YouTube</span>
            </a>
          </div>
        </div>
        <div class="yt-meta">
          <strong>${title}</strong>
          <div class="meta">${channel}</div>
          ${topic}
          <a class="yt-open" href="https://www.youtube.com/watch?v=${esc(id)}" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a>
        </div>
      </div>`;
  },
  section(list, heading) {
    if (!list || !list.length) return '';
    return `
      <div class="section-label">${esc(heading || 'Video references')}</div>
      <p class="yt-note">${esc((typeof VIDEOS_DATA !== 'undefined' && VIDEOS_DATA.note) || 'Third-party videos; confirm technique with your instructor.')}</p>
      ${list.map(v => this.card(v)).join('')}`;
  }
};
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

YTEmbed.enableFallbacks = function () {
  document.querySelectorAll('.yt-frame-wrap').forEach(wrap => {
    const iframe = wrap.querySelector('.yt-iframe');
    if (!iframe) return;
    // If embed is blocked, user still has Open on YouTube + thumbnail fallback toggle
    iframe.addEventListener('error', () => wrap.classList.add('show-fallback'));
    // Some browsers never fire error on iframe; provide a manual hint via long load
    setTimeout(() => {
      try {
        // cannot read cross-origin; leave iframe. Fallback link always visible below.
      } catch (e) {
        wrap.classList.add('show-fallback');
      }
    }, 8000);
  });
};
