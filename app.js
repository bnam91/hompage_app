const EMOJI_FALLBACK = { focusflow:'⏱', clipboardpro:'📋', quietmode:'🔕', batteryguard:'🔋', swiftlaunch:'🚀', nightshiftpro:'🌙' };
const RECENT_VIDEOS = [
  { title:'맥 앱 혼자 만들기 — 처음부터 배포까지', date:'2026-03-20' },
  { title:'1인 개발자가 마케팅하는 법', date:'2026-03-13' },
  { title:'SwiftUI로 사이드바 앱 만들기', date:'2026-03-06' },
  { title:'유튜브 + 개발 병행 6개월 후기', date:'2026-02-27' },
];

async function loadApps() {
  const apps = await fetch('data/apps.json').then(r=>r.json());
  document.getElementById('app-grid').innerHTML = apps.map(app=>`
    <a class="app-card card-hidden" href="${app.buyUrl||app.downloadUrl||'#'}">
      <div class="app-icon"><img src="${app.icon}" alt="${app.name}" onerror="this.parentElement.textContent='${EMOJI_FALLBACK[app.id]||'📦'}'" /></div>
      <div class="app-info">
        <div class="app-name">${app.name}</div>
        <div class="app-tagline">${app.tagline}</div>
        <div class="app-footer"><span class="app-badge">${app.price==='free'?'free':'paid'}</span><span class="app-arrow">→</span></div>
      </div>
    </a>`).join('');
  initEntrance('.card-hidden', 'card-visible', 0.1, 70);
}

function loadVideos() {
  document.getElementById('yt-list').innerHTML = RECENT_VIDEOS.map(v=>`
    <li class="yt-item yt-hidden"><span class="yt-title">${v.title}</span><span class="yt-date">${v.date}</span></li>`).join('');
  initEntrance('.yt-hidden', 'yt-visible', 0.2, 50);
}

function initEntrance(hiddenSelector, visibleClass, threshold, staggerMs) {
  const els = document.querySelectorAll(hiddenSelector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const i = parseInt(el.dataset.entranceIndex, 10);
      setTimeout(() => {
        el.classList.remove(hiddenSelector.slice(1));
        el.classList.add(visibleClass);
      }, i * staggerMs);
      observer.unobserve(el);
    });
  }, { threshold, rootMargin: '0px 0px -30px 0px' });

  els.forEach((el, i) => {
    el.dataset.entranceIndex = i;
    observer.observe(el);
  });
}

loadApps();
loadVideos();
