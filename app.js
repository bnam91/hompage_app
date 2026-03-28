const EMOJI_FALLBACK = {
  focusflow:    '⏱',
  clipboardpro: '📋',
  quietmode:    '🔕',
  batteryguard: '🔋',
  swiftlaunch:  '🚀',
  nightshiftpro:'🌙',
};

const RECENT_VIDEOS = [
  { title: '맥 앱 혼자 만들기 — 처음부터 배포까지', date: '2026-03-20' },
  { title: '1인 개발자가 마케팅하는 법', date: '2026-03-13' },
  { title: 'SwiftUI로 사이드바 앱 만들기', date: '2026-03-06' },
  { title: '유튜브 + 개발 병행 6개월 후기', date: '2026-02-27' },
];

async function loadApps() {
  const res = await fetch('data/apps.json');
  const apps = await res.json();

  const grid = document.getElementById('app-grid');
  grid.innerHTML = apps.map(app => `
    <a class="app-card" href="${app.buyUrl || app.downloadUrl || '#'}" aria-label="${app.name} - ${app.tagline}">
      <div class="app-icon">
        <img
          src="${app.icon}"
          alt="${app.name}"
          onerror="this.parentElement.textContent='${EMOJI_FALLBACK[app.id] || '📦'}'"
        />
      </div>
      <div class="app-info">
        <div class="app-name">${app.name}</div>
        <div class="app-tagline">${app.tagline}</div>
        <div class="app-footer">
          <span class="app-badge">${app.price === 'free' ? 'free' : 'paid'}</span>
          <span class="app-arrow">→</span>
        </div>
      </div>
    </a>
  `).join('');
}

function loadVideos() {
  const list = document.getElementById('yt-list');
  list.innerHTML = RECENT_VIDEOS.map(v => `
    <li class="yt-item">
      <span class="yt-title">${v.title}</span>
      <span class="yt-date">${v.date}</span>
    </li>
  `).join('');
}

loadApps();
loadVideos();
