(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const intro = document.getElementById('intro');
  const garden = document.getElementById('garden');
  const startBtn = document.getElementById('startBtn');
  const field = document.getElementById('field');
  const messageBox = document.getElementById('messageBox');
  const popup = document.getElementById('popup');
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');

  const PHRASES = [
    "Mi lugar favorito siempre será a tu lado. 💛",
    "Tu sonrisa hace bonito cualquier día.",
    "Si pudiera elegir otra vez, volvería a elegirte.",
    "Para mi princesa, con todo mi corazón. 🌻",
    "Contigo todo se siente un poquito más bonito.",
    "Eres la razón de mis mejores sonrisas. ✨",
    "Cada flor de este jardín te pertenece. 💛"
  ];

  // ---------- START TRANSITION ----------
  startBtn.addEventListener('click', () => {
    intro.classList.add('hidden');
    garden.classList.remove('hidden');
    if (!reduced) buildGarden();
    else buildGardenStatic();
    revealMessages();
  });

  // ---------- BUILD SCENE ----------
  function rand(min, max) { return Math.random() * (max - min) + min; }

  function buildGarden() {
    const flowerEmojis = ['🌻', '🌼'];
    const count = window.innerWidth < 480 ? 14 : 20;

    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'flower';
      const depth = Math.random(); // 0 far, 1 near
      const size = 26 + depth * 34; // 26-60px
      const left = rand(2, 94);
      const stemH = 40 + depth * 70;
      const delay = rand(0, 1.6);
      const windDur = rand(3.5, 6);

      f.style.left = left + 'vw';
      f.style.fontSize = size + 'px';
      f.style.zIndex = Math.round(depth * 10);
      f.style.opacity = 0.55 + depth * 0.45;
      f.style.animationDelay = `${delay}s, ${rand(0, 2)}s`;
      f.style.animationDuration = `1.4s, ${windDur}s`;

      f.innerHTML = `<span class="bloom">${flowerEmojis[i % 2]}</span><div class="stem" style="height:${stemH}px"></div>`;
      f.addEventListener('click', () => flowerSurprise(f));
      field.appendChild(f);
    }

    // petals falling
    const petalCount = window.innerWidth < 480 ? 10 : 16;
    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = '🌼';
      p.style.left = rand(0, 100) + 'vw';
      p.style.fontSize = rand(10, 18) + 'px';
      p.style.setProperty('--drift', rand(-40, 40) + 'px');
      p.style.animationDuration = rand(8, 16) + 's';
      p.style.animationDelay = rand(0, 10) + 's';
      field.appendChild(p);
    }

    // sparks
    const sparkCount = window.innerWidth < 480 ? 12 : 18;
    for (let i = 0; i < sparkCount; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = rand(0, 100) + 'vw';
      s.style.bottom = rand(0, 20) + 'vh';
      s.style.animationDuration = rand(5, 10) + 's';
      s.style.animationDelay = rand(0, 6) + 's';
      field.appendChild(s);
    }
  }

  function buildGardenStatic() {
    const flowerEmojis = ['🌻', '🌼'];
    for (let i = 0; i < 10; i++) {
      const f = document.createElement('div');
      f.className = 'flower';
      f.style.left = rand(4, 90) + 'vw';
      f.style.fontSize = '38px';
      f.style.opacity = 1;
      f.innerHTML = `<span class="bloom">${flowerEmojis[i % 2]}</span><div class="stem" style="height:60px"></div>`;
      f.addEventListener('click', () => flowerSurprise(f));
      field.appendChild(f);
    }
  }

  // ---------- MESSAGE SEQUENCE ----------
  function revealMessages() {
    const lines = [
      { el: '.line1', text: 'YESICA 💛' },
      { el: '.line2', text: 'Estas flores son para ti...' },
      { el: '.line3', text: 'Porque entre millones de personas, mi corazón tuvo la suerte de encontrarte.' },
      { el: '.line4', text: 'Te quiero, mi princesa. 💛' }
    ];
    lines.forEach((line, i) => {
      const el = messageBox.querySelector(line.el);
      el.textContent = line.text;
      setTimeout(() => el.classList.add('show'), 1800 + i * 1400);
    });
  }

  // ---------- FLOWER CLICK SURPRISE ----------
  function flowerSurprise(f) {
    f.classList.add('flash');
    setTimeout(() => f.classList.remove('flash'), 600);

    if (!reduced) spawnHearts(f);

    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    popup.textContent = phrase;
    popup.classList.add('show');
    clearTimeout(flowerSurprise._t);
    flowerSurprise._t = setTimeout(() => popup.classList.remove('show'), 2600);
  }

  function spawnHearts(f) {
    const rect = f.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const h = document.createElement('div');
      h.textContent = '💛';
      h.style.position = 'fixed';
      h.style.left = (rect.left + rect.width / 2 + rand(-15, 15)) + 'px';
      h.style.top = rect.top + 'px';
      h.style.fontSize = rand(12, 18) + 'px';
      h.style.pointerEvents = 'none';
      h.style.zIndex = 50;
      h.style.transition = 'transform 1.4s ease, opacity 1.4s ease';
      document.body.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transform = `translateY(-${rand(60, 110)}px) translateX(${rand(-30, 30)}px)`;
        h.style.opacity = '0';
      });
      setTimeout(() => h.remove(), 1500);
    }
  }

  // ---------- MUSIC TOGGLE ----------
  let playing = false;
  musicBtn.addEventListener('click', () => {
    if (!playing) {
      bgMusic.play().then(() => {
        playing = true;
        musicBtn.textContent = '🔊';
      }).catch(() => {
        // no music file present yet — fail silently
      });
    } else {
      bgMusic.pause();
      playing = false;
      musicBtn.textContent = '🔇';
    }
  });
})();
