async function loadApps() {
  const res = await fetch('data/apps.json');
  const apps = await res.json();

  const grid = document.getElementById('app-grid');
  grid.innerHTML = apps.map(app => `
    <a class="app-item" href="${app.buyUrl || app.downloadUrl || '#'}" aria-label="${app.name} - ${app.tagline}">
      <div class="app-item-left">
        <span class="app-item-name">${app.name}</span>
        <span class="app-item-tagline">${app.tagline}</span>
      </div>
      <div class="app-item-right">
        <span class="app-badge">${app.price === 'free' ? '무료' : '유료'}</span>
        <span class="app-arrow">→</span>
      </div>
    </a>
  `).join('');
}

loadApps();
