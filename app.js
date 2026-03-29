const EMOJI_FALLBACK = { focusflow:'⏱', clipboardpro:'📋', quietmode:'🔕', batteryguard:'🔋', swiftlaunch:'🚀', nightshiftpro:'🌙' };
const RECENT_VIDEOS = [
  { title:'맥 앱 혼자 만들기 — 처음부터 배포까지', date:'2026-03-20' },
  { title:'1인 개발자가 마케팅하는 법', date:'2026-03-13' },
  { title:'SwiftUI로 사이드바 앱 만들기', date:'2026-03-06' },
  { title:'유튜브 + 개발 병행 6개월 후기', date:'2026-02-27' },
];

async function loadApps() {
  const apps = await fetch('data/apps.json').then(r=>r.json());

  // Hero floating pills
  const heroPillDurations = [3.2, 3.8, 4.1, 3.5, 4.4, 3.0];
  const heroPillDelays    = [0, 0.4, 0.8, 1.2, 0.6, 1.5];
  document.getElementById('hero-apps').innerHTML = apps.map((app, i) => {
    const href = app.buyUrl || app.downloadUrl || '#apps';
    return `
    <a class="hero-app-pill" href="${href}"
       style="animation-duration:${heroPillDurations[i]}s; animation-delay:${heroPillDelays[i]}s;">
      <div class="hero-app-pill-icon">
        <img src="${app.icon}" alt="${app.name}"
             onerror="this.parentElement.textContent='${EMOJI_FALLBACK[app.id]||'📦'}'" />
      </div>
      <span class="hero-app-pill-name">${app.name}</span>
    </a>`;
  }).join('');

  // fadeUp 완료 후 floatBob 시작 (0.58s delay + 0.6s duration + 0.1s 여유 = 1.28s)
  setTimeout(() => {
    document.querySelectorAll('.hero-app-pill').forEach((pill, i) => {
      pill.style.animationDuration = heroPillDurations[i] + 's';
      pill.style.animationDelay = heroPillDelays[i] + 's';
      pill.classList.add('bob-ready');
    });
  }, 1280);

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
