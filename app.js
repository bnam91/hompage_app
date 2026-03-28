const EMOJI_FALLBACK = {
  focusflow: '⏱',
  clipboardpro: '📋',
  quietmode: '🔕',
  batteryguard: '🔋',
  swiftlaunch: '🚀',
  nightshiftpro: '🌙',
};

async function loadApps() {
  const res = await fetch('data/apps.json');
  const apps = await res.json();

  document.getElementById('app-count').textContent = apps.length;

  const grid = document.getElementById('app-grid');
  grid.innerHTML = apps.map(app => `
    <a class="app-card" href="${app.buyUrl || app.downloadUrl || '#'}">
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
        <div class="app-card-footer">
          <div class="app-tags">
            ${app.tags.map(tag => `<span class="tag tag-${tag}">${tag}</span>`).join('')}
          </div>
          <span class="app-cta">${app.price === 'free' ? 'Free' : 'Get'}</span>
        </div>
      </div>
    </a>
  `).join('');
}

loadApps();
